/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import React from 'react'
import dayjs from 'dayjs'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import { getMonth } from './lib/helper'


function App() {

  const [currentMonth, setCurrentMonth] = React.useState<dayjs.Dayjs[][]>(getMonth())

  return (
    <main className="h-screen w-screen flex flex-col">
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
