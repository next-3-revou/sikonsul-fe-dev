/* eslint-disable react/prop-types */
// import React from 'react'
import { Avatar } from "antd";
import { LogoutOutlined, UnlockOutlined  } from '@ant-design/icons';
import { createUUID } from "../../../util/UniqueKey";

const ListProfiles = ({ titleOut, isPremium, titlePremium, onCLickLogout, onClickPre }) => {
  return (
    <div key={createUUID} className="category-lawyer flex justify-between items-center border-b-2 border-[#EEEEEE] cursor-pointer">
      <div className="category-lawyer-info flex"  onClick={onCLickLogout}>
        <div className="category-lawyer-avatar">
          <Avatar size={40} icon={<LogoutOutlined />} />
        </div>
        <div className="category-lawyer-name px-5">
          <h2 className="text-black text-xl text-left">{titleOut}</h2>
        </div>
      </div>
      {isPremium === false || isPremium === undefined &&
        <div className="category-lawyer-info flex" onClick={onClickPre}>
          <div className="category-lawyer-avatar">
            <Avatar size={40} icon={<UnlockOutlined />} />
          </div>
          <div className="category-lawyer-name px-5">
            <h2 className="text-black text-xl text-left">{titlePremium}</h2>
          </div>
        </div>
      }
    </div>
  )
}

export default ListProfiles