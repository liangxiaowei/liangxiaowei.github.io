import *  as postService from '/services/Post.js'

async function init() {
  let postName = location.search.replace("?", "").split("=")[1];
  postName = decodeURIComponent(postName);
  const content = await postService.getPostByName(postName)
  document.getElementById('content').innerHTML =
      marked.parse(content);
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
