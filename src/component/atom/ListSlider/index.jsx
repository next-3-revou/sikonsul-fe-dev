/* eslint-disable react/prop-types */
// import React from 'react'
import Icons from '../../../uploads/icons-header.png';

const ListSlider = ({ title, onClick }) => {
  return (
    <div className="h-40 bg-[#EDFCFD] sliders-items flex-col justify-center items-center px-2 cursor-pointer" onClick={onClick}>
      <img src={Icons} className="w-20" alt="" />
      <h3 className="text-black">{title}</h3>
    </div>
  )
}

export default ListSlider