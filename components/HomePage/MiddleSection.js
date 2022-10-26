import React, { useEffect, useRef, useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Image from "next/image";
import ImgCard from "../ImgCard/ImgCard";
import { motion } from "framer-motion";
import Link from "next/link";
function MiddleSection() {
  const [scrollImg, setScrollImg] = useState(0);
  const [loadValue, setValue] = useState();
  const imgInfo = [
    {
      name: "Desert",
      url: "https://images.pexels.com/photos/2563733/pexels-photo-2563733.jpeg?auto=compress&cs=tinysrgb&w=1600",
      id: "ChIJaxhMy-sIK4cRcc3Bf7EnOUI",
    },
    {
      name: "Forest",
      url: "https://images.pexels.com/photos/2397648/pexels-photo-2397648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      id: "ChIJUa9wE0kSAHwRQPTG8kygtSs",
    },
    {
      name: "Sea",
      url: "https://images.pexels.com/photos/3434562/pexels-photo-3434562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      id: "ChIJpycV_OjBuokRcwEuo4AQFgQ",
    },
    {
      name: "City",
      url: "https://images.pexels.com/photos/2224861/pexels-photo-2224861.png?auto=compress&cs=tinysrgb&w=1600",
      id: "ChIJOwg_06VPwokRYv534QaPC8g",
    },
    {
      name: "Event",
      url: "https://images.pexels.com/photos/3149896/pexels-photo-3149896.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  const ref = useRef([]);
  const boxCard = useRef(null);

  const scrollBtn = (e) => {
    let arrLength = ref.current.length - 1;
    let firstBoxLeft = ref.current[0].getBoundingClientRect().left;
    let lastBoxRight = ref.current[arrLength].getBoundingClientRect().right;
    let boxCardLeft = boxCard.current.getBoundingClientRect().left;
    let boxCardRight = boxCard.current.getBoundingClientRect().right;
    if (e === "right") {
      let temp = lastBoxRight - 500;
      if (temp > boxCardRight) {
        setScrollImg(scrollImg - 500);
      }
      if (temp <= boxCardRight) {
        setScrollImg(scrollImg - lastBoxRight + boxCardRight);
      }
    }
    if (e === "left") {
      let temp = firstBoxLeft + 500;
      if (temp < boxCardLeft) {
        setScrollImg(scrollImg + 500);
      }
      if (temp >= boxCardLeft) {
        setScrollImg(scrollImg + boxCardLeft - firstBoxLeft);
      }
    }
  };
  useEffect(() => {
    if (ref) {
      setValue(ref.current);
    }
  }, [ref]);

  return (
    <div
      className="absolute top-0 h-[100vh] w-full overflow-hidden"
      id="middleSection"
    >
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2673&q=80"
        alt="No image found"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute h-full w-full text-black overflow-hidden">
        <div className="flex flex-col h-full w-full justify-center items-center">
          <p className="tracking-wider text-[40px] font-bold subpixel-antialiased font-mono text-sky-900 text-center">
            <span className="text-[60px]">THE WORLD</span>
            <br /> IS WAITING FOR YOU <br /> GOOD LUCK, TRAVEL SAFE. GO!
          </p>

          <div
            className={`flex flex-col justify-center w-[1144px] overflow-hidden `}
            ref={(el) => (boxCard.current = el)}
          >
            <div className="flex items-center space-x-[36px] mt-10">
              {imgInfo.map((doc, index) => (
                <Link  key={doc.name} href={`hotels/${doc.id}`} >
                  <motion.div
                    className="drop-shadow-sm cursor-pointer rounded-[48px] shadow-lg hover:shadow-lg hover:shadow-indigo-500"
                   
                    animate={{ x: scrollImg }}
                    transition={{ type: "spring", stiffness: 100 }}
                    ref={(el) => (ref.current[index] = el)}
                  >
                    <ImgCard value={doc} />
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="flex flex-row justify-center items-center mt-10">
              <div className="flex flex-row space-x-10 p-2 text-white text-[40px]">
                <button
                  className="flex h-[60px] w-[60px] justify-center items-center border border-white-900 rounded-full hover:text-black hover:bg-white"
                  onClick={() => scrollBtn("left")}
                >
                  <ArrowBackIosNewOutlinedIcon
                    color="inherit"
                    fontSize="inherit"
                  />
                </button>
                <button
                  className="flex h-[60px] w-[60px] justify-center items-center border border-white-900 rounded-full hover:text-black hover:bg-white"
                  onClick={() => scrollBtn("right")}
                >
                  <ArrowForwardIosOutlinedIcon
                    color="inherit"
                    fontSize="inherit"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
