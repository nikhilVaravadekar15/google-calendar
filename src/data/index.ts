import { TColorlabel, TEvent, TLabel } from "../types";

export const BigCalenderVariants = {
    open: { opacity: 1, x: "50%" },
    closed: { opacity: 1, x: "0%" },
}

export const smallCalenderVariants = {
    open: { opacity: 1, x: "20%" },
    closed: { opacity: 1, x: "0%" },
}

export const colorLabelClasses: TColorlabel[] = [
    {
        color: "indigo",
        classes: "bg-indigo-500"
    },
    {
        color: "gray",
        classes: "bg-gray-500"
    },
    {
        color: "green",
        classes: "bg-green-500"
    },
    {
        color: "blue",
        classes: "bg-blue-500"
    },
    {
        color: "red",
        classes: "bg-red-500"
    },
    {
        color: "purple",
        classes: "bg-purple-500"
    }
];

export const initialEvents: TEvent[] = [
    {
        id: "",
        title: "",
        description: "",
        starttime: "",
        endtime: "",
        location: "",
        colorlabel: colorLabelClasses[0]
    }
]

export const labelsInit: TLabel[] = [
    {
        title: "Office",
        visibility: true,
        labelWrapperClass: "border-orange-500 data-[state=checked]:bg-orange-500"
    },
    {
        title: "WFH",
        visibility: true,
        labelWrapperClass: "border-violet-500 data-[state=checked]:bg-violet-500"
    },
    {
        title: "Remote",
        visibility: true,
        labelWrapperClass: "border-sky-500 data-[state=checked]:bg-sky-500"
    },
]
