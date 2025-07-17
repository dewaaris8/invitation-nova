import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Guest, { IGuest } from "@/models/Guest";

export async function GET() {
  try {
    await connectDB();
    const guests = await Guest.find();
    return NextResponse.json(guests);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { nama, ucapan, konfirmasiKehadiran } = await req.json();

    if (!nama || !ucapan || !konfirmasiKehadiran) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newGuest = new Guest({ nama, ucapan, konfirmasiKehadiran });
    await newGuest.save();

    return NextResponse.json(newGuest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding data" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    await Guest.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting data" },
      { status: 500 }
    );
  }
}
