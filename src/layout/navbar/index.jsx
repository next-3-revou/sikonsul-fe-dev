import { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import {
  HomeOutlined,
	MessageOutlined,
	UserOutlined
} from '@ant-design/icons';
// import Buttons from "../../atom/Button"

const Navbar = () => {
	const navigate = useNavigate()
	const location = useLocation()

  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

	const Home = (e) => { 
		e.preventDefault();
		navigate('/')
	}

	const Message = (e) => {
		e.preventDefault();
		navigate('/message')
	}

	const profilePage = (e) => {
		e.preventDefault();
		navigate('/profile')
	}


	return (
    <>
		<div className="fixed inset-x-0 bottom-0 z-10 mx-auto flex min-h-[72px] max-w-[425px] items-center bg-[#112340] p-4 notched">
			<div className="flex w-full justify-evenly items-end ">
				<div className="menus px-2 flex flex-col items-center cursor-pointer" onClick={e => Home(e)}>
					<HomeOutlined style={{ fontSize: '26px'}} className={url === '/' ? 'menu-active' : ''} />
					<h2 className={url === '/' ? 'menu-active' : 'text-white'} >Home</h2>
				</div>
				<div className="menus px-2 flex flex-col items-center cursor-pointer" onClick={e => Message(e)}>
					<MessageOutlined style={{ fontSize: '26px'}} className={url === '/message' ? 'menu-active' : ''} />
					<h2 className={url === '/message' ? 'menu-active' : 'text-white'}>Message</h2>
				</div>
				<div className="menus px-2 flex flex-col items-center cursor-pointer" onClick={e => profilePage(e)}>
					<UserOutlined style={{ fontSize: '26px'}} className={url === '/profile' ? 'menu-active' : ''}/>
					<h2 className={url === '/profile' ? 'menu-active' : 'text-white'}>Profile</h2>
				</div>
			</div>
		</div>
    </>

	)
}

export default Navbar