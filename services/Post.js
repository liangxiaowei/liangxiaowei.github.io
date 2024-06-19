async function fetchPostList() {
  const result = await fetch("/data/postList.json");
  let postList = await result.json();

  return postList;
}

export async function getPostList() {
  return await fetchPostList();
}

export async function getPostByName(name) {
  const result = await fetch(`/data/markdown/${name}.md`);
  if (result.status === 200) {
    let content = await result.text();
    return content;
  } else {
    return `404`;
  }
}