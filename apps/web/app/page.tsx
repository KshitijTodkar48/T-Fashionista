import "ui/styles.css";
import { Hero , Navbar , Products } from "ui";
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  // @ts-ignore
  const session = await getServerSession(authOptions) ;
  // @ts-ignore
  const userId = session?.user?.id ;
  const userEmail = session?.user?.email;
  
  return (
    <main className="flex flex-col items-center">
      <Navbar Id={userId} Email={userEmail} route="users"/>
      <div className="mt-[78px]" id="Home">
        <Hero />
      </div>
      <Products userId={userId}/>
    </main>
  );
}