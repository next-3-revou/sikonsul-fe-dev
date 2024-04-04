import { useEffect, useState } from 'react';
import axios from "axios";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Master from "../../layout/master"
import { message } from 'antd';

const URL_PROFILE = import.meta.env.VITE_BE_ENDPOINT_PROFILE

const UserProfile = () => {

  const [data, setData] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(true)
  
  const getProfile = async () => {
    const tokens = JSON.parse(localStorage.getItem('accessToken'));
    try {
			const res = await axios.get(`${URL_PROFILE}`, {
				headers: {
					Authorization: `Bearer ${tokens}`,
					'Content-Type': 'application/json',
				}
			})
      if(res.status === 200) {
        setLoad(false)
        setData(res.data.data)
      }
    } catch (error) {
      setLoad(false)
      messageApi.open({
        type: 'error',
        content: error.message,
      })
    }
  }

  useEffect(() => {
    if (load) {
      getProfile()      
    }
  })

  return (
    <>
      {contextHolder}
      <Master type={"navbar"}>
        <div className="content h-full px-4">
          <div className="lawyer-profile-wrapper h-full pt-6">
            <div className="lawyer-profile-info flex flex-col h-full">
              <div className="lawyer-profile-info-detail flex flex-col">
                <div className="lawyer-profile-info-detail-avatar">
                  <Avatar size={145} icon={<UserOutlined />} />
                </div>
                <div className="lawyer-profile-info-detail-identity">
                  <h2 className="text-black text-xl text-center font-semibold">{data.name}</h2>
                  <h2 className="text-[#7D8797] text-base text-center">Backend Engineer</h2>
                </div>
              </div>
              <div className="lawyer-profile-info-detail my-10">
                <div className="flex flex-col items-center py-2">
                  <div className="w-full py-4 border-b border-[#EEEEEE]">
                    <label
                      className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                      htmlFor="nik"
                    >
                      NIK
                    </label>
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={data.NIK}
                      disabled={true}
                    />
                  </div>
                  <div className="w-full py-4 border-b border-[#EEEEEE]">
                    <label
                      className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                      htmlFor="fullname"
                    >
                      Full Name
                    </label>
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={data.name}
                      disabled={true}
                    />
                  </div>
                  <div className="w-full py-4 border-b border-[#EEEEEE]">
                    <label
                      className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                      htmlFor="job"
                    >
                      Job
                    </label>
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={"Backend Engineer"}
                      disabled={true}
                    />
                  </div>                       
                </div>
              </div>
            </div>
          </div>
        </div>
      </Master>
    </>

  )
}

export default UserProfile