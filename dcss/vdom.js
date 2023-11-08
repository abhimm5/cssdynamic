
 // Utility function to set attributes on an element
    export    const setAttributes = ($el, attrs) => {
            for (const [attr, value] of Object.entries(attrs)) {
                $el.setAttribute(attr, value);
            }
        };

        // Create a virtual DOM element
    export    const createElement = (tagName, { attrs = {}, children = [] } = {}) => ({
            tagName,
            attrs,
            children,
        });

        // Render a virtual DOM element
    export    const renderElement = ({ tagName, attrs, children }) => {
            const $el = document.createElement(tagName);
            setAttributes($el, attrs);

            for (const child of children) {
                $el.appendChild(render(child));
            }

            return $el;
        };

        // Render a virtual DOM node
    export    const render = (vNode) => {
            if (typeof vNode === 'string') {
                return document.createTextNode(vNode);
            }

            return renderElement(vNode);
        };

        // Replace a target node with a new node
    export    const replaceNode = ($node, $target) => {
            $target.replaceWith($node);
            return $node;
        };

        // Apply an array of patches to a parent node
    export    const applyPatches = ($parent, patches) => {
            patches.forEach(patch => patch($parent));
        };

    export    const zip = (xs, ys) => xs.map((x, i) => [x, ys[i]]);

        // Diff attributes between old and new nodes
    export    const diffAttrs = (oldAttrs, newAttrs) => {
            const patches = [];

            // Convert oldAttrs to a Set for efficient removal check
            const oldAttrSet = new Set(Object.keys(oldAttrs));

            for (const [attr, value] of Object.entries(newAttrs)) {
                if (oldAttrs[attr] !== value) {
                    patches.push($node => {
                        $node.setAttribute(attr, value);
                    });
                }

                // Remove attribute from the set
                oldAttrSet.delete(attr);
            }

            // Remove old attributes
            for (const attrToRemove of oldAttrSet) {
                patches.push($node => {
                    $node.removeAttribute(attrToRemove);
                });
            }

            return $node => patches.forEach(patch => patch($node));
        };

        // Diff children between old and new nodes
    export    const diffChildren = (oldChildren, newChildren) => {
            const childPatches = oldChildren.map((oldChild, i) => diff(oldChild, newChildren[i]));

            const additionalPatches = newChildren.slice(oldChildren.length).map(newChild => $node => {
                $node.appendChild(render(newChild));
            });

            return $parent => {
                zip(childPatches, Array.from($parent.childNodes)).forEach(([patch, child]) => patch(child));

                additionalPatches.forEach(patch => patch($parent));
            };
        };

        // Diff old and new nodes
    export    const diff = (oldNode, newNode) => {
            if (newNode === undefined) {
                return $node => $node.remove();
            }

            if (typeof oldNode === 'string' || typeof newNode === 'string') {
                if (oldNode !== newNode) {
                    return $node => {
                        const $newNode = render(newNode);
                        $node.replaceWith($newNode);
                    };
                } else {
                    return () => {};
                }
            }

            if (oldNode.tagName !== newNode.tagName) {
                return $node => {
                    const $newNode = render(newNode);
                    $node.replaceWith($newNode);
                };
            }

            const patchAttrs = diffAttrs(oldNode.attrs, newNode.attrs);
            const patchChildren = diffChildren(oldNode.children, newNode.children);

            return $node => {
                patchAttrs($node);
                patchChildren($node);
            };
        };

        // Apply an optimized patch to the parent node
    export    const applyOptimizedPatch = ($parent, oldNode, newNode) => {
            const patch = diff(oldNode, newNode);
            patch($parent);
           
        };