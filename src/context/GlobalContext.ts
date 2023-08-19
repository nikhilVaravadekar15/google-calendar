/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
import React from "react";
import { TDispatchAction, TEvent, TLabel } from "../types";

export type TGlobalContext = {
    currentDate: dayjs.Dayjs
    setCurrentDate: (date: dayjs.Dayjs) => void
    selectedDate: dayjs.Dayjs
    setSelectedDate: (date: dayjs.Dayjs) => void
    events: TEvent[]
    dispatchEvents: React.Dispatch<TDispatchAction>
    labels: TLabel[],
    updateLabels: (labels: TLabel) => void
    filteredEvents: TEvent[]
}

const GlobalContext = React.createContext<TGlobalContext>({
    currentDate: dayjs(),
    // @ts-ignore
    setCurrentDate: (date: dayjs.Dayjs) => { },
    selectedDate: dayjs(),
    // @ts-ignore
    setSelectedDate: (date: dayjs.Dayjs) => { },
    events: [],
    // @ts-ignore
    dispatchEvents: (value: TDispatchAction) => { },
    labels: [],
    // @ts-ignore
    updateLabels: (labels: TLabel) => { },
    filteredEvents: []
})


export default GlobalContext
