import { ButtonProps } from "types"

export const OrangeButton = ({ name }:ButtonProps) => {
    return(
        <button className="bg-orange-600 border border-orange-600 rounded-full text-white py-1 px-6 font-semibold hover:bg-white hover:border-orange-500 hover:text-orange-600">
            {name}
        </button>
    )
}