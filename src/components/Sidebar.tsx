import React from "react";
import { Checkbox } from "./ui/checkbox"
import Smallcalendar from "./Smallcalendar"
import EventModal from "./EventModal"
import GlobalContext, { TGlobalContext } from "../context/GlobalContext";
import { TLabel } from "../types";


function Sidebar() {

    const { selectedDate, labels, updateLabels } = React.useContext<TGlobalContext>(GlobalContext)

    return (
        <div className="h-full w-72 flex gap-1 flex-col border-r-2">
            <div>
                <EventModal
                    column={selectedDate}
                    dialogTriggerClassWrapper="mt-2 mb-1"
                >
                    <div className="px-8 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-fit rounded-full hover:shadow-lg">
                        <div className="flex gap-2 items-center">
                            <img
                                alt="add"
                                draggable={false}
                                src="/icons__plus.png"
                            />
                            <span className="text-lg font-semibold">Create</span>
                        </div>
                    </div>
                </EventModal>
            </div>
            <Smallcalendar />
            <div className="p-4 h-full flex gap-2 flex-col border rounded-md overflow-y-scroll">
                <span className="text-sm font-semibold">My calendar</span>
                <div className="flex gap-2 flex-col">
                    {
                        labels.map((label: TLabel, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="p-1 flex w-full cursor-pointer items-center space-x-2 overflow-hidden"
                                >
                                    <Checkbox
                                        checked={label.visibility}
                                        id={`${label.title.toLowerCase()}`}
                                        className={`${label.labelWrapperClass}`}
                                        onClick={() => {
                                            const tempLabel: TLabel = { ...label }
                                            tempLabel.visibility = !label.visibility
                                            updateLabels(tempLabel)
                                        }}
                                    />
                                    <label
                                        htmlFor={`${label.title.toLowerCase()}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {label.title.toLowerCase()}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar
