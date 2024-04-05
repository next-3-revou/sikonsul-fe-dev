import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {PrivateRoutes, PublicRoutes} from './route'
import './App.css'

function App() {
  const tokenizer = useSelector(state => state.tokens.tokenizer);
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('accessToken'));
    if(items) {
      setStatus(true) 
    } else if(tokenizer === undefined ) {
      setStatus(false)
    }
  }, [tokenizer])

  return (
    <Routes>
    {
      status
           ? <Route path="/*" element={<PrivateRoutes />} />
           : <Route path="/*" element={<PublicRoutes />} />
    }
    </Routes>
  )
}

export default App
