import React, { useContext } from "react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import ProductCard from "./ProductCard";
import { Head } from "@inertiajs/react";
import { CartContext } from "@/State/Cart";

export default function Index({ auth, products, storeUrl }) {
    const [cartItems, dispatchItem] = useContext(CartContext);
    return (
        <Authenticated user={auth.user}>
            <Head title="Products" />
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-4 gap-8">
                {products.map((p) => {
                    const addItem = () =>
                        dispatchItem({
                            type: "add item",
                            item: p,
                        });

                    const removeItem = () =>
                        dispatchItem({
                            type: "remove item",
                            item: p,
                        });

                    const itemInCart = cartItems.find(
                        (v) => v.item.id === p.id
                    );
                    
                    return (
                        <ProductCard
                            key={p.id}
                            name={p.name}
                            price={p.price}
                            amount={
                                itemInCart
                                    ? p.amount - itemInCart.amount
                                    : p.amount
                            }
                            imageUrl={`${storeUrl}/${p.image_name}`}
                            addItem={addItem}
                            removeItem={removeItem}
                            inCart={Boolean(itemInCart)}
                        />
                    );
                })}
            </div>
        </Authenticated>
    );
}
