import BookItem from "/components/book-item/index.js";
import BookShelfPage from "/components/page-bookshelf/index.js";

window.app = {};
// 让 Store 变成一个全局单例对象
app.store = {
  bookList: null,
  bookTagSet: null,
};

async function init() {
  let pageElement = document.createElement("bookshelf-page");
  document.querySelector("main").appendChild(pageElement);
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
