import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const client = await clientPromise;
        const db = client.db('mydatabase');

        const users = await db.collection("users").find().toArray();

        return NextResponse.json({ success: true, data: users, message: "success" });

    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
};/*  */

export const POST = async (req: NextRequest) => {

    try {
        const client = await clientPromise

        const db = client.db('mydatabase')
        const body = await req.json()
        const result = await db.collection("users").insertOne(body)

        return NextResponse.json({ success: true, data: result, message: "new product added" })

    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message })
    }
}

