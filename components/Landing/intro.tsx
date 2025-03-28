import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function IntroPage() {
  return (
    <div className="h-screen flex flex-col border-accent">
      <div className="flex justify-evenly items-center w-full h-full flex-col md:flex-row">
        <div className="text-7xl p-4 drop-shadow-[0_0_10px_hsl(var(--accent)_/_0.6)] text-center animate-in fade-in slide-in-from-bottom-4  delay-200 duration-700 fill-mode-backwards">
          Basic Todo
        </div>

        <Separator
          orientation="vertical"
          className=" bg-accent h-40  w-2 hidden md:block rounded-sm animate-in fade-in slide-in-from-top-4 delay-1000 duration-500 fill-mode-backwards"
        />
        <Separator
        orientation="horizontal"
        className = "md:hidden bg-accent w-40 h-2 rounded-sm animate-in fade-in slide-in-from-top-4 delay-1000 duration-500 fill-mode-backwards"/>

        <div className="flex hover:bg-accent transition-colors text-foreground text-5xl p-5 rounded-full animate-in fade-in slide-in-from-right-4 [animation-delay:700ms] [animation-duration:700ms] duration-300 fill-mode-backwards"
        >
          <Link href="/dashboard" className="flex  size-full">Get started</Link>
        </div>
      </div>
    </div>
  );
}
