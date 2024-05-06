/* eslint-disable react/prop-types */
// import React from 'react'
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Users = (data) => {
  const { name, job, profilePictureUrl } = data;
  return (
    <div className="content-section">
      <div className="users-section flex">
        <div className="avatar-image">
          <Avatar
            size={52}
            src={profilePictureUrl}
            icon={<UserOutlined />}
            onError={() => {
              return <UserOutlined />;
            }}
          />
        </div>
        <div className="avatar-caption px-2">
          <h2 className="text-black text-xl text-left font-semibold">{name}</h2>
          <h2 className="text-[#7D8797] text-base text-left">{job}</h2>
        </div>
      </div>
    </div>
  );
};

export default Users;
