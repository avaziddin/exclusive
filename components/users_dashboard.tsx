import Image from "next/image";
import DashboardProductModal from "./Dashboard_product_modal";

type Props = {
    item: any;
};

const Users_Dashboard: React.FC<Props> = ({ item }) => {


    const sale = item.price * item.discound / 100
    const sale_price = item.price - sale

    return (
        <>
            <div
                key={item._id}
                className="p-[1%]  gap-[2%] rounded-[15px] bg-gray-100 mb-[2%] text-black"
            >

                <div className="w-full flex gap-[2%]">
                    {item.image &&
                        <div className="w-[20%] rounded-lg h-[20vh] overflow-hidden">
                            <Image className="object-cover" src={item.image[0]} alt="user" width={300} height={300} />
                        </div>
                    }
                    <div className="w-[90%] flex flex-col">
                        <p className="text-[16px] border-b">
                            <span className="font-bold">Name:</span> {item.name}
                        </p>
                        <p className="text-[16px] border-b">
                            <span className="font-bold">Email:</span> {item.email}
                        </p>
                        <p className="text-[16px]  border-b w-full break-words">
                            <span className="font-bold">Password:</span> {item.password}
                        </p>

                        {item.secondName && 
                        <p className="text-[16px] border-b w-full break-words">
                            <span className="font-bold">SecondName:</span> {item.secondName}
                        </p>
                        }
                        {item.adress &&
                            <p className="text-[16px] border-b">
                                <span className="font-bold">Adress:</span> {item.adress}
                            </p>
                        }
                        {item.wishlist.length > 0 && (
                            <p className="text-[16px] border-b">
                                <span className="font-bold">Wishlist:</span> {item.wishlist.length}
                            </p>
                        )}
                        {item.cart.length > 0 &&
                            <p className="text-[16px]  border-b">
                                <span className="font-bold">Cart:</span> {item.cart.length}
                            </p>
                        }

                    </div>

                    <div className="flex-col top-[2%] justify-end relative">
                        <DashboardProductModal type={"users"} id={item._id} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users_Dashboard;
