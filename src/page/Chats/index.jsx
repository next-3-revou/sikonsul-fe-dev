import { useEffect, useState, useRef } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { DB } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Master from "../../layout/master";
import { Button, message, Modal, Rate } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "./styles.css";
import Breadcrumb from "../../layout/breadcrumb";
import { chatDate, chatTime } from "../../util/DateTime";
import { ListChats } from "../../component";
import axios from "axios";

const Chats = () => {
  const URL_RATING = import.meta.env.VITE_BE_ENDPOINT_RATING;
  const tokens = JSON.parse(localStorage.getItem("accessToken"));
  let { lawyerId, lawyerName } = useParams();
  const navigate = useNavigate();
  const profileUser = useSelector((state) => state.profiles.profile);

  const userId = JSON.parse(localStorage.getItem("userId"));
  let cleanLawyerName = lawyerName.replace(/-/g, " ");

  const [messageApi, contextHolder] = message.useMessage();
  const [chatContent, setChatContent] = useState("");
  const [chats, setChats] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0.2); // Durasi sesi dalam menit
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [modalCancelled, setModalCancelled] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
    return <div ref={elementRef} />;
  };

  const handleRatingChange = async (value) => {
    setRating(value);
    setHasRated(true);
    message.success(`You rated ${value} stars`);
  
    const postData = {
      lawyerId: parseInt(lawyerId), 
      rating: value,
    };
    try {
      const response = await axios.post(`${URL_RATING}`,postData,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens}`,
        },
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  useEffect(() => {
    const chatIds = `${userId}_${lawyerId}`;
    const urlChatting = `chatting/${chatIds}/allChat`;
    const refChatting = ref(DB, urlChatting);
    if (mounted) {
      onValue(refChatting, async (snapshot) => {
        const data = snapshot.val();

        const dataSnapshot = data;
        const AllDataChat = [];

        if (data !== null) {
          Object.keys(dataSnapshot).map((item) => {
            const dataChat = dataSnapshot[item];
            const newDataChat = [];

            Object.keys(dataChat).map((key) => {
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
      });
    }
  });

  useEffect(() => {
    const chatIds = `${userId}_${lawyerId}`;
    const sessionsRef = ref(DB, `chatting/${chatIds}/sessions`);

    onValue(sessionsRef, (snapshot) => {
      const sessionsData = snapshot.val();
      if (sessionsData) {
        const latestSessionId = Object.keys(sessionsData).pop();
        const latestSessionData = sessionsData[latestSessionId];
        setSessionStartTime(latestSessionData.sessionStartTime);
        setSessionDuration(latestSessionData.sessionDuration);
        setIsSessionActive(true);
      } else {
        setIsSessionActive(false);
      }
    });
  }, [userId, lawyerId]);

  useEffect(() => {
    if (sessionStartTime) {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - sessionStartTime) / 1000; // Waktu dalam detik
        const remainingTime = Math.max(0, sessionDuration * 60 - elapsedTime); // Sisa waktu dalam detik, minimum 0

        setRemainingTime(remainingTime);

        if (remainingTime === 0) {
          clearInterval(timer);
          setIsSessionActive(false);
          setShowRatingModal(true);
        } else if (remainingTime <= 5 && !modalCancelled) {
          setShowExtendModal(true);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [sessionStartTime, sessionDuration, modalCancelled]);

  const startChatSession = () => {
    const currentTime = Date.now();
    const chatIds = `${userId}_${lawyerId}`;
    const sessionId = push(ref(DB, `chatting/${chatIds}/sessions`)).key;
    const sessionRef = ref(DB, `chatting/${chatIds}/sessions/${sessionId}`);

    set(sessionRef, {
      sessionStartTime: currentTime,
      sessionDuration: sessionDuration,
    })
      .then(() => {
        setSessionStartTime(currentTime);
        setIsSessionActive(true);
        setModalCancelled(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const extendChatSession = () => {
    const currentTime = Date.now();
    const chatIds = `${userId}_${lawyerId}`;
    const sessionId = push(ref(DB, `chatting/${chatIds}/sessions`)).key;
    const sessionRef = ref(DB, `chatting/${chatIds}/sessions/${sessionId}`);

    set(sessionRef, {
      sessionStartTime: currentTime,
      sessionDuration: sessionDuration + 1, // Tambahkan 1 menit ke durasi sesi
    })
      .then(() => {
        setSessionStartTime(currentTime);
        setSessionDuration(sessionDuration + 1);
        setIsSessionActive(true);
        setShowExtendModal(false);
        setModalCancelled(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelExtendModal = () => {
    setShowExtendModal(false);
    setModalCancelled(true);
  };

  const sendChats = (e) => {
    e.preventDefault();
    setMounted(true);

    const today = new Date();
    const chatIds = `${userId}_${lawyerId}`;

    const urlChatting = `chatting/${chatIds}/allChat/${chatDate(today)}`;
    const urlMessagesUser = `messages/${userId}/${chatIds}`;
    const urlMessagesLawyer = `messages/${lawyerId}/${chatIds}`;

    const refChatting = ref(DB, urlChatting);

    const data = {
      sendBy: userId,
      chatDate: today.getTime(),
      chatTime: chatTime(today),
      chatContent: chatContent,
    };

    const dataHistoryChatUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: lawyerId,
      uidSender: userId,
      senderName: profileUser.name,
      partnerName: cleanLawyerName,
      status: true,
    };

    const dataHistoryChatLawyer = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: userId,
      uidSender: lawyerId,
      senderName: cleanLawyerName,
      partnerName: profileUser.name,
      status: true,
    };

    try {
      push(refChatting, data)
        .then(() => {
          set(ref(DB, urlMessagesUser), dataHistoryChatUser);
          set(ref(DB, urlMessagesLawyer), dataHistoryChatLawyer);
          setChatContent("");
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content: err.message,
          });
        });
    } catch (error) {
      setMounted(false);
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      if (chatContent.length <= 0) {
        messageApi.open({
          type: "error",
          content: `Message can't be blank`,
        });
      } else {
        sendChats(e);
      }
    }
  };

  const onPrev = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      {contextHolder}
      <Master>
        <div className="content h-full px-4">
          <Breadcrumb
            type={"chat"}
            title={cleanLawyerName}
            onClick={(e) => onPrev(e)}
          />
          <div className="session-info flex justify-end items-center mb-4">
            <div
              className={`session-time ${
                remainingTime <= 5 ? "text-red-500" : "text-green-500"
              }`}
            >
              {formatTime(remainingTime)}
            </div>
          </div>
          <div className="chat-wrapper h-[calc(100%-32px)]">
            <div className="chat-elem h-[calc(100%-32px)] flex flex-col justify-between">
              <div className="chat-content h-full mt-4 overflow-y-auto">
                {chats.map((cur, parentKey) => (
                  <div key={parentKey}>
                    <h6 className="text-center my-4 text-gray-500 dark:text-gray-300">
                      {cur.date}
                    </h6>
                    {cur.data.map((current, childKey) =>
                      current.data.sendBy == userId ? (
                        <ListChats
                          key={childKey}
                          chatContent={current.data.chatContent}
                          chatDate={current.data.chatDate}
                          type="isMe"
                          profilePictureUrl={profileUser.profilePictureUrl}
                        />
                      ) : (
                        <ListChats
                          key={childKey}
                          chatContent={current.data.chatContent}
                          chatDate={current.data.chatDate}
                          type="isLawyer"
                        />
                      )
                    )}
                  </div>
                ))}
                <AlwaysScrollToBottom />
              </div>
              <div className="chat-input flex flex-col justify-around">
                {!isSessionActive && (
                  <div className="start-session-btn mb-4">
                    <Button type="primary" onClick={startChatSession} block>
                      Start Chat Session
                    </Button>
                  </div>
                )}
                {isSessionActive && (
                  <div className="extend-session-btn mb-4">
                    <Button type="default" onClick={extendChatSession} block>
                      Extend Session
                    </Button>
                  </div>
                )}
                <div className="input-area flex justify-around">
                  <div className="chats-area flex-grow mr-2">
                    <textarea
                      placeholder="Type your message"
                      value={chatContent}
                      onChange={(e) => setChatContent(e.target.value)}
                      onKeyDown={(e) => onEnterPress(e)}
                      rows={1}
                      className="resize-none rounded-md text-black overflow-hidden w-full"
                      disabled={!isSessionActive}
                    ></textarea>
                  </div>
                  <div className="chat-btn">
                    {isSessionActive && chatContent.length <= 0 && (
                      <Button
                        type="primary"
                        icon={<SendOutlined />}
                        className="w-12 h-10"
                        onClick={(e) => sendChats(e)}
                        disabled
                      />
                    )}
                    {isSessionActive && chatContent.length > 0 && (
                      <Button
                        type="primary"
                        icon={<SendOutlined />}
                        className="w-12 h-10"
                        onClick={(e) => sendChats(e)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            title="Session Ended"
            open={showRatingModal}
            footer={null}
            onCancel={() => setShowRatingModal(false)}
          >
            <p>
              Your chat session has ended. Please start a new session to
              continue chatting.
            </p>
            <div className="rating-section mt-2">
              <h3>Rate Your Chat Experience</h3>
              <Rate onChange={handleRatingChange} value={rating} />
            </div>
          </Modal>
        </div>
      </Master>
    </>
  );
};

export default Chats;
