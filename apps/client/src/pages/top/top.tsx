import { DotEditor } from "./components/DotEditor";

export const TopPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>Realtime Dot Editor</h1>
      <div className="h-8"></div>
      <DotEditor columns={20} rows={20} />
      <div>
        <button>部屋をつくる</button>
      </div>
      <h2>これは何？</h2>
      <section>
        <p></p>
      </section>
    </div>
  );
};
