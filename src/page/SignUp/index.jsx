// import React from 'react'

import { useFormik } from "formik";
import * as yup from "yup";
import Master from "../../layout/master";
import { Buttons } from "../../component";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../layout/breadcrumb";
import axios from "axios";
import { useState } from "react";
import { Spin, message } from "antd";

const URL_AUTH = import.meta.env.VITE_BE_ENDPOINT_AUTH;

const SignUp = () => {
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const initialValues = {
    name: "",
    email: "",
    NIK: "",
    occupation: "",
    password: "",
  };

  const onPrev = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const validationSchema = yup.object({
    name: yup.string().required("This field required"),
    email: yup
      .string()
      .required("This field required")
      .email("Invalid format email"),
    NIK: yup
      .string()
      .required("This field required")
      .min(16)
      .max(16)
      .matches(/^[0-9]+$/, "Must be only number"),
    occupation: yup.string().required("This field required"),
    password: yup
      .string()
      .required("This field required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const handleSignUp = async (values) => {
    try {
      setLoad(true);
      const res = await axios.post(`${URL_AUTH}/register`, values);
      if (res.status === 200) {
        setLoad(false);
        messageApi.open({
          type: "success",
          content: "Success Register",
        });

        setTimeout(() => {
          navigate("/signin", { replace: true });
        }, "2000");
      }
    } catch (error) {
      setLoad(false);
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  const formMik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSignUp,
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const handleChangeAndTouch = (field) => (e) => {
    const { value } = e.target;
    formMik.setFieldValue(field, value);
    formMik.setFieldTouched(field, true, false);
  };

  return (
    <>
      {contextHolder}
      <Master>
        <div className="content flex flex-col px-4">
          <Breadcrumb title={"Signup Account"} onClick={(e) => onPrev(e)} />
          <div className="content-form mt-48">
            <form onSubmit={formMik.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  value={formMik.values.name || ""}
                  onChange={handleChangeAndTouch("name")}
                />
                {formMik.errors.name && formMik.touched.name && (
                  <p className="text-red-500 text-base text-left italic">
                    {formMik.errors.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={formMik.values.email || ""}
                  onChange={handleChangeAndTouch("email")}
                />
                {formMik.errors.email && formMik.touched.email && (
                  <p className="text-red-500 text-base text-left italic">
                    {formMik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                  htmlFor="NIK"
                >
                  NIK
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="NIK"
                  type="text"
                  value={formMik.values.NIK || ""}
                  onChange={handleChangeAndTouch("NIK")}
                />
                {formMik.errors.NIK && formMik.touched.NIK && (
                  <p className="text-red-500 text-base text-left italic">
                    {formMik.errors.NIK}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                  htmlFor="occupation"
                >
                  Occupation
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="occupation"
                  type="text"
                  value={formMik.values.occupation || ""}
                  onChange={handleChangeAndTouch("occupation")}
                />
                {formMik.errors.occupation && formMik.touched.occupation && (
                  <p className="text-red-500 text-base text-left italic">
                    {formMik.errors.occupation}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={formMik.values.password || ""}
                  onChange={handleChangeAndTouch("password")}
                />
                {formMik.errors.password && formMik.touched.password && (
                  <p className="text-red-500 text-base text-left italic">
                    {formMik.errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Buttons
                  title={"Sign Up"}
                  width={"w-full"}
                  height={"h-12"}
                  gap={"my-2"}
                  tipe={"active"}
                />
              </div>
            </form>
          </div>
        </div>
      </Master>
      {load && (
        <div className="absolute inset-0 flex justify-center items-center z-[9999] bg-gray-400 bg-opacity-75">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default SignUp;
