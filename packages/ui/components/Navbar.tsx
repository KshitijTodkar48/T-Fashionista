import { Blackbutton } from "./Blackbutton"

export const Navbar = ({ userId }:{ userId:string }) => {
    return(
      <section className="flex w-full justify-between bg-orange-100 py-3 fixed text-2xl">
        <div className="flex w-3/4 justify-around">
            <div className="cursor-pointer"> Home </div>
            <div className="cursor-pointer"> Products </div>
            <div className="cursor-pointer"> About us </div>
            <div className="cursor-pointer"> Contact us </div>
        </div>
        <div className="flex w-1/4 justify-center gap-5">
            { userId ? <> 
              <Blackbutton name="Go to Cart" />
            </> : <> 
              <Blackbutton name="Login"/> 
              <Blackbutton name="Signup"/> 
             </>}
        </div>
      </section>
    )
}