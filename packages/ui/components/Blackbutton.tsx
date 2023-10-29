"use client"
import { ButtonProps } from "types";
import { useRouter } from "next/navigation";

export const Blackbutton = ({ name } : ButtonProps) => {
    const router = useRouter();
    const handleClick = () => {
        if(name === "Signup")
        {
            router.push("/users/signup");
        }
        else if(name === "Login")
        {
            router.push("/users/login");
        }
        else if(name == "Go to Cart")
        {
            router.push("/users/profile");
        }
    }
    return(
        <button className="text-lg px-5 py-1 border rounded-full bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black" onClick={handleClick}>
            {name}
        </button>
    )
}