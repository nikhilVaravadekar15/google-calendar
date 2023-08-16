/* eslint-disable react-hooks/exhaustive-deps */
import {
  MdNavigateBefore,
  MdNavigateNext
} from 'react-icons/md';
import React from 'react'
import dayjs from 'dayjs'
import { Button } from './ui/button';
import { motion } from "framer-motion"
import { getValidMonth } from '../lib/helper';
import { smallCalenderVariants } from '../data';
import GlobalContext, { TGlobalContext } from '../context/GlobalContext';


function Smallcalendar() {

  const { currentDate } = React.useContext<TGlobalContext>(GlobalContext)
  const [currentMonthIdx, setCurrentMonthIdx] = React.useState<number>(currentDate.getMonth());
  const [currentMonth, setCurrentMonth] = React.useState<dayjs.Dayjs[][]>(getValidMonth(currentMonthIdx));
  const [selectedDay, setSelectedDay] = React.useState<dayjs.Dayjs>(dayjs(currentDate));

  React.useEffect(() => {
    setCurrentMonth(getValidMonth(currentMonthIdx))
  }, [currentMonthIdx])

  React.useEffect(() => {
    setCurrentMonthIdx(currentDate.getMonth())
  }, [currentDate])

  function getDayClass(day: dayjs.Dayjs) {
    const format: string = "DD-MM-YY";
    const toDay: string = dayjs(new Date()).format(format);
    const givenDay: string = day.format(format);
    const daySelected: string = selectedDay && selectedDay.format(format);
    if (toDay === givenDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (givenDay === daySelected) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    }
  }

  return (
    <div className="border rounded-md p-2">
      <header className="px-3 flex items-center justify-between">
        <span className="text-gray-500 font-bold">
          {
            dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")
          }
        </span>
        <div className="flex items-center gap-2 justify-between">
          <Button
            variant={"outline"}
            className="text-sm m-0 px-2.5 rounded-full hover:shadow"
            onClick={() => {
              setCurrentMonthIdx((prevMonthIdx: number) => {
                return prevMonthIdx - 1
              });
            }}
          >
            <MdNavigateBefore />
          </Button>
          <Button
            variant={"outline"}
            className="text-sm m-0 px-2.5 rounded-full hover:shadow"
            onClick={() => {
              setCurrentMonthIdx((prevMonthIdx: number) => {
                return prevMonthIdx + 1
              });
            }}
          >
            <MdNavigateNext />
          </Button>
        </div>
      </header>
      <motion.div
        key={currentMonth.toString()}
        initial={"open"}
        animate={"closed"}
        variants={smallCalenderVariants}
        className="grid grid-cols-7 grid-rows-6"
      >
        {
          currentMonth[0].map((day: dayjs.Dayjs, index: number) => (
            <span key={index} className="text-sm py-1 text-center">
              {day.format("dd").charAt(0)}
            </span>
          ))
        }
        {
          currentMonth.map((row: dayjs.Dayjs[], i: number) => (
            <React.Fragment key={i}>
              {
                row.map((day: dayjs.Dayjs, j: number) => (
                  <button
                    key={j}
                    onClick={() => {
                      // setSmallSmallcalendarMonth(currentMonthIdx);
                      setSelectedDay(day);
                    }}
                    className={`py-1 w-full ${getDayClass(day)}`}
                  >
                    <span className="text-sm">
                      {day.format("D")}
                    </span>
                  </button>
                ))
              }
            </React.Fragment>
          ))
        }
      </motion.div>
    </div>
  )
}

export default Smallcalendar
