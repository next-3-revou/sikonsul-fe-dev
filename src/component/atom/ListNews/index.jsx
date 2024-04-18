/* eslint-disable react/prop-types */
import { Avatar} from "antd";
import { UserOutlined } from '@ant-design/icons';

const ListNews = ({ title, date, onClick }) => {

  return (
    <div className="list-news py-2">
      <div className="list-news-wrapper flex justify-between items-center cursor-pointer" onClick={onClick}>
        <div className="news-headline flex flex-col">
          <div className="news-title">
            <h2 className="text-black text-lg text-left">{title}</h2>
          </div>
          <div className="news-date">
            <h2 className="text-[#7D8797] text-sm text-left max-w-20">{date}</h2>
          </div>
        </div>
        <div className="news-thumb">
          <Avatar shape="square" size={52} icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  )
}

export default ListNews