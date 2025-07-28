import { create } from 'zustand'
import { type Work,WORKTYPE } from '../apis/works';


interface workState {
    works: Work[];
    setWorks: (work: Work[]) => void;
    dayIndex: number;
    setDayIndex: (dayIndex: number) => void;
    activeId: number;
    setActiveId: (id: number) => void;
    isActive:boolean;
    setIsActive: (isActive: boolean) => void;
}



const useWorkStore = create<workState>(() => {
    return {
        works:[
            {
                id: 1,
                name: '思想政治理论课实践教学',
                place: '4507',
                teacher: '李俊斌',
                week:[3],
                day: [1],
                startTime: [1],
                endTime: [2],
                type:WORKTYPE.OPTIONAL
            },
            {
                id: 2,
                name: '大学生心理健康教育',
                place: '3402',
                teacher: '汪露',
                week:[1,2,3,4,5,6,7,8,9,10,11,12,14,15,16],
                day: [1],
                startTime: [3],
                endTime: [4],
                type:WORKTYPE.REQUIRED
            },
            {
                id: 3,
                name: '通用学术英语 1',
                place: '2208',
                teacher:'王婷',
                week:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                day: [1],
                startTime: [5],
                endTime: [6],
                type:WORKTYPE.REQUIRED
            },
            {
                id: 4,
                name: '高等数学A(下)',
                place: '3403',
                teacher:'廖光源',
                week:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                day: [1,3,5],
                startTime: [9,3,5],
                endTime: [10,4,6],
                type:WORKTYPE.REQUIRED
            },
            {
                id: 5,
                name: '线性代数',
                place: '2315',
                teacher:'胡爽',
                week:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                day: [2],
                startTime: [1],
                endTime: [2],
                type:WORKTYPE.REQUIRED
            },
        ],
        setWorks: (works: Work[]) => {
            useWorkStore.setState({ works:works });
        },
        dayIndex:0,
        setDayIndex: (dayIndex: number) => {
            useWorkStore.setState({ dayIndex:dayIndex });
        },
        activeId: 0,
        setActiveId: (id: number) => {
            useWorkStore.setState({ activeId: id })
        },
        isActive:false,
        setIsActive: (isActive: boolean) => {
            useWorkStore.setState({ isActive: isActive })
        }
    }
})

export default useWorkStore