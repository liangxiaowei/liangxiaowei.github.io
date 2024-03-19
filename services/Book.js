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

export async function getBookListByTag(tag) {
    await loadData();
    return app.store.bookList.filter(e => new Set([tag]).intersection(new Set(e.tags)).size > 0);
}

export async function getBookTagList() {
    await loadData();
    return app.store.bookTagSet;
}