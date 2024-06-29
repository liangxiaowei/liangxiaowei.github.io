const result = [];

async function processAllFile() {
  for (let index = 1; index <= 101; index++) {
    const fileName = `/data/english/vocabulary/part${formatNum(index)}_${1 + 200 * (index - 1)}-${index * 200}.md`;
    console.log(fileName);
    await processFile(fileName);
  }
  console.log(result);
  return result;
}
// processFile("/data/english/vocabulary/part014_2601-2800.md");

function formatNum(num) {
  if (num < 10) {
    return `00${num}`;
  } else if (num < 100) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

async function processFile(file) {
  let cocaList = await fetch(file);
  cocaList = await cocaList.text();
  cocaList = cocaList.split("\n").filter((e) => e.length > 0);
  // console.log(cocaList);

  for (let index = 0; index < cocaList.length; ) {
    // console.log(cocaList[index]);
    const element = cocaList[index];
    const word = element.split(" ")[1];
    const pron = cocaList[index + 1].slice(2).replaceAll(" ", "");
    // console.log(cocaList[index + 2]);
    const meaning = cocaList[index + 2].slice(2);
    result.push(`* ${word}#${pron}`);
    index = index + 4;
  }
  // console.log(result);
}

async function mergeFile() {
  let cocaListWithMeanging = await fetch(`/data/english/wordList2.aa`);
  cocaListWithMeanging = await cocaListWithMeanging.text();
  cocaListWithMeanging = cocaListWithMeanging.split("\n");
  let cocaListWithPron = await fetch(`/data/english/coca-pron2.txt`);
  cocaListWithPron = await cocaListWithPron.text();
  cocaListWithPron = cocaListWithPron.split("\n");

  const result = [];
  for (let index = 0; index < cocaListWithMeanging.length; index++) {
    const element1 = cocaListWithMeanging[index];
    const element2 = cocaListWithPron[index];
    if (element1.indexOf("|") > 0) {
      result.push(element1);
    } else {
      result.push(element2);
    }
    // if (element1.split("#")[0].indexOf(element2.split("#")[0]) === -1) {
    //   console.log(index);
    //   return;
    // }
  }
  console.log(result);
  return result;
}

document.getElementById("downloadBtn").addEventListener("click", async () => {
  // 示例数组
  const array = await mergeFile();

  // 将数组转换为换行分隔的字符串
  const data = array.join("\n");

  // 创建一个 Blob 对象
  const blob = new Blob([data], { type: "text/plain" });

  // 创建一个链接元素
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "output.txt";

  // 触发下载
  document.body.appendChild(link);
  link.click();

  // 移除链接元素
  document.body.removeChild(link);
});
