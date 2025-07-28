import { httpInstance } from '../utils/http'



type ResType<T> = {
    data: T
}

export interface Work {
    id: number;
    name: string;
    place: string;
    teacher: string;
    week: number[];
    day:number[];
    startTime: number[];
    endTime: number[];
    type:WORKTYPE;
}

export enum WORKTYPE {
    OPTIONAL = 0,
    REQUIRED = 1,
    PERSONAL = 2
}

type Params = {
    id: number
}

export function getOthersWorkData(params: Params) {
    return httpInstance.request<ResType<Work>>({
        url: '/category',
        method: 'GET',
        params,
    })
}
export function postWorkData(data: Partial<Work>){
    return httpInstance.request<ResType<Work>>({
        url: '/category',
        method: 'POST',
        data: data,
    })
}