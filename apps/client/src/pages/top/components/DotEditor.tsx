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
    <div className="bg-white pt-4 pb-12 px-4 md:px-16 rounded-2xl border border-slate-300">
      <div className="px-2 md:px-4">
        <Palette
          palette={palette}
          colorIndex={colorIndex}
          onSetColor={selectColor}
        />
      </div>
      <div className="h-4"></div>
      <div className="border-2">
        <DotCanvas
          columns={columns}
          rows={rows}
          onDraw={updatePixel}
          pixels={pixels}
        />
      </div>
    </div>
  );
};
