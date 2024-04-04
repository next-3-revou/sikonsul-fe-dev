import React from 'react'
import { ListNews } from '../../../component'

const News = ({data}) => {
  return (
    <div className="content-section">
      <div className="content-title pb-6">
        <h2 className='text-black text-left text-xl font-semibold'>News</h2>
      </div>
      <ListNews title={"Mengenal Probono dan Manfaatnya"} date={"today"} />
      <ListNews title={"Langkah hukum ketika di PHK massal"} date={"today"} />
      <ListNews title={"Peran MK dalam gugat sengketa"} date={"today"} />
    </div>
  )
}

export default News