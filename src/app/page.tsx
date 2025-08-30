"use client";

import Image from "next/image";
import Preloader from "./components/Preloader";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import WeddingCountdown from "./components/WeddingCountdown";
import ZoomParallax from "./components/ZoomParallax";
import Lenis from "@studio-freight/lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import HorizontalScrollSlider from "./components/HorizontalScrollSlider";
import { useSearchParams } from "next/navigation";

const images = ["/images/nova4.jpg", "/images/nova3.jpg", "/images/nova6.jpg"];

export interface Guest {
  _id?: string;
  nama: string;
  ucapan: string;
  konfirmasiKehadiran: string;
  jumlahHadir: number;
}

export default function Home() {
  const searchParams = useSearchParams();
  const to = searchParams.get("to");

  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [konfirmasiKehadiran, setKonfirmasiKehadiran] = useState("Hadir");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jumlahHadir, setJumlahHadir] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const bgRef = useRef<HTMLDivElement | null>(null);

  // =======================
  // Guestbook: fetch & CRUD
  // =======================
  useEffect(() => {
    fetchGuests();
  }, []);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const fetchGuests = async () => {
    const res = await fetch("/api/guestbook");
    const data = await res.json();
    setGuests(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, ucapan, konfirmasiKehadiran, jumlahHadir }),
    });

    if (res.ok) {
      fetchGuests();
      setNama("");
      setUcapan("");
      setKonfirmasiKehadiran("Hadir");
      setJumlahHadir(""); // reset
    }
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/guestbook", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchGuests();
  };

  // =======================
  // Smooth scroll (Lenis)
  // =======================
  useEffect(() => {
    const lenis = new Lenis();

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // =======================
  // Slideshow (interval)
  // =======================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full relative bg-[#111111] h-max">
      {/* COVER ATAS */}
      <div
        style={{ backgroundImage: "url('/images/Page 1.png')" }}
        className="w-full sticky left-0 top-0 h-[100vh] bg-cover bg-center bg-no-repeat"
      >
        <div className="lg:max-w-[450px] w-full text-center text-white h-[100vh] mx-auto flex flex-col justify-center items-center">
          <div className="relative w-full h-full pt-[100px]">
            <div>
              <h3 className="text-[13px] font-Comfortaa tracking-[2px]">
                WE INVITE YOU TO <br /> CELEBRATE OUR WEDDING
              </h3>
              <h1 className="text-[40px] font-WindSong">Dewa &amp; Sylvana</h1>
              <p className="text-[14px] font-Comfortaa">2 November 2025</p>
            </div>

            <div className="absolute top-[50%] w-full text-center">
              <h3 className="text-[18px]">Dear :</h3>
              {to ? (
                <p className="text-lg mt-2 text-[23px] text-[#e6c643]">{to}</p>
              ) : (
                <p className="text-lg mt-2 text-[23px] text-[#e6c643]">
                  Tamu Undangan!
                </p>
              )}
            </div>
          </div>

          <div className="absolute bottom-10 flex flex-col items-center">
            <p className="text-[12px] text-center font-Comfortaa uppercase tracking-[2px] text-white">
              Please scroll <br /> to open invitation
            </p>
            <img
              src="/images/gif2.gif"
              alt="Scroll Down"
              className="w-[100px] mt-2"
            />
          </div>
        </div>
      </div>

      {/* {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && ( */}
      <div className="w-full flex z-10 relative h-max">
        <div className="w-full bg-[#111111] md:max-w-[450px] lg:max-w-[450px] h-max lg:max-h-screen mx-auto">
          {/* SLIDESHOW */}
          <div className="w-full h-screen relative text-white text-center overflow-hidden">
            {/* Background slideshow */}
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}

            {/* Overlay hitam */}
            <div className="absolute w-full inset-0 bg-[#111111] opacity-50" />

            {/* Konten utama */}
            <div className="relative w-full h-full pt-[100px] z-10">
              <div>
                <h3 className="text-[15px] font-Comfortaa tracking-[2px]">
                  PAWIWAHAN
                </h3>
                <h1 className="text-[40px] font-WindSong">
                  Dewa &amp; Sylvana
                </h1>
                <p className="text-[14px] font-Comfortaa">2 November 2025</p>
              </div>
              <WeddingCountdown />
            </div>

            {/* Ornamen bawah */}
            <div
              className="w-full h-[100px] bottom-[-40px] z-40 text-white text-center absolute bg-cover bg-center"
              style={{ backgroundImage: "url('/images/1.png')" }}
            />
          </div>

          {/* OM SWASTYASTU */}
          <div className="text-center relative bg-[#111111] z-50 overflow-hidden gap-2 pt-[100px] flex text-white flex-col items-center px-[10px]">
            <div
              className="w-full h-[100px] top-[-60px] z-50 text-white text-center absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: "url('/images/1.png')" }}
            />
            <h1 className="text-[30px] font-NotoSerif">
              ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬ <span className="ml-[5px]">ᬲ᭄ᬢᬸ</span>
            </h1>
            <p className="text-[10px] mt-5 font-Comfortaa w-[85%]">
              Atas Asung Kerta Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang
              Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada
              Upacara Manusa Yadnya Pawiwahan putra dan putri kami.
            </p>
          </div>

          {/* MEMPELAI */}
          <div className="w-full flex px-[10px] flex-col gap-5 pt-[100px] items-center justify-center bg-[#111111] text-white h-max">
            <div className="w-[85%] h-max">
              <div className="w-full flex flex-col justify-center items-center pb-[20px]">
                <h3 className="text-[15px] font-Comfortaa tracking-[2px]">
                  PAWIWAHAN
                </h3>
              </div>

              <div className="flex flex-col">
                <div
                  data-aos="fade-left"
                  style={{ backgroundImage: "url('/images/nova3.png')" }}
                  className="w-full bg-cover bg-center bg-no-repeat h-[450px] flex justify-start relative"
                >
                  <div className="absolute w-[30%] border-r-2 border-b-2 border-white h-[85%] right-[-5px] bottom-[-5px]" />
                  <div className="absolute w-[25%] border-r-2 border-b-2 border-[#e6c643] h-[80%] right-[-10px] bottom-[-10px]" />
                </div>

                <div className="text-left mt-2">
                  <h1 className="text-[35px] font-allison tracking-[5px]">
                    Dewa Gde Nova Hariadhi
                  </h1>
                  <p className="text-[10px] text-left font-Comfortaa w-full">
                    Putra dari Bapak Dewa Putu Gede Raka &amp; Ibu Desak Ayu
                    Suartini
                  </p>
                </div>

                <div
                  data-aos="fade-right"
                  style={{ backgroundImage: "url('/images/nova4.png')" }}
                  className="w-full bg-cover mt-10 bg-center bg-no-repeat h-[450px] flex justify-start relative"
                >
                  <div className="absolute w-[30%] border-l-2 border-t-2 border-white h-[85%] left-[-5px] top-[-5px]" />
                  <div className="absolute w-[25%] border-l-2 border-t-2 border-[#e6c643] h-[80%] left-[-10px] top-[-10px]" />
                </div>

                <div className="text-right mt-2">
                  <h1 className="text-[35px] tracking-[5px] font-allison">
                    Sylvana Yulianti
                  </h1>
                  <p className="text-[10px] font-Comfortaa text-right w-full">
                    Putri dari Bapak Sri Didik Purwanto &amp; Ibu Titik
                    Sugiyanti
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VIDEO (diganti placeholder gambar) */}
          <div className="w-full py-[100px] flex px-[10px] flex-col gap-5 items-center justify-center bg-[#111111] text-white h-max">
            <div className="w-[85%] h-[180px] max-h-[180px] flex justify-center relative">
              <div className="absolute lg:top-[-5px] md:top-[-5px] w-[102%] z-10 top-[-7px] border-b-0 border-2 border-white h-[100%]" />
              <div className="absolute lg:top-[-10px] md:top-[-10px] z-10 top-[-12px] border-b-0 w-[104%] border-2 border-[#e6c643] h-[100%]" />
              <div
                data-aos="fade-up"
                style={{ backgroundImage: "url('/images/Page video.png')" }}
                className="w-full bg-cover bg-center bg-no-repeat flex h-[200px] justify-start relative"
              />
              <h1 className="text-[18px] w-[85%] leading-[25px] font-charmonman absolute bottom-[-45px] font-light text-center">
                Every time I see you, I find the comfort I’ve been searching
                for.
              </h1>
            </div>
          </div>

          {/* WEDDING EVENT */}
          <div className="text-center relative bg-[#111111]  z-50 overflow-hidden mt-7 gap-2 py-[150px] flex text-white flex-col items-center justify-center px-[10px]">
            <div className="absolute w-full inset-0 bg-[#111111] opacity-50" />
            <div
              className="w-full h-[200px] top-[-25px] z-50 absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: "url('/images/hiasan3.png')" }}
            />
            <div
              className="w-full h-[200px] bottom-[-0px] right-[-200px] z-50 absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: "url('/images/hiasan5.png')" }}
            />
            <div
              className="w-full h-[200px] bottom-[-0px] scale-x-[-1] right-[200px] z-50 absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: "url('/images/hiasan5.png')" }}
            />

            <h1 className="text-[13px] uppercase mt-10 z-50 font-Comfortaa tracking-[4px]">
              our wedding event
            </h1>
            <p className="text-[28px] mt-5 z-50 font-[500] tracking-[2px] font-NotoSerif w-[85%]">
              Pawiwahan
            </p>
            <p className="text-[12px] mt-5 z-50 uppercase tracking-[2px] font-Comfortaa w-[85%]">
              Minggu, 2 November 2025
            </p>
            <h1 className="text-[12px] uppercase mt-5 tracking-[2px] font-Comfortaa z-50">
              Pukul 15.00 - 17.00 WITA
            </h1>
            <h1 className="text-[12px] mt-5 font-Comfortaa uppercase z-50 tracking-[2px]">
              Taman Prakerti Bhuana
            </h1>

            <p className="text-[28px] mt-5 z-50 font-[500] tracking-[2px] font-NotoSerif w-[85%]">
              Resepsi
            </p>
            <p className="text-[12px] mt-5 z-50 uppercase tracking-[2px] font-Comfortaa w-[85%]">
              Minggu, 2 November 2025
            </p>
            <h1 className="text-[12px] uppercase mt-5 tracking-[2px] font-Comfortaa z-50">
              Pukul 17.00 - 20.00
            </h1>
            <h1 className="text-[12px] mt-5 font-Comfortaa uppercase z-50 tracking-[2px]">
              Taman Prakerti Bhuana
            </h1>
            <p className="text-[12px] uppercase mt-5 z-50 tracking-[2px] font-Comfortaa w-[85%]">
              Beng, Kabupaten <br /> Gianyar, Bali
            </p>
            <a
              className="bg-gradient-to-r text-[13px] from-[#e6c643] to-[#c8a530] text-black mt-5 font-Comfortaa px-10 py-2 z-[100]"
              href="https://maps.app.goo.gl/BDTCXj1127ALtCCD7"
            >
              Get Direction
            </a>
          </div>

          <div className="relative mt-[-50px] lg:mt-0">
            <ZoomParallax />
          </div>

          <div className="min-h-screen text-white">
            <HorizontalScrollSlider />
          </div>

          {/* UCAPAN */}
          <div
            className="w-full mt-[-250px] h-[100vh] flex flex-col items-center justify-center text-white relative bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/bgForm.png')",
            }}
          >
            <div className="z-50">
              <div className="w-[85%] px-[10px] mx-auto">
                <p className="text-left font-NotoSerif text-[18px]">
                  Please confirm your attendance <br /> and share your best
                  wishes.
                </p>
                <p className="text-left font-Comfortaa mt-3 text-[13px]">
                  Your presence means a lot to us! Please confirm your
                  attendance and share your best wishes.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-4 flex h-max flex-col font-Comfortaa gap-4 py-6 shadow-md relative"
                >
                  <input
                    type="text"
                    placeholder="Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="font-Comfortaa border-b-2 border-white bg-transparent text-[13px] p-2 text-white focus:outline-none focus:border-[#e6c643] transition duration-300 placeholder-white"
                    required
                  />
                  <textarea
                    placeholder="Ucapan"
                    value={ucapan}
                    onChange={(e) => setUcapan(e.target.value)}
                    className="font-Comfortaa text-[13px] border-b-2 border-white bg-transparent p-2 text-white focus:outline-none focus:border-[#e6c643] transition duration-300 placeholder-white"
                    required
                  />
                  <select
                    value={konfirmasiKehadiran}
                    onChange={(e) => setKonfirmasiKehadiran(e.target.value)}
                    className="border-b-2 border-white bg-transparent p-2 text-white text-[13px] focus:outline-none focus:border-[#e6c643] transition duration-300"
                  >
                    <option value="Hadir" className="text-black font-Comfortaa">
                      Hadir
                    </option>
                    <option
                      value="Tidak Hadir"
                      className="text-black font-Comfortaa"
                    >
                      Tidak Hadir
                    </option>
                  </select>
                  <select
                    value={jumlahHadir}
                    onChange={(e) => setJumlahHadir(e.target.value)}
                    className={`border-b-2 border-white bg-transparent p-2 text-white text-[13px] focus:outline-none focus:border-[#e6c643] transition duration-300 ${
                      konfirmasiKehadiran === "Tidak Hadir"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    required
                    disabled={konfirmasiKehadiran === "Tidak Hadir"}
                  >
                    <option value="" disabled hidden>
                      Jumlah Hadir
                    </option>
                    <option value="1" className="text-black font-Comfortaa">
                      1
                    </option>
                    <option value="2" className="text-black font-Comfortaa">
                      2
                    </option>
                    <option value="3" className="text-black font-Comfortaa">
                      3
                    </option>
                  </select>
                  <button
                    type="submit"
                    className="bg-gradient-to-r text-[13px] from-[#e6c643] to-[#c8a530] text-black font-semibold p-2 mt-2 hover:opacity-90 transition duration-300 cursor-pointer z-50"
                  >
                    Kirim Ucapan
                  </button>
                </form>
              </div>

              <div className="flex items-center justify-center my-6">
                <div
                  className="w-full h-[100px] text-white text-center absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
                  style={{ backgroundImage: "url('/images/hiasan8.png')" }}
                />
              </div>

              <div className="max-h-[200px] z-50 overflow-y-auto p-4 mt-4">
                <ul className="space-y-3">
                  {guests
                    .slice()
                    .reverse()
                    .map((guest) => (
                      <li
                        key={guest._id}
                        className="border-b-2 w-[85%] z-50 mx-auto p-3 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-white text-[13px]">
                            <strong className="text-[#e6c643]">
                              {guest.nama}
                            </strong>
                            : {guest.ucapan}
                          </p>
                          {/* ({guest.konfirmasiKehadiran}) */}
                        </div>

                        {/* Contoh tombol hapus (opsional)
                          <button
                            onClick={() => handleDelete(guest._id)}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Hapus
                          </button>
                          */}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Wedding Gifts (opsional) */}
          {/* ... */}
          <div className="w-full text-center relative bg-[#111111] z-50 overflow-hidden gap-2 py-[100px] flex text-white flex-col items-center px-[10px] h-max">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-[30px] font-NotoSerif">Thankyou</h1>
              <p className="text-[10px] mt-5 font-Comfortaa w-[70%]">
                Looking forward to having you with us and creating special
                memories together at our event. Don’t miss it!
              </p>
            </div>
            <div
              style={{
                backgroundImage: "url('/images/Thank you.png')",
              }}
              className="w-[75%] bg-[#ffffff] mt-5  h-[400px] bg-cover bg-center bg-no-repeat"
            ></div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-[30px] mt-5 font-NotoSerif">
                ᬑᬁ ᬰᬦ᭄ᬢᬶ ᬰᬦ᭄ᬢᬶ ᬰᬦ᭄ᬢᬶ ᬑᬁ
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
