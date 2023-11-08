"use client"
import { useState } from "react";
import { Button } from "./Button";
import { LoginCardProps } from "types";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import { loginFormSchema, signupFormSchema } from "zod-schemas";

export const LoginCard = ({ page , name }: LoginCardProps) => {

  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    if(page === "Signup")
    {  
      try {
          // Signup
          const validatedData = signupFormSchema.safeParse({ email, password });
          if(!validatedData.success)
          {
            toast("Enter valid email and password.", {
              icon: '❗'
            })
            return;
          }
          const toastId1 = toast.loading("Signing up..") ;
          const response = await fetch("/api/users/signup",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(validatedData.data)
          })
          
            toast.dismiss(toastId1);
            if (response.ok) {
              toast.success("Signed Up successfully !");
              await new Promise((res):any => setTimeout(res,1200));
              router.push("/users/login");
            } else {
              toast.error("User with this email already exists.");
            }
        } catch (error) {
          // Handle network or unexpected errors.
          console.error("An error occurred during the fetch:", error);
        }
    }
    else{ 
      try {
          // Login
          const validatedData = loginFormSchema.safeParse({ email, password });
          if(!validatedData.success)
          {
            toast("Enter a valid email.", {
              icon: '❗'
            })
            return;
          }
          const toastId2 = toast.loading("Logging in..") ;
          const response = await signIn("credentials", {
              email,
              password,
              redirect: false
            })
          
            toast.dismiss(toastId2);
            if(response?.ok) {
              toast.success("Logged in successfully !");
              await new Promise((res):any => setTimeout(res,1200));
              router.push("/");
            }
            else{
              toast.error("Invalid username or password.");
            }
        } catch (error) {
          // Handle network or unexpected errors.
          console.error("An error occurred during the fetch:", error);
        }
    }
  }

    return (
      <form onSubmit={handleFormSubmit}>
          <div className="flex flex-1 h-screen items-center justify-center bg-sky-200">
            <div className="flex flex-col gap-6 sm:gap-8 justify-center items-center bg-white p-5 sm:p-10 h-3/6 w-2/3 lg:w-[37%] rounded-2xl">
              <div className="text-[27px] font-bold">
                <h1> {page} to <span className="text-orange-500">{name}</span> </h1>
              </div>
              <div className="flex flex-col gap-5 w-full text-lg">
                <input 
                  type="text"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  className="border px-5 py-1 rounded-full"/>
                <input 
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className="border px-5 py-1 rounded-full"/>
                  { page === "Signup" && <span className="text-sm text-gray-400 text-center">
                    * Password must contain at least 6 characters. 
                    </span> 
                  }
              </div>
              <div className="w-full">
                <Button name={page} type="submit"/>
              </div>
            </div>
            <Toaster />
        </div>
      </form>
    )
  }
  