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
  /* 
  setTimeout(refresDashboard, 1000); */
}

/* function refresDashboard() {
  const data = JSON.parse(bar.getData(true));
  data.bartenders.forEach((bartender, i) => {
    console.log("refresh");
    const element = document.querySelector("#bartender_" + i);
    element.querySelector("#bartender_").id = "bartender_" + i;
    element.querySelector(".status").textContent = bartender.status;
    element.querySelector(".statusDetail").textContent = bartender.statusDetail;
    element.querySelector(".usingTap").textContent = bartender.usingTap;
    element.querySelector(".servingCustomer").textContent = bartender.servingCustomer;
  });
} */

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

  //build
  temp = document.querySelector("template#storage");
  info.storage.forEach((storage) => {
    console.log("hej");
    let clone = temp.content.cloneNode(true);
    clone.querySelector(".beertype").textContent = storage.name;
    clone.querySelector(".amount").textContent = storage.amount;

    document.querySelector("#storage").appendChild(clone);
  });
}
