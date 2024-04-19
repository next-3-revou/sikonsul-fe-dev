import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Spin, message } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Master from "../../layout/master"
import { Buttons } from "../../component";
import Breadcrumb from "../../layout/breadcrumb";
import axios from "axios";

const URL_LAWYERS = import.meta.env.VITE_BE_ENDPOINT_LIST_LAWYERS

const LawyerProfile = () => {
  
  let { lawyerId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profilesLawyer.profileLawyer);

  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();


  const getProfileLawyer = useCallback(async () => {
    const tokens = JSON.parse(localStorage.getItem('accessToken'));

    if(profile.id === '' | profile.id === undefined) {
      try {
        setLoading(true)
        const res = await axios.get(`${URL_LAWYERS}/profile/${lawyerId}`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
            'Content-Type': 'application/json',
          }
        })
  
        if(res.status === 200){
          setLoading(false)
          dispatch({type: 'ADD_PROFILE_LAWYER', payload: res.data.data.lawyer})
        }
      } catch (error) {
        setLoading(false)
        messageApi.open({
          type: 'error',
          content: error.message,
        })
      }
    }
  }, [])

  useEffect(() => {
    getProfileLawyer()
  }, [])
  

  const onPrev = e => {
    e.preventDefault()
    navigate(-1)
  }

  const chatLawyer = (e) => {
    e.preventDefault()

    let cleanDot = profile.name.replace(/\./g, "")
    let nameUrl = cleanDot.replace(/\s+/g, '-')

    navigate(`/lawyer/${profile.id}/chat/${nameUrl}`)
  }

  const RenderSpeciality = () => {
    if(profile.profile.length > 0) {
      const specializations = profile.profile[0].specialization;
      const specializationNames = specializations.map(spec => spec.specialization.name);
      const specializationString = specializationNames.join(", ");

      return (
        <div>
          <h2 className="text-[#7D8797] text-base text-center">{specializationString}</h2>
        </div>
      );
    }
  }

  return (
    <>
      {contextHolder}
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
                  <h2 className="text-black text-xl text-center font-semibold">{(profile.name !== undefined) | (profile.name !== '') ? profile.name : ''}</h2>
                  <RenderSpeciality />
                </div>
              </div>
              <div className="lawyer-profile-info-detail">
                <div className="flex flex-col items-center py-2">
                  <div className="w-full py-4 border-b border-[#EEEEEE]">
                    <label
                      className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                      htmlFor="fullname"
                    >
                      Email
                    </label>
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={(profile.email !== undefined) | (profile.email !== '') ? profile.email : ''}
                      disabled={true}
                    />
                  </div>
                  <div className="w-full py-4 border-b border-[#EEEEEE]">
                    <label
                      className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                      htmlFor="fullname"
                    >
                      KTPA Number
                    </label>
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={(profile.profile.length > 0) ? profile.profile[0].STRNumber : ''}
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
                      value={(profile.profile.length > 0) ? ((profile.profile[0].experience === '') || (profile.profile[0].experience === null) ? '10 Years For Law Specialization' : profile.profile.experience )  : ''}
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
      {loading && 
        <div className="absolute inset-0 flex justify-center items-center z-[9999] bg-gray-400 bg-opacity-75">
          <Spin size="large" />
        </div>
      }
    </>
  )
}

export default LawyerProfile