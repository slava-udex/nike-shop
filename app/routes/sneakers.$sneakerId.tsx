import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { pb } from "~/lib/pb";
import { useToast } from "~/lib/use-toast";
import {
  SneakerDetailsAccordion,
  SneakerDetailsDialog,
  SneakerImages,
  SneakerShowcase,
  SneakerSizes,
} from "~/modules";
import { ICart, ISneaker } from "~/shared/interfaces/";
import { IUser } from "~/shared/interfaces/user";
import { Button } from "~/shared/ui";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { sneakerId } = params;
  if (!sneakerId) return redirect("/");

  const sneaker = await pb.collection("sneakers").getOne(sneakerId);
  return json({ sneaker });
};

export default function SneakerDetailPage() {
  const { sneaker } = useLoaderData<{ sneaker: ISneaker; user: IUser }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const action = useActionData<{ title: string; description: string }>();
  const { toast } = useToast();

  useEffect(() => {
    if (action?.title && action.description) {
      toast({
        title: action.title,
        description: action.description,
      });
    }
  }, [action, toast]);

  return (
    <div className="flex flex-col min-h-screen px-16 py-24 overflow-hidden gap-8  ">
      <div className="flex flex-col lg:flex-row  lg:gap-8 2xl:gap-36">
        <SneakerImages sneaker={sneaker} />
        <div className="flex w-full lg:w-1/4 flex-col gap-8">
          <div>
            <h1 className="text-xl sm:text-3xl">{sneaker.title}</h1>
            <p className="leading-6 font-medium">{sneaker.category}</p>
          </div>
          <div>
            <p className="leading-6 font-medium">
              USD : ${sneaker.price.toFixed(2).toLocaleString()}
            </p>
            <div className="flex flex-col text-[#757575] mt-2 gap-1">
              <p>incl. of taxes</p>
              <p>(Also includes all applicable duties)</p>
            </div>
          </div>
          <div>
            <SneakerSizes
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              sneaker={sneaker}
            />
            <Form method="post">
              <input type="hidden" value={sneaker.id} name="sneakerId" />
              <input
                type="hidden"
                value={selectedSize || undefined}
                name="size"
              />
              <Button
                type="submit"
                className="rounded-full my-4 w-full py-8 text-lg hover:opacity-70"
              >
                Add to Bag
              </Button>
            </Form>
            <Button className="w-full my-4 rounded-full py-8 text-lg bg-white text-black border hover:border-black ">
              Favourite
            </Button>
          </div>
          <div className="flex flex-col mt-8 leading-7 gap-8">
            {sneaker.description && <p>{sneaker.description}</p>}
            <SneakerDetailsDialog sneaker={sneaker} />
            <SneakerDetailsAccordion />
          </div>
        </div>
      </div>
      <SneakerShowcase sneaker={sneaker} />
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = pb.authStore.model;
  if (!user) return redirect("/sign-in");

  const formData = await request.formData();
  const sneakerId = formData.get("sneakerId");
  const size = formData.get("size");

  if (!size)
    return json({
      title: "Something went wrong!",
      description: "Please select a size",
    });

  try {
    const query = `userId="${user.id}" && sneakerId="${sneakerId}"`;
    // Search for an existing cart
    const existingCart: ICart[] = await pb.collection("cart").getFullList({
      filter: query,
    });
    // If item is already in cart, do nothing
    if (existingCart.length > 0) {
      if (existingCart[0].size !== Number(size)) {
        await pb.collection("cart").update(existingCart[0].id, {
          size,
        });
        return json({
          title: "OK!",
          description: "This sneaker is already in cart. Size updated.",
        });
      }
      return json({
        title: "OK!",
        description: "This sneaker is already in cart.",
      });
    }
    await pb.collection("cart").create({
      sneakerId,
      userId: user.id,
      size,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return json({ title: "Oops!", message: "Something went wrong" });
  }

  // Add cart drawer
  return json({ title: "Success!", message: "Sneaker added to cart" });
};
