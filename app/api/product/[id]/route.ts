import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params; // Доступ к параметрам запроса
        
        // Убедимся, что id корректен
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: 'Invalid ID format' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db('mydatabase');
        
        // Поиск элемента по id
        const menuItem = await db.collection('product').findOne({ _id: new ObjectId(id) });

        if (!menuItem) {
            return NextResponse.json({ success: false, message: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: menuItem });

    } catch (e: any) {
        // Обработка ошибок
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
}

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }

) => {

    try {
        const client = await clientPromise

        const db = client.db('mydatabase')

        const result = await db
            .collection("product")
            .findOneAndDelete({ _id: new ObjectId(params.id) })

        return NextResponse.json({ success: true, data: result, message: "data was removed" })

    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message })
    }
}

export const PATCH = async (
    req: NextRequest,
    { params }: { params: { id: string } }

) => {

    try {
        const client = await clientPromise

        const db = client.db('mydatabase')
        const body = await req.json()
        const result = await db
            .collection("product")
            .findOneAndUpdate({ _id: new ObjectId(params.id) }, { $set: body })

        return NextResponse.json({ success: true, data: result, message: "data was changed " })

    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message })
    }
}


