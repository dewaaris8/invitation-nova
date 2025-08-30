import mongoose, { Schema, Document } from "mongoose";

export interface IGuest extends Document {
  nama: string;
  ucapan: string;
  konfirmasiKehadiran: string;
  jumlahHadir: number; // <- pakai number lebih aman
}

const GuestSchema: Schema = new Schema({
  nama: { type: String, required: true },
  ucapan: { type: String, required: false },
  konfirmasiKehadiran: { type: String, required: true },
  jumlahHadir: { type: Number, required: true, default: 1 }, // <- default 1
});

export default mongoose.models.Guest ||
  mongoose.model<IGuest>("Guest", GuestSchema);
