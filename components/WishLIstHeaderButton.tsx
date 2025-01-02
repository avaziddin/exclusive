"use client";

import { useAppContext } from "@/context"; // Подключаем контекст
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const WishLIstHeaderButton: React.FC = () => {
  const { wishlistCount, userId } = useAppContext();

  return (
    <Link className="relative" href={`${userId ? "/wishlist" : "/sign_in"}`}>
      {wishlistCount > 0 && (
        <div className="xs:px-[3px] sm:text-[8px] sm:px-[3px] xs:mt-[5px] xs:text-[7px] text-white font-semibold lg:text-[10px] lg:px-[4px] rounded-[50%] bg-red-500 absolute top-0 right-0">
          {wishlistCount}
        </div>
      )}
      <Image className="xs:w-[25px] xl:w-[35px] lg:w-[35px]  sm:w-[30px] object-cover xs:pt-[8px] " src="/images/favourite.svg" alt="favourite" width={35} height={30} />
    </Link>
  );
};

export default WishLIstHeaderButton;
