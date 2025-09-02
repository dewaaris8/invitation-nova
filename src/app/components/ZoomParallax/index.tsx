"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Pic1 from "../../../../public/images/Gallery tengah.jpg";
import Pic2 from "../../../../public/images/Page 5 kanan atas.jpg";
import Pic3 from "../../../../public/images/Page 5 kiri Bawah.jpg";
import Pic4 from "../../../../public/images/kiriAtas.png";
import Pic5 from "../../../../public/images/kananBawah.png";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Pic1,
      scale: scale4,
    },
    {
      src: Pic2,
      scale: scale5,
    },
    {
      src: Pic3,
      scale: scale6,
    },
    {
      src: Pic4,
      scale: scale8,
    },
    {
      src: Pic4,
      scale: scale9,
    },
    {
      src: Pic5,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <Image src={src} fill alt="image" placeholder="blur" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
