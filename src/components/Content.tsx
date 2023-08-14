import dayjs from "dayjs"
import React from "react"
import Day from "./Day"

type TContentProps = {
    month: dayjs.Dayjs[][]
}

function Content({ month }: TContentProps) {
    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
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
        </div>
    )
}

export default Content
