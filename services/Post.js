async function fetchPostList() {
    // todo 跟 store 耦合
    if (app.store.postList) {
        return;
    }
    const result = await fetch("/data/postList.json");
    let postList = await result.json();

    app.store.postList = postList;
    return postList;
}


export async function getPostList() {
    await fetchPostList();
    return app.store.postList;
}

export async function getPostByName(name) {
    const result = await fetch(`/data/post/${name}.md`);
    if (result.status === 200) {
        let content = await result.text();
        return content
    } else {
        return `404`
    }
    
    return book;
}
