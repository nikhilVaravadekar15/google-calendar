/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import dayjs from "dayjs"
import { TEvent } from "../types"
import EventModal from "./EventModal"
import { motion } from "framer-motion"
import { BigCalendarVariants } from "../data"
import GlobalContext, { TGlobalContext } from "../context/GlobalContext"


type TContentProps = {
    month: dayjs.Dayjs[][]
}

function CalendarTable({ month }: TContentProps) {

    const { currentDate } = React.useContext<TGlobalContext>(GlobalContext)

    return (
        <motion.div
            key={currentDate.toString()}
            initial={"open"}
            animate={"closed"}
            variants={BigCalendarVariants}
            className="flex-1 grid grid-cols-7 grid-rows-5 overflow-hidden"
        >
            {
                month.map((weeks: dayjs.Dayjs[], i: number) => {
                    return (
                        <React.Fragment key={i}>
                            {
                                weeks.map((day: dayjs.Dayjs, j: number) => {
                                    return (
                                        <Day
                                            key={j}
                                            row={i}
                                            col={day}
                                        />
                                    )
                                })
                            }
                        </React.Fragment>
                    )
                })
            }
        </motion.div>
    )
}


type TDayProps = {
    row: number
    col: dayjs.Dayjs
}

function Day({ row, col }: TDayProps) {

    const [dailyEvents, setDailyEvents] = React.useState<TEvent[]>([])
    const { filteredEvents } = React.useContext<TGlobalContext>(GlobalContext)

    React.useEffect(() => {
        setDailyEvents(() => {
            const temp: TEvent[] = []
            for (let index = 0; index < filteredEvents.length; index++) {
                const event: TEvent = filteredEvents[index];
                if (event.createdAt && dayjs(event.createdAt).format("DD-MM-YY") === col.format("DD-MM-YY")) {
                    temp.push(event)
                }
            }
            return temp
        })
    }, [filteredEvents])

    function getCurrentDate() {
        return col.format("DD-MM-YY") === dayjs().format("DD-MM-YY") && "h-6 w-6 text-white bg-blue-500 rounded-full w-8"
    }

    return (
        <div className="border rounded flex flex-col">
            <EventModal
                column={col}
                dialogTriggerClassWrapper={`w-full flex justify-center ${dailyEvents.length === 0 && "flex-1"}`}
            >
                <div className="flex flex-col items-center justify-start">
                    {
                        row === 0 && (
                            <p className="text-sm mt-1">
                                {col.format("ddd").toUpperCase()}
                            </p>
                        )
                    }
                    <p className={`text-sm mt-1 flex items-center justify-center text-center ${getCurrentDate()}`}>
                        {col.format("DD").toUpperCase()}
                    </p>
                </div>
            </EventModal>
            <div className="mt-1 flex flex-col">
                {
                    dailyEvents.map((event: TEvent, index: number) => {
                        return (
                            <EventModal
                                key={index}
                                column={col}
                                event={event}
                                dialogTriggerClassWrapper={`${event.colorlabel?.classes} w-full p-1 mr-3 text-white text-sm text-start rounded mb-1 cursor-pointer truncate overflow-hidden w-full flex"`}
                            >
                                <div title={event.title}>
                                    {event.title}
                                </div>
                            </EventModal>
                        )
                    })
                }
            </div>

        </div >
    )
}

export default CalendarTable
