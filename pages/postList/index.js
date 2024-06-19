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
