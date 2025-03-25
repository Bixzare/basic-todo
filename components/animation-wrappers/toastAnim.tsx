import { Toaster } from "@/components/ui/sonner"
import  { motion } from "framer-motion"

const ToastAnimatatedComponent = motion.create(Toaster);
export default function ToastAnimated(){
    return(
        <ToastAnimatatedComponent
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 1, delay: 1 }}
        />
    )
}
