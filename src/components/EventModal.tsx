import React from "react"
import dayjs from "dayjs"
import {
    MdBookmarkBorder,
    MdOutlineLocationOn
} from "react-icons/md"
import {
    AiOutlineCheck,
    AiOutlineDelete,
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
import { useFormik } from 'formik';
import { TColorlabel, TEvent } from "../types"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { Textarea } from "./ui/textarea"
import { colorLabelClasses, initialEvents } from "../data"
import GlobalContext, { TGlobalContext } from "../context/GlobalContext"


function EventModal({
    column,
    children,
    event,
    dialogTriggerClassWrapper
}: {
    column: dayjs.Dayjs,
    children: React.ReactNode,
    event?: TEvent
    dialogTriggerClassWrapper?: string
}) {

    const { events, dispatchEvents } = React.useContext<TGlobalContext>(GlobalContext)
    const [location, setLocation] = React.useState<string>(event ? event.location! : "WFH")
    const [selectedColorLabel, setSelectedColorLabel] = React.useState<TColorlabel>(event ? event.colorlabel! : colorLabelClasses[0]);

    React.useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events))
    }, [events])

    const formik = useFormik<TEvent>({
        initialValues: event ? event : initialEvents[0],
        validate: (values: TEvent) => {
            const errors: TEvent = {};
            if (!values.title?.trim()) {
                errors.title = "Required";
            }
            if (!values.starttime?.trim()) {
                errors.starttime = "Required";
            }
            if (!values.endtime?.trim()) {
                errors.endtime = "Required";
            }
            return errors;
        },
        onReset: (values: TEvent) => {
            try {
                dispatchEvents({
                    type: "delete",
                    payload: values
                })
                formik.resetForm()
            } catch (error) {
                toast({
                    title: "Event Deleted"
                })
            }

        },
        onSubmit: (values: TEvent) => {
            if (event) {
                values = {
                    ...values,
                    location: location,
                    colorlabel: selectedColorLabel,
                    modifiedAt: dayjs()
                }
                dispatchEvents({
                    type: "patch",
                    payload: values
                })
                toast({
                    title: "Event Updated",
                    description: `@timestamp: ${values.modifiedAt?.format()}`,
                })
            } else {
                values = {
                    ...values,
                    id: Date.now().toString(),
                    location: location,
                    colorlabel: selectedColorLabel,
                    createdAt: column
                }
                dispatchEvents({
                    type: "post",
                    payload: values
                })
                formik.resetForm()
                toast({
                    title: "Event Added",
                    description: `@timestamp: ${values.createdAt?.format()}`,
                })
            }
        },
    });

    return (
        <Dialog>
            <DialogTrigger className={`${dialogTriggerClassWrapper}`}>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-[70%]">
                <form
                    onReset={formik.handleReset}
                    onSubmit={formik.handleSubmit}
                    className="p-4 h-full flex gap-4 flex-col justify-evenly"
                >
                    {
                        event ? (
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-xl">Update event</p>
                                <Button
                                    type="reset"
                                    variant={"destructive"}
                                    className="hover:shadow"
                                >
                                    <AiOutlineDelete size="1.25rem" />
                                </Button>
                            </div>
                        ) : (
                            <p className="font-bold text-xl">Add event</p>
                        )
                    }
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-1.5 flex-col w-full">
                            <span className="flex gap-1">
                                Title
                                <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="text"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                className={`${formik.errors.title && formik.touched.title && "border-red-500"}`}
                            />
                        </div>
                        <div className="flex gap-8 items-center w-full">
                            <span className="flex gap-1">
                                Time
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="flex gap-6 items-center">
                                <Input
                                    name="starttime"
                                    type="time"
                                    value={formik.values.starttime}
                                    onChange={formik.handleChange}
                                    className={`w-fit ${formik.errors.starttime && formik.touched.starttime && "border-red-500"}`}
                                />
                                <span>to</span>
                                <Input
                                    name="endtime"
                                    type="time"
                                    value={formik.values.endtime}
                                    onChange={formik.handleChange}
                                    className={`w-fit ${formik.errors.endtime && formik.touched.endtime && "border-red-500"}`}
                                />
                            </div>
                        </div>
                        <div className="flex gap-1.5 flex-col w-full">
                            <span className="flex gap-1">
                                Description
                            </span>
                            <Textarea
                                name="description"
                                className="resize-none"
                                value={formik.values.description}
                                onChange={formik.handleChange}
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
                                    colorLabelClasses.map((colorLabel: TColorlabel, index: number) => {
                                        return (
                                            <TooltipProvider key={index}>
                                                <Tooltip>
                                                    <TooltipTrigger type="button">
                                                        <span
                                                            onClick={() => {
                                                                setSelectedColorLabel(colorLabelClasses[index])
                                                            }}
                                                            className={`${colorLabel.classes} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                                        >
                                                            {
                                                                selectedColorLabel.color === colorLabel.color && (
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
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default EventModal
