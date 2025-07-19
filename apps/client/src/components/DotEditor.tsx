import { useEffect, useRef, useState, type FC } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import ansi16Colors from "../consts/ansi16Colors";
import { Palette } from "./Palette";
import { DotCanvas } from "./DotCanvas";

type Props = {
  columns: number;
  rows: number;
};

export const DotEditor: FC<Props> = ({ columns, rows }) => {
  const yDocRef = useRef(new Y.Doc());
  const yPixelsRef = useRef(yDocRef.current.getArray<number | null>("pixels"));
  const yPaletteRef = useRef(yDocRef.current.getArray<string>("palette"));

  const [palette, setPalette] = useState<string[]>([]);
  const [pixels, setPixels] = useState<string[][]>([]);
  const [colorIndex, setColorIndex] = useState<number | null>(null);

  const updatePixel = (cellX: number, cellY: number) => {
    const index = cellY * columns + cellX;
    yDocRef.current.transact(() => {
      yPixelsRef.current.delete(index, 1);
      yPixelsRef.current.insert(index, [colorIndex]);
    });
  };

  useEffect(() => {
    const wsProvider = new WebsocketProvider(
      "ws://localhost:1234",
      "my-roomname",
      yDocRef.current
    );
    wsProvider.once("sync", () => {
      if (yPixelsRef.current.length === 0) {
        yPixelsRef.current.push(Array(columns * rows).fill(null));
      }
      if (yPaletteRef.current.length === 0) {
        yPaletteRef.current.push(ansi16Colors);
      }
    });
    const onLoadPallette = () => {
      setPalette(yPaletteRef.current.toArray());
    };
    const onUpdatePixels = () => {
      const pixelsArray = yPixelsRef.current.toArray();
      // paletteから色を取得して2D配列に変換
      const newPixels: string[][] = [];
      for (let i = 0; i < rows; i++) {
        newPixels[i] = [];
        for (let j = 0; j < columns; j++) {
          const index = i * columns + j;
          newPixels[i][j] =
            pixelsArray[index] !== null
              ? yPaletteRef.current.get(pixelsArray[index])
              : "transparent";
        }
      }
      setPixels(newPixels);
    };
    yPaletteRef.current.observe(onLoadPallette);
    yPixelsRef.current.observe(onUpdatePixels);
    onLoadPallette();
    onUpdatePixels();
    return () => {
      wsProvider.disconnect();
    };
  }, [columns, rows]);
  return (
    <>
      <DotCanvas
        columns={columns}
        rows={rows}
        onDraw={updatePixel}
        pixels={pixels}
      />
      <Palette
        palette={palette}
        colorIndex={colorIndex}
        onSetColor={setColorIndex}
      />
    </>
  );
};
