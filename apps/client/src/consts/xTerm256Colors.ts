const xterm256Colors: string[] = [];

// 0-15: System colors（標準の16色）
const systemColors = [
  "#000000", "#800000", "#008000", "#808000",
  "#000080", "#800080", "#008080", "#c0c0c0",
  "#808080", "#ff0000", "#00ff00", "#ffff00",
  "#0000ff", "#ff00ff", "#00ffff", "#ffffff",
];
xterm256Colors.push(...systemColors);

// 16-231: 6x6x6のカラーマトリクス
const levels = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff];
for (let r = 0; r < 6; r++) {
  for (let g = 0; g < 6; g++) {
    for (let b = 0; b < 6; b++) {
      const color = `#${levels[r].toString(16).padStart(2, "0")}${levels[g].toString(16).padStart(2, "0")}${levels[b].toString(16).padStart(2, "0")}`;
      xterm256Colors.push(color);
    }
  }
}

// 232-255: グレースケール
for (let i = 0; i < 24; i++) {
  const gray = 8 + i * 10;
  const hex = gray.toString(16).padStart(2, "0");
  const color = `#${hex}${hex}${hex}`;
  xterm256Colors.push(color);
}

export default xterm256Colors;