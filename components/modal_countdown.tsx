/* "use client"

import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';


type Props = {
    button: any
}

const Modal_Countdown: React.FC<Props> = ({ button }) => {

    async function onSubmit(e: any) {
        e.preventDefault()

        try {
            const fm = new FormData(e.target)

            const product: any = {}

            fm.forEach((val: any, key: any) => (product[key] = val))

            const res = await fetch(`http://localhost:3000/api/countdown`, {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json"
                }

            })

            console.log(res);

            if (res.status == 200 || res.status == 201) {
                alert("success")
            }

        } catch (error) {
           console.log(error);
           
        }
    }

    const [isOpend, setIsOpend] = useState(false)

    useEffect(() => {
        if (isOpend) {
            document.body.style.overflow = 'hidden'; // Отключаем скролл
        } else {
            document.body.style.overflow = ''; // Восстанавливаем скролл
        }

        // Восстанавливаем скролл при размонтировании компонента
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpend]);

    return (
        <>
            <div onClick={() => setIsOpend(true)}>
                {button}
            </div>

            {isOpend && (

                <div
                    className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[55]"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(10px)"
                    }}>
                    <form className=" w-[40%] p-[1%] text-black relative  h-fit  bg-background rounded-[20px]" onSubmit={onSubmit}>

                        <button onClick={() => { setIsOpend(false)}}>
                            <Image className='absolute top-[2%] right-[1%] ' src="/images/close.svg" alt="closebtn" width={25} height={25} />
                        </button>

                        <div className="flex w-full py-[5%] gap-[5%]">

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white" htmlFor="title">Countdown</label>
                                <input
                                    className="w-full px-4 outline-none text-[18px] py-4 border border-gray-300 rounded-md"
                                    type="date"
                                    name="countdown"
                                    id="countdown"
                                    placeholder="Enter countdown"
                                    required
                                />

                            </div>
                        </div>

                        <button
                            className="w-full mt-[20px] px-4 py-2 bg-gray-200 text-black rounded-md active:scale-[.9] transition-[.2s] hover:bg-gray-300 "
                            type="submit"
                        >
                            Add Product
                        </button>
                    </form>
                </div>

            )}
        </>
    );
};

export default Modal_Countdown; */