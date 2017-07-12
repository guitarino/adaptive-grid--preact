/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!function() {
    'use strict';
    function VNode() {}
    function h(nodeName, attributes) {
        var lastSimple, child, simple, i, children = EMPTY_CHILDREN;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && null != attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else {
            if (child === !0 || child === !1) child = null;
            if (simple = 'function' != typeof nodeName) if (null == child) child = ''; else if ('number' == typeof child) child = String(child); else if ('string' != typeof child) simple = !1;
            if (simple && lastSimple) children[children.length - 1] += child; else if (children === EMPTY_CHILDREN) children = [ child ]; else children.push(child);
            lastSimple = simple;
        }
        var p = new VNode();
        p.nodeName = nodeName;
        p.children = children;
        p.attributes = null == attributes ? void 0 : attributes;
        p.key = null == attributes ? void 0 : attributes.key;
        if (void 0 !== options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        for (var i in props) obj[i] = props[i];
        return obj;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function enqueueRender(component) {
        if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || setTimeout)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p.__d) renderComponent(p);
    }
    function isSameNodeType(node, vnode, hydrating) {
        if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
        if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName); else return hydrating || node._componentConstructor === vnode.nodeName;
    }
    function isNamedNode(node, nodeName) {
        return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }
    function getNodeProps(vnode) {
        var props = extend({}, vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (void 0 !== defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function createNode(nodeName, isSvg) {
        var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
        node.__n = nodeName;
        return node;
    }
    function removeNode(node) {
        if (node.parentNode) node.parentNode.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('key' === name) ; else if ('ref' === name) {
            if (old) old(null);
            if (value) value(node);
        } else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if ('string' != typeof old) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && IS_NON_DIMENSIONAL.test(i) === !1 ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else node.removeEventListener(name, eventProxy, useCapture);
            (node.__l || (node.__l = {}))[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); else node.removeAttribute(name); else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this.__l[e.type](options.event && options.event(e) || e);
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
            hydrating = null != dom && !('__preactattr_' in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll, componentRoot);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll, componentRoot) {
        var out = dom, prevSvgMode = isSvgMode;
        if (null == vnode) vnode = '';
        if ('string' == typeof vnode) {
            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                out = document.createTextNode(vnode);
                if (dom) {
                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                    recollectNodeTree(dom, !0);
                }
            }
            out.__preactattr_ = !0;
            return out;
        }
        if ('function' == typeof vnode.nodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
        isSvgMode = 'svg' === vnode.nodeName ? !0 : 'foreignObject' === vnode.nodeName ? !1 : isSvgMode;
        if (!dom || !isNamedNode(dom, String(vnode.nodeName))) {
            out = createNode(String(vnode.nodeName), isSvgMode);
            if (dom) {
                while (dom.firstChild) out.appendChild(dom.firstChild);
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, !0);
            }
        }
        var fc = out.firstChild, props = out.__preactattr_ || (out.__preactattr_ = {}), vchildren = vnode.children;
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren ? vchildren.length : 0;
        if (0 !== len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child.__preactattr_, key = vlen && props ? _child._component ? _child._component.__k : props.key : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
        }
        if (0 !== vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && void 0 !== keyed[key]) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c;
                children[j] = void 0;
                if (j === childrenLen - 1) childrenLen--;
                if (j === min) min++;
                break;
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) if (child === originalChildren[i + 1]) removeNode(originalChildren[i]); else dom.insertBefore(child, originalChildren[i] || null);
        }
        if (keyedLen) for (var i in keyed) if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
        while (min <= childrenLen) if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component); else {
            if (null != node.__preactattr_ && node.__preactattr_.ref) node.__preactattr_.ref(null);
            if (unmountOnly === !1 || null == node.__preactattr_) removeNode(node);
            removeChildren(node);
        }
    }
    function removeChildren(node) {
        node = node.lastChild;
        while (node) {
            var next = node.previousSibling;
            recollectNodeTree(node, !0);
            node = next;
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name;
        (components[name] || (components[name] = [])).push(component);
    }
    function createComponent(Ctor, props, context) {
        var inst, list = components[Ctor.name];
        if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
        } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
        }
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.__b = list[i].__b;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function doRender(props, state, context) {
        return this.constructor(props, context);
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component.__x) {
            component.__x = !0;
            if (component.__r = props.ref) delete props.ref;
            if (component.__k = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.__c) component.__c = component.context;
                component.context = context;
            }
            if (!component.__p) component.__p = component.props;
            component.props = props;
            component.__x = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__r) component.__r(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component.__x) {
            var rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.__p || props, previousState = component.__s || state, previousContext = component.__c || context, isUpdate = component.base, nextBase = component.__b, initialBase = isUpdate || nextBase, initialChildComponent = component._component, skip = !1;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.__p = component.__s = component.__c = component.__b = null;
            component.__d = !1;
            if (!skip) {
                rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if ('function' == typeof childComponent) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1); else {
                        toUnmount = inst;
                        component._component = inst = createComponent(childComponent, childProps, context);
                        inst.__b = inst.__b || nextBase;
                        inst.__u = component;
                        setComponentProps(inst, childProps, 0, context, !1);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase, !1);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t.__u) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                flushMounts();
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            if (null != component.__h) while (component.__h.length) component.__h.pop().call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c.__u)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.__b) {
                c.__b = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom, !1);
            }
        }
        return dom;
    }
    function unmountComponent(component) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component.__x = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner); else if (base) {
            if (base.__preactattr_ && base.__preactattr_.ref) base.__preactattr_.ref(null);
            component.__b = base;
            removeNode(base);
            collectComponent(component);
            removeChildren(base);
        }
        if (component.__r) component.__r(null);
    }
    function Component(props, context) {
        this.__d = !0;
        this.context = context;
        this.props = props;
        this.state = this.state || {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent, !1);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var items = [];
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        setState: function(state, callback) {
            var s = this.state;
            if (!this.__s) this.__s = extend({}, s);
            extend(s, 'function' == typeof state ? state(s, this.props) : state);
            if (callback) (this.__h = this.__h || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function(callback) {
            if (callback) (this.__h = this.__h || []).push(callback);
            renderComponent(this, 2);
        },
        render: function() {}
    });
    var preact = {
        h: h,
        createElement: h,
        cloneElement: cloneElement,
        Component: Component,
        render: render,
        rerender: rerender,
        options: options
    };
    if (true) module.exports = preact; else self.preact = preact;
}();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdaptiveGrid = undefined;

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

exports.AdaptiveGridItem = AdaptiveGridItem;

var _preact = __webpack_require__(0);

var _preact2 = _interopRequireDefault(_preact);

var _resizeSensorPreact = __webpack_require__(4);

var _resizeSensorPreact2 = _interopRequireDefault(_resizeSensorPreact);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * @license MIT
   * @copyright Kirill Shestakov 2017
   * @see https://github.com/guitarino/adaptive-grid--preact/
   */

function AdaptiveGridItem(props) {
  return _preact2.default.h('div', { 'class': 'AdaptiveGridItem', style: props.childStyle }, props.children);
};

var AdaptiveGrid = exports.AdaptiveGrid = function (_preact$Component) {
  _inherits(AdaptiveGrid, _preact$Component);

  function AdaptiveGrid() {
    _classCallCheck(this, AdaptiveGrid);

    var _this = _possibleConstructorReturn(this, (AdaptiveGrid.__proto__ || Object.getPrototypeOf(AdaptiveGrid)).call(this));

    _this.state = { width: 0 };
    _this.onResize = _this.onResize.bind(_this);
    return _this;
  }

  _createClass(AdaptiveGrid, [{
    key: 'render',
    value: function render() {
      var children = this.getFilteredChildren();
      var gridStyle = {
        overflow: 'visible',
        position: 'relative'
      };
      if (this.canCalculate()) {
        var totalColumns = this.getTotalColumns();
        var colWidth = this.getColWidth(totalColumns);
        var sizes = this.getItemSizes(children, totalColumns);
        var coords = this.getItemCoordinates(children, sizes, totalColumns);
        this.applyItemStyles(children, colWidth, sizes, coords);
        gridStyle.height = this.getGridMaxHeight(children, sizes, coords) + 'px';
      } else {
        gridStyle.visibility = 'hidden';
        if (!(this.props.baseWidth > 0 && this.props.baseHeight > 0)) {
          console.error('Base width and base height should be provided and be positive');
        }
      }
      return _preact2.default.h('div', { 'class': 'AdaptiveGrid', style: gridStyle }, _preact2.default.h(_resizeSensorPreact2.default, { onResize: this.onResize }), children);
    }

    // callback from resize-sensor

  }, {
    key: 'onResize',
    value: function onResize(width) {
      if (this.state.width !== width) {
        this.setState({ width: width });
      }
    }

    // this is to ignore children that are not AdaptiveGridItem

  }, {
    key: 'getFilteredChildren',
    value: function getFilteredChildren() {
      var children = [];
      this.props.children.forEach(function (child) {
        if (child.nodeName === AdaptiveGridItem) {
          children.push(child);
        }
      });
      return children;
    }

    // if calculation can happen without error, returns true

  }, {
    key: 'canCalculate',
    value: function canCalculate() {
      return this.state.width > 0 && this.props.baseWidth > 0 && this.props.baseHeight > 0;
    }

    // also account for max columns

  }, {
    key: 'getTotalColumns',
    value: function getTotalColumns() {
      var maxColumns = this.props.maxColumns ? this.props.maxColumns : Infinity;
      return Math.max(1, Math.min(maxColumns, Math.floor(this.state.width / this.props.baseWidth)));
    }
  }, {
    key: 'getColWidth',
    value: function getColWidth(totalColumns) {
      return this.state.width / totalColumns;
    }
  }, {
    key: 'getItemSizes',
    value: function getItemSizes(children, totalColumns) {
      var _this2 = this;

      return children.map(function (child) {
        var width = _this2.props.baseWidth;
        var height = _this2.props.baseHeight;
        if (child.attributes) {
          if (child.attributes.minWidth) {
            width = child.attributes.minWidth;
          }
          if (child.attributes.minHeight) {
            height = child.attributes.minHeight;
          }
        }
        return [Math.min(totalColumns, Math.ceil(width / _this2.props.baseWidth)), Math.ceil(height / _this2.props.baseHeight)];
      });
    }
  }, {
    key: 'getItemCoordinates',
    value: function getItemCoordinates(children, sizes, totalColumns) {
      var remainingElements = [].slice.call(children);
      // remainingElementsIds is in sync with remainingElements so that
      // we don't have to search for indeces every time
      var remainingElementsIds = Object.keys(children);
      var coords = [];
      var row = 0;
      var boundaries = []; // array for boundaries of current grid items
      // filling up the grid and removing remainingElements until none left
      while (remainingElements.length) {
        for (var col = 0; col < totalColumns; col++) {
          for (var elId = 0; elId < remainingElements.length; elId++) {
            var childId = remainingElementsIds[elId];

            var _sizes$childId = _slicedToArray(sizes[childId], 2),
                cols = _sizes$childId[0],
                rows = _sizes$childId[1];
            // if not exceeding the boundary


            if (col + cols <= totalColumns) {
              // and if other items are not in the way
              if (!isFilled(col, row, col + cols, row + rows, boundaries)) {
                // then the current item can claim those coordinates
                coords[childId] = [col, row];
                // and, don't forget to update the filled space
                doFill(col, row, col + cols, row + rows, boundaries);
                // now, there's 1 less item remaining
                remainingElements.splice(elId, 1);
                remainingElementsIds.splice(elId, 1);
                elId--; // since we removed an element, we gotta go back by 1 id
                break;
              }
            }
          }
        }
        row++;
      }
      return coords;
    }
  }, {
    key: 'applyItemStyles',
    value: function applyItemStyles(children, colWidth, sizes, coords) {
      var _this3 = this;

      children.forEach(function (child, i) {
        if (!child.attributes) {
          child.attributes = {};
        }
        child.attributes.childStyle = {
          position: 'absolute',
          left: coords[i][0] * colWidth + 'px',
          top: coords[i][1] * _this3.props.baseHeight + 'px',
          width: sizes[i][0] * colWidth + 'px',
          height: sizes[i][1] * _this3.props.baseHeight + 'px'
        };
      });
    }
  }, {
    key: 'getGridMaxHeight',
    value: function getGridMaxHeight(children, sizes, coords) {
      var maxRow = 0;
      children.forEach(function (child, i) {
        var _coords$i = _slicedToArray(coords[i], 2),
            col = _coords$i[0],
            row = _coords$i[1];

        var _sizes$i = _slicedToArray(sizes[i], 2),
            cols = _sizes$i[0],
            rows = _sizes$i[1];

        if (row + rows > maxRow) {
          maxRow = row + rows;
        }
      });
      return maxRow * this.props.baseHeight;
    }
  }]);

  return AdaptiveGrid;
}(_preact2.default.Component);

// checks if the provided coordinates and sizes for an item
// will overlap with currently placed items


function isFilled(colStart, rowStart, colEnd, rowEnd, arr) {
  var isFilled = false;
  arr.forEach(function (borders) {
    var _borders = _slicedToArray(borders, 4),
        colStart2 = _borders[0],
        rowStart2 = _borders[1],
        colEnd2 = _borders[2],
        rowEnd2 = _borders[3];

    if (colStart < colEnd2 && colEnd > colStart2 && rowEnd2 > rowStart && rowStart2 < rowEnd) {
      isFilled = true;
      return false;
    }
  });
  return isFilled;
}

// adds provided coordinates and sizes as a currently placed item
function doFill(colStart, rowStart, colEnd, rowEnd, arr) {
  arr.push([colStart, rowStart, colEnd, rowEnd]);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _preact2 = _interopRequireDefault(_preact);

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Kirill Shestakov 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see https://github.com/guitarino/resize-sensor--preact/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ----
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Rework of https://github.com/procurios/ResizeSensor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var
// this is for ie9
supportsAttachEvent,

// animation start events with varied prefixes
animStart = ['webkitAnimationStart', 'animationstart', 'oAnimationStart', 'MSAnimationStart'];

try {
  supportsAttachEvent = 'attachEvent' in document;
} catch (probablyDoingSSR) {
  supportsAttachEvent = false;
}

// essentially, this is the idea:
//
//   we have contraction and expansion triggers,
//   each of them have children
//
//   for contraction:
//     the child is 2x bigger than container,
//     and it's always scrolled to the bottom right,
//     so, when contracted, the bottom right scroll
//     position changes, and the 'scroll' event gets called
//
//   for expansion:
//     the child is slightly bigger than container,
//     and it's always scrolled to the bottom right,
//     so, when the container expands, the scrollbar
//     disappears and changes the child's scroll position
//

var ResizeSensor = function (_preact$Component) {
  _inherits(ResizeSensor, _preact$Component);

  function ResizeSensor() {
    _classCallCheck(this, ResizeSensor);

    // when invisible, <ResizeSensor/> size is 0x0
    var _this = _possibleConstructorReturn(this, (ResizeSensor.__proto__ || Object.getPrototypeOf(ResizeSensor)).call(this));

    _this.dimensions = {
      width: 0,
      height: 0
    };
    // binding (needed for requestAnimationFrame callback)
    _this.onElementResize = _this.onElementResize.bind(_this);
    return _this;
  }

  // as you can see, there's triggers that "listen" to expansion
  // and triggers that "listen" to contraction


  _createClass(ResizeSensor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _preact2.default.h(
        'div',
        { 'class': 'resize-sensor-preact', ref: function ref(e) {
            _this2.self = e;
          } },
        _preact2.default.h(
          'div',
          { 'class': 'resize-sensor-preact__expand', ref: function ref(e) {
              _this2.expand = e;
            } },
          _preact2.default.h('div', { 'class': 'resize-sensor-preact__expand-child', ref: function ref(e) {
              _this2.expandChild = e;
            } })
        ),
        _preact2.default.h(
          'div',
          { 'class': 'resize-sensor-preact__contract', ref: function ref(e) {
              _this2.contract = e;
            } },
          _preact2.default.h('div', { 'class': 'resize-sensor-preact__contract-child' })
        )
      );
    }

    // never update element, just render once

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }

    // overriding onResize if props are updated

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setOnResize(props);
    }

    // when component is mounted, we just need to attach handlers
    // scroll - needed for detecting resize
    // animation start - needed detecting visibility (we need to
    //   trigger initial update once the element becomes visible
    //   because the size might have changed)
    //
    // Note: using addEventListener's ability to trigger `handleEvent`
    //       so that we don't have to deal with binding

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setOnResize(this.props);
      // ie9 only
      if (supportsAttachEvent) {
        this.self.attachEvent('onresize', this.onElementResize);
      }
      // other browsers
      else {
          this.self.addEventListener('scroll', this, true);
          for (var i = 0; i < animStart.length; i++) {
            this.self.addEventListener(animStart[i], this);
          }
          // Initial value reset of all triggers
          this.resetTriggers();
        }
    }

    // When element is unmounted, need to remove all

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // ie9 only
      if (supportsAttachEvent) {
        this.self.detachEvent('onresize', this.onElementResize);
      }
      // other browsers
      else {
          for (var i = 0; i < animStart.length; i++) {
            this.self.removeEventListener(animStart[i], this);
          }
          this.self.removeEventListener('scroll', this, true);
        }
    }

    // if there's no 'onResize' prop, then we'll fall back
    // to this onResize, which will do nothing

  }, {
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'setOnResize',
    value: function setOnResize(props) {
      if ('onResize' in props) {
        this.onResize = props.onResize;
      }
    }

    // using addEventListener's handleEvent ability
    // so that we don't have to deal with binding

  }, {
    key: 'handleEvent',
    value: function handleEvent(e) {
      // on scroll, debounce-ish
      if (e.type === 'scroll') {
        this.resetTriggers();
        if (this.resizeRAF) {
          window.cancelAnimationFrame(this.resizeRAF);
        }
        this.resizeRAF = window.requestAnimationFrame(this.onElementResize);
      }
      // when element becomes visible, reset the trigger sizes;
      // the scroll will be triggered if sizes changed
      else {
          if (e.animationName === 'resize-sensor-preact-animation') {
            this.resetTriggers();
          }
        }
    }

    // check if actually resized, call the callback

  }, {
    key: 'onElementResize',
    value: function onElementResize() {
      var currentDimensions = this.getDimensions();
      if (this.isResized(currentDimensions)) {
        this.dimensions.width = currentDimensions.width;
        this.dimensions.height = currentDimensions.height;
        this.onResize(this.dimensions.width, this.dimensions.height);
      }
    }

    // just checking if either dimension changed

  }, {
    key: 'isResized',
    value: function isResized(currentDimensions) {
      return currentDimensions.width !== this.dimensions.width || currentDimensions.height !== this.dimensions.height;
    }

    // returning current dimensions of the resize sensor

  }, {
    key: 'getDimensions',
    value: function getDimensions() {
      return {
        width: this.self.offsetWidth,
        height: this.self.offsetHeight
      };
    }

    // this implements the idea behind resize sensor

  }, {
    key: 'resetTriggers',
    value: function resetTriggers() {
      this.contract.scrollLeft = this.contract.scrollWidth;
      this.contract.scrollTop = this.contract.scrollHeight;
      this.expandChild.style.width = this.expand.offsetWidth + 1 + 'px';
      this.expandChild.style.height = this.expand.offsetHeight + 1 + 'px';
      this.expand.scrollLeft = this.expand.scrollWidth;
      this.expand.scrollTop = this.expand.scrollHeight;
    }
  }]);

  return ResizeSensor;
}(_preact2.default.Component);

exports.default = ResizeSensor;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function (g) {
  'use strict';

  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !g.requestAnimationFrame; ++x) {
    g.requestAnimationFrame = g[vendors[x] + 'RequestAnimationFrame'];
    g.cancelAnimationFrame = g[vendors[x] + 'CancelAnimationFrame'] || g[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!g.requestAnimationFrame) g.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = g.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  if (!g.cancelAnimationFrame) g.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})(undefined && undefined.window || global);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./resize-sensor.css", function() {
			var newContent = require("!!../../css-loader/index.js!./resize-sensor.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".resize-sensor-preact,\r\n.resize-sensor-preact > div,\r\n.resize-sensor-preact .resize-sensor-preact__contract-child {\r\n  display: block;\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  height: 100%;\r\n  width: 100%;\r\n  opacity: 0;\r\n  overflow: hidden;\r\n  pointer-events: none;\r\n  z-index: -1;\r\n}\r\n.resize-sensor-preact {\r\n  background: #eee;\r\n  overflow: auto;\r\n  direction: ltr; /* otherwise not working when direction: rtl - bug in chrome */\r\n}\r\n.resize-sensor-preact .resize-sensor-preact__contract-child {\r\n  width: 200%;\r\n  height: 200%;\r\n}\r\n@-webkit-keyframes resize-sensor-preact-animation {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n@keyframes resize-sensor-preact-animation {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n/* This is needed to trigger resizing\r\n   once the element becomes visible */\r\n.resize-sensor-preact {\r\n  -webkit-animation-name: resize-sensor-preact-animation;\r\n          animation-name: resize-sensor-preact-animation;\r\n  -webkit-animation-duration: 1ms;\r\n          animation-duration: 1ms;\r\n}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(15);

__webpack_require__(7);

__webpack_require__(16);

document.addEventListener('DOMContentLoaded', function () {
  (0, _App.renderApp)(document.getElementById('preact-root'));
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.renderApp = renderApp;

var _preact = __webpack_require__(0);

var _preact2 = _interopRequireDefault(_preact);

var _adaptiveGrid = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function Card(props) {
  return _preact2.default.h(
    'div',
    { 'class': 'Card' },
    _preact2.default.h(
      'div',
      { 'class': 'Card__container' },
      _preact2.default.h('div', { 'class': 'Card__centering' }),
      _preact2.default.h(
        'div',
        { 'class': 'Card__content' },
        props.children
      )
    )
  );
};

var defaultBaseWidth = 300;
var defaultBaseHeight = 200;
var defaultMaxColumns = 8;

var App = function (_preact$Component) {
  _inherits(App, _preact$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.onChangeBaseWidth = _this.onChangeBaseWidth.bind(_this);
    _this.onChangeBaseHeight = _this.onChangeBaseHeight.bind(_this);
    _this.onChangeMaxColumns = _this.onChangeMaxColumns.bind(_this);
    _this.updateItem = _this.updateItem.bind(_this);
    _this.removeItem = _this.removeItem.bind(_this);
    _this.addItem = _this.addItem.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.state = {
        baseWidth: defaultBaseWidth,
        baseHeight: defaultBaseHeight,
        maxColumns: defaultMaxColumns,
        items: [{}, {}, {
          minWidth: 2 * defaultBaseWidth,
          minHeight: 2 * defaultBaseHeight
        }, {
          minWidth: 2 * defaultBaseWidth
        }, {
          minWidth: 2 * defaultBaseWidth,
          minHeight: 2 * defaultBaseHeight
        }, {
          minWidth: 2 * defaultBaseWidth
        }, {}, {}]
      };
    }
  }, {
    key: 'onChangeBaseWidth',
    value: function onChangeBaseWidth(e) {
      var w = Number(e.currentTarget.value);
      if (this.state.baseWidth !== w) {
        this.state.baseWidth = w > 0 ? w : defaultBaseWidth;
        this.forceUpdate();
      }
    }
  }, {
    key: 'onChangeBaseHeight',
    value: function onChangeBaseHeight(e) {
      var h = Number(e.currentTarget.value);
      if (this.state.baseHeight !== h) {
        this.state.baseHeight = h > 0 ? h : defaultBaseHeight;
        this.forceUpdate();
      }
    }
  }, {
    key: 'onChangeMaxColumns',
    value: function onChangeMaxColumns(e) {
      var mc = Number(e.currentTarget.value);
      if (this.state.maxColumns !== mc) {
        this.state.maxColumns = mc > 0 ? mc : defaultMaxColumns;
        this.forceUpdate();
      }
    }
  }, {
    key: 'updateItem',
    value: function updateItem(item) {
      var self = this;
      return function (e) {
        e.preventDefault();
        var form = e.currentTarget;

        var _form$elements = _slicedToArray(form.elements, 2),
            inputMinWidth = _form$elements[0],
            inputMinHeight = _form$elements[1];

        var minWidth = Number(inputMinWidth.value);
        var minHeight = Number(inputMinHeight.value);
        if (item.minWidth !== minWidth || item.minHeight !== minHeight) {
          if (minWidth > 0) {
            item.minWidth = minWidth;
          } else {
            delete item.minWidth;
          }
          if (minHeight > 0) {
            item.minHeight = minHeight;
          } else {
            delete item.minHeight;
          }
          self.forceUpdate();
        }
      };
    }
  }, {
    key: 'removeItem',
    value: function removeItem(index) {
      var self = this;
      return function () {
        self.state.items.splice(index, 1);
        self.forceUpdate();
      };
    }
  }, {
    key: 'addItem',
    value: function addItem() {
      this.state.items.push({});
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _preact2.default.h(
        'div',
        { 'class': 'App' },
        _preact2.default.h(
          'div',
          null,
          _preact2.default.h(
            'a',
            { href: 'index.html' },
            'Read-only grid'
          )
        ),
        _preact2.default.h(
          'dl',
          { 'class': 'App__baseVals' },
          _preact2.default.h(
            'dt',
            null,
            'Base width'
          ),
          _preact2.default.h(
            'dd',
            null,
            _preact2.default.h('input', {
              value: this.state.baseWidth,
              onChange: this.onChangeBaseWidth
            })
          ),
          _preact2.default.h(
            'dt',
            null,
            'Base height'
          ),
          _preact2.default.h(
            'dd',
            null,
            _preact2.default.h('input', {
              value: this.state.baseHeight,
              onChange: this.onChangeBaseHeight
            })
          ),
          _preact2.default.h(
            'dt',
            null,
            'Max columns'
          ),
          _preact2.default.h(
            'dd',
            null,
            _preact2.default.h('input', {
              value: this.state.maxColumns,
              onChange: this.onChangeMaxColumns
            })
          )
        ),
        _preact2.default.h(
          _adaptiveGrid.AdaptiveGrid,
          {
            baseWidth: this.state.baseWidth,
            baseHeight: this.state.baseHeight,
            maxColumns: this.state.maxColumns
          },
          this.state.items.map(function (item, i) {
            return _preact2.default.h(
              _adaptiveGrid.AdaptiveGridItem,
              item,
              _preact2.default.h(
                Card,
                null,
                _preact2.default.h(
                  'form',
                  {
                    onSubmit: _this2.updateItem(item)
                  },
                  _preact2.default.h(
                    'dl',
                    null,
                    _preact2.default.h(
                      'dd',
                      null,
                      'Index: ',
                      i
                    ),
                    _preact2.default.h(
                      'dt',
                      null,
                      'Min Width'
                    ),
                    _preact2.default.h(
                      'dd',
                      null,
                      _preact2.default.h('input', {
                        value: item.minWidth !== undefined ? item.minWidth : ""
                      })
                    ),
                    _preact2.default.h(
                      'dt',
                      null,
                      'Min Height'
                    ),
                    _preact2.default.h(
                      'dd',
                      null,
                      _preact2.default.h('input', {
                        value: item.minHeight !== undefined ? item.minHeight : ""
                      })
                    )
                  ),
                  _preact2.default.h(
                    'button',
                    { type: 'submit' },
                    'Change'
                  ),
                  _preact2.default.h(
                    'button',
                    { onClick: _this2.removeItem(i) },
                    'Remove'
                  )
                )
              )
            );
          })
        ),
        _preact2.default.h(
          'div',
          { 'class': 'App__AddNewItem' },
          _preact2.default.h(
            Card,
            null,
            _preact2.default.h(
              'button',
              { onClick: this.addItem },
              'Add New Grid Item'
            )
          )
        )
      );
    }
  }]);

  return App;
}(_preact2.default.Component);

exports.default = App;
;

function renderApp(where) {
  _preact2.default.render(_preact2.default.h(App, null), where);
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./App.Builder.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./App.Builder.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "body, body * {\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  overflow-y: scroll;\r\n}\r\n\r\n.App {\r\n  position: relative;\r\n}\r\n\r\n.Card {\r\n  display: inline-block;\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 15px;\r\n}\r\n\r\n.Card__centering {\r\n  height: 100%;\r\n}\r\n\r\n.Card__centering,\r\n.Card__content {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n\r\n.App__baseVals {\r\n  padding: 15px;\r\n}\r\n\r\n.Card__container {\r\n  display: inline-block;\r\n  padding: 15px;\r\n  text-align: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 3px;\r\n  background: #3e2b50;\r\n  color: white;\r\n  box-shadow: 5px 6px 9px 0px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n  overflow: auto;\r\n}\r\n\r\n.App dl,\r\n.App dt,\r\n.App dd {\r\n  margin: 0;\r\n}\r\n\r\n.App__AddNewItem {\r\n  display: inline-block;\r\n  width: 200px;\r\n  height: 100px;\r\n  max-width: 100%;\r\n}", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=builder.js.map