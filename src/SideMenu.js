import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import {
  AppstoreOutlined,
  PieChartOutlined,
  MailOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CheckOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./SideMenu.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/////////////////// Page Components ////////////////
import Overview from "./Overview";
import ProductList from "./ProductList";
import prepareHeaders from "./utilities/csvHeaderToTableHeader";
import NewOrder from "./NewOrder";
import Air from "./Air";
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
  const [repo, setRepo] = useState(
    new Repo(
      "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
      "fir-7b423.firebaseapp.com",
      "fir-7b423"
    )
  );
  const [collapsed, setSiderCollapse] = useState(false);
  var [products, setProducts] = useState([]);
  var [orders, setOrders] = useState([]);

  // Cart status
  var [cartProducts, setCartProducts] = useState([]);
  const appendToCartProducts = (newOrder) => {
    setCartProducts([...cartProducts, newOrder]);
  };

  // trigger refetch on data, and rerender all data display
  // when approriate -> refresh is toggled
  // refresh in useEffect dependency list, change of refresh -> trigger useEffect
  // -> refetch data -> change products + orders state
  // state change -> trigger rerender on data display
  var [refresh, setRefresh] = useState(false);

  // toggle sider collapse and uncollapse
  const toggle = () => {
    setSiderCollapse(!collapsed);
  };

  // Similar to componentDidMount and componentDidUpdate:

  useEffect(() => {
    // unset refresh flag
    setRefresh(false);
    console.log("useEffect retrigger " + refresh);
    // Create an scoped async function in the hook
    async function loadProducts() {
      let productsArray = [];
      let ordersArray = [];

      let productsDocs = await repo.products.getAll();
      productsDocs.forEach(function (productsDocs) {
        // add product entry ID (key) to the data field
        // this allow easier update product entry
        let productsData = productsDocs.data();
        productsData["ID"] = productsDocs.id;
        productsArray.push(productsData);
      });

      // tests for the new tree level view, not yet working, in development
      // let productsAll = await repo.products.getAllProducts();

      let ordersDocs = await repo.orders.getAll();
      ordersDocs.forEach(function (ordersDocs) {
        // add entry ID (key) to the data field
        // this allows easier update to existing order
        let orderData = ordersDocs.data();
        orderData["ID"] = ordersDocs.id;
        ordersArray.push(orderData);
      });

      // console.log(productsDocs);
      setProducts(productsArray);
      // console.log(ordersDocs);
      setOrders(ordersArray);

      // // print tobeshipped orders
      // for (var i = 0; i < orders.length; i++) {
      //   if (orders[i]["Tracking"] == "") console.log(orders[i]);
      // }
    }
    // Execute the created function directly
    loadProducts();
  }, [refresh]);

  return (
    <Router>
      <Layout style={{ backgroundColor: "#fff" }}>
        <Sider
          style={{ width: 300, height: "100vh", backgroundColor: "#fff" }}
          collapsible
          collapsed={collapsed}
          // trigger={null}
          onCollapse={() => {
            setSiderCollapse(!collapsed);
          }}
        >
          {/* <Button
            type="primary"
            onClick={() => {
              increment(repo);
            }}
          >
            Click To Increment
          </Button> */}

          <Menu
            style={{ width: "100%", height: "90%" }}
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
              <Menu.Item
                key="1"
                onClick={() => {
                  setSelectedOption("1");
                  setRefresh(true);
                }}
              >
                <Link to="/Inventory">
                  <span>多伦多现货</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="出单">
              <Menu.Item
                key="2"
                onClick={() => {
                  setSelectedOption("2");
                  setRefresh(true);
                }}
              >
                <Link to="/NewOrder">
                  <span>生成订单</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  setSelectedOption("3");
                  setRefresh(true);
                }}
              >
                <Link to="/TobeShipped">
                  <span>待邮寄</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  setSelectedOption("4");
                  setRefresh(true);
                }}
              >
                <Link to="/InTransit">
                  <span>在途</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={() => {
                  setSelectedOption("5");
                  setRefresh(true);
                }}
              >
                <Link to="/Finished">
                  <span>完成</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="6"
                onClick={() => {
                  setSelectedOption("6");
                  setRefresh(true);
                }}
              >
                <Link to="/Postage">
                  <span>邮资记录</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="入库">
              <Menu.Item
                key="7"
                onClick={() => {
                  setSelectedOption("7");
                  setRefresh(true);
                }}
              >
                <Link to="/Air">
                  <span>单件录入</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="8"
                onClick={() => {
                  setSelectedOption("8");
                  setRefresh(true);
                }}
              >
                <Link to="/Sea">
                  <span>海空运</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Layout>
          <Header
            style={{
              padding: 0,
              backgroundColor: "#fff",
              // maxHeight: "50px",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <Menu
              style={{ float: "right" }}
              onClick={() => {}}
              mode="horizontal"
            >
              <SubMenu
                key="SubMenu"
                icon={<ShoppingCartOutlined />}
                title="Cart"
              >
                {cartProducts.map(
                  (singleOrder) => (
                    // singleOrder[1] is product ID
                    <Menu.ItemGroup title={singleOrder[0]}>
                      <Menu.Item style={{ color: "#e37373" }}>
                        <a>
                          <span style={{ color: "black" }}>
                            {singleOrder[2]}
                          </span>
                          <Button
                            danger
                            style={{ float: "right", marginTop: "8px" }}
                            size="small"
                            onClick={() => {
                              // cartProducts.remove(singleOrder);
                              cartProducts.splice(
                                cartProducts.indexOf(singleOrder),
                                1
                              );
                              // trigger refresh to rerender cart
                              setRefresh(true);
                            }}
                          >
                            Remove
                          </Button>
                        </a>
                      </Menu.Item>
                    </Menu.ItemGroup>
                  )
                  // To debug above cart submenu generation
                  // {
                  //   console.log(cartProducts);
                  // }
                )}
              </SubMenu>
            </Menu>
          </Header>
          <Content
            style={{
              minHeight: "90vh",
              backgroundColor: "#fff",
              padding: "5px 0px 0px 0px",
            }}
          >
            <Switch>
              <Route path="/" component={Overview}>
                <Route path="/Overview" component={Overview}></Route>
                <Route
                  path="/Inventory"
                  component={() =>
                    Inventory(products, setRefresh, appendToCartProducts)
                  }
                ></Route>
                <Route
                  path="/NewOrder"
                  component={() => NewOrder(setRefresh, cartProducts, setCartProducts)}
                ></Route>
                <Route
                  path="/TobeShipped"
                  component={() => TobeShipped(orders, setRefresh)}
                ></Route>
                <Route
                  path="/InTransit"
                  component={() => InTransit(orders, setRefresh)}
                ></Route>
                <Route
                  path="/Finished"
                  component={() => Finished(orders, setRefresh)}
                ></Route>
                <Route path="/Postage" component={Postage}></Route>
                <Route
                  path="/Air"
                  component={() => Air(products, setRefresh)}
                ></Route>
                <Route path="/Sea" component={Sea}></Route>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

function Inventory(products, setRefresh, appendToCartProducts) {
  // filter on the whole inventory table
  // by status: in stock, air, sea
  // select "in stock" items now

  let type = "inventory";

  // populate 10% discount CAD, full price RMB and 10% discount RMB
  // fetch for the latest currency exchange rate
  var exchangeRate = 5.07;
  // fetch("http://rate-exchange-1.appspot.com/currency?from=CAD&to=CNY")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // exchangeRateJson = data;
  //     console.log(data);
  //   });
  // console.log(exchangeRateJson);

  for (var i = 0; i < products.length; i++) {
    var priceCAD = parseInt(products[i]["CAD"]);
    var priceRMB = priceCAD * exchangeRate;
    products[i]["10%"] = (priceCAD * 0.9).toFixed(2);
    products[i]["RMB"] = priceRMB.toFixed(2);
    products[i]["九折"] = (priceRMB * 0.9).toFixed(2);
  }

  return (
    <div>
      <ProductList
        products={products}
        columns={prepareHeaders([
          "Name",
          "S",
          "M",
          "L",
          "F",
          "CAD",
          "10%",
          "RMB",
          "九折",
        ])}
        listType={type}
        appendToCartProducts={appendToCartProducts}
      />
    </div>
  );
}

function TobeShipped(orders, setRefresh) {
  let type = "toBeShipped";
  let notShippedOrders = [];

  for (var i = 0; i < orders.length; i++) {
    if (orders[i]["Tracking"] == "")
      // not shipped, display in TobeShipped
      notShippedOrders.push(orders[i]);
  }

  return (
    <div>
      <ProductList
        products={notShippedOrders}
        columns={prepareHeaders([
          "姓名",
          "微信号",
          "地址",
          "寄送",
          "日期",
          "加急",
          "礼物",
        ])}
        listType={type}
        sideMenuSetRefresh={setRefresh}
      />
    </div>
  );
}

function InTransit(orders, setRefresh) {
  let type = "inTransit";
  let inTransitOrders = [];

  for (var i = 0; i < orders.length; i++) {
    if (orders[i]["Tracking"] != "")
      if (orders[i]["完成"] != "Y")
        // shipped, display in InTransit table
        inTransitOrders.push(orders[i]);
  }

  console.log("in transit");
  console.log(orders);
  console.log("continue");
  console.log(inTransitOrders);

  return (
    <div>
      <ProductList
        products={inTransitOrders}
        columns={prepareHeaders([
          "姓名",
          "微信号",
          "地址",
          "寄送",
          "日期",
          "加急",
          "礼物",
        ])}
        listType={type}
        sideMenuSetRefresh={setRefresh}
      />
    </div>
  );
}

function Finished(orders, setRefresh) {
  let type = "Finished";
  let finishedOrders = [];

  for (var i = 0; i < orders.length; i++) {
    if (orders[i]["完成"] == "Y")
      // shipped, display in InTransit table
      finishedOrders.push(orders[i]);
  }

  return (
    <div>
      <ProductList
        products={finishedOrders}
        columns={prepareHeaders([
          "姓名",
          "微信号",
          "地址",
          "寄送",
          "日期",
          "Tracking",
        ])}
        listType={type}
        sideMenuSetRefresh={setRefresh}
      />
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

function Sea() {
  return (
    <div>
      <h2>Sea</h2>
    </div>
  );
}

export default SideMenu;
