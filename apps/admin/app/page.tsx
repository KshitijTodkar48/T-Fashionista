"use client"
import "ui/styles.css";
import { AdminHero, Dashboard, Navbar, PublishedProducts, Footer, Loader } from "ui";
import { useSession } from "next-auth/react";

export default function Page() {
  // @ts-ignore
  const { data: session, status } = useSession(
  );
  // @ts-ignore
  const adminId = session?.user?.id ;
  const adminEmail = session?.user?.email;
 
  if (status === "loading") {
    return (
      <section className="h-[92vh] flex justify-center">
        <Loader/>
      </section>
    );
  }

  return (
    <main>
      <section className="flex flex-col items-center">
        <Navbar Id={adminId} Email={adminEmail} route="admin"/>
        {
          adminId ? 
          <>
            <div className="mt-[85px] font-bold flex flex-col items-center gap-4">
              <h1 className="text-3xl flex flex-col sm:block font-bold px-5">
                <span> Welcome to </span> <span> <span className="text-orange-500"> T-Fashonista </span>'s </span> <span> Seller Dashboard </span>
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
      </section>
      <Footer/>
    </main>
  );
}