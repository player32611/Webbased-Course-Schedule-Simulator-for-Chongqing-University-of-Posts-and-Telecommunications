import './WorkItem.less'

interface WorkItemProps {
  id: number;
  name: string;
  place: string;
}



function WorkItem({name,place}: WorkItemProps) {
  return (
    <>
        <div className="WorkItem">
          <div className='name'>{name}</div>
          <div className={`place ${place === 'null' ? 'personal' : ''}`}>{place === 'null' ? '' : place }</div>
        </div>
    </>
  )
}

export default WorkItem;