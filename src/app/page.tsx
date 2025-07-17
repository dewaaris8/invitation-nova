"use client";

import Image from "next/image";
import Preloader from "./components/Preloader";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Hiasan from "/images/hiasan1.png";
import ReactPlayer from "react-player";
import WeddingCountdown from "./components/WeddingCountdown";
import ZoomParallax from "./components/ZoomParallax";
import Lenis from "@studio-freight/lenis";
import HorizontalScrollSlider from "./components/HorizontalScrollSlider";
import Slider from "./components/Slides";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const images = ["/images/nova4.jpg", "/images/nova3.jpg", "/images/nova6.jpg"];
interface Guest {
  _id: string;
  nama: string;
  ucapan: string;
  konfirmasiKehadiran: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const to = searchParams.get("to");
  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [konfirmasiKehadiran, setKonfirmasiKehadiran] = useState("Hadir");
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    fetchGuests();
  }, []);

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Fetches all guests from the API and sets the `guests` state to the
   * response data.
/*******  1f8d9655-9ce8-426a-9d44-7152f560bd98  *******/
  const fetchGuests = async () => {
    const res = await fetch("/api/guestbook");
    const data = await res.json();
    setGuests(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted!"); // Cek apakah fungsi dijalankan

    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, ucapan, konfirmasiKehadiran }),
    });

    if (res.ok) {
      fetchGuests();
      setNama("");
      setUcapan("");
      setKonfirmasiKehadiran("Hadir");
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
  const [isLoading, setIsLoading] = useState(true);

  const [currentImage, setCurrentImage] = useState(0);
  const bgRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          gsap.to(bgRef.current, { opacity: 1, duration: 1 });
        },
      });
    }
  }, [currentImage]);
  return (
    <div className="w-full relative bg-[#111111] h-max ">
      <div
        style={{ backgroundImage: "url('/images/nova.jpg')" }}
        className="w-[100%] sticky left-0  top-0 h-[100vh] bg-cover bg-center bg-no-repeat"
      >
        {/* <div className="absolute w-full inset-0 bg-[#000000]  opacity-65"></div> */}
        <div className="lg:max-w-[450px] w-full text-center text-white h-[100vh] mx-auto flex flex-col justify-center items-center">
          <div className="relative w-full h-full pt-[100px]">
            <div className="">
              <h3 className="text-[13px] font-Comfortaa tracking-[2px]">
                WE INVITE YOU TO <br /> CELEBRATE OUR WEDDING
              </h3>
              <h1 className="text-[40px] font-WindSong">Nova & Silvi</h1>
              <p className="text-[14px] font-Comfortaa">10 September 2025</p>
            </div>
            <div className="absolute top-[50%] w-full text-center">
              <h3 className="text-[18px] ">Dear :</h3>
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
              src="/images/gif2.gif" // Replace with your own GIF
              alt="Scroll Down"
              className="w-[100px] mt-2"
            />
          </div>
        </div>
      </div>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="w-full flex z-10 relative h-max">
          <div className="w-full   bg-[#111111] md:max-w-[450px] lg:max-w-[450px] h-max lg:max-h-screen mx-auto">
            {/* hero section */}
            <div
              ref={bgRef}
              className="w-full h-screen relative text-white text-center bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: `url(${images[currentImage]})` }}
            >
              <div className="absolute w-full inset-0 bg-[#111111]  opacity-50"></div>
              <div className="relative w-full h-full pt-[100px]">
                <div className="">
                  <h3 className="text-[15px] Comfortaa trackingfont--[3px]">
                    PAWIWAHAN
                  </h3>
                  <h1 className="text-[40px] font-WindSong">Nova & Silvi</h1>
                  <p className="text-[14px] font-Comfortaa">
                    10 September 2025
                  </p>
                </div>
                <WeddingCountdown />
              </div>
              <div
                className="w-full h-[100px] bottom-[-40px] z-40 text-white text-center absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{ backgroundImage: "url('/images/1.png')" }}
              ></div>
            </div>
            {/* hero section */}
            {/* om swastyastu */}
            <div className="text-center relative bg-[#111111] z-50 overflow-hidden gap-2 pt-[100px] flex text-white flex-col items-center px-[10px]">
              <div
                className="w-full h-[100px] top-[-60px] z-50 text-white text-center absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{ backgroundImage: "url('/images/1.png')" }}
              ></div>
              <h1 className="text-[28px] font-NotoSerif">Om Swastyastu</h1>
              <p className="text-[10px] font-Comfortaa w-[85%]">
                Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan
                Yang Maha Esa, kami bermaksud mengundang Bapak/ Ibu/ Saudara/ i
                pada Upacara Manusa Yadnya Pewiwahan putra dan putri kami.
              </p>
            </div>
            {/* om swastyastu */}

            {/* mempelai */}
            <div className="w-full  flex px-[10px] flex-col gap-5 pt-[100px] items-center justify-center bg-[#111111] text-white h-max">
              <div className="w-[85%] h-max">
                <div className="w-full flex flex-col justify-center items-center pb-[20px]">
                  <h3 className="text-[18px] text-center font-Kodchasan tracking-[3px]">
                    PAWIWAHAN
                  </h3>
                </div>
                <div className="flex flex-col ">
                  <div
                    style={{ backgroundImage: "url('/images/nova3.jpg')" }}
                    className="w-full bg-cover bg-center bg-no-repeat h-[450px] flex justify-start relative"
                  >
                    <div className="absolute w-[30%] border-r-2 border-b-2 border-white  h-[85%] right-[-5px] bottom-[-5px] "></div>
                    <div className="absolute w-[25%] border-r-2 border-b-2 border-[#e6c643]  h-[80%] right-[-10px] bottom-[-10px] "></div>
                  </div>
                  <div className="text-left mt-2">
                    <h1 className="text-[35px] font-allison tracking-[5px]">
                      Dewa Gede Nova
                    </h1>
                    <p className="text-[10px] text-left font-Comfortaa w-full">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Placeat ullam repellendus ipsa, accusamus enim adipisci!
                    </p>
                  </div>
                  <div
                    style={{ backgroundImage: "url('/images/nova4.jpg')" }}
                    className="w-full bg-cover mt-10 bg-center bg-no-repeat h-[450px]  flex justify-start relative"
                  >
                    <div className="absolute w-[30%] border-l-2 border-t-2 border-white  h-[85%] left-[-5px] top-[-5px] "></div>
                    <div className="absolute w-[25%] border-l-2 border-t-2 border-[#e6c643]  h-[80%] left-[-10px] top-[-10px] "></div>
                  </div>
                  <div className="text-right mt-2">
                    <h1 className="text-[35px] tracking-[5px]  font-allison">
                      Dewa Gede Nova
                    </h1>
                    <p className="text-[10px] font-Comfortaa text-right w-full">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Placeat ullam repellendus ipsa, accusamus enim adipisci!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* mempelai */}
            {/* video */}
            <div className="w-full py-[100px] flex px-[10px] flex-col gap-5 items-center justify-center bg-[#111111] text-white h-max">
              <div className="w-[85%] h-[180px] max-h-[180px] flex justify-center relative">
                <div className="absolute lg:top-[-5px] md:top-[-5px] w-[102%] z-10 top-[-7px] border-b-0 border-2 border-white  h-[100%]  "></div>
                <div className="absolute lg:top-[-10px] md:top-[-10px] z-10 top-[-12px] border-b-0 w-[104%] border-2 border-[#e6c643]  h-[100%]  "></div>
                <iframe
                  className="w-[110%] h-[200px] flex justify-center relative"
                  src="https://www.youtube.com/embed/Axqsi9ndBDU?autoplay=1&mute=1&loop=1&playlist=GxB_JdTHwSc"
                  allow="accelerometer; autoplay; clipboard-write; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <h1 className="text-[18px] w-[85%] leading-[25px] font-charmonman absolute bottom-[-45px] font-light text-center">
                  Every time I see you, I find the comfort I’ve been searching
                  for.
                </h1>
              </div>
            </div>
            {/* video */}
            {/* wedding event */}
            <div
              style={{ backgroundImage: "url('/images/bg1.jpg')" }}
              className="text-center relative bg-[#111111] z-50 mt-7  gap-2 py-[150px] flex text-white flex-col items-center overflow-hidden justify-center  px-[10px]"
            >
              <div className="absolute w-full inset-0 bg-[#111111]  opacity-50"></div>
              <div
                className="w-full h-[200px]  top-[-25px]  z-50  absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{ backgroundImage: "url('/images/hiasan3.png')" }}
              ></div>
              <div
                className="w-full h-[200px]  bottom-[-50px] right-[-200px]  z-50  absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{ backgroundImage: "url('/images/hiasan5.png')" }}
              ></div>
              <div
                className="w-full h-[200px]  bottom-[-50px] scale-x-[-1] right-[200px]  z-50  absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{ backgroundImage: "url('/images/hiasan5.png')" }}
              ></div>

              <h1 className="text-[13px] uppercase mt-10 z-50 font-Comfortaa tracking-[4px]">
                our wedding event
              </h1>
              <p className="text-[28px] mt-5 z-50 font-[500] tracking-[2px] font-NotoSerif w-[85%]">
                Resepsi
              </p>
              <p className="text-[12px] mt-5 z-50 uppercase tracking-[2px] font-Comfortaa w-[85%]">
                Rabu, 14 Januari 2025
              </p>
              <h1 className="text-[12px] uppercase mt-5 tracking-[2px] font-Comfortaa z-50">
                Pukul 14.00 wita - Selesai
              </h1>
              <h1 className="text-[12px] mt-5 font-Comfortaa uppercase z-50 tracking-[2px]">
                TAMAN PRAKERTI BHUANA
              </h1>
              <p className="text-[12px] uppercase mt-5 z-50 tracking-[2px] font-Comfortaa w-[85%]">
                Beng, Kabupaten <br /> Gianyar, Bali
              </p>
              <a
                className="bg-gradient-to-r  text-[13px] from-[#e6c643] to-[#c8a530] text-black mt-5 font-Comfortaa px-10 py-2 z-[100]"
                href="https://maps.app.goo.gl/BDTCXj1127ALtCCD7"
              >
                Get Direction
              </a>
            </div>
            {/* wedding event */}

            <div className="relative mt-[-50px] lg:mt-0">
              <ZoomParallax />
            </div>
            <div className="min-h-screen  text-white">
              <HorizontalScrollSlider />
            </div>
            {/* ucapan */}
            <div
              className="w-[100%] mt-[-250px] h-[100vh] flex flex-col items-center justify-center text-white relative bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/nova14.jpg')" }}
            >
              <div className="">
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
                    className="mt-4 flex h-max flex-col  font-Comfortaa gap-4 py-6 shadow-md relative"
                  >
                    <input
                      type="text"
                      placeholder="Nama"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className=" font-Comfortaa border-b-2 border-white bg-transparent text-[13px] p-2 text-white focus:outline-none  focus:border-[#e6c643] transition duration-300 placeholder-white"
                      required
                    />
                    <textarea
                      placeholder="Ucapan"
                      value={ucapan}
                      onChange={(e) => setUcapan(e.target.value)}
                      className=" font-Comfortaa text-[13px]  border-b-2 border-white bg-transparent p-2 text-white focus:outline-none focus:border-[#e6c643] transition duration-300 placeholder-white"
                      required
                    />
                    <select
                      value={konfirmasiKehadiran}
                      onChange={(e) => setKonfirmasiKehadiran(e.target.value)}
                      className="border-b-2 border-white  bg-transparent p-2  text-white text-[13px] focus:outline-none focus:border-[#e6c643] transition duration-300 "
                    >
                      <option
                        value="Hadir"
                        className=" text-black font-Comfortaa"
                      >
                        Hadir
                      </option>
                      <option
                        value="Tidak Hadir"
                        className=" text-black  font-Comfortaa"
                      >
                        Tidak Hadir
                      </option>
                    </select>
                    <button
                      type="submit"
                      className="bg-gradient-to-r  text-[13px] from-[#e6c643] to-[#c8a530] text-black font-semibold p-2 mt-2  hover:opacity-90 transition duration-300 cursor-pointer z-50 "
                    >
                      Kirim Ucapan
                    </button>
                  </form>
                </div>
                <div className="flex items-center justify-center my-6">
                  <div
                    className="w-full h-[100px] text-white text-center absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
                    style={{ backgroundImage: "url('/images/hiasan8.png')" }}
                  ></div>
                </div>
                <div className="max-h-[200px] z-50 overflow-y-auto  p-4  mt-4 ">
                  <ul className="space-y-3">
                    {guests
                      .slice()
                      .reverse()
                      .map((guest) => (
                        <li
                          key={guest._id}
                          className="border-b-2 w-[85%] z-50 mx-auto border-[] p-3  flex justify-between items-center "
                        >
                          <div>
                            <p className="text-white text-[13px]">
                              <strong className="text-[#e6c643]">
                                {guest.nama}
                              </strong>
                              : {guest.ucapan} ({guest.konfirmasiKehadiran})
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* ucapan */}

            {/* wedding gifts */}
            <div className="w-full py-[100px]  h-max relative text-white px-[10px]">
              <div className="w-[85%] mx-auto text-center">
                <h1 className="font-Kodchasan uppercase text-center text-[23px] ">
                  Wedding Gifts
                </h1>
                <p className="font-Comfortaa mt-3 text-[13px] ">
                  For those of you who want to give a token of love to the bride
                  and groom, you can use the virtual account or E-wallet below:
                </p>
                <p className="font-Comfortaa mt-5 text-[13px] ">
                  BCA (Bank Central Asia)
                </p>
                <p className="font-Comfortaa mt-3 mb-5 text-[13px] ">
                  081335261
                </p>
                <a
                  className="bg-gradient-to-r  text-[13px] from-[#e6c643] to-[#c8a530] text-black font-Comfortaa px-10 py-2 z-[100]"
                  href="https://maps.app.goo.gl/BDTCXj1127ALtCCD7"
                >
                  Get Direction
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
