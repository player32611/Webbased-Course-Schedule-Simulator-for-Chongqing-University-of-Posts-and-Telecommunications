import { useEffect } from 'react'
import dayjs from 'dayjs'

import ClassPage from './component/WorkPage/WorkPage'
import './App.less'
import useOthersStore from './store/othersStore'
import { getCurrentWeekNumber,getDayCharacter } from './utils/utils'

const semesterStartDate = new Date('2025-02-24')
const currentWeek = getCurrentWeekNumber(semesterStartDate,21) 

function getWeekCharacter(num: number): string {
  const weeks = [
    '一', '二', '三', '四', '五',
    '六', '七', '八', '九', '十',
    '十一', '十二', '十三', '十四', '十五',
    '十六', '十七', '十八', '十九', '二十',
    '二十一','二十二','二十三'
  ];

  return '第'+weeks[num - 1]+'周'
}

function App() {
  const {getData} = useOthersStore()
  useEffect(() => {
    getData()
  },[getData])
  return (
    <>
      <div className="App">
        <div className='times'>{getWeekCharacter(currentWeek)} {getDayCharacter(dayjs().day())}</div>
      </div>
      <ClassPage />
    </>
  )
}

export default App
