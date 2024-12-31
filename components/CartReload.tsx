"use client"

import { useAppContext } from "@/context";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface WishlistReloadProps {
  translation: any;
  lang: any;
}

const CartReload: React.FC<WishlistReloadProps> = ({ translation, lang }) => {
  const { dataUsers, dataProd, loading, setCartCount, setWishlistCount } =
    useAppContext();
  const [userId, setUserId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const cookieStore = document.cookie;
    const userIdCookie = cookieStore
      .split("; ")
      .find((row) => row.startsWith("userId="))
      ?.split("=")[1];
    setUserId(userIdCookie || null);
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        try {
          const res = await fetch(`http://localhost:3000/api/users/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setCartCount(data.data.cart.length);
            setWishlistCount(data.data.wishlist.length);
          } else {
            console.error("Failed to fetch wishlist");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while fetching wishlist");
        }
      }
    };

    fetchWishlist();
  }, [userId, setCartCount]);

  const user = dataUsers.find((el: any) => el._id === userId);
  const safeDataCart = user && Array.isArray(user?.cart) ? user?.cart : [];
  const safeDataProd = Array.isArray(dataProd) ? dataProd : [];
  const filteredProducts = safeDataProd.filter((product: any) =>
    safeDataCart.includes(String(product._id))
  );

  useEffect(() => {
    const initialQuantities: { [key: string]: number } = {};
    filteredProducts.forEach((product: any) => {
      initialQuantities[product._id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    const total = filteredProducts.reduce((sum, product) => {
      const quantity = quantities[product._id] || 1;
      const priceAfterDiscount =
        product.price - (product.price * product.discound) / 100;
      return sum + priceAfterDiscount * quantity;
    }, 0);
    setSubtotal(total);
  }, [filteredProducts, quantities]);

  const handleIncrement = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const handleDecrement = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1),
    }));
  };

  const resetCart = async () => {
    localStorage.setItem("cart", "");

    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ cart: [] }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setCartCount(0);
        alert("Cart has been reset!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while resetting the cart");
    }
  };

  // Функция для обработки нажатия на кнопку "Процесс"
  const handleProcess = () => {
    const productsData: any[] = [];

    filteredProducts.forEach((product: any) => {
      const quantity = quantities[product._id] || 1;
      const priceAfterDiscount =
        product.price - (product.price * product.discound) / 100;
      const totalPrice = priceAfterDiscount * quantity;

      productsData.push({
        _id: product._id,
        quantity,
        price: priceAfterDiscount.toFixed(2),
        total: totalPrice.toFixed(2),
        type: "pending"
      });
    });

    localStorage.setItem('cartData', JSON.stringify(productsData));

    window.location.href ="/checkout"

    console.log('Data saved to localStorage:', productsData);
  };


  return (
    <div className="mt-10">
      <div className="flex gap-2 text-xl mt-[30px] mb-[50px]">
        <Link href="/">
          <span className="text-gray-400">{translation.main.cart.home}</span>
        </Link>
        <span className="text-black">/</span>
        <span className="text-black">{translation.main.cart.cart}</span>
      </div>

      <h1 className="text-2xl text-black font-semibold">
        {translation.main.cart.cart}
      </h1>

      <div className="p-6 px-0 rounded-lg">
        <table className="w-full mb-[50px] text-black text-[18px] text-left">
          {filteredProducts.length > 0 && (
            <thead className="text-[20px]">
              <tr className="border-b">
                <th className="py-2 font-semibold text-black">
                  {translation.main.cart.yag}
                </th>
                <th className="py-2 font-semibold text-black">
                  {translation.main.cart.du}
                </th>
                <th className="font-semibold text-black">
                  {translation.main.cart.se}
                </th>
                <th className="text-right font-semibold text-black">
                  {translation.main.cart.chor}
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => (
                <tr key={product._id} className="border-b">
                  <td className="py-4 flex items-center gap-4">
                    <div className="w-16 h-16 overflow-hidden rounded-lg">
                      <Image
                        src={product.image[0]}
                        alt={product.titles[lang]}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="font-medium">{product.titles[lang]}</span>
                  </td>
                  <td className="py-4">
                    {product.discound > 0 ? (
                      <span className="text-black">
                        $
                        {(
                          product.price - (product.price * product.discound) / 100
                        ).toFixed(2)}
                      </span>
                    ) : (
                      `${product.price}`
                    )}
                  </td>
                  <td className="py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100"
                        onClick={() => handleDecrement(product._id)}
                      >
                        −
                      </button>
                      <span className="text-[18px] font-medium">
                        {quantities[product._id] || 1}
                      </span>
                      <button
                        className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100"
                        onClick={() => handleIncrement(product._id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    $$
                    {(
                      (product.price -
                        (product.price * product.discound) / 100) *
                      (quantities[product._id] || 1)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-[35px] py-20">
                  {translation.main.cart.emptyMessage || "Your cart is empty"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center text-[20px] mt-6">
          <Link href="/">
            <button className="px-6 py-2 text-black border-black border rounded-lg active:scale-[.9] transition-[.2] hover:bg-gray-100">
              {translation.main.cart.returnToShop}
            </button>
          </Link>
          <button
            onClick={resetCart}
            className="px-6 py-2 bg-red-500 text-white rounded-lg active:scale-[.9] transition-[.2] hover:bg-red-600"
          >
            {translation.main.cart.updateCart}
          </button>
        </div>
      </div>

      <div className="flex justify-end text-black mt-12 mb-[50px]">
        <div className="border border-black rounded-lg w-[30%] pb-[2vh] gap-3 flex flex-col text-xl px-7 pt-10 ">
          <h1 className="font-semibold text-[25px] mb-[3vh] ">
            {translation.main.cart.carttotal}
          </h1>
          <div className="flex justify-between mb-[1vh]">
            <span>{translation.main.cart.subtotal}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between mb-[1vh]">
            <span>{translation.main.cart.shipping}</span>
            <span>{translation.main.cart.free}</span>
          </div>
          <hr />
          <div className="flex justify-between mb-[2vh]">
            <span>{translation.main.cart.Total}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-center items-center">
            <button className="w-[260px] h-[56px] bg-red-500 text-white rounded-lg" onClick={handleProcess}>
              {translation.main.cart.proses}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartReload;
