import {html, css, LitElement} from 'lit';

export class BlogHeader extends LitElement {
  static styles = css`p { color: blue }`;

  // static properties = {
  //   selectedName: {type: String},
  // };

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    return html`<h1>pdway's blog <a>首页</a> <a>文章</a> <></><a>书架</a><h1>`;
  }
}
customElements.define('blog-header', BlogHeader);