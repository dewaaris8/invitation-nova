import mongoose, { Schema, Document } from "mongoose";

export interface IGuest extends Document {
  nama: string;
  ucapan: string;
  konfirmasiKehadiran: "Hadir" | "Tidak Hadir" | "Mungkin";
}

const GuestSchema = new Schema<IGuest>({
  nama: { type: String, required: true },
  ucapan: { type: String, required: true },
  konfirmasiKehadiran: {
    type: String,
    enum: ["Hadir", "Tidak Hadir", "Mungkin"],
    required: true,
  },
});

export default mongoose.models.Guest ||
  mongoose.model<IGuest>("Guest", GuestSchema);
