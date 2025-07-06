import { useEffect, useRef, type FC } from "react"
import { resetCanvas, setupCanvas } from "../logics/drawCanvas";

type Props = {
  columns: number;
  rows: number;
}

export const DotCanvas: FC<Props> = ({ columns, rows }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    setupCanvas(canvas, {
      columns,
      rows,
    });
  }, [columns, rows]);
  return <><canvas width={400} height={400} ref={ref} className="bg-gray-100" />
  <button onClick={() => {
    resetCanvas(ref.current!, {columns, rows});
  }}>clear</button>
  </>;
}