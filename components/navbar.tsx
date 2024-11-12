import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { LuMailPlus } from "react-icons/lu";

const Navbar = () => {
    return <div className="text-xl p-4 flex justify-between border items-center">
        <div className="flex justify-start gap-4  w-full">
            <Image src={"/logo.png"} className="rounded-full" alt="logo" height={30} width={30}/>
            Github Resume Generator
        </div>
        <div className="w-full  gap-8 flex justify-end items-center">
            <div className="hover:cursor-pointer hover:transition-all hover:scale-125"><FaGithub /></div>
            <div className="hover:cursor-pointer hover:transition-all hover:scale-125"><FaXTwitter /> </div>
            <div className="hover:cursor-pointer hover:transition-all hover:scale-125"><LuMailPlus /></div>
        </div>
    </div>
}

export default Navbar