"use client"

import { Button } from "ui";
import "ui/styles.css";
import { useRouter } from 'next/navigation'

export default function Page(): JSX.Element {
  const router = useRouter() ;
  return (
    <main className="flex h-screen justify-center items-center text-5xl font-bold">
      <div className="flex flex-col gap-8">
        <h1>
          Welcome to <span className="text-orange-500"> T-Fashionista </span>
        </h1>
        <div className="flex gap-4 justify-evenly font-semibold">
          <div onClick={() => {router.push('/users/login')}}><Button name="Login"/></div>
          <div onClick={() => {router.push('/users/signup')}}><Button name="Signup"/></div>
        </div>
      </div>
    </main>
  );
}
