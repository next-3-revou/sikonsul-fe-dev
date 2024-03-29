// import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Master from "../../layout/master"
import { Buttons } from "../../component";
import Breadcrumb from "../../layout/breadcrumb";

const LawyerProfile = () => {
  let lawyerId = 'abcde';
  const navigate = useNavigate()

  const onPrev = e => {
    e.preventDefault()
    navigate(-1)
  }

  const chatLawyer = (e) => {
    e.preventDefault()
    navigate(`/lawyer/${lawyerId}/chat`)
  }

  return (
    <Master>
      <div className="content h-full px-4">
        <Breadcrumb title={"Profile"} onClick={e => onPrev(e)} type={"profile"} />
        <div className="lawyer-profile-wrapper h-full pt-6">
          <div className="lawyer-profile-info flex flex-col h-full justify-between">
            <div className="lawyer-profile-info-detail flex flex-col">
              <div className="lawyer-profile-info-detail-avatar">
                <Avatar size={145} icon={<UserOutlined />} />
              </div>
              <div className="lawyer-profile-info-detail-identity">
                <h2 className="text-black text-xl text-center font-semibold">John Doe</h2>
                <h2 className="text-[#7D8797] text-base text-center">Pidana, Property</h2>
              </div>
            </div>
            <div className="lawyer-profile-info-detail">
              <div className="flex flex-col items-center py-2">
                <div className="w-full py-4 border-b border-[#EEEEEE]">
                  <label
                    className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                    htmlFor="fullname"
                  >
                    Alumnus
                  </label>
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    value={"tes"}
                    disabled={true}
                  />
                </div>
                <div className="w-full py-4 border-b border-[#EEEEEE]">
                  <label
                    className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                    htmlFor="fullname"
                  >
                    STR Number
                  </label>
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    value={"tes"}
                    disabled={true}
                  />
                </div>
                <div className="w-full py-4 border-b border-[#EEEEEE]">
                  <label
                    className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                    htmlFor="fullname"
                  >
                    Specialization
                  </label>
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    value={"tes"}
                    disabled={true}
                  />
                </div>
                <div className="w-full py-4 border-b border-[#EEEEEE]">
                  <label
                    className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                    htmlFor="fullname"
                  >
                    Lawyer Experience
                  </label>
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    value={"tes"}
                    disabled={true}
                  />
                </div>                              
              </div>
            </div>
            <div className="lawyer-profile-info-chat">
              <Buttons type="submit" title={"Start Consultation"} width={"w-full"} height={"h-12"} gap={"my-2"} tipe={"active"} onClick={e => chatLawyer(e)} />
            </div>
          </div>
        </div>
      </div>
    </Master>
  )
}

export default LawyerProfile