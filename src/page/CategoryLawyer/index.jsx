// import React from 'react'
import { useNavigate } from 'react-router-dom';
import Master from '../../layout/master'
import Breadcrumb from "../../layout/breadcrumb";
import { ListCategoryLawyer } from '../../component';


const CategoryLawyer = () => {
  let lawyerId = 'abcde';
  const navigate = useNavigate()

  const onPrev = e => {
    e.preventDefault()
    navigate(-1)
  }

  const chatLawyer = () => {
    console.log('tes mchat')
    navigate(`/lawyer/${lawyerId}/chat`)
  }


  return (
    <Master>
      <div className="content px-4">
        <Breadcrumb title={"Pilih Lawyer"} onClick={e => onPrev(e)} type={"category"} />
        <div className="content-wrapper py-12">
          <ListCategoryLawyer name={'John Doe'} speciality={"Hukum, Bisnis"} onClick={() => chatLawyer()}/>
          <ListCategoryLawyer name={'Jane Doe'} speciality={"Hukum, Bisnis"} onClick={() => chatLawyer()} />
          <ListCategoryLawyer name={'Angel Tania'} speciality={"Hukum, Property"} onClick={() => chatLawyer()} />
        </div>
      </div>
    </Master>
  )
}

export default CategoryLawyer