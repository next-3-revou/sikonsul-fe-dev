/* eslint-disable react/prop-types */
// import React from 'react'
import moment from 'moment'
import { ListNews } from '../../../component'

const News = ({datas}) => {
  const handleNewsClick = (articleUrl) => {
    window.open(articleUrl, '_blank');
  };

  return (
    <div className="content-section">
      <div className="content-title pb-6">
        <h2 className='text-black text-left text-xl font-semibold'>News</h2>
      </div>
      {datas.length > 0 &&
        datas.map((data, index) => {
          return (
            <ListNews key={index} title={data.title} date={moment(data.publishedAt).format("YYYY-MM-DD")} onClick={()=>handleNewsClick(data.url)} />
          )
        })
      }
    </div>
  )
}

export default News