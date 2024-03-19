import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { login } from "../services/user.service";
const Login = () => {
  const navigator = useNavigate();
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      login(values)
        .then((res) => {
          if (res.status === 200) {
            if (res.user.role === "doctor") {
              localStorage.setItem("user", JSON.stringify(res.user));
              localStorage.setItem("token", res.token);
              navigator("/doctor");
            } else if (res.user.role === "department") {
              localStorage.setItem("user", JSON.stringify(res.user));
              localStorage.setItem("token", res.token);
              navigator("/department");
            } else if (res.user.role === "admin") {
              localStorage.setItem("user", JSON.stringify(res.user));
              localStorage.setItem("token", res.token);
              navigator("/hospital-manage");
            }
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }, 1000);
  };
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 96,
            }}
            spin
          />
        }
        fullscreen
      />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-center py-4 text-50 text-primry-dark">
          <p>QueueQare</p>
        </div>
        <Form
          name="normal_login"
          className="login-form w-2/5"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
