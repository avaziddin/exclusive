import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
const data = Array(23).fill(1); // Пример данных
import Image from "@/node_modules/next/image";

export default async function wishlist({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)
    const visibleProducts = data.slice(0, 6);
    const RekProducts = data.slice(0, 4);


    return (
        <Layout  translation={translation}>
            <div className="text-black flex justify-between mt-24">
                <span className="text-[28px] font-medium">{translation.main.wishlist.title} (4)</span>
                <button className="w-[240px] h-[56px] border font-semibold border-black rounded-xl">{translation.main.wishlist.move}</button>
            </div>


            <div className="flex  gap-[2%] flex-wrap mt-28">
                {visibleProducts.map((_, index) => (
                    <div
                        key={index}
                        className="whitespace-nowrap w-[23.5%] flex-shrink-0 h-fit mb-[50px]"
                    >
                        <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
                            <div className="mb-[10px] relative rounded-xl">
                                <div className="absolute cursor-pointer top-[5%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                    <Image src="/images/delete.svg" alt="heart" width={30} height={20} />
                                </div>
                                <Image className="w-content h-[35vh] rounded-lg object-cover" src="/images/prod.svg" alt="product" width={500} height={300} />
                                <div className="w-full cursor-pointer flex justify-center items-center py-[10px] rounded-b-lg bg-black text-white absolute bottom-0 opacity-0 group-hover:opacity-100 transition">
                                    <span>{translation.main.add_to_cart}</span>
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-black font-medium mb-[10px] px-[10px]">
                                    HAVIT HV-G92 Gamepad
                                </h1>
                                <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                                    <span className="text-red-500">$120</span>
                                    <span className="text-gray-400 line-through">$160</span>
                                </div>
                                <div className="flex items-center px-[10px] gap-[7px]">
                                    <div className="flex items-center gap-[7px]">
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                    </div>
                                    <span className="flex justify-center items-center text-gray-400">
                                        (99)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>


                <div className="flex justify-between">
                    <div className="flex gap-5 items-center"><div className="bg-red-500 w-[20px] h-[40px] rounded-lg"></div> <span className="text-black font-semibold text-2xl">{translation.main.wishlist.just}</span></div>
                    <button className="border border-black text-black font-semibold w-[150px] h-[56px] rounded-lg">{translation.main.wishlist.see}</button>
                </div>
                <div className="flex  gap-[2%] flex-wrap mt-28">
                {RekProducts.map((_, index) => (
                    <div
                        key={index}
                        className="whitespace-nowrap w-[23.5%] flex-shrink-0 h-fit mb-[50px]"
                    >
                        <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
                            <div className="mb-[10px] relative rounded-xl">
                                <div className="absolute cursor-pointer top-[5%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                    <Image src="/images/heart.svg" alt="heart" width={20} height={20} />
                                </div>
                                <div className="absolute cursor-pointer top-[19%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                    <Image src="/images/eye.svg" alt="heart" width={20} height={20} />
                                </div>
                                <Image className="w-content h-[35vh] rounded-lg object-cover" src="/images/prod.svg" alt="product" width={500} height={300} />
                                <div className="w-full cursor-pointer flex justify-center items-center py-[10px] rounded-b-lg bg-black text-white absolute bottom-0 opacity-0 group-hover:opacity-100 transition">
                                    <span>{translation.main.add_to_cart}</span>
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-black font-medium mb-[10px] px-[10px]">
                                    HAVIT HV-G92 Gamepad
                                </h1>
                                <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                                    <span className="text-red-500">$120</span>
                                    <span className="text-gray-400 line-through">$160</span>
                                </div>
                                <div className="flex items-center px-[10px] gap-[7px]">
                                    <div className="flex items-center gap-[7px]">
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                        <Image src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                    </div>
                                    <span className="flex justify-center items-center text-gray-400">
                                        (99)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
        </Layout>        
    )
}
