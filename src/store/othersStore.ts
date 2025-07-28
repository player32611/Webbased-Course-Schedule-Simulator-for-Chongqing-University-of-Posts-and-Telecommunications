import { create } from 'zustand'
import { type Work } from '../apis/works';
import { getOthersWorkData } from '../apis/works'

interface othersState {
    getData: () => Promise<void>;
    othersWorks: Work[];
    othersDayIndex: number;
    setOthersDayIndex: (dayIndex: number) => void;
    othersActiveId: number;
    setOthersActiveId: (id: number) => void;
    othersIsActive:boolean;
    setOthersIsActive: (isActive: boolean) => void;
}

const getData = async () => {
    try {
        const res = await getOthersWorkData({ id: 1 })
        // @ts-expect-error 忽略类型检查
        useOthersStore.setState({ othersWorks:res.data.data})
    } catch (error) {
        console.log(error)
    }
}

const useOthersStore = create<othersState>(() => {
    return {
        getData,
        othersWorks:[],
        othersDayIndex:0,
        setOthersDayIndex: (dayIndex: number) => {
            useOthersStore.setState({ othersDayIndex:dayIndex });
        },
        othersActiveId: 0,
        setOthersActiveId: (id: number) => {
            useOthersStore.setState({ othersActiveId: id })
        },
        othersIsActive:false,
        setOthersIsActive: (isActive: boolean) => {
            useOthersStore.setState({ othersIsActive: isActive })
        }
    }
})

export default useOthersStore