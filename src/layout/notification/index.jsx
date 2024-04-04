/* eslint-disable react/prop-types */
import './styles.css'

const Notifications = ({ bgColor , textNotif, animate }) => {
    
  return (
    <div className={`notif absolute h-20 w-full top-0 z-20 ${animate ? 'animate' : ''} ${bgColor}`}>      
      <h2 className="text-white text-xl relative top-8">{textNotif}</h2>
    </div>	
  )
}

export default Notifications