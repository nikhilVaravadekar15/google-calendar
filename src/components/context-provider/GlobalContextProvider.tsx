import React from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../../context/GlobalContext'

function GlobalContextProvider({ children }: { children: React.ReactNode }) {

    const [currentDate, setDate] = React.useState<dayjs.Dayjs>(dayjs());
    const [selectedDay, setSelectedDay] = React.useState<dayjs.Dayjs>(currentDate);

    function setCurrentDate(date: dayjs.Dayjs) {
        setDate(date)
    }

    function setSelectedDate(date: dayjs.Dayjs) {
        setSelectedDay(date)
    }

    return (
        <GlobalContext.Provider
            value={{
                currentDate: currentDate,
                setCurrentDate: setCurrentDate,
                selectedDate: selectedDay,
                setSelectedDate: setSelectedDate
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider
