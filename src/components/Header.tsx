/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import dayjs from 'dayjs'
import {
    MdNavigateNext,
    MdNavigateBefore
} from 'react-icons/md'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { Button } from './ui/button'
import { BigCalenderVariants } from '../data'
import { motion } from "framer-motion"
import GlobalContext, { TGlobalContext } from '../context/GlobalContext'


function Header() {
    const { currentDate, setCurrentDate, setSelectedDate } = React.useContext<TGlobalContext>(GlobalContext)

    return (
        <header className="h-16 w-full flex gap-6 items-center border shadow-md">
            <div className="ml-4 flex gap-4 items-center cursor-pointer">
                <img
                    draggable={false}
                    alt="google-calendar-logo"
                    src="/icons__google-calendar-48.png"
                    className="w-11 h-11"
                />
                <h1 className="text-xl text-gray-500 font-bold">Calender</h1>
            </div>
            <Button
                disabled={currentDate.month() === dayjs().month() ? true : false}
                variant={"outline"}
                className="px-4 py-2 border rounded-md text-sm font-semibold cursor-pointer disabled:cursor-not-allowed"
                onClick={() => {
                    setCurrentDate(dayjs())
                    setSelectedDate(dayjs())
                }}
            >
                Today
            </Button>
            <div className="flex gap-3 items-center">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex gap-1 items-center">
                    <Button
                        variant={"outline"}
                        className="text-lg rounded-full hover:shadow"
                        onClick={() => {
                            // @ts-ignore
                            setCurrentDate((prevDate: dayjs.Dayjs) => {
                                return prevDate.subtract(1, "month")
                            })
                        }}
                    >
                        <MdNavigateBefore />
                    </Button>
                    <Button
                        variant={"outline"}
                        className="text-lg rounded-full hover:shadow"
                        onClick={() => {
                            // @ts-ignore
                            setCurrentDate((prevDate: dayjs.Dayjs) => {
                                return prevDate.add(1, "month")
                            })
                        }}
                    >
                        <MdNavigateNext />
                    </Button>
                </div>
                <motion.div
                    key={currentDate.toString()}
                    initial={"open"}
                    animate={"closed"}
                    variants={BigCalenderVariants}
                    className="flex gap-1 items-center text-xl tracking-tight"
                >
                    <span>
                        {dayjs(currentDate).format("MMMM YYYY")}
                    </span>
                </motion.div>
            </div>
        </header>
    )
}

export default Header
