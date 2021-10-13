import { motion } from "framer-motion";
import React from "react";
import { BiRefresh } from "react-icons/bi";
import { fade } from "../../animation/fade";
import type { Quote } from "../../types/Quotes";
import style from "./Quote.module.scss";
type Props = {
    quote: Quote;
    loading: boolean;
    fetchQuote: Function;
    error: boolean;
};
const QuoteComponent: React.FC<Props> = ({
    quote,
    loading,
    fetchQuote,
    error,
}) => {
    return (
        <motion.div className={style.quote}>
            {loading && <div>Fetching Quote...</div>}
            {!loading && (
                <>
                    <motion.div className={style["quote__wrapper"]}>
                        {error && (
                            <div>
                                There is an error while fetching the quote
                            </div>
                        )}
                        {!error && (
                            <>
                                <motion.q
                                    className={style["quote__content"]}
                                    transition={{
                                        duration: 0.75,
                                        ease: "easeInOut",
                                    }}
                                    variants={fade}
                                >
                                    {quote?.content}
                                </motion.q>
                                <motion.address
                                    className={style["quote__author"]}
                                    transition={{
                                        duration: 0.75,
                                        ease: "easeInOut",
                                    }}
                                    variants={fade}
                                >
                                    {quote?.author}
                                </motion.address>
                            </>
                        )}
                    </motion.div>

                    <button
                        className={style["quote__refresh"]}
                        onClick={() => fetchQuote()}
                    >
                        <BiRefresh className={style["quote__refresh-icon"]} />
                    </button>
                </>
            )}
        </motion.div>
    );
};

export default QuoteComponent;
