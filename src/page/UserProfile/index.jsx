import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Master from "../../layout/master"
import { ListProfiles } from '../../component';
import { clearData } from '../../util/LocalStorage';
import { message } from 'antd';
import axios from "axios";


const URL_USERS = import.meta.env.VITE_BE_ENDPOINT_USERS

const UserProfile = () => {
  const profile = useSelector(state => state.profiles.profile);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const logout = (e) => {
    e.preventDefault()
    clearData('accessToken')
    clearData('userId')

    messageApi.open({
      type: 'success',
      content: "Success SignOut",
    })

    setTimeout(() => {
      dispatch({type: 'CLEAR_TOKEN'})
      dispatch({type: 'CLEAR_PROFILE'})
      navigate('/',{ replace: true })
    }, '2000');
  }

  const userPremium = async (e) => {
    e.preventDefault()
    const tokens = JSON.parse(localStorage.getItem('accessToken'));
    try {
      const res = await axios.put(
        `${URL_USERS}/premium`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if(res.status === 200) {
        dispatch({type: 'ADD_PROFILE', payload: res.data.data})
        messageApi.open({
          type: 'success',
          content: res.data.message,
        })
      }

    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.message,
      })
    }
   
  }

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
                  <h2 className="text-black text-xl text-center font-semibold">{profile.name}</h2>
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
                      value={profile.nik}
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
                      value={profile.name}
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
              <ListProfiles isPremium={profile.isPremium} titleOut={"Signout"} titlePremium={"Go Premium"} onCLickLogout={(e) => logout(e)} onClickPre={(e) => userPremium(e)} />
            </div>
          </div>
        </div>
      </Master>
    </>

  )
}

export default UserProfile