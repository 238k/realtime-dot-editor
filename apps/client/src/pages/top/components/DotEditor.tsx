import { type FC } from "react";
import { Palette } from "./Palette";
import { DotCanvas } from "../../../components/DotCanvas";
import { useDotEditor } from "../../../components/useDotEditor";
import color8 from "../../../consts/color8";

type Props = {
  columns: number;
  rows: number;
};

export const DotEditor: FC<Props> = ({ columns, rows }) => {
  const { updatePixel, pixels, palette, selectColor, colorIndex } =
    useDotEditor({
      roomId: "my-room",
      columns: columns,
      rows: rows,
      colorPalette: color8,
    });
  return (
    <div>
      <Palette
        palette={palette}
        colorIndex={colorIndex}
        onSetColor={selectColor}
      />
      <div className="h-4"></div>
      <DotCanvas
        columns={columns}
        rows={rows}
        onDraw={updatePixel}
        pixels={pixels}
      />
    </div>
  );
};
