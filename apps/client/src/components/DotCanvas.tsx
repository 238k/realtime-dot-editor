import { useEffect, useRef, type FC } from "react";
import { drawBg, resetCanvas } from "../logics/drawCanvas";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

type Props = {
  columns: number;
  rows: number;
};

export const DotCanvas: FC<Props> = ({ columns, rows }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 400;
  const canvasHeight = 400;
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // yjs
    const doc = new Y.Doc();
    const pixels = doc.getArray<number>("pixels");
    const wsProvider = new WebsocketProvider(
      "ws://localhost:1234",
      "my-roomname",
      doc
    );

    const onUpdate = () => {
      console.log(pixels);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < pixels.length; i++) {
        const x = i % columns;
        const y = Math.floor(i / columns);

        ctx.save();
        ctx.fillStyle = pixels.get(i) === 0 ? "white" : "black";
        ctx.fillRect(
          x * (canvas.width / columns),
          y * (canvas.height / rows),
          canvas.width / columns,
          canvas.height / rows
        );
        ctx.restore();
      }
      drawBg(
        ctx,
        {
          columns,
          rows,
        },
        { width: canvasWidth, height: canvasHeight }
      );
    };
    wsProvider.once("sync", () => {
      if (pixels.length === 0) {
        pixels.push(Array(columns * rows).fill(0));
      }

      pixels.observe(onUpdate);
      onUpdate();

      canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cellWidth = canvas.width / columns;
        const cellHeight = canvas.height / rows;
        const cellX = Math.floor(x / cellWidth);
        const cellY = Math.floor(y / cellHeight);
        const index = cellY * columns + cellX;
        const colorIndex = pixels.get(index) === 0 ? 1 : 0;
        doc.transact(() => {
          pixels.delete(index, 1);
          pixels.insert(index, [colorIndex]);
        });
      });
    });

    return () => {
      pixels.unobserve(onUpdate);
      wsProvider.disconnect();
    };
  }, [columns, rows]);
  return (
    <>
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        ref={ref}
        className="bg-gray-100"
      />
      <button
        onClick={() => {
          resetCanvas(ref.current!, { columns, rows });
        }}
      >
        clear
      </button>
    </>
  );
};
