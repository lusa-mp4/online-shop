import React from "react";

export default function CartItem({
    name,
    description,
    imageUrl,
    amount,
    price,
    addItem,
    removeItem,
}) {
    return (
        <div className="flex gap-6 items-start">
            <img
                src={imageUrl}
                alt="Product image"
                className="h-20 w-28"
            />
            <div className="flex flex-col justify-between">
                <p className="underline">{name}</p>
                <p>{description}</p>
                <div className="flex gap-12 mt-2">
                    <p>Amount: {amount}</p>
                    <button
                        className="bg-gray-700 px-2 rounded text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        onClick={removeItem}
                    >
                        -
                    </button>
                    <button
                        className="bg-gray-700 px-2 rounded text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        onClick={addItem}
                    >
                        +
                    </button>
                </div>
            </div>
            <p className="self-end">
                Price: {Math.round(price * amount * 100) / 100}
            </p>
        </div>
    );
}
