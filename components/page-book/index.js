import * as BookService from "/services/Book.js";
const template = document.createElement("template");
template.innerHTML = `<ul class="quotelist"></ul>`;

export default class BookPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/page-book/index.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  async renderData() {
    if (this.dataset.bookId) {
      this.book = await BookService.getBookById(this.dataset.bookId);

      const ul = this.root.querySelector(".quotelist");
      this.book.quoteList.forEach((quote) => {
        const li = document.createElement("li");
        li.textContent = quote.content;
        ul.appendChild(li);
      });
    } else {
      alert("Invalid Book ID");
    }
  }

  connectedCallback() {
    this.renderData();
  }
}

customElements.define("book-page", BookPage);
