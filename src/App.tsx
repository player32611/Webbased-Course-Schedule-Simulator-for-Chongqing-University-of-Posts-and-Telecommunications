//import { useEffect } from 'react'

import ClassPage from './component/WorkPage/WorkPage'
import './App.less'
//import { getWorkData,postWorkData } from './apis/works'


function App() {
  //接口测试
  // const getData = async () => {
  //   try {
  //     const res = await getWorkData({ id: 1 })
  //     console.log(res.data.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const postData = async () => { 
  //   try {
  //     const workData = {
  //       name: "数学作业",
  //       place: "教学楼A101",
  //       teacher: "张老师",
  //       week: [1, 2, 3],
  //       day: [1, 3, 5],
  //       startTime: [8],
  //       endTime: [10],
  //       type: 0
  //     }
  //     const res = await postWorkData(workData)
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  // getData()
  // postData()
  // }, [])
  return (
    <>
      <div className="App">
        <ClassPage />
      </div>
    </>
  )
}

export default App
