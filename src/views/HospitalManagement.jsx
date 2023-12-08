import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  Table,
  Input,
  Space,
  Modal,
  Form,
  Popconfirm,
  QRCode,
  Select,
} from "antd";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { faBuilding, faMap } from "@fortawesome/free-regular-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const { Column } = Table;
const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: `แผนก ${i}`,
    name2: `department ${i}`,
    no: i,
    floor: (i % 3) + 1,
    number: 0,
  });
}

const data2 = [];
for (let i = 0; i < 20; i++) {
  data2.push({
    key: i,
    name: `แพทย์ ${i}`,
    name2: `department ${i % 3}`,
    no: i,
    floor: (i % 3) + 1,
    number: 0,
  });
}

const items = [
  getItem("แผนก", "1", <FontAwesomeIcon icon={faBuilding} />),
  getItem("บุคลากร", "2", <UserOutlined />),
  getItem("การนำทาง", "3", <FontAwesomeIcon icon={faMap} />),
];

export const Body1 = () => {
  const [showData, setShowData] = useState(data);
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    console.log("add");
  };
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
  };
  return (
    <div>
      <Input.Search
        placeholder="ค้นหาแผนก"
        className="mb-4"
        onChange={(value) => {
          console.log(value.target.value);
          setShowData(
            data.filter((item) => item.name.includes(value.target.value))
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
      >
        <Form
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
        >
          <Form.Item
            label="ชื่อแผนก"
            name="ชื่อแผนก"
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
            name="ชื่อแผนก (ภาษาอังกฤษ)"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={showData}>
        <Column title="ชื่อแผนก" dataIndex="name" key="name" on />
        <Column title="" dataIndex="name2" key="name2" />
        <Column title="ชั้น" dataIndex="floor" key="floor" />
        <Column title="จำนวนแพทย์" dataIndex="number" key="number" />
        <Column
          title="การจัดการ"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>แก้ไข {record.lastName}</a>
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

export const Body2 = () => {
  const [showData2, setShowData2] = useState(data2);
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    console.log("add");
  };
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
  };
  const [isSelect, setIsSelect] = useState(false);
  return (
    <div>
      <Input.Search
        placeholder="ค้นหาแพทย์"
        className="mb-4"
        onChange={(value) => {
          console.log(value.target.value);
          setShowData2(
            data2.filter((item) => item.name.includes(value.target.value))
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
      >
        <Form
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
        >
          <Form.Item
            label="ชื่อ-นามสกุล"
            name="ชื่อ-นามสกุล"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ชื่อ-นามสกุล (ภาษาอังกฤษ)"
            name="ชื่อแผนก (ภาษาอังกฤษ)"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="แผนก"
            name="แผนก"
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
              options={[
                {
                  value: "1",
                  label: "แผนกที่ 1",
                },
                {
                  value: "2",
                  label: "แผนกที่ 2",
                },
                {
                  value: "3",
                  label: "แผนกที่ 3",
                },
                {
                  value: "4",
                  label: "แผนกที่ 4",
                },
                {
                  value: "5",
                  label: "แผนกที่ 5",
                },
                {
                  value: "6",
                  label: "แผนกที่ 6",
                },
              ]}
              onSelect={(value) => {
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
      <Table dataSource={showData2}>
        <Column title="ชื่อนามสกุล" dataIndex="name" key="name" on />
        <Column title="แผนก" dataIndex="name2" key="name2" />
        <Column title="ชั้น" dataIndex="floor" key="floor" />
        <Column title="จำนวนแพทย์" dataIndex="number" key="number" />
        <Column
          title="การจัดการ"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>แก้ไข {record.lastName}</a>
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

export const Body3 = () => {
  const [text, setText] = React.useState("");
  return (
    <div>
      <Space direction="vertical" align="center">
        <QRCode value={text || "-"} />
        <Input
          placeholder="-"
          maxLength={60}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Space>
    </div>
  );
};

const HospitalManagement = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        className="bg-white"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={(item) => {
            console.log(item.key);
            setSelectedKey(item.key);
          }}
        />
      </Sider>
      <Layout>
        <Header className="h-18 items-center flex bg-white shadow-md">
          <h1 className="text-primry-dark">จัดการโรงพยาบาล</h1>
        </Header>
        <Content
          className="px-4 pt-4 pb-4"
          style={{
            margin: "16px",
          }}
        >
          {selectedKey == 1 && <Body1 />}
          {selectedKey == 2 && <Body2 />}
          {selectedKey == 3 && <Body3 />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HospitalManagement;
