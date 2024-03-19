const API = {
    fetchBookList: async () => {
        const result = await fetch("/data/bookShelf.md");
        let bookList = await result.text();
        bookList = bookList.split('-').slice(1);
        const bookTagSet = new Set();

        let allData = []
        for (let index = 0; index < bookList.length; index++) {
            const book = bookList[index].replaceAll(' ', '').replaceAll('\r\n', '');
            const singleBookData = await fetch(`/data/book/${book}.json`);
            const bookItem = await singleBookData.json();
            bookItem.tags = bookItem.tags ? bookItem.tags.split('#').slice(1) : [];
            bookItem.tags.forEach(tag => {
                bookTagSet.add(tag);
            });

            try {
                const quoteData = await fetch(`/data/markdown/${book}.md`);
                if (quoteData.status === 200) {
                    const quoteText = await quoteData.text();
                    let quoteList = quoteText.split('>');
                    quoteList = quoteList.filter(item => item.trim().length > 0).map((item) => {                        
                        item = item.trim();
                        const chapterIndex = item.indexOf('||');
                        const tagIndex = item.indexOf('#');
                        const content = item.slice(0, chapterIndex);
                        const chapter = item.slice(chapterIndex, tagIndex > 0 ? tagIndex : item.length).replace('||', '');
                        let tags = []
                        if (tagIndex > 0) {
                            tags = item.slice(tagIndex, item.length);
                            tags = tags.split('#').filter(item => item.length > 0)
                        }

                        return {
                            content,
                            chapter, 
                            tags
                        }
                    })
                    bookItem.quoteList = quoteList;
                }
            } catch(e) {
                
            }

            allData.push(bookItem);
        }

        app.store.bookTagSet = bookTagSet;
        app.store.bookList = allData;
        console.log(app.store)
        return allData;
    }
}

export default API;