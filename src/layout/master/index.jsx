/* eslint-disable react/prop-types */

import Navbar from '../navbar'
import Notifications from '../notification'
import './styles.css'

const Master = ({children, type, isNotif, textNotif, bgNotif}) => {
  return (
    <>
		<main className="bg-gray-200">
				<section
						// className="relative mx-auto flex h-[100dvh] w-full max-w-[425px] flex-1 flex-col bg-white"
						className={`relative mx-auto flex h-[100dvh] w-full max-w-[425px] flex-1 flex-col ${type === 'front' ? 'bg-images' : 'bg-white'} `}						
						style={{ opacity: 1, transform: "none" }}
				>
					<section className="flex h-full flex-col">
						<div className={`container flex h-full flex-col pb-8 pt-6`}>
							<div className={`flex h-full flex-col ${type === 'front' ? 'justify-end' : ''}`}>
								{ isNotif &&
									<Notifications textNotif={textNotif} bgColor={bgNotif} animate={isNotif}/>
								}
								{children}
								{type === 'navbar' &&
									<Navbar />
								}
							</div>
						</div>
					</section>
			</section>
		</main>
    </>
  )
}

export default Master