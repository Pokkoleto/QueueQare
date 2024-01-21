import "../App.css";
import {
  Button,
  Table,
  Input,
  Space,
  Modal,
  Form,
  Popconfirm,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import Column from "antd/es/table/Column";
import { delUser, getDoctor, register } from "../services/user.service";
import { getDepartments } from "../services/department.service";
let data = [];
let department = [];
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

const HospitalBody2 = () => {
  const [showData, setShowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(1);
  const [form] = Form.useForm();
  const handleAdd = (e, userId) => {
    e.userId = userId;
    e.role = "doctor";
    console.log(e);
    register(e).then((res) => {
      console.log(res);
      setUpdate(update + 1);
      form.resetFields();
      setOpen(false);
      info(res.username, res.password);
    });
  };
  const handleDelete = (key) => {
    console.log(key);
    delUser(key).then((res) => {
      console.log(res);
      setUpdate(update + 1);
    });
  };
  useEffect(() => {
    getDepartments().then((res) => {
      department = [];
      res.map((item) => {
        department.push({
          value: item.departmentId,
          label: item.departmentName,
        });
      });
      console.log(department);
    });
    getDoctor().then((res) => {
      data = [];
      res.map((item) => {
        data.push({
          key: item.userId,
          name: item.name,
          name2: item.name2,
          departmentId: item.departmentId,
          departmentName: department.find((e) => e.value === item.departmentId)
            .label,
        });
      });
      console.log(data);
      setShowData(data);
    });
  }, [update]);
  const [isSelect, setIsSelect] = useState(false);
  return (
    <div>
      <Input.Search
        placeholder="ค้นหาแพทย์"
        className="mb-4"
        onChange={(value) => {
          console.log(data);
          setShowData(
            data.filter((item) => {
              return (
                item.name
                  .toLowerCase()
                  .includes(value.target.value.toLowerCase()) ||
                item.name2
                  .toLowerCase()
                  .includes(value.target.value.toLowerCase())
              );
            })
          );
        }}
      />
      <Button type="primary" className="mb-4" onClick={() => setOpen(true)}>
        เพิ่มแพทย์
      </Button>
      <Modal
        title="เพิ่มแพทย์"
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
            label="ชื่อ-นามสกุล"
            name="name"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อ นามสกุล",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ชื่อ-นามสกุล (ภาษาอังกฤษ)"
            name="name2"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อ นามสกุล",
              },
              {
                pattern: new RegExp(/^[a-zA-Z]* [a-zA-Z]*$/),
                message: "กรุณากรอกตามนี้(Firstname Lastname)",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="แผนก"
            name="departmentId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              className="ml-2"
              showSearch
              style={{ width: 200 }}
              placeholder="เลือกแผนกส่งต่อ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={department}
              onSelect={() => {
                setIsSelect(true);
              }}
            />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit" disabled={!isSelect}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table dataSource={showData}>
        <Column title="ชื่อนามสกุล" dataIndex="name" key="name" on />
        <Column title="" dataIndex="name2" key="name2" on />
        <Column title="แผนก" dataIndex="departmentName" key="departmentName" />
        <Column
          title="การจัดการ"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a
                onClick={() => {
                  form.setFieldsValue({
                    name: record.name,
                    name2: record.name2,
                    departmentId: record.departmentId,
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

export default HospitalBody2;
