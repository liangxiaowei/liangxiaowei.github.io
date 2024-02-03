import API from './API.js'

export async function loadData() {
    const data = await API.fetchBookList();
    app.store.bookList = data;
}

export async function getBookList() {
    if (app.store.bookList==null) {
        await loadData();
    }
    
    return app.store.bookList;
}

export async function getBookById(id) {
    if (app.store.bookList==null) {
        await loadData();
    }
   
    return app.store.bookList.filter(e => e.name === id)[0];
}