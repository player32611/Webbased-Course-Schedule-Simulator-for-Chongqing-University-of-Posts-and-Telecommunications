import useWorkStore from '../../store/workStore';
import {WORKTYPE}  from '../../apis/works';
import { useNavigate } from 'react-router';

import './WorkDetailPage.less'
import { getWeekLengthCharacter,getDayCharacter,getStartTimeCharacter,getEndTimeCharacter } from '../../utils/utils';

export interface WorkDetailPageRef {
  showWorkDetailPage: () => void;
}




function WorkDetailPage() {
    const {works,setWorks,dayIndex,activeId,isActive,setIsActive} = useWorkStore()
    const workItem = works.find(item => item.id === activeId);
    const navigate = useNavigate()
    function handleDelete():void{
        if(workItem){
            setWorks(works.filter(item => item.id !== workItem.id))
            alert('删除成功')
        }
        else{
            alert('删除失败')
        }
    }
    function handleChange():void{
        if(workItem)navigate('/add?startTime='+workItem.startTime+'&endTime='+workItem.endTime+'&day='+workItem.day+'&week='+workItem.week+'&index='+works.findIndex(item => item.id === activeId))
    }
    if(workItem?.type !== WORKTYPE.PERSONAL && workItem){
        return (<>
        <div className={`WorkDetailPage-background ${isActive ? 'visable' : 'hidden'}`} onClick={()=>setIsActive(false)}></div>
        <div className={`WorkDetailPage ${isActive ? 'visable' : 'hidden'}`}>
            <div className='title'>{workItem?.name}</div>
            <div className='place'>{workItem?.place}&nbsp;&gt;&nbsp;{workItem?.teacher}</div>
            <div className='week'><div>周期</div><div>{getWeekLengthCharacter(workItem.week)}</div></div>
            <div className='time'><div>时间</div><div>{getDayCharacter(workItem?.day[dayIndex])}&nbsp;{getStartTimeCharacter(workItem?.startTime[dayIndex])}-{getEndTimeCharacter(workItem?.endTime[dayIndex])}</div></div>
            <div className='type'><div>课程类型</div><div>{workItem?.type ? '必修' : '选修'}</div></div>
        </div>
        </>)
    }
    else if(workItem?.type === WORKTYPE.PERSONAL){
        return (<>
            <div className={`WorkDetailPage-background ${isActive ? 'visable' : 'hidden'}`} onClick={()=>setIsActive(false)}></div>
            <div className={`WorkDetailPage ${isActive ? 'visable' : 'hidden'}`}>
                <div className='title'>{workItem?.name}
                    <div className='button'><div className='delete' onClick={handleDelete}>删除</div><div className='change' onClick={handleChange}>修改</div></div>
                </div>
                <div className='personal-time'>{getWeekLengthCharacter(workItem.week)}&nbsp;{getDayCharacter(workItem?.day[dayIndex])}&nbsp;{getStartTimeCharacter(workItem?.startTime[dayIndex])}-{getEndTimeCharacter(workItem?.endTime[dayIndex])}</div>
                <div className='personal-content'>{workItem.teacher}</div>
            </div>
        </>)
    }
}

export default WorkDetailPage;