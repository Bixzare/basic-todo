import Image from "next/image"



export default function Footer(){
    return(
        <footer className="w-full  bg-transparent px-10 py-2 flex  items-center justif-evenly gap-5">
        <div className="flex justify-center items-center gap-1 bg-accent hover:scale-105 rounded-xl px-1.5">
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

        <div className="flex justify-center items-center gap-1 bg-accent rounded-xl px-1.5 hover:scale-105">
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
    )
}