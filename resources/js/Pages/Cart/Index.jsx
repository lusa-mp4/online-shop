import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CartContext } from "@/State/Cart";
import { Head } from "@inertiajs/react";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import axios from "axios";

export default function Index({ auth, storeUrl }) {
    const [addedItems, dispatchItem] = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);

    const totalPrice =
        Math.round(
            addedItems.reduce((p, v) => p + v.item.price * v.amount, 0) * 100
        ) / 100;

    const handleBuying = async () => {
        try {
            await axios.post(
                route("purchases.store", { purchaseItems: addedItems })
            );

            setShowModal(false);
            dispatchItem({ type: "clear cart" });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Cart" />

            <div className="container mx-auto py-8 px-48">
                <p>This is cart!</p>
                <div className="flex flex-col gap-4 my-4">
                    {addedItems.map((v) => {
                        const addItem = () =>
                            dispatchItem({
                                type: "add item",
                                item: v.item,
                            });

                        const removeItem = () =>
                            dispatchItem({
                                type: "remove item",
                                item: v.item,
                            });

                        return (
                            <CartItem
                                key={v.item.id}
                                name={v.item.name}
                                description={v.item.description}
                                imageUrl={`${storeUrl}/${v.item.image_name}`}
                                price={v.item.price}
                                amount={v.amount}
                                addItem={addItem}
                                removeItem={removeItem}
                            />
                        );
                    })}
                </div>
                <p>Total: {totalPrice}$</p>
                <PrimaryButton
                    className="mt-8"
                    onClick={() => setShowModal(true)}
                >
                    Buy
                </PrimaryButton>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="m-4 p-4 flex flex-col items-center">
                    Confirm your purchase!
                    <div className="flex gap-6 mt-4">
                        <SecondaryButton onClick={() => setShowModal(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton onClick={() => handleBuying()}>
                            Buy
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
