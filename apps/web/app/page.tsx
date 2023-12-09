"use client"
import "ui/styles.css";
import { Hero , Navbar , Products } from "ui";
import { useSession } from "next-auth/react";
import { Footer } from "ui";

export default function Page() {
  // @ts-ignore
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id ;
  const userEmail = session?.user?.email;
  
  return (
    <main>
      <section className="flex flex-col items-center">
        <Navbar Id={userId} Email={userEmail} route="users"/>
        <div className="mt-[85px]" id="Home">
          <Hero />
        </div>
        <Products userId={userId}/>
      </section>
      <Footer/>
    </main>
  );
}