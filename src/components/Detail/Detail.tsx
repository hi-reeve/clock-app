import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { WorldTime } from "../../types/WorldTime";
import style from "./Detail.module.scss";

type Props = {
    isDetailed: boolean;
    time: WorldTime;
};
const Detail: React.FC<Props> = ({ isDetailed, time }) => {
    return (
        <AnimatePresence>
            <motion.div
                className={`${style["detail"]} ${
                    isDetailed ? "lg:px-16 lg:py-8 p-6 mt-auto" : "p-0"
                }`}
                initial={{ height: 0 }}
                animate={{
                    height: "100%",
                }}
                exit={{ height: 0 }}
            >
                <motion.div className={style["detail__content-wrapper"]}>
                    <div className="flex flex-col w-full">
                        <motion.div className={style["detail__wrapper"]}>
                            <motion.span className={style["detail__label"]}>
                                Current Timezone
                            </motion.span>
                            <motion.span className={style["detail__content"]}>
                                {time.timezone}
                            </motion.span>
                        </motion.div>
                        <motion.div className={style["detail__wrapper"]}>
                            <motion.span className={style["detail__label"]}>
                                Day of the Year
                            </motion.span>
                            <motion.span className={style["detail__content"]}>
                                {time.day_of_year}
                            </motion.span>
                        </motion.div>
                    </div>
                    <div className="flex flex-col w-full">
                        <motion.div className={style["detail__wrapper"]}>
                            <motion.span className={style["detail__label"]}>
                                Day of the Week
                            </motion.span>
                            <motion.span className={style["detail__content"]}>
                                {time.day_of_week}
                            </motion.span>
                        </motion.div>
                        <motion.div className={style["detail__wrapper"]}>
                            <motion.span className={style["detail__label"]}>
                                Week Number
                            </motion.span>
                            <motion.span className={style["detail__content"]}>
                                {time.week_number}
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Detail;
