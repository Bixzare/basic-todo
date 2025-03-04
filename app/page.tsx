import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className = "h-screen flex flex-col">
    <div className = "flex justify-evenly items-center w-full h-full flex-col md:flex-row">
      <div className ="text-7xl p-4 hover:drop-shadow-[0_35px_35px_rgba(59,130,246,0.95)] text-center"> 
        Basic Todo
      </div>
      <div className = "border-r-4 border-blue-700 h-40 p-2 hidden md:block"></div>
      <div className ="hover:bg-gradient p-1 text-black">
        <div className ="bg-white flex w-full h-full justify-center items-center">
          <Link href = "/dashboard">
        <button className = " h-full w-full text-4xl hover:scale-105 font-extrabold drop-shadow-[35px_35px_35px_rgba(59,130,246,1)] p-8 rounded-full hover:text-gradient hover">Get Started</button>
        </Link>
        </div>
      </div>

    </div>
    <footer className="w-full  bg-gray-500/10 px-10 py-2 flex  items-center justif-evenly gap-5">
    <div  className ="flex justify-center items-center gap-1">    <Image src = "/logos/github.svg" width ={15} height ={15} alt = "Github Logo" className = "inline-block"/>
    <a href = "https://github.com/Bixzare?tab=repositories"
    className ="hover:underline hover:text-blue-500" target="_blank">Github</a></div>

    <div  className ="flex justify-center items-center gap-1">
    <Image src = "/logos/linkedIn.svg" width ={15} height ={15} alt = "Github Logo" className = "inline-block"/>
    <a href = "https://www.linkedin.com/in/djibrilla-boubacar-a7145a231/"
    className ="hover:underline hover:text-blue-500" target="_blank">LinkedIn</a>

    </div>

    </footer>
    </div>

  );
}
