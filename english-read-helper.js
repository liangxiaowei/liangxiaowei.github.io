const pattern = /([A-Za-zÀ-ÿ-]+|[0-9._]+|.|!|\?|'|"|:|;|,|-)/i;
var style = document.createElement("style");
document.head.appendChild(style);
const sheet = style.sheet;
const topN = 3000;
let cocaList = await fetch("/data/english/wordList.aa");
cocaList = await cocaList.text();
cocaList = cocaList.split("*");
cocaList = cocaList
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
    return {
      word,
      otherShape,
      pronunciation,
      meaning,
    };
  })
  // .slice(0, topN);
console.log(cocaList);
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
let sentenceObj = {}

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

function createNodes(token) {
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

  const matchWordList = cocaList
    // .filter((e) => e.meaning)
    .filter((e) => {
      const tokenLowerCase = token.toLowerCase();
      // const strWithoutLast = e.substring(0, e.length - 1);
      // const lastStr = e.substring(e.length - 1, e.length);
      return (
        [e.word].concat(e.otherShape).filter((e) => e === tokenLowerCase)
          .length > 0
        // ||
        // `${e}s` === tokenLowerCase ||
        // `${e}es` === tokenLowerCase ||
        // `${strWithoutLast}ies` === tokenLowerCase ||
        // `${e}ed` === tokenLowerCase ||
        // `${e}${lastStr}ed` === tokenLowerCase ||
        // `${e}d` === tokenLowerCase ||
        // `${e}ing` === tokenLowerCase ||
        // `${strWithoutLast}ing` === tokenLowerCase ||
        // `${strWithoutLast}ied` === tokenLowerCase ||
        // `${e}er` === tokenLowerCase ||
        // `${e}r` === tokenLowerCase ||
        // `${strWithoutLast}r` === tokenLowerCase ||
        // `${strWithoutLast}ier` === tokenLowerCase ||
        // `${e}y` === tokenLowerCase ||
        // `${strWithoutLast}iest` === tokenLowerCase ||
        // `${e}est` === tokenLowerCase ||
        // `${strWithoutLast}ily` === tokenLowerCase ||
        // `${e}ly` === tokenLowerCase ||
        // `${e}ily` === tokenLowerCase ||
        // `${e}${lastStr}ing` === tokenLowerCase ||
        // `${e}${lastStr}ly` === tokenLowerCase ||
        // `${strWithoutLast}t` === tokenLowerCase ||
        // `${e}n` === tokenLowerCase
      );
    });

  if (matchWordList.length === 0 || !matchWordList[0].meaning) {
    newWord++;
    if (matchWordList.length > 0) {
      notSearchWordSet.add(matchWordList[0].word)
    } else {
      notSearchWordSet.add(token.toLowerCase());
    }
    span.className += ` vocab-hl-no-meaning`;
  } else {
    span.className += ` vocab-${matchWordList[0].word}`;
  }

  if (matchWordList.length > 0) {
    wordSet.add(matchWordList[0].word);
  } else {
    wordSet.add(token.toLowerCase());
  }

  if (matchWordList.length > 0) {
    const matchTargetWordList = targetList.filter(e => e == matchWordList[0].word)
    if (matchTargetWordList.length > 0) {
      targetWord++
      targetWordSet.add(matchWordList[0].word)
      span.className += ` vocab-hl-3000`;
    } else {
      span.className += ` vocab-hl-no-3000`;
      notTargetWordSet.add(matchWordList[0].word)
    }
  } else {
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

    let tokens = tokenize(node.textContent);
    // console.log(tokens)

    // const nodes = await Promise.all(
    //     tokens.map((word) => createNodes(word, settings)),
    // )
    const nodes = tokens.map((word) => createNodes(word));
    // console.log(nodes)

    const fragment = new DocumentFragment();
    fragment.append(...nodes);
    fragment.normalize();
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

body.firstElementChild.textContent = `单词本：${searchedWordCnt}，总共包含字数： ${allWord} ，3000词字数：${targetWord}，占比：${Math.round(targetWord / allWord * 100, 2)}%，其中不同单词数：${wordSet.size}，3000词：${targetWordSet.size}，超纲词汇： ${notSearchWordSet.size}`;
