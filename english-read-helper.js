const pattern = /([A-Za-zÀ-ÿ-]+|[0-9._]+|.|!|\?|'|"|:|;|,|-)/i;
var style = document.createElement("style");
document.head.appendChild(style);
const sheet = style.sheet;
const topN = 30000;
const dict = {}



let cocaList = await fetch("/data/english/wordList.aa");
cocaList = await cocaList.text();
cocaList = cocaList.split("*");
cocaList = cocaList
  .slice(0, topN)
  .map((e) => e.replace("\n", ""))
  .map((e) => e.trim())
  .filter((e) => e.length > 0)
  .map((e) => {
    const splitByHash = e.split("#");
    const splitByArrow = splitByHash[0].split("<");
    const word = splitByArrow[0];
    let otherShape;
    if (splitByArrow.length > 1) {
      otherShape = splitByArrow[1].split(">")[0].split(",");
    }

    let pronunciation, meaning;
    if (splitByHash.length > 1) {
      const splitByLine = splitByHash[1].split("|");
      pronunciation = splitByLine[0];
      pronunciation = splitByLine[0].split("]")[1].slice(1);
      meaning = splitByLine.slice(1).join("|");
    }

    if (!dict[word]) {
      dict[word] = {
        word,
        otherShape,
        pronunciation,
        meaning,
      }
    }
    
    otherShape && otherShape.forEach(e => {
      if (!dict[e]) {
        dict[e] = {
          word,
          otherShape,
          pronunciation,
          meaning,
        }
      }
      
    })
    return {
      word,
      otherShape,
      pronunciation,
      meaning,
    };
  })

const frequencies = {}
let longman3000 = await fetch("/data/english/longman3000.json");
longman3000 = await longman3000.json();
longman3000.forEach(e => {
  frequencies[e.word] = e.frequencies.join(' ')
}) 

console.log(frequencies)
console.log(dict);
const searchedWordCnt = cocaList.filter((e) => e.meaning).length;
console.log("词本已查：", searchedWordCnt);
// cocaList.forEach((e) => {
//   // console.log(e.pronunciation);
//   sheet.insertRule(
//     `.vocab-${e.word}::after { content: "${e.pronunciation}"; }`,
//     0
//   );
// });



cocaList
  .filter((e) => e.meaning)
  .forEach((e) => {
    sheet.insertRule(`.vocab-${e.word} { position:relative; }`, 0);
    sheet.insertRule(`.vocab-${e.word}::after { content: "${e.meaning}"; }`, 0);
  });

let newWord = 0;
let allWord = 0; // 本材料包含的单词总数（含重复）
let targetWord = 0; // 本材料包含的目标单词总数（含重复）

let wordSet = new Set(); // 本材料包含的单词（不重复）
let targetWordSet = new Set(); // 学习目标包含的单词（不重复）
let notTargetWordSet = new Set(); // 非学习目标包含的单词（不重复）
let notSearchWordSet = new Set(); // 没有查过的单词（不重复）
let targetWordSentenceObj = {}
let notTargetWordSentenceObj = {}


let targetList = await fetch("/data/english/longmanW3000.aa");
targetList = await targetList.text();
targetList = targetList.split("*");
targetList = targetList
  .map((e) => e.replace("\n", ""))
  .map((e) => e.trim())
  .filter((e) => e.length > 0)
console.log('学习目标')  
console.log(targetList)  

const tokenize = (text) => {
  return text ? text.split(pattern).filter((s) => s !== "") : [];
};

const getMeaning = (token) => {
  return {
    where: "哪里",
    i: "我",
    lived: "住",
    and: "和",
    what: "什么",
    lived: "生存",
    for: "为了",
  }[`${token}`];
};

function isLetters( str ){
  var re=/^[A-Za-z]+$/;
  if (str.match(re) == null)
      return false;
  else
      return true;
}

function createNodes(token, sentence) {
  if (!token.trim()) {
    return document.createTextNode(token);
  }

  // Create a span element
  const span = document.createElement("span");
  span.textContent = token;
  span.className = `vocab-hl`;
  if (token.length <= 1 && !isLetters(token)) {
    return span;
  }

  allWord++;
  // if (token.length <= 1) {
  //   return span;
  // }

  // const matchWordList = cocaList
  //   // .filter((e) => e.meaning)
  //   .filter((e) => {
  //     const tokenLowerCase = token.toLowerCase();
  //     // const strWithoutLast = e.substring(0, e.length - 1);
  //     // const lastStr = e.substring(e.length - 1, e.length);
  //     return (
  //       [e.word].concat(e.otherShape).filter((e) => e === tokenLowerCase)
  //         .length > 0
  //       // ||
  //       // `${e}s` === tokenLowerCase ||
  //       // `${e}es` === tokenLowerCase ||
  //       // `${strWithoutLast}ies` === tokenLowerCase ||
  //       // `${e}ed` === tokenLowerCase ||
  //       // `${e}${lastStr}ed` === tokenLowerCase ||
  //       // `${e}d` === tokenLowerCase ||
  //       // `${e}ing` === tokenLowerCase ||
  //       // `${strWithoutLast}ing` === tokenLowerCase ||
  //       // `${strWithoutLast}ied` === tokenLowerCase ||
  //       // `${e}er` === tokenLowerCase ||
  //       // `${e}r` === tokenLowerCase ||
  //       // `${strWithoutLast}r` === tokenLowerCase ||
  //       // `${strWithoutLast}ier` === tokenLowerCase ||
  //       // `${e}y` === tokenLowerCase ||
  //       // `${strWithoutLast}iest` === tokenLowerCase ||
  //       // `${e}est` === tokenLowerCase ||
  //       // `${strWithoutLast}ily` === tokenLowerCase ||
  //       // `${e}ly` === tokenLowerCase ||
  //       // `${e}ily` === tokenLowerCase ||
  //       // `${e}${lastStr}ing` === tokenLowerCase ||
  //       // `${e}${lastStr}ly` === tokenLowerCase ||
  //       // `${strWithoutLast}t` === tokenLowerCase ||
  //       // `${e}n` === tokenLowerCase
  //     );
  //   });
  const matchWord = dict[token.toLowerCase()];
  const isInDict = matchWord;
  const hasMeaning = isInDict && matchWord.meaning;
  
  if (!isInDict || !hasMeaning) {
    newWord++;
    if (isInDict) {
      notSearchWordSet.add(matchWord.word)
    } else {
      notSearchWordSet.add(token.toLowerCase());
    }
    span.className += ` vocab-hl-no-meaning`;
  } else {
    span.className += ` vocab-${matchWord.word}`;
  }

  if (isInDict) {
    wordSet.add(matchWord.word);
  } else {
    wordSet.add(token.toLowerCase());
  }

  if (isInDict) {
    const matchTargetWordList = targetList.filter(e => e == matchWord.word)
    if (matchTargetWordList.length > 0) {
      targetWord++
      if (!targetWordSentenceObj[matchWord.word]) {
        targetWordSentenceObj[matchWord.word] =  new Set()
      } 
      targetWordSentenceObj[matchWord.word].add(sentence)
      targetWordSet.add(matchWord.word)
      span.className += ` vocab-hl-3000`;
    } else {
      if (!notTargetWordSentenceObj[matchWord.word]) {
        notTargetWordSentenceObj[matchWord.word] = new Set()
      }
      notTargetWordSentenceObj[matchWord.word].add(sentence)

      span.className += ` vocab-hl-no-3000`;
      notTargetWordSet.add(matchWord.word)
    }
  } else {
    if (!notTargetWordSentenceObj[token.toLowerCase()]) {
      notTargetWordSentenceObj[token.toLowerCase()] = new Set()
    }
    notTargetWordSentenceObj[token.toLowerCase()].add(sentence)
    span.className += ` vocab-hl-no-3000`;
    notTargetWordSet.add(token.toLowerCase())
  }
  

  return span;
}

function highlightKeyword(node) {
  if (node.nodeType === 3) {
    if (node.wholeText.indexOf("\n") == 0) {
      return;
    }

    // console.log('处理节点开始--')
    // console.log(node.textContent);
    // 请求 gpt ，拿到每个单词的中文
    const sentenceArr = node.textContent.split('.');
    // console.log(sentenceArr);
    const fragment = new DocumentFragment();

    sentenceArr.forEach((sentence) => {
      let tokens = tokenize(sentence+'.');
      // console.log(tokens)

      // const nodes = await Promise.all(
      //     tokens.map((word) => createNodes(word, settings)),
      // )
      const nodes = tokens.map((word) => createNodes(word, sentence));
      // console.log(nodes)

      fragment.append(...nodes);
      fragment.normalize();
      
    })
    node.parentElement.replaceChild(fragment, node);
    
    // console.log('处理节点结束--')
  } else if (
    node.nodeType === 1 &&
    !/script|style/.test(node.tagName.toLowerCase())
  ) {
    const children = node.childNodes;
    const length = children.length;
    for (let i = 0; i < length; i++) {
      highlightKeyword(children[i]);
    }
  }
}

const body = document.querySelector("body");
console.log("highlightKeyword--");
highlightKeyword(body);
console.log('非3000词')
console.log(notTargetWordSet);
console.log('生词')
console.log(notSearchWordSet);
console.log('目标单词句子')
// console.log(targetWordSentenceObj)
Object.keys(targetWordSentenceObj).forEach(e => {
  console.log('********************************************')
  console.log('`' + e + '`' + (frequencies[e] ? ' ' + frequencies[e] : '') + ' [' + dict[e].pronunciation + ']')
  console.log(targetWordSentenceObj[e].size)

  targetWordSentenceObj[e].forEach(sentence => {
    // sentence = sentence.replace(e, '`'+ e +'`')
    sentence = `- ${sentence} —— the heart of the matter`
    console.log(sentence)
  })
  
})
console.log('非目标单词句子')
console.log(notTargetWordSentenceObj)
body.firstElementChild.textContent = `单词本：${searchedWordCnt}，总共包含字数： ${allWord} ，3000词字数：${targetWord}，占比：${Math.round(targetWord / allWord * 100, 2)}%，其中不同单词数：${wordSet.size}，3000词：${targetWordSet.size}，超纲词汇： ${notSearchWordSet.size}`;
body.children[1].addEventListener('click', chooseDirectory)
let directoryHandle;

async function chooseDirectory() {
  try {

    const directoryHandle = await window.showDirectoryPicker();
    // const wordListFileHandle = await directoryHandle.getFileHandle('eng-word-list.md', { create: true })
    // let wordListFileContent = await getFileContent(wordListFileHandle)
    // let wordList = wordListFileContent.split("-").map(e => e.replace('\n','')).map(e => e.replace(' ',''))
    // console.log('content:', wordList);

    // console.log(targetWordSentenceObj)
    Object.keys(targetWordSentenceObj).forEach(async (word) => {

      let newContent=''
      targetWordSentenceObj[word].forEach(sentence => {
        // sentence = sentence.replace(e, '`'+ e +'`')
        sentence = `- ${sentence} —— the heart of the matter`
        newContent += '\n\n' + sentence
      })
      await addEngWordFile(directoryHandle, word, newContent)
    })
    // console.log('非目标单词句子')
    // console.log(notTargetWordSentenceObj)

    console.log('Selected directory:', directoryHandle);
  } catch (error) {
    console.error('Error selecting directory:', error);
  }
}

async function getFileContent(fileHandle) {
  const file = await fileHandle.getFile();
  const content = await file.text();
  return content
}

async function addEngWordFile(directoryHandle, word, newContent) {
  const firstLine = '- `' + word + '`' + (frequencies[word] ? ' ' + frequencies[word] : '') + ' [' + dict[word].pronunciation + ']'

  const newFileHandle = await directoryHandle.getFileHandle(`eng-word-${word}.md`, { create: true })
  const oldContent = await getFileContent(newFileHandle)
  

  let fileContent = oldContent && oldContent.length ? `${oldContent}${newContent}` : `${firstLine}\n\n${newContent}`
  // fileContent = fileContent.replaceAll(` ${word}`, ` \`${word}\``)
  console.log(fileContent)

  const writable = await newFileHandle.createWritable();
  await writable.write(`${fileContent}`); 
  await writable.close();
}