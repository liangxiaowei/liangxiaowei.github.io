import BookItem from './components/BookItem.js'
import BookShelfPage from './components/BookShelfPage.js'
import BookPage from './components/BookPage.js'

import Store from './services/Store.js';
import Router from './services/Router.js';

import * as BookService from "./services/Book.js";

window.app = {}
// 让 Store 变成一个全局单例对象
app.store = Store;
app.router = Router;

async function init() {
    app.router.init();
    await BookService.loadData();
    // let pageElement = document.createElement("bookshelf-page");
    // document.querySelector("main").appendChild(pageElement);
}


window.addEventListener('DOMContentLoaded', () => {
    init();
})