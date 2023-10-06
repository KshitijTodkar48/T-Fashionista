import { Button } from "./Button";

interface LoginCardProps {
  page: string;
  name?: string;
}

export const LoginCard = ({ page , name }: LoginCardProps) => {
    return (
      <div className="flex flex-1 h-screen items-center justify-center bg-sky-200">
          <div className="flex flex-col gap-6 sm:gap-8 justify-center items-center bg-white p-5 sm:p-10 h-3/6 w-2/3 lg:w-[37%] rounded-2xl">
            <div className="text-[27px] font-bold">
              <h1> {page} to <span className="text-orange-500">{name}</span> </h1>
            </div>
            <div className="flex flex-col gap-5 w-full text-lg">
              <input type="text" placeholder="Email" className="border px-2 py-1"/>
              <input type="password" placeholder="Password" className="border px-2 py-1"/>
            </div>
            <div className="w-full">
              <Button name={page}/>
            </div>
          </div>
      </div>
    )
  }
  