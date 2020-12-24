import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import {
  AppstoreOutlined,
  PieChartOutlined,
  MailOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./SideMenu.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/////////////////// Page Components ////////////////
import ProductList from "./ProductList";
import prepareHeaders from "./utilities/csvHeaderToTableHeader";
import NewOrder from "./NewOrder";
import TobeShipped from "./TobeShipped";
import Repo from "./repository/repository";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

function getLastActiveState() {
  var selectedOption = localStorage.getItem("SelectedOption") || "overview";
  return {
    selectedOption: selectedOption,
  };
}

function setSelectedOption(option) {
  localStorage.setItem("SelectedOption", option);
  console.log("save active option " + localStorage.getItem("SelectedOption"));
}

 async function increment(repo) {
              let productsArray = [];
              let docs = await repo.products.incrementSmall("ceO2r7lZbNJZTy5P3F13");
}

function SideMenu() {
  // restore to previously selected active tab upon refresh
  var activeDefaultSelectedKeys = [];
  activeDefaultSelectedKeys[0] = getLastActiveState().selectedOption;
  console.log(activeDefaultSelectedKeys);

  // Declare a new state variable, which we'll call "count"
   const [repo, setRepo] = useState(new Repo("AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0", "fir-7b423.firebaseapp.com", "fir-7b423"));
  const [collapsed, setSiderCollapse] = useState(false);
  var [products, setProducts] = useState([]);
  const toggle = () => {
    setSiderCollapse(!collapsed);
  };

  // Similar to componentDidMount and componentDidUpdate:

   useEffect(() => {
    // Create an scoped async function in the hook
    async function loadProducts() {
      let productsArray = [];
      let docs = await repo.products.getAll();
      docs.forEach(function(doc){
        productsArray.push(doc.data());
      });
      console.log(docs);
      setProducts(productsArray);
    }
    // Execute the created function directly
    loadProducts();
  }, []);
  
  return (
    <Router>
      <Layout style={{ backgroundColor: "#fff" }}>
        <Sider
          style={{ width: 300, height: "100vh", backgroundColor: "#fff" }}
          collapsible
          collapsed={collapsed}
          trigger={null}
        >

          <Button type="primary" onClick = {() => {
             increment(repo);
          }}>Click To Increment</Button>

          <Menu
            style={{ width: "100%", height: "100%" }}   
            defaultSelectedKeys={activeDefaultSelectedKeys}
            defaultOpenKeys={["sub1", "sub2", "sub3"]}
            mode="inline"
          >
            <Menu.Item
              key="overview"
              icon={<PieChartOutlined />}
              onClick={() => setSelectedOption("overview")}
            >
              <Link to="/Overview">
                <span>Overview</span>
              </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="库存">
              <Menu.Item key="1" onClick={() => setSelectedOption("1")}>
                <Link to="/Inventory">
                  <span>多伦多现货</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="出单">
              <Menu.Item key="2" onClick={() => setSelectedOption("2")}>
                <Link to="/NewOrder">
                  <span>生成订单</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3" onClick={() => setSelectedOption("3")}>
                <Link to="/TobeShipped">
                  <span>待邮寄</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4" onClick={() => setSelectedOption("4")}>
                <Link to="/InTransit">
                  <span>在途</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5" onClick={() => setSelectedOption("5")}>
                <Link to="/Finished">
                  <span>完成</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6" onClick={() => setSelectedOption("6")}>
                <Link to="/Postage">
                  <span>邮资记录</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="入库">
              <Menu.Item key="7" onClick={() => setSelectedOption("7")}>
                <Link to="/Air">
                  <span>空运</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="8" onClick={() => setSelectedOption("8")}>
                <Link to="/Sea">
                  <span>海运</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Layout>
          <Header style={{ padding: 0, backgroundColor: "#fff" }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            style={{
              minHeight: "90vh",
              backgroundColor: "#fff",
              padding: "0px 24px 0px 24px",
            }}
          >
            <Switch>
              <Route path="/" component={Overview}>
                <Route path="/Overview" component={Overview}></Route>
                <Route path="/Inventory" component={() => Inventory(products)}></Route>
                <Route path="/NewOrder" component={NewOrder}></Route>
                <Route path="/TobeShipped" component={TobeShipped}></Route>
                <Route path="/InTransit" component={InTransit}></Route>
                <Route path="/Finished" component={Finished}></Route>
                <Route path="/Postage" component={Postage}></Route>
                <Route path="/Air" component={Air}></Route>
                <Route path="/Sea" component={Sea}></Route>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

function Overview() {
  return (
    <div>
      <h2>Overview</h2>
    </div>
  );
}

function Inventory(products) {
  // filter on the whole inventory table
  // by status: in stock, air, sea
  // select "in stock" items now
  return (
    <div>
      <ProductList
        products={products}
        columns={prepareHeaders([
          "S",
          "M",
          "L",
        ])}
      />
    </div>
  );
}

function InTransit() {
  return (
    <div>
      <h2>InTransit</h2>
    </div>
  );
}

function Finished() {
  return (
    <div>
      <h2>Finished</h2>
    </div>
  );
}

function Postage() {
  return (
    <div>
      <h2>Postage</h2>
    </div>
  );
}

function Air() {
  return (
    <div>
      <h2>Air</h2>
    </div>
  );
}

function Sea() {
  return (
    <div>
      <h2>Sea</h2>
    </div>
  );
}

export default SideMenu;
