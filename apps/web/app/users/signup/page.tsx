import "ui/styles.css";
import { LoginCard } from "ui";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  return (
    <section>
      <LoginCard page="Signup" name="T-Fashionista" handleSubmit={
        async(email:string,password:string) => {
          "use server"
          const response = await fetch(process.env.URL + "/api/users/signup",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password
            })
          })
          const userInfo = await response.json();
          console.log(userInfo);
        }
       }/>
    </section>
  )
}

export default SignupPage