import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDayTime } from "../../hooks/useDayTime";
import style from "./Time.module.scss";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import { format } from "date-fns";
import { WorldTime } from "../../types/WorldTime";
import { GeoLocation } from "../../types/GeoLocation";

type Props = {
    time: WorldTime;
    location: GeoLocation;
    setIsDetailed: React.Dispatch<React.SetStateAction<boolean>>;
    isDetailed: boolean;
};
const Time: React.FC<Props> = ({
    time,
    location,
    isDetailed,
    setIsDetailed,
}) => {
    const isDayTime = useDayTime();

    return (
        <motion.div className={style["time"]}>
            <div className={style["time__content-wrapper"]}>
                <motion.div className={style["time__greetings"]}>
                    <span>
                        {isDayTime ? (
                            <MdLightMode
                                className={style["time__greetings-icon"]}
                            />
                        ) : (
                            <MdDarkMode
                                className={style["time__greetings-icon"]}
                            />
                        )}
                    </span>
                    <span className={style["time__greetings-text"]}>
                        Good {isDayTime ? "Morning" : "Evening"}
                    </span>
                </motion.div>
                <motion.div>
                    <h2 className={style["time__time-wrapper"]}>
                        <span className={style["time__time"]}>
                            {format(new Date(), "HH:mm")}
                        </span>
                        <small className={style["time__time-abbrevation"]}>
                            {time.abbreviation}
                        </small>
                    </h2>
                </motion.div>
                <motion.div>
                    <h3 className={style["time__location"]}>
                        <span>
                            In {location.city}, {location.country}
                        </span>
                    </h3>
                </motion.div>
            </div>
            <div className={style["time__content-more"]}>
                <motion.button
                    className={style["more"]}
                    onClick={() => setIsDetailed(!isDetailed)}
                >
                    <AnimatePresence exitBeforeEnter>
                        {isDetailed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={style["more__text"]}
                            >
                                Less
                            </motion.span>
                        )}
                        {!isDetailed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={style["more__text"]}
                            >
                                More
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <motion.div className={`${style["more__icon-wrapper"]} `}>
                        <BiChevronDown
                            className={`${style["more__icon"]} ${
                                isDetailed ? "rotate-180" : ""
                            }`}
                        />
                    </motion.div>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Time;
