import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Master from "../../layout/master";
import { ListMessages } from "../../component";
import { useNavigate } from 'react-router-dom';
import { DB } from "../../config";
import { ref, onValue } from "firebase/database";
import { message, Input } from "antd";

const Messages = () => {
  const navigate = useNavigate();
  const profile = useSelector(state => state.profiles.profile);
  const userId = profile.id;

  const [messages, setMessages] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const urlMessages = `messages/${userId}`;
    const refMessages = ref(DB, urlMessages);

    const fetchMessages = () => {
      onValue(refMessages, async (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const dataSnapshot = data;
          const AllDataChat = [];

          Object.keys(dataSnapshot).forEach(item => {
            const dataChat = dataSnapshot[item];
            const newDataChat = [];

            Object.keys(dataChat).forEach(key => {
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

          AllDataChat.sort((a, b) => b.data[0].data - a.data[0].data);
          setMessages(AllDataChat);
        } else {
          messageApi.open({
            type: 'error',
            content: 'No Messages',
          });
        }
      });
    };

    fetchMessages();

    const fetchLawyers = async () => {
      try {
        const response = await fetch('https://sikonsul.up.railway.app/api/lawyer');
        const data = await response.json();
        setLawyers(data.data.lawyers);
      } catch (error) {
        console.error('Failed to fetch lawyers:', error);
      }
    };

    fetchLawyers();
  }, [userId, messageApi]);

  const chatLawyer = (e, idLawyer, lawyerName) => {
    e.preventDefault();
    let nameUrl = lawyerName.replace(/\s+/g, '-');
    navigate(`/lawyer/${idLawyer}/chat/${nameUrl}`);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    if (query) {
      setSearching(true);
      const filtered = lawyers.filter(lawyer => 
        lawyer.name.toLowerCase().includes(query)
      );
      setFilteredLawyers(filtered);
    } else {
      setSearching(false);
      setFilteredLawyers([]);
    }
  };

  return (
    <>
      {contextHolder}
      <Master type={"navbar"}>
        <div className="content px-4">
          <div className="content-title pt-4 pb-2">
            <h2 className="text-black text-left text-2xl">Messages</h2>
          </div>
          <Input 
            placeholder="Search for lawyers..." 
            onChange={handleSearch} 
            style={{ marginBottom: 20 }}
          />
          {searching ? (
            filteredLawyers.length > 0 ? (
              filteredLawyers.map((lawyer, key) => (
                <ListMessages 
                  key={key} 
                  title={lawyer.name} 
                  specialization={lawyer.specialization} 
                  onClick={(e) => chatLawyer(e, lawyer.id, lawyer.name)} 
                />
              ))
            ) : (
              <div className="warning py-5">
                <h2 className="text-black text-xl">No Lawyers Found</h2>
              </div>
            )
          ) : (
            messages.length > 0 ? (
              messages.map((cur, key) => (
                <ListMessages 
                  key={key} 
                  title={cur.data[2].data} 
                  specialization={cur.data[1].data} 
                  onClick={(e) => chatLawyer(e, cur.data[5].data, cur.data[2].data)} 
                />
              ))
            ) : (
              <div className="warning py-5">
                <h2 className="text-black text-xl">No Messages</h2>
              </div>
            )
          )}
        </div>
      </Master>
    </>
  );
};

export default Messages;
