import type { Size } from "../utils/types/size";
type Config = {
  columns: number;
  rows: number;
}

export const resetCanvas = (canvas: HTMLCanvasElement, config: Config) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBg(ctx, config, { width: canvas.width, height: canvas.height });
}

export const drawBg = (ctx: CanvasRenderingContext2D, config: Config, size: Size) => {
  const cellWidth = size.width / config.columns;
  const cellHeight = size.height / config.rows;
  ctx.save();
  ctx.strokeStyle = "#cccccc";
  ctx.lineWidth = 1;
  for (let i = 0; i <= config.columns; i++) {
    ctx.beginPath();
    ctx.moveTo((i) * cellWidth, 0);
    ctx.lineTo((i) * cellWidth, size.height);
    ctx.stroke();
    for (let j = 0; j <= config.rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, (j) * cellHeight);
      ctx.lineTo(size.width, (j) * cellHeight);
      ctx.stroke();
    }
  }
  ctx.restore();
}