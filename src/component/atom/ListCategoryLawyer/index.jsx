/* eslint-disable react/prop-types */
// import React from 'react'
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import RightChevron from '../../../uploads/right-chevron.png'
import Lock from '../../../uploads/padlock.png'



const ListCategoryLawyer = ({ idLawyer, name, onClick, isPremium, userStatus }) => {
  return (
    <div className="category-lawyer flex justify-between items-center border-b-2 border-[#EEEEEE] py-5 cursor-pointer" onClick={() => onClick(idLawyer, isPremium, name)}>
      <div className="category-lawyer-info flex items-center">
        <div className="category-lawyer-avatar">
          <Avatar size={52} icon={<UserOutlined />} />
        </div>
        <div className="category-lawyer-name px-5">
          <h2 className="text-black text-xl text-left">{name}</h2>
        </div>
      </div>

      <div className="category-lawyer-chevron">
        <img src={(isPremium && userStatus === false) || (isPremium && userStatus === undefined) ? Lock : RightChevron} className='w-6 h-6' alt="" />
      </div>
    </div>
  )
}

export default ListCategoryLawyer