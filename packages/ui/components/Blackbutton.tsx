"use client"
import { BlackbuttonProps } from "types";
import { useRouter } from "next/navigation";

export const Blackbutton = ({ name } : BlackbuttonProps) => {
    const router = useRouter();
    const handleClick = () => {
        if(name === "Signup")
        {
            router.push("/users/signup");
        }
        else{
            router.push("/users/login");
        }
    }
    return(
        <button className="text-lg px-5 py-1 border rounded-full bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black" onClick={handleClick}>
            {name}
        </button>
    )
}