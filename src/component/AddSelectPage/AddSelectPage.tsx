import { useState,useImperativeHandle,useRef,useEffect } from 'react'
import type { Ref } from 'react'

import './AddSelectPage.less'
import { getWeekCharacter,getClassCharacter, getDayCharacter,getRemindCharacter } from '../../utils/utils';
import  useAddStore  from '../../store/addStore'

export interface AddSelectPageRef {
  setIsActive: (active:boolean) => void;
}

interface AddSelectPageProps {
    state:PAGESTATE;
    index?:number;
    ref: Ref<AddSelectPageRef>;
}

enum PAGESTATE{
    WEEKS,
    TIMES,
    REMINDS
}

enum SCROLLTYPE{
    DAYS,
    STARTTIMES,
    ENDTIMES,
    REMINDS
}

const weeksMap = [...Array(22).keys()]
const daysMap = [...Array(8).keys()].slice(1)
const timesMap = [...Array(13).keys()].slice(1)
const remindsMap = [...Array(6).keys()]

function AddSelectPage({state,index,ref}:AddSelectPageProps) {
    const {weeks,setWeeks,days,setDays,startTimes,setStartTimes,endTimes,setEndTimes,setRemind} = useAddStore()
    const [isActive, setIsActive] = useState<boolean>(false)
    const daysScrollRef = useRef<HTMLDivElement>(null);
    const startTimesScrollRef = useRef<HTMLDivElement>(null);
    const endTimesScrollRef = useRef<HTMLDivElement>(null);
    const remindsScrollRef = useRef<HTMLDivElement>(null);
    const selectedDayRef = useRef<HTMLDivElement>(null);
    const selectedStartTimeRef = useRef<HTMLDivElement>(null);
    const selectedEndTimeRef = useRef<HTMLDivElement>(null);
    const selectedRemindRef = useRef<HTMLDivElement>(null);
    const [currentDay,setCurrentDay] = useState(1)
    const [currentStartTime,setCurrentStartTime] = useState(0)
    const [currentEndTime,setCurrentEndTime] = useState(0)
    const [currentRemind,setCurrentRemind] = useState(0)
    useImperativeHandle(ref,()=> ({
        setIsActive:(active: boolean) => setIsActive(active)
    }))
    useEffect(() => {
        if (state === PAGESTATE.TIMES && isActive) {
            if (daysScrollRef.current && selectedDayRef.current) {// 初始化星期滚动位置
                const container = daysScrollRef.current;
                const selectedElement = selectedDayRef.current;
                const containerHeight = container.clientHeight;
                const selectedElementHeight = selectedElement.clientHeight;
                container.scrollTop = selectedElement.offsetTop - containerHeight / 2 + selectedElementHeight / 2;
            }
            if (startTimesScrollRef.current && selectedStartTimeRef.current) {// 初始化开始时间滚动位置
                const container = startTimesScrollRef.current;
                const selectedElement = selectedStartTimeRef.current;
                const containerHeight = container.clientHeight;
                const selectedElementHeight = selectedElement.clientHeight;
                container.scrollTop = selectedElement.offsetTop - containerHeight / 2 + selectedElementHeight / 2;
            }
            if (endTimesScrollRef.current && selectedEndTimeRef.current) {// 初始化结束时间滚动位置
                const container = endTimesScrollRef.current;
                const selectedElement = selectedEndTimeRef.current;
                const containerHeight = container.clientHeight;
                const selectedElementHeight = selectedElement.clientHeight;
                container.scrollTop = selectedElement.offsetTop - containerHeight / 2 + selectedElementHeight / 2;
            }
            if(remindsScrollRef.current && selectedRemindRef.current){
                const container = remindsScrollRef.current;
                const selectedElement = selectedRemindRef.current;
                const containerHeight = container.clientHeight;
                const selectedElementHeight = selectedElement.clientHeight;
                container.scrollTop = selectedElement.offsetTop - containerHeight / 2 + selectedElementHeight / 2;
            }
        }
    }, [state, isActive, currentDay, currentStartTime, currentEndTime]);
    if(state === PAGESTATE.WEEKS){
        return(
        <>
            <div className={`AddSelectPage-background ${isActive ? 'visable' : 'hidden'}`} onClick={()=>setIsActive(false)}></div>
            <div className={`AddSelectPage ${isActive ? 'visable' : 'hidden'}`}>
                <div className='weeks'>
                    {weeksMap.map((week, index) => (
                        <div className={`week-item ${weeks.includes(week) ? 'select' : ''}`} key={index} onClick={() => {
                            if(weeks.includes(week)){
                                setWeeks(weeks.filter(item => item !== week))
                            }else{
                                if(weeks.includes(0))setWeeks([week])
                                else setWeeks([...weeks,week])
                            }
                        }}>{getWeekCharacter(week)}</div>
                    ))}
                </div>
                <div className='submit'><div className='button' onClick={()=>{setIsActive(false)}}>确定</div></div>
            </div>
        </>
    )}
    if(state === PAGESTATE.TIMES){
        const handleScroll = (type: SCROLLTYPE, container: HTMLDivElement) => {// 处理滚动事件
            const scrollPosition = container.scrollTop + container.clientHeight / 2;
            let closestElement: HTMLDivElement = null! as HTMLDivElement;
            let minDistance = Infinity;
            container.childNodes.forEach((node) => {
            if (node instanceof HTMLDivElement && node.classList.contains('day-item')) {
                const element = node;
                const elementCenter = element.offsetTop + element.clientHeight / 2;
                const distance = Math.abs(elementCenter - scrollPosition);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestElement = element;
                }
            }
            });
            if (closestElement) {
                switch (type) {
                    case SCROLLTYPE.DAYS: {
                        const dayValue = parseInt(closestElement.getAttribute('data-day') || '1');
                        setCurrentDay(dayValue);
                        break;
                    }
                    case SCROLLTYPE.STARTTIMES: {
                        const startTimeValue = parseInt(closestElement.getAttribute('data-starttime') || '0');
                        setCurrentStartTime(startTimeValue);
                        if (currentEndTime < startTimeValue) {
                            setCurrentEndTime(startTimeValue);
                        }
                        break;
                    }
                    case SCROLLTYPE.ENDTIMES: {
                        const endTimeValue = parseInt(closestElement.getAttribute('data-endtime') || '0');
                        if (endTimeValue >= currentStartTime) {
                            setCurrentEndTime(endTimeValue);
                        }
                        break;
                    }
                }
            }
        };
        const getValidEndTimes = () => {// 获取有效的结束时间选项（大于等于开始时间的选项）
            return timesMap.filter(time => time >= currentStartTime);
        };
        return(
        <>
            <div className={`AddSelectPage-background ${isActive ? 'visable' : 'hidden'}`} onClick={()=>setIsActive(false)}></div>
            <div className={`AddSelectPage ${isActive ? 'visable' : 'hidden'}`}>
                <div className="time-selector">
                    <div className="days-scroll-container" ref={daysScrollRef} onScroll={(e)=>handleScroll(SCROLLTYPE.DAYS, e.target as HTMLDivElement)}>
                        <div className='empty-top'></div>
                        {daysMap.map((day) => (
                        <div key={day}
                        data-day={day}
                        ref={day === currentDay  ? selectedDayRef : null}
                        className={`day-item ${day === currentDay ? 'selected' : ''}`}>
                        {getDayCharacter(day)}</div>
                        ))}
                        <div className='empty-bottom'></div>
                    </div>
                    <div className="days-scroll-container" ref={startTimesScrollRef} onScroll={(e)=>handleScroll(SCROLLTYPE.STARTTIMES, e.target as HTMLDivElement)}>
                        <div className='empty-top'></div>
                        {timesMap.map((time) => (
                        <div key={time}
                        data-starttime={time}
                        ref={time === currentStartTime  ? selectedStartTimeRef : null}
                        className={`day-item ${time === currentStartTime ? 'selected' : ''}`}>
                        {getClassCharacter(time)}</div>
                        ))}
                        <div className='empty-bottom'></div>
                    </div>
                    <div className="days-scroll-container" ref={endTimesScrollRef}  onScroll={(e) => handleScroll(SCROLLTYPE.ENDTIMES, e.target as HTMLDivElement)}>
                        <div className='empty-top'></div>
                        {getValidEndTimes().map((time) => (
                            <div key={time}
                            data-endtime={time}
                            ref={time === currentEndTime ? selectedEndTimeRef : null}
                            className={`day-item ${time === currentEndTime ? 'selected' : ''}`}>
                            {getClassCharacter(time)}
                            </div>
                        ))}
                        <div className='empty-bottom'></div>
                    </div>
                </div>
                <div className="selected-indicator"></div>
                <div className='submit'><div className='button' onClick={()=>{
                    if (index !== undefined) {
                        const newDays = [...days];
                        newDays[index] = currentDay;
                        setDays(newDays);// 更新星期
                        const newStartTimes = [...startTimes];
                        newStartTimes[index] = currentStartTime;
                        setStartTimes(newStartTimes);// 更新开始时间
                        const newEndTimes = [...endTimes];
                        newEndTimes[index] = currentEndTime;
                        setEndTimes(newEndTimes);// 更新结束时间
                        }
                    setIsActive(false)
                }}>确定</div></div>
            </div>
        </>)
    }
    if(state === PAGESTATE.REMINDS){
        const handleScroll = (type: SCROLLTYPE, container: HTMLDivElement) => {// 处理滚动事件
            const scrollPosition = container.scrollTop + container.clientHeight / 2;
            let closestElement: HTMLDivElement = null! as HTMLDivElement;
            let minDistance = Infinity;
            container.childNodes.forEach((node) => {
            if (node instanceof HTMLDivElement && node.classList.contains('remind-item')) {
                const element = node;
                const elementCenter = element.offsetTop + element.clientHeight / 2;
                const distance = Math.abs(elementCenter - scrollPosition);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestElement = element;
                }
            }
            });
            if (closestElement) {
                switch (type) {
                    case SCROLLTYPE.REMINDS: {
                        const remindValue = parseInt(closestElement.getAttribute('data-day') || '1');
                        setCurrentRemind(remindValue);
                        break;
                    }
                }
            }
        };
        return (<>
            <div className={`AddSelectPage-background ${isActive ? 'visable' : 'hidden'}`} onClick={()=>setIsActive(false)}></div>
            <div className={`AddSelectPage ${isActive ? 'visable' : 'hidden'}`}>
                <div className="time-selector">
                    <div className="reminds-scroll-container" ref={remindsScrollRef} onScroll={(e)=>handleScroll(SCROLLTYPE.REMINDS, e.target as HTMLDivElement)}>
                        <div className="empty-top"></div>
                        {remindsMap.map((remind) => (
                        <div key={remind}
                        data-day={remind}
                        ref={remind === currentRemind  ? selectedRemindRef : null}
                        className={`remind-item ${remind === currentRemind ? 'selected' : ''}`}>
                        {getRemindCharacter(remind)}</div>
                        ))}
                        <div className="empty-bottom"></div>
                    </div>
                </div>
                <div className="selected-indicator"></div>
                <div className='submit'><div className='button' onClick={()=>{
                    if (index !== undefined) {
                        setRemind(currentRemind);
                    }
                    setIsActive(false)
                }}>确定</div></div>
            </div>
        </>)
    }
}

export default AddSelectPage