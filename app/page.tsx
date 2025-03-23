"use server"
import IntroPage from "@/components/Landing/intro"
import Features from "@/components/Landing/features"
import Footer from "@/components/Landing/footer"

export default async function Page(){
  return(
    <main className = "">
    <IntroPage/>
    <Features/>
    <Footer/>
    </main>
  )
}