import BookPage from '../../components/BookPage.js'

import Store from '../../services/Store.js';

import * as BookService from "../../services/Book.js";

window.app = {}
// 让 Store 变成一个全局单例对象
app.store = Store;

async function init() {
    await BookService.loadData();
    let pageElement = null;
    pageElement = document.createElement("book-page");
    pageElement.dataset.bookId = '夏商周：从神话到史实';
    if (pageElement) {
        document.querySelector("main").innerHTML = "";
        document.querySelector("main").appendChild(pageElement);
    }
}


window.addEventListener('DOMContentLoaded', () => {
    init();
})