import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
};

export default function Index({ auth, purchases }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Purchases" />
            <div className="container mx-auto py-8 px-48">
                <h1>Purchases</h1>

                <div className="flex flex-col gap-4 my-4">
                    {purchases.map((v) => {
                        const { purchase, products } = v;
                        const totalPrice =
                            Math.round(
                                products.reduce(
                                    (prev, curr) =>
                                        prev +
                                        +curr.price_per_item * curr.amount,
                                    0
                                ) * 100
                            ) / 100;

                        const date = new Date(
                            purchase.created_at
                        ).toLocaleString("en-US", options);
                        return (
                            <div key={purchase.id}>
                                {date} -{" "}
                                {totalPrice}$
                            </div>
                        );
                    })}
                </div>
            </div>
        </Authenticated>
    );
}
