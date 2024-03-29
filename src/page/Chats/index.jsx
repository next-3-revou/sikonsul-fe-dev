/* eslint-disable react/jsx-key */
// import React from 'react'
import { 
  useEffect, 
  useState 
} from "react";
import {
  ref,
  onValue,
  push,
  set
} from "firebase/database";
import { DB } from "../../config";
import { useNavigate, useParams } from 'react-router-dom';
import Master from "../../layout/master"
import { Button } from 'antd';
import { EnterOutlined } from '@ant-design/icons';
import './styles.css'
import Breadcrumb from "../../layout/breadcrumb";
import { chatDate, chatTime } from "../../util/DateTime";
import {ListChats} from '../../component'

const Chats = () => {
  let { lawyerId } = useParams();
  let userId = 'abcd';
  const navigate = useNavigate()

  const [chatContent, setChatContent] = useState("");
  const [chats, setChats] = useState([]);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    
    const chatIds = `${userId}_${lawyerId}`;  
    const urlChatting = `chatting/${chatIds}/allChat`;
    const refChatting = ref(DB, urlChatting);
    if(mounted) {
      onValue(refChatting, async (snapshot) => {
        const data = snapshot.val();

        const dataSnapshot = data;
        const AllDataChat = [];

        if(data !== null) { 
          Object.keys(dataSnapshot).map(item => {
            const dataChat = dataSnapshot[item];
            const newDataChat = [];
  
            Object.keys(dataChat).map(key => {
              newDataChat.push({
                id: key,
                data: dataChat[key],
              });
            });
            AllDataChat.push({
              date: item,
              data: newDataChat,
            });
          });
  
          setChats(AllDataChat);
          setMounted(false);
        }
      })
    }
  })

  const sendChats = (e) => {
    e.preventDefault()
    setMounted(true);

    const today = new Date()
    const chatIds = `${userId}_${lawyerId}`

    const urlChatting = `chatting/${chatIds}/allChat/${chatDate(today)}`
    const urlMessagesUser = `messages/${userId}/${chatIds}`
    const urlMessagesLawyer = `messages/${lawyerId}/${chatIds}`
    
    const refChatting = ref(DB, urlChatting);

    const data = {
      sendBy: userId,
      chatDate: today.getTime(),
      chatTime: chatTime(today),
      chatContent: chatContent,
    }

    const dataHistoryChatUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: lawyerId,
      uidSender: userId,
      senderName: userId,
      partnerName: 'tes lawyer',
      status: true
    };

    const dataHistoryChatLawyer = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: userId,
      uidSender: lawyerId,
      senderName: 'tes lawyer',
      partnerName: userId,
      status: true
    };

    try {
      push(refChatting, data)
      .then(() => {
        set(ref(DB, urlMessagesUser ), dataHistoryChatUser)
        set(ref(DB, urlMessagesLawyer ), dataHistoryChatLawyer)
        setChatContent('');
        
      })
      .catch(err => {
        console.log(err)
      });
    } catch (error) {
      setMounted(false);
    }
  }
  

  const onPrev = e => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <Master>
      <div className="content h-full px-4">
        <Breadcrumb type={"chat"} title={"Tes"} onClick={e => onPrev(e)}/>
        <div className="chat-wrapper h-full">
          <div className="chat-elem h-full flex flex-col justify-between">
            <div className="chat-content h-full mt-4 overflow-y-auto">
              {chats.map((cur, parentKey) => (
                <div key={parentKey}>
                  <h6 className="text-center my-4 text-gray-500 dark:text-gray-300">
                    {cur.date}
                  </h6>
                  {cur.data.map((current, childKey) =>
                    current.data.sendBy == userId ? (
                     
                      <ListChats key={childKey} chatContent={current.data.chatContent} chatDate={current.data.chatDate} type="isMe"/>
                    ) : (
                      <ListChats key={childKey} chatContent={current.data.chatContent} chatDate={current.data.chatDate} type="isLawyer"/> 
                    )
                  )}
                </div>
              ))}

            </div>
            <div className="chat-input flex justify-around">
              <div className="chats-area">
                <textarea 
                  placeholder="Type your message"
                  value={chatContent}
                  onChange={(e) => setChatContent(e.target.value)}
                  rows={1} 
                  cols={40}
                  className="resize-none rounded-md text-black overflow-hidden"
                >
                </textarea>
              </div>
              <div className="chat-btn mb-4">
                <Button type="primary" icon={<EnterOutlined />} className="w-12 h-10" onClick={(e) => sendChats(e)} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </Master>
  )
}

export default Chats