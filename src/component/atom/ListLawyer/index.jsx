/* eslint-disable react/prop-types */
// import React from 'react'
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';


const ListLawyer = ({name, speciality, profileLawyer, onClick}) => {

  return (
    <div className="list-lawyer py-2 cursor-pointer" onClick={onClick}>
      <div className="list-lawyer-wrapper flex justify-between items-center">
        <div className="lawyer-profile flex">
          <div className="lawyer-avatar">
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <div className="lawyer-name pl-2">
            <h2 className="text-black text-xl text-left">{name}</h2>
            {profileLawyer.map((cur, i) => {
              return(
                <div className="flex" key={i}>
                {cur.specialization.map((specialize, key) => {
                  let toStr = []
                  toStr.push(specialize.specialization.name)
                  let names = toStr.join(',')
                  
                  return(
                    <div  key={key} className="law-specialize p-2 bg-[#EDFCFD]">
                      <h2 className="text-[#7D8797] text-xs text-left ">{names}</h2>
                    </div>
                  )
                })

                }
                </div>
              )
            })

            }
            <h2 className="text-[#7D8797] text-base text-left">{speciality}</h2>
          </div>
        </div>
        {/* <div className="lawyer-rate">
          <Rate value={5} disabled={true} />
        </div> */}
      </div>
    </div>
  )
}

export default ListLawyer