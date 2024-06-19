window.app = {};
// 让 Store 变成一个全局单例对象
app.store = {};
import * as postService from "/services/Post.js";

async function init() {
  let postName = location.search.replace("?", "").split("=")[1];
  postName = decodeURIComponent(postName);
  const content = await postService.getWordByName(postName);
  document.getElementById("content").innerHTML = marked.parse(content);
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
