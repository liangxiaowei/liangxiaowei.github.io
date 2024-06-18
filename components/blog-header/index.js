// import {html, css, LitElement} from 'lit';

// export class BlogHeader extends LitElement {
//   static styles = css`p { color: blue }`;

//   // static properties = {
//   //   selectedName: {type: String},
//   // };

//   constructor() {
//     super();
//     this.name = 'Somebody';
//   }

//   render() {
//     return html`<h1>pdway's blog <a>首页</a> <a>文章</a> <></><a>书架</a><h1>`;
//   }
// }
// customElements.define('blog-header', BlogHeader);

const tabs = [
  {
    name: "首页",
    route: "/",
  },
  {
    name: "文章",
    route: "/pages/postList/index.html",
  },
  {
    name: "书架",
    route: "/pages/bookshelf/index.html",
  },
];

function tasbToA(tabs, currentName) {
  const aTagList = tabs
    .map(
      (e) =>
        `<a href="${e.route}" class="${
          currentName === e.name ? "a-active" : ""
        }">${e.name}</a>`
    )
    .join("");
  return aTagList;
}

export class BlogHeader extends HTMLElement {
  constructor() {
    super();
    this.currentname = "首页";
  }

  static get observedAttributes() {
    return ["currentname"];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }

  connectedCallback() {
    console.log(this.currentname);
    this.innerHTML = `
      <link rel="stylesheet" href="/components/blog-header/index.css">
      <nav>pdway's blog <div>${tasbToA(tabs, this.currentname)}</div></nav>
    `;
  }
}

customElements.define("blog-header", BlogHeader);
