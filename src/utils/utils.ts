import personalBackground from '../icon/底色.png'

export function getWeekCharacter(num: number): string {
  if (!Number.isInteger(num) || num < 1 || num > 21) {
    return '整学期';
  }

  const weeks = [
    '第一周', '第二周', '第三周', '第四周', '第五周',
    '第六周', '第七周', '第八周', '第九周', '第十周',
    '第十一周', '第十二周', '第十三周', '第十四周', '第十五周',
    '第十六周', '第十七周', '第十八周', '第十九周', '第二十周',
    '第二十一周'
  ];

  return weeks[num - 1];
}

export function getWeekLengthCharacter(nums:number[]): string { 
  if(nums.length >= 21 ||nums.length <= 0||nums.includes(0))return '整学期'
  let index = 0
  let res:string = nums[0].toString()
  while(index<nums.length-1){
    if(nums[index]!==nums[index+1]-1&&index!==nums.length-2){
      res+='-'+nums[index].toString()+'周,'+nums[index+1].toString()
    }
    else if(index==nums.length-2){
      res+='-'+nums[index+1].toString()
    }
    index++
  }
  res+='周'
  return res
}
export function getDayCharacter(num:number): string { 
  if (!Number.isInteger(num) || num < 1 || num > 7) {
    return 'null';
  }

  const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];

  return weeks[num - 1];
}

export function getClassCharacter(startTime:number):string{
  if (!Number.isInteger(12) || startTime < 1 || startTime > 12) {
    return 'null';
  }
  const weeks = ['一', '二', '三', '四', '五', '六', '七','八','九','十','十一','十二'];
  return '第'+weeks[startTime - 1]+'节课';
}

export function getRemindCharacter(remind:number):string{
  if(!Number.isInteger(5)||remind<1||remind>6){
    return '不提醒';
  }
  const reminds = ['提前5分钟','提前10分钟','提前20分钟','提前30分钟','提前1小时']
  return reminds[remind-1];
}

export function getStartTimeCharacter(startTime:number):string{
  if (!Number.isInteger(12) || startTime < 1 || startTime > 12) {
    return 'null';
  }
  const startTimes = ['08:00','08:55','10:15','11:10','14:00','14:55','16:15','17:10','19:00','19:55','20:50','21:45']
  return startTimes[startTime - 1];
}

export function getEndTimeCharacter(endTime:number):string{
  if (!Number.isInteger(12) || endTime < 1 || endTime > 12) {
    return 'null';
  }
  const endTimes = ['08:45','09:40','11:00','11:55','14:45','15:40','17:00','17:55','19:45','20:40','21:35','22:30']
  return endTimes[endTime - 1];
}
export function getCurrentWeekNumber(startDate: Date,length:number): number {
  const now = new Date();
  const start = new Date(startDate);
  const diffTime = Math.abs(now.getTime() - start.getTime());// 计算时间差（毫秒）
  const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));// 转换为周数
  const weekNumber = diffWeeks + 1;  
  return weekNumber > length ? 0 : weekNumber;// 如果超出23周，返回一个特殊值（如0）表示整学期
}

export const getWeekDates = (start: Date, weekNumber: number) => {
  // 计算该周周一的日期
  const weekStartDate = new Date(start);
  weekStartDate.setDate(start.getDate() + (weekNumber - 1) * 7);
  
  // 确保我们从周一開始計算
  const day = weekStartDate.getDay();
  const diff = weekStartDate.getDate() - day + (day === 0 ? -6 : 1);
  weekStartDate.setDate(diff);
  
  // 生成该周每天的日期
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStartDate);
    currentDate.setDate(weekStartDate.getDate() + i);
    dates.push(currentDate);
  }
  
  return dates;
}

export function getMonth(date: Date) {
  return `${date.getMonth() + 1}月`;
}// 格式化月份显示

export function getDay(date: Date) {
  return date.getDate().toString();
}// 格式化日期显示

export const getBGColor = (startTime: number) => {
    if (startTime <= 4) {
      return '#F9E8D8'
    } else if (startTime <= 8) {
      return '#F9E3E5'
    } else {
      return '#DDE3F9'
    }
}

export const getFontColor = (startTime: number) => {   
    if (startTime <= 4) {
      return '#F18429'
    } else if (startTime <= 8) {
      return '#E0706F'
    } else {
      return '#4367E1'
    }
}

export const getItemStyle = (day:number,startTime:number,endTime:number,place:string) =>{
  if(place === 'null'){
    return {
      gridArea: `${startTime+1}/${day+1}/${endTime+2}/${day+2}`, 
      background: `url(${personalBackground}) repeat`
    }
  }
  else{
    return {
      gridArea: `${startTime+1}/${day+1}/${endTime+2}/${day+2}`, 
      backgroundColor: getBGColor(startTime),
      color:getFontColor(startTime)
    }
  }
}

export const getOthersItemStyle = (day:number,startTime:number,endTime:number) =>{ 
  return {
      gridArea: `${startTime+1}/${day+1}/${endTime+2}/${day+2}`, 
      backgroundColor: `#DFF3FC`,
      color:`#2E97D0`
    }
}
export const getTimeCharacters = (day: number,startTime: number,endTime: number)=>{
  if(startTime === endTime)return getDayCharacter(day)+' '+getClassCharacter(startTime)
  else return getDayCharacter(day)+' '+getClassCharacter(startTime)+'-'+getClassCharacter(endTime)
}