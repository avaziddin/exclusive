"use client"

import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';
import Modal_product_patch from './Modal_product_patch';

interface ModalProps {
    id: string;
    type: string;
}

const DashboardProductModal: React.FC<ModalProps> = ({ id, type }) => {

    const deleteItem = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/${type}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                alert("Sucsess");
                location.reload();  // Перезагрузка страницы (можно улучшить)
            } else {
                throw new Error("Failed to delete item");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при удалении");
        }
    };

    return (
        <div
            className="flex items-center justify-center gap-[20px] mr-[5%]"
        >
            <button onClick={deleteItem} className="rounded active:scale-[.9] transition-[.2s]"><Image src="/images/delete.svg" alt="delete" width={23} height={10} /></button>
            

            <Modal_product_patch type={type} id={id} Button={<button className="rounded pt-[10px]"><Image src="/images/change.svg" alt="change" width={23} height={10} /></button>} />


        </div>
    );
};

export default DashboardProductModal;
