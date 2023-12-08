import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const navigator = useNavigate();

  return (
    <div>
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
              onClick={() => {
                navigator("/doctor");
              }}
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
