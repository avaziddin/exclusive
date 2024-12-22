import { cookies } from 'next/headers';
import React from 'react';

interface MyAcountModalProps {
    translation: any;
}

const MyAcountModalCom = async ({ translation }: MyAcountModalProps) => {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    return (
        <>
            {userId ? (
                <div className="w-[35px] h-[35px] bg-red-500 rounded-[50%]"></div>
            ) : (
                <p className="text-[20px] text-red-500">no Account</p>
            )}
        </>
    );
};

export default MyAcountModalCom;
