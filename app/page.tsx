import Image from "next/image";
import Signup from "./pages/Signup";

export default function Home() {
  return (
     <div className="px-20">
      <div className="flex gap-20">
        <div className="text-[18px] flex flex-col gap-3.5 font-normal mt-9">
          <div className="flex gap-14"><span>Woman’s Fashion</span><Image src="/images/yonba.svg" alt="hello" height={14} width={8} /> </div>
          <div className="flex gap-20"><span>Men’s Fashion</span> <Image src="/images/yonba.svg" alt="hello" height={14} width={8} /></div>
          <span>Electronics</span>
          <span>Home & Lifestyle</span>
          <span>Medicine</span>
          <span>Sports & Outdoor</span>
          <span>Baby’s & Toys</span>
          <span>Groceries & Pets</span>
          <span>Health & Beauty</span>
        </div>
        <div className="h-[420px] w-[1.6px] bg-gray-200"></div>
        <div className="mt-9">
        <Image  src="/images/plakat.svg" alt="hello" height={650} width={1000}  />
        </div>
      </div>
     </div>
  );
}

