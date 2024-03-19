import { Button, Form, Input, Modal, QRCode } from "antd";
import { Row } from "reactstrap";
import { addQueue } from "../services/queue.service";

const url = "http://10.31.55.104:5173/";

const info = (res) => {
  Modal.info({
    title: "สแกน QR Code เพื่อเข้าใช้งาน",
    content: (
      <div>
        <h5>{`หมายเลขคิว   :   ${res.queueNumber}`}</h5>
        <QRCode value={url + res.token || "-"} />
      </div>
    ),
    onOk() {},
  });
};

const AddQueue = () => {
  const [form] = Form.useForm();
  const handdleAdd = (e) => {
    console.log(e);
    addQueue(e).then((res) => {
      info(res);
      form.resetFields();
    });
  };
  return (
    <Row className="flex h-screen  justify-center items-center px-96">
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={(e) => {
          handdleAdd(e);
        }}
        autoComplete="off"
      >
        <Form.Item
          label="เบอร์โทรศัพท์"
          name="tel"
          rules={[
            {
              pattern: new RegExp(/^[+,0-9]\d+$/),
              message: "กรุณากรอกเบอร์โทรศัพท์",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <Button className="h-24" type="primary" onClick={handdleAdd}>
        <h1>Add Queue</h1>
      </Button> */}
    </Row>
  );
};

export default AddQueue;
