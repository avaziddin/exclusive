import Link from "@/node_modules/next/link";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
import Image from "@/node_modules/next/image";

export default async function About({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang);

    return (
        <Layout lang={undefined} translation={translation}>
            {/* Breadcrumb */}
            <div className="flex gap-2 text-xl mt-6 px-4 sm:px-8">
                <Link href='/'>
                    <span className="text-gray-400">{translation.main.about.home}</span>
                </Link>
                <span className="text-black">/</span>
                <span className="text-black">{translation.main.about.about}</span>
            </div>

            {/* Our Story Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center text-black mt-10 px-4 sm:px-8">
                <div className="flex flex-col gap-6 lg:gap-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-[60px] font-bold">{translation.main.about.ourstory}</h1>
                    <span className="text-base sm:text-lg lg:text-[18px] w-full lg:w-[80%]">{translation.main.about.span1}</span>
                    <span className="text-base sm:text-lg lg:text-[18px] w-full lg:w-[80%]">{translation.main.about.span2}</span>
                </div>
                <Image src="/images/duxtaro.svg" alt="duxtaro" width={720} height={10} className="w-full lg:w-[50%] mt-8 lg:mt-0" />
            </div>

            {/* Statistics Section */}
            <div className="flex flex-wrap justify-between gap-6 text-sm sm:text-[16px] mt-16 px-4 sm:px-8">
                {[
                    {
                        img: "/images/firsticon.svg",
                        value: "10.5k",
                        text: translation.main.about.first,
                    },
                    {
                        img: "/images/duyom.svg",
                        value: "33k",
                        text: translation.main.about.second,
                        bg: "bg-red-500 text-white",
                    },
                    {
                        img: "/images/seyum.svg",
                        value: "45.5k",
                        text: translation.main.about.third,
                    },
                    {
                        img: "/images/chorom.svg",
                        value: "25k",
                        text: translation.main.about.fourth,
                    },
                ].map((stat, index) => (
                    <div
                        key={index}
                        className={`w-full sm:w-[45%] lg:w-[20%] rounded-md border-[3px] border-gray-300 flex flex-col py-5 gap-3 items-center ${stat.bg || ""}`}
                    >
                        <Image src={stat.img} alt="icon" width={82} height={10} />
                        <span className="font-bold text-2xl sm:text-[32px]">{stat.value}</span>
                        <span>{stat.text}</span>
                    </div>
                ))}
            </div>

            {/* Team Section */}
            <div className="flex flex-wrap justify-between gap-8 mt-16 px-4 sm:px-8">
                {[
                    {
                        img: "/images/tom.svg",
                        name: "Tom Cruise",
                        role: translation.main.about.yag,
                        
                    },
                    {
                        img: "/images/emma.svg",
                        name: "Emma Watson",
                        role: translation.main.about.du,
                        
                    },
                    {
                        img: "/images/will.svg",
                        name: "Will Smith",
                        role: translation.main.about.se,
                        
                    },
                ].map((teamMember, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-[48%] lg:w-[30%] flex flex-col text-black"
                    >
                        <Image className="w-full" src={teamMember.img} alt={teamMember.name} width={370} height={1} />
                        <h1 className="text-2xl sm:text-[35px] font-bold mt-3">{teamMember.name}</h1>
                        <span className="mb-3 text-lg sm:text-[22px]">{teamMember.role}</span>
                        <div className="flex gap-4">
                            <Image src="/images/Icon-Twitter (2).svg" alt="Twitter" width={30} height={1} />
                            <Image src="/images/icon-instagram.svg" alt="Instagram" width={30} height={1} />
                            <Image src="/images/in.svg" alt="LinkedIn" width={30} height={1} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Services Section */}
            <div className="flex flex-wrap justify-center gap-10 mt-16 px-4 sm:px-8">
                {[
                    {
                        img: "/images/Services.svg",
                        title: translation.main.free,
                        desc: translation.main.free2,
                    },
                    {
                        img: "/images/naushnik.svg",
                        title: translation.main.naush,
                        desc: translation.main.naush2,
                    },
                    {
                        img: "/images/galochka.svg",
                        title: translation.main.money,
                        desc: translation.main.money2,
                    },
                ].map((service, index) => (
                    <div key={index} className="text-center">
                        <div className="w-fit border-[15px] border-gray-300 p-4 bg-black rounded-full mx-auto mb-6">
                            <Image src={service.img} alt={service.title} width={70} height={70} />
                        </div>
                        <h1 className="font-semibold text-lg sm:text-[20px] text-black mb-2">{service.title}</h1>
                        <p className="text-sm sm:text-base">{service.desc}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
