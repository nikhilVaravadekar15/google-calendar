/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import React from 'react'
import dayjs from 'dayjs'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import { getValidMonth } from './lib/helper'
import GlobalContext, { TGlobalContext } from './context/GlobalContext'


function App() {

  const { currentDate } = React.useContext<TGlobalContext>(GlobalContext)
  const [currentMonth, setCurrentMonth] = React.useState<dayjs.Dayjs[][]>(getValidMonth(currentDate.getMonth()))

  React.useEffect(() => {
    setCurrentMonth(getValidMonth(currentDate.getMonth()))
  }, [currentDate])

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex h-[calc(100%-64px)]">
        <Sidebar />
        <Content
          month={currentMonth}
        />
      </div>
    </main>
  )
}

export default App
