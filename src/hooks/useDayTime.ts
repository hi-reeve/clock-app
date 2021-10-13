import { useEffect, useState } from "react";

export const useDayTime = () => {
    const [isDayTime, setDayTime] = useState<boolean>(true);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour > 6 && hour < 18) setDayTime(true);
        else setDayTime(false);
    }, []);

    return isDayTime;
};
