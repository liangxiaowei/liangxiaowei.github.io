// let book = {}
// book.name = document.querySelector('#wrapper').querySelector('h1').querySelector('span').textContent.split('(')[0].trim()
// let author = document.querySelector('#info > span:nth-child(1) > a')
// if (!author) {
//     author = document.querySelector('#info > a:nth-child(2)')
// }

// book.author = author.textContent.split('\n')[author.textContent.split('\n').length - 1].trim()
// let subTitle = document.querySelector('#info').textContent.split('\n').map(e => e.trim()).filter(e => e.length > 0).filter(e => e.indexOf('副标题') >= 0)
// book.subTitle = subTitle && subTitle.length > 0  ? subTitle[0].split(':')[1].trim() : ''
// book.printDate = document.querySelector('#info').textContent.split('\n').map(e => e.trim()).filter(e => e.length > 0).filter(e => e.indexOf('出版年') >= 0)[0].split(':')[1].trim()
// book.ISBN = document.querySelector('#info').textContent.split('\n').map(e => e.trim()).filter(e => e.length > 0).filter(e => e.indexOf('ISBN') >= 0)[0].split(':')[1].trim()
// book.cover = document.querySelector('#mainpic > a > img').src
// book.doubalLink = window.location.href
// book.desc = ''
// book.version = 1
// book.tags = ''
// JSON.stringify(book)
export default class BookItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("book-item-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const book = JSON.parse(this.dataset.book);
    book.printDate = book.printDate.split("-")[0];
    book.printDate =
      book.version && book.version > 1
        ? `${book.printDate}(${book.version})`
        : book.printDate;
    // this.querySelector(".book-item-name").textContent = book.name;
    this.querySelector(".book-item-cover").src = book.cover;
    this.querySelector(".book-item-cover").alt = book.name;
    this.querySelector(".book-item-printdate").textContent = book.printDate;
    this.addEventListener("click", () => {
      window.location.href = `/pages/post/index.html?name=${book.name}`;
    });
  }
}

customElements.define("book-item", BookItem);
