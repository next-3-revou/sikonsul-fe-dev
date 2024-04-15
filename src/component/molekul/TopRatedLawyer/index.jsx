/* eslint-disable react/prop-types */
// import React from 'react'
import { ListLawyer } from '../../../component';

const TopRatedLawyer = ({ dataLawyers, onClick}) => {

  let sliceLawyer = dataLawyers.slice(0, 3);

  return (
    <div className="content-section">
      <div className="content-title pb-6">
        <h2 className='text-black text-left text-lg font-semibold'>Top Rated Lawyer</h2>
      </div>
      {sliceLawyer.length > 0 &&
        sliceLawyer.map((lawyer, index) => {
          return (
            <ListLawyer key={index} name={lawyer.name} profileLawyer={lawyer.profile} speciality={lawyer.speciality} rate={lawyer.rate} onClick={() => onClick(lawyer.id)} />
          )
        })
      }
    </div>
  )
}

export default TopRatedLawyer