import "ui/styles.css";
import { Hero , Navbar , Products } from "ui";
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  // @ts-ignore
  const session = await getServerSession(authOptions) ;
  // @ts-ignore
  const userId = session?.user?.id ;
  
  return (
    <main className="flex flex-col items-center">
      <Navbar userId={userId}/>
      <div className="mt-[75px]">
        <Hero />
      </div>
      <Products userId={userId}/>
    </main>
  );
}
