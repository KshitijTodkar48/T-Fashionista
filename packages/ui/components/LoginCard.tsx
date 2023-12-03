"use client"
import { useState } from "react";
import { LoginCardProps } from "types";
import { useRouter, usePathname } from "next/navigation";
import Link  from "next/link";
import { signIn } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import { loginFormSchema, signupFormSchema } from "zod-schemas";
import { Logo } from "../assets";

export const LoginCard = ({ page , route }: LoginCardProps) => {

  const [name,setName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const handleFormSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    if(page === "Signup")
    {  
      try {
          // Signup
          const validatedData = signupFormSchema.safeParse({ name, email, password });
          if(!validatedData.success)
          {
            toast("Enter valid data.", {
              icon: '❗'
            })
            return;
          }
          const toastId1 = toast.loading("Signing up..") ;
          const response = await fetch(`/api/${route}/signup`,{
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
              router.push(`/${route}/login`);
            } else {
              if(route === "users")
                toast.error("User with this email already exists.");
              else
                toast.error("Admin with this email already exists.");
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
              redirect:false,
            })
          
            toast.dismiss(toastId2);
            if(response?.ok) {
              toast.success("Logged in successfully !");
              await new Promise((res):any => setTimeout(res,1200));
              router.push("/");
            }
            else{
              toast.error("Unable to Login !");
            }
        } catch (error) {
          // Handle network or unexpected errors.
          console.error("An error occurred during the fetch:", error);
        }
    }
  }

    return (
      <section className="h-screen max-sm:h-[115vh] max-sm:w-[115vw] bg-sky-200">
          <div className="flex flex-col gap-8 h-[90vh] items-center justify-center">
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col m-5 gap-6 sm:gap-8 justify-center items-center border shadow-md bg-white p-5 sm:p-8 sm:pb-10 lg:min-w-[380px] rounded-md">
                <div className="flex flex-col gap-1 text-[23px] font-semibold items-center">
                  <h1> {page} to </h1> <Logo width={180} height={50}/>
                </div>
                <div className="flex flex-col gap-5 w-full text-base">
                  {
                    pathname === "/users/signup" && (
                      <input 
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        required
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                        className="border px-5 py-1 rounded-md"/>
                    )
                  }
                  <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    className="border px-5 py-1 rounded-md"/>
                  <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    className="border px-5 py-1 rounded-md"/>
                    { page === "Signup" && <span className="text-sm text-gray-400 text-center">
                      * Password must contain at least 6 characters. 
                      </span> 
                    }
                </div>
                <button type="submit" className="w-full text-lg px-5 py-1 border rounded-md bg-sky-600 text-white hover:bg-sky-700">
                  {page}
                </button>
                <div className="text-sm hover:underline hover:underline-offset-2">
                  {
                    pathname === "/users/login" ?
                    <>
                      <Link href={"/users/signup"}> Don't have an account? (Signup) </Link>
                    </> : 
                    <>
                      <Link href={"/users/login"}> Already have an account? (Login) </Link>
                    </>
                  }
                </div>
              </div>
              <Toaster />
          </form>
        </div>
      </section>
    )
  }
  