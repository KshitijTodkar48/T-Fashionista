import "ui/styles.css";
import { LoginCard } from "ui";

const LoginPage = () => {
  return (
    <section>
      <LoginCard page="Login" name="T-Fashionista" handleSubmit={ 
        async(email:string,password:string) => {
          const respone = await fetch(process.env.URL + "/api/users/login/route",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password
            })
          })
        }
       }/>
    </section>
  )
}

export default LoginPage