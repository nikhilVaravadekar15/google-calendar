import React from "react"
import dayjs from "dayjs"
import { BigCalenderVariants } from "../data"
import { motion } from "framer-motion"
import GlobalContext, { TGlobalContext } from "../context/GlobalContext"
import EventModal from "./EventModal"


type TContentProps = {
    month: dayjs.Dayjs[][]
}

function Content({ month }: TContentProps) {

    const { currentDate } = React.useContext<TGlobalContext>(GlobalContext)

    return (
        <motion.div
            key={currentDate.toString()}
            initial={"open"}
            animate={"closed"}
            variants={BigCalenderVariants}
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

    function getCurrentDate() {
        return col.format("DD-MM-YY") === dayjs().format("DD-MM-YY") && "h-6 w-6 text-white bg-blue-500 rounded-full w-8"
    }

    return (
        <EventModal
            column={col}
        >
            <div className="flex flex-col">
                <div className="flex flex-col items-center">
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
            </div>
        </EventModal>
    )
}

export default Content
