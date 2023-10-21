import { ButtonProps } from "types"

export const Button = ({ name , type } : ButtonProps) => {
    return(
        <button type={type} className="text-lg px-5 py-1 border rounded-md bg-sky-600 text-white hover:bg-sky-700">
            {name}
        </button>
    )
}