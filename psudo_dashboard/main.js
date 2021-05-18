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
}

function buildDashboard(info) {
  console.log("build dashboard");
  let temp = document.querySelector("template#bartender");
  info.bartenders.forEach((bartender, i) => {
    let clone = temp.content.cloneNode(true);
    clone.querySelector("#bartender_").id = "bartender_" + i;
    clone.querySelector(".name").textContent = bartender.name;
    clone.querySelector(".status").textContent = bartender.name;
    clone.querySelector(".statusDetail").textContent = bartender.name;
    clone.querySelector(".usingTap").textContent = bartender.name;
    clone.querySelector(".servingCustomer").textContent = bartender.name;
  });
}

/* window.addEventListener("DOMContentLoaded", init);

const headers = {
  "Content-Type": "application/json",
};

async function init() {
  console.log("Der er hul igennem!");
  const url = "https://teamellewoods.herokuapp.com/";
  const json = await getJSON(url);
}

async function getJSON(url) {
  const respons = await fetch(url, {
    method: "get",
    headers: headers,
  });
  const json = await respons.json();
  return json;
}
 */
