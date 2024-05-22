import BookPage from "/components/page-book/index.js";

import * as BookService from "/services/Book.js";

window.app = {};
// 让 Store 变成一个全局单例对象
app.store = {
  bookList: null,
  bookTagSet: null,
};

async function init() {
  let id = location.search.replace("?", "").split("=")[1];
  id = decodeURIComponent(id);
  let pageElement = document.createElement("book-page");
  pageElement.dataset.bookId = id;
  document.querySelector("main").appendChild(pageElement);
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
