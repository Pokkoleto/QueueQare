import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Descriptions, Layout, Menu, Select, Spin, Table } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Column from "antd/es/table/Column";
import { Col, Container, Row } from "reactstrap";
import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  getDepartmentById,
  getDepartments,
} from "../services/department.service";
import { getQueueByDepartmentId, move } from "../services/queue.service";
import { getUserById, logout } from "../services/user.service";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("ตรวจคนไข้", "1", <PieChartOutlined />),
  getItem("บัญชีผู้ใช้", "2", <UserOutlined />),
];
let data = [];
let department = [];

export const Body1 = () => {
  const [showdata, setShowdata] = useState([]);
  const [update, setUpdate] = useState(0);
  const [user, setUser] = useState();
  const [check, setCheck] = useState();
  const [selectDepartmentId, setSelectDepartmentId] = useState();
  const [selectValue, setSelectValue] = useState();
  const [loading, setLoading] = useState(false);
  const handdleMove = () => {
    setLoading(true);
    setTimeout(() => {
      move({
        departmentId: user.departmentId,
        newDepartmentId: selectDepartmentId,
        queueNumber: check,
      }).then(() => {
        setUpdate(update + 1);
      });
      setIsSelect(false);
      setSelectValue(null);
      setCheck("-");
      setLoading(false);
      setUpdate(update + 1);
    }, 1000);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    getQueueByDepartmentId(user.departmentId).then((res) => {
      data = [];
      res.map((item) => {
        data.push({
          no: item.queueNumber,
          tel: item.tel,
        });
      });
      setShowdata(data);
    });
    getDepartments().then((res) => {
      department = [];
      res.map((item) => {
        department.push({
          value: item.departmentId,
          label: item.departmentName,
        });
      });
    });
    let interval = setInterval(
      () =>
        getUserById(user.userId).then((res) => {
          setCheck(res.check);
        }),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [update]);
  const [isSelect, setIsSelect] = useState(false);
  return (
    <Container fluid>
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
      <Row>
        <Col>
          <Table
            className="shadow-md"
            dataSource={showdata}
            pagination={{
              defaultPageSize: 13,
              showSizeChanger: false,
            }}
          >
            <Column title="หมายเลขคิว" dataIndex="no" key="no" />
            <Column title="เบอร์โทรศัพท์" dataIndex="tel" key="tel" />
          </Table>
        </Col>
        <Col>
          <Row className="h-3/4 box-container-med">
            <Col className="h-100 d-flex flex-column">
              <Row className="flex text-center">
                <h2>กำลังตรวจ</h2>
              </Row>
              <Row className="mt-4">
                <h4>{`หมายเลขคิว : ${
                  check == 0 || check == undefined ? "-" : check
                }`}</h4>
                <div className="flex items-center">
                  <h4>ส่งต่อไปที่ : </h4>
                  <Select
                    value={selectValue}
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
                    onSelect={(value) => {
                      setSelectValue(value);
                      setIsSelect(true);
                      setSelectDepartmentId(value);
                    }}
                  />
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="h-1/4">
            <Col className="pt-3" style={{ paddingLeft: 0, paddingRight: 12 }}>
              <Button
                disabled={!isSelect}
                type="primary"
                className="h-100 w-100"
                onClick={handdleMove}
              >
                <h1>ส่งต่อ</h1>
              </Button>
            </Col>
            <Col className="pt-3" style={{ paddingLeft: 12, paddingRight: 0 }}>
              <Row className="h-100 pb-1">
                <Button
                  type="primary"
                  style={{
                    background: "#04AA6D",
                    borderColor: "green",
                  }}
                  className="h-100 w-100"
                >
                  <h1>ส่งไปที่แผนกการเงิน</h1>
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export const Body2 = () => {
  const [user, setUser] = useState();
  const [department, setDepartment] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }

    getDepartmentById(user.departmentId).then((res) => {
      setDepartment(res.departmentName);
    });
  }, []);
  const navigator = useNavigate();
  const items = [
    {
      key: "1",
      label: "UserName",
      children: user?.username ?? "",
    },
    {
      key: "2",
      label: "",
      children: "",
    },
    {
      key: "3",
      label: "ชื่อ - นามสกุล",
      children: user?.name2 ?? "",
    },
    {
      key: "4",
      label: "แผนก",
      children: department ?? "",
    },
  ];
  return (
    <div>
      <Col className="p-4">
        <Row>
          <Descriptions
            title="ข้อมูลผู้ใช้"
            size="default"
            column={2}
            items={items}
          />
        </Row>
        <Row>
          <a href="">
            เปลียนรหัสผ่าน <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>
          </a>
        </Row>
        <Row className="mt-4 justify-center">
          <Button
            style={{ width: 150 }}
            danger
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              logout(user.userId);
              navigator("/login");
            }}
          >
            Logout
          </Button>
        </Row>
      </Col>
    </div>
  );
};

const Doctor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [departmentName, setDepartmentName] = useState("");
  const [user, setUser] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    getDepartmentById(user.departmentId).then((res) => {
      setDepartmentName(res.departmentName);
    });
  }, []);
  return (
    <div>
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
              setSelectedKey(item.key);
            }}
          />
        </Sider>
        <Layout>
          <Header className="h-18 items-center flex bg-white shadow-md">
            <h1 className="text-primry-dark">{`แผนก ${departmentName}`}</h1>
          </Header>
          <Content
            style={{
              margin: "16px",
            }}
          >
            {selectedKey == 1 && <Body1 />}
            {selectedKey == 2 && <Body2 />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Doctor;
