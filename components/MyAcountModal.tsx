"use client"

import { useAppContext } from '@/context';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface MyAcountModalProps {
    translation: any;
}

const MyAcountModalCom: React.FC<MyAcountModalProps> = ({ translation }) => {
    // Получаем данные пользователей из контекста
    const { dataUsers } = useAppContext();

    // Состояние для идентификатора пользователя
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Получаем cookie на клиентской стороне
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split('; ')
            .find((row) => row.startsWith('userId='))
            ?.split('=')[1];

        setUserId(userIdCookie || null); // Сохраняем в состоянии userId

        console.log(dataUsers);

    }, []);

    return (
        <>
            {Array.isArray(dataUsers) && userId ? (
                dataUsers.map((el: any) => {
                    if (userId === el._id) {
                        return (
                            <div 
                            key={el._id}
                            className="w-[35px] h-[35px] rounded-[50%] overflow-hidden">

                                <Image
                                    className="object-cover"
                                    src={el.image ? el.image[0] : "/images/person.svg"}
                                    alt="image"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        );
                    }
                })
            ) : (
                <p>Loading or no user found</p>
            )}
        </>
    );
};

export default MyAcountModalCom;
