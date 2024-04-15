import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {News, Sliders, TopRatedLawyer, Users} from "../../component"
import Master from "../../layout/master"
import axios from "axios";
import { Spin, message, Modal } from 'antd';
import { clearData } from '../../util/LocalStorage';


const URL_NEWS = import.meta.env.VITE_BE_ENDPOINT_NEWS
const URL_USERS = import.meta.env.VITE_BE_ENDPOINT_USERS
const URL_SPECIAL = import.meta.env.VITE_BE_ENDPOINT_SPECIAL

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profiles.profile);

  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false)
  const [data, setData] = useState([])
  const [dataSpecial, setDataSpecial] = useState([])
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

  const getSpecial = useCallback(async () => {
    try {
      setLoad(true)
      const res = await axios.get(`${URL_SPECIAL}`)
      if(res.status === 200) {
        setLoad(false)
        setDataSpecial(res.data.data.specializations)
      }
    } catch (error) {
      setLoad(false)
      messageApi.open({
        type: 'error',
        content: error.message,
      })
    }
  }, [])

  const checkGlobalStates = useCallback( async () => {
    if(profile.id === null || profile.id === '') {
      const tokens = JSON.parse(localStorage.getItem('accessToken'));
      try {
        const res = await axios.get(`${URL_USERS}/profile`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
            'Content-Type': 'application/json',
          }
        })
        if(res.status === 200) {
          setLoad(false)
          dispatch({type: 'ADD_PROFILE', payload: res.data.data})
        }
      } catch (error) {
        setLoad(false)
        setOpen(true)
      }
    }
  }, [])

  useEffect(() => { 
    getSpecial()
  }, [])

  useEffect(() => { 
    checkGlobalStates()
  }, [])

  useEffect(() => {
    getNew()
  }, [getNew])  
  

  const lawyerProfile = e => {
    e.preventDefault()
    navigate('/lawyer/profile')
  }

  const lawyerCategory = (catId) => { 
    navigate(`/lawyer/category/${catId}`)
  }

  const handleOk = () => {
    setOpen(false);
    clearData('accessToken')
    clearData('userId')
    dispatch({type: 'CLEAR_TOKEN'})
  }

  const handleCancel = () => {
    setOpen(false);
    clearData('accessToken')
    clearData('userId')
    dispatch({type: 'CLEAR_TOKEN'})
  }


  return (
    <>
      {contextHolder}
      <Master type={"navbar"}>
        <div className="content px-4 overflow-y-auto h-full">
          <Users name={profile.name} job={"Backend Engineer"}/>
          <Sliders dataSpecials={dataSpecial} onCLick={(id) => lawyerCategory(id)} />
          <TopRatedLawyer onClick={e => lawyerProfile(e)} />
          <News datas={data} />
        </div>
      </Master>
      <Modal
        title={"Session Expired"}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >

        <h2>Session Expired. Please Login</h2>
      </Modal>

      {load && 
        <div className="absolute inset-0 flex justify-center items-center z-[9999] bg-gray-400 bg-opacity-75">
          <Spin size="large" />
        </div>
      }
    </>

  )
}

export default Dashboard