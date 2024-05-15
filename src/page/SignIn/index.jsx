import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Master from "../../layout/master";
import { Buttons } from "../../component";
import Breadcrumb from "../../layout/breadcrumb";
import axios from "axios";
import { Spin, message } from "antd";
import { storeData } from "../../util/LocalStorage";
import { Avatar } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const URL_AUTH = import.meta.env.VITE_BE_ENDPOINT_AUTH;

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);

  const onPrev = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onShowPW = () => {
    setVisible(!visible);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("This field required")
      .email("Invalid format email"),
    password: yup
      .string()
      .required("This field required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const handleLogin = async (values) => {
    try {
      setLoad(true);
      const res = await axios.post(`${URL_AUTH}/login`, values);
      if (res.status === 200) {
        setLoad(false);
        dispatch({ type: "ADD_TOKEN", payload: res.data.data });
        storeData("accessToken", res.data.data.token);
        storeData("userId", res.data.data.userId);
        messageApi.open({
          type: "success",
          content: "Success Login",
        });

        setTimeout(() => {
          navigate("/", { replace: true });
        }, "2000");
      } else {
        setLoad(false);
        messageApi.open({
          type: "error",
          content: "Failed Login",
        });
      }
    } catch (error) {
      setLoad(false);
      messageApi.open({
        type: "error",
        content: error.response.data.error,
      });
    }
  };

  const formMik = useFormik({
    initialValues,
    onSubmit: handleLogin,
    validationSchema,
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
          <Breadcrumb
            title={"Sign in and Start Consultation"}
            onClick={(e) => onPrev(e)}
          />
          <div className="content-form mt-48">
            <form onSubmit={formMik.handleSubmit}>
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
              <div className="mb-6">
                <label
                  className="block text-[#7D8797] text-lg font-normal mb-2 text-left"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="pw-section flex items-center">
                  <div className="pw-input flex-1">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type={visible ? "text" : "password"}
                      value={formMik.values.password || ""}
                      onChange={handleChangeAndTouch("password")}
                    />
                  </div>
                  <div
                    className="pw-icons flex-none -ml-8"
                    onClick={() => onShowPW()}
                  >
                    <Avatar
                      size={25}
                      icon={
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                    />
                  </div>
                </div>

                {formMik.errors.password && formMik.touched.password && (
                  <p className="text-red-500 text-base text-left italic">
                    {formMik.errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Buttons
                  title={"Sign In"}
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

export default SignIn;
