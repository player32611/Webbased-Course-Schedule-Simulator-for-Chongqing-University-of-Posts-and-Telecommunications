import { useNavigate,useSearchParams } from 'react-router'
import { useState,useRef, useEffect } from 'react'

import './Add.less'
import { getWeekCharacter,getTimeCharacters,getRemindCharacter } from '../../utils/utils'
import AddSelectPage from '../../component/AddSelectPage/AddSelectPage'
import type { AddSelectPageRef } from '../../component/AddSelectPage/AddSelectPage'
import  useAddStore  from '../../store/addStore'
import useWorkStore from '../../store/workStore'
import { WORKTYPE } from '../../apis/works'

const tags:string[] = ['自习', '值班', '考试', '英语', '开会', '作业', '补课', '实验', '复习', '学习']
enum MAINSTATE{
    TITLE,
    CONTENT,
    FINISH
}

enum PAGESTATE{
    WEEKS,
    TIMES,
    REMINDS
}
function Add(){
    const [inputText, setInputText] = useState<string>('')
    const [state, setState] = useState<MAINSTATE>(MAINSTATE.TITLE)
    const [pageState, setPageState] = useState<PAGESTATE>(PAGESTATE.WEEKS)
    const [pageIndex, setPageIndex] = useState<number>(0)
    const [isToBeDone,setIsToBeDone] = useState<boolean>(false)
    const AddSelectPageRef = useRef<AddSelectPageRef>(null)
    const titleCompleteRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const {weeks,setWeeks,days,setDays,startTimes,setStartTimes,endTimes,setEndTimes,title,setTitle,setContent,remind} = useAddStore()
    const {works,setWorks} = useWorkStore()
    const workIndex = useRef<number>(0)
    if(params.get('index')!==null)workIndex.current = Number(params.get('index'))
    else workIndex.current = works.length
    useEffect(()=>{ 
        setStartTimes([Number(params.get('startTime'))])
        setEndTimes([Number(params.get('endTime'))])
        setDays([Number(params.get('day'))])
        setWeeks([Number(params.get('week'))])
    },[params, setDays, setEndTimes, setStartTimes, setWeeks])
    function showAddSelectPage(state:PAGESTATE){
        if(AddSelectPageRef.current){
            setPageState(state)
            AddSelectPageRef.current.setIsActive(true)
        }
    }
    function deleteTime(index:number){
        setDays(days.filter((_,i)=>i!==index))
        setStartTimes(startTimes.filter((_,i)=>i!==index))
        setEndTimes(endTimes.filter((_,i)=>i!==index))
    }
    function hasTimeConflict() {
        // 获取当前要添加的日程信息
        // 处理周数为0的情况（表示所有周）
        const actualWeeks = weeks.includes(0) ? [...Array(22).keys()].slice(1) : weeks;
        const newSchedules = actualWeeks.map(week => 
            days.map((day, index) => ({
            week,
            day,
            startTime: startTimes[index],
            endTime: endTimes[index]
            }))
        ).flat();
        // 检查与现有日程的时间冲突
        for (const newSchedule of newSchedules) {
            for (const existingWork of works) {
            // 如果是编辑现有日程，跳过自身
            if (workIndex.current !== works.length && existingWork.id === works[workIndex.current].id) {
                continue;
            }
            // 处理现有工作的周数，0表示所有周
            const existingWeeks = Array.isArray(existingWork.week) ? existingWork.week : [existingWork.week];
            const actualExistingWeeks = existingWeeks.includes(0) ? [...Array(22).keys()].slice(1) : existingWeeks;
            // 检查周数是否有重叠
            const hasWeekOverlap = actualExistingWeeks.includes(newSchedule.week);
            if (!hasWeekOverlap) continue;
            // 检查日期是否相同
            const existingDays = Array.isArray(existingWork.day) ? existingWork.day : [existingWork.day];
            const actualExistingDays = existingDays.includes(0) ? [1, 2, 3, 4, 5, 6, 7] : existingDays;
            const hasDayOverlap = actualExistingDays.includes(newSchedule.day);
            if (!hasDayOverlap) continue;
            const dayIndex = actualExistingDays.indexOf(newSchedule.day);
            console.log(dayIndex)
            // 检查时间段是否重叠
                const existingStartTime = existingWork.startTime[dayIndex];
                const existingEndTime = existingWork.endTime[dayIndex];
                // 时间段重叠判断逻辑：任何时间重叠都算冲突
                if ((newSchedule.startTime >= existingStartTime && newSchedule.startTime < existingEndTime) ||
                    (newSchedule.endTime >= existingStartTime && newSchedule.endTime <= existingEndTime) ||
                    (newSchedule.startTime <= existingStartTime && newSchedule.endTime >= existingEndTime) ||
                    (existingStartTime >= newSchedule.startTime && existingStartTime < newSchedule.endTime)) {
                return true; // 发现时间冲突
                }
            }
        }
    return false; // 没有时间冲突
    }
    function submit(){
        switch(state){
            case MAINSTATE.TITLE:
                if(inputText.length > 0){
                    setState(MAINSTATE.CONTENT)
                    setTitle(inputText)
                    if(titleCompleteRef.current)titleCompleteRef.current.innerText = '标题：' + inputText
                    setInputText('')
                }
                else alert('挚友，标题不能为空呦！')
                break
            case MAINSTATE.CONTENT:
                setState(MAINSTATE.FINISH)
                setContent(inputText)
                if(titleCompleteRef.current)titleCompleteRef.current.innerHTML = title
                break
            case MAINSTATE.FINISH:{
                if (hasTimeConflict()) {
                    alert('与已有日程冲突，注意合理安排时间。');
                }
                const newWeeks:number[] = weeks.includes(0) ? [...Array(22).keys()].slice(1) : weeks;
                const newWork = {
                    id: workIndex.current !== works.length ? works[workIndex.current].id : Date.now(), // 保留原ID或生成新ID
                    name: title,
                    place: 'null',
                    teacher: inputText,
                    week: newWeeks,
                    day: days,
                    startTime: startTimes,
                    endTime: endTimes,
                    type: WORKTYPE.PERSONAL,
                };
                if (workIndex.current !== works.length) {
                    const updatedWorks = [...works];
                    updatedWorks[workIndex.current] = newWork;
                    setWorks(updatedWorks);
                } else {
                    setWorks([...works, newWork]);
                }
                navigate('/');
                break
            }
        }
    }
    return (
        <>
            <div className="Add">
                <div className="head">
                    <div className="back" onClick={() => navigate(-1)}></div>
                </div>
                <div className='body'>
                    <div className={`title-complete ${state > 0 ? 'active' : 'hidden'}`} ref={titleCompleteRef} style={{fontSize: state === 2 ? '30px' : '15px'}} ></div>
                    <div className={`prompt ${state < 2 ? 'active' : 'hidden'}`}>为你的行程添加{state > 0 ? '具体内容' : '一个标题'}</div>
                    <div className='input'><textarea name="title" id="textarea" rows={1} value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea></div>
                    <div className={`tags ${state > 0 ? 'hidden' : 'active'}`}>{tags.map((item,index)=>(<div className='tag' key={index} onClick={()=>setInputText(inputText.concat(item))}>{item}</div>))}</div>
                    <div className={`details ${state === 2 ? 'active' : 'hidden'}`}>
                        <div className='week-details'>
                        {weeks.map((week,index)=>(
                            <div className='week-detail' key={week.toString()+'-'+index.toString()} onClick={()=>showAddSelectPage(PAGESTATE.WEEKS)}>{getWeekCharacter(week)}</div>
                         ))}
                        </div>
                        <div className='time-details'>
                            {days.map((day, index) => (        
                                <div className='time-detail' key={day.toString()+'-'+index.toString()} onClick={()=>{
                                        setPageIndex(index)
                                        showAddSelectPage(PAGESTATE.TIMES)
                                    }}>{getTimeCharacters(day,startTimes[index],endTimes[index])}
                                    <div className='closeButton' onClick={(e)=>{
                                        e.stopPropagation()
                                        deleteTime(index)
                                    }}><div className='closeIcon'></div></div>
                                </div>
                                
                             ))}
                             <div className='addTime' onClick={() => {
                                setPageIndex(days.length)
                                showAddSelectPage(PAGESTATE.TIMES)
                                }}></div>
                        </div>
                        <span className='isRemind' onClick={()=>{showAddSelectPage(PAGESTATE.REMINDS)}}>{getRemindCharacter(remind)}</span>
                        <span className='isToBeDone' onClick={() => setIsToBeDone(!isToBeDone)}>{isToBeDone ? '取消待办' : '加入待办'}</span>
                    </div>
                </div>
                <div className='foot'>
                    <div className='continue'><div className='button' onClick={submit}></div></div>
                </div>
            </div>
            <AddSelectPage state={pageState} index={pageIndex} ref={AddSelectPageRef}/>
        </>
    )
}

export default Add