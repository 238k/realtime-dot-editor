import { useRef } from "react";
import { DotEditor } from "./components/DotEditor";

export const TopPage = () => {
  const descriptionRef = useRef<HTMLElement>(null);
  return (
    <div className="flex flex-col items-center px-4 py-16">
      <h1 className="font-bold text-3xl mb-4">Realtime Dot Editor</h1>
      <p className="mb-8">
        オンライン上で同時編集できるドット絵エディターです。
      </p>
      <div className="flex gap-4 w-full max-w-[400px] md:w-96">
        <button className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-500 transition">
          部屋をつくる
        </button>
        <button
          className="flex-1 border-2 border-blue-600 text-blue-600 font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-100 transition"
          onClick={() => {
            descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          説明を読む
        </button>
      </div>
      <div className="h-8"></div>
      <div className="max-w-screen">
        <DotEditor columns={20} rows={20} />
      </div>
      <section ref={descriptionRef} className="h-800 py-12 mt-24">
        <h2 className="font-bold text-2xl">Realtime Dot Editorについて</h2>
        <p></p>
      </section>
    </div>
  );
};
