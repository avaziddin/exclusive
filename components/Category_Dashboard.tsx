import Image from "next/image";
import DashboardProductModal from "./Dashboard_product_modal";

type Props = {
    item: any;
};

const Category_Dashboard: React.FC<Props> = ({ item }) => {

    return (

        <> <div className="relative mb-[1%] flex overflow-hidden bg-gray-200 gap-[10px] text-black w-full rounded-md">
            <div className="w-full flex gap-[1%] relative">

                <div className="">
                    <Image src={item?.image[0]} alt="category"  width={100} height={100}/>
                </div>

                <div key={item._id} className="flex gap-[30px] p-[1%]">
                    <p className='text-[18px]'><span className='font-bold'>Russian:</span> {item.titles.ru}</p>
                    <p className='text-[18px]'><span className='font-bold'>English:</span> {item.titles.en}</p>
                </div>

                <div className="right-[1%] top-[30%] absolute">
                    <DashboardProductModal type={"category"} id={item._id} />
                </div>

            </div>        </div>


        </>
    );
};

export default Category_Dashboard;
