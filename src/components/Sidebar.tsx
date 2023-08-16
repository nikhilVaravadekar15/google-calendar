import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import Smallcalendar from "./Smallcalendar"


function Sidebar() {

    return (
        <div className="h-full w-72 flex gap-1 flex-col border-r-2">
            <Button
                variant={"outline"}
                className="px-8 py-6 mt-2 w-fit rounded-full hover:shadow-lg"
            >
                <div className="flex gap-2 items-center">
                    <img
                        alt="add"
                        draggable={false}
                        src="/icons__plus.png"
                    />
                    <span className="text-lg font-semibold">Create</span>
                </div>
            </Button>
            <Smallcalendar />
            <div className="p-4 h-full flex gap-2 flex-col border rounded-md overflow-y-scroll">
                <span className="text-sm font-semibold">My calender</span>
                <div className="flex gap-2 flex-col">
                    <div className="p-1 flex w-full cursor-pointer items-center space-x-2 overflow-hidden">
                        <Checkbox
                            id="terms"
                            className="border-blue-500 data-[state=checked]:bg-blue-500"
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Terms
                        </label>
                    </div>
                    <div className="p-1 flex w-full cursor-pointer items-center space-x-2 overflow-hidden">
                        <Checkbox
                            id="conditions"
                            className="border-yellow-500 data-[state=checked]:bg-yellow-500"
                        />
                        <label
                            htmlFor="conditions"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Conditions
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
