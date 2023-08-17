/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import dayjs from "dayjs"
import {
    MdBookmarkBorder,
    MdOutlineLocationOn
} from "react-icons/md"
import {
    AiOutlineCheck,
    AiOutlineClockCircle
} from "react-icons/ai"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { colorLabelClasses } from "../data"


function EventModal({
    column,
    children,
    dialogTriggerClassWrapper
}: {
    column: dayjs.Dayjs,
    children: React.ReactNode,
    dialogTriggerClassWrapper: string
}) {

    const [title, setTitle] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")
    const [time, setTime] = React.useState<{ start: string, end: string }>({
        start: "",
        end: ""
    })
    const [location, setLocation] = React.useState<string>("WFH")
    const [selectedColorLabel, setSelectedColorLabel] = React.useState<string>(colorLabelClasses[0].color);

    function handleTime(name: string, value: string) {
        setTime((prevTime: { start: string, end: string }) => {
            return {
                ...prevTime,
                [name]: value
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger className={`${dialogTriggerClassWrapper}`}>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-[60%]">
                <div className="p-4 flex gap-4 flex-col">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-1.5 flex-col w-full">
                            <span className="flex gap-1">
                                Title
                                <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="text"
                                value={title}
                                onChange={(event: any) => {
                                    setTitle(event.target.value)
                                }}
                            />
                        </div>
                        <div className="flex gap-8 items-center w-full">
                            <span className="flex gap-1">
                                Time
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="flex gap-6 items-center">
                                <Input
                                    name="start"
                                    type="time"
                                    value={time.start}
                                    className="w-fit"
                                    onChange={(event: any) => {
                                        handleTime(event.target.name, event.target.value)
                                    }}
                                />
                                <span>to</span>
                                <Input
                                    name="end"
                                    type="time"
                                    value={time.end}
                                    className="w-fit"
                                    onChange={(event: any) => {
                                        handleTime(event.target.name, event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-1.5 flex-col w-full">
                            <span className="flex gap-1">
                                Description
                            </span>
                            <Textarea
                                className="resize-none"
                                value={description}
                                onChange={(event: any) => {
                                    setDescription(event.target.value)
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 items-center w-full">
                                <span className="border p-2 rounded-full cursor-pointer shadow hover:shadow-lg">
                                    <AiOutlineClockCircle size="1.25rem" />
                                </span>
                                <span className="flex gap-2 items-center justify-center">
                                    {column.format("MMMM DD, YYYY")}
                                    <p className="text-sm">
                                        {column.format("dddd")}
                                    </p>
                                </span>
                            </div>
                            <div className="flex gap-4 items-center w-full">
                                <span className="border p-2 rounded-full cursor-pointer shadow hover:shadow-lg">
                                    <MdOutlineLocationOn size="1.25rem" />
                                </span>
                                <Select
                                    value={location.toLowerCase()}
                                    onValueChange={(value: string) => {
                                        setLocation(value)
                                    }}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="WFH" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="office">Office</SelectItem>
                                        <SelectItem value="wfh">WFH</SelectItem>
                                        <SelectItem value="remote">Remote</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center w-full">
                            <span className="border p-2 rounded-full cursor-pointer shadow hover:shadow-lg">
                                <MdBookmarkBorder size="1.25rem" />
                            </span>
                            <div className="flex gap-1.5 items-center justify-center">
                                {
                                    colorLabelClasses.map((colorLabel: { color: string, classes: string }, index: number) => {
                                        return (
                                            <TooltipProvider key={index}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <span
                                                            onClick={() => {
                                                                setSelectedColorLabel(colorLabelClasses[index].color)
                                                            }}
                                                            className={`${colorLabel.classes} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                                        >
                                                            {
                                                                selectedColorLabel === colorLabel.color && (
                                                                    <AiOutlineCheck
                                                                        className="text-white text-xs"
                                                                    />
                                                                )
                                                            }
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{colorLabel.color}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <hr />
                    <Button
                        type="submit"
                        variant={"outline"}
                        className="w-fit hover:shadow"
                    >
                        Save changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default EventModal
