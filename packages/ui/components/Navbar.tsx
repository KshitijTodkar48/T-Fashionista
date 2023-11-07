"use client";
import { LogoutIcon, MyAccountIcon, ProfileIcon } from "../assets";
import { Blackbutton } from "./Blackbutton";
import { useState } from "react";
import { signOut } from "next-auth/react"

export const Navbar = ({ userId, userEmail }: { userId: string | undefined, userEmail: string | undefined | null }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <section className="w-full">
      <section className="flex w-full justify-between bg-orange-100 py-3 fixed text-2xl">
        <div className="w-1/3 md:w-1/6 flex justify-center items-center cursor-pointer"> Logo </div>
        <div className="flex justify-evenly w-1/2 items-center max-md:hidden max-lg:text-xl lg:w-[58%]">
          <div className="cursor-pointer"> Home </div>
          <div className="cursor-pointer"> Products </div>
          <div className="cursor-pointer"> About us </div>
          <div className="cursor-pointer"> Contact us </div>
        </div>
        <div className="flex justify-end gap-3 mr-[2rem]">
          {userId ? (
            <>
              <Blackbutton name="Go to Cart" />
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
              <Blackbutton name="Login" />
              <Blackbutton name="Signup" />
            </>
          )}
        </div>
      </section>
        {toggleDropdown && (
          <div
            className="fixed top-[61px] right-2 w-[20rem] bg-white shadow-md rounded-lg text-lg font-semibold"
          >
            <div className="px-10 py-2 justify-between">
              <p className="text-sm font-normal text-gray-500"> Logged in as : </p>
              <div>{userEmail} </div>
            </div>
            <div className="px-10 py-2 flex justify-center cursor-pointer hover:bg-slate-200">
              <MyAccountIcon />  <span className="w-2/3 pl-8">My Account</span>
            </div>
            <div 
              className="px-10 py-2 flex justify-center text-center cursor-pointer hover:bg-slate-200"
              onClick={() => { signOut() }}
            >
              <LogoutIcon />  <span className="w-2/3">Log out</span>
            </div>
          </div>
        )}
    </section>
  );
};
