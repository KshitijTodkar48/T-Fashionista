"use client"
import "ui/styles.css";
import { AdminHero, Dashboard, Navbar , PublishedProducts } from "ui";
import { useSession } from "next-auth/react";

export default function Page() {
  // @ts-ignore
  const { data: session } = useSession();
  // @ts-ignore
  const adminId = session?.user?.id ;
  const adminEmail = session?.user?.email;
  console.log(adminId);
  
  
  return (
    <main className="flex flex-col items-center">
      <Navbar Id={adminId} Email={adminEmail} route="admin"/>
      {
        adminId ? 
        <>
          <div className="mt-[85px] font-bold flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold px-5">
              Welcome to <span className="text-orange-500"> T-Fashonista </span>'s Seller Dashboard 
            </h1>
            <Dashboard />
          </div>
          <PublishedProducts Id={adminId}/>
        </> : 
        <>
          <div className="mt-[85px]" id="Home">
            <AdminHero/>
          </div>
        </>
      }
    </main>
  );
}