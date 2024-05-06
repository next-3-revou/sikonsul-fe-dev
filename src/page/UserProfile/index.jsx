import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Modal, message } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import Master from "../../layout/master";
import { ListProfiles } from "../../component";
import { clearData } from "../../util/LocalStorage";
import axios from "axios";

const URL_USERS = import.meta.env.VITE_BE_ENDPOINT_USERS;
const URL_UPLOAD_PROFILE_PICTURE = import.meta.env
  .VITE_BE_ENDPOINT_UPLOAD_PROFILE_PICTURE;

const UserProfile = () => {
  const profile = useSelector((state) => state.profiles.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    clearData("accessToken");
    clearData("userId");

    messageApi.open({
      type: "success",
      content: "Success SignOut",
    });

    setTimeout(() => {
      dispatch({ type: "CLEAR_TOKEN" });
      dispatch({ type: "CLEAR_PROFILE" });
      dispatch({ type: "CLEAR_PROFILE_LAWYER" });
      navigate("/", { replace: true });
    }, "2000");
  };

  const userPremium = async (e) => {
    e.preventDefault();
    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    try {
      const res = await axios.put(
        `${URL_USERS}/premium`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        dispatch({ type: "ADD_PROFILE", payload: res.data.data });
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const uploadProfilePicture = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const tokens = JSON.parse(localStorage.getItem("accessToken"));
      const res = await axios.post(`${URL_UPLOAD_PROFILE_PICTURE}`, formData, {
        headers: {
          Authorization: `Bearer ${tokens}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: "UPDATE_PROFILE_PICTURE",
          payload: res.data.imageUrl,
        });
        message.success("Profile picture uploaded successfully");
        setVisible(false);
      }
    } catch (error) {
      message.error("Error uploading profile picture");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadProfilePicture(file);
    }
  };

  return (
    <>
      {contextHolder}
      <Master type={"navbar"}>
        <div className="content h-full px-4">
          <div className="lawyer-profile-wrapper h-full pt-6">
            <div className="lawyer-profile-info flex flex-col h-full">
              <div className="lawyer-profile-info-detail-avatar items-center flex flex-col">
                <Avatar
                  size={145}
                  src={profile.profilePictureUrl}
                  icon={<UserOutlined />}
                  onError={() => {
                    return <UserOutlined />;
                  }}
                />
                <Button
                  shape="circle"
                  icon={<CameraOutlined />}
                  size="medium"
                  onClick={showModal}
                  style={{ marginTop: "-20px", marginBottom: "10px" }}
                />
              </div>
              <Modal
                title="Upload Profile Picture"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                  >
                    Upload
                  </Button>,
                ]}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Modal>
              <div>
                <div className="lawyer-profile-info-detail-identity">
                  <h2 className="text-black text-xl text-center font-semibold">
                    {profile.name}
                  </h2>
                  <h2 className="text-[#7D8797] text-base text-center">
                    {profile.occupation}
                  </h2>
                </div>
              </div>
              <div className="lawyer-profile-info-detail my-10">
                <div className="flex flex-col items-center py-2">
                  <div className="w-full py-4 border-b border-[#EEEEEE]">
                    <label
                      className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                      htmlFor="nik"
                    >
                      NIK
                    </label>
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={profile.nik}
                      disabled={true}
                    />
                  </div>
                  <div className="w-full py-4 border-b border-[#EEEEEE]">
                    <label
                      className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                      htmlFor="fullname"
                    >
                      Full Name
                    </label>
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={profile.name}
                      disabled={true}
                    />
                  </div>
                  <div className="w-full py-4 border-b border-[#EEEEEE]">
                    <label
                      className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                      htmlFor="job"
                    >
                      Job
                    </label>
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={profile.occupation}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <ListProfiles
                isPremium={profile.isPremium}
                titleOut={"Signout"}
                titlePremium={"Go Premium"}
                onCLickLogout={(e) => logout(e)}
                onClickPre={(e) => userPremium(e)}
              />
            </div>
          </div>
        </div>
      </Master>
    </>
  );
};

export default UserProfile;
