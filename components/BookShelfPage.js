import * as BookService from "../services/Book.js";

export default class BookShelfPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });   
        const styles = document.createElement("style")
        this.root.appendChild(styles)

        async function loadCSS() {
            const request = await fetch("/components/BookShelfPage.css");
            styles.textContent = await request.text();
        }
        loadCSS();  
    }

    connectedCallback() {
        const template = document.getElementById("bookshelf-page-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        
        this.render();
    }

    async render() {
        const bookList = await BookService.getBookList();
        bookList.
            map((book) => {
                book.year = parseInt(book.printDate.split('-')[0])
            })
            let filterBookList =  bookList.sort((a, b) => {
                return  a.year - b.year 
            })

        // let filterBookList = bookList.filter((book) => {
        //     let year = parseInt(book.printDate.split('-')[0])
        //     return year <= 2008
        // })
        console.log(filterBookList)
        filterBookList.map(book => {
            const item = document.createElement("book-item");
            item.dataset.book = JSON.stringify(book);
            this.root.querySelector(".booklist").appendChild(item);
        });
    }
}
customElements.define("bookshelf-page", BookShelfPage);