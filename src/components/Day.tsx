import dayjs from "dayjs"

type TDayProps = {
    row: number
    col: dayjs.Dayjs
}

function Day({ row, col }: TDayProps) {

    function getCurrentDate() {
        return col.format("DD-MM-YY") === dayjs().format("DD-MM-YY") && "h-6 w-6 text-white bg-blue-600 rounded-full w-8"
    }

    return (
        <div className="border border-gray-200 flex flex-col">
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
    )
}

export default Day
