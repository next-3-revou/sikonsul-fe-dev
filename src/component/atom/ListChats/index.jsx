/* eslint-disable react/prop-types */
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { chatTime } from '../../../util/DateTime';

const ListChats = ({ chatContent, chatDate, type}) => {
  return (
    <div className={`flex my-2 ${type === 'isMe' ? 'justify-end' : ''}`}>
      <div className="flex gap-3">
        <div>
          <div className="px-3 py-2 bg-[#EDFCFD] text-[#112340] rounded mb-2">
            {chatContent}
          </div>
          <div className="text-end text-gray-500 dark:text-gray-300 text-sm">
            {chatTime(new Date(chatDate))}
          </div>
        </div>
        <Avatar size={40} icon={<UserOutlined />} />
      </div>
    </div>
  )
}

export default ListChats