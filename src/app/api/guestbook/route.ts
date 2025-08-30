import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";

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
    const body = await req.json();

    const newGuest = await Guest.create({
      nama: body.nama,
      ucapan: body.ucapan,
      konfirmasiKehadiran: body.konfirmasiKehadiran,
      jumlahHadir: Number(body.jumlahHadir) || 1, // pastikan angka
    });

    return NextResponse.json(newGuest, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error saving guest" },
      { status: 500 }
    );
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
