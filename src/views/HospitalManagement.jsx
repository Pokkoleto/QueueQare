import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Table, Input, Space, Modal, Form } from "antd";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
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

const items = [
  getItem("แผนก", "1", <FontAwesomeIcon icon={faBuilding} />),
  getItem("บุคลากร", "2", <UserOutlined />),
];

const HospitalManagement = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    console.log("add");
  };
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
          {/* {selectedKey == 1 && <Body1 />} */}
          <Input.Search placeholder="ค้นหาแผนก" className="mb-4" />
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
          <Table dataSource={data}>
            <Column title="Name" dataIndex="name" key="name" on />
            <Column title="" dataIndex="name2" key="name2" />
            <Column title="ชั้น" dataIndex="floor" key="floor" />
            <Column title="จำนวนแพทย์" dataIndex="number" key="number" />
            <Column
              title="การจัดการ"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <a>Edit {record.lastName}</a>
                  <a>Delete</a>
                </Space>
              )}
            />
          </Table>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HospitalManagement;
