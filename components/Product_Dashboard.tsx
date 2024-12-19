import Image from "next/image";
import DashboardProductModal from "./Dashboard_product_modal";

type Props = {
    item: any;
};

const Products_Dashboard: React.FC<Props> = ({ item }) => {


    const sale = item.price * item.discound / 100
    const sale_price = item.price - sale

    return (
        <>
            <div
                key={item._id}
                className="p-[1%]  gap-[2%] rounded-[15px] bg-gray-100 mb-[2%] text-black"
            >

                <div className="flex">

                    {Array.isArray(item.image) &&
                        item.image.map((el: any) => {
                            return <Image
                                className="w-[20%] h-[30vh] object-cover mb-[5px]"
                                src={el || "/images/default-image.jpg"} // Fallback image
                                alt={item.titles?.en || "Product Image"} // Default alt text
                                width={500}
                                height={500}
                            />
                        })}
                </div>

                <div className="w-full flex justify-between">
                    <div className="w-[90%] flex flex-col">
                        <h2 className="text-[16px] border-b font-600">
                            <span className="font-bold">Sale Price: {sale_price} </span>
                        </h2>
                        <h2 className="text-[16px] border-b font-600">
                            <span className="font-bold">Price: {item.price}$</span>
                        </h2>
                        <p className="text-[16px] border-b">
                            <span className="font-bold">Title ru:</span> {item.titles.ru}
                        </p>
                        <p className="text-[16px] border-b">
                            <span className="font-bold">Title en:</span> {item.titles.en}
                        </p>
                        <p className="text-[16px]  border-b w-full break-words">
                            <span className="font-bold">Description ru:</span> {item.description.ru}
                        </p>
                        <p className="text-[16px] border-b w-full break-words">
                            <span className="font-bold">Description en:</span> {item.description.en}
                        </p>
                        <p className="text-[16px] border-b">
                            <span className="font-bold">Category:</span> {item.category}
                        </p>
                        {item.discound && (
                            <p className="text-[16px] border-b">
                                <span className="font-bold">Discound:</span> {item.discound}%
                            </p>
                        )}
                        <p className="text-[16px]  border-b">
                            <span className="font-bold">Type:</span> {item.type}
                        </p>

                        {item.colors.length > 1 && (
                            <div className="flex border-b gap-[5px]">
                                <span className="font-bold">Colors:</span>
                                {Array.isArray(item.colors) &&
                                    item.colors.map((el: any) => (
                                        <p key={el._id} className="text-[16px]">
                                            {el.name.en}
                                        </p>
                                    ))
                                }
                            </div>
                        )}

                        {item.size && (
                            <div className="flex border-b gap-[5px]">
                                <span className="font-bold">Size:</span>
                                {Array.isArray(item.size) &&
                                    item.size.map((el: any) => (
                                        <p key={el._id} className="text-[16px]">
                                            {el.size}
                                        </p>
                                    ))
                                }
                            </div>
                        )}

                    </div>

                    <div className="flex-col top-[2%] justify-end relative">
                        <DashboardProductModal type={"product"} id={item._id} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products_Dashboard;
