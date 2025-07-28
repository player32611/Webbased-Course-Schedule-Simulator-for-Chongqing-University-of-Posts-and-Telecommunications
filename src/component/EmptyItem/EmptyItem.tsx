import { useNavigate } from 'react-router';

import './EmptyItem.less'

interface EmptyItemProps {
    startTime: number;
    endTime: number;
    day: number;
    week: number[];
    isActive: boolean; // 接受外部状态
    onClick: (e: React.MouseEvent) => void; // 接受点击处理函数
}
function EmptyItem({startTime, endTime,day,week,isActive, onClick}:EmptyItemProps) {
    const navigate = useNavigate()
    return (<>
        <div className={`EmptyItem ${isActive ? 'active' : 'hidden'}`} onClick={onClick}>
            <div className={`EmptyItem-image ${isActive ? 'active' : 'hidden'}`} onClick={() => navigate('/add?startTime='+startTime+'&endTime='+endTime+'&day='+day+'&week='+week)}></div>
        </div>
    </>);
}

export default EmptyItem;