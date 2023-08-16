import React from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../../context/GlobalContext'

function GlobalContextProvider({ children }: { children: React.ReactNode }) {

    const [date, setDate] = React.useState<Date>(dayjs().toDate())

    function setCurrentDate(date: Date) {
        setDate(date)
    }

    return (
        <GlobalContext.Provider
            value={{
                currentDate: date,
                setCurrentDate: setCurrentDate
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider
