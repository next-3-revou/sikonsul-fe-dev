import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Master from '../../layout/master'
import Breadcrumb from "../../layout/breadcrumb";
import { ListCategoryLawyer } from '../../component';
import axios from "axios";
import { Spin, message, Modal } from 'antd';

const URL_LAWYERS = import.meta.env.VITE_BE_ENDPOINT_LAWYERS


const CategoryLawyer = () => {
  
  let { catID } = useParams();
  const navigate = useNavigate()
  const profile = useSelector(state => state.profiles.profile);

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])

  useEffect(() => {
    getCategoryLawyer()
  }, [])

  const getCategoryLawyer = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${URL_LAWYERS}/${catID}`)
      if(res.status === 200 ){
        setLoading(false)
        setData(res.data.data.lawyers)
      }
    } catch (error) {
      setLoading(false)
      messageApi.open({
        type: 'error',
        content: error.message,
      })
    }
  }, [])
  

  const onPrev = e => {
    e.preventDefault()
    navigate(-1)
  }

  const chatLawyer = (idLawyers, isPremium, lawyerName) => {
    const userStatus = false
    let cleanDot = lawyerName.replace(/\./g, "")
    let nameUrl = cleanDot.replace(/\s+/g, '-')

    if(isPremium && userStatus === true){
      navigate(`/lawyer/${idLawyers}/chat/${nameUrl}`)
    } else if(isPremium && userStatus === false) {
      setOpen(true)
    } else if(isPremium === false && userStatus === false) {
      navigate(`/lawyer/${idLawyers}/chat/${nameUrl}`)
    } else if(isPremium === false && userStatus === true) {
      navigate(`/lawyer/${idLawyers}/chat/${nameUrl}`)
    }
    
  }

  const handleOk = () => {
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }


  return (
    <>
      {contextHolder}
      <Master>
        <div className="content px-4 overflow-y-auto">
          <Breadcrumb title={"Pilih Lawyer"} onClick={e => onPrev(e)} type={"category"} />
          <div className="content-wrapper py-12 overflow-y-auto">
            { data.map((cur, id) => {
              return (
                <ListCategoryLawyer key={id} idLawyer={cur.id} name={cur.name} userStatus={profile.isPremium} isPremium={cur.isPremium} onClick={(id, premiStatus) => chatLawyer(id, premiStatus, cur.name)} />
              )
            })
              
            }
          </div>
        </div>
      </Master>
      { open &&
        <Modal
          title={"PREMIUM"}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >

        <h2>Unlock this lawyer with a premium account upgrade.</h2>
      </Modal>

      }
      
      {loading && 
        <div className="absolute inset-0 flex justify-center items-center z-[9999] bg-gray-400 bg-opacity-75">
          <Spin size="large" />
        </div>
      }
    </>
  )
}

export default CategoryLawyer