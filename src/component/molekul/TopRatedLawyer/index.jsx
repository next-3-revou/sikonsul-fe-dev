/* eslint-disable react/prop-types */
// import React from 'react'
import { ListLawyer } from '../../../component';

const TopRatedLawyer = ({ dataLawyers, onClick}) => {

  dataLawyers.sort((a, b) => b.rating - a.rating);
  let sliceLawyer = dataLawyers.slice(0, 3);

  return (
    <div className="content-section">
      <div className="content-title pb-6">
        <h2 className='text-black text-left text-lg font-semibold'>Top Rated Lawyer</h2>
      </div>
      {sliceLawyer.length > 0 &&
        sliceLawyer.map((lawyer, index) => {
          return (
            <ListLawyer key={index} name={lawyer.name} profileLawyer={lawyer.profile} speciality={lawyer.speciality} rating={lawyer.rating} onClick={() => onClick(lawyer.id)} />
          )
        })
      }
    </div>
  )
}

export default TopRatedLawyer