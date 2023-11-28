"use client";
import "ui/styles.css";
import { useState, useEffect } from "react";
import { ProductType } from "types";
import { OrangeButtonLarge, StarIconLarge } from "ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ImageSkeleton } from "ui";
import { Input, Form, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";

const ProductDetails = ({ params }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const notify = () => toast.success("Item added to Cart.");
  const router = useRouter();
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`/api/products/${params?.id}`);
      const data = await response.json();

      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setImageURL(data.imageURL);
        setPrice(data.price);
        setPublished(data.published);
      }
      setIsLoading(false);
    };
    fetchProductDetails();
  }, [userId]);

  const updateDetails = async () => {
    try {
      const toastId = toast.loading("Updating..");
      const response = await fetch(`/api/products/${params?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageURL,
          price,
          published,
        }),
      });
      toast.dismiss(toastId);
      if (response.ok) {
        toast.success("Details Updated !");
      } else {
        toast.error("An error occurred !");
      }
    } catch (error) {
      // Handle network or unexpected errors.
      toast.error("Network error.");
    }
  };

  return (
    <section className="w-full flex justify-center lg:mt-10">
      <section className="flex flex-col lg:flex-row w-full justify-center items-center gap-3 p-5 my-8 max-w-[1530px]">
        <div className="w-4/5 sm:w-3/5 md:w-2/5 flex justify-center mb-8">
          {isLoading ? (
            <ImageSkeleton />
          ) : (
            <img
              src={imageURL}
              className="rounded-2xl w-[90%] max-h-[600px]"
              alt="Product Image"
            />
          )}
        </div>
        <div className="w-4/5 md:w-2/5 flex flex-col max-lg:items-center gap-4">
          <Form size="large" style={{ fontWeight: "bold" }}>
            <Form.Item label="Title">
              <Input
                placeholder="Title"
                value={title}
                style={{ fontWeight: "normal" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                placeholder="Description"
                value={description}
                showCount
                maxLength={300}
                size="large"
                style={{
                  height: 145,
                  resize: "none",
                  fontWeight: "normal",
                  fontSize: "16px"
                }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="ImageURL">
              <Input
                placeholder="ImageURL"
                value={imageURL}
                style={{ fontWeight: "normal" }}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input
                placeholder="Price"
                value={price}
                style={{ fontWeight: "normal" }}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Published">
              <Switch
                checked={published}
                onChange={(check) => setPublished(check)}
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
                onClick={updateDetails}
                className="text-xl text-white bg-orange-500 hover:bg-[rgb(228,100,15)] px-4 py-2 rounded-md w-full"
              >
                Update Details
              </button>
            </Form.Item>
          </Form>
        </div>
      </section>
      <Toaster />
    </section>
  );
};

export default ProductDetails;
