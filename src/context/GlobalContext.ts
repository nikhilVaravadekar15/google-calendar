/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
import React from "react";

export type TGlobalContext = {
    currentDate: Date
    setCurrentDate: (date: Date) => void
}

const GlobalContext = React.createContext<TGlobalContext>({
    currentDate: dayjs().toDate(),
    setCurrentDate: (date: Date) => { }
})

// export type TGlobalContext = {
//     monthIndex: number
//     setMonthIndex: (index: number) => void
// }

// const GlobalContext = React.createContext<TGlobalContext>({
//     monthIndex: dayjs().month(),
//     setMonthIndex: (index: number) => { }
// })


export default GlobalContext
