/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";

export function getMonth(month: number = dayjs().month()) {
    const year: number = dayjs().year()
    const firstdayOfMonth: number = dayjs(new Date(year, month, 1)).day()
    let currentMonthCount: number = 0 - firstdayOfMonth
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount))
        })
    })

    return daysMatrix
}
