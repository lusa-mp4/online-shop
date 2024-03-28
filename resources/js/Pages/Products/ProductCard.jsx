import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ProductCard({
    name,
    amount,
    price,
    imageUrl,
    addItem,
    removeItem,
    inCart,
}) {
    return (
        <div className="border border-black rounded p-3 text-center max-w-52">
            <img
                src={imageUrl}
                alt="Image of the product"
                className="mx-auto"
                width="120px"
                height="120px"
            />
            <a href="#" className="underline">
                {name}
            </a>
            <p>Amount: {amount}</p>
            <p>Price: {price}$</p>
            <div className="mt-4 flex flex-col gap-4">
                {amount > 0 ? (
                    <PrimaryButton onClick={addItem}>Add to cart</PrimaryButton>
                ) : (
                    <p className="text-white bg-red-500 ">Can't add more</p>
                )}
                {inCart && (
                    <PrimaryButton onClick={removeItem}>Remove</PrimaryButton>
                )}
            </div>
        </div>
    );
}
