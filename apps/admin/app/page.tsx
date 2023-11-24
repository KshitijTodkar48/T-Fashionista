import "ui/styles.css";
import { Hero , Navbar , Products } from "ui";
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  // @ts-ignore
  const session = await getServerSession(authOptions) ;
  // @ts-ignore
  const adminId = session?.admin?.id ;
  // @ts-ignore
  const adminEmail = session?.admin?.email;
  
  return (
    <main className="flex flex-col items-center">
      <Navbar Id={adminId} Email={adminEmail} route="admin"/>
      <div className="mt-[75px]">
        <Hero />
      </div>
      <Products Id={adminId}/>
    </main>
  );
}