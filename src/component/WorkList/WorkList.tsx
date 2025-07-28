import { useState } from 'react';

import './WorkList.less'
import WorkItem from '../WorkItem/WorkItem';
import EmptyItem from '../EmptyItem/EmptyItem';
import useWorkStore from '../../store/workStore';
import { getWeekDates,getMonth,getDay,getItemStyle } from '../../utils/utils';

interface WorkListProps {
  week: number
}

interface ActiveEmptyItem {
  day: number;
  timeSlot: number;
}

const startDate = new Date('2025-02-24')

function ClassList({week}:WorkListProps) {
  const {works,setDayIndex,setActiveId,setIsActive} = useWorkStore()
  let weekWork = null
  let weekDates =  null
  let month = null // 使用周一的月份作为该周月份显示
  if(!week){
    weekWork = works
  }
  else{
    weekWork = works.filter(item => item.week.includes(week))
    weekDates = getWeekDates(startDate, week || 1);
    month = getMonth(weekDates[0]); // 使用周一的月份作为该周月份显示
  }
  // 创建一个二维数组来表示每天每节课是否有安排
  const timeSlots = 12; // 假设有12个时间槽
  const days = 7; // 一周7天
  
  // 创建一个二维数组来跟踪哪些时间槽已被占用
  const occupiedSlots: boolean[][] = Array(days).fill(null).map(() => Array(timeSlots).fill(false));

  // 标记已被占用的时间槽
  weekWork.forEach(item => {
    for (let i = 0; i < item.day.length; i++) {
      occupiedSlots[item.day[i]-1][item.startTime[i]-1] = true;
      occupiedSlots[item.day[i]-1][item.endTime[i]-1] = true;
    }
  });
  const [activeEmptyItem, setActiveEmptyItem] = useState<ActiveEmptyItem | null>(null); // 添加状态管理
  const handleEmptyItemClick = (day: number, timeSlot: number) => {
    setActiveEmptyItem({ day, timeSlot });
  };
  
  // 处理点击外部区域关闭 EmptyItem
  const handleContainerClick = (e: React.MouseEvent) => {
    // 如果点击的不是 EmptyItem，则关闭所有激活的 EmptyItem
    if (!(e.target as Element).closest('.EmptyItem')) {
      setActiveEmptyItem(null);
    }
  };
  const emptyItems = [];
  for (let day = 0; day < days; day++) {
    for (let timeSlot = 0; timeSlot < timeSlots; timeSlot++) {
      if (!occupiedSlots[day][timeSlot]) {
        const isActive = activeEmptyItem?.day === day && activeEmptyItem?.timeSlot === timeSlot;
        emptyItems.push(
          <div
          className='empty-item'
          key={`${day}-${timeSlot}`}
          style={{ 
              gridArea: `${timeSlot+2}/${day+2}/${timeSlot+3}/${day+3}`, 
            }}>
            <EmptyItem startTime={timeSlot+1} endTime={timeSlot+1} day={day+1} isActive={isActive} week={[week]}
              onClick={(e) => {
                e.stopPropagation();
                handleEmptyItemClick(day, timeSlot);
              }}/>
          </div>
        );
      }
    }
  }
  return (
    <>
      <div className='ClassList' onClick={handleContainerClick}>
        <div className='month'>{month}</div>
        <div className='monday'><div>周一</div><div className='date'>{weekDates ? `${getDay(weekDates[0])}日`: ''}</div></div>
        <div className='tuesday'><div>周二</div><div className='date'>{weekDates ? `${getDay(weekDates[1])}日`: ''}</div></div>
        <div className='wednesday'><div>周三</div><div className='date'>{weekDates ? `${getDay(weekDates[2])}日`: ''}</div></div>
        <div className='thursday'><div>周四</div><div className='date'>{weekDates ? `${getDay(weekDates[3])}日`: ''}</div></div>
        <div className='friday'><div>周五</div><div className='date'>{weekDates ? `${getDay(weekDates[4])}日`: ''}</div></div>
        <div className='saturday'><div>周六</div><div className='date'>{weekDates ? `${getDay(weekDates[5])}日`: ''}</div></div>
        <div className='sunday'><div>周天</div><div className='date'>{weekDates ? `${getDay(weekDates[6])}日`: ''}</div></div>
        <div className='first'>1</div>
        <div className='second'>2</div>
        <div className='third'>3</div>
        <div className='fourth'>4</div>
        <div className='fifth'>5</div>
        <div className='sixth'>6</div>
        <div className='seventh'>7</div>
        <div className='eighth'>8</div>
        <div className='ninth'>9</div>
        <div className='tenth'>10</div>
        <div className='eleventh'>11</div>
        <div className='twelth'>12</div>
        {emptyItems}
        {weekWork.map((work, index1) => (
          work.day.map((item,index2)=>(
              <div 
              key={index1+'-'+index2} 
              className='work-item' 
              onClick={(e)=>{
                e.stopPropagation(); // 阻止冒泡到容器
                setDayIndex(index2)
                setActiveId(work.id)
                setIsActive(true)
              }}
              style={getItemStyle(item,work.startTime[index2],work.endTime[index2],work.place)}
              >
              <WorkItem id={work.id} name={work.name} place={work.place}/>
            </div>
          ))
        ))}
      </div>
    </>
  );
}

export default ClassList;