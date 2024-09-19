

import { fetchIslandList } from "/services/Island.js";
window.app = {};
// 让 Store 变成一个全局单例对象
app.store = {
  islandList: undefined
};

async function init() {
  // document.querySelector("main").appendChild(pageElement);
  const result = await fetchIslandList();
  console.log(result);
  const ui = generateIslandListUI(result);
  document.querySelector("main").innerHTML = ui;
  await getTwitterList();
}

async function getWeiBoList() {
  
  // let result = await fetch("https://m.weibo.cn/api/container/getIndex?containerid=231093_-_selffollowed");
  let result = await fetch('/data/weibo.json')
  result = await result.json();
  result = result.map(e => {
    return {
      "name": e.user.screen_name,
      "islandList": [
          {
              "name": "微博",
              "originUrl": e.scheme
          }
      ]
    }
  })
  console.log(result)
}

async function getTwitterList() {
  let result = await fetch('/data/twitter.json')
  result = await result.json();
  // result = result.map(e => {
  //   return {
  //     "name": e.user.screen_name,
  //     "islandList": [
  //         {
  //             "name": "微博",
  //             "originUrl": e.scheme
  //         }
  //     ]
  //   }
  // })
  result = Object.keys(result).map((e) => {
    return {
      "name": result[e].legacy.name,
      "islandList": [
          {
              "name": "推特",
              "originUrl": `https://twitter.com/${result[e].legacy.screen_name}`
          }
      ]
    }
  })
  console.log(result)
  console.log(Object.keys(result))
}

function generateIslandListUI(islandList) {

  const islandLi = islandList.map((e) => {
    const mediaList = e.islandList.map((e) => {
      return `<a href="${e.originUrl}" target="_blank">${e.name}</a>`;
    }).join("__")
    return `<li style="margin-top:10px;">${e.name}${e.info ? ('（' + e.info + '）') : ''}__${mediaList}</li>`
  }).join("");

  return `<ul>${islandLi}</ul>`;
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
