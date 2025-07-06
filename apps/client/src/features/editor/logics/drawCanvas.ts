import type { Size } from "../../../utils/types/size";

type Config = {
  columns: number;
  rows: number;
}

export const setupCanvas = (canvas: HTMLCanvasElement, config: Config) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  resetCanvas(canvas, config);

  const drawCell = (column: number, row: number, size: Size) => {
    ctx.fillStyle = "black";
    ctx.fillRect(column * (size.width / config.columns), row * (size.height / config.rows), size.width / config.columns, size.height / config.rows);
  };

  const handleDraw = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellWidth = canvas.width / config.columns;
    const cellHeight = canvas.height / config.rows;
    const column = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);
    drawCell(column, row, { width: canvas.width, height: canvas.height });
  };

  canvas.addEventListener("click", handleDraw);
  canvas.addEventListener("mousemove", (e) => {
    if (e.buttons !== 1) return;
    handleDraw(e);
  });
}

export const resetCanvas = (canvas: HTMLCanvasElement, config: Config) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBg(ctx, config, { width: canvas.width, height: canvas.height });
}

const drawBg = (ctx: CanvasRenderingContext2D, config: Config, size: Size) => {
  const cellWidth = size.width / config.columns;
  const cellHeight = size.height / config.rows;
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  for (let i = 0; i < config.columns - 1; i++) {
    ctx.beginPath();
    ctx.moveTo((i + 1) * cellWidth, 0);
    ctx.lineTo((i + 1) * cellWidth, size.height);
    ctx.stroke();
    for (let j = 0; j < config.rows - 1; j++) {
      ctx.beginPath();
      ctx.moveTo(0, (j + 1) * cellHeight);
      ctx.lineTo(size.width, (j + 1) * cellHeight);
      ctx.stroke();
    }
  }
  ctx.restore();
}