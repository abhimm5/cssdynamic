import { bk } from './engine.js'
import {
    setAttributes,
    createElement,
    renderElement,
    render,
    replaceNode,
    applyPatches,
    zip,
    diffAttrs,
    diffChildren,
    diff,
    applyOptimizedPatch
}  from './vdom.js';

export const findObjectByKey = (array, key) => {
    for (const item of array) {
        if (item.key === key || item.key.identifier === key[0]) {
            if (item.type === "closure") {
                const values = key[1];
                const mapping = Object.fromEntries(item.key.parameter.map((param, index) => [param, values[index]]));
                const styling = item.value.reduce((result, item) => {
                    if (item.type !== "return") {
                        result[item.key] = mapping[item.value] || item.value;
                    }
                    return result;
                }, {});

                item.value = styling;

                return item;
            }
            return item;
        }
    }
    return null;
};

export const findElementByTagName = (element, targetTagName) => {
    if (element && element.tagName === targetTagName) {
        return element;
    }

    if (element && element.children) {
        for (const child of element.children) {
            const foundElement = findElementByTagName(child, targetTagName);
            if (foundElement) {
                return foundElement;
            }
        }
    }    
    return null;
};


export const findElementBySelector = (element, selector) => {
    const parts = selector.split('>').map(part => part.trim());

    let currentElement = element;

    for (const part of parts) {

        currentElement = findElementByTagName(currentElement, part);
        //console.log(currentElement)
        if (!currentElement) {
            return null;
        }
    }

    return currentElement;
};

export const htmlToVNode = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    function createVNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const trimmedContent = node.textContent.trim();
            return trimmedContent.length > 0 ? trimmedContent : null;
        } else if (node.nodeType !== Node.ELEMENT_NODE) {
            return null; // Skip other node types
        }

        const tagName = node.tagName.toLowerCase();
        const attrs = {};
        for (const attr of node.attributes) {
            attrs[attr.name] = attr.value;
        }
        const children = Array.from(node.childNodes)
            .map(createVNode)
            .filter(child => child !== null); // Filter out null children
        return {
            tagName,
            attrs,
            children
        };
    }

    return createVNode(doc.documentElement);
};


export const createNestedStructure = (tagNames) => {
    if (tagNames.length === 0) {
        return [bk];
    }
    const tagName = tagNames[0];
    const restTagNames = tagNames.slice(1);

    return [
        createElement(tagName, {
            children: createNestedStructure(restTagNames),
        }),
    ];
};

export const binder = (findObject, type, root) => {
    const checkstyle = findObjectByKey(root, findObject.binder);
    if (checkstyle) {
        if (checkstyle.type === type || checkstyle.type === "closure") {
            return checkstyle.value;
        } else {
            const error = new Error();
            error.stack = `--${findObject.binder} is not ${type}`;
            throw error;
        }
    } else {
        const error = new Error();
        error.stack = `--${findObject.binder} is undefined`;
        throw error;
    }
};

export function splitIdentifier(main){
    const identifier = main.join("");
    const split = identifier.split("+");
    const lastof = split[split.length - 1];
    const elementsSplit = lastof.split(">");
    const tagName = elementsSplit[elementsSplit.length - 1];
    return {split:split,tagName:tagName,elementsSplit:elementsSplit}
}

export function parseAttributes(attributeArray) {
    return attributeArray.reduce((obj, attr) => {
        const [key, value] = attr.split('=');
        obj[key.trim()] = value.replace(/"/g, '').trim();
        return obj;
    }, {});
}

export function processAttributesAndStyles(current, app) {
    if (current.attname) {
        app.attrs[current.attname] = current.attvalue;
    }

    if (current.style) {
        const cssObject = current.style;
        for (const key in cssObject) {
            if (cssObject.hasOwnProperty(key) && cssObject[key] === undefined) {
                delete cssObject[key];
            }
        }
        app.attrs.style = Object.entries(cssObject)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');
    }

     if (current.value) {
        app.children[0] = current.value;
    }

  
}

export function applyPseudoClass(current, selector, root, initialVApp, page, style, whole ) {
  let cssObject = style;

  if (cssObject.hasOwnProperty("binder")) {
    cssObject = binder(current.pseudoClass[1], "styling", root);
  }

  const cssString = Object.entries(cssObject)
    .filter(([property, value]) => value !== undefined)
    .map(([property, value]) => `${property}: ${value}!important;`)
    .join('\n');

  const styleTag = page.querySelector("style");

  if (styleTag) {
    const selectorAttrs = current.attribute
      ? selector.concat(`[${current.attribute}]`)
      : selector;
      //console.log(current.pseudoClass,selector)
    let pseudoStyle 
    const hasObject = arr => arr.some(item => typeof item === 'object');



    if(whole.some(item => typeof item === 'object')){


       pseudoStyle = selectorAttrs.join("") + current.pseudoClass[0] + "{" + cssString + "}";
       
        //console.log(pseudoStyle)
    }
    else{
         pseudoStyle = selector.join("") + "{" + cssString + "}";
        //console.log(pseudoStyle)
    } 
    const footerElement = findElementBySelector(initialVApp[0], "style");
    footerElement.children.push(pseudoStyle);
    
    applyOptimizedPatch(page.querySelector("style"), initialVApp, footerElement);
  } else {
    console.warn("Style tag not found; pseudo class/element cannot be injected!");
  }
}