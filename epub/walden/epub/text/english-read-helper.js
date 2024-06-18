const pattern = /([A-Za-zÀ-ÿ-]+|[0-9._]+|.|!|\?|'|"|:|;|,|-)/i;
var style = document.createElement("style");
document.head.appendChild(style);
const sheet = style.sheet;
const topN = 6000;
let cocaList = await fetch("./coca-20000.aa");
cocaList = await cocaList.text();
cocaList = cocaList.split("*");
cocaList = cocaList
  .map((e) => e.replace("\n", ""))
  .map((e) => e.trim())
  .filter((e) => e.length > 0)
  .slice(0, topN);
console.log(cocaList);
let newWord = 0;
let allWord = 0;

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

function createNodes(token) {
  if (!token.trim()) {
    return document.createTextNode(token);
  }

  allWord++;
  // Create a span element
  const span = document.createElement("span");
  span.textContent = token;
  span.className = `vocab-hl vocab-${token.toLowerCase()}`;
  if (token.length <= 3) {
    return span;
  }
  //   if (getMeaning(token.toLowerCase())) {
  //     sheet.insertRule(
  //       `.vocab-${token.toLowerCase()}::after { content: "${getMeaning(
  //         token.toLowerCase()
  //       )}"; }`,
  //       0
  //     );
  //   }

  if (
    cocaList.filter((e) => {
      const tokenLowerCase = token.toLowerCase();
      const strWithoutLast = e.substring(0, e.length - 1);
      const lastStr = e.substring(e.length - 1, e.length);
      return (
        e === tokenLowerCase ||
        `${e}s` === tokenLowerCase ||
        `${e}es` === tokenLowerCase ||
        `${strWithoutLast}ies` === tokenLowerCase ||
        `${e}ed` === tokenLowerCase ||
        `${e}${lastStr}ed` === tokenLowerCase ||
        `${e}d` === tokenLowerCase ||
        `${e}ing` === tokenLowerCase ||
        `${strWithoutLast}ing` === tokenLowerCase ||
        `${strWithoutLast}ied` === tokenLowerCase ||
        `${e}er` === tokenLowerCase ||
        `${e}r` === tokenLowerCase ||
        `${strWithoutLast}r` === tokenLowerCase ||
        `${strWithoutLast}ier` === tokenLowerCase ||
        `${e}y` === tokenLowerCase ||
        `${strWithoutLast}iest` === tokenLowerCase ||
        `${e}est` === tokenLowerCase ||
        `${strWithoutLast}ily` === tokenLowerCase ||
        `${e}ly` === tokenLowerCase ||
        `${e}ily` === tokenLowerCase ||
        `${e}${lastStr}ing` === tokenLowerCase ||
        `${e}${lastStr}ly` === tokenLowerCase ||
        `${strWithoutLast}t` === tokenLowerCase ||
        `${e}n` === tokenLowerCase
      );
    }).length === 0
  ) {
    newWord++;
    span.className += ` vocab-hl-3000`;
  } else {
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
console.log(`总词汇：${allWord}，超纲词汇： ${newWord}`);
