"use client";
import "ui/styles.css";
import { useState, useEffect } from "react";
import { ProductType } from "types";
import { Logo, OrangeButtonLarge, SmallLogo, StarIconLarge } from "ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ImageSkeleton } from "ui";
import { Blackbutton } from "ui/components/Blackbutton";

const ProductDetails = ({ params }) => {
    const [product , setProduct] = useState<ProductType | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [isAddedToCart , setIsAddedToCart] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true) ;
    const notify = () => toast.success("Item added to Cart.");
    const router = useRouter();
    const { data: session, status } = useSession();
    // @ts-ignore
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    const handleSizeChange = (e) => {
      setSelectedSize(e.target.value);
    };

    useEffect(() => {
            const fetchProductDetails = async() => {
                if(!userId)
                {
                    setIsAddedToCart(false);
                }
                else{
                    const productState = localStorage.getItem(`is${params?.id}Addedfor-${userId}`) ;
                    if (productState) setIsAddedToCart(true) ;
                }
                const response = await fetch(`/api/products/${params?.id}`, { cache: "no-store" });
                const data = await response.json();
                setProduct(data);
                setIsLoading(false);
            }
            fetchProductDetails();
        }, [userId])

        const addToCart = async (Id: string) => {
            const productId = parseInt(params?.id) ;
            setIsAddedToCart(true);
            const response = await fetch(`/api/products/addToCart`,{
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                productId,
                Id
              })
            })
            try {
              if(response.ok)
              {
                // alert("Item added to cart.")
                localStorage.setItem(`is${productId}Addedfor-${Id}`, "added") ;
              }
              else{
                toast.error("Something went wrong.");
                localStorage.removeItem(`is${productId}Addedfor-${Id}`);
              }
            } catch (error) {
              toast.error("An error occured.");
              localStorage.removeItem(`is${productId}Addedfor-${Id}`);
            }
          }

    return(
        <section className="w-full flex justify-center">
            <section className="w-full fixed top-0 bg-white flex items-center py-2">
              <div className="sm:hidden"> <SmallLogo /> </div>
              <div className="max-sm:hidden"> <Logo width={210} height={50} /> </div>
              {!(status === "loading") && 
                (<div className="flex fixed right-0 items-center justify-end gap-2 mr-[1rem]">
                {session?.user ? (
                   <Blackbutton name="Go to Cart" route={"users"}/>
                  ) : (
                  <>
                    <div className="h-10"><Blackbutton name="Login" route={"users"} /></div>
                    <div className="h-10"><Blackbutton name="Signup" route={"users"} /></div>
                  </>
                )}
              </div>)
            }
            </section>
            <section className="flex flex-col lg:flex-row w-full justify-center items-center pr-10 pl-5 pb-5 max-sm:px-2 mt-16 max-w-[1530px]">
                {
                  isLoading ? 
                  <div className="w-4/5 md:w-[35%] flex justify-center mb-8">
                    <ImageSkeleton />
                  </div> :
                  <div className="w-4/5 md:w-1/2 flex justify-center my-8 max-lg:my-4">
                    <img src={product?.imageURL} alt="" className="rounded-2xl w-[90%] max-h-[600px]" />
                  </div>
                }
                <div className="w-4/5 md:w-1/2 flex flex-col max-lg:items-center gap-4">
                    <h1 className="text-2xl xl:text-5xl font-bold"> {product?.title} </h1>
                    <h2 className="text-xl xl:text-3xl text-gray-500 font-semibold flex items-center gap-3"> Ratings : <div className="flex items-center gap-2 pt-1"> <StarIconLarge /> <span className="font-bold text-black"> {product?.rating} </span> </div> </h2>
                    <h2 className="text-xl xl:text-3xl text-gray-500 font-semibold flex items-center gap-3"> Price : <span className="font-bold text-black"> {product?.price} </span> </h2>
                    <div className="flex items-center gap-3">
                        <label htmlFor="sizeDropdown" className="text-2xl font-semibold">
                            Size:
                        </label>
                        <select
                            id="sizeDropdown"
                            value={selectedSize}
                            onChange={handleSizeChange}
                            className="px-4 py-2 border rounded-lg text-base xl:text-xl"
                        >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <p className="text-base xl:text-lg text-gray-500 font-semibold">
                        {product?.description}
                    </p>
                    <p className="text-base xl:text-lg text-gray-500 font-semibold mt-2">
                        Sizes are available in Small (S), Medium (M), Large (L), and Extra Large (XL).
                    </p>
                    <div className="flex justify-center mt-4" onClick={() => {
                        if(userId) 
                        {
                            if(!isAddedToCart)
                            {
                              addToCart(userId) ;
                              notify() ;
                            }
                        }
                        else{
                            router.push("/users/login") ;
                        }
                        }}>
                    <OrangeButtonLarge name={ isAddedToCart ? "Added" : "Add to cart" } isAddedToCart={isAddedToCart} />
                </div>
                    <Toaster/>
                </div>
            </section>
        </section>
    )
}

export default ProductDetails