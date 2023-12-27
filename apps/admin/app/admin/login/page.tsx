import "ui/styles.css";
import { LoginCard } from "ui";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async() => {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if(session)
  {
    redirect("/");
  }
  return (
    <section>
      <LoginCard page="Login" route="admin"/>
    </section>
  )
}

export default LoginPage