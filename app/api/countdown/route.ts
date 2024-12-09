import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const client = await clientPromise;
        const db = client.db('mydatabase');

        const countdown = await db.collection("countdown").find().toArray();

        return NextResponse.json({ success: true, data: countdown, message: "success" });

    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const client = await clientPromise;
        const db = client.db('mydatabase');
        const body = await req.json();

        // Удаление всех старых записей
        await db.collection("countdown").deleteMany({});

        // Добавление новой записи
        const result = await db.collection("countdown").insertOne(body);

        return NextResponse.json({ success: true, data: result, message: "Countdown added and old records deleted" });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message });
    }
};
