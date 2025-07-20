import { useEffect, useRef, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

type Props = {
  roomId: string;
  columns: number;
  rows: number;
  colorPalette: string[];
}

/**
 * 以下の機能を持ちます
 * - y-websocketへの接続
 * - pixelsとpaletteの取得、更新
 * - 色の選択
 * このhookは各ページのトップで一度だけ呼び出してください
 */
export const useDotEditor = ({ roomId, columns, rows, colorPalette }: Props) => {
  const yDocRef = useRef(new Y.Doc());
  const yPixelsRef = useRef(yDocRef.current.getArray<number | null>("pixels"));
  const yPaletteRef = useRef(yDocRef.current.getArray<string>("palette"));

  const [palette, setPalette] = useState<string[]>([]);
  const [pixels, setPixels] = useState<string[][]>([]);
  const [colorIndex, setColorIndex] = useState<number | null>(0);

  const updatePixel = (cellX: number, cellY: number) => {
    const index = cellY * columns + cellX;
    yDocRef.current.transact(() => {
      yPixelsRef.current.delete(index, 1);
      yPixelsRef.current.insert(index, [colorIndex]);
    });
  };

  const selectColor = (index: number | null) => {
    setColorIndex(index);
  }

  useEffect(() => {
    const wsProvider = new WebsocketProvider(
      "ws://localhost:1234",
      roomId,
      yDocRef.current
    );
    wsProvider.once("sync", () => {
      if (yPixelsRef.current.length === 0) {
        yPixelsRef.current.push(Array(columns * rows).fill(null));
      }
      if (yPaletteRef.current.length === 0) {
        yPaletteRef.current.push(colorPalette);
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
  }, [columns, rows, roomId, colorPalette]);

  return {
    palette,
    updatePixel,
    pixels,
    selectColor,
    colorIndex,
  }
}