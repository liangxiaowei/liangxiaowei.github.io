import * as BookService from "/services/Book.js";

export default class BookShelfPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/page-bookshelf/index.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("bookshelf-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    this.render("全部");
  }

  async render(targetTag) {
    this.clearContent();

    let getBookListService = targetTag && targetTag !== "全部" ? BookService.getBookListByTag : BookService.getBookList;
    const bookList = await getBookListService(targetTag);
    const tagList = await BookService.getBookTagList();
    tagList.push("全部");

    this.renderBookList(bookList)
    this.renderTagList(tagList, targetTag, bookList.length)
  }

  clearContent() {
    this.root.querySelector(".booklist").innerHTML = "";
    this.root.querySelector(".taglist").innerHTML = "";
  }

  renderBookList(_bookList) {
    let bookList = _bookList.map((book) => {
      return {
        ...book,
        year: parseInt(book.printDate.split("-")[0])
      }
    });
    bookList = bookList.sort((a, b) => {
      return a.year - b.year;
    });

    console.log(bookList);
    bookList.forEach((book) => {
      const item = document.createElement("book-item");
      item.dataset.book = JSON.stringify(book);
      this.root.querySelector(".booklist").appendChild(item);
    });
  }

  async renderTagList(tagList, targetTag, targetBookListLength) {
    let tagListHtml = tagList.map((tag) => {
      const isTarget = targetTag === tag
      return isTarget ? `<div data-tag=${tag} style="color:red;">${tag}(${targetBookListLength})</div>`  : `<div data-tag=${tag}>${tag}</div>`
    }).join("")

    this.root.querySelector(".taglist").innerHTML = tagListHtml;
    this.root.querySelector(".taglist").childNodes.forEach(e => {
      e.addEventListener("click", () => {
            this.render(e.dataset.tag);
      });
    });
  }
}
customElements.define("bookshelf-page", BookShelfPage);
