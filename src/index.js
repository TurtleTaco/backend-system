import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

////////////////// ANT Components /////////////////
import SideMenu from "./SideMenu";
import ProductLists from "./ProductLists";
import prepareHeaders from "./utilities/csvHeaderToTableHeader";
import Repo from "./repository/repository"

ReactDOM.render(
  <div>
    <ProductLists 
        products = {await fetchAllProducts()}
        columns = {prepareHeaders(["Name","Size","PriceCAD","DiscountedPriceCAD","PriceRMB","DiscountedPriceRMB","ExchangeRate", "Stock"])}
    />
  </div>,
  document.getElementById("root")
);

async function fetchAllProducts(){
    var repo = new Repo("AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0", "fir-7b423.firebaseapp.com", "fir-7b423");
    addAProduct(repo);

    let docs = await repo.products.getAll();
    return docs;

}

function addAProduct(repo){
    repo.products.add("Test",{
    name: 'Test',
    size: 32,
    pricecad: 100,
    discountedpricecad: 90,
    pricermb: 500,
    discountedpricermb: 450,
    stock: 100,
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
