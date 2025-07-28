import { create } from 'zustand'


interface addState {
   weeks: number[];
   setWeeks: (weeks: number[]) => void;
   days: number[];
   setDays: (days: number[]) => void;
   startTimes: number[];
   setStartTimes: (startTimes: number[]) => void;
   endTimes: number[];
   setEndTimes: (endTimes: number[]) => void;
   title: string;
   setTitle: (title: string) => void;
   content: string;
   setContent: (content: string) => void;
}


const useAddStore = create<addState>(() => {
    return {
        weeks: [],
        setWeeks: (weeks: number[]) => {
            if(weeks.includes(0))useAddStore.setState({weeks:[0]})
            else{
                weeks.sort((a, b) => a - b);
                useAddStore.setState({ weeks })
            }
        },
        days: [],
        setDays: (days: number[]) => {
            useAddStore.setState({ days })
        },
        startTimes: [],
        setStartTimes: (startTimes: number[]) => {
            useAddStore.setState({ startTimes })
        },
        endTimes: [],
        setEndTimes: (endTimes: number[]) => {
            useAddStore.setState({ endTimes })
        },
        title: '',
        setTitle: (title: string) => {
            useAddStore.setState({ title })
        },
        content: '',
        setContent: (content: string) => {
            useAddStore.setState({ content })
        }
    }
})

export default useAddStore