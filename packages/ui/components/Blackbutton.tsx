"use client";
import { ButtonProps } from "types";
import { useRouter } from "next/navigation";
import { CartIcon } from "../assets";

export const Blackbutton = ({ name, route }: ButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    if (name === "Signup") {
      router.push(`/${route}/signup`);
    } else if (name === "Login") {
      router.push(`/${route}/login`);
    } else if (name === "Go to Cart") {
      router.push(`/${route}/cart`);
    } else if (name === "Add Product") {
      router.push(`/${route}/addProduct`);
    }
  };
  if(name === "Go to Cart")
  {
    return(
        <button
            className="flex items-center gap-3 text-base lg:text-lg px-5 py-1 border rounded-full bg-black text-white font-[500]"
            onClick={handleClick}
            >
            <div className="block max-sm:hidden"> {name} </div> <CartIcon />
        </button>
    )
  }
  return (
    <button
      className="flex items-center gap-3 text-base lg:text-lg px-5 py-1 border rounded-full bg-black text-white font-[500] hover:border-2 hover:border-black hover:bg-white hover:text-black"
      onClick={handleClick}
    >
      { name }
    </button>
  );
};
