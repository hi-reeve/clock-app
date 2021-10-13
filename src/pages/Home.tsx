import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GeoLocation } from "../types/GeoLocation";
import type { Quote } from "../types/Quotes";
import { WorldTime } from "../types/WorldTime";
import { WindowSize, useWindowSize } from "../hooks/useWindowSize";
import QuoteComponent from "../components/Quote/Quote";
import Time from "../components/Time/Time";
import { useDayTime } from "../hooks/useDayTime";
import Detail from "../components/Detail/Detail";
// http://worldtimeapi.org/
// https://api.quotable.io/random
// http://ip-api.com/json

const Home = () => {
    const [errorLocation, setErrorLocation] = useState<boolean>(false);
    const [errorQuote, setErrorQuote] = useState<boolean>(false);
    const [errorTime, setErrorTime] = useState<boolean>(false);
    const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
    const [loadingTime, setLoadingTime] = useState<boolean>(false);
    const [loadingQuote, setLoadingQuote] = useState<boolean>(false);
    const [quote, setQuote] = useState<Quote>();
    const [geo, setGeo] = useState<GeoLocation>();
    const [time, setTime] = useState<WorldTime>();

    const windowSize: WindowSize = useWindowSize();

    const isDayTime = useDayTime();

    const [isDetailed, setIsDetailed] = useState<boolean>(false);

    const fetchLocation = async () => {
        try {
            setLoadingLocation(true);
            const response = await fetch("http://ip-api.com/json");
            const data: GeoLocation = await response.json();
            setGeo(data);
        } catch (error) {
            setErrorLocation(true);
        } finally {
            setLoadingLocation(false);
        }
    };

    const fetchQuote = async () => {
        try {
            setLoadingQuote(true);
            const response = await fetch(
                "https://api.quotable.io/random?maxLength=150"
            );
            const data: Quote = await response.json();
            setQuote(data);
        } catch (error) {
            setErrorQuote(true);
        } finally {
            setLoadingQuote(false);
        }
    };

    const fetchTime = async () => {
        try {
            setLoadingTime(true);
            const response = await fetch("http://worldtimeapi.org/api/ip");
            const data: WorldTime = await response.json();
            setTime(data);
        } catch (error) {
            setErrorTime(true);
        } finally {
            setLoadingTime(false);
        }
    };
    useEffect(() => {
        fetchLocation();
        fetchQuote();
        fetchTime();
    }, []);

    if (errorLocation)
        return (
            <div>
                There is an error fetching your location, make sure you are
                connected to the internet. or make sure you allow this apps to
                track your ip address.
            </div>
        );

    return (
        <motion.div
            className="container"
            style={{
                backgroundImage: `url(https://source.unsplash.com/${
                    windowSize.width
                }x${windowSize.height}/?nature,${
                    isDayTime ? "afternoon" : "evening"
                }), linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "overlay",
            }}
        >
            {quote && (
                <motion.div
                    className="lg:px-16 px-6"
                    animate={{
                        opacity: !isDetailed ? 1 : 0,
                    }}
                >
                    <QuoteComponent
                        fetchQuote={fetchQuote}
                        loading={loadingQuote}
                        quote={quote}
                        error={errorQuote}
                    />
                </motion.div>
            )}
            <motion.div
                animate={{
                    y: !isDetailed ? "calc(100vh - 70vh)" : "-12vh",
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                }}
                className={`bottom`}
            >
                {loadingLocation ||
                    (loadingTime && (
                        <div className="mt-10  lg:px-16 px-6">
                            Fetching location...
                        </div>
                    ))}

                {time && geo && (
                    <Time
                        time={time}
                        location={geo}
                        isDetailed={isDetailed}
                        setIsDetailed={setIsDetailed}
                    />
                )}
                {!loadingTime && time && isDetailed && (
                    <Detail time={time} isDetailed={isDetailed} />
                )}
            </motion.div>
        </motion.div>
    );
};

export default Home;
