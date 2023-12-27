import "ui/styles.css";
import { LoginCard } from "ui";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignupPage = async() => {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if(session)
  {
    redirect("/");
  }
  return (
    <section>
      <LoginCard page="Signup" route="users"/>
    </section>
  )
}

export default SignupPage