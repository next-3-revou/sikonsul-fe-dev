import { useNavigate } from 'react-router-dom';
import {News, Sliders, TopRatedLawyer, Users} from "../../component"
import Master from "../../layout/master"
import axios from "axios";
import { Spin, message } from 'antd';
import { useEffect, useState, useCallback } from 'react';

const URL_NEWS = import.meta.env.VITE_BE_ENDPOINT_NEWS

const Dashboard = () => {
  const navigate = useNavigate()

  const [load, setLoad] = useState(false)
  const [data, setData] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

  const getNew = useCallback(async () => {
    try {
      setLoad(true)
      const res = await axios.get(`${URL_NEWS}`)
      if(res.status === 200) {
        setLoad(false)
        setData(res.data)
      }
    } catch (error) {
      setLoad(false)
      messageApi.open({
        type: 'error',
        content: error.message,
      })
    }
  }, [])

  useEffect(() => {
    getNew()
  }, [getNew])  
  

  const lawyerProfile = e => {
    e.preventDefault()
    navigate('/lawyer/profile')
  }

  const lawyerCategory = e => { 
    e.preventDefault()
    navigate('/lawyer/category')
  }


  return (
    <>
      {contextHolder}
      <Master type={"navbar"}>
        <div className="content px-4 overflow-y-auto h-full">
          <Users name={"Kekeyi"} job={"Backend Engineer"}/>
          <Sliders onCLick={e => lawyerCategory(e)} />
          <TopRatedLawyer onClick={e => lawyerProfile(e)} />
          <News datas={data} />
        </div>
      </Master>
      {load && 
        <div className="absolute inset-0 flex justify-center items-center z-[9999] bg-gray-400 bg-opacity-75">
          <Spin size="large" />
        </div>
      }
    </>

  )
}

export default Dashboard