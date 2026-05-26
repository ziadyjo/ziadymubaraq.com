import Image from "next/image";
import { AboutSection } from "./components/about-section";
import { FooterArcade } from "./components/footer-arcade";
import { SiteMenu } from "./components/site-menu";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background-primary font-sans">
      <SiteMenu />
      <main className="flex w-full max-w-3xl flex-1 flex-col bg-background-primary px-4 py-16 sm:px-0">
        <div className="flex w-full flex-col gap-8 sm:grid sm:grid-cols-2 sm:items-start">
          <div>
            <h1 className="whitespace-nowrap font-serif text-5xl font-medium text-foreground-primary sm:hidden">
              Ziady Mubaraq
            </h1>
            <div className="hidden sm:block">
              <h1 className="font-serif text-5xl font-medium text-foreground-primary">
                Ziady
              </h1>
              <h1 className="font-serif text-5xl font-medium text-foreground-primary">
                Mubaraq
              </h1>
            </div>
          </div>

          <div className="hidden flex-col sm:flex sm:justify-self-end">
            <div className="relative h-[120px] w-[120px] overflow-hidden rounded-2xl border border-border-tertiary mb-4">
              <Image
                src="/avatar.webp"
                alt="Ziady Mubaraq"
                fill
                sizes="120px"
                className="object-cover"
                priority
              />
            </div>
            <AboutSection />
          </div>

          <div className="sm:hidden">
            <AboutSection />
          </div>
          <div><h3 className="text-3xl">Proficiencies</h3></div>
          <div>B</div>
          <div><h3 className="text-3xl">Work</h3></div>
          <div>B</div>
          <div><h3 className="text-3xl">Certificates</h3></div>
          <div>B</div>
          <div><h3 className="text-3xl">Projects</h3></div>
          <div>B</div>
          <div><h3 className="text-3xl">Contact</h3></div>
          <div>B</div>
          <div className="col-span-2">
            <FooterArcade />
          </div>
        </div>
      </main>
    </div>
  );
}
