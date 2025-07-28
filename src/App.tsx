import { useEffect } from 'react'

import ClassPage from './component/WorkPage/WorkPage'
import './App.less'
import useOthersStore from './store/othersStore'


function App() {
  const {getData} = useOthersStore()
  useEffect(() => {
    getData()
  },[getData])
  return (
    <>
      <div className="App">
        <ClassPage />
      </div>
    </>
  )
}

export default App
