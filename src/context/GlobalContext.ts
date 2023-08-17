/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
import React from "react";

export type TGlobalContext = {
    currentDate: dayjs.Dayjs
    setCurrentDate: (date: dayjs.Dayjs) => void
    selectedDate: dayjs.Dayjs
    setSelectedDate: (date: dayjs.Dayjs) => void
}

const GlobalContext = React.createContext<TGlobalContext>({
    currentDate: dayjs(),
    // @ts-ignore
    setCurrentDate: (date: dayjs.Dayjs) => { },
    selectedDate: dayjs(),
    // @ts-ignore
    setSelectedDate: (date: dayjs.Dayjs) => { }
})


export default GlobalContext
