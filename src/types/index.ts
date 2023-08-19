import dayjs from "dayjs"

export type TColorlabel = {
    color: string,
    classes: string
}

export type TEvent = {
    id?: string
    title?: string
    description?: string
    starttime?: string
    endtime?: string
    location?: string
    colorlabel?: TColorlabel
    createdAt?: dayjs.Dayjs
    modifiedAt?: dayjs.Dayjs
}

export type TDispatchAction = {
    type: "post" | "patch" | "delete"
    payload: TEvent
}

export type TLabel = {
    title: string
    visibility: boolean
    labelWrapperClass: string
}
