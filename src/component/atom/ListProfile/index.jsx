/* eslint-disable react/prop-types */
// import React from 'react'
import { Avatar } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { createUUID } from "../../../util/UniqueKey";

const ListProfiles = ({ title, onCLick }) => {
  return (
    <div key={createUUID} className="category-lawyer flex justify-center items-center border-b-2 border-[#EEEEEE] py-5 cursor-pointer" onClick={onCLick}>
      <div className="category-lawyer-info flex">
        <div className="category-lawyer-avatar">
          <Avatar size={40} icon={<LogoutOutlined />} />
        </div>
        <div className="category-lawyer-name px-5">
          <h2 className="text-black text-xl text-left">{title}</h2>
        </div>
      </div>
    </div>
  )
}

export default ListProfiles