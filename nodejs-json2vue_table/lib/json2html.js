function makeTextFile (text) {
  let data = new Blob([text], {type: 'text/plain'});
  return window.URL.createObjectURL(data);
};
function outerHTML(domNode){
  return domNode.outerHTML || new XMLSerializer().serializeToString(domNode);
}
function converter(obj) {
  let tag = "<>"
  let html = "html";
  let props = {};
  if (obj.hasOwnProperty(tag)) {
    Object.keys(obj).filter((item) => item != tag && item != html ).forEach((prop) => {
      props[prop] = obj[prop];
    });
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
  this.setProps = function (props) {
    this.props = props
  }
  this.getProps = function () {
    return this.props;
  }
}
Element.prototype.render = function () {
  let ele = document.createElement(this.tag);
  let props = this.props;
  for (let propName in props) {
    ele.setAttribute(propName, props[propName])
  }
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
Element.prototype.nodejsRender = function () {
  let ele = '<' + this.tag + '>\n';
  let props = this.props;
  let propStr = '';
  for (let propName in props) {
    propStr += (' ' + propName + '=\"' + props[propName] + '\" ');
  }
  //插入属性
  ele = ele.replace(/(<{1})([^<|>]+)(>{1})/, function ($1, $2, $3, $4) {
    return $2 + $3 + propStr + $4;
  })

  let children = this.children || []
  if (isArray(children)) {
    children.forEach(function (child) {
      let childEl = child instanceof Element
          ? child.nodejsRender()
          : child;
      ele+=childEl
    })
  }
  ele += '</' + this.tag + '>\n'
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

module.exports = {
  makeTextFile,
  converter,
  outerHTML,
}

