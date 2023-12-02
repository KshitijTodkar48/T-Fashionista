"use client";
import { Logo, SmallLogo, LogoutIcon, MyAccountIcon, OrdersIcon, ProfileIcon } from "../assets";
import { Blackbutton } from "./Blackbutton";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Navbar = ({ Id, Email, route }: { Id: string | undefined, Email: string | undefined | null, route?: "users" | "admin"}) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push('/');
    window.location.reload();
  };

  return (
    <section className="w-full fixed top-0 bg-white flex items-center py-2 shadow-sm">
       <div className="sm:hidden"> <SmallLogo /> </div>
       <div className="max-sm:hidden"> <Logo /> </div>
        <div className="flex justify-evenly items-center max-md:hidden md:w-[52%] lg:w-[60%] xl:w-[68%] text-xl font-semibold">
          <div className="cursor-pointer hover:text-orange-600" 
            onClick={() => {
            const anchor = document.querySelector('#Home')
            anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' })
           }}> Home
          </div>
          <div className="cursor-pointer hover:text-orange-600" 
            onClick={() => {
            const anchor = document.querySelector('#Products')
            anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' })
           }}> Products
          </div>
          <div className="cursor-pointer hover:text-orange-600 max-lg:hidden"> Contact us </div>
        </div>
        <div className="flex fixed right-0 items-center justify-end gap-2 mr-[1rem]">
          {Id ? (
            <>
              {
                route === "users" ? 
                <>
                  <Blackbutton name="Go to Cart" route={route}/>
                </> : 
                <>
                  <Blackbutton name="Add Product" route={route}/>
                </>
              }
              <div className="cursor-pointer"
                onClick={() => {
                  setToggleDropdown((current) => !current);
                }}
              >
                <ProfileIcon />
              </div>
            </>
          ) : (
            <>
              <div className="h-10"><Blackbutton name="Login" route={route} /></div>
              <div className="h-10"><Blackbutton name="Signup" route={route} /></div>
            </>
          )}
        </div>
        {toggleDropdown && (
          <div
            className="fixed top-[61px] right-2 w-[18rem] sm:w-[20rem] bg-white shadow-md rounded-lg text-lg font-semibold"
          >
            <div className="px-10 py-2 justify-between">
              <p className="text-sm font-normal text-gray-500"> Logged in as : </p>
              <div>{Email} </div>
            </div>
            <div className="px-10 py-2 flex justify-center items-center cursor-pointer hover:bg-slate-200">
              <MyAccountIcon />  <span className="w-2/3 pl-8">My Account</span>
            </div>
            <div className="px-10 py-2 flex justify-center items-center cursor-pointer hover:bg-slate-200"
              onClick={() => { router.push("/users/orders"); }}
            >
              <OrdersIcon />  <span className="w-2/3 pl-8">My Orders</span>
            </div>
            <div 
              className="px-10 py-2 flex justify-center text-center cursor-pointer hover:bg-slate-200"
              onClick={() => {
                handleSignOut()
              }}
            >
              <LogoutIcon />  <span className="w-2/3">Log out</span>
            </div>
          </div>
        )}
    </section>
  );
};
