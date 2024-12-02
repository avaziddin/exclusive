import SalesItems from "./SalesItems";
import Timer from "./Timer";


interface TodaysSalesProps {
    translation:any
}

const Sales: React.FC<TodaysSalesProps> = ({translation}) => {
    return (
        <div className="w-full mt-48">
            <div className="flex flex-col gap-2">
                <div>
                <div className="flex gap-2">
                        <div className="w-[20px] h-[40px] rounded-md bg-red-500"></div>
                        <span className="text-[22px] font-bold text-red-500">{translation.main.todays}</span>
                    </div>
                </div>
                <div className="flex items-end gap-16">
                    <h1 className="text-[40px] text-black font-bold">{translation.main.flash_sales}</h1>
                    <Timer targetDate={"2024-12-25T00:00:00"} translation={translation}></Timer>
                </div>
            </div>

            <SalesItems translation={translation}></SalesItems>

            <div className="flex justify-center items-center mt-10">
            <div className="bg-red-500 w-[250px] h-[60px] flex justify-center items-center rounded-xl text-white">{translation.main.view}</div>
            </div>

            <hr className="mt-20"/>
        </div>
    )
}

export default Sales