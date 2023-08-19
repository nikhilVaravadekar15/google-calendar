/* eslint-disable no-case-declarations */
import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { TEvent, TDispatchAction, TLabel } from '../../types'
import GlobalContext from '../../context/GlobalContext'
import { initialEvents, labelsInit } from '../../data'


function eventsReducer(events: TEvent[], action: TDispatchAction) {
    switch (action.type) {
        case "post":
            return [...events, action.payload]
            break;
        case "patch":
            const PatchedEvents: TEvent[] = [...events];
            for (let index = 0; index < PatchedEvents.length; index++) {
                const event: TEvent = PatchedEvents[index];
                if (event.id === action.payload.id) {
                    PatchedEvents[index] = action.payload
                }
            }
            return PatchedEvents
            break;
        case "delete":
            const tempLabelsEvents: TEvent[] = [];
            for (let index = 0; index < events.length; index++) {
                const event: TEvent = events[index];
                if (event.id != action.payload.id) {
                    tempLabelsEvents[index] = event
                }
            }
            return tempLabelsEvents
            break;
        default:
            throw new Error();
    }
}

function initEvents() {
    const storedEvent: string | null = localStorage.getItem("events")!
    const events: TEvent[] = storedEvent ? JSON.parse(storedEvent) : []
    return events
}


function GlobalContextProvider({ children }: { children: React.ReactNode }) {

    const [currentDate, setDate] = React.useState<dayjs.Dayjs>(dayjs());
    const [selectedDay, setSelectedDay] = React.useState<dayjs.Dayjs>(currentDate);
    const [labels, setLabels] = React.useState<TLabel[]>(labelsInit)
    const [events, dispatchEvents] = React.useReducer(eventsReducer, initialEvents, initEvents)

    const filteredEvents = useMemo<TEvent[]>(() => {
        const temp: TEvent[] = []
        for (let index = 0; index < events.length; index++) {
            const event: TEvent = events[index];
            for (let j = 0; j < labels.length; j++) {
                const label: TLabel = labels[j]
                if (event.location?.toLowerCase() === label.title.toLowerCase() && label.visibility) {
                    temp.push(event)
                }
            }
        }
        return temp
    }, [events, labels])

    function setCurrentDate(date: dayjs.Dayjs) {
        setDate(date)
    }

    function setSelectedDate(date: dayjs.Dayjs) {
        setSelectedDay(date)
    }

    function updateLabels(label: TLabel) {
        setLabels((prevLabels: TLabel[]) => {
            const tempLabels: TLabel[] = [...prevLabels]
            for (let index = 0; index < prevLabels.length; index++) {
                const element: TLabel = prevLabels[index];
                if (element.title === label.title) {
                    tempLabels[index] = label
                }
            }
            return tempLabels
        })
    }

    return (
        <GlobalContext.Provider
            value={{
                currentDate: currentDate,
                setCurrentDate: setCurrentDate,
                selectedDate: selectedDay,
                setSelectedDate: setSelectedDate,
                events: events,
                dispatchEvents: dispatchEvents,
                labels: labels,
                updateLabels: updateLabels,
                filteredEvents: filteredEvents
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider
