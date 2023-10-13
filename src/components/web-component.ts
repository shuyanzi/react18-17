
// 创建
var evt = document.createEvent("HTMLEvents");
// 初始化
evt.initEvent("alert", false, false);
 
// 触发, 即弹出文字
// dom.dispatchEvent(evt);

class MiniProgram extends HTMLElement {
  dataName = "miniProgram";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    // 获取属性和回调函数
    const changeCallback = this.getAttribute('onChange');
    const dataName = this.getAttribute('dataname');
    this.dataName = `${dataName}`;
    console.log('changeCallback', changeCallback);
    console.log('dataName', dataName, this.getAttributeNames());
    console.log('this', this.attributes?.getNamedItem("data-name")?.value);
    this.onchange = this.onChange.bind(this);
    // this.checkEvent = new CustomEvent("check", {
    //   bubbles: true,
    //   cancelable: false,
    //   composed: true
    // });
  }

  onChange(value: any) {
    console.log('onchange', value);
  }

  handleInputChange(value: any) {
    console.log(value);
    const changeEvent = new CustomEvent('change', { detail: 'inputValue' });
    // this.shadowRoot!.dispatchEvent(evt);
    // this.shadowRoot!.dispatchEvent(changeEvent);
    this.dispatchEvent(changeEvent);
    console.log(this);
  }
  connectedCallback(){
    console.log('this', this.attributes?.getNamedItem("data-name")?.value);
    this.addEventListener("change", function (e) {
        console.log('listend to change event');
        console.log(e);
    });
   }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid #ccc;
          padding: 16px;
        }
      </style>
      <slot name="title"></slot>
      <slot name="content"></slot>
      <slot name="button" id="button"></slot>
    `;
    console.log('12321312', this.dataName)
    this.shadowRoot!.getElementById("button")!.innerHTML = this.dataName;

    this.shadowRoot!.getElementById("button")!.addEventListener("click", () => {
      this.handleInputChange('Button clicked!');
    });
  }
}

// 注册自定义元素
customElements.define("mini-program", MiniProgram);

declare global {
  namespace JSX {
    // interface IntrinsicElements {
    //   'mini-program': React.DetailedHTMLProps<
    //     React.HTMLAttributes<HTMLElement>,
    //     HTMLElement
    //   >;
    // }
    interface IntrinsicElements {
      "mini-program": SwitchTab;
    }
    interface SwitchTab {
      dataName?: string;
      list?: any;
      onChange?: (tab: any) => void;
      children?: unknown;
    }
  }
}

export { }