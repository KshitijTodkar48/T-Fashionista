"use client";
import { LogoutIcon, MyAccountIcon, ProfileIcon } from "../assets";
import { Blackbutton } from "./Blackbutton";
import { useState } from "react";
import { signOut } from "next-auth/react"

export const Navbar = ({ userId }: { userId: string | undefined }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <section className="w-full">
      <section className="flex w-full justify-between bg-orange-100 py-3 fixed text-2xl">
        <div className="flex w-4/5 justify-around">
          <div className="cursor-pointer"> Home </div>
          <div className="cursor-pointer"> Products </div>
          <div className="cursor-pointer"> About us </div>
          <div className="cursor-pointer"> Contact us </div>
        </div>
        <div className="flex w-1/5 justify-end gap-3 mr-[2rem]">
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
            className="fixed top-[61px] right-3 w-[16rem] bg-white shadow-md rounded-lg text-lg font-semibold"
          >
            <div className="px-10 py-2 flex justify-between cursor-pointer hover:bg-slate-200">
              <MyAccountIcon />  <span>My Account</span>
            </div>
            <div 
              className="px-10 py-2 flex justify-between text-center cursor-pointer hover:bg-slate-200"
              onClick={() => { signOut() }}
            >
              <LogoutIcon />  <span className="w-2/3">Log out</span>
            </div>
          </div>
        )}
    </section>
  );
};
