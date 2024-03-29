import API from './API.js'

export async function loadData() {
    if (app.store.bookList==null) {
        await API.fetchBookList();
    }
}

export async function getBookList() {
    await loadData();
    return app.store.bookList;
}

export async function getBookById(id) {
    await loadData();
    return app.store.bookList.filter(e => e.name === id)[0];
}

export async function getBookListByTag(targetTag) {
    await loadData();
    return app.store.bookList.filter(e => {
        return e.tags.filter(tag => tag === targetTag).length > 0
    });
}

export async function getBookTagList() {
    await loadData();
    return app.store.bookTagSet;
}