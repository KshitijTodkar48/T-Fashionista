"use client";
import "ui/styles.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "ui";
import { Input, Form, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { productDetailsSchema } from "zod-schemas";

const AddProductPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [hasCheckedAuthorization, setHasCheckedAuthorization] = useState<boolean>(false);
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;

  useEffect(() => {
    if(userId)
    {
        setIsLoading(false);
        setIsAuthorized(true);
    }
    else{
        // If userId is not available after some time, show 401 Unauthorized.
      setTimeout(() => {
        if (!userId && !hasCheckedAuthorization) {
          setIsLoading(false);
          setIsAuthorized(false);
          setHasCheckedAuthorization(true);
        }
      }, 5000); 
    }
  }, [userId, hasCheckedAuthorization]);

  const addProduct = async () => {
    if (!userId) return ;
    try {
      const validatedData = productDetailsSchema.safeParse({ title, description, imageURL, price, published });
        if(!validatedData.success)
        {
          toast("Enter valid data.", {
            icon: '❗'
          })
          return;
        }
      const toastId = toast.loading("Adding..");
      const response = await fetch(`/api/admin/${userId}/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData.data),
      });
      toast.dismiss(toastId);
      if (response.ok) {
        toast.success("Product Added !");
      } else {
        toast.error("An error occurred !");
      }
    } catch (error) {
      // Handle network or unexpected errors.
      toast.error("Network error.");
    }
  };

  if(isLoading)
  {
    return <section className="h-[100vh] flex justify-center items-center">
        <Loader />
    </section>
  }

  if(!isAuthorized)
  {
    return <section className="h-[100vh] flex justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
            <div className="text-4xl font-bold text-gray-400"> 401 </div>
            <div className="text-3xl font-bold text-gray-400"> Unauthorized </div>
        </div>
    </section>
  }

  return (
    <section className="w-full flex justify-center lg:mt-20">
    <div className="w-4/5 md:w-2/5 flex flex-col max-lg:items-center gap-4">
          <Form size="large" style={{ fontWeight: "bold" }}>
            <Form.Item label="Title">
              <Input
                placeholder="Title"
                value={title}
                style={{ fontWeight: "normal" }}
                showCount
                required
                maxLength={40}
                onChange={(e) => {setTitle(e.target.value)}}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                placeholder="Description"
                value={description}
                showCount
                required
                maxLength={300}
                size="large"
                style={{
                  height: 145,
                  resize: "none",
                  fontWeight: "normal",
                  fontSize: "16px"
                }}
                onChange={(e) => {setDescription(e.target.value)}}
              />
            </Form.Item>
            <Form.Item label="ImageURL">
              <Input
                placeholder="ImageURL"
                value={imageURL}
                required
                style={{ fontWeight: "normal" }}
                onChange={(e) => {setImageURL(e.target.value)}}
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input
                placeholder="Price"
                value={price}
                required
                style={{ fontWeight: "normal" }}
                onChange={(e) => {setPrice(e.target.value)}}
              />
            </Form.Item>
            <Form.Item label="Published">
              <Switch
                checked={published}
                onChange={(check) => {setPublished(check)}}
                style={
                  published
                    ? { backgroundColor: "rgb(255,111,0)" }
                    : { backgroundColor: "gray" }
                }
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                onClick={addProduct}
                className="text-xl text-white bg-orange-500 hover:bg-[rgb(228,100,15)] px-4 py-2 rounded-md w-full"
              >
                Add Product
              </button>
            </Form.Item>
          </Form>
        </div>
      <Toaster />
    </section>
  );
};

export default AddProductPage;
