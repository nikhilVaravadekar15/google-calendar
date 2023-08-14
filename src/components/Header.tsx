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

function Header() {
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
                variant={"outline"}
                className="text-sm font-semibold"
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
                    >
                        <MdNavigateBefore />
                    </Button>
                    <Button
                        variant={"outline"}
                        className="text-lg rounded-full hover:shadow"
                    >
                        <MdNavigateNext />
                    </Button>
                </div>
                <div className="flex gap-1 items-center text-xl tracking-tight">
                    <span>August</span>
                    <span>2023</span>
                </div>
            </div>
        </header>
    )
}

export default Header
