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

        
        this.render('全部');
    }

    async render(targetTag) {
        this.root.querySelector(".booklist").innerHTML = ""
        this.root.querySelector(".taglist").innerHTML = ""

        let service = targetTag && targetTag !== '全部' ? BookService.getBookListByTag : BookService.getBookList;
        const bookList = await service(targetTag);
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

        const tagList = await BookService.getBookTagList();
        tagList.add('全部');
        tagList.forEach(tag => {
            const tagElement = document.createElement("div");
            tagElement.textContent = `${tag}`;
            if (targetTag === tag) {
                tagElement.style = 'color:red;';
                tagElement.textContent = `${tag}(${bookList.length})`;
            }
            tagElement.addEventListener("click", ()=> {
                this.render(tag)
            });
            this.root.querySelector(".taglist").appendChild(tagElement)
        });
    }
}
customElements.define("bookshelf-page", BookShelfPage);