import "./sass/style.scss";

("use strict");

window.addEventListener("DOMContentLoaded", init);

let json;
let url = "https://teamellewoods.herokuapp.com/";

async function init() {
  console.log("hallo");
  const respons = await fetch(url);
  json = await respons.json();
  buildDashboard(json);

  setTimeout(refreshDashboard, 1000);
}

async function refreshDashboard() {
  // const data = JSON.parse(bar.getData(true));
  const respons = await fetch(url);
  const data = await respons.json();
  //update bartenders
  data.bartenders.forEach((bartender, i) => {
    console.log("refresh");
    console.log(i);
    const element = document.querySelector("#bartender_" + i);
    //    element.querySelector("#bartender_").id = "bartender_" + i;
    element.querySelector(".status").textContent = bartender.status;
    element.querySelector(".statusDetail").textContent = bartender.statusDetail;
    element.querySelector(".usingTap").textContent = bartender.usingTap;
    element.querySelector(".servingCustomer").textContent = bartender.servingCustomer;
  });

  //update taps
  data.taps.forEach((tap) => {
    const element = document.querySelector("#tap_" + tap.id);
    //    element.querySelector("#bartender_").id = "bartender_" + i;
    element.querySelector(".id").textContent = tap.id;
    element.querySelector(".level").textContent = tap.level;
    element.querySelector(".capacity").textContent = tap.capacity;
    element.querySelector(".inUse").textContent = tap.inUse;
  });

  //update being severd
  document.querySelector("#serving_list").innerHTML = "";
  data.serving.forEach((customer) => {
    const element = getCustomerElement(customer);
    document.querySelector("#serving_list").appendChild(element);
  });

  //update queue
  document.querySelector("#queue_list").innerHTML = "";
  data.queue.forEach((customer) => {
    const element = getCustomerElement(customer);
    document.querySelector("#queue_list").appendChild(element);
  });

  //update storage
  document.querySelector("#storage_list").innerHTML = "";
  data.storage.forEach((store) => {
    const clone = document.querySelector("template#storage_keg").content.cloneNode(true);
    clone.querySelector(".beertype").textContent = store.name;
    clone.querySelector(".amount").textContent = store.amount;
    document.querySelector("#storage_list").appendChild(clone);
  });

  setTimeout(refreshDashboard, 1000);
}

function getCustomerElement(customer) {
  const element = document.querySelector("template#customer").content.cloneNode(true);
  element.querySelector(".id").textContent = customer.id;
  element.querySelector(".order").textContent = "[" + customer.order.join(", ") + "]";
  return element;
}

function buildDashboard(info) {
  console.log("build dashboard");
  console.log(info.bartenders);
  //build bartenders
  let temp = document.querySelector("template#bartender");
  info.bartenders.forEach((bartender, i) => {
    console.log("hej");
    let clone = temp.content.cloneNode(true);
    clone.querySelector("#bartender_").id = "bartender_" + i;
    clone.querySelector(".name").textContent = bartender.name;
    clone.querySelector(".status").textContent = bartender.status;
    clone.querySelector(".statusDetail").textContent = bartender.statusDetail;
    clone.querySelector(".usingTap").textContent = bartender.usingTap;
    clone.querySelector(".servingCustomer").textContent = bartender.servingCustomer;

    document.querySelector("#bartenders").appendChild(clone);
  });

  //build taps
  temp = document.querySelector("template#tap");
  info.taps.forEach((tap) => {
    console.log("hej");
    let clone = temp.content.cloneNode(true);
    clone.querySelector("#tap_").id = "tap_" + tap.id;
    clone.querySelector(".id").textContent = tap.id;
    clone.querySelector(".beer").textContent = tap.beer;
    clone.querySelector(".inUse").textContent = tap.inUse;
    clone.querySelector(".level").textContent = tap.level;
    clone.querySelector(".capacity").textContent = tap.capacity;

    document.querySelector("#taps").appendChild(clone);
  });
}
