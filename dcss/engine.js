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


import {
    findObjectByKey,
    findElementByTagName,
    findElementBySelector,
    htmlToVNode,
    createNestedStructure,
    binder,
    splitIdentifier,
    parseAttributes,
    processAttributesAndStyles,
    applyPseudoClass

} from './assests.js';

export let bk 

let initialVApp 
let updatedVApp

export function start(input){

    // Create a Nearley parser using the grammar from the external file
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    // Parse the input using the generated parser
    try {

      parser.feed(input);
      const result = parser.results[0];
      //console.log(result);
      if(result==undefined){
        const error = new Error();
       error.stack = " Parser error : code 1 check if you missing ';' semicolon at last line."; 
       throw error;
      }

    let root
    let count  
    if(Array.isArray(result[0])){
        root = result[0]
        count = 1
    }
    else{
        count = 0
        root = []
    }


const page = document

for (let i = count; i < result.length; i++) {
    const current = result[i];

    current.identifier = current.identifier.map(item =>
        typeof item === "object" ? binder(item, "string", root) : item
    );

    if (current?.style?.binder) {
        current.style = binder(current.style, "styling", root);
    }

    if (current?.value?.binder) {
        current.value = binder(current.value, "string",root);
    }


    let startApp = splitIdentifier(current.identifier)
    const attrArray = current.attribute || [];
    const attrObject = parseAttributes(attrArray);
    startApp.attrs = { ...attrObject };
    startApp.children = [];
    processAttributesAndStyles(current,startApp)
    let app = createElement(startApp.tagName,{attrs:startApp.attrs,children:startApp.children} )
    bk = app;
    startApp.elementsSplit.pop();


    if (startApp.split.length === 2) {
        const target = startApp.split[0];
        const vnode = htmlToVNode(page.documentElement.outerHTML);

        if (!initialVApp) {
            initialVApp = [vnode];
        }

        const footerElement = findElementBySelector(initialVApp[0], target);
        if (footerElement) {
            const lastElement = createNestedStructure(startApp.elementsSplit)[0];
            footerElement.children = footerElement.children || [];
            footerElement.children.push(lastElement);
            applyOptimizedPatch(page.querySelector(target), initialVApp, footerElement);
        } else {
            throwError(`${target} not found.`);
        }
    } else if (startApp.split.length === 1) {
        const inputString = startApp.split[0];
        const resultArray = inputString.split(/[.#]/);
        if(resultArray.length > 1){
            applyPseudoClass(current, current.identifier, root, initialVApp, page, current.style,current.identifier)
        }
        if(resultArray.length == 1){
            initialVApp = createNestedStructure(startApp.elementsSplit);
            const $initialApp = render(initialVApp[0]);
            replaceNode($initialApp, page.querySelector('html'));  
        }
    }

    if (current.pseudoClass) {
        const selector = current.identifier.map(item => item.replace(/\+/g, '>'));
        if (!selector) {
            const error = new Error();
            error.stack = " cannot process selector --" + current.identifier;
            throw error;
        } else {
            if (selector) {
                applyPseudoClass(current, selector, root, initialVApp, page, current.pseudoClass[1],current.pseudoClass)
            }
        }
    }
}
console.log(initialVApp)
    } catch (error) {
      console.error(error);
    }
}