import type { FC } from "react";
import img from "../assets/ink_eraser.svg"; // Adjust the import path as necessary

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
    <ul className="grid grid-cols-8 gap-1 p-2">
      {palette.map((color, index) => (
        <li
          key={index}
          className={`w-4 h-4 cursor-pointer border-2 ${
            colorIndex === index ? "border-black" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSetColor(index)}
        />
      ))}
      <li
        className={`inline-block w-4 h-4 cursor-pointer border-2 ${
          colorIndex === null ? "border-black" : "border-transparent"
        }`}
        style={{ backgroundColor: "transparent" }}
        onClick={() => onSetColor(null)}
      >
        <img
          className="w-full h-full object-contain"
          src={img}
          width={4}
          height={4}
          alt=""
        />
      </li>
    </ul>
  );
};
