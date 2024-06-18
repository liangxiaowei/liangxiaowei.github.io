window.app = {};
// 让 Store 变成一个全局单例对象
app.store = {

};

import *  as postService from '/services/Post.js'

function postToRenderItem(post) {  
  return `<li class="item"><a href="/pages/post/index.html?name=${post.path}">${post.name}</a></li>`
} 

async function init() {
  const postList = await postService.getPostList();
  const postRenderList = postList.map((post) => {
    return postToRenderItem(post)
  });

  document.querySelector(".list").innerHTML = postRenderList.join();
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
