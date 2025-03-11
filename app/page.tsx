import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-evenly items-center w-full h-full flex-col md:flex-row">
        <div className="text-7xl p-4 drop-shadow-[0_0_10px_hsl(var(--accent)_/_0.6)] text-center">
          Basic Todo
        </div>
        <div className="border-r-4 border-accent h-40 p-2 hidden md:block rounded-sm"></div>
        <div className="hover:bg-gradient p-1 text-foreground">
          <div className="bg-background flex w-full h-full justify-center items-center">
            <Link href="/dashboard">
              {/*middleware protects routes if unauthed */}
              <button className=" h-full w-full text-4xl hover:scale-105 font-extrabold hover:drop-shadow-[35px_35px_35px_rgba(59,130,246,1)] p-8 rounded-full hover:text-gradient hover">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="w-full  bg-gray-500/10 px-10 py-2 flex  items-center justif-evenly gap-5">
        <div className="flex justify-center items-center gap-1 bg-accent hover:outline hover:outline-accent rounded-xl px-1.5">
          <Image
            src="/logos/github.svg"
            width={15}
            height={15}
            alt="Github Logo"
            className="inline-block"
          />
          <a
            href="https://github.com/Bixzare?tab=repositories"
            className=" hover:text-foreground no-underline"
            target="_blank"
          >
            Github
          </a>
        </div>

        <div className="flex justify-center items-center gap-1 bg-accent rounded-xl px-1.5 hover:outline hover:outline-accent">
          <Image
            src="/logos/linkedIn.svg"
            width={15}
            height={15}
            alt="Github Logo"
            className="inline-block"
          />
          <a
            href="https://www.linkedin.com/in/djibrilla-boubacar-a7145a231/"
            className="no-underline hover:text-foreground"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
