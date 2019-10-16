export function makeTextFile (text) {
  let data = new Blob([text], {type: 'text/plain'});
  return window.URL.createObjectURL(data);
};
export function outerHTML(domNode){
  return domNode.outerHTML || new XMLSerializer().serializeToString(domNode);
}
export function converter(obj) {
  let tag = "<>"
  let html = "html";
  let props = [];
  if (obj.hasOwnProperty(tag)) {
    let elObj = new Element(obj[tag], obj[html], props);
    if (isArray(obj[html])) {
      let arry = []
      obj[html].forEach(function (child) {
        arry.push(converter(child))
      })
      elObj.setChildren(arry)
    } else if (isObject(obj[html])) {
      elObj.setChildren(converter(obj[html]))
    } else if (isString(obj[html])) {
      elObj.setChildren(obj[html]);
    }
    return elObj
  } else {
    return obj;
  }
}
function Element (tag, children, props) {
  this.tag = tag;
  this.children = children;
  this.props = props;
  this.setChildren = function (child) {
    this.children = child
  }
  this.getChildren = function () {
    return this.children;
  }
}
Element.prototype.render = function () {
  let ele = document.createElement(this.tag);
  // console.log(this.children);
  let children = this.children || []
  if (isArray(children)) {
    children.forEach(function (child) {
      let childEl = child instanceof Element
        ? child.render()
        : document.createTextNode(child);
      ele.appendChild(childEl)
    })
  }
  return ele;
}
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

