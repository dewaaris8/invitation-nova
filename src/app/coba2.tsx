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

const images = ["/images/bg1.jpg", "/images/4.jpg", "/images/5.jpg"];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [currentImage, setCurrentImage] = useState(0);
  const bgRef = useRef(null);

  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.destroy(); // Cleanup on unmount
  //   };
  // }, []);

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
    <div className="w-full  h-max">
      {/* {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && ( */}
      <div className="w-full flex z-10 justify-end relative h-max">
        <div className="w-[calc(100%-450px)] h-[100vh] bg-black sticky top-0 bg-cover bg-center bg-no-repeat">
          {/* <div
            style={{ backgroundImage: "url('/images/cover.jpg')" }}
            className="w-[calc(100%-450px)] bg-cover bg-center bg-no-repeat"
          ></div> */}
        </div>
        <div className="w-full lg:max-w-[450px]  bg-[#111111] md:max-w-[450px] h-max lg:max-h-screen  mx-auto">
          <div
            ref={bgRef}
            className="w-full h-screen relative text-white text-center bg-cover bg-center bg-no-repeat transition-all duration-1000"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
          >
            <div className="absolute w-full inset-0 bg-[#111111]  opacity-50"></div>
            <div className="relative w-full h-full pt-[100px]">
              <div className="">
                <h3 className="text-[15px] font-Comfortaa tracking-[3px]">
                  PAWIWAHAN
                </h3>
                <h1 className="text-[40px] font-charmonman">Nova & Silvi</h1>
                <p className="text-[14px] font-Comfortaa">10 September 2025</p>
              </div>
              <WeddingCountdown />
            </div>
            <div
              className="w-full h-[100px] bottom-[-40px] z-10 text-white text-center absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: "url('/images/1.png')" }}
            ></div>
          </div>

          <div className="text-center relative overflow-hidden bg-[#111111] gap-2 pt-[100px] flex text-white flex-col items-center px-[10px]">
            {/* <div
              className="w-[100%] h-[600px] left-[-60px] opacity-20 text-white text-center absolute top-[-60px] bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: "url('/images/hiasan1.png')" }}
            ></div> */}

            <h1 className="text-[28px] font-NotoSerif">Om Swastyastu</h1>
            <p className="text-[10px] font-Comfortaa w-[85%]">
              Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan
              Yang Maha Esa, kami bermaksud mengundang Bapak/ Ibu/ Saudara/ i
              pada Upacara Manusa Yadnya Pewiwahan putra dan putri kami.
            </p>
          </div>
          <div className="w-full  flex px-[10px] flex-col gap-5 pt-[100px] items-center justify-center bg-[#111111] text-white h-max">
            <div className="w-[85%] h-max">
              <div className="">
                <p></p>
              </div>
              <div className="flex flex-col ">
                <div
                  style={{ backgroundImage: "url('/images/4.jpg')" }}
                  className="w-full bg-cover bg-center bg-no-repeat h-[450px] bg-red-700 flex justify-start relative"
                >
                  <div className="absolute w-[30%] border-r-2 border-b-2 border-white  h-[85%] right-[-5px] bottom-[-5px] "></div>
                  <div className="absolute w-[25%] border-r-2 border-b-2 border-[#F0A500]  h-[80%] right-[-10px] bottom-[-10px] "></div>
                  {/* <h3 className="mt-[-13px] font-NotoSerif italic text-[15px] absolute  bottom-[-10px]">
                    Mempelai Pria
                  </h3> */}
                </div>
                <div className="text-left mt-2">
                  <h1 className="text-[35px] font-allison">Dewa Gede Nova</h1>
                  <p className="text-[10px] text-left font-Comfortaa w-full">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Placeat ullam repellendus ipsa, accusamus enim adipisci!
                  </p>
                </div>
                <div
                  style={{ backgroundImage: "url('/images/5.jpg')" }}
                  className="w-full bg-cover mt-10 bg-center bg-no-repeat h-[450px] bg-red-700 flex justify-start relative"
                >
                  <div className="absolute w-[30%] border-l-2 border-t-2 border-white  h-[85%] left-[-5px] top-[-5px] "></div>
                  <div className="absolute w-[25%] border-l-2 border-t-2 border-[#F0A500]  h-[80%] left-[-10px] top-[-10px] "></div>
                  {/* <h3 className="mt-[-13px] text-[15px] absolute right-0  bottom-[-10px]">
                    Mempelai Pria
                  </h3> */}
                </div>
                <div className="text-right mt-2">
                  <h1 className="text-[35px] font-allison">Dewa Gede Nova</h1>
                  <p className="text-[10px] font-Comfortaa text-right w-full">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Placeat ullam repellendus ipsa, accusamus enim adipisci!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-[100px] flex px-[10px] flex-col gap-5 items-center justify-center bg-[#111111] text-white h-max">
            <div className="w-[85%] h-[180px] max-h-[180px] flex justify-center relative">
              <div className="absolute lg:top-[-5px] md:top-[-5px] w-[102%] z-10 top-[-7px] border-b-0 border-2 border-white  h-[100%]  "></div>
              <div className="absolute lg:top-[-10px] md:top-[-10px] z-10 top-[-12px] border-b-0 w-[104%] border-2 border-[#F0A500]  h-[100%]  "></div>
              <iframe
                className="w-[110%] h-[200px] flex justify-center relative"
                src="https://www.youtube.com/embed/Axqsi9ndBDU?autoplay=1&mute=1&loop=1&playlist=GxB_JdTHwSc"
                allow="accelerometer; autoplay; clipboard-write; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <h1 className="text-[18px] w-[85%] leading-[25px] font-charmonman absolute bottom-[-45px] font-light text-center">
                You are the smile I can't forget and the warmth I always crave.
              </h1>
            </div>
          </div>
          <div className="py-[300px] bg-[#111111] ">
            <ZoomParallax />
          </div>
          {/* <div className="w-full flex px-[10px] flex-col items-center justify-center bg-[#111111] text-white h-max">
            <h1 className="text-[28px] text-left">Save The Date</h1>
            <div className="w-[85%]  h-max">
              <h1 className="text-[12px]">Memadik</h1>
              <p className="text-[12px]">Monday, 10 September 2025</p>
            </div>
          </div> */}
        </div>
      </div>
      {/* )} */}
    </div>
    // form lama
    // <div className="w-[85%] pt-12 px-4 mx-auto pb-[200px] text-white relative">
    //         <div className="absolute top-0 left-0 w-full h-[200px] bg-[url('/bali-pattern.png')] opacity-20"></div>

    //         <h1 className="text-3xl font-semibold text-[#e6c643] text-center mb-6 tracking-widest uppercase">
    //           Bali Guestbook
    //         </h1>

    //         <form
    //           onSubmit={handleSubmit}
    //           className="mt-4 flex flex-col gap-4 bg-[#1a1a1a] p-6 rounded-lg shadow-md border border-[#e6c643]"
    //         >
    //           <input
    //             type="text"
    //             placeholder="Nama"
    //             value={nama}
    //             onChange={(e) => setNama(e.target.value)}
    //             className="border border-gray-600 bg-transparent p-3 rounded-md text-white focus:outline-none focus:border-[#e6c643] transition duration-300"
    //             required
    //           />
    //           <textarea
    //             placeholder="Ucapan"
    //             value={ucapan}
    //             onChange={(e) => setUcapan(e.target.value)}
    //             className="border border-gray-600 bg-transparent p-3 rounded-md text-white focus:outline-none focus:border-[#e6c643] transition duration-300"
    //             required
    //           />
    //           <select
    //             value={konfirmasiKehadiran}
    //             onChange={(e) => setKonfirmasiKehadiran(e.target.value)}
    //             className="border border-gray-600 bg-transparent p-3 rounded-md text-white focus:outline-none focus:border-[#e6c643] transition duration-300"
    //           >
    //             <option value="Hadir" className="bg-[#1a1a1a] text-white">
    //               Hadir
    //             </option>
    //             <option value="Tidak Hadir" className="bg-[#1a1a1a] text-white">
    //               Tidak Hadir
    //             </option>
    //           </select>
    //           <button
    //             type="submit"
    //             className="bg-gradient-to-r from-[#e6c643] to-[#b8860b] text-black font-semibold p-3 rounded-md hover:opacity-90 transition duration-300"
    //           >
    //             Kirim Ucapan
    //           </button>
    //         </form>

    //         <div className="relative mt-8">
    //           <h2 className="text-2xl font-semibold text-[#e6c643] text-center">
    //             Daftar Tamu
    //           </h2>
    //           <div className="w-20 h-1 bg-[#e6c643] mx-auto mt-2"></div>
    //         </div>

    //         <div className="max-h-[200px] overflow-y-auto bg-[#1a1a1a] p-4 rounded-lg mt-4 border border-[#e6c643] shadow-md">
    //           <ul className="space-y-3">
    //             {guests
    //               .slice()
    //               .reverse()
    //               .map((guest) => (
    //                 <li
    //                   key={guest._id}
    //                   className="border border-gray-600 p-3 rounded-md flex justify-between items-center bg-[#362c1e] shadow-sm"
    //                 >
    //                   <div>
    //                     <p className="text-white">
    //                       <strong className="text-[#e6c643]">
    //                         {guest.nama}
    //                       </strong>
    //                       : {guest.ucapan} ({guest.konfirmasiKehadiran})
    //                     </p>
    //                   </div>
    //                   <button
    //                     onClick={() => handleDelete(guest._id)}
    //                     className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300"
    //                   >
    //                     Hapus
    //                   </button>
    //                 </li>
    //               ))}
    //           </ul>
    //         </div>
    //       </div>
  );

  {
    /* <div className="w-full mx-auto flex flex-col ">
            <div
              style={{ backgroundImage: "url('/images/cover.jpg')" }}
              className="w-full bg-cover bg-center bg-no-repeat h-[250px]  flex justify-center items-center flex-col relative px-[10px]"
            >
              <div className="absolute w-[100%] z-50 mx-auto border-b-2 border-white  h-[85%]  bottom-[0px] "></div>
              <div className="absolute w-[100%] z-50 mx-auto border-b-2 border-[#F0A500]  h-[80%] bottom-[5px] "></div>
              <h1 className="text-white z-50 text-[20px] font-NotoSerif tracking-[3px]">
                RSVP
              </h1>
              <p className="text-white z-50 text-[13px] font-Comfortaa w-[85%] text-center">
                Please confirm your attendance through reservation form below
              </p>
              <div className="absolute w-full inset-0 bg-[#111111]  opacity-50"></div>
            </div>
          </div> */
  }
}

{
  /* <div className="relative  w-[100%] h-[100px] bg-white">
            <div
              className="w-full rotate-90 h-[200px] top-[-60px] z-50 text-white text-center  absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: "url('/images/hiasan2.png')" }}
            ></div>
            <div
              className="w-full  h-[200px] top-[0] right-[-200px] z-50 text-white text-center  absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{ backgroundImage: "url('/images/hiasan6.png')" }}
            ></div>
          </div> */
}
