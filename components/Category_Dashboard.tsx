import Image from "next/image";
import DashboardProductModal from "./Dashboard_product_modal";

type Props = {
    item: any;
};

const Category_Dashboard: React.FC<Props> = ({ item }) => {

    return (

        <> <div className="relative mb-[1%] flex overflow-hidden bg-gray-200 gap-[10px] text-black w-[32%] h-[15vh] rounded-md"> 
            <div className="w-full flex justify-between p-[1%]">
                
                <div className="flex flex-col gap-[2px]">
                    <p className='text-[18px]'><span className='font-bold'>ru:</span> {item.titles.ru}</p>
                    <p className='text-[18px]'><span className='font-bold'>en:</span> {item.titles.en}</p>
                </div>

                <div className="flex-col justify-end relative">
                    <DashboardProductModal type={"category"} id={item._id} Button={<button >•••</button>} />
                </div>

            </div>        </div>

            
        </>
    );
};

export default Category_Dashboard;
