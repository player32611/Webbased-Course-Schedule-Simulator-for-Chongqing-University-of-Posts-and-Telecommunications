import { useState,useRef,useEffect } from 'react'

import './WorkPage.less'
import '../WorkList/WorkList'
import WorkList from '../WorkList/WorkList'
import WorkDetailPage from '../WorkDetailPage/WorkDetailPage'
import { getCurrentWeekNumber, getWeekCharacter } from '../../utils/utils'
import useWorkStore from '../../store/workStore'
import useOthersStore from '../../store/othersStore'

enum DEPENDS {
    PERSONAL,
    OTHERS
}

const semesterStartDate = new Date('2025-02-24')//开始日期
const currentWeek = getCurrentWeekNumber(semesterStartDate,21)  // 计算当前周数
const getAllWeeks = () => {
  return ['整学期', ...Array.from({ length: 21 }, (_, i) => `${getWeekCharacter(i+1)}`)];
}
function ClassPage() {
  const [isHidden, setIsHidden] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [verticalTranslateY, setVerticalTranslateY] = useState(0)
  const [isVerticalSliding, setIsVerticalSliding] = useState(false)
  const [isShowOthersWork, setIsShowOthersWork] = useState(false)

  const startX = useRef(0)
  const startY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  
  const weeks = getAllWeeks()
  const {setIsActive} = useWorkStore()
  const {setOthersIsActive} = useOthersStore()
  
  const goToCurrentWeek = () => {
    setCurrentSlide(currentWeek === 0 ? 0 : currentWeek)// 如果当前周数超出范围（即为0），则跳转到整学期页面（索引0）// 否则跳转到对应的周数页面
  }// 回到本周功能
  
  useEffect(() => {
    goToCurrentWeek()
    setIsActive(false)
    setOthersIsActive(false)
  }, [setIsActive,setOthersIsActive])// 组件挂载时自动跳转到当前周
  const isTouchInHead = (target: EventTarget | null) => {
    return target instanceof Element && headRef.current?.contains(target);
  }
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
    if (isTouchInHead(e.target)) {// 如果在头部区域，准备垂直滑动
      setIsVerticalSliding(true)
    } else {// 否则准备水平滑动
      setIsSliding(true)
    }
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isVerticalSliding) {// 处理垂直滑动
      const currentY = e.touches[0].clientY
      const diff = currentY - startY.current  
      setVerticalTranslateY(diff)
    } else if (isSliding) {// 处理水平滑动
      const currentX = e.touches[0].clientX
      const diff = currentX - startX.current
      setTranslateX(diff)
    }
  }
  const handleTouchEnd = () => {
    if (isVerticalSliding) {
      const threshold = 50// 设置垂直滑动阈值
      if (verticalTranslateY > threshold) {
        setIsHidden(true)// 向下滑动超过阈值，隐藏页面
      } else if (verticalTranslateY < -threshold) {
        setIsHidden(false)// 向上滑动超过阈值，显示页面
      }
      setVerticalTranslateY(0)// 重置垂直滑动状态
      setIsVerticalSliding(false)
    } else if (isSliding) {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth
      const threshold = containerWidth * 0.2 // 20% 阈值
      
      if (Math.abs(translateX) > threshold) {
        if (translateX > 0 && currentSlide > 0) {
          setCurrentSlide(currentSlide - 1)// 向右滑动，切换到前一个
        } else if (translateX < 0 && currentSlide < weeks.length - 1) {
          setCurrentSlide(currentSlide+ 1)// 向左滑动，切换到后一个
        }
      }
      setTranslateX(0)// 重置过渡状态
      setIsSliding(false)
    }
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX
    startY.current = e.clientY
    if (isTouchInHead(e.target)) {// 如果在头部区域，准备垂直滑动
      setIsVerticalSliding(true)
    } else {
      setIsSliding(true)// 否则准备水平滑动
    }
    e.preventDefault(); // 防止文本选择
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isVerticalSliding) {// 处理垂直滑动
      const currentY = e.clientY
      const diff = currentY - startY.current
      setVerticalTranslateY(diff)
    } else if (isSliding) {// 处理水平滑动
      const currentX = e.clientX
      const diff = currentX - startX.current
      setTranslateX(diff)
    }
  }
  const handleMouseUp = () => {
    if (isVerticalSliding) {
      const threshold = 50// 设置垂直滑动阈值
      if (verticalTranslateY > threshold) {
        setIsHidden(true)// 向下滑动超过阈值，隐藏页面
      } else if (verticalTranslateY < -threshold) {
        setIsHidden(false)// 向上滑动超过阈值，显示页面
      }
      setVerticalTranslateY(0)// 重置垂直滑动状态
      setIsVerticalSliding(false)
    } else if (isSliding) {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth
      const threshold = containerWidth * 0.2 // 20% 阈值
      
      if (Math.abs(translateX) > threshold) {
        if (translateX > 0 && currentSlide > 0) {
          setCurrentSlide(currentSlide - 1)// 向右滑动，切换到前一个
        } else if (translateX < 0 && currentSlide < weeks.length - 1) {
          setCurrentSlide(currentSlide + 1)// 向左滑动，切换到后一个
        }
      }
      setTranslateX(0)// 重置过渡状态
      setIsSliding(false)
    }
  }

  return (
    <>
      <div className={`ClassPage ${isHidden ? 'hidden' : 'visable'}`} 
      style={{transform: `translateY(${verticalTranslateY}px)`,transition: isVerticalSliding ? 'none' : 'transform 0.3s ease, bottom 0.5s ease'}}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      >
        <div className='head' ref={headRef}>
          <div className='head-bar'></div>
          <div className={`head-content ${isHidden ? 'visable' : 'hidden'}`}>
            <div>123</div>
          </div>
          <div className={`head-content ${isHidden ? 'hidden' : 'visable'}`}>
            <div className='week'>{getWeekCharacter(currentSlide)}</div>
            <div className={`week-navigation ${currentSlide === currentWeek ? 'hidden' : 'visable'}`}>
              <button className="back-to-current" onClick={goToCurrentWeek}>回到本周</button>
            </div>
            <div className={`people ${isShowOthersWork?'others':'personal'}`} onClick={()=>setIsShowOthersWork(!isShowOthersWork)}></div>
          </div>
        </div>
        <div className='body'>
          <div 
          ref={containerRef}
          className="worklist-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
            transition: isSliding ? 'none' : 'transform 0.3s ease'
          }}
          >
          {weeks.map((week, index) => (
            <div key={week} className="worklist-slide">
              {index === 0 ? (
                <WorkList week={0} showOthers={isShowOthersWork} /> // 第一个滑动页为“整学期”
              ) : (
                <WorkList week={index}  showOthers={isShowOthersWork}/> // 其余为正常周数
              )}
            </div>
          ))}
          </div>
        </div>
        <WorkDetailPage depends={DEPENDS.PERSONAL}/>
        <WorkDetailPage depends={DEPENDS.OTHERS}/>
      </div>
    </>
  )
}

export default ClassPage