import { useEffect, useRef, type FC } from "react";
import { drawBg } from "../logics/drawCanvas";

const canvasWidth = 400;
const canvasHeight = 400;

type Props = {
  columns: number;
  rows: number;
  onDraw: (cellX: number, cellY: number) => void;
  pixels: string[][];
};

export const DotCanvas: FC<Props> = ({ columns, rows, onDraw, pixels }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const onDrawPixel = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = ref.current;
    if (!canvas) return;
    if (e.buttons !== 1) return; // Only draw on left mouse button click
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellWidth = canvas.width / columns;
    const cellHeight = canvas.height / rows;
    const cellX = Math.floor(x / cellWidth);
    const cellY = Math.floor(y / cellHeight);
    onDraw(cellX, cellY);
  };

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    pixels.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(
            colIndex * (canvasWidth / columns),
            rowIndex * (canvasHeight / rows),
            canvasWidth / columns,
            canvasHeight / rows
          );
        }
      });
    });
    drawBg(
      ctx,
      {
        columns,
        rows,
      },
      { width: canvasWidth, height: canvasHeight }
    );            
  }, [columns, rows, pixels]);

  return (
    <canvas
      width={canvasWidth}
      height={canvasHeight}
      ref={ref}
      className="bg-gray-100"
      onMouseDown={onDrawPixel}
      onMouseMove={onDrawPixel}
    />
  );
};
