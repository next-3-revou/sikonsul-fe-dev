/* eslint-disable react/prop-types */
// import React from 'react'
import { ListNews } from '../../../component'

const News = ({datas}) => {
  console.log(datas)
  return (
    <div className="content-section">
      <div className="content-title pb-6">
        <h2 className='text-black text-left text-xl font-semibold'>News</h2>
      </div>
      {datas.length > 0 &&
        datas.map((data, index) => { 
          return (
            <ListNews key={index} title={data.title} date={data.publishedAt} />
          )
        })
        

      }
      {/* <ListNews title={"Mengenal Probono dan Manfaatnya"} date={"today"} />
      <ListNews title={"Langkah hukum ketika di PHK massal"} date={"today"} />
      <ListNews title={"Peran MK dalam gugat sengketa"} date={"today"} /> */}
    </div>
  )
}

export default News