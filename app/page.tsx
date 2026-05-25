import { SiteMenu } from "./components/site-menu";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-[#141413]">
      <SiteMenu />
      <main className="flex flex-1 w-full max-w-4xl bg-orange-500 flex-col items-center justify-between py-32  sm:items-start">
        <h1 className="text-5xl font-serif font-medium">Ziady Mubaraq</h1>
      </main>
    </div>
  );
}
