import { ButtonProps } from "types"

export const OrangeButton = ({ name, isAddedToCart }:ButtonProps) => {
    return(
        <>
          {
            isAddedToCart ? 
            <> 
              <button className="bg-white border border-orange-600 text-orange-600 rounded-full py-1 px-6 font-semibold">
                 {name}
              </button>
            </> 
            : 
            <>
              <button className="bg-orange-600 border border-orange-600 rounded-full text-white py-1 px-6 font-semibold hover:bg-white hover:border-orange-500 hover:text-orange-600">
                 {name}
              </button>
            </>
          }
        </>
    )
}