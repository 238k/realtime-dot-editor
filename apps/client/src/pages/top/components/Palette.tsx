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
    <ul className={`flex justify-center items-center gap-2 md:gap-4`}>
      {palette.map((color, index) => (
        <li
          key={index}
          className={`flex-1 h-full aspect-square rounded cursor-pointer border-2 shadow transition hover:border-gray-400 duration-200 ${
            colorIndex === index ? "border-gray-400" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSetColor(index)}
        />
      ))}
    </ul>
  );
};
