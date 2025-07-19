import type { FC } from "react";

type Props = {
  palette: string[];
  colorIndex?: number | null;
  onSetColor: (index: number | null) => void;
};

export const Palette: FC<Props> = ({
  palette,
  colorIndex,
  onSetColor,
}: Props) => {
  return (
    <ul>
      {palette.map((color, index) => (
        <li
          key={index}
          className={`inline-block w-8 h-8 m-1 cursor-pointer border-2 ${
            colorIndex === index ? "border-black" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSetColor(index)}
        />
      ))}
      <li
        className={`inline-block w-8 h-8 m-1 cursor-pointer border-2 ${
          colorIndex === null ? "border-black" : "border-transparent"
        }`}
        style={{ backgroundColor: "transparent" }}
        onClick={() => onSetColor(null)}
      ></li>
    </ul>
  );
};
