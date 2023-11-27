import { useRouter } from "next/navigation";
import { ProductType } from "types";
import { StarIcon } from "../assets";
import { OrangeButton } from "./OrangeButton";

export const AdminProductCard = ({ imageURL, title, rating, price, id, Id }: ProductType) => {
  const router = useRouter();
  return (
    <section className="border p-5 m-2 rounded-2xl shadow-lg">
      <div>
        <img
          src={imageURL}
          alt="T-shirt image"
          className="h-[250px] w-[250px] rounded-2xl border"
        />
      </div>
      <h1 className="font-semibold text-lg text-gray-600 text-center m-2">
        {title}
      </h1>
      <div className="flex justify-center items-center m-2">
        <StarIcon />
        <span className="text-gray-500 mx-[6px] pt-[2px] text-lg font-semibold">
          {" "}
          {rating}{" "}
        </span>
      </div>
      <h2 className="font-bold text-center text-lg">
        <span className="text-gray-500 font-semibold"> Price : </span> {price}
      </h2>
      <div className="flex justify-center gap-2">
        <div
          className="flex justify-center mt-2"
          onClick={() => {
            router.push(`products/${id}`);
          }}
        >
          <OrangeButton name="View Details" />
        </div>
      </div>
    </section>
  );
};
