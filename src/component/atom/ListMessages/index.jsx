/* eslint-disable react/prop-types */
// import React from 'react'
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import RightChevron from '../../../uploads/right-chevron.png'
import { createUUID } from "../../../util/UniqueKey";

const ListMessages = ({ title, specialization, onClick }) => {
  return (
    <div key={createUUID} className="category-lawyer flex justify-between items-center border-b-2 border-[#EEEEEE] py-5 cursor-pointer" onClick={onClick}>
      <div className="category-lawyer-info flex">
        <div className="category-lawyer-avatar">
          <Avatar size={52} icon={<UserOutlined />} />
        </div>
        <div className="category-lawyer-name px-5">
          <h2 className="text-black text-xl text-left">{title}</h2>
          <h2 className="text-[#7D8797] text-base text-left">{specialization}</h2>
        </div>
      </div>

      <div className="category-lawyer-chevron">
        <img src={RightChevron} className='w-6 h-6' alt="" />
      </div>
    </div>
  )
}

export default ListMessages