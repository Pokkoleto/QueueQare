import "../App.css";
import {
  Button,
  Table,
  Input,
  Space,
  Modal,
  Form,
  Popconfirm,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import {
  addDepartment,
  delDepartment,
  getDepartments,
} from "../services/department.service";
import Column from "antd/es/table/Column";

let data = [];
let editId = null;
const info = (username, password) => {
  Modal.info({
    title: "จดรหัสผ่าน!",
    content: (
      <div>
        <p>
          รหัสจะขึ้นเพียงครั้งเดียว กรุณาจดรหัสนี้ไว้
          และสามารถไปเปลี่ยนรหัสผ่านได้ที่ บัญชีผู้ใช้
        </p>
        <h5>{`username   :   ${username}`}</h5>
        <h5>{`password   :   ${password}`}</h5>
      </div>
    ),
    onOk() {},
  });
};

const HospitalBody1 = () => {
  const [showData, setShowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(1);
  const [form] = Form.useForm();
  const handleAdd = (e, departmentId) => {
    console.log(e);
    e.departmentId = departmentId;
    addDepartment(e).then((res) => {
      console.log(res);
      setUpdate(update + 1);
      form.resetFields();
      setOpen(false);
      info(res.username, res.password);
    });
  };
  const handleDelete = (key) => {
    console.log(key);
    delDepartment(key).then((res) => {
      console.log(res);
      setUpdate(update + 1);
    });
  };
  useEffect(() => {
    getDepartments().then((res) => {
      data = [];
      res.map((item) => {
        data.push({
          key: item.departmentId,
          departmentName: item.departmentName,
          departmentName2: item.departmentName2,
          no: item.id,
          floor: item.floor,
          member: item.member,
        });
      });
      console.log(data);
      setShowData(data);
    });
  }, [update]);
  return (
    <div>
      <Input.Search
        placeholder="ค้นหาแผนก"
        className="mb-4"
        onChange={(value) => {
          console.log(data);
          setShowData(
            data.filter((item) => {
              return (
                item.departmentName
                  .toLowerCase()
                  .includes(value.target.value.toLowerCase()) ||
                item.departmentName2
                  .toLowerCase()
                  .includes(value.target.value.toLowerCase())
              );
            })
          );
        }}
      />
      <Button type="primary" className="mb-4" onClick={() => setOpen(true)}>
        เพิ่มแผนก
      </Button>
      <Modal
        title="สร้างแผนกใหม่"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[]}
        width={1000}
        forceRender
      >
        <Form
          form={form}
          name="wrap"
          labelCol={{
            flex: "110px",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            maxWidth: 800,
          }}
          onFinish={(e) => {
            handleAdd(e, editId);
          }}
        >
          <Form.Item
            label="ชื่อแผนก"
            name="departmentName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ชื่อแผนก (ภาษาอังกฤษ)"
            name="departmentName2"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ชั้น"
            name="floor"
            rules={[
              {
                type: "number",
                min: 0,
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table dataSource={showData}>
        <Column
          title="ชื่อแผนก"
          dataIndex="departmentName"
          key="departmentName"
          on
        />
        <Column title="" dataIndex="departmentName2" key="departmentName2" />
        <Column title="ชั้น" dataIndex="floor" key="floor" />
        <Column title="จำนวนแพทย์" dataIndex="member" key="member" />
        <Column
          title="การจัดการ"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a
                onClick={() => {
                  form.setFieldsValue({
                    departmentName: record.departmentName,
                    departmentName2: record.departmentName2,
                    floor: record.floor,
                  });
                  setOpen(true);
                  editId = record.key;
                }}
              >
                แก้ไข {record.lastName}
              </a>
              <Popconfirm
                title="แน่ใจที่จะลบหรือไม่"
                onConfirm={() => handleDelete(record.key)}
              >
                <a>ลบ</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default HospitalBody1;
