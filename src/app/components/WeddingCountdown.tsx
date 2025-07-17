import { useState, useEffect } from "react";

const WeddingCountdown = () => {
  // Tanggal acara
  const targetDate = new Date("2025-11-02T00:00:00").getTime();

  // State untuk countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="absolute bottom-[120px] left-1/2 transform -translate-x-1/2 text-white text-center">
      {/* <h3 className="text-[20px] font-bold font-Comfortaa">
        Countdown to Our Wedding
      </h3> */}
      <div className="flex justify-center gap-4 mt-3 text-[20px] font-bold">
        <div className="w-[70px] h-[70px] flex flex-col justify-center ">
          <span>{timeLeft.days}</span>
          <span className="text-[12px] font-normal">Days</span>
        </div>
        <span className="h-[70px] w-[2px] bg-[#e6c643]"></span>
        <div className="w-[70px] h-[70px] flex flex-col justify-center ">
          <span>{timeLeft.hours}</span>
          <span className="text-[12px] font-normal">Hours</span>
        </div>
        <span className="h-[70px] w-[2px] bg-[#e6c643]"></span>
        <div className="w-[70px] h-[70px] flex flex-col justify-center ">
          <span>{timeLeft.minutes}</span>
          <span className="text-[12px] font-normal">Minutes</span>
        </div>
        <span className="h-[70px] w-[2px] bg-[#e6c643]"></span>
        <div className="w-[70px] h-[70px] flex flex-col justify-center ">
          <span>{timeLeft.seconds}</span>
          <span className="text-[12px] font-normal">Seconds</span>
        </div>
        {/* <div className="w-[70px] h-[70px] bg-white text-black flex flex-col justify-center rounded-lg">
          <span>{timeLeft.hours}</span>
          <span className="text-[12px] font-normal">Hours</span>
        </div>
        <div className="w-[70px] h-[70px] bg-white text-black flex flex-col justify-center rounded-lg">
          <span>{timeLeft.minutes}</span>
          <span className="text-[12px] font-normal">Minutes</span>
        </div>
        <div className="w-[70px] h-[70px] bg-white text-black flex flex-col justify-center rounded-lg">
          <span>{timeLeft.seconds}</span>
          <span className="text-[12px] font-normal">Seconds</span>
        </div> */}
      </div>
    </div>
  );
};

// ✅ Export komponen agar bisa digunakan di file lain
export default WeddingCountdown;
