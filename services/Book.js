async function fetchBookList() {
  // todo 跟 store 耦合
  if (app.store.bookList !== null) {
    return;
  }
  const result = await fetch("/data/bookShelf.json");
  let bookList = await result.json();
  const bookTagSet = new Set();

  for (let index = 0; index < bookList.length; index++) {
    const bookItem = bookList[index];
    bookItem.tags = bookItem.tags ? bookItem.tags.split("#").slice(1) : [];
    bookItem.tags.forEach((tag) => {
      bookTagSet.add(tag);
    });

    //   try {
    //     const quoteData = await fetch(`/data/markdown/${book}.md`);
    //     if (quoteData.status === 200) {
    //       const quoteText = await quoteData.text();
    //       let quoteList = quoteText.split(">");
    //       quoteList = quoteList
    //         .filter((item) => item.trim().length > 0)
    //         .map((item) => {
    //           item = item.trim();
    //           const chapterIndex = item.indexOf("||");
    //           const tagIndex = item.indexOf("#");
    //           const content = item.slice(0, chapterIndex);
    //           const chapter = item
    //             .slice(chapterIndex, tagIndex > 0 ? tagIndex : item.length)
    //             .replace("||", "");
    //           let tags = [];
    //           if (tagIndex > 0) {
    //             tags = item.slice(tagIndex, item.length);
    //             tags = tags.split("#").filter((item) => item.length > 0);
    //           }

    //           return {
    //             content,
    //             chapter,
    //             tags,
    //           };
    //         });
    //       bookItem.quoteList = quoteList;
    //     }
    //   } catch (e) {}
  }

  app.store.bookTagSet = bookTagSet;
  app.store.bookList = bookList;
  return bookList;
}

async function fetchBookQuoteList(book) {
  try {
    const quoteData = await fetch(`/data/markdown/${book}.md`);
    if (quoteData.status === 200) {
      const quoteText = await quoteData.text();
      let quoteList = quoteText.split(">");
      quoteList = quoteList
        .filter((item) => item.trim().length > 0)
        .map((item) => {
          item = item.trim();
          const chapterIndex = item.indexOf("||");
          const tagIndex = item.indexOf("#");
          const content = item.slice(0, chapterIndex);
          const chapter = item
            .slice(chapterIndex, tagIndex > 0 ? tagIndex : item.length)
            .replace("||", "");
          let tags = [];
          if (tagIndex > 0) {
            tags = item.slice(tagIndex, item.length);
            tags = tags.split("#").filter((item) => item.length > 0);
          }

          return {
            content,
            chapter,
            tags,
          };
        });
      return quoteList;
    } else {
      return [];
    }
  } catch (e) {}
}

export async function getBookList() {
  await fetchBookList();
  return app.store.bookList;
}

export async function getBookById(id) {
  await fetchBookList();
  const quoteList = await fetchBookQuoteList(id);
  const book = app.store.bookList.filter((e) => e.name === id)[0];
  book.quoteList = quoteList;
  console.log(book);
  return book;
}

export async function getBookListByTag(targetTag) {
  await fetchBookList();
  return app.store.bookList.filter((e) => {
    return e.tags.filter((tag) => tag === targetTag).length > 0;
  });
}

export async function getBookTagList() {
  await fetchBookList();
  return app.store.bookTagSet;
}
