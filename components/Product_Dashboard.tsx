import Image from "next/image";
import DashboardProductModal from "./Dashboard_product_modal";

type Props = {
    item: any;
};

const Products_Dashboard: React.FC<Props> = ({ item }) => {

    return (

        <>
            <div
                key={item._id}
                className="p-[1%] flex gap-[2%]  rounded-[15px] bg-white mb-[2%] text-black"
            >
                <Image
                    className="w-[20%] h-[30vh] object-cover rounded-[10px] mb-[5px]"
                    src={item.image || ""}
                    alt="burger"
                    width={500}
                    height={500}
                />

                <div className="w-full flex justify-between">
                    <div className="w-[90%] flex flex-col">
                        <h2 className="text-[16px] border-b font-600"><span className="font-bold">Price:</span>{item.price}$</h2>
                        <p className="text-[16px] border-b"><span className="font-bold">Title ru:</span>  {item.titles.ru}</p>
                        <p className="text-[16px] border-b"><span className="font-bold">Title en:</span> {item.titles.en}</p>
                        <p className="text-[16px] border-b"><span className="font-bold">Description ru:</span>  {item.description.ru}</p>
                        <p className="text-[16px] border-b"><span className="font-bold">Description en:</span> {item.description.en}</p>
                        <p className="text-[16px] border-b"><span className="font-bold">Category:</span> {item.category}</p>
                       {item.discound && 
                        <p className="text-[16px] border-b"><span className="font-bold">Discound:</span> {item.discound}%</p>
                       }
                       {item.type && 
                        <p className="text-[16px] border-b"><span className="font-bold">Type:</span> {item.type}</p>
                       }
                        <p className="text-[16px] border-b"><span className="font-bold">Colors:</span> {item.colors}</p>
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
