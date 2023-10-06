interface ButtonProps {
    name: string;
}

export const Button = ({ name } : ButtonProps) => {
    return(
        <button className="text-lg px-5 py-1 border rounded-md bg-sky-600 text-white hover:bg-sky-700">
            {name}
        </button>
    )
}