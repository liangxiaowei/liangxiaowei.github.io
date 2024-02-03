const API = {
    fetchBookList: async () => {
        const result = await fetch("/data/bookShelf.json");
        const bookList = await result.json();
        let allData = []
        for (let index = 0; index < bookList.length; index++) {
            const book = bookList[index];
            const singleBookData = await fetch(`/data/book/${book.title}.json`);
            const bookItem = await singleBookData.json();

            try {
                const quoteData = await fetch(`/data/markdown/${book.title}.md`);
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



        return allData;
    }
}

export default API;