export async function fetchIslandList() {
    // todo 跟 store 耦合
    // if (app.store.islandList) {
    //   return app.store.islandList;
    // }
    const result = await fetch("/data/island.json");
    let islandList = await result.json();
    
    app.store.islandList = islandList;
    return islandList;
}

