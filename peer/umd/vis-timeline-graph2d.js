/**
 * vis-timeline and vis-graph2d
 * https://visjs.github.io/vis-timeline/
 *
 * Create a fully customizable, interactive timeline with items and ranges.
 *
 * @version 0.0.0-no-version
 * @date    2020-12-06T02:10:01.463Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('moment'), require('vis-data/peer/umd/vis-data.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'moment', 'vis-data/peer/umd/vis-data.js'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vis = global.vis || {}, global.moment, global.vis));
}(this, (function (exports, moment$3, esnext) {
	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment$3);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	function () {
	  return this;
	}() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
	  f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
	  f: f$1
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var path = {};

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var functionBindContext = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 0:
	      return function () {
	        return fn.call(that);
	      };

	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
	  f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0:
	          return new NativeConstructor();

	        case 1:
	          return new NativeConstructor(a);

	        case 2:
	          return new NativeConstructor(a, b);
	      }

	      return new NativeConstructor(a, b, c);
	    }

	    return NativeConstructor.apply(this, arguments);
	  };

	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};
	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/


	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;
	  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;
	  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
	  var targetPrototype = target.prototype;
	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

	    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);
	    targetProperty = target[key];
	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key]; // export native or implementation

	    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

	    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global_1); // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
	      else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty); // default case
	        else resultProperty = sourceProperty; // add a flag to not completely full polyfills

	    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

	      if (!has(path, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
	      } // export virtual prototype methods


	      path[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var hiddenKeys = {};

	var indexOf = arrayIncludes.indexOf;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	// https://tc39.github.io/ecma262/#sec-object.keys

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var shared = createCommonjsModule(function (module) {
	  (module.exports = function (key, value) {
	    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: '3.8.0',
	    mode:  'pure' ,
	    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () {
	  /* empty */
	};

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak

	  return temp;
	}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	}; // Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug


	var activeXDocument;

	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;

	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true; // `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();

	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var slice = [].slice;
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func


	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  }

	  return factories[argsLength](C, args);
	}; // `Function.prototype.bind` method implementation
	// https://tc39.github.io/ecma262/#sec-function.prototype.bind


	var functionBind = Function.bind || function bind(that
	/* , ...args */
	) {
	  var fn = aFunction(this);
	  var partArgs = slice.call(arguments, 1);

	  var boundFunction = function bound()
	  /* args... */
	  {
	    var args = partArgs.concat(slice.call(arguments));
	    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
	  };

	  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	var nativeConstruct = getBuiltIn('Reflect', 'construct'); // `Reflect.construct` method
	// https://tc39.github.io/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it

	var NEW_TARGET_BUG = fails(function () {
	  function F() {
	    /* empty */
	  }

	  return !(nativeConstruct(function () {
	    /* empty */
	  }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  nativeConstruct(function () {
	    /* empty */
	  });
	});
	var FORCED = NEW_TARGET_BUG || ARGS_BUG;
	_export({
	  target: 'Reflect',
	  stat: true,
	  forced: FORCED,
	  sham: FORCED
	}, {
	  construct: function construct(Target, args
	  /* , newTarget */
	  ) {
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);

	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0:
	          return new Target();

	        case 1:
	          return new Target(args[0]);

	        case 2:
	          return new Target(args[0], args[1]);

	        case 3:
	          return new Target(args[0], args[1], args[2]);

	        case 4:
	          return new Target(args[0], args[1], args[2], args[3]);
	      } // w/o altered newTarget, lot of arguments case


	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (functionBind.apply(Target, $args))();
	    } // with altered newTarget, not support built-in constructors


	    var proto = newTarget.prototype;
	    var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

	var construct$1 = path.Reflect.construct;

	var construct$2 = construct$1;

	var construct$3 = construct$2;

	var iterators = {};

	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	// https://tc39.github.io/ecma262/#sec-toobject

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() {
	    /* empty */
	  }

	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectPrototype : null;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
	&& !Symbol.sham // eslint-disable-next-line no-undef
	&& typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  }

	  return WellKnownSymbolsStore[name];
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

	var CORRECT_ARGUMENTS = classofRaw(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {
	    /* empty */
	  }
	}; // getting tag from ES6+ `Object.prototype.toString`


	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var defineProperty = objectDefineProperty.f;
	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;

	    if (!has(target, TO_STRING_TAG$2)) {
	      defineProperty(target, TO_STRING_TAG$2, {
	        configurable: true,
	        value: TAG
	      });
	    }

	    if (SET_METHOD && !toStringTagSupport) {
	      createNonEnumerableProperty(target, 'toString', objectToString);
	    }
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var returnThis = function () {
	  return this;
	};

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
	    next: createPropertyDescriptor(1, next)
	  });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.

	/* eslint-disable no-proto */

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;

	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var redefine = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$1 = function () {
	  return this;
	};

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS:
	        return function keys() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case VALUES:
	        return function values() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case ENTRIES:
	        return function entries() {
	          return new IteratorConstructor(this, KIND);
	        };
	    }

	    return function () {
	      return new IteratorConstructor(this);
	    };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY; // fix native

	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {


	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      iterators[TO_STRING_TAG] = returnThis$1;
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;

	    defaultIterator = function values() {
	      return nativeIterator.call(this);
	    };
	  } // define iterator


	  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  iterators[NAME] = defaultIterator; // export additional methods

	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({
	      target: NAME,
	      proto: true,
	      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
	    }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator

	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind

	  }); // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;

	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return {
	      value: undefined,
	      done: true
	    };
	  }

	  if (kind == 'keys') return {
	    value: index,
	    done: false
	  };
	  if (kind == 'values') return {
	    value: target[index],
	    done: false
	  };
	  return {
	    value: [index, target[index]],
	    done: false
	  };
	}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

	iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;

	  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG$3) {
	    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	  }

	  iterators[COLLECTION_NAME] = iterators.Array;
	}

	// https://tc39.github.io/ecma262/#sec-isarray

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate = function (originalArray, length) {
	  var C;

	  if (isArray(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
	    var value, result;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);

	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return value;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              push.call(target, value);
	            // filter
	          } else switch (TYPE) {
	            case 4:
	              return false;
	            // every

	            case 7:
	              push.call(target, value);
	            // filterOut
	          }
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$1(7)
	};

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var defineProperty$1 = Object.defineProperty;
	var cache = {};

	var thrower = function (it) {
	  throw it;
	};

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;
	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = {
	      length: -1
	    };
	    if (ACCESSORS) defineProperty$1(O, 1, {
	      enumerable: true,
	      get: thrower
	    });else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

	var arrayForEach = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn
	/* , thisArg */
	) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


	_export({
	  target: 'Array',
	  proto: true,
	  forced: [].forEach != arrayForEach
	}, {
	  forEach: arrayForEach
	});

	var entryVirtual = function (CONSTRUCTOR) {
	  return path[CONSTRUCTOR + 'Prototype'];
	};

	var forEach = entryVirtual('Array').forEach;

	var forEach$1 = forEach;

	var ArrayPrototype = Array.prototype;
	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.forEach // eslint-disable-next-line no-prototype-builtins
	  || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
	};

	var forEach$2 = forEach_1;

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var slice$1 = [].slice;
	var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout
	  /* , ...arguments */
	  ) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice$1.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
	    } : handler, timeout);
	  };
	}; // ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


	_export({
	  global: true,
	  bind: true,
	  forced: MSIE
	}, {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global_1.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global_1.setInterval)
	});

	var setTimeout$1 = path.setTimeout;

	var setTimeout$2 = setTimeout$1;

	// https://tc39.github.io/ecma262/#sec-function.prototype.bind

	_export({
	  target: 'Function',
	  proto: true
	}, {
	  bind: functionBind
	});

	var bind = entryVirtual('Function').bind;

	var FunctionPrototype = Function.prototype;

	var bind_1 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || it instanceof Function && own === FunctionPrototype.bind ? bind : own;
	};

	var bind$1 = bind_1;

	var bind$2 = bind$1;

	// https://tc39.github.io/ecma262/#sec-array.isarray

	_export({
	  target: 'Array',
	  stat: true
	}, {
	  isArray: isArray
	});

	var isArray$1 = path.Array.isArray;

	var isArray$2 = isArray$1;

	var isArray$3 = isArray$2;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	_export({
	  target: 'Object',
	  stat: true,
	  forced: !descriptors,
	  sham: !descriptors
	}, {
	  defineProperty: objectDefineProperty.f
	});

	var defineProperty_1 = createCommonjsModule(function (module) {
	  var Object = path.Object;

	  var defineProperty = module.exports = function defineProperty(it, key, desc) {
	    return Object.defineProperty(it, key, desc);
	  };

	  if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$2 = defineProperty_1;

	var defineProperty$3 = defineProperty$2;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$3(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	// https://tc39.github.io/ecma262/#sec-object.create

	_export({
	  target: 'Object',
	  stat: true,
	  sham: !descriptors
	}, {
	  create: objectCreate
	});

	var Object$1 = path.Object;

	var create = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var create$1 = create;

	var create$2 = create$1;

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof

	_export({
	  target: 'Object',
	  stat: true
	}, {
	  setPrototypeOf: objectSetPrototypeOf
	});

	var setPrototypeOf = path.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf;

	var setPrototypeOf$2 = setPrototypeOf$1;

	var setPrototypeOf$3 = createCommonjsModule(function (module) {
	  function _setPrototypeOf(o, p) {
	    module.exports = _setPrototypeOf = setPrototypeOf$2 || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    return _setPrototypeOf(o, p);
	  }

	  module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create$2(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf$3(subClass, superClass);
	}

	var inherits = _inherits;

	var f$3 = wellKnownSymbol;
	var wellKnownSymbolWrapped = {
	  f: f$3
	};

	var defineProperty$4 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	// https://tc39.github.io/ecma262/#sec-symbol.iterator

	defineWellKnownSymbol('iterator');

	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;
	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

	defineIterator(String, 'String', function (iterated) {
	  setInternalState$1(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  }); // `%StringIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return {
	    value: undefined,
	    done: true
	  };
	  point = charAt(string, index);
	  state.index += point.length;
	  return {
	    value: point,
	    done: false
	  };
	});

	var iterator = wellKnownSymbolWrapped.f('iterator');

	var iterator$1 = iterator;

	var iterator$2 = iterator$1;

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
	};

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES$1] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679

	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED$1
	}, {
	  concat: function concat(arg) {
	    // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;

	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];

	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }

	    A.length = n;
	    return A;
	  }
	});

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
	  f: f$4
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
	var toString$1 = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
	  f: f$5
	};

	var f$6 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
	  f: f$6
	};

	var $forEach$1 = arrayIteration.forEach;
	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () {
	      return nativeDefineProperty$1(this, 'a', {
	        value: 7
	      }).a;
	    }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty$1(O, P, Attributes);

	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState$2(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);

	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, {
	        enumerable: createPropertyDescriptor(0, false)
	      });
	    }

	    return setSymbolDescriptor(O, key, Attributes);
	  }

	  return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$1 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$1 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }

	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$1, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	}; // `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor


	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);

	    var setter = function (value) {
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };

	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, {
	      configurable: true,
	      set: setter
	    });
	    return wrap$1(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });
	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap$1(uid(description), description);
	  });
	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap$1(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	  }
	}

	_export({
	  global: true,
	  wrap: true,
	  forced: !nativeSymbol,
	  sham: !nativeSymbol
	}, {
	  Symbol: $Symbol
	});
	$forEach$1(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});
	_export({
	  target: SYMBOL,
	  stat: true,
	  forced: !nativeSymbol
	}, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () {
	    USE_SETTER = true;
	  },
	  useSimple: function () {
	    USE_SETTER = false;
	  }
	});
	_export({
	  target: 'Object',
	  stat: true,
	  forced: !nativeSymbol,
	  sham: !descriptors
	}, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});
	_export({
	  target: 'Object',
	  stat: true,
	  forced: !nativeSymbol
	}, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443

	_export({
	  target: 'Object',
	  stat: true,
	  forced: fails(function () {
	    objectGetOwnPropertySymbols.f(1);
	  })
	}, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	}); // `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify

	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

	    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
	    || $stringify({
	      a: symbol
	    }) != '{}' // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) != '{}';
	  });
	  _export({
	    target: 'JSON',
	    stat: true,
	    forced: FORCED_JSON_STRINGIFY
	  }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;

	      while (arguments.length > index) args.push(arguments[index++]);

	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	} // `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	} // `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


	setToStringTag($Symbol, SYMBOL);
	hiddenKeys[HIDDEN] = true;

	// https://tc39.github.io/ecma262/#sec-symbol.asynciterator

	defineWellKnownSymbol('asyncIterator');

	// https://tc39.github.io/ecma262/#sec-symbol.hasinstance

	defineWellKnownSymbol('hasInstance');

	// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable

	defineWellKnownSymbol('isConcatSpreadable');

	// https://tc39.github.io/ecma262/#sec-symbol.match

	defineWellKnownSymbol('match');

	defineWellKnownSymbol('matchAll');

	// https://tc39.github.io/ecma262/#sec-symbol.replace

	defineWellKnownSymbol('replace');

	// https://tc39.github.io/ecma262/#sec-symbol.search

	defineWellKnownSymbol('search');

	// https://tc39.github.io/ecma262/#sec-symbol.species

	defineWellKnownSymbol('species');

	// https://tc39.github.io/ecma262/#sec-symbol.split

	defineWellKnownSymbol('split');

	// https://tc39.github.io/ecma262/#sec-symbol.toprimitive

	defineWellKnownSymbol('toPrimitive');

	// https://tc39.github.io/ecma262/#sec-symbol.tostringtag

	defineWellKnownSymbol('toStringTag');

	// https://tc39.github.io/ecma262/#sec-symbol.unscopables

	defineWellKnownSymbol('unscopables');

	// https://tc39.github.io/ecma262/#sec-json-@@tostringtag

	setToStringTag(global_1.JSON, 'JSON', true);

	var symbol = path.Symbol;

	// https://github.com/tc39/proposal-using-statement

	defineWellKnownSymbol('asyncDispose');

	// https://github.com/tc39/proposal-using-statement

	defineWellKnownSymbol('dispose');

	// https://github.com/tc39/proposal-observable

	defineWellKnownSymbol('observable');

	// https://github.com/tc39/proposal-pattern-matching

	defineWellKnownSymbol('patternMatch');

	defineWellKnownSymbol('replaceAll');

	var symbol$1 = symbol;

	var symbol$2 = symbol$1;

	var _typeof_1 = createCommonjsModule(function (module) {
	  function _typeof(obj) {
	    "@babel/helpers - typeof";

	    if (typeof symbol$2 === "function" && typeof iterator$2 === "symbol") {
	      module.exports = _typeof = function _typeof(obj) {
	        return typeof obj;
	      };
	    } else {
	      module.exports = _typeof = function _typeof(obj) {
	        return obj && typeof symbol$2 === "function" && obj.constructor === symbol$2 && obj !== symbol$2.prototype ? "symbol" : typeof obj;
	      };
	    }

	    return _typeof(obj);
	  }

	  module.exports = _typeof;
	});

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var FAILS_ON_PRIMITIVES = fails(function () {
	  objectGetPrototypeOf(1);
	}); // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES,
	  sham: !correctPrototypeGetter
	}, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var getPrototypeOf = path.Object.getPrototypeOf;

	var getPrototypeOf$1 = getPrototypeOf;

	var getPrototypeOf$2 = getPrototypeOf$1;

	var getPrototypeOf$3 = createCommonjsModule(function (module) {
	  function _getPrototypeOf(o) {
	    module.exports = _getPrototypeOf = setPrototypeOf$2 ? getPrototypeOf$2 : function _getPrototypeOf(o) {
	      return o.__proto__ || getPrototypeOf$2(o);
	    };
	    return _getPrototypeOf(o);
	  }

	  module.exports = _getPrototypeOf;
	});

	// use this instance. Else, load via commonjs.
	//
	// Note: This doesn't work in ESM.

	var moment = typeof window !== 'undefined' && window['moment'] || moment__default['default'];

	var defineProperty$5 = defineProperty_1;

	var defineProperty$6 = defineProperty$5;

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	_export({
	  target: 'Object',
	  stat: true,
	  forced: !descriptors,
	  sham: !descriptors
	}, {
	  defineProperties: objectDefineProperties
	});

	var defineProperties_1 = createCommonjsModule(function (module) {
	  var Object = path.Object;

	  var defineProperties = module.exports = function defineProperties(T, D) {
	    return Object.defineProperties(T, D);
	  };

	  if (Object.defineProperties.sham) defineProperties.sham = true;
	});

	var defineProperties = defineProperties_1;

	var defineProperties$1 = defineProperties;

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors

	_export({
	  target: 'Object',
	  stat: true,
	  sham: !descriptors
	}, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;

	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }

	    return result;
	  }
	});

	var getOwnPropertyDescriptors = path.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptors$1;

	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var FAILS_ON_PRIMITIVES$1 = fails(function () {
	  nativeGetOwnPropertyDescriptor$2(1);
	});
	var FORCED$2 = !descriptors || FAILS_ON_PRIMITIVES$1; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FORCED$2,
	  sham: !descriptors
	}, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
	  }
	});

	var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
	  var Object = path.Object;

	  var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
	    return Object.getOwnPropertyDescriptor(it, key);
	  };

	  if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
	});

	var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor_1;

	var getOwnPropertyDescriptor$3 = getOwnPropertyDescriptor$2;

	var $filter = arrayIteration.filter;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1
	}, {
	  filter: function filter(callbackfn
	  /* , thisArg */
	  ) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var filter = entryVirtual('Array').filter;

	var ArrayPrototype$1 = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$1 || it instanceof Array && own === ArrayPrototype$1.filter ? filter : own;
	};

	var filter$1 = filter_1;

	var filter$2 = filter$1;

	var getOwnPropertySymbols = path.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols;

	var getOwnPropertySymbols$2 = getOwnPropertySymbols$1;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$3(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty$7 = _defineProperty;

	var FAILS_ON_PRIMITIVES$2 = fails(function () {
	  objectKeys(1);
	}); // `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES$2
	}, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var keys$1 = path.Object.keys;

	var keys$2 = keys$1;

	var keys$3 = keys$2;

	var createMethod$3 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }

	      index += i;

	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }

	    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }

	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$3(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$3(true)
	};

	var engineIsNode = classofRaw(global_1.process) == 'process';

	var $reduce = arrayReduce.left;
	var STRICT_METHOD$1 = arrayMethodIsStrict('reduce');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('reduce', {
	  1: 0
	}); // Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

	var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83; // `Array.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$2 || CHROME_BUG
	}, {
	  reduce: function reduce(callbackfn
	  /* , initialValue */
	  ) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var reduce = entryVirtual('Array').reduce;

	var ArrayPrototype$2 = Array.prototype;

	var reduce_1 = function (it) {
	  var own = it.reduce;
	  return it === ArrayPrototype$2 || it instanceof Array && own === ArrayPrototype$2.reduce ? reduce : own;
	};

	var reduce$1 = reduce_1;

	var reduce$2 = reduce$1;

	var $map = arrayIteration.map;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map'); // FF49- issue

	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3
	}, {
	  map: function map(callbackfn
	  /* , thisArg */
	  ) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var map = entryVirtual('Array').map;

	var ArrayPrototype$3 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$3 || it instanceof Array && own === ArrayPrototype$3.map ? map : own;
	};

	var map$1 = map_1;

	var map$2 = map$1;

	var ITERATOR$2 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || iterators[classof(it)];
	};

	var getIterator = function (it) {
	  var iteratorMethod = getIteratorMethod(it);

	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  }

	  return anObject(iteratorMethod.call(it));
	};

	var getIterator_1 = getIterator;

	var getIterator$1 = getIterator_1;

	var getIteratorMethod_1 = getIteratorMethod;

	var getIteratorMethod$1 = getIteratorMethod_1;

	var iteratorClose = function (iterator) {
	  var returnMethod = iterator['return'];

	  if (returnMethod !== undefined) {
	    return anObject(returnMethod.call(iterator)).value;
	  }
	};

	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    iteratorClose(iterator);
	    throw error;
	  }
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var ArrayPrototype$4 = Array.prototype; // check on default Array iterator

	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$4[ITERATOR$3] === it);
	};

	// https://tc39.github.io/ecma262/#sec-array.from


	var arrayFrom = function from(arrayLike
	/* , mapfn = undefined, thisArg = undefined */
	) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();

	    for (; !(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);

	    for (; length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }

	  result.length = index;
	  return result;
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return {
	        done: !!called++
	      };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };

	  iteratorWithReturn[ITERATOR$4] = function () {
	    return this;
	  }; // eslint-disable-next-line no-throw-literal


	  Array.from(iteratorWithReturn, function () {
	    throw 2;
	  });
	} catch (error) {
	  /* empty */
	}

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;

	  try {
	    var object = {};

	    object[ITERATOR$4] = function () {
	      return {
	        next: function () {
	          return {
	            done: ITERATION_SUPPORT = true
	          };
	        }
	      };
	    };

	    exec(object);
	  } catch (error) {
	    /* empty */
	  }

	  return ITERATION_SUPPORT;
	};

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	}); // `Array.from` method
	// https://tc39.github.io/ecma262/#sec-array.from

	_export({
	  target: 'Array',
	  stat: true,
	  forced: INCORRECT_ITERATION
	}, {
	  from: arrayFrom
	});

	var from_1 = path.Array.from;

	var from_1$1 = from_1;

	var from_1$2 = from_1$1;

	var create$3 = create;

	var create$4 = create$3;

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

	var createMethod$4 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$4(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$4(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$4(3)
	};

	var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
	// of whitespaces and has a correct name

	var stringTrimForced = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim; // `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim

	_export({
	  target: 'String',
	  proto: true,
	  forced: stringTrimForced('trim')
	}, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var trim = entryVirtual('String').trim;

	var StringPrototype = String.prototype;

	var trim_1 = function (it) {
	  var own = it.trim;
	  return typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.trim ? trim : own;
	};

	var trim$1 = trim_1;

	var trim$2 = trim$1;

	var trim$3 = stringTrim.trim;
	var $parseInt = global_1.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$3 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	var numberParseInt = FORCED$3 ? function parseInt(string, radix) {
	  var S = trim$3(String(string));
	  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	_export({
	  global: true,
	  forced: parseInt != numberParseInt
	}, {
	  parseInt: numberParseInt
	});

	var _parseInt = path.parseInt;

	var _parseInt$1 = _parseInt;

	var _parseInt$2 = _parseInt$1;

	var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

	var createMethod$5 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;

	    while (length > i) {
	      key = keys[i++];

	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }

	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$5(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$5(false)
	};

	var $values = objectToArray.values; // `Object.values` method
	// https://tc39.github.io/ecma262/#sec-object.values

	_export({
	  target: 'Object',
	  stat: true
	}, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var values = path.Object.values;

	var values$1 = values;

	var values$2 = values$1;

	var getPrototypeOf$4 = getPrototypeOf;

	var getPrototypeOf$5 = getPrototypeOf$4;

	var $indexOf = arrayIncludes.indexOf;
	var nativeIndexOf = [].indexOf;
	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

	_export({
	  target: 'Array',
	  proto: true,
	  forced: NEGATIVE_ZERO || !STRICT_METHOD$2 || !USES_TO_LENGTH$4
	}, {
	  indexOf: function indexOf(searchElement
	  /* , fromIndex = 0 */
	  ) {
	    return NEGATIVE_ZERO // convert -0 to +0
	    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var indexOf$1 = entryVirtual('Array').indexOf;

	var ArrayPrototype$5 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$5 || it instanceof Array && own === ArrayPrototype$5.indexOf ? indexOf$1 : own;
	};

	var indexOf$2 = indexOf_1;

	var indexOf$3 = indexOf$2;

	var nativeAssign = Object.assign;
	var defineProperty$8 = Object.defineProperty; // `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign

	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({
	    b: 1
	  }, nativeAssign(defineProperty$8({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$8(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), {
	    b: 2
	  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) {
	    B[chr] = chr;
	  });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : nativeAssign;

	// https://tc39.github.io/ecma262/#sec-object.assign

	_export({
	  target: 'Object',
	  stat: true,
	  forced: Object.assign !== objectAssign
	}, {
	  assign: objectAssign
	});

	var assign = path.Object.assign;

	var assign$1 = assign;

	var assign$2 = assign$1;

	var isArray$4 = isArray$1;

	var isArray$5 = isArray$4;

	function _arrayWithHoles(arr) {
	  if (isArray$5(arr)) return arr;
	}

	var arrayWithHoles = _arrayWithHoles;

	var ITERATOR$5 = wellKnownSymbol('iterator');

	var isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$5] !== undefined || '@@iterator' in O // eslint-disable-next-line no-prototype-builtins
	  || iterators.hasOwnProperty(classof(O));
	};

	var isIterable_1 = isIterable;

	var isIterable$1 = isIterable_1;

	function _iterableToArrayLimit(arr, i) {
	  if (typeof symbol$2 === "undefined" || !isIterable$1(Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = getIterator$1(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	var iterableToArrayLimit = _iterableToArrayLimit;

	var from_1$3 = from_1;

	var from_1$4 = from_1$3;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('slice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max; // `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$5
	}, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

	    var Constructor, result, n;

	    if (isArray(O)) {
	      Constructor = O.constructor; // cross-realm fallback

	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }

	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }

	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

	    result.length = n;
	    return result;
	  }
	});

	var slice$2 = entryVirtual('Array').slice;

	var ArrayPrototype$6 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$6 || it instanceof Array && own === ArrayPrototype$6.slice ? slice$2 : own;
	};

	var slice$3 = slice_1;

	var slice$4 = slice$3;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	var arrayLikeToArray = _arrayLikeToArray;

	function _unsupportedIterableToArray(o, minLen) {
	  var _context;

	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);

	  var n = slice$4(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return from_1$4(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	var unsupportedIterableToArray = _unsupportedIterableToArray;

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableRest = _nonIterableRest;

	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
	}

	var slicedToArray = _slicedToArray;

	// https://tc39.github.io/ecma262/#sec-date.now

	_export({
	  target: 'Date',
	  stat: true
	}, {
	  now: function now() {
	    return new Date().getTime();
	  }
	});

	var now = path.Date.now;

	var now$1 = now;

	var now$2 = now$1;

	// https://tc39.github.io/ecma262/#sec-reflect.ownkeys

	_export({
	  target: 'Reflect',
	  stat: true
	}, {
	  ownKeys: ownKeys
	});

	var ownKeys$1 = path.Reflect.ownKeys;

	var ownKeys$2 = ownKeys$1;

	var ownKeys$3 = ownKeys$2;

	var slice$5 = slice_1;

	var slice$6 = slice$5;

	function _arrayWithoutHoles(arr) {
	  if (isArray$5(arr)) return arrayLikeToArray(arr);
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (typeof symbol$2 !== "undefined" && isIterable$1(Object(iter))) return from_1$4(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	var concat = entryVirtual('Array').concat;

	var ArrayPrototype$7 = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype$7 || it instanceof Array && own === ArrayPrototype$7.concat ? concat : own;
	};

	var concat$1 = concat_1;

	var concat$2 = concat$1;

	var symbol$3 = symbol;

	var symbol$4 = symbol$3;

	function ownKeys$4(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$3(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context14; forEach$2(_context14 = ownKeys$4(Object(source), true)).call(_context14, function (key) { defineProperty$7(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context15; forEach$2(_context15 = ownKeys$4(Object(source))).call(_context15, function (key) { defineProperty$6(target, key, getOwnPropertyDescriptor$3(source, key)); }); } } return target; }

	function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$3(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$1(o, minLen) { var _context13; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = slice$6(_context13 = Object.prototype.toString.call(o)).call(_context13, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

	function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	/**
	 * vis-util
	 * https://github.com/visjs/vis-util
	 *
	 * utilitie collection for visjs
	 *
	 * @version 4.3.4
	 * @date    2020-08-01T15:11:53.524Z
	 *
	 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
	 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
	 *
	 * @license
	 * vis.js is dual licensed under both
	 *
	 *   1. The Apache 2.0 License
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *   and
	 *
	 *   2. The MIT License
	 *      http://opensource.org/licenses/MIT
	 *
	 * vis.js may be distributed under either license.
	 */

	/**
	 * Use this symbol to delete properies in deepObjectAssign.
	 */
	var DELETE = symbol$4("DELETE");
	/**
	 * Pure version of deepObjectAssign, it doesn't modify any of it's arguments.
	 *
	 * @param base - The base object that fullfils the whole interface T.
	 * @param updates - Updates that may change or delete props.
	 *
	 * @returns A brand new instance with all the supplied objects deeply merged.
	 */


	function pureDeepObjectAssign(base) {
	  var _context;

	  for (var _len = arguments.length, updates = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    updates[_key - 1] = arguments[_key];
	  }

	  return deepObjectAssign.apply(void 0, concat$2(_context = [{}, base]).call(_context, updates));
	}
	/**
	 * Deep version of object assign with additional deleting by the DELETE symbol.
	 *
	 * @param values - Objects to be deeply merged.
	 *
	 * @returns The first object from values.
	 */


	function deepObjectAssign() {
	  var merged = deepObjectAssignNonentry.apply(void 0, arguments);
	  stripDelete(merged);
	  return merged;
	}
	/**
	 * Deep version of object assign with additional deleting by the DELETE symbol.
	 *
	 * @remarks
	 * This doesn't strip the DELETE symbols so they may end up in the final object.
	 *
	 * @param values - Objects to be deeply merged.
	 *
	 * @returns The first object from values.
	 */


	function deepObjectAssignNonentry() {
	  for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    values[_key2] = arguments[_key2];
	  }

	  if (values.length < 2) {
	    return values[0];
	  } else if (values.length > 2) {
	    var _context2;

	    return deepObjectAssignNonentry.apply(void 0, concat$2(_context2 = [deepObjectAssign(values[0], values[1])]).call(_context2, toConsumableArray(slice$6(values).call(values, 2))));
	  }

	  var a = values[0];
	  var b = values[1];

	  var _iterator = _createForOfIteratorHelper(ownKeys$3(b)),
	      _step;

	  try {
	    for (_iterator.s(); !(_step = _iterator.n()).done;) {
	      var prop = _step.value;
	      if (!Object.prototype.propertyIsEnumerable.call(b, prop)) ;else if (b[prop] === DELETE) {
	        delete a[prop];
	      } else if (a[prop] !== null && b[prop] !== null && _typeof_1(a[prop]) === "object" && _typeof_1(b[prop]) === "object" && !isArray$3(a[prop]) && !isArray$3(b[prop])) {
	        a[prop] = deepObjectAssignNonentry(a[prop], b[prop]);
	      } else {
	        a[prop] = clone(b[prop]);
	      }
	    }
	  } catch (err) {
	    _iterator.e(err);
	  } finally {
	    _iterator.f();
	  }

	  return a;
	}
	/**
	 * Deep clone given object or array. In case of primitive simply return.
	 *
	 * @param a - Anything.
	 *
	 * @returns Deep cloned object/array or unchanged a.
	 */


	function clone(a) {
	  if (isArray$3(a)) {
	    return map$2(a).call(a, function (value) {
	      return clone(value);
	    });
	  } else if (_typeof_1(a) === "object" && a !== null) {
	    return deepObjectAssignNonentry({}, a);
	  } else {
	    return a;
	  }
	}
	/**
	 * Strip DELETE from given object.
	 *
	 * @param a - Object which may contain DELETE but won't after this is executed.
	 */


	function stripDelete(a) {
	  for (var _i = 0, _Object$keys = keys$3(a); _i < _Object$keys.length; _i++) {
	    var prop = _Object$keys[_i];

	    if (a[prop] === DELETE) {
	      delete a[prop];
	    } else if (_typeof_1(a[prop]) === "object" && a[prop] !== null) {
	      stripDelete(a[prop]);
	    }
	  }
	}
	/**
	 * Seedable, fast and reasonably good (not crypto but more than okay for our
	 * needs) random number generator.
	 *
	 * @remarks
	 * Adapted from {@link https://web.archive.org/web/20110429100736/http://baagoe.com:80/en/RandomMusings/javascript}.
	 * Original algorithm created by Johannes Baagøe \<baagoe\@baagoe.com\> in 2010.
	 */

	/**
	 * Create a seeded pseudo random generator based on Alea by Johannes Baagøe.
	 *
	 * @param seed - All supplied arguments will be used as a seed. In case nothing
	 * is supplied the current time will be used to seed the generator.
	 *
	 * @returns A ready to use seeded generator.
	 */


	function Alea() {
	  for (var _len3 = arguments.length, seed = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    seed[_key3] = arguments[_key3];
	  }

	  return AleaImplementation(seed.length ? seed : [now$2()]);
	}
	/**
	 * An implementation of [[Alea]] without user input validation.
	 *
	 * @param seed - The data that will be used to seed the generator.
	 *
	 * @returns A ready to use seeded generator.
	 */


	function AleaImplementation(seed) {
	  var _mashSeed = mashSeed(seed),
	      _mashSeed2 = slicedToArray(_mashSeed, 3),
	      s0 = _mashSeed2[0],
	      s1 = _mashSeed2[1],
	      s2 = _mashSeed2[2];

	  var c = 1;

	  var random = function random() {
	    var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

	    s0 = s1;
	    s1 = s2;
	    return s2 = t - (c = t | 0);
	  };

	  random.uint32 = function () {
	    return random() * 0x100000000;
	  }; // 2^32


	  random.fract53 = function () {
	    return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16;
	  }; // 2^-53


	  random.algorithm = "Alea";
	  random.seed = seed;
	  random.version = "0.9";
	  return random;
	}
	/**
	 * Turn arbitrary data into values [[AleaImplementation]] can use to generate
	 * random numbers.
	 *
	 * @param seed - Arbitrary data that will be used as the seed.
	 *
	 * @returns Three numbers to use as initial values for [[AleaImplementation]].
	 */


	function mashSeed() {
	  var mash = Mash();
	  var s0 = mash(" ");
	  var s1 = mash(" ");
	  var s2 = mash(" ");

	  for (var i = 0; i < arguments.length; i++) {
	    s0 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

	    if (s0 < 0) {
	      s0 += 1;
	    }

	    s1 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

	    if (s1 < 0) {
	      s1 += 1;
	    }

	    s2 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

	    if (s2 < 0) {
	      s2 += 1;
	    }
	  }

	  return [s0, s1, s2];
	}
	/**
	 * Create a new mash function.
	 *
	 * @returns A nonpure function that takes arbitrary [[Mashable]] data and turns
	 * them into numbers.
	 */


	function Mash() {
	  var n = 0xefc8249d;
	  return function (data) {
	    var string = data.toString();

	    for (var i = 0; i < string.length; i++) {
	      n += string.charCodeAt(i);
	      var h = 0.02519603282416938 * n;
	      n = h >>> 0;
	      h -= n;
	      h *= n;
	      n = h >>> 0;
	      h -= n;
	      n += h * 0x100000000; // 2^32
	    }

	    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
	  };
	} // utility functions
	// parse ASP.Net Date pattern,
	// for example '/Date(1198908717056)/' or '/Date(1198908717056-0700)/'
	// code from http://momentjs.com/


	var ASPDateRegex = /^\/?Date\((-?\d+)/i; // Color REs

	var fullHexRE = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	var shortHexRE = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	var rgbRE = /^rgb\( *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *\)$/i;
	var rgbaRE = /^rgba\( *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *([01]|0?\.\d+) *\)$/i;
	/**
	 * Test whether given object is a number.
	 *
	 * @param value - Input value of unknown type.
	 *
	 * @returns True if number, false otherwise.
	 */

	function isNumber(value) {
	  return value instanceof Number || typeof value === "number";
	}
	/**
	 * Remove everything in the DOM object.
	 *
	 * @param DOMobject - Node whose child nodes will be recursively deleted.
	 */


	function recursiveDOMDelete(DOMobject) {
	  if (DOMobject) {
	    while (DOMobject.hasChildNodes() === true) {
	      var child = DOMobject.firstChild;

	      if (child) {
	        recursiveDOMDelete(child);
	        DOMobject.removeChild(child);
	      }
	    }
	  }
	}
	/**
	 * Test whether given object is a string.
	 *
	 * @param value - Input value of unknown type.
	 *
	 * @returns True if string, false otherwise.
	 */


	function isString(value) {
	  return value instanceof String || typeof value === "string";
	}
	/**
	 * Test whether given object is a object (not primitive or null).
	 *
	 * @param value - Input value of unknown type.
	 *
	 * @returns True if not null object, false otherwise.
	 */


	function isObject$1(value) {
	  return _typeof_1(value) === "object" && value !== null;
	}
	/**
	 * Test whether given object is a Date, or a String containing a Date.
	 *
	 * @param value - Input value of unknown type.
	 *
	 * @returns True if Date instance or string date representation, false otherwise.
	 */


	function isDate(value) {
	  if (value instanceof Date) {
	    return true;
	  } else if (isString(value)) {
	    // test whether this string contains a date
	    var match = ASPDateRegex.exec(value);

	    if (match) {
	      return true;
	    } else if (!isNaN(Date.parse(value))) {
	      return true;
	    }
	  }

	  return false;
	}
	/**
	 * Copy property from b to a if property present in a.
	 * If property in b explicitly set to null, delete it if `allowDeletion` set.
	 *
	 * Internal helper routine, should not be exported. Not added to `exports` for that reason.
	 *
	 * @param a - Target object.
	 * @param b - Source object.
	 * @param prop - Name of property to copy from b to a.
	 * @param allowDeletion - If true, delete property in a if explicitly set to null in b.
	 */


	function copyOrDelete(a, b, prop, allowDeletion) {
	  var doDeletion = false;

	  if (allowDeletion === true) {
	    doDeletion = b[prop] === null && a[prop] !== undefined;
	  }

	  if (doDeletion) {
	    delete a[prop];
	  } else {
	    a[prop] = b[prop]; // Remember, this is a reference copy!
	  }
	}
	/**
	 * Fill an object with a possibly partially defined other object.
	 *
	 * Only copies values for the properties already present in a.
	 * That means an object is not created on a property if only the b object has it.
	 *
	 * @param a - The object that will have it's properties updated.
	 * @param b - The object with property updates.
	 * @param allowDeletion - If true, delete properties in a that are explicitly set to null in b.
	 */


	function fillIfDefined(a, b) {
	  var allowDeletion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  // NOTE: iteration of properties of a
	  // NOTE: prototype properties iterated over as well
	  for (var prop in a) {
	    if (b[prop] !== undefined) {
	      if (b[prop] === null || _typeof_1(b[prop]) !== "object") {
	        // Note: typeof null === 'object'
	        copyOrDelete(a, b, prop, allowDeletion);
	      } else {
	        var aProp = a[prop];
	        var bProp = b[prop];

	        if (isObject$1(aProp) && isObject$1(bProp)) {
	          fillIfDefined(aProp, bProp, allowDeletion);
	        }
	      }
	    }
	  }
	}
	/**
	 * Copy the values of all of the enumerable own properties from one or more source objects to a
	 * target object. Returns the target object.
	 *
	 * @param target - The target object to copy to.
	 * @param source - The source object from which to copy properties.
	 *
	 * @returns The target object.
	 */


	var extend = assign$2;
	/**
	 * Extend object a with selected properties of object b or a series of objects.
	 *
	 * @remarks
	 * Only properties with defined values are copied.
	 *
	 * @param props - Properties to be copied to a.
	 * @param a - The target.
	 * @param others - The sources.
	 *
	 * @returns Argument a.
	 */

	function selectiveExtend(props, a) {
	  if (!isArray$3(props)) {
	    throw new Error("Array with property names expected as first argument");
	  }

	  for (var _len4 = arguments.length, others = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	    others[_key4 - 2] = arguments[_key4];
	  }

	  for (var _i2 = 0, _others = others; _i2 < _others.length; _i2++) {
	    var other = _others[_i2];

	    for (var p = 0; p < props.length; p++) {
	      var prop = props[p];

	      if (other && Object.prototype.hasOwnProperty.call(other, prop)) {
	        a[prop] = other[prop];
	      }
	    }
	  }

	  return a;
	}
	/**
	 * Extend object a with selected properties of object b.
	 * Only properties with defined values are copied.
	 *
	 * @remarks
	 * Previous version of this routine implied that multiple source objects could
	 * be used; however, the implementation was **wrong**. Since multiple (\>1)
	 * sources weren't used anywhere in the `vis.js` code, this has been removed
	 *
	 * @param props - Names of first-level properties to copy over.
	 * @param a - Target object.
	 * @param b - Source object.
	 * @param allowDeletion - If true, delete property in a if explicitly set to null in b.
	 *
	 * @returns Argument a.
	 */


	function selectiveDeepExtend(props, a, b) {
	  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  // TODO: add support for Arrays to deepExtend
	  if (isArray$3(b)) {
	    throw new TypeError("Arrays are not supported by deepExtend");
	  }

	  for (var p = 0; p < props.length; p++) {
	    var prop = props[p];

	    if (Object.prototype.hasOwnProperty.call(b, prop)) {
	      if (b[prop] && b[prop].constructor === Object) {
	        if (a[prop] === undefined) {
	          a[prop] = {};
	        }

	        if (a[prop].constructor === Object) {
	          deepExtend(a[prop], b[prop], false, allowDeletion);
	        } else {
	          copyOrDelete(a, b, prop, allowDeletion);
	        }
	      } else if (isArray$3(b[prop])) {
	        throw new TypeError("Arrays are not supported by deepExtend");
	      } else {
	        copyOrDelete(a, b, prop, allowDeletion);
	      }
	    }
	  }

	  return a;
	}
	/**
	 * Extend object `a` with properties of object `b`, ignoring properties which
	 * are explicitly specified to be excluded.
	 *
	 * @remarks
	 * The properties of `b` are considered for copying. Properties which are
	 * themselves objects are are also extended. Only properties with defined
	 * values are copied.
	 *
	 * @param propsToExclude - Names of properties which should *not* be copied.
	 * @param a - Object to extend.
	 * @param b - Object to take properties from for extension.
	 * @param allowDeletion - If true, delete properties in a that are explicitly
	 * set to null in b.
	 *
	 * @returns Argument a.
	 */


	function selectiveNotDeepExtend(propsToExclude, a, b) {
	  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  // TODO: add support for Arrays to deepExtend
	  // NOTE: array properties have an else-below; apparently, there is a problem here.
	  if (isArray$3(b)) {
	    throw new TypeError("Arrays are not supported by deepExtend");
	  }

	  for (var prop in b) {
	    if (!Object.prototype.hasOwnProperty.call(b, prop)) {
	      continue;
	    } // Handle local properties only


	    if (indexOf$3(propsToExclude).call(propsToExclude, prop) !== -1) {
	      continue;
	    } // In exclusion list, skip


	    if (b[prop] && b[prop].constructor === Object) {
	      if (a[prop] === undefined) {
	        a[prop] = {};
	      }

	      if (a[prop].constructor === Object) {
	        deepExtend(a[prop], b[prop]); // NOTE: allowDeletion not propagated!
	      } else {
	        copyOrDelete(a, b, prop, allowDeletion);
	      }
	    } else if (isArray$3(b[prop])) {
	      a[prop] = [];

	      for (var i = 0; i < b[prop].length; i++) {
	        a[prop].push(b[prop][i]);
	      }
	    } else {
	      copyOrDelete(a, b, prop, allowDeletion);
	    }
	  }

	  return a;
	}
	/**
	 * Deep extend an object a with the properties of object b.
	 *
	 * @param a - Target object.
	 * @param b - Source object.
	 * @param protoExtend - If true, the prototype values will also be extended.
	 * (That is the options objects that inherit from others will also get the
	 * inherited options).
	 * @param allowDeletion - If true, the values of fields that are null will be deleted.
	 *
	 * @returns Argument a.
	 */


	function deepExtend(a, b) {
	  var protoExtend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  for (var prop in b) {
	    if (Object.prototype.hasOwnProperty.call(b, prop) || protoExtend === true) {
	      if (_typeof_1(b[prop]) === "object" && b[prop] !== null && getPrototypeOf$5(b[prop]) === Object.prototype) {
	        if (a[prop] === undefined) {
	          a[prop] = deepExtend({}, b[prop], protoExtend); // NOTE: allowDeletion not propagated!
	        } else if (_typeof_1(a[prop]) === "object" && a[prop] !== null && getPrototypeOf$5(a[prop]) === Object.prototype) {
	          deepExtend(a[prop], b[prop], protoExtend); // NOTE: allowDeletion not propagated!
	        } else {
	          copyOrDelete(a, b, prop, allowDeletion);
	        }
	      } else if (isArray$3(b[prop])) {
	        var _context3;

	        a[prop] = slice$6(_context3 = b[prop]).call(_context3);
	      } else {
	        copyOrDelete(a, b, prop, allowDeletion);
	      }
	    }
	  }

	  return a;
	}
	/**
	 * Test whether all elements in two arrays are equal.
	 *
	 * @param a - First array.
	 * @param b - Second array.
	 *
	 * @returns True if both arrays have the same length and same elements (1 = '1').
	 */


	function equalArray(a, b) {
	  if (a.length !== b.length) {
	    return false;
	  }

	  for (var i = 0, len = a.length; i < len; i++) {
	    if (a[i] != b[i]) {
	      return false;
	    }
	  }

	  return true;
	}
	/**
	 * Get the type of an object, for example exports.getType([]) returns 'Array'.
	 *
	 * @param object - Input value of unknown type.
	 *
	 * @returns Detected type.
	 */


	function getType(object) {
	  var type = _typeof_1(object);

	  if (type === "object") {
	    if (object === null) {
	      return "null";
	    }

	    if (object instanceof Boolean) {
	      return "Boolean";
	    }

	    if (object instanceof Number) {
	      return "Number";
	    }

	    if (object instanceof String) {
	      return "String";
	    }

	    if (isArray$3(object)) {
	      return "Array";
	    }

	    if (object instanceof Date) {
	      return "Date";
	    }

	    return "Object";
	  }

	  if (type === "number") {
	    return "Number";
	  }

	  if (type === "boolean") {
	    return "Boolean";
	  }

	  if (type === "string") {
	    return "String";
	  }

	  if (type === undefined) {
	    return "undefined";
	  }

	  return type;
	}
	/**
	 * Used to extend an array and copy it. This is used to propagate paths recursively.
	 *
	 * @param arr - First part.
	 * @param newValue - The value to be aadded into the array.
	 *
	 * @returns A new array with all items from arr and newValue (which is last).
	 */


	function copyAndExtendArray(arr, newValue) {
	  var _context4;

	  return concat$2(_context4 = []).call(_context4, toConsumableArray(arr), [newValue]);
	}
	/**
	 * Used to extend an array and copy it. This is used to propagate paths recursively.
	 *
	 * @param arr - The array to be copied.
	 *
	 * @returns Shallow copy of arr.
	 */


	function copyArray(arr) {
	  return slice$6(arr).call(arr);
	}
	/**
	 * Retrieve the absolute left value of a DOM element.
	 *
	 * @param elem - A dom element, for example a div.
	 *
	 * @returns The absolute left position of this element in the browser page.
	 */


	function getAbsoluteLeft(elem) {
	  return elem.getBoundingClientRect().left;
	}
	/**
	 * Retrieve the absolute right value of a DOM element.
	 *
	 * @param elem - A dom element, for example a div.
	 *
	 * @returns The absolute right position of this element in the browser page.
	 */


	function getAbsoluteRight(elem) {
	  return elem.getBoundingClientRect().right;
	}
	/**
	 * Retrieve the absolute top value of a DOM element.
	 *
	 * @param elem - A dom element, for example a div.
	 *
	 * @returns The absolute top position of this element in the browser page.
	 */


	function getAbsoluteTop(elem) {
	  return elem.getBoundingClientRect().top;
	}
	/**
	 * Add a className to the given elements style.
	 *
	 * @param elem - The element to which the classes will be added.
	 * @param classNames - Space separated list of classes.
	 */


	function addClassName(elem, classNames) {
	  var classes = elem.className.split(" ");
	  var newClasses = classNames.split(" ");
	  classes = concat$2(classes).call(classes, filter$2(newClasses).call(newClasses, function (className) {
	    return indexOf$3(classes).call(classes, className) < 0;
	  }));
	  elem.className = classes.join(" ");
	}
	/**
	 * Remove a className from the given elements style.
	 *
	 * @param elem - The element from which the classes will be removed.
	 * @param classNames - Space separated list of classes.
	 */


	function removeClassName(elem, classNames) {
	  var classes = elem.className.split(" ");
	  var oldClasses = classNames.split(" ");
	  classes = filter$2(classes).call(classes, function (className) {
	    return indexOf$3(oldClasses).call(oldClasses, className) < 0;
	  });
	  elem.className = classes.join(" ");
	}
	/**
	 * For each method for both arrays and objects.
	 * In case of an array, the built-in Array.forEach() is applied (**No, it's not!**).
	 * In case of an Object, the method loops over all properties of the object.
	 *
	 * @param object - An Object or Array to be iterated over.
	 * @param callback - Array.forEach-like callback.
	 */


	function forEach$3(object, callback) {
	  if (isArray$3(object)) {
	    // array
	    var len = object.length;

	    for (var i = 0; i < len; i++) {
	      callback(object[i], i, object);
	    }
	  } else {
	    // object
	    for (var key in object) {
	      if (Object.prototype.hasOwnProperty.call(object, key)) {
	        callback(object[key], key, object);
	      }
	    }
	  }
	}
	/**
	 * Convert an object into an array: all objects properties are put into the array. The resulting array is unordered.
	 *
	 * @param o - Object that contains the properties and methods.
	 *
	 * @returns An array of unordered values.
	 */


	var toArray = values$2;
	/**
	 * Update a property in an object.
	 *
	 * @param object - The object whose property will be updated.
	 * @param key - Name of the property to be updated.
	 * @param value - The new value to be assigned.
	 *
	 * @returns Whether the value was updated (true) or already strictly the same in the original object (false).
	 */

	function updateProperty(object, key, value) {
	  if (object[key] !== value) {
	    object[key] = value;
	    return true;
	  } else {
	    return false;
	  }
	}
	/**
	 * Throttle the given function to be only executed once per animation frame.
	 *
	 * @param fn - The original function.
	 *
	 * @returns The throttled function.
	 */


	function throttle(fn) {
	  var scheduled = false;
	  return function () {
	    if (!scheduled) {
	      scheduled = true;
	      requestAnimationFrame(function () {
	        scheduled = false;
	        fn();
	      });
	    }
	  };
	}
	/**
	 * Add and event listener. Works for all browsers.
	 *
	 * @param element - The element to bind the event listener to.
	 * @param action - Same as Element.addEventListener(action, —, —).
	 * @param listener - Same as Element.addEventListener(—, listener, —).
	 * @param useCapture - Same as Element.addEventListener(—, —, useCapture).
	 */


	function addEventListener(element, action, listener, useCapture) {
	  if (element.addEventListener) {
	    var _context5;

	    if (useCapture === undefined) {
	      useCapture = false;
	    }

	    if (action === "mousewheel" && indexOf$3(_context5 = navigator.userAgent).call(_context5, "Firefox") >= 0) {
	      action = "DOMMouseScroll"; // For Firefox
	    }

	    element.addEventListener(action, listener, useCapture);
	  } else {
	    // @TODO: IE types? Does anyone care?
	    element.attachEvent("on" + action, listener); // IE browsers
	  }
	}
	/**
	 * Remove an event listener from an element.
	 *
	 * @param element - The element to bind the event listener to.
	 * @param action - Same as Element.removeEventListener(action, —, —).
	 * @param listener - Same as Element.removeEventListener(—, listener, —).
	 * @param useCapture - Same as Element.removeEventListener(—, —, useCapture).
	 */


	function removeEventListener(element, action, listener, useCapture) {
	  if (element.removeEventListener) {
	    var _context6;

	    // non-IE browsers
	    if (useCapture === undefined) {
	      useCapture = false;
	    }

	    if (action === "mousewheel" && indexOf$3(_context6 = navigator.userAgent).call(_context6, "Firefox") >= 0) {
	      action = "DOMMouseScroll"; // For Firefox
	    }

	    element.removeEventListener(action, listener, useCapture);
	  } else {
	    // @TODO: IE types? Does anyone care?
	    element.detachEvent("on" + action, listener); // IE browsers
	  }
	}
	/**
	 * Cancels the event's default action if it is cancelable, without stopping further propagation of the event.
	 *
	 * @param event - The event whose default action should be prevented.
	 */


	function preventDefault(event) {
	  if (!event) {
	    event = window.event;
	  }

	  if (!event) ;else if (event.preventDefault) {
	    event.preventDefault(); // non-IE browsers
	  } else {
	    // @TODO: IE types? Does anyone care?
	    event.returnValue = false; // IE browsers
	  }
	}
	/**
	 * Get HTML element which is the target of the event.
	 *
	 * @param event - The event.
	 *
	 * @returns The element or null if not obtainable.
	 */


	function getTarget() {
	  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;
	  // code from http://www.quirksmode.org/js/events_properties.html
	  // @TODO: EventTarget can be almost anything, is it okay to return only Elements?
	  var target = null;
	  if (!event) ;else if (event.target) {
	    target = event.target;
	  } else if (event.srcElement) {
	    target = event.srcElement;
	  }

	  if (!(target instanceof Element)) {
	    return null;
	  }

	  if (target.nodeType != null && target.nodeType == 3) {
	    // defeat Safari bug
	    target = target.parentNode;

	    if (!(target instanceof Element)) {
	      return null;
	    }
	  }

	  return target;
	}
	/**
	 * Check if given element contains given parent somewhere in the DOM tree.
	 *
	 * @param element - The element to be tested.
	 * @param parent - The ancestor (not necessarily parent) of the element.
	 *
	 * @returns True if parent is an ancestor of the element, false otherwise.
	 */


	function hasParent(element, parent) {
	  var elem = element;

	  while (elem) {
	    if (elem === parent) {
	      return true;
	    } else if (elem.parentNode) {
	      elem = elem.parentNode;
	    } else {
	      return false;
	    }
	  }

	  return false;
	}

	var option = {
	  /**
	   * Convert a value into a boolean.
	   *
	   * @param value - Value to be converted intoboolean, a function will be executed as `(() => unknown)`.
	   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
	   *
	   * @returns Corresponding boolean value, if none then the default value, if none then null.
	   */
	  asBoolean: function asBoolean(value, defaultValue) {
	    if (typeof value == "function") {
	      value = value();
	    }

	    if (value != null) {
	      return value != false;
	    }

	    return defaultValue || null;
	  },

	  /**
	   * Convert a value into a number.
	   *
	   * @param value - Value to be converted intonumber, a function will be executed as `(() => unknown)`.
	   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
	   *
	   * @returns Corresponding **boxed** number value, if none then the default value, if none then null.
	   */
	  asNumber: function asNumber(value, defaultValue) {
	    if (typeof value == "function") {
	      value = value();
	    }

	    if (value != null) {
	      return Number(value) || defaultValue || null;
	    }

	    return defaultValue || null;
	  },

	  /**
	   * Convert a value into a string.
	   *
	   * @param value - Value to be converted intostring, a function will be executed as `(() => unknown)`.
	   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
	   *
	   * @returns Corresponding **boxed** string value, if none then the default value, if none then null.
	   */
	  asString: function asString(value, defaultValue) {
	    if (typeof value == "function") {
	      value = value();
	    }

	    if (value != null) {
	      return String(value);
	    }

	    return defaultValue || null;
	  },

	  /**
	   * Convert a value into a size.
	   *
	   * @param value - Value to be converted intosize, a function will be executed as `(() => unknown)`.
	   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
	   *
	   * @returns Corresponding string value (number + 'px'), if none then the default value, if none then null.
	   */
	  asSize: function asSize(value, defaultValue) {
	    if (typeof value == "function") {
	      value = value();
	    }

	    if (isString(value)) {
	      return value;
	    } else if (isNumber(value)) {
	      return value + "px";
	    } else {
	      return defaultValue || null;
	    }
	  },

	  /**
	   * Convert a value into a DOM Element.
	   *
	   * @param value - Value to be converted into DOM Element, a function will be executed as `(() => unknown)`.
	   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
	   *
	   * @returns The DOM Element, if none then the default value, if none then null.
	   */
	  asElement: function asElement(value, defaultValue) {
	    if (typeof value == "function") {
	      value = value();
	    }

	    return value || defaultValue || null;
	  }
	};
	/**
	 * Convert hex color string into RGB color object.
	 *
	 * @remarks
	 * {@link http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
	 *
	 * @param hex - Hex color string (3 or 6 digits, with or without #).
	 *
	 * @returns RGB color object.
	 */

	function hexToRGB(hex) {
	  var result;

	  switch (hex.length) {
	    case 3:
	    case 4:
	      result = shortHexRE.exec(hex);
	      return result ? {
	        r: _parseInt$2(result[1] + result[1], 16),
	        g: _parseInt$2(result[2] + result[2], 16),
	        b: _parseInt$2(result[3] + result[3], 16)
	      } : null;

	    case 6:
	    case 7:
	      result = fullHexRE.exec(hex);
	      return result ? {
	        r: _parseInt$2(result[1], 16),
	        g: _parseInt$2(result[2], 16),
	        b: _parseInt$2(result[3], 16)
	      } : null;

	    default:
	      return null;
	  }
	}
	/**
	 * This function takes string color in hex or RGB format and adds the opacity, RGBA is passed through unchanged.
	 *
	 * @param color - The color string (hex, RGB, RGBA).
	 * @param opacity - The new opacity.
	 *
	 * @returns RGBA string, for example 'rgba(255, 0, 127, 0.3)'.
	 */


	function overrideOpacity(color, opacity) {
	  if (indexOf$3(color).call(color, "rgba") !== -1) {
	    return color;
	  } else if (indexOf$3(color).call(color, "rgb") !== -1) {
	    var rgb = color.substr(indexOf$3(color).call(color, "(") + 1).replace(")", "").split(",");
	    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opacity + ")";
	  } else {
	    var _rgb = hexToRGB(color);

	    if (_rgb == null) {
	      return color;
	    } else {
	      return "rgba(" + _rgb.r + "," + _rgb.g + "," + _rgb.b + "," + opacity + ")";
	    }
	  }
	}
	/**
	 * Convert RGB \<0, 255\> into hex color string.
	 *
	 * @param red - Red channel.
	 * @param green - Green channel.
	 * @param blue - Blue channel.
	 *
	 * @returns Hex color string (for example: '#0acdc0').
	 */


	function RGBToHex(red, green, blue) {
	  var _context7;

	  return "#" + slice$6(_context7 = ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16)).call(_context7, 1);
	}
	/**
	 * Parse a color property into an object with border, background, and highlight colors.
	 *
	 * @param inputColor - Shorthand color string or input color object.
	 * @param defaultColor - Full color object to fill in missing values in inputColor.
	 *
	 * @returns Color object.
	 */


	function parseColor(inputColor, defaultColor) {
	  if (isString(inputColor)) {
	    var colorStr = inputColor;

	    if (isValidRGB(colorStr)) {
	      var _context8;

	      var rgb = map$2(_context8 = colorStr.substr(4).substr(0, colorStr.length - 5).split(",")).call(_context8, function (value) {
	        return _parseInt$2(value);
	      });

	      colorStr = RGBToHex(rgb[0], rgb[1], rgb[2]);
	    }

	    if (isValidHex(colorStr) === true) {
	      var hsv = hexToHSV(colorStr);
	      var lighterColorHSV = {
	        h: hsv.h,
	        s: hsv.s * 0.8,
	        v: Math.min(1, hsv.v * 1.02)
	      };
	      var darkerColorHSV = {
	        h: hsv.h,
	        s: Math.min(1, hsv.s * 1.25),
	        v: hsv.v * 0.8
	      };
	      var darkerColorHex = HSVToHex(darkerColorHSV.h, darkerColorHSV.s, darkerColorHSV.v);
	      var lighterColorHex = HSVToHex(lighterColorHSV.h, lighterColorHSV.s, lighterColorHSV.v);
	      return {
	        background: colorStr,
	        border: darkerColorHex,
	        highlight: {
	          background: lighterColorHex,
	          border: darkerColorHex
	        },
	        hover: {
	          background: lighterColorHex,
	          border: darkerColorHex
	        }
	      };
	    } else {
	      return {
	        background: colorStr,
	        border: colorStr,
	        highlight: {
	          background: colorStr,
	          border: colorStr
	        },
	        hover: {
	          background: colorStr,
	          border: colorStr
	        }
	      };
	    }
	  } else {
	    if (defaultColor) {
	      var color = {
	        background: inputColor.background || defaultColor.background,
	        border: inputColor.border || defaultColor.border,
	        highlight: isString(inputColor.highlight) ? {
	          border: inputColor.highlight,
	          background: inputColor.highlight
	        } : {
	          background: inputColor.highlight && inputColor.highlight.background || defaultColor.highlight.background,
	          border: inputColor.highlight && inputColor.highlight.border || defaultColor.highlight.border
	        },
	        hover: isString(inputColor.hover) ? {
	          border: inputColor.hover,
	          background: inputColor.hover
	        } : {
	          border: inputColor.hover && inputColor.hover.border || defaultColor.hover.border,
	          background: inputColor.hover && inputColor.hover.background || defaultColor.hover.background
	        }
	      };
	      return color;
	    } else {
	      var _color = {
	        background: inputColor.background || undefined,
	        border: inputColor.border || undefined,
	        highlight: isString(inputColor.highlight) ? {
	          border: inputColor.highlight,
	          background: inputColor.highlight
	        } : {
	          background: inputColor.highlight && inputColor.highlight.background || undefined,
	          border: inputColor.highlight && inputColor.highlight.border || undefined
	        },
	        hover: isString(inputColor.hover) ? {
	          border: inputColor.hover,
	          background: inputColor.hover
	        } : {
	          border: inputColor.hover && inputColor.hover.border || undefined,
	          background: inputColor.hover && inputColor.hover.background || undefined
	        }
	      };
	      return _color;
	    }
	  }
	}
	/**
	 * Convert RGB \<0, 255\> into HSV object.
	 *
	 * @remarks
	 * {@link http://www.javascripter.net/faq/rgb2hsv.htm}
	 *
	 * @param red - Red channel.
	 * @param green - Green channel.
	 * @param blue - Blue channel.
	 *
	 * @returns HSV color object.
	 */


	function RGBToHSV(red, green, blue) {
	  red = red / 255;
	  green = green / 255;
	  blue = blue / 255;
	  var minRGB = Math.min(red, Math.min(green, blue));
	  var maxRGB = Math.max(red, Math.max(green, blue)); // Black-gray-white

	  if (minRGB === maxRGB) {
	    return {
	      h: 0,
	      s: 0,
	      v: minRGB
	    };
	  } // Colors other than black-gray-white:


	  var d = red === minRGB ? green - blue : blue === minRGB ? red - green : blue - red;
	  var h = red === minRGB ? 3 : blue === minRGB ? 1 : 5;
	  var hue = 60 * (h - d / (maxRGB - minRGB)) / 360;
	  var saturation = (maxRGB - minRGB) / maxRGB;
	  var value = maxRGB;
	  return {
	    h: hue,
	    s: saturation,
	    v: value
	  };
	}

	var cssUtil = {
	  // split a string with css styles into an object with key/values
	  split: function split(cssText) {
	    var _context9;

	    var styles = {};

	    forEach$2(_context9 = cssText.split(";")).call(_context9, function (style) {
	      if (trim$2(style).call(style) != "") {
	        var _context10, _context11;

	        var parts = style.split(":");

	        var key = trim$2(_context10 = parts[0]).call(_context10);

	        var value = trim$2(_context11 = parts[1]).call(_context11);

	        styles[key] = value;
	      }
	    });

	    return styles;
	  },
	  // build a css text string from an object with key/values
	  join: function join(styles) {
	    var _context12;

	    return map$2(_context12 = keys$3(styles)).call(_context12, function (key) {
	      return key + ": " + styles[key];
	    }).join("; ");
	  }
	};
	/**
	 * Append a string with css styles to an element.
	 *
	 * @param element - The element that will receive new styles.
	 * @param cssText - The styles to be appended.
	 */

	function addCssText(element, cssText) {
	  var currentStyles = cssUtil.split(element.style.cssText);
	  var newStyles = cssUtil.split(cssText);

	  var styles = _objectSpread(_objectSpread({}, currentStyles), newStyles);

	  element.style.cssText = cssUtil.join(styles);
	}
	/**
	 * Remove a string with css styles from an element.
	 *
	 * @param element - The element from which styles should be removed.
	 * @param cssText - The styles to be removed.
	 */


	function removeCssText(element, cssText) {
	  var styles = cssUtil.split(element.style.cssText);
	  var removeStyles = cssUtil.split(cssText);

	  for (var key in removeStyles) {
	    if (Object.prototype.hasOwnProperty.call(removeStyles, key)) {
	      delete styles[key];
	    }
	  }

	  element.style.cssText = cssUtil.join(styles);
	}
	/**
	 * Convert HSV \<0, 1\> into RGB color object.
	 *
	 * @remarks
	 * {@link https://gist.github.com/mjijackson/5311256}
	 *
	 * @param h - Hue.
	 * @param s - Saturation.
	 * @param v - Value.
	 *
	 * @returns RGB color object.
	 */


	function HSVToRGB(h, s, v) {
	  var r;
	  var g;
	  var b;
	  var i = Math.floor(h * 6);
	  var f = h * 6 - i;
	  var p = v * (1 - s);
	  var q = v * (1 - f * s);
	  var t = v * (1 - (1 - f) * s);

	  switch (i % 6) {
	    case 0:
	      r = v, g = t, b = p;
	      break;

	    case 1:
	      r = q, g = v, b = p;
	      break;

	    case 2:
	      r = p, g = v, b = t;
	      break;

	    case 3:
	      r = p, g = q, b = v;
	      break;

	    case 4:
	      r = t, g = p, b = v;
	      break;

	    case 5:
	      r = v, g = p, b = q;
	      break;
	  }

	  return {
	    r: Math.floor(r * 255),
	    g: Math.floor(g * 255),
	    b: Math.floor(b * 255)
	  };
	}
	/**
	 * Convert HSV \<0, 1\> into hex color string.
	 *
	 * @param h - Hue.
	 * @param s - Saturation.
	 * @param v - Value.
	 *
	 * @returns Hex color string.
	 */


	function HSVToHex(h, s, v) {
	  var rgb = HSVToRGB(h, s, v);
	  return RGBToHex(rgb.r, rgb.g, rgb.b);
	}
	/**
	 * Convert hex color string into HSV \<0, 1\>.
	 *
	 * @param hex - Hex color string.
	 *
	 * @returns HSV color object.
	 */


	function hexToHSV(hex) {
	  var rgb = hexToRGB(hex);

	  if (!rgb) {
	    throw new TypeError("'".concat(hex, "' is not a valid color."));
	  }

	  return RGBToHSV(rgb.r, rgb.g, rgb.b);
	}
	/**
	 * Validate hex color string.
	 *
	 * @param hex - Unknown string that may contain a color.
	 *
	 * @returns True if the string is valid, false otherwise.
	 */


	function isValidHex(hex) {
	  var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
	  return isOk;
	}
	/**
	 * Validate RGB color string.
	 *
	 * @param rgb - Unknown string that may contain a color.
	 *
	 * @returns True if the string is valid, false otherwise.
	 */


	function isValidRGB(rgb) {
	  return rgbRE.test(rgb);
	}
	/**
	 * Validate RGBA color string.
	 *
	 * @param rgba - Unknown string that may contain a color.
	 *
	 * @returns True if the string is valid, false otherwise.
	 */


	function isValidRGBA(rgba) {
	  return rgbaRE.test(rgba);
	}
	/**
	 * This recursively redirects the prototype of JSON objects to the referenceObject.
	 * This is used for default options.
	 *
	 * @param fields - Names of properties to be bridged.
	 * @param referenceObject - The original object.
	 *
	 * @returns A new object inheriting from the referenceObject.
	 */


	function selectiveBridgeObject(fields, referenceObject) {
	  if (referenceObject !== null && _typeof_1(referenceObject) === "object") {
	    // !!! typeof null === 'object'
	    var objectTo = create$4(referenceObject);

	    for (var i = 0; i < fields.length; i++) {
	      if (Object.prototype.hasOwnProperty.call(referenceObject, fields[i])) {
	        if (_typeof_1(referenceObject[fields[i]]) == "object") {
	          objectTo[fields[i]] = bridgeObject(referenceObject[fields[i]]);
	        }
	      }
	    }

	    return objectTo;
	  } else {
	    return null;
	  }
	}
	/**
	 * This recursively redirects the prototype of JSON objects to the referenceObject.
	 * This is used for default options.
	 *
	 * @param referenceObject - The original object.
	 *
	 * @returns The Element if the referenceObject is an Element, or a new object inheriting from the referenceObject.
	 */


	function bridgeObject(referenceObject) {
	  if (referenceObject === null || _typeof_1(referenceObject) !== "object") {
	    return null;
	  }

	  if (referenceObject instanceof Element) {
	    // Avoid bridging DOM objects
	    return referenceObject;
	  }

	  var objectTo = create$4(referenceObject);

	  for (var i in referenceObject) {
	    if (Object.prototype.hasOwnProperty.call(referenceObject, i)) {
	      if (_typeof_1(referenceObject[i]) == "object") {
	        objectTo[i] = bridgeObject(referenceObject[i]);
	      }
	    }
	  }

	  return objectTo;
	}
	/**
	 * This method provides a stable sort implementation, very fast for presorted data.
	 *
	 * @param a - The array to be sorted (in-place).
	 * @param compare - An order comparator.
	 *
	 * @returns The argument a.
	 */


	function insertSort(a, compare) {
	  for (var i = 0; i < a.length; i++) {
	    var k = a[i];
	    var j = void 0;

	    for (j = i; j > 0 && compare(k, a[j - 1]) < 0; j--) {
	      a[j] = a[j - 1];
	    }

	    a[j] = k;
	  }

	  return a;
	}
	/**
	 * This is used to set the options of subobjects in the options object.
	 *
	 * A requirement of these subobjects is that they have an 'enabled' element
	 * which is optional for the user but mandatory for the program.
	 *
	 * The added value here of the merge is that option 'enabled' is set as required.
	 *
	 * @param mergeTarget - Either this.options or the options used for the groups.
	 * @param options - Options.
	 * @param option - Option key in the options argument.
	 * @param globalOptions - Global options, passed in to determine value of option 'enabled'.
	 */


	function mergeOptions(mergeTarget, options, option) {
	  var globalOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  // Local helpers
	  var isPresent = function isPresent(obj) {
	    return obj !== null && obj !== undefined;
	  };

	  var isObject = function isObject(obj) {
	    return obj !== null && _typeof_1(obj) === "object";
	  }; // https://stackoverflow.com/a/34491287/1223531


	  var isEmpty = function isEmpty(obj) {
	    for (var x in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, x)) {
	        return false;
	      }
	    }

	    return true;
	  }; // Guards


	  if (!isObject(mergeTarget)) {
	    throw new Error("Parameter mergeTarget must be an object");
	  }

	  if (!isObject(options)) {
	    throw new Error("Parameter options must be an object");
	  }

	  if (!isPresent(option)) {
	    throw new Error("Parameter option must have a value");
	  }

	  if (!isObject(globalOptions)) {
	    throw new Error("Parameter globalOptions must be an object");
	  } //
	  // Actual merge routine, separated from main logic
	  // Only a single level of options is merged. Deeper levels are ref'd. This may actually be an issue.
	  //


	  var doMerge = function doMerge(target, options, option) {
	    if (!isObject(target[option])) {
	      target[option] = {};
	    }

	    var src = options[option];
	    var dst = target[option];

	    for (var prop in src) {
	      if (Object.prototype.hasOwnProperty.call(src, prop)) {
	        dst[prop] = src[prop];
	      }
	    }
	  }; // Local initialization


	  var srcOption = options[option];
	  var globalPassed = isObject(globalOptions) && !isEmpty(globalOptions);
	  var globalOption = globalPassed ? globalOptions[option] : undefined;
	  var globalEnabled = globalOption ? globalOption.enabled : undefined; /////////////////////////////////////////
	  // Main routine
	  /////////////////////////////////////////

	  if (srcOption === undefined) {
	    return; // Nothing to do
	  }

	  if (typeof srcOption === "boolean") {
	    if (!isObject(mergeTarget[option])) {
	      mergeTarget[option] = {};
	    }

	    mergeTarget[option].enabled = srcOption;
	    return;
	  }

	  if (srcOption === null && !isObject(mergeTarget[option])) {
	    // If possible, explicit copy from globals
	    if (isPresent(globalOption)) {
	      mergeTarget[option] = create$4(globalOption);
	    } else {
	      return; // Nothing to do
	    }
	  }

	  if (!isObject(srcOption)) {
	    return;
	  } //
	  // Ensure that 'enabled' is properly set. It is required internally
	  // Note that the value from options will always overwrite the existing value
	  //


	  var enabled = true; // default value

	  if (srcOption.enabled !== undefined) {
	    enabled = srcOption.enabled;
	  } else {
	    // Take from globals, if present
	    if (globalEnabled !== undefined) {
	      enabled = globalOption.enabled;
	    }
	  }

	  doMerge(mergeTarget, options, option);
	  mergeTarget[option].enabled = enabled;
	}
	/**
	 * This function does a binary search for a visible item in a sorted list. If we find a visible item, the code that uses
	 * this function will then iterate in both directions over this sorted list to find all visible items.
	 *
	 * @param orderedItems - Items ordered by start.
	 * @param comparator - -1 is lower, 0 is equal, 1 is higher.
	 * @param field - Property name on an item (That is item[field]).
	 * @param field2 - Second property name on an item (That is item[field][field2]).
	 *
	 * @returns Index of the found item or -1 if nothing was found.
	 */


	function binarySearchCustom(orderedItems, comparator, field, field2) {
	  var maxIterations = 10000;
	  var iteration = 0;
	  var low = 0;
	  var high = orderedItems.length - 1;

	  while (low <= high && iteration < maxIterations) {
	    var middle = Math.floor((low + high) / 2);
	    var item = orderedItems[middle];
	    var value = field2 === undefined ? item[field] : item[field][field2];
	    var searchResult = comparator(value);

	    if (searchResult == 0) {
	      // jihaa, found a visible item!
	      return middle;
	    } else if (searchResult == -1) {
	      // it is too small --> increase low
	      low = middle + 1;
	    } else {
	      // it is too big --> decrease high
	      high = middle - 1;
	    }

	    iteration++;
	  }

	  return -1;
	}
	/**
	 * This function does a binary search for a specific value in a sorted array.
	 * If it does not exist but is in between of two values, we return either the
	 * one before or the one after, depending on user input If it is found, we
	 * return the index, else -1.
	 *
	 * @param orderedItems - Sorted array.
	 * @param target - The searched value.
	 * @param field - Name of the property in items to be searched.
	 * @param sidePreference - If the target is between two values, should the index of the before or the after be returned?
	 * @param comparator - An optional comparator, returning -1, 0, 1 for \<, ===, \>.
	 *
	 * @returns The index of found value or -1 if nothing was found.
	 */


	function binarySearchValue(orderedItems, target, field, sidePreference, comparator) {
	  var maxIterations = 10000;
	  var iteration = 0;
	  var low = 0;
	  var high = orderedItems.length - 1;
	  var prevValue;
	  var value;
	  var nextValue;
	  var middle;
	  comparator = comparator != undefined ? comparator : function (a, b) {
	    return a == b ? 0 : a < b ? -1 : 1;
	  };

	  while (low <= high && iteration < maxIterations) {
	    // get a new guess
	    middle = Math.floor(0.5 * (high + low));
	    prevValue = orderedItems[Math.max(0, middle - 1)][field];
	    value = orderedItems[middle][field];
	    nextValue = orderedItems[Math.min(orderedItems.length - 1, middle + 1)][field];

	    if (comparator(value, target) == 0) {
	      // we found the target
	      return middle;
	    } else if (comparator(prevValue, target) < 0 && comparator(value, target) > 0) {
	      // target is in between of the previous and the current
	      return sidePreference == "before" ? Math.max(0, middle - 1) : middle;
	    } else if (comparator(value, target) < 0 && comparator(nextValue, target) > 0) {
	      // target is in between of the current and the next
	      return sidePreference == "before" ? middle : Math.min(orderedItems.length - 1, middle + 1);
	    } else {
	      // didnt find the target, we need to change our boundaries.
	      if (comparator(value, target) < 0) {
	        // it is too small --> increase low
	        low = middle + 1;
	      } else {
	        // it is too big --> decrease high
	        high = middle - 1;
	      }
	    }

	    iteration++;
	  } // didnt find anything. Return -1.


	  return -1;
	}
	/*
	 * Easing Functions.
	 * Only considering the t value for the range [0, 1] => [0, 1].
	 *
	 * Inspiration: from http://gizma.com/easing/
	 * https://gist.github.com/gre/1650294
	 */


	var easingFunctions = {
	  /**
	   * Provides no easing and no acceleration.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  linear: function linear(t) {
	    return t;
	  },

	  /**
	   * Accelerate from zero velocity.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeInQuad: function easeInQuad(t) {
	    return t * t;
	  },

	  /**
	   * Decelerate to zero velocity.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeOutQuad: function easeOutQuad(t) {
	    return t * (2 - t);
	  },

	  /**
	   * Accelerate until halfway, then decelerate.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeInOutQuad: function easeInOutQuad(t) {
	    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	  },

	  /**
	   * Accelerate from zero velocity.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeInCubic: function easeInCubic(t) {
	    return t * t * t;
	  },

	  /**
	   * Decelerate to zero velocity.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeOutCubic: function easeOutCubic(t) {
	    return --t * t * t + 1;
	  },

	  /**
	   * Accelerate until halfway, then decelerate.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeInOutCubic: function easeInOutCubic(t) {
	    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	  },

	  /**
	   * Accelerate from zero velocity.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeInQuart: function easeInQuart(t) {
	    return t * t * t * t;
	  },

	  /**
	   * Decelerate to zero velocity.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeOutQuart: function easeOutQuart(t) {
	    return 1 - --t * t * t * t;
	  },

	  /**
	   * Accelerate until halfway, then decelerate.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeInOutQuart: function easeInOutQuart(t) {
	    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
	  },

	  /**
	   * Accelerate from zero velocity.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeInQuint: function easeInQuint(t) {
	    return t * t * t * t * t;
	  },

	  /**
	   * Decelerate to zero velocity.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeOutQuint: function easeOutQuint(t) {
	    return 1 + --t * t * t * t * t;
	  },

	  /**
	   * Accelerate until halfway, then decelerate.
	   *
	   * @param t - Time.
	   *
	   * @returns Value at time t.
	   */
	  easeInOutQuint: function easeInOutQuint(t) {
	    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
	  }
	};
	/**
	 * Experimentaly compute the width of the scrollbar for this browser.
	 *
	 * @returns The width in pixels.
	 */

	function getScrollBarWidth() {
	  var inner = document.createElement("p");
	  inner.style.width = "100%";
	  inner.style.height = "200px";
	  var outer = document.createElement("div");
	  outer.style.position = "absolute";
	  outer.style.top = "0px";
	  outer.style.left = "0px";
	  outer.style.visibility = "hidden";
	  outer.style.width = "200px";
	  outer.style.height = "150px";
	  outer.style.overflow = "hidden";
	  outer.appendChild(inner);
	  document.body.appendChild(outer);
	  var w1 = inner.offsetWidth;
	  outer.style.overflow = "scroll";
	  var w2 = inner.offsetWidth;

	  if (w1 == w2) {
	    w2 = outer.clientWidth;
	  }

	  document.body.removeChild(outer);
	  return w1 - w2;
	} // @TODO: This doesn't work properly.
	// It works only for single property objects,
	// otherwise it combines all of the types in a union.
	// export function topMost<K1 extends string, V1> (
	//   pile: Record<K1, undefined | V1>[],
	//   accessors: K1 | [K1]
	// ): undefined | V1
	// export function topMost<K1 extends string, K2 extends string, V1, V2> (
	//   pile: Record<K1, undefined | V1 | Record<K2, undefined | V2>>[],
	//   accessors: [K1, K2]
	// ): undefined | V1 | V2
	// export function topMost<K1 extends string, K2 extends string, K3 extends string, V1, V2, V3> (
	//   pile: Record<K1, undefined | V1 | Record<K2, undefined | V2 | Record<K3, undefined | V3>>>[],
	//   accessors: [K1, K2, K3]
	// ): undefined | V1 | V2 | V3

	/**
	 * Get the top most property value from a pile of objects.
	 *
	 * @param pile - Array of objects, no required format.
	 * @param accessors - Array of property names.
	 * For example `object['foo']['bar']` → `['foo', 'bar']`.
	 *
	 * @returns Value of the property with given accessors path from the first pile item where it's not undefined.
	 */


	function topMost(pile, accessors) {
	  var candidate;

	  if (!isArray$3(accessors)) {
	    accessors = [accessors];
	  }

	  var _iterator2 = _createForOfIteratorHelper(pile),
	      _step2;

	  try {
	    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	      var member = _step2.value;

	      if (member) {
	        candidate = member[accessors[0]];

	        for (var i = 1; i < accessors.length; i++) {
	          if (candidate) {
	            candidate = candidate[accessors[i]];
	          }
	        }

	        if (typeof candidate !== "undefined") {
	          break;
	        }
	      }
	    }
	  } catch (err) {
	    _iterator2.e(err);
	  } finally {
	    _iterator2.f();
	  }

	  return candidate;
	}

	var util = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Alea: Alea,
		DELETE: DELETE,
		HSVToHex: HSVToHex,
		HSVToRGB: HSVToRGB,
		RGBToHSV: RGBToHSV,
		RGBToHex: RGBToHex,
		addClassName: addClassName,
		addCssText: addCssText,
		addEventListener: addEventListener,
		binarySearchCustom: binarySearchCustom,
		binarySearchValue: binarySearchValue,
		bridgeObject: bridgeObject,
		copyAndExtendArray: copyAndExtendArray,
		copyArray: copyArray,
		deepExtend: deepExtend,
		deepObjectAssign: deepObjectAssign,
		easingFunctions: easingFunctions,
		equalArray: equalArray,
		extend: extend,
		fillIfDefined: fillIfDefined,
		forEach: forEach$3,
		getAbsoluteLeft: getAbsoluteLeft,
		getAbsoluteRight: getAbsoluteRight,
		getAbsoluteTop: getAbsoluteTop,
		getScrollBarWidth: getScrollBarWidth,
		getTarget: getTarget,
		getType: getType,
		hasParent: hasParent,
		hexToHSV: hexToHSV,
		hexToRGB: hexToRGB,
		insertSort: insertSort,
		isDate: isDate,
		isNumber: isNumber,
		isObject: isObject$1,
		isString: isString,
		isValidHex: isValidHex,
		isValidRGB: isValidRGB,
		isValidRGBA: isValidRGBA,
		mergeOptions: mergeOptions,
		option: option,
		overrideOpacity: overrideOpacity,
		parseColor: parseColor,
		preventDefault: preventDefault,
		pureDeepObjectAssign: pureDeepObjectAssign,
		recursiveDOMDelete: recursiveDOMDelete,
		removeClassName: removeClassName,
		removeCssText: removeCssText,
		removeEventListener: removeEventListener,
		selectiveBridgeObject: selectiveBridgeObject,
		selectiveDeepExtend: selectiveDeepExtend,
		selectiveExtend: selectiveExtend,
		selectiveNotDeepExtend: selectiveNotDeepExtend,
		throttle: throttle,
		toArray: toArray,
		topMost: topMost,
		updateProperty: updateProperty
	});

	function ownKeys$5(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$3(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context8; forEach$2(_context8 = ownKeys$5(Object(source), true)).call(_context8, function (key) { defineProperty$7(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context9; forEach$2(_context9 = ownKeys$5(Object(source))).call(_context9, function (key) { defineProperty$6(target, key, getOwnPropertyDescriptor$3(source, key)); }); } } return target; }
	// for example '/Date(1198908717056)/' or '/Date(1198908717056-0700)/'
	// code from http://momentjs.com/

	var ASPDateRegex$1 = /^\/?Date\((-?\d+)/i;
	var NumericRegex = /^\d+$/;
	/**
	 * Convert an object into another type
	 *
	 * @param object - Value of unknown type.
	 * @param type - Name of the desired type.
	 *
	 * @returns Object in the desired type.
	 * @throws Error
	 */

	function convert(object, type) {
	  var match;

	  if (object === undefined) {
	    return undefined;
	  }

	  if (object === null) {
	    return null;
	  }

	  if (!type) {
	    return object;
	  }

	  if (!(typeof type === "string") && !(type instanceof String)) {
	    throw new Error("Type must be a string");
	  } //noinspection FallthroughInSwitchStatementJS


	  switch (type) {
	    case "boolean":
	    case "Boolean":
	      return Boolean(object);

	    case "number":
	    case "Number":
	      if (isString(object) && !isNaN(Date.parse(object))) {
	        return moment__default['default'](object).valueOf();
	      } else {
	        // @TODO: I don't think that Number and String constructors are a good idea.
	        // This could also fail if the object doesn't have valueOf method or if it's redefined.
	        // For example: Object.create(null) or { valueOf: 7 }.
	        return Number(object.valueOf());
	      }

	    case "string":
	    case "String":
	      return String(object);

	    case "Date":
	      try {
	        return convert(object, "Moment").toDate();
	      } catch (e) {
	        if (e instanceof TypeError) {
	          throw new TypeError("Cannot convert object of type " + getType(object) + " to type " + type);
	        } else {
	          throw e;
	        }
	      }

	    case "Moment":
	      if (isNumber(object)) {
	        return moment__default['default'](object);
	      }

	      if (object instanceof Date) {
	        return moment__default['default'](object.valueOf());
	      } else if (moment__default['default'].isMoment(object)) {
	        return moment__default['default'](object);
	      }

	      if (isString(object)) {
	        match = ASPDateRegex$1.exec(object);

	        if (match) {
	          // object is an ASP date
	          return moment__default['default'](Number(match[1])); // parse number
	        }

	        match = NumericRegex.exec(object);

	        if (match) {
	          return moment__default['default'](Number(object));
	        }

	        return moment__default['default'](object); // parse string
	      } else {
	        throw new TypeError("Cannot convert object of type " + getType(object) + " to type " + type);
	      }

	    case "ISODate":
	      if (isNumber(object)) {
	        return new Date(object);
	      } else if (object instanceof Date) {
	        return object.toISOString();
	      } else if (moment__default['default'].isMoment(object)) {
	        return object.toDate().toISOString();
	      } else if (isString(object)) {
	        match = ASPDateRegex$1.exec(object);

	        if (match) {
	          // object is an ASP date
	          return new Date(Number(match[1])).toISOString(); // parse number
	        } else {
	          return moment__default['default'](object).format(); // ISO 8601
	        }
	      } else {
	        throw new Error("Cannot convert object of type " + getType(object) + " to type ISODate");
	      }

	    case "ASPDate":
	      if (isNumber(object)) {
	        return "/Date(" + object + ")/";
	      } else if (object instanceof Date || moment__default['default'].isMoment(object)) {
	        return "/Date(" + object.valueOf() + ")/";
	      } else if (isString(object)) {
	        match = ASPDateRegex$1.exec(object);
	        var value;

	        if (match) {
	          // object is an ASP date
	          value = new Date(Number(match[1])).valueOf(); // parse number
	        } else {
	          value = new Date(object).valueOf(); // parse string
	        }

	        return "/Date(" + value + ")/";
	      } else {
	        throw new Error("Cannot convert object of type " + getType(object) + " to type ASPDate");
	      }

	    default:
	      throw new Error("Unknown type ".concat(type));
	  }
	}
	/**
	 * Create a Data Set like wrapper to seamlessly coerce data types.
	 *
	 * @param rawDS - The Data Set with raw uncoerced data.
	 * @param type - A record assigning a data type to property name.
	 *
	 * @remarks
	 * The write operations (`add`, `remove`, `update` and `updateOnly`) write into
	 * the raw (uncoerced) data set. These values are then picked up by a pipe
	 * which coerces the values using the [[convert]] function and feeds them into
	 * the coerced data set. When querying (`forEach`, `get`, `getIds`, `off` and
	 * `on`) the values are then fetched from the coerced data set and already have
	 * the required data types. The values are coerced only once when inserted and
	 * then the same value is returned each time until it is updated or deleted.
	 *
	 * For example: `typeCoercedDataSet.add({ id: 7, start: "2020-01-21" })` would
	 * result in `typeCoercedDataSet.get(7)` returning `{ id: 7, start: moment(new
	 * Date("2020-01-21")).toDate() }`.
	 *
	 * Use the dispose method prior to throwing a reference to this away. Otherwise
	 * the pipe connecting the two Data Sets will keep the unaccessible coerced
	 * Data Set alive and updated as long as the raw Data Set exists.
	 *
	 * @returns A Data Set like object that saves data into the raw Data Set and
	 * retrieves them from the coerced Data Set.
	 */

	function typeCoerceDataSet(rawDS) {
	  var _context, _context3, _context4, _context5, _context6, _context7;

	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    start: "Date",
	    end: "Date"
	  };
	  var idProp = rawDS._idProp;
	  var coercedDS = new esnext.DataSet({
	    fieldId: idProp
	  });

	  var pipe = map$2(_context = esnext.createNewDataPipeFrom(rawDS)).call(_context, function (item) {
	    var _context2;

	    return reduce$2(_context2 = keys$3(item)).call(_context2, function (acc, key) {
	      acc[key] = convert(item[key], type[key]);
	      return acc;
	    }, {});
	  }).to(coercedDS);

	  pipe.all().start();
	  return {
	    // Write only.
	    add: function add() {
	      var _rawDS$getDataSet;

	      return (_rawDS$getDataSet = rawDS.getDataSet()).add.apply(_rawDS$getDataSet, arguments);
	    },
	    remove: function remove() {
	      var _rawDS$getDataSet2;

	      return (_rawDS$getDataSet2 = rawDS.getDataSet()).remove.apply(_rawDS$getDataSet2, arguments);
	    },
	    update: function update() {
	      var _rawDS$getDataSet3;

	      return (_rawDS$getDataSet3 = rawDS.getDataSet()).update.apply(_rawDS$getDataSet3, arguments);
	    },
	    updateOnly: function updateOnly() {
	      var _rawDS$getDataSet4;

	      return (_rawDS$getDataSet4 = rawDS.getDataSet()).updateOnly.apply(_rawDS$getDataSet4, arguments);
	    },
	    clear: function clear() {
	      var _rawDS$getDataSet5;

	      return (_rawDS$getDataSet5 = rawDS.getDataSet()).clear.apply(_rawDS$getDataSet5, arguments);
	    },
	    // Read only.
	    forEach: bind$2(_context3 = forEach$2(coercedDS)).call(_context3, coercedDS),
	    get: bind$2(_context4 = coercedDS.get).call(_context4, coercedDS),
	    getIds: bind$2(_context5 = coercedDS.getIds).call(_context5, coercedDS),
	    off: bind$2(_context6 = coercedDS.off).call(_context6, coercedDS),
	    on: bind$2(_context7 = coercedDS.on).call(_context7, coercedDS),

	    get length() {
	      return coercedDS.length;
	    },

	    // Non standard.
	    idProp: idProp,
	    type: type,
	    rawDS: rawDS,
	    coercedDS: coercedDS,
	    dispose: function dispose() {
	      return pipe.stop();
	    }
	  };
	}
	var util$1 = _objectSpread$1(_objectSpread$1({}, util), {}, {
	  convert: convert
	});

	var trim$4 = stringTrim.trim;
	var $parseFloat = global_1.parseFloat;
	var FORCED$4 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string

	var numberParseFloat = FORCED$4 ? function parseFloat(string) {
	  var trimmedString = trim$4(String(string));
	  var result = $parseFloat(trimmedString);
	  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// https://tc39.github.io/ecma262/#sec-parsefloat-string

	_export({
	  global: true,
	  forced: parseFloat != numberParseFloat
	}, {
	  parseFloat: numberParseFloat
	});

	var _parseFloat = path.parseFloat;

	var _parseFloat$1 = _parseFloat;

	var _parseFloat$2 = _parseFloat$1;

	var $stringify$1 = getBuiltIn('JSON', 'stringify');
	var re = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var fix = function (match, offset, string) {
	  var prev = string.charAt(offset - 1);
	  var next = string.charAt(offset + 1);

	  if (low.test(match) && !hi.test(next) || hi.test(match) && !low.test(prev)) {
	    return '\\u' + match.charCodeAt(0).toString(16);
	  }

	  return match;
	};

	var FORCED$5 = fails(function () {
	  return $stringify$1('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify$1('\uDEAD') !== '"\\udead"';
	});

	if ($stringify$1) {
	  // https://github.com/tc39/proposal-well-formed-stringify
	  _export({
	    target: 'JSON',
	    stat: true,
	    forced: FORCED$5
	  }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var result = $stringify$1.apply(null, arguments);
	      return typeof result == 'string' ? result.replace(re, fix) : result;
	    }
	  });
	}

	if (!path.JSON) path.JSON = {
	  stringify: JSON.stringify
	}; // eslint-disable-next-line no-unused-vars

	var stringify = function stringify(it, replacer, space) {
	  return path.JSON.stringify.apply(null, arguments);
	};

	var stringify$1 = stringify;

	var stringify$2 = stringify$1;

	/** Prototype for visual components */

	var Component = /*#__PURE__*/function () {
	  /**
	  * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} [body]
	  * @param {Object} [options]
	  */
	  function Component(body, options) {
	    classCallCheck(this, Component);

	    // eslint-disable-line no-unused-vars
	    this.options = null;
	    this.props = null;
	  }
	  /**
	   * Set options for the component. The new options will be merged into the
	   * current options.
	   * @param {Object} options
	   */


	  createClass(Component, [{
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options) {
	        util$1.extend(this.options, options);
	      }
	    }
	    /**
	     * Repaint the component
	     * @return {boolean} Returns true if the component is resized
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      // should be implemented by the component
	      return false;
	    }
	    /**
	     * Destroy the component. Cleanup DOM and event listeners
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {// should be implemented by the component
	    }
	    /**
	     * Test whether the component is resized since the last time _isResized() was
	     * called.
	     * @return {Boolean} Returns true if the component is resized
	     * @protected
	     */

	  }, {
	    key: "_isResized",
	    value: function _isResized() {
	      var resized = this.props._previousWidth !== this.props.width || this.props._previousHeight !== this.props.height;
	      this.props._previousWidth = this.props.width;
	      this.props._previousHeight = this.props.height;
	      return resized;
	    }
	  }]);

	  return Component;
	}();

	var test$1 = [];
	var nativeSort = test$1.sort; // IE8-

	var FAILS_ON_UNDEFINED = fails(function () {
	  test$1.sort(undefined);
	}); // V8 bug

	var FAILS_ON_NULL = fails(function () {
	  test$1.sort(null);
	}); // Old WebKit

	var STRICT_METHOD$3 = arrayMethodIsStrict('sort');
	var FORCED$6 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$3; // `Array.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.sort

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED$6
	}, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction(comparefn));
	  }
	});

	var sort = entryVirtual('Array').sort;

	var ArrayPrototype$8 = Array.prototype;

	var sort_1 = function (it) {
	  var own = it.sort;
	  return it === ArrayPrototype$8 || it instanceof Array && own === ArrayPrototype$8.sort ? sort : own;
	};

	var sort$1 = sort_1;

	var sort$2 = sort$1;

	// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


	var stringRepeat = ''.repeat || function repeat(count) {
	  var str = String(requireObjectCoercible(this));
	  var result = '';
	  var n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

	  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

	  return result;
	};

	// https://tc39.github.io/ecma262/#sec-string.prototype.repeat

	_export({
	  target: 'String',
	  proto: true
	}, {
	  repeat: stringRepeat
	});

	var repeat = entryVirtual('String').repeat;

	var StringPrototype$1 = String.prototype;

	var repeat_1 = function (it) {
	  var own = it.repeat;
	  return typeof it === 'string' || it === StringPrototype$1 || it instanceof String && own === StringPrototype$1.repeat ? repeat : own;
	};

	var repeat$1 = repeat_1;

	var repeat$2 = repeat$1;

	/**
	 * used in Core to convert the options into a volatile variable
	 * 
	 * @param {function} moment
	 * @param {Object} body
	 * @param {Array | Object} hiddenDates
	 * @returns {number}
	 */
	function convertHiddenOptions(moment, body, hiddenDates) {
	  if (hiddenDates && !isArray$3(hiddenDates)) {
	    return convertHiddenOptions(moment, body, [hiddenDates]);
	  }

	  body.hiddenDates = [];

	  if (hiddenDates) {
	    if (isArray$3(hiddenDates) == true) {
	      var _context;

	      for (var i = 0; i < hiddenDates.length; i++) {
	        if (repeat$2(hiddenDates[i]) === undefined) {
	          var dateItem = {};
	          dateItem.start = moment(hiddenDates[i].start).toDate().valueOf();
	          dateItem.end = moment(hiddenDates[i].end).toDate().valueOf();
	          body.hiddenDates.push(dateItem);
	        }
	      }

	      sort$2(_context = body.hiddenDates).call(_context, function (a, b) {
	        return a.start - b.start;
	      }); // sort by start time

	    }
	  }
	}
	/**
	 * create new entrees for the repeating hidden dates
	 *
	 * @param {function} moment
	 * @param {Object} body
	 * @param {Array | Object} hiddenDates
	 * @returns {null}
	 */

	function updateHiddenDates(moment, body, hiddenDates) {
	  if (hiddenDates && !isArray$3(hiddenDates)) {
	    return updateHiddenDates(moment, body, [hiddenDates]);
	  }

	  if (hiddenDates && body.domProps.centerContainer.width !== undefined) {
	    convertHiddenOptions(moment, body, hiddenDates);
	    var start = moment(body.range.start);
	    var end = moment(body.range.end);
	    var totalRange = body.range.end - body.range.start;
	    var pixelTime = totalRange / body.domProps.centerContainer.width;

	    for (var i = 0; i < hiddenDates.length; i++) {
	      if (repeat$2(hiddenDates[i]) !== undefined) {
	        var startDate = moment(hiddenDates[i].start);
	        var endDate = moment(hiddenDates[i].end);

	        if (startDate._d == "Invalid Date") {
	          throw new Error("Supplied start date is not valid: ".concat(hiddenDates[i].start));
	        }

	        if (endDate._d == "Invalid Date") {
	          throw new Error("Supplied end date is not valid: ".concat(hiddenDates[i].end));
	        }

	        var duration = endDate - startDate;

	        if (duration >= 4 * pixelTime) {
	          var offset = 0;
	          var runUntil = end.clone();

	          switch (repeat$2(hiddenDates[i])) {
	            case "daily":
	              // case of time
	              if (startDate.day() != endDate.day()) {
	                offset = 1;
	              }

	              startDate.dayOfYear(start.dayOfYear());
	              startDate.year(start.year());
	              startDate.subtract(7, 'days');
	              endDate.dayOfYear(start.dayOfYear());
	              endDate.year(start.year());
	              endDate.subtract(7 - offset, 'days');
	              runUntil.add(1, 'weeks');
	              break;

	            case "weekly":
	              {
	                var dayOffset = endDate.diff(startDate, 'days');
	                var day = startDate.day(); // set the start date to the range.start

	                startDate.date(start.date());
	                startDate.month(start.month());
	                startDate.year(start.year());
	                endDate = startDate.clone(); // force

	                startDate.day(day);
	                endDate.day(day);
	                endDate.add(dayOffset, 'days');
	                startDate.subtract(1, 'weeks');
	                endDate.subtract(1, 'weeks');
	                runUntil.add(1, 'weeks');
	                break;
	              }

	            case "monthly":
	              if (startDate.month() != endDate.month()) {
	                offset = 1;
	              }

	              startDate.month(start.month());
	              startDate.year(start.year());
	              startDate.subtract(1, 'months');
	              endDate.month(start.month());
	              endDate.year(start.year());
	              endDate.subtract(1, 'months');
	              endDate.add(offset, 'months');
	              runUntil.add(1, 'months');
	              break;

	            case "yearly":
	              if (startDate.year() != endDate.year()) {
	                offset = 1;
	              }

	              startDate.year(start.year());
	              startDate.subtract(1, 'years');
	              endDate.year(start.year());
	              endDate.subtract(1, 'years');
	              endDate.add(offset, 'years');
	              runUntil.add(1, 'years');
	              break;

	            default:
	              console.log("Wrong repeat format, allowed are: daily, weekly, monthly, yearly. Given:", repeat$2(hiddenDates[i]));
	              return;
	          }

	          while (startDate < runUntil) {
	            body.hiddenDates.push({
	              start: startDate.valueOf(),
	              end: endDate.valueOf()
	            });

	            switch (repeat$2(hiddenDates[i])) {
	              case "daily":
	                startDate.add(1, 'days');
	                endDate.add(1, 'days');
	                break;

	              case "weekly":
	                startDate.add(1, 'weeks');
	                endDate.add(1, 'weeks');
	                break;

	              case "monthly":
	                startDate.add(1, 'months');
	                endDate.add(1, 'months');
	                break;

	              case "yearly":
	                startDate.add(1, 'y');
	                endDate.add(1, 'y');
	                break;

	              default:
	                console.log("Wrong repeat format, allowed are: daily, weekly, monthly, yearly. Given:", repeat$2(hiddenDates[i]));
	                return;
	            }
	          }

	          body.hiddenDates.push({
	            start: startDate.valueOf(),
	            end: endDate.valueOf()
	          });
	        }
	      }
	    } // remove duplicates, merge where possible


	    removeDuplicates(body); // ensure the new positions are not on hidden dates

	    var startHidden = getIsHidden(body.range.start, body.hiddenDates);
	    var endHidden = getIsHidden(body.range.end, body.hiddenDates);
	    var rangeStart = body.range.start;
	    var rangeEnd = body.range.end;

	    if (startHidden.hidden == true) {
	      rangeStart = body.range.startToFront == true ? startHidden.startDate - 1 : startHidden.endDate + 1;
	    }

	    if (endHidden.hidden == true) {
	      rangeEnd = body.range.endToFront == true ? endHidden.startDate - 1 : endHidden.endDate + 1;
	    }

	    if (startHidden.hidden == true || endHidden.hidden == true) {
	      body.range._applyRange(rangeStart, rangeEnd);
	    }
	  }
	}
	/**
	 * remove duplicates from the hidden dates list. Duplicates are evil. They mess everything up.
	 * Scales with N^2
	 *
	 * @param {Object} body
	 */

	function removeDuplicates(body) {
	  var _context2;

	  var hiddenDates = body.hiddenDates;
	  var safeDates = [];

	  for (var i = 0; i < hiddenDates.length; i++) {
	    for (var j = 0; j < hiddenDates.length; j++) {
	      if (i != j && hiddenDates[j].remove != true && hiddenDates[i].remove != true) {
	        // j inside i
	        if (hiddenDates[j].start >= hiddenDates[i].start && hiddenDates[j].end <= hiddenDates[i].end) {
	          hiddenDates[j].remove = true;
	        } // j start inside i
	        else if (hiddenDates[j].start >= hiddenDates[i].start && hiddenDates[j].start <= hiddenDates[i].end) {
	            hiddenDates[i].end = hiddenDates[j].end;
	            hiddenDates[j].remove = true;
	          } // j end inside i
	          else if (hiddenDates[j].end >= hiddenDates[i].start && hiddenDates[j].end <= hiddenDates[i].end) {
	              hiddenDates[i].start = hiddenDates[j].start;
	              hiddenDates[j].remove = true;
	            }
	      }
	    }
	  }

	  for (i = 0; i < hiddenDates.length; i++) {
	    if (hiddenDates[i].remove !== true) {
	      safeDates.push(hiddenDates[i]);
	    }
	  }

	  body.hiddenDates = safeDates;

	  sort$2(_context2 = body.hiddenDates).call(_context2, function (a, b) {
	    return a.start - b.start;
	  }); // sort by start time

	}
	/**
	 * Prints dates to console
	 * @param {array} dates
	 */

	function printDates(dates) {
	  for (var i = 0; i < dates.length; i++) {
	    console.log(i, new Date(dates[i].start), new Date(dates[i].end), dates[i].start, dates[i].end, dates[i].remove);
	  }
	}
	/**
	 * Used in TimeStep to avoid the hidden times.
	 * @param {function} moment
	 * @param {TimeStep} timeStep
	 * @param {Date} previousTime
	 */

	function stepOverHiddenDates(moment, timeStep, previousTime) {
	  var stepInHidden = false;
	  var currentValue = timeStep.current.valueOf();

	  for (var i = 0; i < timeStep.hiddenDates.length; i++) {
	    var startDate = timeStep.hiddenDates[i].start;
	    var endDate = timeStep.hiddenDates[i].end;

	    if (currentValue >= startDate && currentValue < endDate) {
	      stepInHidden = true;
	      break;
	    }
	  }

	  if (stepInHidden == true && currentValue < timeStep._end.valueOf() && currentValue != previousTime) {
	    var prevValue = moment(previousTime);
	    var newValue = moment(endDate); //check if the next step should be major

	    if (prevValue.year() != newValue.year()) {
	      timeStep.switchedYear = true;
	    } else if (prevValue.month() != newValue.month()) {
	      timeStep.switchedMonth = true;
	    } else if (prevValue.dayOfYear() != newValue.dayOfYear()) {
	      timeStep.switchedDay = true;
	    }

	    timeStep.current = newValue;
	  }
	} ///**
	// * Used in TimeStep to avoid the hidden times.
	// * @param timeStep
	// * @param previousTime
	// */
	//checkFirstStep = function(timeStep) {
	//  var stepInHidden = false;
	//  var currentValue = timeStep.current.valueOf();
	//  for (var i = 0; i < timeStep.hiddenDates.length; i++) {
	//    var startDate = timeStep.hiddenDates[i].start;
	//    var endDate = timeStep.hiddenDates[i].end;
	//    if (currentValue >= startDate && currentValue < endDate) {
	//      stepInHidden = true;
	//      break;
	//    }
	//  }
	//
	//  if (stepInHidden == true && currentValue <= timeStep._end.valueOf()) {
	//    var newValue = moment(endDate);
	//    timeStep.current = newValue.toDate();
	//  }
	//};

	/**
	 * replaces the Core toScreen methods
	 *
	 * @param {timeline.Core} Core
	 * @param {Date} time
	 * @param {number} width
	 * @returns {number}
	 */

	function toScreen(Core, time, width) {
	  var conversion;

	  if (Core.body.hiddenDates.length == 0) {
	    conversion = Core.range.conversion(width);
	    return (time.valueOf() - conversion.offset) * conversion.scale;
	  } else {
	    var hidden = getIsHidden(time, Core.body.hiddenDates);

	    if (hidden.hidden == true) {
	      time = hidden.startDate;
	    }

	    var duration = getHiddenDurationBetween(Core.body.hiddenDates, Core.range.start, Core.range.end);

	    if (time < Core.range.start) {
	      conversion = Core.range.conversion(width, duration);
	      var hiddenBeforeStart = getHiddenDurationBeforeStart(Core.body.hiddenDates, time, conversion.offset);
	      time = Core.options.moment(time).toDate().valueOf();
	      time = time + hiddenBeforeStart;
	      return -(conversion.offset - time.valueOf()) * conversion.scale;
	    } else if (time > Core.range.end) {
	      var rangeAfterEnd = {
	        start: Core.range.start,
	        end: time
	      };
	      time = correctTimeForHidden(Core.options.moment, Core.body.hiddenDates, rangeAfterEnd, time);
	      conversion = Core.range.conversion(width, duration);
	      return (time.valueOf() - conversion.offset) * conversion.scale;
	    } else {
	      time = correctTimeForHidden(Core.options.moment, Core.body.hiddenDates, Core.range, time);
	      conversion = Core.range.conversion(width, duration);
	      return (time.valueOf() - conversion.offset) * conversion.scale;
	    }
	  }
	}
	/**
	 * Replaces the core toTime methods
	 *
	 * @param {timeline.Core} Core
	 * @param {number} x
	 * @param {number} width
	 * @returns {Date}
	 */

	function toTime(Core, x, width) {
	  if (Core.body.hiddenDates.length == 0) {
	    var conversion = Core.range.conversion(width);
	    return new Date(x / conversion.scale + conversion.offset);
	  } else {
	    var hiddenDuration = getHiddenDurationBetween(Core.body.hiddenDates, Core.range.start, Core.range.end);
	    var totalDuration = Core.range.end - Core.range.start - hiddenDuration;
	    var partialDuration = totalDuration * x / width;
	    var accumulatedHiddenDuration = getAccumulatedHiddenDuration(Core.body.hiddenDates, Core.range, partialDuration);
	    return new Date(accumulatedHiddenDuration + partialDuration + Core.range.start);
	  }
	}
	/**
	 * Support function
	 *
	 * @param {Array.<{start: Window.start, end: *}>} hiddenDates
	 * @param {number} start
	 * @param {number} end
	 * @returns {number}
	 */

	function getHiddenDurationBetween(hiddenDates, start, end) {
	  var duration = 0;

	  for (var i = 0; i < hiddenDates.length; i++) {
	    var startDate = hiddenDates[i].start;
	    var endDate = hiddenDates[i].end; // if time after the cutout, and the

	    if (startDate >= start && endDate < end) {
	      duration += endDate - startDate;
	    }
	  }

	  return duration;
	}
	/**
	 * Support function
	 *
	 * @param {Array.<{start: Window.start, end: *}>} hiddenDates
	 * @param {number} start
	 * @param {number} end
	 * @returns {number}
	 */

	function getHiddenDurationBeforeStart(hiddenDates, start, end) {
	  var duration = 0;

	  for (var i = 0; i < hiddenDates.length; i++) {
	    var startDate = hiddenDates[i].start;
	    var endDate = hiddenDates[i].end;

	    if (startDate >= start && endDate <= end) {
	      duration += endDate - startDate;
	    }
	  }

	  return duration;
	}
	/**
	 * Support function
	 * @param {function} moment
	 * @param {Array.<{start: Window.start, end: *}>} hiddenDates
	 * @param {{start: number, end: number}} range
	 * @param {Date} time
	 * @returns {number}
	 */

	function correctTimeForHidden(moment, hiddenDates, range, time) {
	  time = moment(time).toDate().valueOf();
	  time -= getHiddenDurationBefore(moment, hiddenDates, range, time);
	  return time;
	}
	/**
	 * Support function
	 * @param {function} moment
	 * @param {Array.<{start: Window.start, end: *}>} hiddenDates
	 * @param {{start: number, end: number}} range
	 * @param {Date} time
	 * @returns {number}
	 */

	function getHiddenDurationBefore(moment, hiddenDates, range, time) {
	  var timeOffset = 0;
	  time = moment(time).toDate().valueOf();

	  for (var i = 0; i < hiddenDates.length; i++) {
	    var startDate = hiddenDates[i].start;
	    var endDate = hiddenDates[i].end; // if time after the cutout, and the

	    if (startDate >= range.start && endDate < range.end) {
	      if (time >= endDate) {
	        timeOffset += endDate - startDate;
	      }
	    }
	  }

	  return timeOffset;
	}
	/**
	 * sum the duration from start to finish, including the hidden duration,
	 * until the required amount has been reached, return the accumulated hidden duration
	 * @param {Array.<{start: Window.start, end: *}>} hiddenDates
	 * @param {{start: number, end: number}} range
	 * @param {number} [requiredDuration=0]
	 * @returns {number}
	 */

	function getAccumulatedHiddenDuration(hiddenDates, range, requiredDuration) {
	  var hiddenDuration = 0;
	  var duration = 0;
	  var previousPoint = range.start; //printDates(hiddenDates)

	  for (var i = 0; i < hiddenDates.length; i++) {
	    var startDate = hiddenDates[i].start;
	    var endDate = hiddenDates[i].end; // if time after the cutout, and the

	    if (startDate >= range.start && endDate < range.end) {
	      duration += startDate - previousPoint;
	      previousPoint = endDate;

	      if (duration >= requiredDuration) {
	        break;
	      } else {
	        hiddenDuration += endDate - startDate;
	      }
	    }
	  }

	  return hiddenDuration;
	}
	/**
	 * used to step over to either side of a hidden block. Correction is disabled on tablets, might be set to true
	 * @param {Array.<{start: Window.start, end: *}>} hiddenDates
	 * @param {Date} time
	 * @param {number} direction
	 * @param {boolean} correctionEnabled
	 * @returns {Date|number}
	 */

	function snapAwayFromHidden(hiddenDates, time, direction, correctionEnabled) {
	  var isHidden = getIsHidden(time, hiddenDates);

	  if (isHidden.hidden == true) {
	    if (direction < 0) {
	      if (correctionEnabled == true) {
	        return isHidden.startDate - (isHidden.endDate - time) - 1;
	      } else {
	        return isHidden.startDate - 1;
	      }
	    } else {
	      if (correctionEnabled == true) {
	        return isHidden.endDate + (time - isHidden.startDate) + 1;
	      } else {
	        return isHidden.endDate + 1;
	      }
	    }
	  } else {
	    return time;
	  }
	}
	/**
	 * Check if a time is hidden
	 *
	 * @param {Date} time
	 * @param {Array.<{start: Window.start, end: *}>} hiddenDates
	 * @returns {{hidden: boolean, startDate: Window.start, endDate: *}}
	 */

	function getIsHidden(time, hiddenDates) {
	  for (var i = 0; i < hiddenDates.length; i++) {
	    var startDate = hiddenDates[i].start;
	    var endDate = hiddenDates[i].end;

	    if (time >= startDate && time < endDate) {
	      // if the start is entering a hidden zone
	      return {
	        hidden: true,
	        startDate: startDate,
	        endDate: endDate
	      };
	    }
	  }

	  return {
	    hidden: false,
	    startDate: startDate,
	    endDate: endDate
	  };
	}

	var DateUtil = /*#__PURE__*/Object.freeze({
		__proto__: null,
		convertHiddenOptions: convertHiddenOptions,
		updateHiddenDates: updateHiddenDates,
		removeDuplicates: removeDuplicates,
		printDates: printDates,
		stepOverHiddenDates: stepOverHiddenDates,
		toScreen: toScreen,
		toTime: toTime,
		getHiddenDurationBetween: getHiddenDurationBetween,
		getHiddenDurationBeforeStart: getHiddenDurationBeforeStart,
		correctTimeForHidden: correctTimeForHidden,
		getHiddenDurationBefore: getHiddenDurationBefore,
		getAccumulatedHiddenDuration: getAccumulatedHiddenDuration,
		snapAwayFromHidden: snapAwayFromHidden,
		getIsHidden: getIsHidden
	});

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * A Range controls a numeric range with a start and end value.
	 * The Range adjusts the range based on mouse events or programmatic changes,
	 * and triggers events when the range is changing or has been changed.
	 */

	var Range = /*#__PURE__*/function (_Component) {
	  inherits(Range, _Component);

	  var _super = _createSuper(Range);

	  /**
	  * @param {{dom: Object, domProps: Object, emitter: Emitter}} body
	  * @param {Object} [options]    See description at Range.setOptions
	  * @constructor Range
	  * @extends Component
	  */
	  function Range(body, options) {
	    var _context, _context2, _context3, _context4, _context5, _context6, _context7;

	    var _this;

	    classCallCheck(this, Range);

	    _this = _super.call(this);
	    var now = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
	    var start = now.clone().add(-3, 'days').valueOf();
	    var end = now.clone().add(3, 'days').valueOf();
	    _this.millisecondsPerPixelCache = undefined;

	    if (options === undefined) {
	      _this.start = start;
	      _this.end = end;
	    } else {
	      _this.start = options.start || start;
	      _this.end = options.end || end;
	    }

	    _this.rolling = false;
	    _this.body = body;
	    _this.deltaDifference = 0;
	    _this.scaleOffset = 0;
	    _this.startToFront = false;
	    _this.endToFront = true; // default options

	    _this.defaultOptions = {
	      rtl: false,
	      start: null,
	      end: null,
	      moment: moment,
	      direction: 'horizontal',
	      // 'horizontal' or 'vertical'
	      moveable: true,
	      zoomable: true,
	      min: null,
	      max: null,
	      zoomMin: 10,
	      // milliseconds
	      zoomMax: 1000 * 60 * 60 * 24 * 365 * 10000,
	      // milliseconds
	      rollingMode: {
	        follow: false,
	        offset: 0.5
	      }
	    };
	    _this.options = util$1.extend({}, _this.defaultOptions);
	    _this.props = {
	      touch: {}
	    };
	    _this.animationTimer = null; // drag listeners for dragging

	    _this.body.emitter.on('panstart', bind$2(_context = _this._onDragStart).call(_context, assertThisInitialized(_this)));

	    _this.body.emitter.on('panmove', bind$2(_context2 = _this._onDrag).call(_context2, assertThisInitialized(_this)));

	    _this.body.emitter.on('panend', bind$2(_context3 = _this._onDragEnd).call(_context3, assertThisInitialized(_this))); // mouse wheel for zooming


	    _this.body.emitter.on('mousewheel', bind$2(_context4 = _this._onMouseWheel).call(_context4, assertThisInitialized(_this))); // pinch to zoom


	    _this.body.emitter.on('touch', bind$2(_context5 = _this._onTouch).call(_context5, assertThisInitialized(_this)));

	    _this.body.emitter.on('pinch', bind$2(_context6 = _this._onPinch).call(_context6, assertThisInitialized(_this))); // on click of rolling mode button


	    _this.body.dom.rollingModeBtn.addEventListener('click', bind$2(_context7 = _this.startRolling).call(_context7, assertThisInitialized(_this)));

	    _this.setOptions(options);

	    return _this;
	  }
	  /**
	   * Set options for the range controller
	   * @param {Object} options      Available options:
	   *                              {number | Date | String} start  Start date for the range
	   *                              {number | Date | String} end    End date for the range
	   *                              {number} min    Minimum value for start
	   *                              {number} max    Maximum value for end
	   *                              {number} zoomMin    Set a minimum value for
	   *                                                  (end - start).
	   *                              {number} zoomMax    Set a maximum value for
	   *                                                  (end - start).
	   *                              {boolean} moveable Enable moving of the range
	   *                                                 by dragging. True by default
	   *                              {boolean} zoomable Enable zooming of the range
	   *                                                 by pinching/scrolling. True by default
	   */


	  createClass(Range, [{
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options) {
	        // copy the options that we know
	        var fields = ['animation', 'direction', 'min', 'max', 'zoomMin', 'zoomMax', 'moveable', 'zoomable', 'moment', 'activate', 'hiddenDates', 'zoomKey', 'zoomFriction', 'rtl', 'showCurrentTime', 'rollingMode', 'horizontalScroll'];
	        util$1.selectiveExtend(fields, this.options, options);

	        if (options.rollingMode && options.rollingMode.follow) {
	          this.startRolling();
	        }

	        if ('start' in options || 'end' in options) {
	          // apply a new range. both start and end are optional
	          this.setRange(options.start, options.end);
	        }
	      }
	    }
	    /**
	     * Start auto refreshing the current time bar
	     */

	  }, {
	    key: "startRolling",
	    value: function startRolling() {
	      var me = this;
	      /**
	       *  Updates the current time.
	       */

	      function update() {
	        me.stopRolling();
	        me.rolling = true;
	        var interval = me.end - me.start;
	        var t = util$1.convert(new Date(), 'Date').valueOf();
	        var rollingModeOffset = me.options.rollingMode && me.options.rollingMode.offset || 0.5;
	        var start = t - interval * rollingModeOffset;
	        var end = t + interval * (1 - rollingModeOffset);
	        var options = {
	          animation: false
	        };
	        me.setRange(start, end, options); // determine interval to refresh

	        var scale = me.conversion(me.body.domProps.center.width).scale;
	        interval = 1 / scale / 10;
	        if (interval < 30) interval = 30;
	        if (interval > 1000) interval = 1000;
	        me.body.dom.rollingModeBtn.style.visibility = "hidden"; // start a renderTimer to adjust for the new time

	        me.currentTimeTimer = setTimeout$2(update, interval);
	      }

	      update();
	    }
	    /**
	     * Stop auto refreshing the current time bar
	     */

	  }, {
	    key: "stopRolling",
	    value: function stopRolling() {
	      if (this.currentTimeTimer !== undefined) {
	        clearTimeout(this.currentTimeTimer);
	        this.rolling = false;
	        this.body.dom.rollingModeBtn.style.visibility = "visible";
	      }
	    }
	    /**
	     * Set a new start and end range
	     * @param {Date | number | string} start
	     * @param {Date | number | string} end
	     * @param {Object} options      Available options:
	     *                              {boolean | {duration: number, easingFunction: string}} [animation=false]
	     *                                    If true, the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     *                              {boolean} [byUser=false]
	     *                              {Event}  event  Mouse event
	     * @param {Function} callback     a callback function to be executed at the end of this function  
	     * @param {Function} frameCallback    a callback function executed each frame of the range animation.
	     *                                    The callback will be passed three parameters:
	     *                                    {number} easeCoefficient    an easing coefficent
	     *                                    {boolean} willDraw          If true the caller will redraw after the callback completes
	     *                                    {boolean} done              If true then animation is ending after the current frame
	     * @return {void}
	     */

	  }, {
	    key: "setRange",
	    value: function setRange(start, end, options, callback, frameCallback) {
	      if (!options) {
	        options = {};
	      }

	      if (options.byUser !== true) {
	        options.byUser = false;
	      }

	      var me = this;
	      var finalStart = start != undefined ? util$1.convert(start, 'Date').valueOf() : null;
	      var finalEnd = end != undefined ? util$1.convert(end, 'Date').valueOf() : null;

	      this._cancelAnimation();

	      this.millisecondsPerPixelCache = undefined;

	      if (options.animation) {
	        // true or an Object
	        var initStart = this.start;
	        var initEnd = this.end;
	        var duration = _typeof_1(options.animation) === 'object' && 'duration' in options.animation ? options.animation.duration : 500;
	        var easingName = _typeof_1(options.animation) === 'object' && 'easingFunction' in options.animation ? options.animation.easingFunction : 'easeInOutQuad';
	        var easingFunction = util$1.easingFunctions[easingName];

	        if (!easingFunction) {
	          var _context8;

	          throw new Error(concat$2(_context8 = "Unknown easing function ".concat(stringify$2(easingName), ". Choose from: ")).call(_context8, keys$3(util$1.easingFunctions).join(', ')));
	        }

	        var initTime = now$2();

	        var anyChanged = false;

	        var next = function next() {
	          if (!me.props.touch.dragging) {
	            var now = now$2();

	            var time = now - initTime;
	            var ease = easingFunction(time / duration);
	            var done = time > duration;
	            var s = done || finalStart === null ? finalStart : initStart + (finalStart - initStart) * ease;
	            var e = done || finalEnd === null ? finalEnd : initEnd + (finalEnd - initEnd) * ease;
	            changed = me._applyRange(s, e);
	            updateHiddenDates(me.options.moment, me.body, me.options.hiddenDates);
	            anyChanged = anyChanged || changed;
	            var params = {
	              start: new Date(me.start),
	              end: new Date(me.end),
	              byUser: options.byUser,
	              event: options.event
	            };

	            if (frameCallback) {
	              frameCallback(ease, changed, done);
	            }

	            if (changed) {
	              me.body.emitter.emit('rangechange', params);
	            }

	            if (done) {
	              if (anyChanged) {
	                me.body.emitter.emit('rangechanged', params);

	                if (callback) {
	                  return callback();
	                }
	              }
	            } else {
	              // animate with as high as possible frame rate, leave 20 ms in between
	              // each to prevent the browser from blocking
	              me.animationTimer = setTimeout$2(next, 20);
	            }
	          }
	        };

	        return next();
	      } else {
	        var changed = this._applyRange(finalStart, finalEnd);

	        updateHiddenDates(this.options.moment, this.body, this.options.hiddenDates);

	        if (changed) {
	          var params = {
	            start: new Date(this.start),
	            end: new Date(this.end),
	            byUser: options.byUser,
	            event: options.event
	          };
	          this.body.emitter.emit('rangechange', params);
	          clearTimeout(me.timeoutID);
	          me.timeoutID = setTimeout$2(function () {
	            me.body.emitter.emit('rangechanged', params);
	          }, 200);

	          if (callback) {
	            return callback();
	          }
	        }
	      }
	    }
	    /**
	     * Get the number of milliseconds per pixel.
	     *
	     * @returns {undefined|number}
	     */

	  }, {
	    key: "getMillisecondsPerPixel",
	    value: function getMillisecondsPerPixel() {
	      if (this.millisecondsPerPixelCache === undefined) {
	        this.millisecondsPerPixelCache = (this.end - this.start) / this.body.dom.center.clientWidth;
	      }

	      return this.millisecondsPerPixelCache;
	    }
	    /**
	     * Stop an animation
	     * @private
	     */

	  }, {
	    key: "_cancelAnimation",
	    value: function _cancelAnimation() {
	      if (this.animationTimer) {
	        clearTimeout(this.animationTimer);
	        this.animationTimer = null;
	      }
	    }
	    /**
	     * Set a new start and end range. This method is the same as setRange, but
	     * does not trigger a range change and range changed event, and it returns
	     * true when the range is changed
	     * @param {number} [start]
	     * @param {number} [end]
	     * @return {boolean} changed
	     * @private
	     */

	  }, {
	    key: "_applyRange",
	    value: function _applyRange(start, end) {
	      var newStart = start != null ? util$1.convert(start, 'Date').valueOf() : this.start;
	      var newEnd = end != null ? util$1.convert(end, 'Date').valueOf() : this.end;
	      var max = this.options.max != null ? util$1.convert(this.options.max, 'Date').valueOf() : null;
	      var min = this.options.min != null ? util$1.convert(this.options.min, 'Date').valueOf() : null;
	      var diff; // check for valid number

	      if (isNaN(newStart) || newStart === null) {
	        throw new Error("Invalid start \"".concat(start, "\""));
	      }

	      if (isNaN(newEnd) || newEnd === null) {
	        throw new Error("Invalid end \"".concat(end, "\""));
	      } // prevent end < start


	      if (newEnd < newStart) {
	        newEnd = newStart;
	      } // prevent start < min


	      if (min !== null) {
	        if (newStart < min) {
	          diff = min - newStart;
	          newStart += diff;
	          newEnd += diff; // prevent end > max

	          if (max != null) {
	            if (newEnd > max) {
	              newEnd = max;
	            }
	          }
	        }
	      } // prevent end > max


	      if (max !== null) {
	        if (newEnd > max) {
	          diff = newEnd - max;
	          newStart -= diff;
	          newEnd -= diff; // prevent start < min

	          if (min != null) {
	            if (newStart < min) {
	              newStart = min;
	            }
	          }
	        }
	      } // prevent (end-start) < zoomMin


	      if (this.options.zoomMin !== null) {
	        var zoomMin = _parseFloat$2(this.options.zoomMin);

	        if (zoomMin < 0) {
	          zoomMin = 0;
	        }

	        if (newEnd - newStart < zoomMin) {
	          // compensate for a scale of 0.5 ms
	          var compensation = 0.5;

	          if (this.end - this.start === zoomMin && newStart >= this.start - compensation && newEnd <= this.end) {
	            // ignore this action, we are already zoomed to the minimum
	            newStart = this.start;
	            newEnd = this.end;
	          } else {
	            // zoom to the minimum
	            diff = zoomMin - (newEnd - newStart);
	            newStart -= diff / 2;
	            newEnd += diff / 2;
	          }
	        }
	      } // prevent (end-start) > zoomMax


	      if (this.options.zoomMax !== null) {
	        var zoomMax = _parseFloat$2(this.options.zoomMax);

	        if (zoomMax < 0) {
	          zoomMax = 0;
	        }

	        if (newEnd - newStart > zoomMax) {
	          if (this.end - this.start === zoomMax && newStart < this.start && newEnd > this.end) {
	            // ignore this action, we are already zoomed to the maximum
	            newStart = this.start;
	            newEnd = this.end;
	          } else {
	            // zoom to the maximum
	            diff = newEnd - newStart - zoomMax;
	            newStart += diff / 2;
	            newEnd -= diff / 2;
	          }
	        }
	      }

	      var changed = this.start != newStart || this.end != newEnd; // if the new range does NOT overlap with the old range, emit checkRangedItems to avoid not showing ranged items (ranged meaning has end time, not necessarily of type Range)

	      if (!(newStart >= this.start && newStart <= this.end || newEnd >= this.start && newEnd <= this.end) && !(this.start >= newStart && this.start <= newEnd || this.end >= newStart && this.end <= newEnd)) {
	        this.body.emitter.emit('checkRangedItems');
	      }

	      this.start = newStart;
	      this.end = newEnd;
	      return changed;
	    }
	    /**
	     * Retrieve the current range.
	     * @return {Object} An object with start and end properties
	     */

	  }, {
	    key: "getRange",
	    value: function getRange() {
	      return {
	        start: this.start,
	        end: this.end
	      };
	    }
	    /**
	     * Calculate the conversion offset and scale for current range, based on
	     * the provided width
	     * @param {number} width
	     * @param {number} [totalHidden=0]
	     * @returns {{offset: number, scale: number}} conversion
	     */

	  }, {
	    key: "conversion",
	    value: function conversion(width, totalHidden) {
	      return Range.conversion(this.start, this.end, width, totalHidden);
	    }
	    /**
	     * Static method to calculate the conversion offset and scale for a range,
	     * based on the provided start, end, and width
	     * @param {number} start
	     * @param {number} end
	     * @param {number} width
	     * @param {number} [totalHidden=0]
	     * @returns {{offset: number, scale: number}} conversion
	     */

	  }, {
	    key: "_onDragStart",

	    /**
	     * Start dragging horizontally or vertically
	     * @param {Event} event
	     * @private
	     */
	    value: function _onDragStart(event) {
	      this.deltaDifference = 0;
	      this.previousDelta = 0; // only allow dragging when configured as movable

	      if (!this.options.moveable) return; // only start dragging when the mouse is inside the current range

	      if (!this._isInsideRange(event)) return; // refuse to drag when we where pinching to prevent the timeline make a jump
	      // when releasing the fingers in opposite order from the touch screen

	      if (!this.props.touch.allowDragging) return;
	      this.stopRolling();
	      this.props.touch.start = this.start;
	      this.props.touch.end = this.end;
	      this.props.touch.dragging = true;

	      if (this.body.dom.root) {
	        this.body.dom.root.style.cursor = 'move';
	      }
	    }
	    /**
	     * Perform dragging operation
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDrag",
	    value: function _onDrag(event) {
	      if (!event) return;
	      if (!this.props.touch.dragging) return; // only allow dragging when configured as movable

	      if (!this.options.moveable) return; // TODO: this may be redundant in hammerjs2
	      // refuse to drag when we where pinching to prevent the timeline make a jump
	      // when releasing the fingers in opposite order from the touch screen

	      if (!this.props.touch.allowDragging) return;
	      var direction = this.options.direction;
	      validateDirection(direction);
	      var delta = direction == 'horizontal' ? event.deltaX : event.deltaY;
	      delta -= this.deltaDifference;
	      var interval = this.props.touch.end - this.props.touch.start; // normalize dragging speed if cutout is in between.

	      var duration = getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end);
	      interval -= duration;
	      var width = direction == 'horizontal' ? this.body.domProps.center.width : this.body.domProps.center.height;
	      var diffRange;

	      if (this.options.rtl) {
	        diffRange = delta / width * interval;
	      } else {
	        diffRange = -delta / width * interval;
	      }

	      var newStart = this.props.touch.start + diffRange;
	      var newEnd = this.props.touch.end + diffRange; // snapping times away from hidden zones

	      var safeStart = snapAwayFromHidden(this.body.hiddenDates, newStart, this.previousDelta - delta, true);
	      var safeEnd = snapAwayFromHidden(this.body.hiddenDates, newEnd, this.previousDelta - delta, true);

	      if (safeStart != newStart || safeEnd != newEnd) {
	        this.deltaDifference += delta;
	        this.props.touch.start = safeStart;
	        this.props.touch.end = safeEnd;

	        this._onDrag(event);

	        return;
	      }

	      this.previousDelta = delta;

	      this._applyRange(newStart, newEnd);

	      var startDate = new Date(this.start);
	      var endDate = new Date(this.end); // fire a rangechange event

	      this.body.emitter.emit('rangechange', {
	        start: startDate,
	        end: endDate,
	        byUser: true,
	        event: event
	      }); // fire a panmove event

	      this.body.emitter.emit('panmove');
	    }
	    /**
	     * Stop dragging operation
	     * @param {event} event
	     * @private
	     */

	  }, {
	    key: "_onDragEnd",
	    value: function _onDragEnd(event) {
	      if (!this.props.touch.dragging) return; // only allow dragging when configured as movable

	      if (!this.options.moveable) return; // TODO: this may be redundant in hammerjs2
	      // refuse to drag when we where pinching to prevent the timeline make a jump
	      // when releasing the fingers in opposite order from the touch screen

	      if (!this.props.touch.allowDragging) return;
	      this.props.touch.dragging = false;

	      if (this.body.dom.root) {
	        this.body.dom.root.style.cursor = 'auto';
	      } // fire a rangechanged event


	      this.body.emitter.emit('rangechanged', {
	        start: new Date(this.start),
	        end: new Date(this.end),
	        byUser: true,
	        event: event
	      });
	    }
	    /**
	     * Event handler for mouse wheel event, used to zoom
	     * Code from http://adomas.org/javascript-mouse-wheel/
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onMouseWheel",
	    value: function _onMouseWheel(event) {
	      // retrieve delta
	      var delta = 0;

	      if (event.wheelDelta) {
	        /* IE/Opera. */
	        delta = event.wheelDelta / 120;
	      } else if (event.detail) {
	        /* Mozilla case. */
	        // In Mozilla, sign of delta is different than in IE.
	        // Also, delta is multiple of 3.
	        delta = -event.detail / 3;
	      } else if (event.deltaY) {
	        delta = -event.deltaY / 3;
	      } // don't allow zoom when the according key is pressed and the zoomKey option or not zoomable but movable


	      if (this.options.zoomKey && !event[this.options.zoomKey] && this.options.zoomable || !this.options.zoomable && this.options.moveable) {
	        return;
	      } // only allow zooming when configured as zoomable and moveable


	      if (!(this.options.zoomable && this.options.moveable)) return; // only zoom when the mouse is inside the current range

	      if (!this._isInsideRange(event)) return; // If delta is nonzero, handle it.
	      // Basically, delta is now positive if wheel was scrolled up,
	      // and negative, if wheel was scrolled down.

	      if (delta) {
	        // perform the zoom action. Delta is normally 1 or -1
	        // adjust a negative delta such that zooming in with delta 0.1
	        // equals zooming out with a delta -0.1
	        var zoomFriction = this.options.zoomFriction || 5;
	        var scale;

	        if (delta < 0) {
	          scale = 1 - delta / zoomFriction;
	        } else {
	          scale = 1 / (1 + delta / zoomFriction);
	        } // calculate center, the date to zoom around


	        var pointerDate;

	        if (this.rolling) {
	          var rollingModeOffset = this.options.rollingMode && this.options.rollingMode.offset || 0.5;
	          pointerDate = this.start + (this.end - this.start) * rollingModeOffset;
	        } else {
	          var pointer = this.getPointer({
	            x: event.clientX,
	            y: event.clientY
	          }, this.body.dom.center);
	          pointerDate = this._pointerToDate(pointer);
	        }

	        this.zoom(scale, pointerDate, delta, event); // Prevent default actions caused by mouse wheel
	        // (else the page and timeline both scroll)

	        event.preventDefault();
	      }
	    }
	    /**
	     * Start of a touch gesture
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onTouch",
	    value: function _onTouch(event) {
	      // eslint-disable-line no-unused-vars
	      this.props.touch.start = this.start;
	      this.props.touch.end = this.end;
	      this.props.touch.allowDragging = true;
	      this.props.touch.center = null;
	      this.props.touch.centerDate = null;
	      this.scaleOffset = 0;
	      this.deltaDifference = 0; // Disable the browser default handling of this event.

	      util$1.preventDefault(event);
	    }
	    /**
	     * Handle pinch event
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onPinch",
	    value: function _onPinch(event) {
	      // only allow zooming when configured as zoomable and moveable
	      if (!(this.options.zoomable && this.options.moveable)) return; // Disable the browser default handling of this event.

	      util$1.preventDefault(event);
	      this.props.touch.allowDragging = false;

	      if (!this.props.touch.center) {
	        this.props.touch.center = this.getPointer(event.center, this.body.dom.center);
	        this.props.touch.centerDate = this._pointerToDate(this.props.touch.center);
	      }

	      this.stopRolling();
	      var scale = 1 / (event.scale + this.scaleOffset);
	      var centerDate = this.props.touch.centerDate;
	      var hiddenDuration = getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end);
	      var hiddenDurationBefore = getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this, centerDate);
	      var hiddenDurationAfter = hiddenDuration - hiddenDurationBefore; // calculate new start and end

	      var newStart = centerDate - hiddenDurationBefore + (this.props.touch.start - (centerDate - hiddenDurationBefore)) * scale;
	      var newEnd = centerDate + hiddenDurationAfter + (this.props.touch.end - (centerDate + hiddenDurationAfter)) * scale; // snapping times away from hidden zones

	      this.startToFront = 1 - scale <= 0; // used to do the right auto correction with periodic hidden times

	      this.endToFront = scale - 1 <= 0; // used to do the right auto correction with periodic hidden times

	      var safeStart = snapAwayFromHidden(this.body.hiddenDates, newStart, 1 - scale, true);
	      var safeEnd = snapAwayFromHidden(this.body.hiddenDates, newEnd, scale - 1, true);

	      if (safeStart != newStart || safeEnd != newEnd) {
	        this.props.touch.start = safeStart;
	        this.props.touch.end = safeEnd;
	        this.scaleOffset = 1 - event.scale;
	        newStart = safeStart;
	        newEnd = safeEnd;
	      }

	      var options = {
	        animation: false,
	        byUser: true,
	        event: event
	      };
	      this.setRange(newStart, newEnd, options);
	      this.startToFront = false; // revert to default

	      this.endToFront = true; // revert to default
	    }
	    /**
	     * Test whether the mouse from a mouse event is inside the visible window,
	     * between the current start and end date
	     * @param {Object} event
	     * @return {boolean} Returns true when inside the visible window
	     * @private
	     */

	  }, {
	    key: "_isInsideRange",
	    value: function _isInsideRange(event) {
	      // calculate the time where the mouse is, check whether inside
	      // and no scroll action should happen.
	      var clientX = event.center ? event.center.x : event.clientX;
	      var centerContainerRect = this.body.dom.centerContainer.getBoundingClientRect();
	      var x = this.options.rtl ? clientX - centerContainerRect.left : centerContainerRect.right - clientX;
	      var time = this.body.util.toTime(x);
	      return time >= this.start && time <= this.end;
	    }
	    /**
	     * Helper function to calculate the center date for zooming
	     * @param {{x: number, y: number}} pointer
	     * @return {number} date
	     * @private
	     */

	  }, {
	    key: "_pointerToDate",
	    value: function _pointerToDate(pointer) {
	      var conversion;
	      var direction = this.options.direction;
	      validateDirection(direction);

	      if (direction == 'horizontal') {
	        return this.body.util.toTime(pointer.x).valueOf();
	      } else {
	        var height = this.body.domProps.center.height;
	        conversion = this.conversion(height);
	        return pointer.y / conversion.scale + conversion.offset;
	      }
	    }
	    /**
	     * Get the pointer location relative to the location of the dom element
	     * @param {{x: number, y: number}} touch
	     * @param {Element} element   HTML DOM element
	     * @return {{x: number, y: number}} pointer
	     * @private
	     */

	  }, {
	    key: "getPointer",
	    value: function getPointer(touch, element) {
	      var elementRect = element.getBoundingClientRect();

	      if (this.options.rtl) {
	        return {
	          x: elementRect.right - touch.x,
	          y: touch.y - elementRect.top
	        };
	      } else {
	        return {
	          x: touch.x - elementRect.left,
	          y: touch.y - elementRect.top
	        };
	      }
	    }
	    /**
	     * Zoom the range the given scale in or out. Start and end date will
	     * be adjusted, and the timeline will be redrawn. You can optionally give a
	     * date around which to zoom.
	     * For example, try scale = 0.9 or 1.1
	     * @param {number} scale      Scaling factor. Values above 1 will zoom out,
	     *                            values below 1 will zoom in.
	     * @param {number} [center]   Value representing a date around which will
	     *                            be zoomed.
	     * @param {number} delta
	     * @param {Event} event
	     */

	  }, {
	    key: "zoom",
	    value: function zoom(scale, center, delta, event) {
	      // if centerDate is not provided, take it half between start Date and end Date
	      if (center == null) {
	        center = (this.start + this.end) / 2;
	      }

	      var hiddenDuration = getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end);
	      var hiddenDurationBefore = getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this, center);
	      var hiddenDurationAfter = hiddenDuration - hiddenDurationBefore; // calculate new start and end

	      var newStart = center - hiddenDurationBefore + (this.start - (center - hiddenDurationBefore)) * scale;
	      var newEnd = center + hiddenDurationAfter + (this.end - (center + hiddenDurationAfter)) * scale; // snapping times away from hidden zones

	      this.startToFront = delta > 0 ? false : true; // used to do the right autocorrection with periodic hidden times

	      this.endToFront = -delta > 0 ? false : true; // used to do the right autocorrection with periodic hidden times

	      var safeStart = snapAwayFromHidden(this.body.hiddenDates, newStart, delta, true);
	      var safeEnd = snapAwayFromHidden(this.body.hiddenDates, newEnd, -delta, true);

	      if (safeStart != newStart || safeEnd != newEnd) {
	        newStart = safeStart;
	        newEnd = safeEnd;
	      }

	      var options = {
	        animation: false,
	        byUser: true,
	        event: event
	      };
	      this.setRange(newStart, newEnd, options);
	      this.startToFront = false; // revert to default

	      this.endToFront = true; // revert to default
	    }
	    /**
	     * Move the range with a given delta to the left or right. Start and end
	     * value will be adjusted. For example, try delta = 0.1 or -0.1
	     * @param {number}  delta     Moving amount. Positive value will move right,
	     *                            negative value will move left
	     */

	  }, {
	    key: "move",
	    value: function move(delta) {
	      // zoom start Date and end Date relative to the centerDate
	      var diff = this.end - this.start; // apply new values

	      var newStart = this.start + diff * delta;
	      var newEnd = this.end + diff * delta; // TODO: reckon with min and max range

	      this.start = newStart;
	      this.end = newEnd;
	    }
	    /**
	     * Move the range to a new center point
	     * @param {number} moveTo      New center point of the range
	     */

	  }, {
	    key: "moveTo",
	    value: function moveTo(_moveTo) {
	      var center = (this.start + this.end) / 2;
	      var diff = center - _moveTo; // calculate new start and end

	      var newStart = this.start - diff;
	      var newEnd = this.end - diff;
	      var options = {
	        animation: false,
	        byUser: true,
	        event: null
	      };
	      this.setRange(newStart, newEnd, options);
	    }
	  }], [{
	    key: "conversion",
	    value: function conversion(start, end, width, totalHidden) {
	      if (totalHidden === undefined) {
	        totalHidden = 0;
	      }

	      if (width != 0 && end - start != 0) {
	        return {
	          offset: start,
	          scale: width / (end - start - totalHidden)
	        };
	      } else {
	        return {
	          offset: 0,
	          scale: 1
	        };
	      }
	    }
	  }]);

	  return Range;
	}(Component);

	function validateDirection(direction) {
	  if (direction != 'horizontal' && direction != 'vertical') {
	    throw new TypeError("Unknown direction \"".concat(direction, "\". Choose \"horizontal\" or \"vertical\"."));
	  }
	}

	var setInterval = path.setInterval;

	var setInterval$1 = setInterval;

	var $some = arrayIteration.some;
	var STRICT_METHOD$4 = arrayMethodIsStrict('some');
	var USES_TO_LENGTH$6 = arrayMethodUsesToLength('some'); // `Array.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.some

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$4 || !USES_TO_LENGTH$6
	}, {
	  some: function some(callbackfn
	  /* , thisArg */
	  ) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var some = entryVirtual('Array').some;

	var ArrayPrototype$9 = Array.prototype;

	var some_1 = function (it) {
	  var own = it.some;
	  return it === ArrayPrototype$9 || it instanceof Array && own === ArrayPrototype$9.some ? some : own;
	};

	var some$1 = some_1;

	var some$2 = some$1;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$7 = arrayMethodUsesToLength('splice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var max$2 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$7
	}, {
	  splice: function splice(start, deleteCount
	  /* , ...items */
	  ) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;

	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
	    }

	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }

	    A = arraySpeciesCreate(O, actualDeleteCount);

	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }

	    A.length = actualDeleteCount;

	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];else delete O[to];
	      }

	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];else delete O[to];
	      }
	    }

	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }

	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var splice = entryVirtual('Array').splice;

	var ArrayPrototype$a = Array.prototype;

	var splice_1 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$a || it instanceof Array && own === ArrayPrototype$a.splice ? splice : own;
	};

	var splice$1 = splice_1;

	var splice$2 = splice$1;

	var componentEmitter = createCommonjsModule(function (module) {
	  /**
	   * Expose `Emitter`.
	   */
	  {
	    module.exports = Emitter;
	  }
	  /**
	   * Initialize a new `Emitter`.
	   *
	   * @api public
	   */


	  function Emitter(obj) {
	    if (obj) return mixin(obj);
	  }
	  /**
	   * Mixin the emitter properties.
	   *
	   * @param {Object} obj
	   * @return {Object}
	   * @api private
	   */

	  function mixin(obj) {
	    for (var key in Emitter.prototype) {
	      obj[key] = Emitter.prototype[key];
	    }

	    return obj;
	  }
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   * @return {Emitter}
	   * @api public
	   */


	  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
	    this._callbacks = this._callbacks || {};
	    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
	    return this;
	  };
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   * @return {Emitter}
	   * @api public
	   */


	  Emitter.prototype.once = function (event, fn) {
	    function on() {
	      this.off(event, on);
	      fn.apply(this, arguments);
	    }

	    on.fn = fn;
	    this.on(event, on);
	    return this;
	  };
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   * @return {Emitter}
	   * @api public
	   */


	  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
	    this._callbacks = this._callbacks || {}; // all

	    if (0 == arguments.length) {
	      this._callbacks = {};
	      return this;
	    } // specific event


	    var callbacks = this._callbacks['$' + event];
	    if (!callbacks) return this; // remove all handlers

	    if (1 == arguments.length) {
	      delete this._callbacks['$' + event];
	      return this;
	    } // remove specific handler


	    var cb;

	    for (var i = 0; i < callbacks.length; i++) {
	      cb = callbacks[i];

	      if (cb === fn || cb.fn === fn) {
	        callbacks.splice(i, 1);
	        break;
	      }
	    } // Remove event specific arrays for event types that no
	    // one is subscribed for to avoid memory leak.


	    if (callbacks.length === 0) {
	      delete this._callbacks['$' + event];
	    }

	    return this;
	  };
	  /**
	   * Emit `event` with the given args.
	   *
	   * @param {String} event
	   * @param {Mixed} ...
	   * @return {Emitter}
	   */


	  Emitter.prototype.emit = function (event) {
	    this._callbacks = this._callbacks || {};
	    var args = new Array(arguments.length - 1),
	        callbacks = this._callbacks['$' + event];

	    for (var i = 1; i < arguments.length; i++) {
	      args[i - 1] = arguments[i];
	    }

	    if (callbacks) {
	      callbacks = callbacks.slice(0);

	      for (var i = 0, len = callbacks.length; i < len; ++i) {
	        callbacks[i].apply(this, args);
	      }
	    }

	    return this;
	  };
	  /**
	   * Return array of callbacks for `event`.
	   *
	   * @param {String} event
	   * @return {Array}
	   * @api public
	   */


	  Emitter.prototype.listeners = function (event) {
	    this._callbacks = this._callbacks || {};
	    return this._callbacks['$' + event] || [];
	  };
	  /**
	   * Check if this emitter has `event` handlers.
	   *
	   * @param {String} event
	   * @return {Boolean}
	   * @api public
	   */


	  Emitter.prototype.hasListeners = function (event) {
	    return !!this.listeners(event).length;
	  };
	});

	var _firstTarget = null; // singleton, will contain the target element where the touch event started

	/**
	 * Extend an Hammer.js instance with event propagation.
	 *
	 * Features:
	 * - Events emitted by hammer will propagate in order from child to parent
	 *   elements.
	 * - Events are extended with a function `event.stopPropagation()` to stop
	 *   propagation to parent elements.
	 * - An option `preventDefault` to stop all default browser behavior.
	 *
	 * Usage:
	 *   var hammer = propagatingHammer(new Hammer(element));
	 *   var hammer = propagatingHammer(new Hammer(element), {preventDefault: true});
	 *
	 * @param {Hammer.Manager} hammer   An hammer instance.
	 * @param {Object} [options]        Available options:
	 *                                  - `preventDefault: true | false | 'mouse' | 'touch' | 'pen'`.
	 *                                    Enforce preventing the default browser behavior.
	 *                                    Cannot be set to `false`.
	 * @return {Hammer.Manager} Returns the same hammer instance with extended
	 *                          functionality
	 */

	function propagating(hammer, options) {
	  var _options = options || {
	    preventDefault: false
	  };

	  if (hammer.Manager) {
	    // This looks like the Hammer constructor.
	    // Overload the constructors with our own.
	    var Hammer = hammer;

	    var PropagatingHammer = function (element, options) {
	      var o = Object.create(_options);
	      if (options) Hammer.assign(o, options);
	      return propagating(new Hammer(element, o), o);
	    };

	    Hammer.assign(PropagatingHammer, Hammer);

	    PropagatingHammer.Manager = function (element, options) {
	      var o = Object.create(_options);
	      if (options) Hammer.assign(o, options);
	      return propagating(new Hammer.Manager(element, o), o);
	    };

	    return PropagatingHammer;
	  } // create a wrapper object which will override the functions
	  // `on`, `off`, `destroy`, and `emit` of the hammer instance


	  var wrapper = Object.create(hammer); // attach to DOM element

	  var element = hammer.element;
	  if (!element.hammer) element.hammer = [];
	  element.hammer.push(wrapper); // register an event to catch the start of a gesture and store the
	  // target in a singleton

	  hammer.on('hammer.input', function (event) {
	    if (_options.preventDefault === true || _options.preventDefault === event.pointerType) {
	      event.preventDefault();
	    }

	    if (event.isFirst) {
	      _firstTarget = event.target;
	    }
	  });
	  /** @type {Object.<String, Array.<function>>} */

	  wrapper._handlers = {};
	  /**
	   * Register a handler for one or multiple events
	   * @param {String} events    A space separated string with events
	   * @param {function} handler A callback function, called as handler(event)
	   * @returns {Hammer.Manager} Returns the hammer instance
	   */

	  wrapper.on = function (events, handler) {
	    // register the handler
	    split(events).forEach(function (event) {
	      var _handlers = wrapper._handlers[event];

	      if (!_handlers) {
	        wrapper._handlers[event] = _handlers = []; // register the static, propagated handler

	        hammer.on(event, propagatedHandler);
	      }

	      _handlers.push(handler);
	    });
	    return wrapper;
	  };
	  /**
	   * Unregister a handler for one or multiple events
	   * @param {String} events      A space separated string with events
	   * @param {function} [handler] Optional. The registered handler. If not
	   *                             provided, all handlers for given events
	   *                             are removed.
	   * @returns {Hammer.Manager}   Returns the hammer instance
	   */


	  wrapper.off = function (events, handler) {
	    // unregister the handler
	    split(events).forEach(function (event) {
	      var _handlers = wrapper._handlers[event];

	      if (_handlers) {
	        _handlers = handler ? _handlers.filter(function (h) {
	          return h !== handler;
	        }) : [];

	        if (_handlers.length > 0) {
	          wrapper._handlers[event] = _handlers;
	        } else {
	          // remove static, propagated handler
	          hammer.off(event, propagatedHandler);
	          delete wrapper._handlers[event];
	        }
	      }
	    });
	    return wrapper;
	  };
	  /**
	   * Emit to the event listeners
	   * @param {string} eventType
	   * @param {Event} event
	   */


	  wrapper.emit = function (eventType, event) {
	    _firstTarget = event.target;
	    hammer.emit(eventType, event);
	  };

	  wrapper.destroy = function () {
	    // Detach from DOM element
	    var hammers = hammer.element.hammer;
	    var idx = hammers.indexOf(wrapper);
	    if (idx !== -1) hammers.splice(idx, 1);
	    if (!hammers.length) delete hammer.element.hammer; // clear all handlers

	    wrapper._handlers = {}; // call original hammer destroy

	    hammer.destroy();
	  }; // split a string with space separated words


	  function split(events) {
	    return events.match(/[^ ]+/g);
	  }
	  /**
	   * A static event handler, applying event propagation.
	   * @param {Object} event
	   */


	  function propagatedHandler(event) {
	    // let only a single hammer instance handle this event
	    if (event.type !== 'hammer.input') {
	      // it is possible that the same srcEvent is used with multiple hammer events,
	      // we keep track on which events are handled in an object _handled
	      if (!event.srcEvent._handled) {
	        event.srcEvent._handled = {};
	      }

	      if (event.srcEvent._handled[event.type]) {
	        return;
	      } else {
	        event.srcEvent._handled[event.type] = true;
	      }
	    } // attach a stopPropagation function to the event


	    var stopped = false;

	    event.stopPropagation = function () {
	      stopped = true;
	    }; //wrap the srcEvent's stopPropagation to also stop hammer propagation:


	    var srcStop = event.srcEvent.stopPropagation.bind(event.srcEvent);

	    if (typeof srcStop == "function") {
	      event.srcEvent.stopPropagation = function () {
	        srcStop();
	        event.stopPropagation();
	      };
	    } // attach firstTarget property to the event


	    event.firstTarget = _firstTarget; // propagate over all elements (until stopped)

	    var elem = _firstTarget;

	    while (elem && !stopped) {
	      var elemHammer = elem.hammer;

	      if (elemHammer) {
	        var _handlers;

	        for (var k = 0; k < elemHammer.length; k++) {
	          _handlers = elemHammer[k]._handlers[event.type];
	          if (_handlers) for (var i = 0; i < _handlers.length && !stopped; i++) {
	            _handlers[i](event);
	          }
	        }
	      }

	      elem = elem.parentNode;
	    }
	  }

	  return wrapper;
	}

	/*! Hammer.JS - v2.0.17-rc - 2019-12-16
	 * http://naver.github.io/egjs
	 *
	 * Forked By Naver egjs
	 * Copyright (c) hammerjs
	 * Licensed under the MIT license */
	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	function _assertThisInitialized$1(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}
	/**
	 * @private
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */


	var assign$3;

	if (typeof Object.assign !== 'function') {
	  assign$3 = function assign(target) {
	    if (target === undefined || target === null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }

	    var output = Object(target);

	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];

	      if (source !== undefined && source !== null) {
	        for (var nextKey in source) {
	          if (source.hasOwnProperty(nextKey)) {
	            output[nextKey] = source[nextKey];
	          }
	        }
	      }
	    }

	    return output;
	  };
	} else {
	  assign$3 = Object.assign;
	}

	var assign$1$1 = assign$3;
	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = typeof document === "undefined" ? {
	  style: {}
	} : document.createElement('div');
	var TYPE_FUNCTION = 'function';
	var round = Math.round,
	    abs = Math.abs;
	var now$3 = Date.now;
	/**
	 * @private
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */

	function prefixed(obj, property) {
	  var prefix;
	  var prop;
	  var camelProp = property[0].toUpperCase() + property.slice(1);
	  var i = 0;

	  while (i < VENDOR_PREFIXES.length) {
	    prefix = VENDOR_PREFIXES[i];
	    prop = prefix ? prefix + camelProp : property;

	    if (prop in obj) {
	      return prop;
	    }

	    i++;
	  }

	  return undefined;
	}
	/* eslint-disable no-new-func, no-nested-ternary */


	var win;

	if (typeof window === "undefined") {
	  // window is undefined in node.js
	  win = {};
	} else {
	  win = window;
	}

	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	function getTouchActionProps() {
	  if (!NATIVE_TOUCH_ACTION) {
	    return false;
	  }

	  var touchMap = {};
	  var cssSupports = win.CSS && win.CSS.supports;
	  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
	    // If css.supports is not supported but there is native touch-action assume it supports
	    // all values. This is the case for IE 10 and 11.
	    return touchMap[val] = cssSupports ? win.CSS.supports('touch-action', val) : true;
	  });
	  return touchMap;
	}

	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	var SUPPORT_TOUCH = ('ontouchstart' in win);
	var SUPPORT_POINTER_EVENTS = prefixed(win, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';
	var COMPUTE_INTERVAL = 25;
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	/**
	 * @private
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */

	function each(obj, iterator, context) {
	  var i;

	  if (!obj) {
	    return;
	  }

	  if (obj.forEach) {
	    obj.forEach(iterator, context);
	  } else if (obj.length !== undefined) {
	    i = 0;

	    while (i < obj.length) {
	      iterator.call(context, obj[i], i, obj);
	      i++;
	    }
	  } else {
	    for (i in obj) {
	      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	    }
	  }
	}
	/**
	 * @private
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */


	function boolOrFn(val, args) {
	  if (typeof val === TYPE_FUNCTION) {
	    return val.apply(args ? args[0] || undefined : undefined, args);
	  }

	  return val;
	}
	/**
	 * @private
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */


	function inStr(str, find) {
	  return str.indexOf(find) > -1;
	}
	/**
	 * @private
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */


	function cleanTouchActions(actions) {
	  // none
	  if (inStr(actions, TOUCH_ACTION_NONE)) {
	    return TOUCH_ACTION_NONE;
	  }

	  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
	  // for different directions, e.g. horizontal pan but vertical swipe?)
	  // we need none (as otherwise with pan-x pan-y combined none of these
	  // recognizers will work, since the browser would handle all panning

	  if (hasPanX && hasPanY) {
	    return TOUCH_ACTION_NONE;
	  } // pan-x OR pan-y


	  if (hasPanX || hasPanY) {
	    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	  } // manipulation


	  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	    return TOUCH_ACTION_MANIPULATION;
	  }

	  return TOUCH_ACTION_AUTO;
	}
	/**
	 * @private
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */


	var TouchAction = /*#__PURE__*/function () {
	  function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	  }
	  /**
	   * @private
	   * set the touchAction value on the element or enable the polyfill
	   * @param {String} value
	   */


	  var _proto = TouchAction.prototype;

	  _proto.set = function set(value) {
	    // find out the touch-action by the event handlers
	    if (value === TOUCH_ACTION_COMPUTE) {
	      value = this.compute();
	    }

	    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	    }

	    this.actions = value.toLowerCase().trim();
	  };
	  /**
	   * @private
	   * just re-set the touchAction value
	   */


	  _proto.update = function update() {
	    this.set(this.manager.options.touchAction);
	  };
	  /**
	   * @private
	   * compute the value for the touchAction property based on the recognizer's settings
	   * @returns {String} value
	   */


	  _proto.compute = function compute() {
	    var actions = [];
	    each(this.manager.recognizers, function (recognizer) {
	      if (boolOrFn(recognizer.options.enable, [recognizer])) {
	        actions = actions.concat(recognizer.getTouchAction());
	      }
	    });
	    return cleanTouchActions(actions.join(' '));
	  };
	  /**
	   * @private
	   * this method is called on each input cycle and provides the preventing of the browser behavior
	   * @param {Object} input
	   */


	  _proto.preventDefaults = function preventDefaults(input) {
	    var srcEvent = input.srcEvent;
	    var direction = input.offsetDirection; // if the touch action did prevented once this session

	    if (this.manager.session.prevented) {
	      srcEvent.preventDefault();
	      return;
	    }

	    var actions = this.actions;
	    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	    if (hasNone) {
	      // do not prevent defaults if this is a tap gesture
	      var isTapPointer = input.pointers.length === 1;
	      var isTapMovement = input.distance < 2;
	      var isTapTouchTime = input.deltaTime < 250;

	      if (isTapPointer && isTapMovement && isTapTouchTime) {
	        return;
	      }
	    }

	    if (hasPanX && hasPanY) {
	      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	      return;
	    }

	    if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
	      return this.preventSrc(srcEvent);
	    }
	  };
	  /**
	   * @private
	   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	   * @param {Object} srcEvent
	   */


	  _proto.preventSrc = function preventSrc(srcEvent) {
	    this.manager.session.prevented = true;
	    srcEvent.preventDefault();
	  };

	  return TouchAction;
	}();
	/**
	 * @private
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */


	function hasParent$1(node, parent) {
	  while (node) {
	    if (node === parent) {
	      return true;
	    }

	    node = node.parentNode;
	  }

	  return false;
	}
	/**
	 * @private
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */


	function getCenter(pointers) {
	  var pointersLength = pointers.length; // no need to loop when only one touch

	  if (pointersLength === 1) {
	    return {
	      x: round(pointers[0].clientX),
	      y: round(pointers[0].clientY)
	    };
	  }

	  var x = 0;
	  var y = 0;
	  var i = 0;

	  while (i < pointersLength) {
	    x += pointers[i].clientX;
	    y += pointers[i].clientY;
	    i++;
	  }

	  return {
	    x: round(x / pointersLength),
	    y: round(y / pointersLength)
	  };
	}
	/**
	 * @private
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */


	function simpleCloneInputData(input) {
	  // make a simple copy of the pointers because we will get a reference if we don't
	  // we only need clientXY for the calculations
	  var pointers = [];
	  var i = 0;

	  while (i < input.pointers.length) {
	    pointers[i] = {
	      clientX: round(input.pointers[i].clientX),
	      clientY: round(input.pointers[i].clientY)
	    };
	    i++;
	  }

	  return {
	    timeStamp: now$3(),
	    pointers: pointers,
	    center: getCenter(pointers),
	    deltaX: input.deltaX,
	    deltaY: input.deltaY
	  };
	}
	/**
	 * @private
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */


	function getDistance(p1, p2, props) {
	  if (!props) {
	    props = PROPS_XY;
	  }

	  var x = p2[props[0]] - p1[props[0]];
	  var y = p2[props[1]] - p1[props[1]];
	  return Math.sqrt(x * x + y * y);
	}
	/**
	 * @private
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */


	function getAngle(p1, p2, props) {
	  if (!props) {
	    props = PROPS_XY;
	  }

	  var x = p2[props[0]] - p1[props[0]];
	  var y = p2[props[1]] - p1[props[1]];
	  return Math.atan2(y, x) * 180 / Math.PI;
	}
	/**
	 * @private
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */


	function getDirection(x, y) {
	  if (x === y) {
	    return DIRECTION_NONE;
	  }

	  if (abs(x) >= abs(y)) {
	    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	  }

	  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}

	function computeDeltaXY(session, input) {
	  var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
	  // jscs throwing error on defalut destructured values and without defaults tests fail

	  var offset = session.offsetDelta || {};
	  var prevDelta = session.prevDelta || {};
	  var prevInput = session.prevInput || {};

	  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	    prevDelta = session.prevDelta = {
	      x: prevInput.deltaX || 0,
	      y: prevInput.deltaY || 0
	    };
	    offset = session.offsetDelta = {
	      x: center.x,
	      y: center.y
	    };
	  }

	  input.deltaX = prevDelta.x + (center.x - offset.x);
	  input.deltaY = prevDelta.y + (center.y - offset.y);
	}
	/**
	 * @private
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */


	function getVelocity(deltaTime, x, y) {
	  return {
	    x: x / deltaTime || 0,
	    y: y / deltaTime || 0
	  };
	}
	/**
	 * @private
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */


	function getScale(start, end) {
	  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	/**
	 * @private
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */


	function getRotation(start, end) {
	  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	/**
	 * @private
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */


	function computeIntervalInputData(session, input) {
	  var last = session.lastInterval || input;
	  var deltaTime = input.timeStamp - last.timeStamp;
	  var velocity;
	  var velocityX;
	  var velocityY;
	  var direction;

	  if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	    var deltaX = input.deltaX - last.deltaX;
	    var deltaY = input.deltaY - last.deltaY;
	    var v = getVelocity(deltaTime, deltaX, deltaY);
	    velocityX = v.x;
	    velocityY = v.y;
	    velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
	    direction = getDirection(deltaX, deltaY);
	    session.lastInterval = input;
	  } else {
	    // use latest velocity info if it doesn't overtake a minimum period
	    velocity = last.velocity;
	    velocityX = last.velocityX;
	    velocityY = last.velocityY;
	    direction = last.direction;
	  }

	  input.velocity = velocity;
	  input.velocityX = velocityX;
	  input.velocityY = velocityY;
	  input.direction = direction;
	}
	/**
	* @private
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */


	function computeInputData(manager, input) {
	  var session = manager.session;
	  var pointers = input.pointers;
	  var pointersLength = pointers.length; // store the first input to calculate the distance and direction

	  if (!session.firstInput) {
	    session.firstInput = simpleCloneInputData(input);
	  } // to compute scale and rotation we need to store the multiple touches


	  if (pointersLength > 1 && !session.firstMultiple) {
	    session.firstMultiple = simpleCloneInputData(input);
	  } else if (pointersLength === 1) {
	    session.firstMultiple = false;
	  }

	  var firstInput = session.firstInput,
	      firstMultiple = session.firstMultiple;
	  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	  var center = input.center = getCenter(pointers);
	  input.timeStamp = now$3();
	  input.deltaTime = input.timeStamp - firstInput.timeStamp;
	  input.angle = getAngle(offsetCenter, center);
	  input.distance = getDistance(offsetCenter, center);
	  computeDeltaXY(session, input);
	  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	  input.overallVelocityX = overallVelocity.x;
	  input.overallVelocityY = overallVelocity.y;
	  input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
	  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
	  computeIntervalInputData(session, input); // find the correct target

	  var target = manager.element;
	  var srcEvent = input.srcEvent;
	  var srcEventTarget;

	  if (srcEvent.composedPath) {
	    srcEventTarget = srcEvent.composedPath()[0];
	  } else if (srcEvent.path) {
	    srcEventTarget = srcEvent.path[0];
	  } else {
	    srcEventTarget = srcEvent.target;
	  }

	  if (hasParent$1(srcEventTarget, target)) {
	    target = srcEventTarget;
	  }

	  input.target = target;
	}
	/**
	 * @private
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */


	function inputHandler(manager, eventType, input) {
	  var pointersLen = input.pointers.length;
	  var changedPointersLen = input.changedPointers.length;
	  var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
	  var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
	  input.isFirst = !!isFirst;
	  input.isFinal = !!isFinal;

	  if (isFirst) {
	    manager.session = {};
	  } // source event is the normalized value of the domEvents
	  // like 'touchstart, mouseup, pointerdown'


	  input.eventType = eventType; // compute scale, rotation etc

	  computeInputData(manager, input); // emit secret event

	  manager.emit('hammer.input', input);
	  manager.recognize(input);
	  manager.session.prevInput = input;
	}
	/**
	 * @private
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */


	function splitStr(str) {
	  return str.trim().split(/\s+/g);
	}
	/**
	 * @private
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */


	function addEventListeners(target, types, handler) {
	  each(splitStr(types), function (type) {
	    target.addEventListener(type, handler, false);
	  });
	}
	/**
	 * @private
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */


	function removeEventListeners(target, types, handler) {
	  each(splitStr(types), function (type) {
	    target.removeEventListener(type, handler, false);
	  });
	}
	/**
	 * @private
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */


	function getWindowForElement(element) {
	  var doc = element.ownerDocument || element;
	  return doc.defaultView || doc.parentWindow || window;
	}
	/**
	 * @private
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */


	var Input = /*#__PURE__*/function () {
	  function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.

	    this.domHandler = function (ev) {
	      if (boolOrFn(manager.options.enable, [manager])) {
	        self.handler(ev);
	      }
	    };

	    this.init();
	  }
	  /**
	   * @private
	   * should handle the inputEvent data and trigger the callback
	   * @virtual
	   */


	  var _proto = Input.prototype;

	  _proto.handler = function handler() {};
	  /**
	   * @private
	   * bind the events
	   */


	  _proto.init = function init() {
	    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	  };
	  /**
	   * @private
	   * unbind the events
	   */


	  _proto.destroy = function destroy() {
	    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	  };

	  return Input;
	}();
	/**
	 * @private
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */


	function inArray(src, find, findByKey) {
	  if (src.indexOf && !findByKey) {
	    return src.indexOf(find);
	  } else {
	    var i = 0;

	    while (i < src.length) {
	      if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
	        // do not use === here, test fails
	        return i;
	      }

	      i++;
	    }

	    return -1;
	  }
	}

	var POINTER_INPUT_MAP = {
	  pointerdown: INPUT_START,
	  pointermove: INPUT_MOVE,
	  pointerup: INPUT_END,
	  pointercancel: INPUT_CANCEL,
	  pointerout: INPUT_CANCEL
	}; // in IE10 the pointer types is defined as an enum

	var IE10_POINTER_TYPE_ENUM = {
	  2: INPUT_TYPE_TOUCH,
	  3: INPUT_TYPE_PEN,
	  4: INPUT_TYPE_MOUSE,
	  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

	};
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

	if (win.MSPointerEvent && !win.PointerEvent) {
	  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}
	/**
	 * @private
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */


	var PointerEventInput = /*#__PURE__*/function (_Input) {
	  _inheritsLoose(PointerEventInput, _Input);

	  function PointerEventInput() {
	    var _this;

	    var proto = PointerEventInput.prototype;
	    proto.evEl = POINTER_ELEMENT_EVENTS;
	    proto.evWin = POINTER_WINDOW_EVENTS;
	    _this = _Input.apply(this, arguments) || this;
	    _this.store = _this.manager.session.pointerEvents = [];
	    return _this;
	  }
	  /**
	   * @private
	   * handle mouse events
	   * @param {Object} ev
	   */


	  var _proto = PointerEventInput.prototype;

	  _proto.handler = function handler(ev) {
	    var store = this.store;
	    var removePointer = false;
	    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	    var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

	    var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

	    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	      if (storeIndex < 0) {
	        store.push(ev);
	        storeIndex = store.length - 1;
	      }
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	      removePointer = true;
	    } // it not found, so the pointer hasn't been down (so it's probably a hover)


	    if (storeIndex < 0) {
	      return;
	    } // update the event in the store


	    store[storeIndex] = ev;
	    this.callback(this.manager, eventType, {
	      pointers: store,
	      changedPointers: [ev],
	      pointerType: pointerType,
	      srcEvent: ev
	    });

	    if (removePointer) {
	      // remove from the store
	      store.splice(storeIndex, 1);
	    }
	  };

	  return PointerEventInput;
	}(Input);
	/**
	 * @private
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */


	function toArray$1(obj) {
	  return Array.prototype.slice.call(obj, 0);
	}
	/**
	 * @private
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */


	function uniqueArray(src, key, sort) {
	  var results = [];
	  var values = [];
	  var i = 0;

	  while (i < src.length) {
	    var val = key ? src[i][key] : src[i];

	    if (inArray(values, val) < 0) {
	      results.push(src[i]);
	    }

	    values[i] = val;
	    i++;
	  }

	  if (sort) {
	    if (!key) {
	      results = results.sort();
	    } else {
	      results = results.sort(function (a, b) {
	        return a[key] > b[key];
	      });
	    }
	  }

	  return results;
	}

	var TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};
	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	/**
	 * @private
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */

	var TouchInput = /*#__PURE__*/function (_Input) {
	  _inheritsLoose(TouchInput, _Input);

	  function TouchInput() {
	    var _this;

	    TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
	    _this = _Input.apply(this, arguments) || this;
	    _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

	    return _this;
	  }

	  var _proto = TouchInput.prototype;

	  _proto.handler = function handler(ev) {
	    var type = TOUCH_INPUT_MAP[ev.type];
	    var touches = getTouches.call(this, ev, type);

	    if (!touches) {
	      return;
	    }

	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  };

	  return TouchInput;
	}(Input);

	function getTouches(ev, type) {
	  var allTouches = toArray$1(ev.touches);
	  var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

	  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	    targetIds[allTouches[0].identifier] = true;
	    return [allTouches, allTouches];
	  }

	  var i;
	  var targetTouches;
	  var changedTouches = toArray$1(ev.changedTouches);
	  var changedTargetTouches = [];
	  var target = this.target; // get target touches from touches

	  targetTouches = allTouches.filter(function (touch) {
	    return hasParent$1(touch.target, target);
	  }); // collect touches

	  if (type === INPUT_START) {
	    i = 0;

	    while (i < targetTouches.length) {
	      targetIds[targetTouches[i].identifier] = true;
	      i++;
	    }
	  } // filter changed touches to only contain touches that exist in the collected target ids


	  i = 0;

	  while (i < changedTouches.length) {
	    if (targetIds[changedTouches[i].identifier]) {
	      changedTargetTouches.push(changedTouches[i]);
	    } // cleanup removed touches


	    if (type & (INPUT_END | INPUT_CANCEL)) {
	      delete targetIds[changedTouches[i].identifier];
	    }

	    i++;
	  }

	  if (!changedTargetTouches.length) {
	    return;
	  }

	  return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	  uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
	}

	var MOUSE_INPUT_MAP = {
	  mousedown: INPUT_START,
	  mousemove: INPUT_MOVE,
	  mouseup: INPUT_END
	};
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	/**
	 * @private
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */

	var MouseInput = /*#__PURE__*/function (_Input) {
	  _inheritsLoose(MouseInput, _Input);

	  function MouseInput() {
	    var _this;

	    var proto = MouseInput.prototype;
	    proto.evEl = MOUSE_ELEMENT_EVENTS;
	    proto.evWin = MOUSE_WINDOW_EVENTS;
	    _this = _Input.apply(this, arguments) || this;
	    _this.pressed = false; // mousedown state

	    return _this;
	  }
	  /**
	   * @private
	   * handle mouse events
	   * @param {Object} ev
	   */


	  var _proto = MouseInput.prototype;

	  _proto.handler = function handler(ev) {
	    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

	    if (eventType & INPUT_START && ev.button === 0) {
	      this.pressed = true;
	    }

	    if (eventType & INPUT_MOVE && ev.which !== 1) {
	      eventType = INPUT_END;
	    } // mouse must be down


	    if (!this.pressed) {
	      return;
	    }

	    if (eventType & INPUT_END) {
	      this.pressed = false;
	    }

	    this.callback(this.manager, eventType, {
	      pointers: [ev],
	      changedPointers: [ev],
	      pointerType: INPUT_TYPE_MOUSE,
	      srcEvent: ev
	    });
	  };

	  return MouseInput;
	}(Input);
	/**
	 * @private
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */


	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;

	function setLastTouch(eventData) {
	  var _eventData$changedPoi = eventData.changedPointers,
	      touch = _eventData$changedPoi[0];

	  if (touch.identifier === this.primaryTouch) {
	    var lastTouch = {
	      x: touch.clientX,
	      y: touch.clientY
	    };
	    var lts = this.lastTouches;
	    this.lastTouches.push(lastTouch);

	    var removeLastTouch = function removeLastTouch() {
	      var i = lts.indexOf(lastTouch);

	      if (i > -1) {
	        lts.splice(i, 1);
	      }
	    };

	    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	  }
	}

	function recordTouches(eventType, eventData) {
	  if (eventType & INPUT_START) {
	    this.primaryTouch = eventData.changedPointers[0].identifier;
	    setLastTouch.call(this, eventData);
	  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	    setLastTouch.call(this, eventData);
	  }
	}

	function isSyntheticEvent(eventData) {
	  var x = eventData.srcEvent.clientX;
	  var y = eventData.srcEvent.clientY;

	  for (var i = 0; i < this.lastTouches.length; i++) {
	    var t = this.lastTouches[i];
	    var dx = Math.abs(x - t.x);
	    var dy = Math.abs(y - t.y);

	    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	      return true;
	    }
	  }

	  return false;
	}

	var TouchMouseInput = /*#__PURE__*/function () {
	  var TouchMouseInput = /*#__PURE__*/function (_Input) {
	    _inheritsLoose(TouchMouseInput, _Input);

	    function TouchMouseInput(_manager, callback) {
	      var _this;

	      _this = _Input.call(this, _manager, callback) || this;

	      _this.handler = function (manager, inputEvent, inputData) {
	        var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
	        var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	          return;
	        } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


	        if (isTouch) {
	          recordTouches.call(_assertThisInitialized$1(_assertThisInitialized$1(_this)), inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized$1(_assertThisInitialized$1(_this)), inputData)) {
	          return;
	        }

	        _this.callback(manager, inputEvent, inputData);
	      };

	      _this.touch = new TouchInput(_this.manager, _this.handler);
	      _this.mouse = new MouseInput(_this.manager, _this.handler);
	      _this.primaryTouch = null;
	      _this.lastTouches = [];
	      return _this;
	    }
	    /**
	     * @private
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */


	    var _proto = TouchMouseInput.prototype;
	    /**
	     * @private
	     * remove the event listeners
	     */

	    _proto.destroy = function destroy() {
	      this.touch.destroy();
	      this.mouse.destroy();
	    };

	    return TouchMouseInput;
	  }(Input);

	  return TouchMouseInput;
	}();
	/**
	 * @private
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */


	function createInputInstance(manager) {
	  var Type; // let inputClass = manager.options.inputClass;

	  var inputClass = manager.options.inputClass;

	  if (inputClass) {
	    Type = inputClass;
	  } else if (SUPPORT_POINTER_EVENTS) {
	    Type = PointerEventInput;
	  } else if (SUPPORT_ONLY_TOUCH) {
	    Type = TouchInput;
	  } else if (!SUPPORT_TOUCH) {
	    Type = MouseInput;
	  } else {
	    Type = TouchMouseInput;
	  }

	  return new Type(manager, inputHandler);
	}
	/**
	 * @private
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */


	function invokeArrayArg(arg, fn, context) {
	  if (Array.isArray(arg)) {
	    each(arg, context[fn], context);
	    return true;
	  }

	  return false;
	}

	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	/**
	 * @private
	 * get a unique id
	 * @returns {number} uniqueId
	 */

	var _uniqueId = 1;

	function uniqueId() {
	  return _uniqueId++;
	}
	/**
	 * @private
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */


	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	  var manager = recognizer.manager;

	  if (manager) {
	    return manager.get(otherRecognizer);
	  }

	  return otherRecognizer;
	}
	/**
	 * @private
	 * get a usable string, used as event postfix
	 * @param {constant} state
	 * @returns {String} state
	 */


	function stateStr(state) {
	  if (state & STATE_CANCELLED) {
	    return 'cancel';
	  } else if (state & STATE_ENDED) {
	    return 'end';
	  } else if (state & STATE_CHANGED) {
	    return 'move';
	  } else if (state & STATE_BEGAN) {
	    return 'start';
	  }

	  return '';
	}
	/**
	 * @private
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */

	/**
	 * @private
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */


	var Recognizer = /*#__PURE__*/function () {
	  function Recognizer(options) {
	    if (options === void 0) {
	      options = {};
	    }

	    this.options = _extends({
	      enable: true
	    }, options);
	    this.id = uniqueId();
	    this.manager = null; // default is enable true

	    this.state = STATE_POSSIBLE;
	    this.simultaneous = {};
	    this.requireFail = [];
	  }
	  /**
	   * @private
	   * set options
	   * @param {Object} options
	   * @return {Recognizer}
	   */


	  var _proto = Recognizer.prototype;

	  _proto.set = function set(options) {
	    assign$1$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

	    this.manager && this.manager.touchAction.update();
	    return this;
	  };
	  /**
	   * @private
	   * recognize simultaneous with an other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */


	  _proto.recognizeWith = function recognizeWith(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	      return this;
	    }

	    var simultaneous = this.simultaneous;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

	    if (!simultaneous[otherRecognizer.id]) {
	      simultaneous[otherRecognizer.id] = otherRecognizer;
	      otherRecognizer.recognizeWith(this);
	    }

	    return this;
	  };
	  /**
	   * @private
	   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */


	  _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	      return this;
	    }

	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    delete this.simultaneous[otherRecognizer.id];
	    return this;
	  };
	  /**
	   * @private
	   * recognizer can only run when an other is failing
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */


	  _proto.requireFailure = function requireFailure(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	      return this;
	    }

	    var requireFail = this.requireFail;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

	    if (inArray(requireFail, otherRecognizer) === -1) {
	      requireFail.push(otherRecognizer);
	      otherRecognizer.requireFailure(this);
	    }

	    return this;
	  };
	  /**
	   * @private
	   * drop the requireFailure link. it does not remove the link on the other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */


	  _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	      return this;
	    }

	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    var index = inArray(this.requireFail, otherRecognizer);

	    if (index > -1) {
	      this.requireFail.splice(index, 1);
	    }

	    return this;
	  };
	  /**
	   * @private
	   * has require failures boolean
	   * @returns {boolean}
	   */


	  _proto.hasRequireFailures = function hasRequireFailures() {
	    return this.requireFail.length > 0;
	  };
	  /**
	   * @private
	   * if the recognizer can recognize simultaneous with an other recognizer
	   * @param {Recognizer} otherRecognizer
	   * @returns {Boolean}
	   */


	  _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
	    return !!this.simultaneous[otherRecognizer.id];
	  };
	  /**
	   * @private
	   * You should use `tryEmit` instead of `emit` directly to check
	   * that all the needed recognizers has failed before emitting.
	   * @param {Object} input
	   */


	  _proto.emit = function emit(input) {
	    var self = this;
	    var state = this.state;

	    function emit(event) {
	      self.manager.emit(event, input);
	    } // 'panstart' and 'panmove'


	    if (state < STATE_ENDED) {
	      emit(self.options.event + stateStr(state));
	    }

	    emit(self.options.event); // simple 'eventName' events

	    if (input.additionalEvent) {
	      // additional event(panleft, panright, pinchin, pinchout...)
	      emit(input.additionalEvent);
	    } // panend and pancancel


	    if (state >= STATE_ENDED) {
	      emit(self.options.event + stateStr(state));
	    }
	  };
	  /**
	   * @private
	   * Check that all the require failure recognizers has failed,
	   * if true, it emits a gesture event,
	   * otherwise, setup the state to FAILED.
	   * @param {Object} input
	   */


	  _proto.tryEmit = function tryEmit(input) {
	    if (this.canEmit()) {
	      return this.emit(input);
	    } // it's failing anyway


	    this.state = STATE_FAILED;
	  };
	  /**
	   * @private
	   * can we emit?
	   * @returns {boolean}
	   */


	  _proto.canEmit = function canEmit() {
	    var i = 0;

	    while (i < this.requireFail.length) {
	      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	        return false;
	      }

	      i++;
	    }

	    return true;
	  };
	  /**
	   * @private
	   * update the recognizer
	   * @param {Object} inputData
	   */


	  _proto.recognize = function recognize(inputData) {
	    // make a new copy of the inputData
	    // so we can change the inputData without messing up the other recognizers
	    var inputDataClone = assign$1$1({}, inputData); // is is enabled and allow recognizing?

	    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	      this.reset();
	      this.state = STATE_FAILED;
	      return;
	    } // reset when we've reached the end


	    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	      this.state = STATE_POSSIBLE;
	    }

	    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
	    // so trigger an event

	    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	      this.tryEmit(inputDataClone);
	    }
	  };
	  /**
	   * @private
	   * return the state of the recognizer
	   * the actual recognizing happens in this method
	   * @virtual
	   * @param {Object} inputData
	   * @returns {constant} STATE
	   */

	  /* jshint ignore:start */


	  _proto.process = function process(inputData) {};
	  /* jshint ignore:end */

	  /**
	   * @private
	   * return the preferred touch-action
	   * @virtual
	   * @returns {Array}
	   */


	  _proto.getTouchAction = function getTouchAction() {};
	  /**
	   * @private
	   * called when the gesture isn't allowed to recognize
	   * like when another is being recognized or it is disabled
	   * @virtual
	   */


	  _proto.reset = function reset() {};

	  return Recognizer;
	}();
	/**
	 * @private
	 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */


	var TapRecognizer = /*#__PURE__*/function (_Recognizer) {
	  _inheritsLoose(TapRecognizer, _Recognizer);

	  function TapRecognizer(options) {
	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _Recognizer.call(this, _extends({
	      event: 'tap',
	      pointers: 1,
	      taps: 1,
	      interval: 300,
	      // max time between the multi-tap taps
	      time: 250,
	      // max time of the pointer to be down (like finger on the screen)
	      threshold: 9,
	      // a minimal movement is ok, but keep it low
	      posThreshold: 10
	    }, options)) || this; // previous time and center,
	    // used for tap counting

	    _this.pTime = false;
	    _this.pCenter = false;
	    _this._timer = null;
	    _this._input = null;
	    _this.count = 0;
	    return _this;
	  }

	  var _proto = TapRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    return [TOUCH_ACTION_MANIPULATION];
	  };

	  _proto.process = function process(input) {
	    var _this2 = this;

	    var options = this.options;
	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTouchTime = input.deltaTime < options.time;
	    this.reset();

	    if (input.eventType & INPUT_START && this.count === 0) {
	      return this.failTimeout();
	    } // we only allow little movement
	    // and we've reached an end event, so a tap is possible


	    if (validMovement && validTouchTime && validPointers) {
	      if (input.eventType !== INPUT_END) {
	        return this.failTimeout();
	      }

	      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
	      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	      this.pTime = input.timeStamp;
	      this.pCenter = input.center;

	      if (!validMultiTap || !validInterval) {
	        this.count = 1;
	      } else {
	        this.count += 1;
	      }

	      this._input = input; // if tap count matches we have recognized it,
	      // else it has began recognizing...

	      var tapCount = this.count % options.taps;

	      if (tapCount === 0) {
	        // no failing requirements, immediately trigger the tap event
	        // or wait as long as the multitap interval to trigger
	        if (!this.hasRequireFailures()) {
	          return STATE_RECOGNIZED;
	        } else {
	          this._timer = setTimeout(function () {
	            _this2.state = STATE_RECOGNIZED;

	            _this2.tryEmit();
	          }, options.interval);
	          return STATE_BEGAN;
	        }
	      }
	    }

	    return STATE_FAILED;
	  };

	  _proto.failTimeout = function failTimeout() {
	    var _this3 = this;

	    this._timer = setTimeout(function () {
	      _this3.state = STATE_FAILED;
	    }, this.options.interval);
	    return STATE_FAILED;
	  };

	  _proto.reset = function reset() {
	    clearTimeout(this._timer);
	  };

	  _proto.emit = function emit() {
	    if (this.state === STATE_RECOGNIZED) {
	      this._input.tapCount = this.count;
	      this.manager.emit(this.options.event, this._input);
	    }
	  };

	  return TapRecognizer;
	}(Recognizer);
	/**
	 * @private
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */


	var AttrRecognizer = /*#__PURE__*/function (_Recognizer) {
	  _inheritsLoose(AttrRecognizer, _Recognizer);

	  function AttrRecognizer(options) {
	    if (options === void 0) {
	      options = {};
	    }

	    return _Recognizer.call(this, _extends({
	      pointers: 1
	    }, options)) || this;
	  }
	  /**
	   * @private
	   * Used to check if it the recognizer receives valid input, like input.distance > 10.
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {Boolean} recognized
	   */


	  var _proto = AttrRecognizer.prototype;

	  _proto.attrTest = function attrTest(input) {
	    var optionPointers = this.options.pointers;
	    return optionPointers === 0 || input.pointers.length === optionPointers;
	  };
	  /**
	   * @private
	   * Process the input and return the state for the recognizer
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {*} State
	   */


	  _proto.process = function process(input) {
	    var state = this.state;
	    var eventType = input.eventType;
	    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

	    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	      return state | STATE_CANCELLED;
	    } else if (isRecognized || isValid) {
	      if (eventType & INPUT_END) {
	        return state | STATE_ENDED;
	      } else if (!(state & STATE_BEGAN)) {
	        return STATE_BEGAN;
	      }

	      return state | STATE_CHANGED;
	    }

	    return STATE_FAILED;
	  };

	  return AttrRecognizer;
	}(Recognizer);
	/**
	 * @private
	 * direction cons to string
	 * @param {constant} direction
	 * @returns {String}
	 */


	function directionStr(direction) {
	  if (direction === DIRECTION_DOWN) {
	    return 'down';
	  } else if (direction === DIRECTION_UP) {
	    return 'up';
	  } else if (direction === DIRECTION_LEFT) {
	    return 'left';
	  } else if (direction === DIRECTION_RIGHT) {
	    return 'right';
	  }

	  return '';
	}
	/**
	 * @private
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */


	var PanRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
	  _inheritsLoose(PanRecognizer, _AttrRecognizer);

	  function PanRecognizer(options) {
	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _AttrRecognizer.call(this, _extends({
	      event: 'pan',
	      threshold: 10,
	      pointers: 1,
	      direction: DIRECTION_ALL
	    }, options)) || this;
	    _this.pX = null;
	    _this.pY = null;
	    return _this;
	  }

	  var _proto = PanRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    var direction = this.options.direction;
	    var actions = [];

	    if (direction & DIRECTION_HORIZONTAL) {
	      actions.push(TOUCH_ACTION_PAN_Y);
	    }

	    if (direction & DIRECTION_VERTICAL) {
	      actions.push(TOUCH_ACTION_PAN_X);
	    }

	    return actions;
	  };

	  _proto.directionTest = function directionTest(input) {
	    var options = this.options;
	    var hasMoved = true;
	    var distance = input.distance;
	    var direction = input.direction;
	    var x = input.deltaX;
	    var y = input.deltaY; // lock to axis?

	    if (!(direction & options.direction)) {
	      if (options.direction & DIRECTION_HORIZONTAL) {
	        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        hasMoved = x !== this.pX;
	        distance = Math.abs(input.deltaX);
	      } else {
	        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	        hasMoved = y !== this.pY;
	        distance = Math.abs(input.deltaY);
	      }
	    }

	    input.direction = direction;
	    return hasMoved && distance > options.threshold && direction & options.direction;
	  };

	  _proto.attrTest = function attrTest(input) {
	    return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
	    this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
	  };

	  _proto.emit = function emit(input) {
	    this.pX = input.deltaX;
	    this.pY = input.deltaY;
	    var direction = directionStr(input.direction);

	    if (direction) {
	      input.additionalEvent = this.options.event + direction;
	    }

	    _AttrRecognizer.prototype.emit.call(this, input);
	  };

	  return PanRecognizer;
	}(AttrRecognizer);
	/**
	 * @private
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */


	var SwipeRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
	  _inheritsLoose(SwipeRecognizer, _AttrRecognizer);

	  function SwipeRecognizer(options) {
	    if (options === void 0) {
	      options = {};
	    }

	    return _AttrRecognizer.call(this, _extends({
	      event: 'swipe',
	      threshold: 10,
	      velocity: 0.3,
	      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	      pointers: 1
	    }, options)) || this;
	  }

	  var _proto = SwipeRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    return PanRecognizer.prototype.getTouchAction.call(this);
	  };

	  _proto.attrTest = function attrTest(input) {
	    var direction = this.options.direction;
	    var velocity;

	    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	      velocity = input.overallVelocity;
	    } else if (direction & DIRECTION_HORIZONTAL) {
	      velocity = input.overallVelocityX;
	    } else if (direction & DIRECTION_VERTICAL) {
	      velocity = input.overallVelocityY;
	    }

	    return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	  };

	  _proto.emit = function emit(input) {
	    var direction = directionStr(input.offsetDirection);

	    if (direction) {
	      this.manager.emit(this.options.event + direction, input);
	    }

	    this.manager.emit(this.options.event, input);
	  };

	  return SwipeRecognizer;
	}(AttrRecognizer);
	/**
	 * @private
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */


	var PinchRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
	  _inheritsLoose(PinchRecognizer, _AttrRecognizer);

	  function PinchRecognizer(options) {
	    if (options === void 0) {
	      options = {};
	    }

	    return _AttrRecognizer.call(this, _extends({
	      event: 'pinch',
	      threshold: 0,
	      pointers: 2
	    }, options)) || this;
	  }

	  var _proto = PinchRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    return [TOUCH_ACTION_NONE];
	  };

	  _proto.attrTest = function attrTest(input) {
	    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	  };

	  _proto.emit = function emit(input) {
	    if (input.scale !== 1) {
	      var inOut = input.scale < 1 ? 'in' : 'out';
	      input.additionalEvent = this.options.event + inOut;
	    }

	    _AttrRecognizer.prototype.emit.call(this, input);
	  };

	  return PinchRecognizer;
	}(AttrRecognizer);
	/**
	 * @private
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */


	var RotateRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
	  _inheritsLoose(RotateRecognizer, _AttrRecognizer);

	  function RotateRecognizer(options) {
	    if (options === void 0) {
	      options = {};
	    }

	    return _AttrRecognizer.call(this, _extends({
	      event: 'rotate',
	      threshold: 0,
	      pointers: 2
	    }, options)) || this;
	  }

	  var _proto = RotateRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    return [TOUCH_ACTION_NONE];
	  };

	  _proto.attrTest = function attrTest(input) {
	    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	  };

	  return RotateRecognizer;
	}(AttrRecognizer);
	/**
	 * @private
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */


	var PressRecognizer = /*#__PURE__*/function (_Recognizer) {
	  _inheritsLoose(PressRecognizer, _Recognizer);

	  function PressRecognizer(options) {
	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _Recognizer.call(this, _extends({
	      event: 'press',
	      pointers: 1,
	      time: 251,
	      // minimal time of the pointer to be pressed
	      threshold: 9
	    }, options)) || this;
	    _this._timer = null;
	    _this._input = null;
	    return _this;
	  }

	  var _proto = PressRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    return [TOUCH_ACTION_AUTO];
	  };

	  _proto.process = function process(input) {
	    var _this2 = this;

	    var options = this.options;
	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTime = input.deltaTime > options.time;
	    this._input = input; // we only allow little movement
	    // and we've reached an end event, so a tap is possible

	    if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
	      this.reset();
	    } else if (input.eventType & INPUT_START) {
	      this.reset();
	      this._timer = setTimeout(function () {
	        _this2.state = STATE_RECOGNIZED;

	        _this2.tryEmit();
	      }, options.time);
	    } else if (input.eventType & INPUT_END) {
	      return STATE_RECOGNIZED;
	    }

	    return STATE_FAILED;
	  };

	  _proto.reset = function reset() {
	    clearTimeout(this._timer);
	  };

	  _proto.emit = function emit(input) {
	    if (this.state !== STATE_RECOGNIZED) {
	      return;
	    }

	    if (input && input.eventType & INPUT_END) {
	      this.manager.emit(this.options.event + "up", input);
	    } else {
	      this._input.timeStamp = now$3();
	      this.manager.emit(this.options.event, this._input);
	    }
	  };

	  return PressRecognizer;
	}(Recognizer);

	var defaults = {
	  /**
	   * @private
	   * set if DOM events are being triggered.
	   * But this is slower and unused by simple implementations, so disabled by default.
	   * @type {Boolean}
	   * @default false
	   */
	  domEvents: false,

	  /**
	   * @private
	   * The value for the touchAction property/fallback.
	   * When set to `compute` it will magically set the correct value based on the added recognizers.
	   * @type {String}
	   * @default compute
	   */
	  touchAction: TOUCH_ACTION_COMPUTE,

	  /**
	   * @private
	   * @type {Boolean}
	   * @default true
	   */
	  enable: true,

	  /**
	   * @private
	   * EXPERIMENTAL FEATURE -- can be removed/changed
	   * Change the parent input target element.
	   * If Null, then it is being set the to main element.
	   * @type {Null|EventTarget}
	   * @default null
	   */
	  inputTarget: null,

	  /**
	   * @private
	   * force an input class
	   * @type {Null|Function}
	   * @default null
	   */
	  inputClass: null,

	  /**
	   * @private
	   * Some CSS properties can be used to improve the working of Hammer.
	   * Add them to this method and they will be set when creating a new Manager.
	   * @namespace
	   */
	  cssProps: {
	    /**
	     * @private
	     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userSelect: "none",

	    /**
	     * @private
	     * Disable the Windows Phone grippers when pressing an element.
	     * @type {String}
	     * @default 'none'
	     */
	    touchSelect: "none",

	    /**
	     * @private
	     * Disables the default callout shown when you touch and hold a touch target.
	     * On iOS, when you touch and hold a touch target such as a link, Safari displays
	     * a callout containing information about the link. This property allows you to disable that callout.
	     * @type {String}
	     * @default 'none'
	     */
	    touchCallout: "none",

	    /**
	     * @private
	     * Specifies whether zooming is enabled. Used by IE10>
	     * @type {String}
	     * @default 'none'
	     */
	    contentZooming: "none",

	    /**
	     * @private
	     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userDrag: "none",

	    /**
	     * @private
	     * Overrides the highlight color shown when the user taps a link or a JavaScript
	     * clickable element in iOS. This property obeys the alpha value, if specified.
	     * @type {String}
	     * @default 'rgba(0,0,0,0)'
	     */
	    tapHighlightColor: "rgba(0,0,0,0)"
	  }
	};
	/**
	 * @private
	 * Default recognizer setup when calling `Hammer()`
	 * When creating a new Manager these will be skipped.
	 * This is separated with other defaults because of tree-shaking.
	 * @type {Array}
	 */

	var preset = [[RotateRecognizer, {
	  enable: false
	}], [PinchRecognizer, {
	  enable: false
	}, ['rotate']], [SwipeRecognizer, {
	  direction: DIRECTION_HORIZONTAL
	}], [PanRecognizer, {
	  direction: DIRECTION_HORIZONTAL
	}, ['swipe']], [TapRecognizer], [TapRecognizer, {
	  event: 'doubletap',
	  taps: 2
	}, ['tap']], [PressRecognizer]];
	var STOP = 1;
	var FORCED_STOP = 2;
	/**
	 * @private
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */

	function toggleCssProps(manager, add) {
	  var element = manager.element;

	  if (!element.style) {
	    return;
	  }

	  var prop;
	  each(manager.options.cssProps, function (value, name) {
	    prop = prefixed(element.style, name);

	    if (add) {
	      manager.oldCssProps[prop] = element.style[prop];
	      element.style[prop] = value;
	    } else {
	      element.style[prop] = manager.oldCssProps[prop] || "";
	    }
	  });

	  if (!add) {
	    manager.oldCssProps = {};
	  }
	}
	/**
	 * @private
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */


	function triggerDomEvent(event, data) {
	  var gestureEvent = document.createEvent("Event");
	  gestureEvent.initEvent(event, true, true);
	  gestureEvent.gesture = data;
	  data.target.dispatchEvent(gestureEvent);
	}
	/**
	* @private
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */


	var Manager = /*#__PURE__*/function () {
	  function Manager(element, options) {
	    var _this = this;

	    this.options = assign$1$1({}, defaults, options || {});
	    this.options.inputTarget = this.options.inputTarget || element;
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	    toggleCssProps(this, true);
	    each(this.options.recognizers, function (item) {
	      var recognizer = _this.add(new item[0](item[1]));

	      item[2] && recognizer.recognizeWith(item[2]);
	      item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	  }
	  /**
	   * @private
	   * set options
	   * @param {Object} options
	   * @returns {Manager}
	   */


	  var _proto = Manager.prototype;

	  _proto.set = function set(options) {
	    assign$1$1(this.options, options); // Options that need a little more setup

	    if (options.touchAction) {
	      this.touchAction.update();
	    }

	    if (options.inputTarget) {
	      // Clean up existing event listeners and reinitialize
	      this.input.destroy();
	      this.input.target = options.inputTarget;
	      this.input.init();
	    }

	    return this;
	  };
	  /**
	   * @private
	   * stop recognizing for this session.
	   * This session will be discarded, when a new [input]start event is fired.
	   * When forced, the recognizer cycle is stopped immediately.
	   * @param {Boolean} [force]
	   */


	  _proto.stop = function stop(force) {
	    this.session.stopped = force ? FORCED_STOP : STOP;
	  };
	  /**
	   * @private
	   * run the recognizers!
	   * called by the inputHandler function on every movement of the pointers (touches)
	   * it walks through all the recognizers and tries to detect the gesture that is being made
	   * @param {Object} inputData
	   */


	  _proto.recognize = function recognize(inputData) {
	    var session = this.session;

	    if (session.stopped) {
	      return;
	    } // run the touch-action polyfill


	    this.touchAction.preventDefaults(inputData);
	    var recognizer;
	    var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
	    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	    // if no recognizer is detecting a thing, it is set to `null`

	    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
	    // or when we're in a new session

	    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
	      session.curRecognizer = null;
	      curRecognizer = null;
	    }

	    var i = 0;

	    while (i < recognizers.length) {
	      recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
	      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	      //      that is being recognized.
	      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	      //      this can be setup with the `recognizeWith()` method on the recognizer.

	      if (session.stopped !== FORCED_STOP && ( // 1
	      !curRecognizer || recognizer === curRecognizer || // 2
	      recognizer.canRecognizeWith(curRecognizer))) {
	        // 3
	        recognizer.recognize(inputData);
	      } else {
	        recognizer.reset();
	      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	      // current active recognizer. but only if we don't already have an active recognizer


	      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	        session.curRecognizer = recognizer;
	        curRecognizer = recognizer;
	      }

	      i++;
	    }
	  };
	  /**
	   * @private
	   * get a recognizer by its event name.
	   * @param {Recognizer|String} recognizer
	   * @returns {Recognizer|Null}
	   */


	  _proto.get = function get(recognizer) {
	    if (recognizer instanceof Recognizer) {
	      return recognizer;
	    }

	    var recognizers = this.recognizers;

	    for (var i = 0; i < recognizers.length; i++) {
	      if (recognizers[i].options.event === recognizer) {
	        return recognizers[i];
	      }
	    }

	    return null;
	  };
	  /**
	   * @private add a recognizer to the manager
	   * existing recognizers with the same event name will be removed
	   * @param {Recognizer} recognizer
	   * @returns {Recognizer|Manager}
	   */


	  _proto.add = function add(recognizer) {
	    if (invokeArrayArg(recognizer, "add", this)) {
	      return this;
	    } // remove existing


	    var existing = this.get(recognizer.options.event);

	    if (existing) {
	      this.remove(existing);
	    }

	    this.recognizers.push(recognizer);
	    recognizer.manager = this;
	    this.touchAction.update();
	    return recognizer;
	  };
	  /**
	   * @private
	   * remove a recognizer by name or instance
	   * @param {Recognizer|String} recognizer
	   * @returns {Manager}
	   */


	  _proto.remove = function remove(recognizer) {
	    if (invokeArrayArg(recognizer, "remove", this)) {
	      return this;
	    }

	    var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

	    if (recognizer) {
	      var recognizers = this.recognizers;
	      var index = inArray(recognizers, targetRecognizer);

	      if (index !== -1) {
	        recognizers.splice(index, 1);
	        this.touchAction.update();
	      }
	    }

	    return this;
	  };
	  /**
	   * @private
	   * bind event
	   * @param {String} events
	   * @param {Function} handler
	   * @returns {EventEmitter} this
	   */


	  _proto.on = function on(events, handler) {
	    if (events === undefined || handler === undefined) {
	      return this;
	    }

	    var handlers = this.handlers;
	    each(splitStr(events), function (event) {
	      handlers[event] = handlers[event] || [];
	      handlers[event].push(handler);
	    });
	    return this;
	  };
	  /**
	   * @private unbind event, leave emit blank to remove all handlers
	   * @param {String} events
	   * @param {Function} [handler]
	   * @returns {EventEmitter} this
	   */


	  _proto.off = function off(events, handler) {
	    if (events === undefined) {
	      return this;
	    }

	    var handlers = this.handlers;
	    each(splitStr(events), function (event) {
	      if (!handler) {
	        delete handlers[event];
	      } else {
	        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	      }
	    });
	    return this;
	  };
	  /**
	   * @private emit event to the listeners
	   * @param {String} event
	   * @param {Object} data
	   */


	  _proto.emit = function emit(event, data) {
	    // we also want to trigger dom events
	    if (this.options.domEvents) {
	      triggerDomEvent(event, data);
	    } // no handlers, so skip it all


	    var handlers = this.handlers[event] && this.handlers[event].slice();

	    if (!handlers || !handlers.length) {
	      return;
	    }

	    data.type = event;

	    data.preventDefault = function () {
	      data.srcEvent.preventDefault();
	    };

	    var i = 0;

	    while (i < handlers.length) {
	      handlers[i](data);
	      i++;
	    }
	  };
	  /**
	   * @private
	   * destroy the manager and unbinds all events
	   * it doesn't unbind dom events, that is the user own responsibility
	   */


	  _proto.destroy = function destroy() {
	    this.element && toggleCssProps(this, false);
	    this.handlers = {};
	    this.session = {};
	    this.input.destroy();
	    this.element = null;
	  };

	  return Manager;
	}();

	var SINGLE_TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};
	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	/**
	 * @private
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */

	var SingleTouchInput = /*#__PURE__*/function (_Input) {
	  _inheritsLoose(SingleTouchInput, _Input);

	  function SingleTouchInput() {
	    var _this;

	    var proto = SingleTouchInput.prototype;
	    proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    _this = _Input.apply(this, arguments) || this;
	    _this.started = false;
	    return _this;
	  }

	  var _proto = SingleTouchInput.prototype;

	  _proto.handler = function handler(ev) {
	    var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

	    if (type === INPUT_START) {
	      this.started = true;
	    }

	    if (!this.started) {
	      return;
	    }

	    var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

	    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	      this.started = false;
	    }

	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  };

	  return SingleTouchInput;
	}(Input);

	function normalizeSingleTouches(ev, type) {
	  var all = toArray$1(ev.touches);
	  var changed = toArray$1(ev.changedTouches);

	  if (type & (INPUT_END | INPUT_CANCEL)) {
	    all = uniqueArray(all.concat(changed), 'identifier', true);
	  }

	  return [all, changed];
	}
	/**
	 * @private
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */


	function deprecate(method, name, message) {
	  var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
	  return function () {
	    var e = new Error('get-stack-trace');
	    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
	    var log = window.console && (window.console.warn || window.console.log);

	    if (log) {
	      log.call(window.console, deprecationMessage, stack);
	    }

	    return method.apply(this, arguments);
	  };
	}
	/**
	 * @private
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */


	var extend$1 = deprecate(function (dest, src, merge) {
	  var keys = Object.keys(src);
	  var i = 0;

	  while (i < keys.length) {
	    if (!merge || merge && dest[keys[i]] === undefined) {
	      dest[keys[i]] = src[keys[i]];
	    }

	    i++;
	  }

	  return dest;
	}, 'extend', 'Use `assign`.');
	/**
	 * @private
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */

	var merge = deprecate(function (dest, src) {
	  return extend$1(dest, src, true);
	}, 'merge', 'Use `assign`.');
	/**
	 * @private
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */

	function inherit(child, base, properties) {
	  var baseP = base.prototype;
	  var childP;
	  childP = child.prototype = Object.create(baseP);
	  childP.constructor = child;
	  childP._super = baseP;

	  if (properties) {
	    assign$1$1(childP, properties);
	  }
	}
	/**
	 * @private
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */


	function bindFn(fn, context) {
	  return function boundFn() {
	    return fn.apply(context, arguments);
	  };
	}
	/**
	 * @private
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */


	var Hammer = /*#__PURE__*/function () {
	  var Hammer =
	  /**
	    * @private
	    * @const {string}
	    */
	  function Hammer(element, options) {
	    if (options === void 0) {
	      options = {};
	    }

	    return new Manager(element, _extends({
	      recognizers: preset.concat()
	    }, options));
	  };

	  Hammer.VERSION = "2.0.17-rc";
	  Hammer.DIRECTION_ALL = DIRECTION_ALL;
	  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
	  Hammer.DIRECTION_LEFT = DIRECTION_LEFT;
	  Hammer.DIRECTION_RIGHT = DIRECTION_RIGHT;
	  Hammer.DIRECTION_UP = DIRECTION_UP;
	  Hammer.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
	  Hammer.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
	  Hammer.DIRECTION_NONE = DIRECTION_NONE;
	  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
	  Hammer.INPUT_START = INPUT_START;
	  Hammer.INPUT_MOVE = INPUT_MOVE;
	  Hammer.INPUT_END = INPUT_END;
	  Hammer.INPUT_CANCEL = INPUT_CANCEL;
	  Hammer.STATE_POSSIBLE = STATE_POSSIBLE;
	  Hammer.STATE_BEGAN = STATE_BEGAN;
	  Hammer.STATE_CHANGED = STATE_CHANGED;
	  Hammer.STATE_ENDED = STATE_ENDED;
	  Hammer.STATE_RECOGNIZED = STATE_RECOGNIZED;
	  Hammer.STATE_CANCELLED = STATE_CANCELLED;
	  Hammer.STATE_FAILED = STATE_FAILED;
	  Hammer.Manager = Manager;
	  Hammer.Input = Input;
	  Hammer.TouchAction = TouchAction;
	  Hammer.TouchInput = TouchInput;
	  Hammer.MouseInput = MouseInput;
	  Hammer.PointerEventInput = PointerEventInput;
	  Hammer.TouchMouseInput = TouchMouseInput;
	  Hammer.SingleTouchInput = SingleTouchInput;
	  Hammer.Recognizer = Recognizer;
	  Hammer.AttrRecognizer = AttrRecognizer;
	  Hammer.Tap = TapRecognizer;
	  Hammer.Pan = PanRecognizer;
	  Hammer.Swipe = SwipeRecognizer;
	  Hammer.Pinch = PinchRecognizer;
	  Hammer.Rotate = RotateRecognizer;
	  Hammer.Press = PressRecognizer;
	  Hammer.on = addEventListeners;
	  Hammer.off = removeEventListeners;
	  Hammer.each = each;
	  Hammer.merge = merge;
	  Hammer.extend = extend$1;
	  Hammer.bindFn = bindFn;
	  Hammer.assign = assign$1$1;
	  Hammer.inherit = inherit;
	  Hammer.bindFn = bindFn;
	  Hammer.prefixed = prefixed;
	  Hammer.toArray = toArray$1;
	  Hammer.inArray = inArray;
	  Hammer.uniqueArray = uniqueArray;
	  Hammer.splitStr = splitStr;
	  Hammer.boolOrFn = boolOrFn;
	  Hammer.hasParent = hasParent$1;
	  Hammer.addEventListeners = addEventListeners;
	  Hammer.removeEventListeners = removeEventListeners;
	  Hammer.defaults = assign$1$1({}, defaults, {
	    preset: preset
	  });
	  return Hammer;
	}(); //  style loader but by script tag, not by the loader.

	/**
	 * Setup a mock hammer.js object, for unit testing.
	 *
	 * Inspiration: https://github.com/uber/deck.gl/pull/658
	 *
	 * @returns {{on: noop, off: noop, destroy: noop, emit: noop, get: get}}
	 */

	function hammerMock() {
	  var noop = function noop() {};

	  return {
	    on: noop,
	    off: noop,
	    destroy: noop,
	    emit: noop,
	    get: function get(m) {
	      //eslint-disable-line no-unused-vars
	      return {
	        set: noop
	      };
	    }
	  };
	}

	var modifiedHammer;

	if (typeof window !== 'undefined') {
	  var OurHammer = window['Hammer'] || Hammer;
	  modifiedHammer = propagating(OurHammer, {
	    preventDefault: 'mouse'
	  });
	} else {
	  modifiedHammer = function modifiedHammer() {
	    return (// hammer.js is only available in a browser, not in node.js. Replacing it with a mock object.
	      hammerMock()
	    );
	  };
	}

	var Hammer$1 = modifiedHammer;

	/**
	 * Register a touch event, taking place before a gesture
	 * @param {Hammer} hammer       A hammer instance
	 * @param {function} callback   Callback, called as callback(event)
	 */
	function onTouch(hammer, callback) {
	  callback.inputHandler = function (event) {
	    if (event.isFirst) {
	      callback(event);
	    }
	  };

	  hammer.on('hammer.input', callback.inputHandler);
	}
	/**
	 * Register a release event, taking place after a gesture
	 * @param {Hammer} hammer       A hammer instance
	 * @param {function} callback   Callback, called as callback(event)
	 * @returns {*}
	 */

	function onRelease(hammer, callback) {
	  callback.inputHandler = function (event) {
	    if (event.isFinal) {
	      callback(event);
	    }
	  };

	  return hammer.on('hammer.input', callback.inputHandler);
	}
	/**
	 * Hack the PinchRecognizer such that it doesn't prevent default behavior
	 * for vertical panning.
	 *
	 * Yeah ... this is quite a hack ... see https://github.com/hammerjs/hammer.js/issues/932
	 *
	 * @param {Hammer.Pinch} pinchRecognizer
	 * @return {Hammer.Pinch} returns the pinchRecognizer
	 */

	function disablePreventDefaultVertically(pinchRecognizer) {
	  var TOUCH_ACTION_PAN_Y = 'pan-y';

	  pinchRecognizer.getTouchAction = function () {
	    // default method returns [TOUCH_ACTION_NONE]
	    return [TOUCH_ACTION_PAN_Y];
	  };

	  return pinchRecognizer;
	}

	/**
	 * The class TimeStep is an iterator for dates. You provide a start date and an
	 * end date. The class itself determines the best scale (step size) based on the
	 * provided start Date, end Date, and minimumStep.
	 *
	 * If minimumStep is provided, the step size is chosen as close as possible
	 * to the minimumStep but larger than minimumStep. If minimumStep is not
	 * provided, the scale is set to 1 DAY.
	 * The minimumStep should correspond with the onscreen size of about 6 characters
	 *
	 * Alternatively, you can set a scale by hand.
	 * After creation, you can initialize the class by executing first(). Then you
	 * can iterate from the start date to the end date via next(). You can check if
	 * the end date is reached with the function hasNext(). After each step, you can
	 * retrieve the current date via getCurrent().
	 * The TimeStep has scales ranging from milliseconds, seconds, minutes, hours,
	 * days, to years.
	 *
	 * Version: 1.2
	 *
	 */

	var TimeStep = /*#__PURE__*/function () {
	  /**
	    * @param {Date} [start]         The start date, for example new Date(2010, 9, 21)
	    *                               or new Date(2010, 9, 21, 23, 45, 00)
	    * @param {Date} [end]           The end date
	    * @param {number} [minimumStep] Optional. Minimum step size in milliseconds
	    * @param {Date|Array.<Date>} [hiddenDates] Optional.
	    * @param {{showMajorLabels: boolean, showWeekScale: boolean}} [options] Optional.
	    * @constructor  TimeStep
	    */
	  function TimeStep(start, end, minimumStep, hiddenDates, options) {
	    classCallCheck(this, TimeStep);

	    this.moment = options && options.moment || moment;
	    this.options = options ? options : {}; // variables

	    this.current = this.moment();
	    this._start = this.moment();
	    this._end = this.moment();
	    this.autoScale = true;
	    this.scale = 'day';
	    this.step = 1; // initialize the range

	    this.setRange(start, end, minimumStep); // hidden Dates options

	    this.switchedDay = false;
	    this.switchedMonth = false;
	    this.switchedYear = false;

	    if (isArray$3(hiddenDates)) {
	      this.hiddenDates = hiddenDates;
	    } else if (hiddenDates != undefined) {
	      this.hiddenDates = [hiddenDates];
	    } else {
	      this.hiddenDates = [];
	    }

	    this.format = TimeStep.FORMAT; // default formatting
	  }
	  /**
	   * Set custom constructor function for moment. Can be used to set dates
	   * to UTC or to set a utcOffset.
	   * @param {function} moment
	   */


	  createClass(TimeStep, [{
	    key: "setMoment",
	    value: function setMoment(moment) {
	      this.moment = moment; // update the date properties, can have a new utcOffset

	      this.current = this.moment(this.current.valueOf());
	      this._start = this.moment(this._start.valueOf());
	      this._end = this.moment(this._end.valueOf());
	    }
	    /**
	     * Set custom formatting for the minor an major labels of the TimeStep.
	     * Both `minorLabels` and `majorLabels` are an Object with properties:
	     * 'millisecond', 'second', 'minute', 'hour', 'weekday', 'day', 'week', 'month', 'year'.
	     * @param {{minorLabels: Object, majorLabels: Object}} format
	     */

	  }, {
	    key: "setFormat",
	    value: function setFormat(format) {
	      var defaultFormat = util$1.deepExtend({}, TimeStep.FORMAT);
	      this.format = util$1.deepExtend(defaultFormat, format);
	    }
	    /**
	     * Set a new range
	     * If minimumStep is provided, the step size is chosen as close as possible
	     * to the minimumStep but larger than minimumStep. If minimumStep is not
	     * provided, the scale is set to 1 DAY.
	     * The minimumStep should correspond with the onscreen size of about 6 characters
	     * @param {Date} [start]      The start date and time.
	     * @param {Date} [end]        The end date and time.
	     * @param {int} [minimumStep] Optional. Minimum step size in milliseconds
	     */

	  }, {
	    key: "setRange",
	    value: function setRange(start, end, minimumStep) {
	      if (!(start instanceof Date) || !(end instanceof Date)) {
	        throw "No legal start or end date in method setRange";
	      }

	      this._start = start != undefined ? this.moment(start.valueOf()) : now$2();
	      this._end = end != undefined ? this.moment(end.valueOf()) : now$2();

	      if (this.autoScale) {
	        this.setMinimumStep(minimumStep);
	      }
	    }
	    /**
	     * Set the range iterator to the start date.
	     */

	  }, {
	    key: "start",
	    value: function start() {
	      this.current = this._start.clone();
	      this.roundToMinor();
	    }
	    /**
	     * Round the current date to the first minor date value
	     * This must be executed once when the current date is set to start Date
	     */

	  }, {
	    key: "roundToMinor",
	    value: function roundToMinor() {
	      // round to floor
	      // to prevent year & month scales rounding down to the first day of week we perform this separately
	      if (this.scale == 'week') {
	        this.current.weekday(0);
	      } // IMPORTANT: we have no breaks in this switch! (this is no bug)
	      // noinspection FallThroughInSwitchStatementJS


	      switch (this.scale) {
	        case 'year':
	          this.current.year(this.step * Math.floor(this.current.year() / this.step));
	          this.current.month(0);

	        case 'month':
	          this.current.date(1);
	        // eslint-disable-line no-fallthrough

	        case 'week': // eslint-disable-line no-fallthrough

	        case 'day': // eslint-disable-line no-fallthrough

	        case 'weekday':
	          this.current.hours(0);
	        // eslint-disable-line no-fallthrough

	        case 'hour':
	          this.current.minutes(0);
	        // eslint-disable-line no-fallthrough

	        case 'minute':
	          this.current.seconds(0);
	        // eslint-disable-line no-fallthrough

	        case 'second':
	          this.current.milliseconds(0);
	        // eslint-disable-line no-fallthrough
	        //case 'millisecond': // nothing to do for milliseconds
	      }

	      if (this.step != 1) {
	        // round down to the first minor value that is a multiple of the current step size
	        var priorCurrent = this.current.clone();

	        switch (this.scale) {
	          case 'millisecond':
	            this.current.subtract(this.current.milliseconds() % this.step, 'milliseconds');
	            break;

	          case 'second':
	            this.current.subtract(this.current.seconds() % this.step, 'seconds');
	            break;

	          case 'minute':
	            this.current.subtract(this.current.minutes() % this.step, 'minutes');
	            break;

	          case 'hour':
	            this.current.subtract(this.current.hours() % this.step, 'hours');
	            break;

	          case 'weekday': // intentional fall through

	          case 'day':
	            this.current.subtract((this.current.date() - 1) % this.step, 'day');
	            break;

	          case 'week':
	            this.current.subtract(this.current.week() % this.step, 'week');
	            break;

	          case 'month':
	            this.current.subtract(this.current.month() % this.step, 'month');
	            break;

	          case 'year':
	            this.current.subtract(this.current.year() % this.step, 'year');
	            break;
	        }

	        if (!priorCurrent.isSame(this.current)) {
	          this.current = this.moment(snapAwayFromHidden(this.hiddenDates, this.current.valueOf(), -1, true));
	        }
	      }
	    }
	    /**
	     * Check if the there is a next step
	     * @return {boolean}  true if the current date has not passed the end date
	     */

	  }, {
	    key: "hasNext",
	    value: function hasNext() {
	      return this.current.valueOf() <= this._end.valueOf();
	    }
	    /**
	     * Do the next step
	     */

	  }, {
	    key: "next",
	    value: function next() {
	      var prev = this.current.valueOf(); // Two cases, needed to prevent issues with switching daylight savings
	      // (end of March and end of October)

	      switch (this.scale) {
	        case 'millisecond':
	          this.current.add(this.step, 'millisecond');
	          break;

	        case 'second':
	          this.current.add(this.step, 'second');
	          break;

	        case 'minute':
	          this.current.add(this.step, 'minute');
	          break;

	        case 'hour':
	          this.current.add(this.step, 'hour');

	          if (this.current.month() < 6) {
	            this.current.subtract(this.current.hours() % this.step, 'hour');
	          } else {
	            if (this.current.hours() % this.step !== 0) {
	              this.current.add(this.step - this.current.hours() % this.step, 'hour');
	            }
	          }

	          break;

	        case 'weekday': // intentional fall through

	        case 'day':
	          this.current.add(this.step, 'day');
	          break;

	        case 'week':
	          if (this.current.weekday() !== 0) {
	            // we had a month break not correlating with a week's start before
	            this.current.weekday(0); // switch back to week cycles

	            this.current.add(this.step, 'week');
	          } else if (this.options.showMajorLabels === false) {
	            this.current.add(this.step, 'week'); // the default case
	          } else {
	            // first day of the week
	            var nextWeek = this.current.clone();
	            nextWeek.add(1, 'week');

	            if (nextWeek.isSame(this.current, 'month')) {
	              // is the first day of the next week in the same month?
	              this.current.add(this.step, 'week'); // the default case
	            } else {
	              // inject a step at each first day of the month
	              this.current.add(this.step, 'week');
	              this.current.date(1);
	            }
	          }

	          break;

	        case 'month':
	          this.current.add(this.step, 'month');
	          break;

	        case 'year':
	          this.current.add(this.step, 'year');
	          break;
	      }

	      if (this.step != 1) {
	        // round down to the correct major value
	        switch (this.scale) {
	          case 'millisecond':
	            if (this.current.milliseconds() > 0 && this.current.milliseconds() < this.step) this.current.milliseconds(0);
	            break;

	          case 'second':
	            if (this.current.seconds() > 0 && this.current.seconds() < this.step) this.current.seconds(0);
	            break;

	          case 'minute':
	            if (this.current.minutes() > 0 && this.current.minutes() < this.step) this.current.minutes(0);
	            break;

	          case 'hour':
	            if (this.current.hours() > 0 && this.current.hours() < this.step) this.current.hours(0);
	            break;

	          case 'weekday': // intentional fall through

	          case 'day':
	            if (this.current.date() < this.step + 1) this.current.date(1);
	            break;

	          case 'week':
	            if (this.current.week() < this.step) this.current.week(1);
	            break;
	          // week numbering starts at 1, not 0

	          case 'month':
	            if (this.current.month() < this.step) this.current.month(0);
	            break;
	        }
	      } // safety mechanism: if current time is still unchanged, move to the end


	      if (this.current.valueOf() == prev) {
	        this.current = this._end.clone();
	      } // Reset switches for year, month and day. Will get set to true where appropriate in DateUtil.stepOverHiddenDates


	      this.switchedDay = false;
	      this.switchedMonth = false;
	      this.switchedYear = false;
	      stepOverHiddenDates(this.moment, this, prev);
	    }
	    /**
	     * Get the current datetime
	     * @return {Moment}  current The current date
	     */

	  }, {
	    key: "getCurrent",
	    value: function getCurrent() {
	      return this.current.clone();
	    }
	    /**
	     * Set a custom scale. Autoscaling will be disabled.
	     * For example setScale('minute', 5) will result
	     * in minor steps of 5 minutes, and major steps of an hour.
	     *
	     * @param {{scale: string, step: number}} params
	     *                               An object containing two properties:
	     *                               - A string 'scale'. Choose from 'millisecond', 'second',
	     *                                 'minute', 'hour', 'weekday', 'day', 'week', 'month', 'year'.
	     *                               - A number 'step'. A step size, by default 1.
	     *                                 Choose for example 1, 2, 5, or 10.
	     */

	  }, {
	    key: "setScale",
	    value: function setScale(params) {
	      if (params && typeof params.scale == 'string') {
	        this.scale = params.scale;
	        this.step = params.step > 0 ? params.step : 1;
	        this.autoScale = false;
	      }
	    }
	    /**
	     * Enable or disable autoscaling
	     * @param {boolean} enable  If true, autoascaling is set true
	     */

	  }, {
	    key: "setAutoScale",
	    value: function setAutoScale(enable) {
	      this.autoScale = enable;
	    }
	    /**
	     * Automatically determine the scale that bests fits the provided minimum step
	     * @param {number} [minimumStep]  The minimum step size in milliseconds
	     */

	  }, {
	    key: "setMinimumStep",
	    value: function setMinimumStep(minimumStep) {
	      if (minimumStep == undefined) {
	        return;
	      } //var b = asc + ds;


	      var stepYear = 1000 * 60 * 60 * 24 * 30 * 12;
	      var stepMonth = 1000 * 60 * 60 * 24 * 30;
	      var stepDay = 1000 * 60 * 60 * 24;
	      var stepHour = 1000 * 60 * 60;
	      var stepMinute = 1000 * 60;
	      var stepSecond = 1000;
	      var stepMillisecond = 1; // find the smallest step that is larger than the provided minimumStep

	      if (stepYear * 1000 > minimumStep) {
	        this.scale = 'year';
	        this.step = 1000;
	      }

	      if (stepYear * 500 > minimumStep) {
	        this.scale = 'year';
	        this.step = 500;
	      }

	      if (stepYear * 100 > minimumStep) {
	        this.scale = 'year';
	        this.step = 100;
	      }

	      if (stepYear * 50 > minimumStep) {
	        this.scale = 'year';
	        this.step = 50;
	      }

	      if (stepYear * 10 > minimumStep) {
	        this.scale = 'year';
	        this.step = 10;
	      }

	      if (stepYear * 5 > minimumStep) {
	        this.scale = 'year';
	        this.step = 5;
	      }

	      if (stepYear > minimumStep) {
	        this.scale = 'year';
	        this.step = 1;
	      }

	      if (stepMonth * 3 > minimumStep) {
	        this.scale = 'month';
	        this.step = 3;
	      }

	      if (stepMonth > minimumStep) {
	        this.scale = 'month';
	        this.step = 1;
	      }

	      if (stepDay * 7 > minimumStep && this.options.showWeekScale) {
	        this.scale = 'week';
	        this.step = 1;
	      }

	      if (stepDay * 2 > minimumStep) {
	        this.scale = 'day';
	        this.step = 2;
	      }

	      if (stepDay > minimumStep) {
	        this.scale = 'day';
	        this.step = 1;
	      }

	      if (stepDay / 2 > minimumStep) {
	        this.scale = 'weekday';
	        this.step = 1;
	      }

	      if (stepHour * 4 > minimumStep) {
	        this.scale = 'hour';
	        this.step = 4;
	      }

	      if (stepHour > minimumStep) {
	        this.scale = 'hour';
	        this.step = 1;
	      }

	      if (stepMinute * 15 > minimumStep) {
	        this.scale = 'minute';
	        this.step = 15;
	      }

	      if (stepMinute * 10 > minimumStep) {
	        this.scale = 'minute';
	        this.step = 10;
	      }

	      if (stepMinute * 5 > minimumStep) {
	        this.scale = 'minute';
	        this.step = 5;
	      }

	      if (stepMinute > minimumStep) {
	        this.scale = 'minute';
	        this.step = 1;
	      }

	      if (stepSecond * 15 > minimumStep) {
	        this.scale = 'second';
	        this.step = 15;
	      }

	      if (stepSecond * 10 > minimumStep) {
	        this.scale = 'second';
	        this.step = 10;
	      }

	      if (stepSecond * 5 > minimumStep) {
	        this.scale = 'second';
	        this.step = 5;
	      }

	      if (stepSecond > minimumStep) {
	        this.scale = 'second';
	        this.step = 1;
	      }

	      if (stepMillisecond * 200 > minimumStep) {
	        this.scale = 'millisecond';
	        this.step = 200;
	      }

	      if (stepMillisecond * 100 > minimumStep) {
	        this.scale = 'millisecond';
	        this.step = 100;
	      }

	      if (stepMillisecond * 50 > minimumStep) {
	        this.scale = 'millisecond';
	        this.step = 50;
	      }

	      if (stepMillisecond * 10 > minimumStep) {
	        this.scale = 'millisecond';
	        this.step = 10;
	      }

	      if (stepMillisecond * 5 > minimumStep) {
	        this.scale = 'millisecond';
	        this.step = 5;
	      }

	      if (stepMillisecond > minimumStep) {
	        this.scale = 'millisecond';
	        this.step = 1;
	      }
	    }
	    /**
	     * Snap a date to a rounded value.
	     * The snap intervals are dependent on the current scale and step.
	     * Static function
	     * @param {Date} date    the date to be snapped.
	     * @param {string} scale Current scale, can be 'millisecond', 'second',
	     *                       'minute', 'hour', 'weekday, 'day', 'week', 'month', 'year'.
	     * @param {number} step  Current step (1, 2, 4, 5, ...
	     * @return {Date} snappedDate
	     */

	  }, {
	    key: "isMajor",

	    /**
	     * Check if the current value is a major value (for example when the step
	     * is DAY, a major value is each first day of the MONTH)
	     * @return {boolean} true if current date is major, else false.
	     */
	    value: function isMajor() {
	      if (this.switchedYear == true) {
	        switch (this.scale) {
	          case 'year':
	          case 'month':
	          case 'week':
	          case 'weekday':
	          case 'day':
	          case 'hour':
	          case 'minute':
	          case 'second':
	          case 'millisecond':
	            return true;

	          default:
	            return false;
	        }
	      } else if (this.switchedMonth == true) {
	        switch (this.scale) {
	          case 'week':
	          case 'weekday':
	          case 'day':
	          case 'hour':
	          case 'minute':
	          case 'second':
	          case 'millisecond':
	            return true;

	          default:
	            return false;
	        }
	      } else if (this.switchedDay == true) {
	        switch (this.scale) {
	          case 'millisecond':
	          case 'second':
	          case 'minute':
	          case 'hour':
	            return true;

	          default:
	            return false;
	        }
	      }

	      var date = this.moment(this.current);

	      switch (this.scale) {
	        case 'millisecond':
	          return date.milliseconds() == 0;

	        case 'second':
	          return date.seconds() == 0;

	        case 'minute':
	          return date.hours() == 0 && date.minutes() == 0;

	        case 'hour':
	          return date.hours() == 0;

	        case 'weekday': // intentional fall through

	        case 'day':
	          return date.date() == 1;

	        case 'week':
	          return date.date() == 1;

	        case 'month':
	          return date.month() == 0;

	        case 'year':
	          return false;

	        default:
	          return false;
	      }
	    }
	    /**
	     * Returns formatted text for the minor axislabel, depending on the current
	     * date and the scale. For example when scale is MINUTE, the current time is
	     * formatted as "hh:mm".
	     * @param {Date} [date=this.current] custom date. if not provided, current date is taken
	     * @returns {String}
	     */

	  }, {
	    key: "getLabelMinor",
	    value: function getLabelMinor(date) {
	      if (date == undefined) {
	        date = this.current;
	      }

	      if (date instanceof Date) {
	        date = this.moment(date);
	      }

	      if (typeof this.format.minorLabels === "function") {
	        return this.format.minorLabels(date, this.scale, this.step);
	      }

	      var format = this.format.minorLabels[this.scale]; // noinspection FallThroughInSwitchStatementJS

	      switch (this.scale) {
	        case 'week':
	          // Don't draw the minor label if this date is the first day of a month AND if it's NOT the start of the week.
	          // The 'date' variable may actually be the 'next' step when called from TimeAxis' _repaintLabels.
	          if (date.date() === 1 && date.weekday() !== 0) {
	            return "";
	          }

	        default:
	          // eslint-disable-line no-fallthrough
	          return format && format.length > 0 ? this.moment(date).format(format) : '';
	      }
	    }
	    /**
	     * Returns formatted text for the major axis label, depending on the current
	     * date and the scale. For example when scale is MINUTE, the major scale is
	     * hours, and the hour will be formatted as "hh".
	     * @param {Date} [date=this.current] custom date. if not provided, current date is taken
	     * @returns {String}
	     */

	  }, {
	    key: "getLabelMajor",
	    value: function getLabelMajor(date) {
	      if (date == undefined) {
	        date = this.current;
	      }

	      if (date instanceof Date) {
	        date = this.moment(date);
	      }

	      if (typeof this.format.majorLabels === "function") {
	        return this.format.majorLabels(date, this.scale, this.step);
	      }

	      var format = this.format.majorLabels[this.scale];
	      return format && format.length > 0 ? this.moment(date).format(format) : '';
	    }
	    /**
	     * get class name
	     * @return {string} class name
	     */

	  }, {
	    key: "getClassName",
	    value: function getClassName() {
	      var _context;

	      var _moment = this.moment;
	      var m = this.moment(this.current);
	      var current = m.locale ? m.locale('en') : m.lang('en'); // old versions of moment have .lang() function

	      var step = this.step;
	      var classNames = [];
	      /**
	       *
	       * @param {number} value
	       * @returns {String}
	       */

	      function even(value) {
	        return value / step % 2 == 0 ? ' vis-even' : ' vis-odd';
	      }
	      /**
	       *
	       * @param {Date} date
	       * @returns {String}
	       */


	      function today(date) {
	        if (date.isSame(now$2(), 'day')) {
	          return ' vis-today';
	        }

	        if (date.isSame(_moment().add(1, 'day'), 'day')) {
	          return ' vis-tomorrow';
	        }

	        if (date.isSame(_moment().add(-1, 'day'), 'day')) {
	          return ' vis-yesterday';
	        }

	        return '';
	      }
	      /**
	       *
	       * @param {Date} date
	       * @returns {String}
	       */


	      function currentWeek(date) {
	        return date.isSame(now$2(), 'week') ? ' vis-current-week' : '';
	      }
	      /**
	       *
	       * @param {Date} date
	       * @returns {String}
	       */


	      function currentMonth(date) {
	        return date.isSame(now$2(), 'month') ? ' vis-current-month' : '';
	      }
	      /**
	       *
	       * @param {Date} date
	       * @returns {String}
	       */


	      function currentYear(date) {
	        return date.isSame(now$2(), 'year') ? ' vis-current-year' : '';
	      }

	      switch (this.scale) {
	        case 'millisecond':
	          classNames.push(today(current));
	          classNames.push(even(current.milliseconds()));
	          break;

	        case 'second':
	          classNames.push(today(current));
	          classNames.push(even(current.seconds()));
	          break;

	        case 'minute':
	          classNames.push(today(current));
	          classNames.push(even(current.minutes()));
	          break;

	        case 'hour':
	          classNames.push(concat$2(_context = "vis-h".concat(current.hours())).call(_context, this.step == 4 ? '-h' + (current.hours() + 4) : ''));
	          classNames.push(today(current));
	          classNames.push(even(current.hours()));
	          break;

	        case 'weekday':
	          classNames.push("vis-".concat(current.format('dddd').toLowerCase()));
	          classNames.push(today(current));
	          classNames.push(currentWeek(current));
	          classNames.push(even(current.date()));
	          break;

	        case 'day':
	          classNames.push("vis-day".concat(current.date()));
	          classNames.push("vis-".concat(current.format('MMMM').toLowerCase()));
	          classNames.push(today(current));
	          classNames.push(currentMonth(current));
	          classNames.push(this.step <= 2 ? today(current) : '');
	          classNames.push(this.step <= 2 ? "vis-".concat(current.format('dddd').toLowerCase()) : '');
	          classNames.push(even(current.date() - 1));
	          break;

	        case 'week':
	          classNames.push("vis-week".concat(current.format('w')));
	          classNames.push(currentWeek(current));
	          classNames.push(even(current.week()));
	          break;

	        case 'month':
	          classNames.push("vis-".concat(current.format('MMMM').toLowerCase()));
	          classNames.push(currentMonth(current));
	          classNames.push(even(current.month()));
	          break;

	        case 'year':
	          classNames.push("vis-year".concat(current.year()));
	          classNames.push(currentYear(current));
	          classNames.push(even(current.year()));
	          break;
	      }

	      return filter$2(classNames).call(classNames, String).join(" ");
	    }
	  }], [{
	    key: "snap",
	    value: function snap(date, scale, step) {
	      var clone = moment(date);

	      if (scale == 'year') {
	        var year = clone.year() + Math.round(clone.month() / 12);
	        clone.year(Math.round(year / step) * step);
	        clone.month(0);
	        clone.date(0);
	        clone.hours(0);
	        clone.minutes(0);
	        clone.seconds(0);
	        clone.milliseconds(0);
	      } else if (scale == 'month') {
	        if (clone.date() > 15) {
	          clone.date(1);
	          clone.add(1, 'month'); // important: first set Date to 1, after that change the month.
	        } else {
	          clone.date(1);
	        }

	        clone.hours(0);
	        clone.minutes(0);
	        clone.seconds(0);
	        clone.milliseconds(0);
	      } else if (scale == 'week') {
	        if (clone.weekday() > 2) {
	          // doing it the momentjs locale aware way
	          clone.weekday(0);
	          clone.add(1, 'week');
	        } else {
	          clone.weekday(0);
	        }

	        clone.hours(0);
	        clone.minutes(0);
	        clone.seconds(0);
	        clone.milliseconds(0);
	      } else if (scale == 'day') {
	        //noinspection FallthroughInSwitchStatementJS
	        switch (step) {
	          case 5:
	          case 2:
	            clone.hours(Math.round(clone.hours() / 24) * 24);
	            break;

	          default:
	            clone.hours(Math.round(clone.hours() / 12) * 12);
	            break;
	        }

	        clone.minutes(0);
	        clone.seconds(0);
	        clone.milliseconds(0);
	      } else if (scale == 'weekday') {
	        //noinspection FallthroughInSwitchStatementJS
	        switch (step) {
	          case 5:
	          case 2:
	            clone.hours(Math.round(clone.hours() / 12) * 12);
	            break;

	          default:
	            clone.hours(Math.round(clone.hours() / 6) * 6);
	            break;
	        }

	        clone.minutes(0);
	        clone.seconds(0);
	        clone.milliseconds(0);
	      } else if (scale == 'hour') {
	        switch (step) {
	          case 4:
	            clone.minutes(Math.round(clone.minutes() / 60) * 60);
	            break;

	          default:
	            clone.minutes(Math.round(clone.minutes() / 30) * 30);
	            break;
	        }

	        clone.seconds(0);
	        clone.milliseconds(0);
	      } else if (scale == 'minute') {
	        //noinspection FallthroughInSwitchStatementJS
	        switch (step) {
	          case 15:
	          case 10:
	            clone.minutes(Math.round(clone.minutes() / 5) * 5);
	            clone.seconds(0);
	            break;

	          case 5:
	            clone.seconds(Math.round(clone.seconds() / 60) * 60);
	            break;

	          default:
	            clone.seconds(Math.round(clone.seconds() / 30) * 30);
	            break;
	        }

	        clone.milliseconds(0);
	      } else if (scale == 'second') {
	        //noinspection FallthroughInSwitchStatementJS
	        switch (step) {
	          case 15:
	          case 10:
	            clone.seconds(Math.round(clone.seconds() / 5) * 5);
	            clone.milliseconds(0);
	            break;

	          case 5:
	            clone.milliseconds(Math.round(clone.milliseconds() / 1000) * 1000);
	            break;

	          default:
	            clone.milliseconds(Math.round(clone.milliseconds() / 500) * 500);
	            break;
	        }
	      } else if (scale == 'millisecond') {
	        var _step = step > 5 ? step / 2 : 1;

	        clone.milliseconds(Math.round(clone.milliseconds() / _step) * _step);
	      }

	      return clone;
	    }
	  }]);

	  return TimeStep;
	}(); // Time formatting


	TimeStep.FORMAT = {
	  minorLabels: {
	    millisecond: 'SSS',
	    second: 's',
	    minute: 'HH:mm',
	    hour: 'HH:mm',
	    weekday: 'ddd D',
	    day: 'D',
	    week: 'w',
	    month: 'MMM',
	    year: 'YYYY'
	  },
	  majorLabels: {
	    millisecond: 'HH:mm:ss',
	    second: 'D MMMM HH:mm',
	    minute: 'ddd D MMMM',
	    hour: 'ddd D MMMM',
	    weekday: 'MMMM YYYY',
	    day: 'MMMM YYYY',
	    week: 'MMMM YYYY',
	    month: 'YYYY',
	    year: ''
	  }
	};

	function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/** A horizontal time axis */

	var TimeAxis = /*#__PURE__*/function (_Component) {
	  inherits(TimeAxis, _Component);

	  var _super = _createSuper$1(TimeAxis);

	  /**
	   * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} body
	   * @param {Object} [options]        See TimeAxis.setOptions for the available
	   *                                  options.
	   * @constructor TimeAxis
	   * @extends Component
	   */
	  function TimeAxis(body, options) {
	    var _this;

	    classCallCheck(this, TimeAxis);

	    _this = _super.call(this);
	    _this.dom = {
	      foreground: null,
	      lines: [],
	      majorTexts: [],
	      minorTexts: [],
	      redundant: {
	        lines: [],
	        majorTexts: [],
	        minorTexts: []
	      }
	    };
	    _this.props = {
	      range: {
	        start: 0,
	        end: 0,
	        minimumStep: 0
	      },
	      lineTop: 0
	    };
	    _this.defaultOptions = {
	      orientation: {
	        axis: 'bottom'
	      },
	      // axis orientation: 'top' or 'bottom'
	      showMinorLabels: true,
	      showMajorLabels: true,
	      showWeekScale: false,
	      maxMinorChars: 7,
	      format: util$1.extend({}, TimeStep.FORMAT),
	      moment: moment,
	      timeAxis: null
	    };
	    _this.options = util$1.extend({}, _this.defaultOptions);
	    _this.body = body; // create the HTML DOM

	    _this._create();

	    _this.setOptions(options);

	    return _this;
	  }
	  /**
	   * Set options for the TimeAxis.
	   * Parameters will be merged in current options.
	   * @param {Object} options  Available options:
	   *                          {string} [orientation.axis]
	   *                          {boolean} [showMinorLabels]
	   *                          {boolean} [showMajorLabels]
	   *                          {boolean} [showWeekScale]
	   */


	  createClass(TimeAxis, [{
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options) {
	        // copy all options that we know
	        util$1.selectiveExtend(['showMinorLabels', 'showMajorLabels', 'showWeekScale', 'maxMinorChars', 'hiddenDates', 'timeAxis', 'moment', 'rtl'], this.options, options); // deep copy the format options

	        util$1.selectiveDeepExtend(['format'], this.options, options);

	        if ('orientation' in options) {
	          if (typeof options.orientation === 'string') {
	            this.options.orientation.axis = options.orientation;
	          } else if (_typeof_1(options.orientation) === 'object' && 'axis' in options.orientation) {
	            this.options.orientation.axis = options.orientation.axis;
	          }
	        } // apply locale to moment.js
	        // TODO: not so nice, this is applied globally to moment.js


	        if ('locale' in options) {
	          if (typeof moment.locale === 'function') {
	            // moment.js 2.8.1+
	            moment.locale(options.locale);
	          } else {
	            moment.lang(options.locale);
	          }
	        }
	      }
	    }
	    /**
	     * Create the HTML DOM for the TimeAxis
	     */

	  }, {
	    key: "_create",
	    value: function _create() {
	      this.dom.foreground = document.createElement('div');
	      this.dom.background = document.createElement('div');
	      this.dom.foreground.className = 'vis-time-axis vis-foreground';
	      this.dom.background.className = 'vis-time-axis vis-background';
	    }
	    /**
	     * Destroy the TimeAxis
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      // remove from DOM
	      if (this.dom.foreground.parentNode) {
	        this.dom.foreground.parentNode.removeChild(this.dom.foreground);
	      }

	      if (this.dom.background.parentNode) {
	        this.dom.background.parentNode.removeChild(this.dom.background);
	      }

	      this.body = null;
	    }
	    /**
	     * Repaint the component
	     * @return {boolean} Returns true if the component is resized
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      var props = this.props;
	      var foreground = this.dom.foreground;
	      var background = this.dom.background; // determine the correct parent DOM element (depending on option orientation)

	      var parent = this.options.orientation.axis == 'top' ? this.body.dom.top : this.body.dom.bottom;
	      var parentChanged = foreground.parentNode !== parent; // calculate character width and height

	      this._calculateCharSize(); // TODO: recalculate sizes only needed when parent is resized or options is changed


	      var showMinorLabels = this.options.showMinorLabels && this.options.orientation.axis !== 'none';
	      var showMajorLabels = this.options.showMajorLabels && this.options.orientation.axis !== 'none'; // determine the width and height of the elemens for the axis

	      props.minorLabelHeight = showMinorLabels ? props.minorCharHeight : 0;
	      props.majorLabelHeight = showMajorLabels ? props.majorCharHeight : 0;
	      props.height = props.minorLabelHeight + props.majorLabelHeight;
	      props.width = foreground.offsetWidth;
	      props.minorLineHeight = this.body.domProps.root.height - props.majorLabelHeight - (this.options.orientation.axis == 'top' ? this.body.domProps.bottom.height : this.body.domProps.top.height);
	      props.minorLineWidth = 1; // TODO: really calculate width

	      props.majorLineHeight = props.minorLineHeight + props.majorLabelHeight;
	      props.majorLineWidth = 1; // TODO: really calculate width
	      //  take foreground and background offline while updating (is almost twice as fast)

	      var foregroundNextSibling = foreground.nextSibling;
	      var backgroundNextSibling = background.nextSibling;
	      foreground.parentNode && foreground.parentNode.removeChild(foreground);
	      background.parentNode && background.parentNode.removeChild(background);
	      foreground.style.height = "".concat(this.props.height, "px");

	      this._repaintLabels(); // put DOM online again (at the same place)


	      if (foregroundNextSibling) {
	        parent.insertBefore(foreground, foregroundNextSibling);
	      } else {
	        parent.appendChild(foreground);
	      }

	      if (backgroundNextSibling) {
	        this.body.dom.backgroundVertical.insertBefore(background, backgroundNextSibling);
	      } else {
	        this.body.dom.backgroundVertical.appendChild(background);
	      }

	      return this._isResized() || parentChanged;
	    }
	    /**
	     * Repaint major and minor text labels and vertical grid lines
	     * @private
	     */

	  }, {
	    key: "_repaintLabels",
	    value: function _repaintLabels() {
	      var orientation = this.options.orientation.axis; // calculate range and step (step such that we have space for 7 characters per label)

	      var start = util$1.convert(this.body.range.start, 'Number');
	      var end = util$1.convert(this.body.range.end, 'Number');
	      var timeLabelsize = this.body.util.toTime((this.props.minorCharWidth || 10) * this.options.maxMinorChars).valueOf();
	      var minimumStep = timeLabelsize - getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this.body.range, timeLabelsize);
	      minimumStep -= this.body.util.toTime(0).valueOf();
	      var step = new TimeStep(new Date(start), new Date(end), minimumStep, this.body.hiddenDates, this.options);
	      step.setMoment(this.options.moment);

	      if (this.options.format) {
	        step.setFormat(this.options.format);
	      }

	      if (this.options.timeAxis) {
	        step.setScale(this.options.timeAxis);
	      }

	      this.step = step; // Move all DOM elements to a "redundant" list, where they
	      // can be picked for re-use, and clear the lists with lines and texts.
	      // At the end of the function _repaintLabels, left over elements will be cleaned up

	      var dom = this.dom;
	      dom.redundant.lines = dom.lines;
	      dom.redundant.majorTexts = dom.majorTexts;
	      dom.redundant.minorTexts = dom.minorTexts;
	      dom.lines = [];
	      dom.majorTexts = [];
	      dom.minorTexts = [];
	      var current;
	      var next;
	      var x;
	      var xNext;
	      var isMajor;
	      var showMinorGrid;
	      var width = 0;
	      var prevWidth;
	      var line;
	      var xFirstMajorLabel = undefined;
	      var count = 0;
	      var MAX = 1000;
	      var className;
	      step.start();
	      next = step.getCurrent();
	      xNext = this.body.util.toScreen(next);

	      while (step.hasNext() && count < MAX) {
	        count++;
	        isMajor = step.isMajor();
	        className = step.getClassName();
	        current = next;
	        x = xNext;
	        step.next();
	        next = step.getCurrent();
	        xNext = this.body.util.toScreen(next);
	        prevWidth = width;
	        width = xNext - x;

	        switch (step.scale) {
	          case 'week':
	            showMinorGrid = true;
	            break;

	          default:
	            showMinorGrid = width >= prevWidth * 0.4;
	            break;
	          // prevent displaying of the 31th of the month on a scale of 5 days
	        }

	        if (this.options.showMinorLabels && showMinorGrid) {
	          var label = this._repaintMinorText(x, step.getLabelMinor(current), orientation, className);

	          label.style.width = "".concat(width, "px"); // set width to prevent overflow
	        }

	        if (isMajor && this.options.showMajorLabels) {
	          if (x > 0) {
	            if (xFirstMajorLabel == undefined) {
	              xFirstMajorLabel = x;
	            }

	            label = this._repaintMajorText(x, step.getLabelMajor(current), orientation, className);
	          }

	          line = this._repaintMajorLine(x, width, orientation, className);
	        } else {
	          // minor line
	          if (showMinorGrid) {
	            line = this._repaintMinorLine(x, width, orientation, className);
	          } else {
	            if (line) {
	              // adjust the width of the previous grid
	              line.style.width = "".concat(_parseInt$2(line.style.width) + width, "px");
	            }
	          }
	        }
	      }

	      if (count === MAX && !warnedForOverflow) {
	        console.warn("Something is wrong with the Timeline scale. Limited drawing of grid lines to ".concat(MAX, " lines."));
	        warnedForOverflow = true;
	      } // create a major label on the left when needed


	      if (this.options.showMajorLabels) {
	        var leftTime = this.body.util.toTime(0); // upper bound estimation

	        var leftText = step.getLabelMajor(leftTime);
	        var widthText = leftText.length * (this.props.majorCharWidth || 10) + 10;

	        if (xFirstMajorLabel == undefined || widthText < xFirstMajorLabel) {
	          this._repaintMajorText(0, leftText, orientation, className);
	        }
	      } // Cleanup leftover DOM elements from the redundant list


	      forEach$2(util$1).call(util$1, this.dom.redundant, function (arr) {
	        while (arr.length) {
	          var elem = arr.pop();

	          if (elem && elem.parentNode) {
	            elem.parentNode.removeChild(elem);
	          }
	        }
	      });
	    }
	    /**
	     * Create a minor label for the axis at position x
	     * @param {number} x
	     * @param {string} text
	     * @param {string} orientation   "top" or "bottom" (default)
	     * @param {string} className
	     * @return {Element} Returns the HTML element of the created label
	     * @private
	     */

	  }, {
	    key: "_repaintMinorText",
	    value: function _repaintMinorText(x, text, orientation, className) {
	      // reuse redundant label
	      var label = this.dom.redundant.minorTexts.shift();

	      if (!label) {
	        // create new label
	        var content = document.createTextNode('');
	        label = document.createElement('div');
	        label.appendChild(content);
	        this.dom.foreground.appendChild(label);
	      }

	      this.dom.minorTexts.push(label);
	      label.innerHTML = text;
	      var y = orientation == 'top' ? this.props.majorLabelHeight : 0;

	      this._setXY(label, x, y);

	      label.className = "vis-text vis-minor ".concat(className); //label.title = title;  // TODO: this is a heavy operation

	      return label;
	    }
	    /**
	     * Create a Major label for the axis at position x
	     * @param {number} x
	     * @param {string} text
	     * @param {string} orientation   "top" or "bottom" (default)
	     * @param {string} className
	     * @return {Element} Returns the HTML element of the created label
	     * @private
	     */

	  }, {
	    key: "_repaintMajorText",
	    value: function _repaintMajorText(x, text, orientation, className) {
	      // reuse redundant label
	      var label = this.dom.redundant.majorTexts.shift();

	      if (!label) {
	        // create label
	        var content = document.createElement('div');
	        label = document.createElement('div');
	        label.appendChild(content);
	        this.dom.foreground.appendChild(label);
	      }

	      label.childNodes[0].innerHTML = text;
	      label.className = "vis-text vis-major ".concat(className); //label.title = title; // TODO: this is a heavy operation

	      var y = orientation == 'top' ? 0 : this.props.minorLabelHeight;

	      this._setXY(label, x, y);

	      this.dom.majorTexts.push(label);
	      return label;
	    }
	    /**
	     * sets xy
	     * @param {string} label
	     * @param {number} x
	     * @param {number} y
	     * @private
	     */

	  }, {
	    key: "_setXY",
	    value: function _setXY(label, x, y) {
	      var _context;

	      // If rtl is true, inverse x.
	      var directionX = this.options.rtl ? x * -1 : x;
	      label.style.transform = concat$2(_context = "translate(".concat(directionX, "px, ")).call(_context, y, "px)");
	    }
	    /**
	     * Create a minor line for the axis at position x
	     * @param {number} left
	     * @param {number} width
	     * @param {string} orientation   "top" or "bottom" (default)
	     * @param {string} className
	     * @return {Element} Returns the created line
	     * @private
	     */

	  }, {
	    key: "_repaintMinorLine",
	    value: function _repaintMinorLine(left, width, orientation, className) {
	      var _context2;

	      // reuse redundant line
	      var line = this.dom.redundant.lines.shift();

	      if (!line) {
	        // create vertical line
	        line = document.createElement('div');
	        this.dom.background.appendChild(line);
	      }

	      this.dom.lines.push(line);
	      var props = this.props;
	      line.style.width = "".concat(width, "px");
	      line.style.height = "".concat(props.minorLineHeight, "px");
	      var y = orientation == 'top' ? props.majorLabelHeight : this.body.domProps.top.height;
	      var x = left - props.minorLineWidth / 2;

	      this._setXY(line, x, y);

	      line.className = concat$2(_context2 = "vis-grid ".concat(this.options.rtl ? 'vis-vertical-rtl' : 'vis-vertical', " vis-minor ")).call(_context2, className);
	      return line;
	    }
	    /**
	     * Create a Major line for the axis at position x
	     * @param {number} left
	     * @param {number} width
	     * @param {string} orientation   "top" or "bottom" (default)
	     * @param {string} className
	     * @return {Element} Returns the created line
	     * @private
	     */

	  }, {
	    key: "_repaintMajorLine",
	    value: function _repaintMajorLine(left, width, orientation, className) {
	      var _context3;

	      // reuse redundant line
	      var line = this.dom.redundant.lines.shift();

	      if (!line) {
	        // create vertical line
	        line = document.createElement('div');
	        this.dom.background.appendChild(line);
	      }

	      this.dom.lines.push(line);
	      var props = this.props;
	      line.style.width = "".concat(width, "px");
	      line.style.height = "".concat(props.majorLineHeight, "px");
	      var y = orientation == 'top' ? 0 : this.body.domProps.top.height;
	      var x = left - props.majorLineWidth / 2;

	      this._setXY(line, x, y);

	      line.className = concat$2(_context3 = "vis-grid ".concat(this.options.rtl ? 'vis-vertical-rtl' : 'vis-vertical', " vis-major ")).call(_context3, className);
	      return line;
	    }
	    /**
	     * Determine the size of text on the axis (both major and minor axis).
	     * The size is calculated only once and then cached in this.props.
	     * @private
	     */

	  }, {
	    key: "_calculateCharSize",
	    value: function _calculateCharSize() {
	      // Note: We calculate char size with every redraw. Size may change, for
	      // example when any of the timelines parents had display:none for example.
	      // determine the char width and height on the minor axis
	      if (!this.dom.measureCharMinor) {
	        this.dom.measureCharMinor = document.createElement('DIV');
	        this.dom.measureCharMinor.className = 'vis-text vis-minor vis-measure';
	        this.dom.measureCharMinor.style.position = 'absolute';
	        this.dom.measureCharMinor.appendChild(document.createTextNode('0'));
	        this.dom.foreground.appendChild(this.dom.measureCharMinor);
	      }

	      this.props.minorCharHeight = this.dom.measureCharMinor.clientHeight;
	      this.props.minorCharWidth = this.dom.measureCharMinor.clientWidth; // determine the char width and height on the major axis

	      if (!this.dom.measureCharMajor) {
	        this.dom.measureCharMajor = document.createElement('DIV');
	        this.dom.measureCharMajor.className = 'vis-text vis-major vis-measure';
	        this.dom.measureCharMajor.style.position = 'absolute';
	        this.dom.measureCharMajor.appendChild(document.createTextNode('0'));
	        this.dom.foreground.appendChild(this.dom.measureCharMajor);
	      }

	      this.props.majorCharHeight = this.dom.measureCharMajor.clientHeight;
	      this.props.majorCharWidth = this.dom.measureCharMajor.clientWidth;
	    }
	  }]);

	  return TimeAxis;
	}(Component);

	var warnedForOverflow = false;

	/**
	 * Created by Alex on 11/6/2014.
	 */
	function keycharm(options) {
	  var preventDefault = options && options.preventDefault || false;
	  var container = options && options.container || window;
	  var _exportFunctions = {};
	  var _bound = {
	    keydown: {},
	    keyup: {}
	  };
	  var _keys = {};
	  var i; // a - z

	  for (i = 97; i <= 122; i++) {
	    _keys[String.fromCharCode(i)] = {
	      code: 65 + (i - 97),
	      shift: false
	    };
	  } // A - Z


	  for (i = 65; i <= 90; i++) {
	    _keys[String.fromCharCode(i)] = {
	      code: i,
	      shift: true
	    };
	  } // 0 - 9


	  for (i = 0; i <= 9; i++) {
	    _keys['' + i] = {
	      code: 48 + i,
	      shift: false
	    };
	  } // F1 - F12


	  for (i = 1; i <= 12; i++) {
	    _keys['F' + i] = {
	      code: 111 + i,
	      shift: false
	    };
	  } // num0 - num9


	  for (i = 0; i <= 9; i++) {
	    _keys['num' + i] = {
	      code: 96 + i,
	      shift: false
	    };
	  } // numpad misc


	  _keys['num*'] = {
	    code: 106,
	    shift: false
	  };
	  _keys['num+'] = {
	    code: 107,
	    shift: false
	  };
	  _keys['num-'] = {
	    code: 109,
	    shift: false
	  };
	  _keys['num/'] = {
	    code: 111,
	    shift: false
	  };
	  _keys['num.'] = {
	    code: 110,
	    shift: false
	  }; // arrows

	  _keys['left'] = {
	    code: 37,
	    shift: false
	  };
	  _keys['up'] = {
	    code: 38,
	    shift: false
	  };
	  _keys['right'] = {
	    code: 39,
	    shift: false
	  };
	  _keys['down'] = {
	    code: 40,
	    shift: false
	  }; // extra keys

	  _keys['space'] = {
	    code: 32,
	    shift: false
	  };
	  _keys['enter'] = {
	    code: 13,
	    shift: false
	  };
	  _keys['shift'] = {
	    code: 16,
	    shift: undefined
	  };
	  _keys['esc'] = {
	    code: 27,
	    shift: false
	  };
	  _keys['backspace'] = {
	    code: 8,
	    shift: false
	  };
	  _keys['tab'] = {
	    code: 9,
	    shift: false
	  };
	  _keys['ctrl'] = {
	    code: 17,
	    shift: false
	  };
	  _keys['alt'] = {
	    code: 18,
	    shift: false
	  };
	  _keys['delete'] = {
	    code: 46,
	    shift: false
	  };
	  _keys['pageup'] = {
	    code: 33,
	    shift: false
	  };
	  _keys['pagedown'] = {
	    code: 34,
	    shift: false
	  }; // symbols

	  _keys['='] = {
	    code: 187,
	    shift: false
	  };
	  _keys['-'] = {
	    code: 189,
	    shift: false
	  };
	  _keys[']'] = {
	    code: 221,
	    shift: false
	  };
	  _keys['['] = {
	    code: 219,
	    shift: false
	  };

	  var down = function (event) {
	    handleEvent(event, 'keydown');
	  };

	  var up = function (event) {
	    handleEvent(event, 'keyup');
	  }; // handle the actualy bound key with the event


	  var handleEvent = function (event, type) {
	    if (_bound[type][event.keyCode] !== undefined) {
	      var bound = _bound[type][event.keyCode];

	      for (var i = 0; i < bound.length; i++) {
	        if (bound[i].shift === undefined) {
	          bound[i].fn(event);
	        } else if (bound[i].shift == true && event.shiftKey == true) {
	          bound[i].fn(event);
	        } else if (bound[i].shift == false && event.shiftKey == false) {
	          bound[i].fn(event);
	        }
	      }

	      if (preventDefault == true) {
	        event.preventDefault();
	      }
	    }
	  }; // bind a key to a callback


	  _exportFunctions.bind = function (key, callback, type) {
	    if (type === undefined) {
	      type = 'keydown';
	    }

	    if (_keys[key] === undefined) {
	      throw new Error("unsupported key: " + key);
	    }

	    if (_bound[type][_keys[key].code] === undefined) {
	      _bound[type][_keys[key].code] = [];
	    }

	    _bound[type][_keys[key].code].push({
	      fn: callback,
	      shift: _keys[key].shift
	    });
	  }; // bind all keys to a call back (demo purposes)


	  _exportFunctions.bindAll = function (callback, type) {
	    if (type === undefined) {
	      type = 'keydown';
	    }

	    for (var key in _keys) {
	      if (_keys.hasOwnProperty(key)) {
	        _exportFunctions.bind(key, callback, type);
	      }
	    }
	  }; // get the key label from an event


	  _exportFunctions.getKey = function (event) {
	    for (var key in _keys) {
	      if (_keys.hasOwnProperty(key)) {
	        if (event.shiftKey == true && _keys[key].shift == true && event.keyCode == _keys[key].code) {
	          return key;
	        } else if (event.shiftKey == false && _keys[key].shift == false && event.keyCode == _keys[key].code) {
	          return key;
	        } else if (event.keyCode == _keys[key].code && key == 'shift') {
	          return key;
	        }
	      }
	    }

	    return "unknown key, currently not supported";
	  }; // unbind either a specific callback from a key or all of them (by leaving callback undefined)


	  _exportFunctions.unbind = function (key, callback, type) {
	    if (type === undefined) {
	      type = 'keydown';
	    }

	    if (_keys[key] === undefined) {
	      throw new Error("unsupported key: " + key);
	    }

	    if (callback !== undefined) {
	      var newBindings = [];
	      var bound = _bound[type][_keys[key].code];

	      if (bound !== undefined) {
	        for (var i = 0; i < bound.length; i++) {
	          if (!(bound[i].fn == callback && bound[i].shift == _keys[key].shift)) {
	            newBindings.push(_bound[type][_keys[key].code][i]);
	          }
	        }
	      }

	      _bound[type][_keys[key].code] = newBindings;
	    } else {
	      _bound[type][_keys[key].code] = [];
	    }
	  }; // reset all bound variables.


	  _exportFunctions.reset = function () {
	    _bound = {
	      keydown: {},
	      keyup: {}
	    };
	  }; // unbind all listeners and reset all variables.


	  _exportFunctions.destroy = function () {
	    _bound = {
	      keydown: {},
	      keyup: {}
	    };
	    container.removeEventListener('keydown', down, true);
	    container.removeEventListener('keyup', up, true);
	  }; // create listeners.


	  container.addEventListener('keydown', down, true);
	  container.addEventListener('keyup', up, true); // return the public functions.

	  return _exportFunctions;
	}

	/**
	 * Turn an element into an clickToUse element.
	 * When not active, the element has a transparent overlay. When the overlay is
	 * clicked, the mode is changed to active.
	 * When active, the element is displayed with a blue border around it, and
	 * the interactive contents of the element can be used. When clicked outside
	 * the element, the elements mode is changed to inactive.
	 * @param {Element} container
	 * @constructor Activator
	 */

	function Activator(container) {
	  var _context, _context2;

	  this.active = false;
	  this.dom = {
	    container: container
	  };
	  this.dom.overlay = document.createElement('div');
	  this.dom.overlay.className = 'vis-overlay';
	  this.dom.container.appendChild(this.dom.overlay);
	  this.hammer = Hammer$1(this.dom.overlay);
	  this.hammer.on('tap', bind$2(_context = this._onTapOverlay).call(_context, this)); // block all touch events (except tap)

	  var me = this;
	  var events = ['tap', 'doubletap', 'press', 'pinch', 'pan', 'panstart', 'panmove', 'panend'];

	  forEach$2(events).call(events, function (event) {
	    me.hammer.on(event, function (event) {
	      event.stopPropagation();
	    });
	  }); // attach a click event to the window, in order to deactivate when clicking outside the timeline


	  if (document && document.body) {
	    this.onClick = function (event) {
	      if (!_hasParent(event.target, container)) {
	        me.deactivate();
	      }
	    };

	    document.body.addEventListener('click', this.onClick);
	  }

	  if (this.keycharm !== undefined) {
	    this.keycharm.destroy();
	  }

	  this.keycharm = keycharm(); // keycharm listener only bounded when active)

	  this.escListener = bind$2(_context2 = this.deactivate).call(_context2, this);
	} // turn into an event emitter


	componentEmitter(Activator.prototype); // The currently active activator

	Activator.current = null;
	/**
	 * Destroy the activator. Cleans up all created DOM and event listeners
	 */

	Activator.prototype.destroy = function () {
	  this.deactivate(); // remove dom

	  this.dom.overlay.parentNode.removeChild(this.dom.overlay); // remove global event listener

	  if (this.onClick) {
	    document.body.removeEventListener('click', this.onClick);
	  } // remove keycharm


	  if (this.keycharm !== undefined) {
	    this.keycharm.destroy();
	  }

	  this.keycharm = null; // cleanup hammer instances

	  this.hammer.destroy();
	  this.hammer = null; // FIXME: cleaning up hammer instances doesn't work (Timeline not removed from memory)
	};
	/**
	 * Activate the element
	 * Overlay is hidden, element is decorated with a blue shadow border
	 */


	Activator.prototype.activate = function () {
	  var _context3;

	  // we allow only one active activator at a time
	  if (Activator.current) {
	    Activator.current.deactivate();
	  }

	  Activator.current = this;
	  this.active = true;
	  this.dom.overlay.style.display = 'none';
	  util$1.addClassName(this.dom.container, 'vis-active');
	  this.emit('change');
	  this.emit('activate'); // ugly hack: bind ESC after emitting the events, as the Network rebinds all
	  // keyboard events on a 'change' event

	  bind$2(_context3 = this.keycharm).call(_context3, 'esc', this.escListener);
	};
	/**
	 * Deactivate the element
	 * Overlay is displayed on top of the element
	 */


	Activator.prototype.deactivate = function () {
	  if (Activator.current === this) {
	    Activator.current = null;
	  }

	  this.active = false;
	  this.dom.overlay.style.display = '';
	  util$1.removeClassName(this.dom.container, 'vis-active');
	  this.keycharm.unbind('esc', this.escListener);
	  this.emit('change');
	  this.emit('deactivate');
	};
	/**
	 * Handle a tap event: activate the container
	 * @param {Event}  event   The event
	 * @private
	 */


	Activator.prototype._onTapOverlay = function (event) {
	  // activate the container
	  this.activate();
	  event.stopPropagation();
	};
	/**
	 * Test whether the element has the requested parent element somewhere in
	 * its chain of parent nodes.
	 * @param {HTMLElement} element
	 * @param {HTMLElement} parent
	 * @returns {boolean} Returns true when the parent is found somewhere in the
	 *                    chain of parent nodes.
	 * @private
	 */


	function _hasParent(element, parent) {
	  while (element) {
	    if (element === parent) {
	      return true;
	    }

	    element = element.parentNode;
	  }

	  return false;
	}

	/*
	 * IMPORTANT: Locales for Moment has to be imported in the legacy and standalone
	 * entry points. For the peer build it's users responsibility to do so.
	 */
	// English
	var en = {
	  current: 'current',
	  time: 'time',
	  deleteSelected: 'Delete selected'
	};
	var en_EN = en;
	var en_US = en; // Italiano

	var it = {
	  current: 'attuale',
	  time: 'tempo',
	  deleteSelected: 'Cancella la selezione'
	};
	var it_IT = it;
	var it_CH = it; // Dutch

	var nl = {
	  current: 'huidige',
	  time: 'tijd',
	  deleteSelected: 'Selectie verwijderen'
	};
	var nl_NL = nl;
	var nl_BE = nl; // German

	var de = {
	  current: 'Aktuelle',
	  time: 'Zeit',
	  deleteSelected: "L\xF6sche Auswahl"
	};
	var de_DE = de; // French

	var fr = {
	  current: 'actuel',
	  time: 'heure',
	  deleteSelected: 'Effacer la selection'
	};
	var fr_FR = fr;
	var fr_CA = fr;
	var fr_BE = fr; // Espanol

	var es = {
	  current: 'corriente',
	  time: 'hora',
	  deleteSelected: "Eliminar selecci\xF3n"
	};
	var es_ES = es; // Ukrainian

	var uk = {
	  current: 'поточний',
	  time: 'час',
	  deleteSelected: 'Видалити обране'
	};
	var uk_UA = uk; // Russian

	var ru = {
	  current: 'текущее',
	  time: 'время',
	  deleteSelected: 'Удалить выбранное'
	};
	var ru_RU = ru; // Polish

	var pl = {
	  current: 'aktualny',
	  time: 'czas',
	  deleteSelected: 'Usuń wybrane'
	};
	var pl_PL = pl; // Portuguese

	var pt = {
	  current: 'atual',
	  time: 'data',
	  deleteSelected: 'Apagar selecionado'
	};
	var pt_BR = pt;
	var pt_PT = pt; // Japanese

	var ja = {
	  current: '現在',
	  time: '時刻',
	  deleteSelected: '選択されたものを削除'
	};
	var ja_JP = ja;
	var locales = {
	  en: en,
	  en_EN: en_EN,
	  en_US: en_US,
	  it: it,
	  it_IT: it_IT,
	  it_CH: it_CH,
	  nl: nl,
	  nl_NL: nl_NL,
	  nl_BE: nl_BE,
	  de: de,
	  de_DE: de_DE,
	  fr: fr,
	  fr_FR: fr_FR,
	  fr_CA: fr_CA,
	  fr_BE: fr_BE,
	  es: es,
	  es_ES: es_ES,
	  uk: uk,
	  uk_UA: uk_UA,
	  ru: ru,
	  ru_RU: ru_RU,
	  pl: pl,
	  pl_PL: pl_PL,
	  pt: pt,
	  pt_BR: pt_BR,
	  pt_PT: pt_PT,
	  ja: ja,
	  ja_JP: ja_JP
	};

	function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/** A custom time bar */

	var CustomTime = /*#__PURE__*/function (_Component) {
	  inherits(CustomTime, _Component);

	  var _super = _createSuper$2(CustomTime);

	  /**
	  * @param {{range: Range, dom: Object}} body
	  * @param {Object} [options]        Available parameters:
	  *                                  {number | string} id
	  *                                  {string} locales
	  *                                  {string} locale
	  * @constructor CustomTime
	  * @extends Component
	  */
	  function CustomTime(body, options) {
	    var _context;

	    var _this;

	    classCallCheck(this, CustomTime);

	    _this = _super.call(this);
	    _this.body = body; // default options

	    _this.defaultOptions = {
	      moment: moment,
	      locales: locales,
	      locale: 'en',
	      id: undefined,
	      title: undefined
	    };
	    _this.options = util$1.extend({}, _this.defaultOptions);

	    _this.setOptions(options);

	    _this.options.locales = util$1.extend({}, locales, _this.options.locales);
	    var defaultLocales = _this.defaultOptions.locales[_this.defaultOptions.locale];

	    forEach$2(_context = keys$3(_this.options.locales)).call(_context, function (locale) {
	      _this.options.locales[locale] = util$1.extend({}, defaultLocales, _this.options.locales[locale]);
	    });

	    if (options && options.time != null) {
	      _this.customTime = options.time;
	    } else {
	      _this.customTime = new Date();
	    }

	    _this.eventParams = {}; // stores state parameters while dragging the bar
	    // create the DOM

	    _this._create();

	    return _this;
	  }
	  /**
	   * Set options for the component. Options will be merged in current options.
	   * @param {Object} options  Available parameters:
	   *                                  {number | string} id
	   *                                  {string} locales
	   *                                  {string} locale
	   */


	  createClass(CustomTime, [{
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options) {
	        // copy all options that we know
	        util$1.selectiveExtend(['moment', 'locale', 'locales', 'id', 'title', 'rtl', 'snap'], this.options, options);
	      }
	    }
	    /**
	     * Create the DOM for the custom time
	     * @private
	     */

	  }, {
	    key: "_create",
	    value: function _create() {
	      var _context2, _context3, _context4;

	      var bar = document.createElement('div');
	      bar['custom-time'] = this;
	      bar.className = "vis-custom-time ".concat(this.options.id || '');
	      bar.style.position = 'absolute';
	      bar.style.top = '0px';
	      bar.style.height = '100%';
	      this.bar = bar;
	      var drag = document.createElement('div');
	      drag.style.position = 'relative';
	      drag.style.top = '0px';

	      if (this.options.rtl) {
	        drag.style.right = '-10px';
	      } else {
	        drag.style.left = '-10px';
	      }

	      drag.style.height = '100%';
	      drag.style.width = '20px';
	      /**
	       *
	       * @param {WheelEvent} e
	       */

	      function onMouseWheel(e) {
	        this.body.range._onMouseWheel(e);
	      }

	      if (drag.addEventListener) {
	        // IE9, Chrome, Safari, Opera
	        drag.addEventListener("mousewheel", bind$2(onMouseWheel).call(onMouseWheel, this), false); // Firefox

	        drag.addEventListener("DOMMouseScroll", bind$2(onMouseWheel).call(onMouseWheel, this), false);
	      } else {
	        // IE 6/7/8
	        drag.attachEvent("onmousewheel", bind$2(onMouseWheel).call(onMouseWheel, this));
	      }

	      bar.appendChild(drag); // attach event listeners

	      this.hammer = new Hammer$1(drag);
	      this.hammer.on('panstart', bind$2(_context2 = this._onDragStart).call(_context2, this));
	      this.hammer.on('panmove', bind$2(_context3 = this._onDrag).call(_context3, this));
	      this.hammer.on('panend', bind$2(_context4 = this._onDragEnd).call(_context4, this));
	      this.hammer.get('pan').set({
	        threshold: 5,
	        direction: Hammer$1.DIRECTION_ALL
	      });
	    }
	    /**
	     * Destroy the CustomTime bar
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.hide();
	      this.hammer.destroy();
	      this.hammer = null;
	      this.body = null;
	    }
	    /**
	     * Repaint the component
	     * @return {boolean} Returns true if the component is resized
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      var parent = this.body.dom.backgroundVertical;

	      if (this.bar.parentNode != parent) {
	        // attach to the dom
	        if (this.bar.parentNode) {
	          this.bar.parentNode.removeChild(this.bar);
	        }

	        parent.appendChild(this.bar);
	      }

	      var x = this.body.util.toScreen(this.customTime);
	      var locale = this.options.locales[this.options.locale];

	      if (!locale) {
	        if (!this.warned) {
	          console.warn("WARNING: options.locales['".concat(this.options.locale, "'] not found. See https://visjs.github.io/vis-timeline/docs/timeline/#Localization"));
	          this.warned = true;
	        }

	        locale = this.options.locales['en']; // fall back on english when not available
	      }

	      var title = this.options.title; // To hide the title completely use empty string ''.

	      if (title === undefined) {
	        var _context5;

	        title = concat$2(_context5 = "".concat(locale.time, ": ")).call(_context5, this.options.moment(this.customTime).format('dddd, MMMM Do YYYY, H:mm:ss'));
	        title = title.charAt(0).toUpperCase() + title.substring(1);
	      } else if (typeof title === "function") {
	        title = title.call(this, this.customTime);
	      }

	      this.options.rtl ? this.bar.style.right = "".concat(x, "px") : this.bar.style.left = "".concat(x, "px");
	      this.bar.title = title;
	      return false;
	    }
	    /**
	     * Remove the CustomTime from the DOM
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      // remove the line from the DOM
	      if (this.bar.parentNode) {
	        this.bar.parentNode.removeChild(this.bar);
	      }
	    }
	    /**
	     * Set custom time.
	     * @param {Date | number | string} time
	     */

	  }, {
	    key: "setCustomTime",
	    value: function setCustomTime(time) {
	      this.customTime = util$1.convert(time, 'Date');
	      this.redraw();
	    }
	    /**
	     * Retrieve the current custom time.
	     * @return {Date} customTime
	     */

	  }, {
	    key: "getCustomTime",
	    value: function getCustomTime() {
	      return new Date(this.customTime.valueOf());
	    }
	    /**
	     * Set custom marker.
	     * @param {string} [title] Title of the custom marker
	     * @param {boolean} [editable] Make the custom marker editable.
	     */

	  }, {
	    key: "setCustomMarker",
	    value: function setCustomMarker(title, editable) {
	      var marker = document.createElement('div');
	      marker.className = "vis-custom-time-marker";
	      marker.innerHTML = title;
	      marker.style.position = 'absolute';

	      if (editable) {
	        var _context6, _context7;

	        marker.setAttribute('contenteditable', 'true');
	        marker.addEventListener('pointerdown', function () {
	          marker.focus();
	        });
	        marker.addEventListener('input', bind$2(_context6 = this._onMarkerChange).call(_context6, this)); // The editable div element has no change event, so here emulates the change event.

	        marker.title = title;
	        marker.addEventListener('blur', bind$2(_context7 = function _context7(event) {
	          if (this.title != event.target.innerHTML) {
	            this._onMarkerChanged(event);

	            this.title = event.target.innerHTML;
	          }
	        }).call(_context7, this));
	      }

	      this.bar.appendChild(marker);
	    }
	    /**
	      * Set custom title.
	      * @param {Date | number | string} title
	      */

	  }, {
	    key: "setCustomTitle",
	    value: function setCustomTitle(title) {
	      this.options.title = title;
	    }
	    /**
	     * Start moving horizontally
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDragStart",
	    value: function _onDragStart(event) {
	      this.eventParams.dragging = true;
	      this.eventParams.customTime = this.customTime;
	      event.stopPropagation();
	    }
	    /**
	     * Perform moving operating.
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDrag",
	    value: function _onDrag(event) {
	      if (!this.eventParams.dragging) return;
	      var deltaX = this.options.rtl ? -1 * event.deltaX : event.deltaX;
	      var x = this.body.util.toScreen(this.eventParams.customTime) + deltaX;
	      var time = this.body.util.toTime(x);
	      var scale = this.body.util.getScale();
	      var step = this.body.util.getStep();
	      var snap = this.options.snap;
	      var snappedTime = snap ? snap(time, scale, step) : time;
	      this.setCustomTime(snappedTime); // fire a timechange event

	      this.body.emitter.emit('timechange', {
	        id: this.options.id,
	        time: new Date(this.customTime.valueOf()),
	        event: event
	      });
	      event.stopPropagation();
	    }
	    /**
	     * Stop moving operating.
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDragEnd",
	    value: function _onDragEnd(event) {
	      if (!this.eventParams.dragging) return; // fire a timechanged event

	      this.body.emitter.emit('timechanged', {
	        id: this.options.id,
	        time: new Date(this.customTime.valueOf()),
	        event: event
	      });
	      event.stopPropagation();
	    }
	    /**
	     * Perform input operating.
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onMarkerChange",
	    value: function _onMarkerChange(event) {
	      this.body.emitter.emit('markerchange', {
	        id: this.options.id,
	        title: event.target.innerHTML,
	        event: event
	      });
	      event.stopPropagation();
	    }
	    /**
	     * Perform change operating.
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onMarkerChanged",
	    value: function _onMarkerChanged(event) {
	      this.body.emitter.emit('markerchanged', {
	        id: this.options.id,
	        title: event.target.innerHTML,
	        event: event
	      });
	      event.stopPropagation();
	    }
	    /**
	     * Find a custom time from an event target:
	     * searches for the attribute 'custom-time' in the event target's element tree
	     * @param {Event} event
	     * @return {CustomTime | null} customTime
	     */

	  }], [{
	    key: "customTimeFromTarget",
	    value: function customTimeFromTarget(event) {
	      var target = event.target;

	      while (target) {
	        if (target.hasOwnProperty('custom-time')) {
	          return target['custom-time'];
	        }

	        target = target.parentNode;
	      }

	      return null;
	    }
	  }]);

	  return CustomTime;
	}(Component);

	/**
	 * Create a timeline visualization
	 * @constructor Core
	 */

	var Core = /*#__PURE__*/function () {
	  function Core() {
	    classCallCheck(this, Core);
	  }

	  createClass(Core, [{
	    key: "_create",

	    /**
	     * Create the main DOM for the Core: a root panel containing left, right,
	     * top, bottom, content, and background panel.
	     * @param {Element} container  The container element where the Core will
	     *                             be attached.
	     * @protected
	     */
	    value: function _create(container) {
	      var _this = this,
	          _context,
	          _context2,
	          _context3;

	      this.dom = {};
	      this.dom.container = container;
	      this.dom.container.style.position = 'relative';
	      this.dom.root = document.createElement('div');
	      this.dom.background = document.createElement('div');
	      this.dom.backgroundVertical = document.createElement('div');
	      this.dom.backgroundHorizontal = document.createElement('div');
	      this.dom.centerContainer = document.createElement('div');
	      this.dom.leftContainer = document.createElement('div');
	      this.dom.rightContainer = document.createElement('div');
	      this.dom.center = document.createElement('div');
	      this.dom.left = document.createElement('div');
	      this.dom.right = document.createElement('div');
	      this.dom.top = document.createElement('div');
	      this.dom.bottom = document.createElement('div');
	      this.dom.shadowTop = document.createElement('div');
	      this.dom.shadowBottom = document.createElement('div');
	      this.dom.shadowTopLeft = document.createElement('div');
	      this.dom.shadowBottomLeft = document.createElement('div');
	      this.dom.shadowTopRight = document.createElement('div');
	      this.dom.shadowBottomRight = document.createElement('div');
	      this.dom.rollingModeBtn = document.createElement('div');
	      this.dom.loadingScreen = document.createElement('div');
	      this.dom.root.className = 'vis-timeline';
	      this.dom.background.className = 'vis-panel vis-background';
	      this.dom.backgroundVertical.className = 'vis-panel vis-background vis-vertical';
	      this.dom.backgroundHorizontal.className = 'vis-panel vis-background vis-horizontal';
	      this.dom.centerContainer.className = 'vis-panel vis-center';
	      this.dom.leftContainer.className = 'vis-panel vis-left';
	      this.dom.rightContainer.className = 'vis-panel vis-right';
	      this.dom.top.className = 'vis-panel vis-top';
	      this.dom.bottom.className = 'vis-panel vis-bottom';
	      this.dom.left.className = 'vis-content';
	      this.dom.center.className = 'vis-content';
	      this.dom.right.className = 'vis-content';
	      this.dom.shadowTop.className = 'vis-shadow vis-top';
	      this.dom.shadowBottom.className = 'vis-shadow vis-bottom';
	      this.dom.shadowTopLeft.className = 'vis-shadow vis-top';
	      this.dom.shadowBottomLeft.className = 'vis-shadow vis-bottom';
	      this.dom.shadowTopRight.className = 'vis-shadow vis-top';
	      this.dom.shadowBottomRight.className = 'vis-shadow vis-bottom';
	      this.dom.rollingModeBtn.className = 'vis-rolling-mode-btn';
	      this.dom.loadingScreen.className = 'vis-loading-screen';
	      this.dom.root.appendChild(this.dom.background);
	      this.dom.root.appendChild(this.dom.backgroundVertical);
	      this.dom.root.appendChild(this.dom.backgroundHorizontal);
	      this.dom.root.appendChild(this.dom.centerContainer);
	      this.dom.root.appendChild(this.dom.leftContainer);
	      this.dom.root.appendChild(this.dom.rightContainer);
	      this.dom.root.appendChild(this.dom.top);
	      this.dom.root.appendChild(this.dom.bottom);
	      this.dom.root.appendChild(this.dom.rollingModeBtn);
	      this.dom.centerContainer.appendChild(this.dom.center);
	      this.dom.leftContainer.appendChild(this.dom.left);
	      this.dom.rightContainer.appendChild(this.dom.right);
	      this.dom.centerContainer.appendChild(this.dom.shadowTop);
	      this.dom.centerContainer.appendChild(this.dom.shadowBottom);
	      this.dom.leftContainer.appendChild(this.dom.shadowTopLeft);
	      this.dom.leftContainer.appendChild(this.dom.shadowBottomLeft);
	      this.dom.rightContainer.appendChild(this.dom.shadowTopRight);
	      this.dom.rightContainer.appendChild(this.dom.shadowBottomRight); // size properties of each of the panels

	      this.props = {
	        root: {},
	        background: {},
	        centerContainer: {},
	        leftContainer: {},
	        rightContainer: {},
	        center: {},
	        left: {},
	        right: {},
	        top: {},
	        bottom: {},
	        border: {},
	        scrollTop: 0,
	        scrollTopMin: 0
	      };
	      this.on('rangechange', function () {
	        if (_this.initialDrawDone === true) {
	          _this._redraw();
	        }
	      });
	      this.on('rangechanged', function () {
	        if (!_this.initialRangeChangeDone) {
	          _this.initialRangeChangeDone = true;
	        }
	      });
	      this.on('touch', bind$2(_context = this._onTouch).call(_context, this));
	      this.on('panmove', bind$2(_context2 = this._onDrag).call(_context2, this));
	      var me = this;
	      this._origRedraw = bind$2(_context3 = this._redraw).call(_context3, this);
	      this._redraw = util$1.throttle(this._origRedraw);
	      this.on('_change', function (properties) {
	        if (me.itemSet && me.itemSet.initialItemSetDrawn && properties && properties.queue == true) {
	          me._redraw();
	        } else {
	          me._origRedraw();
	        }
	      }); // create event listeners for all interesting events, these events will be
	      // emitted via emitter

	      this.hammer = new Hammer$1(this.dom.root);
	      var pinchRecognizer = this.hammer.get('pinch').set({
	        enable: true
	      });
	      pinchRecognizer && disablePreventDefaultVertically(pinchRecognizer);
	      this.hammer.get('pan').set({
	        threshold: 5,
	        direction: Hammer$1.DIRECTION_ALL
	      });
	      this.timelineListeners = {};
	      var events = ['tap', 'doubletap', 'press', 'pinch', 'pan', 'panstart', 'panmove', 'panend' // TODO: cleanup
	      //'touch', 'pinch',
	      //'tap', 'doubletap', 'hold',
	      //'dragstart', 'drag', 'dragend',
	      //'mousewheel', 'DOMMouseScroll' // DOMMouseScroll is needed for Firefox
	      ];

	      forEach$2(events).call(events, function (type) {
	        var listener = function listener(event) {
	          if (me.isActive()) {
	            me.emit(type, event);
	          }
	        };

	        me.hammer.on(type, listener);
	        me.timelineListeners[type] = listener;
	      }); // emulate a touch event (emitted before the start of a pan, pinch, tap, or press)


	      onTouch(this.hammer, function (event) {
	        me.emit('touch', event);
	      }); // emulate a release event (emitted after a pan, pinch, tap, or press)

	      onRelease(this.hammer, function (event) {
	        me.emit('release', event);
	      });
	      /**
	       *
	       * @param {WheelEvent} event
	       */

	      function onMouseWheel(event) {
	        // Reasonable default wheel deltas
	        var LINE_HEIGHT = 40;
	        var PAGE_HEIGHT = 800;

	        if (this.isActive()) {
	          this.emit('mousewheel', event);
	        } // deltaX and deltaY normalization from jquery.mousewheel.js


	        var deltaX = 0;
	        var deltaY = 0; // Old school scrollwheel delta

	        if ('detail' in event) {
	          deltaY = event.detail * -1;
	        }

	        if ('wheelDelta' in event) {
	          deltaY = event.wheelDelta;
	        }

	        if ('wheelDeltaY' in event) {
	          deltaY = event.wheelDeltaY;
	        }

	        if ('wheelDeltaX' in event) {
	          deltaX = event.wheelDeltaX * -1;
	        } // Firefox < 17 horizontal scrolling related to DOMMouseScroll event


	        if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
	          deltaX = deltaY * -1;
	          deltaY = 0;
	        } // New school wheel delta (wheel event)


	        if ('deltaY' in event) {
	          deltaY = event.deltaY * -1;
	        }

	        if ('deltaX' in event) {
	          deltaX = event.deltaX;
	        } // Normalize deltas


	        if (event.deltaMode) {
	          if (event.deltaMode === 1) {
	            // delta in LINE units
	            deltaX *= LINE_HEIGHT;
	            deltaY *= LINE_HEIGHT;
	          } else {
	            // delta in PAGE units
	            deltaX *= LINE_HEIGHT;
	            deltaY *= PAGE_HEIGHT;
	          }
	        } // Prevent scrolling when zooming (no zoom key, or pressing zoom key)


	        if (this.options.preferZoom) {
	          if (!this.options.zoomKey || event[this.options.zoomKey]) return;
	        } else {
	          if (this.options.zoomKey && event[this.options.zoomKey]) return;
	        } // Don't preventDefault if you can't scroll


	        if (!this.options.verticalScroll && !this.options.horizontalScroll) return;

	        if (this.options.verticalScroll && Math.abs(deltaY) >= Math.abs(deltaX)) {
	          var current = this.props.scrollTop;
	          var adjusted = current + deltaY;

	          if (this.isActive()) {
	            var newScrollTop = this._setScrollTop(adjusted);

	            if (newScrollTop !== current) {
	              this._redraw();

	              this.emit('scroll', event); // Prevent default actions caused by mouse wheel
	              // (else the page and timeline both scroll)

	              event.preventDefault();
	            }
	          }
	        } else if (this.options.horizontalScroll) {
	          var delta = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : deltaY; // calculate a single scroll jump relative to the range scale

	          var diff = delta / 120 * (this.range.end - this.range.start) / 20; // calculate new start and end

	          var newStart = this.range.start + diff;
	          var newEnd = this.range.end + diff;
	          var options = {
	            animation: false,
	            byUser: true,
	            event: event
	          };
	          this.range.setRange(newStart, newEnd, options);
	          event.preventDefault();
	        }
	      } // Add modern wheel event listener


	      var wheelType = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
	      document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
	      // DOMMouseScroll - Older Firefox versions use "DOMMouseScroll"
	      // onmousewheel - All the use "onmousewheel"
	      this.dom.centerContainer.addEventListener ? "DOMMouseScroll" : "onmousewheel";
	      this.dom.top.addEventListener ? "DOMMouseScroll" : "onmousewheel";
	      this.dom.bottom.addEventListener ? "DOMMouseScroll" : "onmousewheel";
	      this.dom.centerContainer.addEventListener(wheelType, bind$2(onMouseWheel).call(onMouseWheel, this), false);
	      this.dom.top.addEventListener(wheelType, bind$2(onMouseWheel).call(onMouseWheel, this), false);
	      this.dom.bottom.addEventListener(wheelType, bind$2(onMouseWheel).call(onMouseWheel, this), false);
	      /**
	       *
	       * @param {scroll} event
	       */

	      function onMouseScrollSide(event) {
	        if (!me.options.verticalScroll) return;

	        if (me._isProgramaticallyScrolled) {
	          me._isProgramaticallyScrolled = false;
	          return;
	        }

	        event.preventDefault();

	        if (me.isActive()) {
	          var adjusted = -event.target.scrollTop;

	          me._setScrollTop(adjusted);

	          me._redraw();

	          me.emit('scrollSide', event);
	        }
	      }

	      this.dom.left.parentNode.addEventListener('scroll', bind$2(onMouseScrollSide).call(onMouseScrollSide, this));
	      this.dom.right.parentNode.addEventListener('scroll', bind$2(onMouseScrollSide).call(onMouseScrollSide, this));
	      var itemAddedToTimeline = false;
	      /**
	       *
	       * @param {dragover} event
	       * @returns {boolean}
	       */

	      function handleDragOver(event) {
	        var _context4;

	        if (event.preventDefault) {
	          me.emit('dragover', me.getEventProperties(event));
	          event.preventDefault(); // Necessary. Allows us to drop.
	        } // make sure your target is a timeline element


	        if (!(indexOf$3(_context4 = event.target.className).call(_context4, "timeline") > -1)) return; // make sure only one item is added every time you're over the timeline

	        if (itemAddedToTimeline) return;
	        event.dataTransfer.dropEffect = 'move';
	        itemAddedToTimeline = true;
	        return false;
	      }
	      /**
	       *
	       * @param {drop} event
	       * @returns {boolean}
	       */


	      function handleDrop(event) {
	        // prevent redirect to blank page - Firefox
	        if (event.preventDefault) {
	          event.preventDefault();
	        }

	        if (event.stopPropagation) {
	          event.stopPropagation();
	        } // return when dropping non-timeline items


	        try {
	          var itemData = JSON.parse(event.dataTransfer.getData("text"));
	          if (!itemData || !itemData.content) return;
	        } catch (err) {
	          return false;
	        }

	        itemAddedToTimeline = false;
	        event.center = {
	          x: event.clientX,
	          y: event.clientY
	        };

	        if (itemData.target !== 'item') {
	          me.itemSet._onAddItem(event);
	        } else {
	          me.itemSet._onDropObjectOnItem(event);
	        }

	        me.emit('drop', me.getEventProperties(event));
	        return false;
	      }

	      this.dom.center.addEventListener('dragover', bind$2(handleDragOver).call(handleDragOver, this), false);
	      this.dom.center.addEventListener('drop', bind$2(handleDrop).call(handleDrop, this), false);
	      this.customTimes = []; // store state information needed for touch events

	      this.touch = {};
	      this.redrawCount = 0;
	      this.initialDrawDone = false;
	      this.initialRangeChangeDone = false; // attach the root panel to the provided container

	      if (!container) throw new Error('No container provided');
	      container.appendChild(this.dom.root);
	      container.appendChild(this.dom.loadingScreen);
	    }
	    /**
	     * Set options. Options will be passed to all components loaded in the Timeline.
	     * @param {Object} [options]
	     *                           {String} orientation
	     *                              Vertical orientation for the Timeline,
	     *                              can be 'bottom' (default) or 'top'.
	     *                           {string | number} width
	     *                              Width for the timeline, a number in pixels or
	     *                              a css string like '1000px' or '75%'. '100%' by default.
	     *                           {string | number} height
	     *                              Fixed height for the Timeline, a number in pixels or
	     *                              a css string like '400px' or '75%'. If undefined,
	     *                              The Timeline will automatically size such that
	     *                              its contents fit.
	     *                           {string | number} minHeight
	     *                              Minimum height for the Timeline, a number in pixels or
	     *                              a css string like '400px' or '75%'.
	     *                           {string | number} maxHeight
	     *                              Maximum height for the Timeline, a number in pixels or
	     *                              a css string like '400px' or '75%'.
	     *                           {number | Date | string} start
	     *                              Start date for the visible window
	     *                           {number | Date | string} end
	     *                              End date for the visible window
	     */

	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      var _context7;

	      if (options) {
	        // copy the known options
	        var fields = ['width', 'height', 'minHeight', 'maxHeight', 'autoResize', 'start', 'end', 'clickToUse', 'dataAttributes', 'hiddenDates', 'locale', 'locales', 'moment', 'preferZoom', 'rtl', 'zoomKey', 'horizontalScroll', 'verticalScroll', 'longSelectPressTime', 'snap'];
	        util$1.selectiveExtend(fields, this.options, options);
	        this.dom.rollingModeBtn.style.visibility = 'hidden';

	        if (this.options.rtl) {
	          this.dom.container.style.direction = "rtl";
	          this.dom.backgroundVertical.className = 'vis-panel vis-background vis-vertical-rtl';
	        }

	        if (this.options.verticalScroll) {
	          if (this.options.rtl) {
	            this.dom.rightContainer.className = 'vis-panel vis-right vis-vertical-scroll';
	          } else {
	            this.dom.leftContainer.className = 'vis-panel vis-left vis-vertical-scroll';
	          }
	        }

	        if (_typeof_1(this.options.orientation) !== 'object') {
	          this.options.orientation = {
	            item: undefined,
	            axis: undefined
	          };
	        }

	        if ('orientation' in options) {
	          if (typeof options.orientation === 'string') {
	            this.options.orientation = {
	              item: options.orientation,
	              axis: options.orientation
	            };
	          } else if (_typeof_1(options.orientation) === 'object') {
	            if ('item' in options.orientation) {
	              this.options.orientation.item = options.orientation.item;
	            }

	            if ('axis' in options.orientation) {
	              this.options.orientation.axis = options.orientation.axis;
	            }
	          }
	        }

	        if (this.options.orientation.axis === 'both') {
	          if (!this.timeAxis2) {
	            var timeAxis2 = this.timeAxis2 = new TimeAxis(this.body);

	            timeAxis2.setOptions = function (options) {
	              var _options = options ? util$1.extend({}, options) : {};

	              _options.orientation = 'top'; // override the orientation option, always top

	              TimeAxis.prototype.setOptions.call(timeAxis2, _options);
	            };

	            this.components.push(timeAxis2);
	          }
	        } else {
	          if (this.timeAxis2) {
	            var _context5;

	            var index = indexOf$3(_context5 = this.components).call(_context5, this.timeAxis2);

	            if (index !== -1) {
	              var _context6;

	              splice$2(_context6 = this.components).call(_context6, index, 1);
	            }

	            this.timeAxis2.destroy();
	            this.timeAxis2 = null;
	          }
	        } // if the graph2d's drawPoints is a function delegate the callback to the onRender property


	        if (typeof options.drawPoints == 'function') {
	          options.drawPoints = {
	            onRender: options.drawPoints
	          };
	        }

	        if ('hiddenDates' in this.options) {
	          convertHiddenOptions(this.options.moment, this.body, this.options.hiddenDates);
	        }

	        if ('clickToUse' in options) {
	          if (options.clickToUse) {
	            if (!this.activator) {
	              this.activator = new Activator(this.dom.root);
	            }
	          } else {
	            if (this.activator) {
	              this.activator.destroy();
	              delete this.activator;
	            }
	          }
	        } // enable/disable autoResize


	        this._initAutoResize();
	      } // propagate options to all components


	      forEach$2(_context7 = this.components).call(_context7, function (component) {
	        return component.setOptions(options);
	      }); // enable/disable configure


	      if ('configure' in options) {
	        var _context8;

	        if (!this.configurator) {
	          this.configurator = this._createConfigurator();
	        }

	        this.configurator.setOptions(options.configure); // collect the settings of all components, and pass them to the configuration system

	        var appliedOptions = util$1.deepExtend({}, this.options);

	        forEach$2(_context8 = this.components).call(_context8, function (component) {
	          util$1.deepExtend(appliedOptions, component.options);
	        });

	        this.configurator.setModuleOptions({
	          global: appliedOptions
	        });
	      }

	      this._redraw();
	    }
	    /**
	     * Returns true when the Timeline is active.
	     * @returns {boolean}
	     */

	  }, {
	    key: "isActive",
	    value: function isActive() {
	      return !this.activator || this.activator.active;
	    }
	    /**
	     * Destroy the Core, clean up all DOM elements and event listeners.
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var _context9;

	      // unbind datasets
	      this.setItems(null);
	      this.setGroups(null); // remove all event listeners

	      this.off(); // stop checking for changed size

	      this._stopAutoResize(); // remove from DOM


	      if (this.dom.root.parentNode) {
	        this.dom.root.parentNode.removeChild(this.dom.root);
	      }

	      this.dom = null; // remove Activator

	      if (this.activator) {
	        this.activator.destroy();
	        delete this.activator;
	      } // cleanup hammer touch events


	      for (var event in this.timelineListeners) {
	        if (this.timelineListeners.hasOwnProperty(event)) {
	          delete this.timelineListeners[event];
	        }
	      }

	      this.timelineListeners = null;
	      this.hammer && this.hammer.destroy();
	      this.hammer = null; // give all components the opportunity to cleanup

	      forEach$2(_context9 = this.components).call(_context9, function (component) {
	        return component.destroy();
	      });

	      this.body = null;
	    }
	    /**
	     * Set a custom time bar
	     * @param {Date} time
	     * @param {number} [id=undefined] Optional id of the custom time bar to be adjusted.
	     */

	  }, {
	    key: "setCustomTime",
	    value: function setCustomTime(time, id) {
	      var _context10;

	      var customTimes = filter$2(_context10 = this.customTimes).call(_context10, function (component) {
	        return id === component.options.id;
	      });

	      if (customTimes.length === 0) {
	        throw new Error("No custom time bar found with id ".concat(stringify$2(id)));
	      }

	      if (customTimes.length > 0) {
	        customTimes[0].setCustomTime(time);
	      }
	    }
	    /**
	     * Retrieve the current custom time.
	     * @param {number} [id=undefined]    Id of the custom time bar.
	     * @return {Date | undefined} customTime
	     */

	  }, {
	    key: "getCustomTime",
	    value: function getCustomTime(id) {
	      var _context11;

	      var customTimes = filter$2(_context11 = this.customTimes).call(_context11, function (component) {
	        return component.options.id === id;
	      });

	      if (customTimes.length === 0) {
	        throw new Error("No custom time bar found with id ".concat(stringify$2(id)));
	      }

	      return customTimes[0].getCustomTime();
	    }
	    /**
	     * Set a custom marker for the custom time bar.
	     * @param {string} [title] Title of the custom marker.
	     * @param {number} [id=undefined] Id of the custom marker.
	     * @param {boolean} [editable=false] Make the custom marker editable.
	     */

	  }, {
	    key: "setCustomTimeMarker",
	    value: function setCustomTimeMarker(title, id, editable) {
	      var _context12;

	      var customTimes = filter$2(_context12 = this.customTimes).call(_context12, function (component) {
	        return component.options.id === id;
	      });

	      if (customTimes.length === 0) {
	        throw new Error("No custom time bar found with id ".concat(stringify$2(id)));
	      }

	      if (customTimes.length > 0) {
	        customTimes[0].setCustomMarker(title, editable);
	      }
	    }
	    /**
	     * Set a custom title for the custom time bar.
	     * @param {string} [title] Custom title
	     * @param {number} [id=undefined]    Id of the custom time bar.
	     * @returns {*}
	     */

	  }, {
	    key: "setCustomTimeTitle",
	    value: function setCustomTimeTitle(title, id) {
	      var _context13;

	      var customTimes = filter$2(_context13 = this.customTimes).call(_context13, function (component) {
	        return component.options.id === id;
	      });

	      if (customTimes.length === 0) {
	        throw new Error("No custom time bar found with id ".concat(stringify$2(id)));
	      }

	      if (customTimes.length > 0) {
	        return customTimes[0].setCustomTitle(title);
	      }
	    }
	    /**
	     * Retrieve meta information from an event.
	     * Should be overridden by classes extending Core
	     * @param {Event} event
	     * @return {Object} An object with related information.
	     */

	  }, {
	    key: "getEventProperties",
	    value: function getEventProperties(event) {
	      return {
	        event: event
	      };
	    }
	    /**
	     * Add custom vertical bar
	     * @param {Date | string | number} [time]  A Date, unix timestamp, or
	     *                                         ISO date string. Time point where
	     *                                         the new bar should be placed.
	     *                                         If not provided, `new Date()` will
	     *                                         be used.
	     * @param {number | string} [id=undefined] Id of the new bar. Optional
	     * @return {number | string}               Returns the id of the new bar
	     */

	  }, {
	    key: "addCustomTime",
	    value: function addCustomTime(time, id) {
	      var _context14;

	      var timestamp = time !== undefined ? util$1.convert(time, 'Date') : new Date();

	      var exists = some$2(_context14 = this.customTimes).call(_context14, function (customTime) {
	        return customTime.options.id === id;
	      });

	      if (exists) {
	        throw new Error("A custom time with id ".concat(stringify$2(id), " already exists"));
	      }

	      var customTime = new CustomTime(this.body, util$1.extend({}, this.options, {
	        time: timestamp,
	        id: id,
	        snap: this.itemSet ? this.itemSet.options.snap : this.options.snap
	      }));
	      this.customTimes.push(customTime);
	      this.components.push(customTime);

	      this._redraw();

	      return id;
	    }
	    /**
	     * Remove previously added custom bar
	     * @param {int} id ID of the custom bar to be removed
	     * [at]returns {boolean} True if the bar exists and is removed, false otherwise
	     */

	  }, {
	    key: "removeCustomTime",
	    value: function removeCustomTime(id) {
	      var _context15,
	          _this2 = this;

	      var customTimes = filter$2(_context15 = this.customTimes).call(_context15, function (bar) {
	        return bar.options.id === id;
	      });

	      if (customTimes.length === 0) {
	        throw new Error("No custom time bar found with id ".concat(stringify$2(id)));
	      }

	      forEach$2(customTimes).call(customTimes, function (customTime) {
	        var _context16, _context17, _context18, _context19;

	        splice$2(_context16 = _this2.customTimes).call(_context16, indexOf$3(_context17 = _this2.customTimes).call(_context17, customTime), 1);

	        splice$2(_context18 = _this2.components).call(_context18, indexOf$3(_context19 = _this2.components).call(_context19, customTime), 1);

	        customTime.destroy();
	      });
	    }
	    /**
	     * Get the id's of the currently visible items.
	     * @returns {Array} The ids of the visible items
	     */

	  }, {
	    key: "getVisibleItems",
	    value: function getVisibleItems() {
	      return this.itemSet && this.itemSet.getVisibleItems() || [];
	    }
	    /**
	     * Get the id's of the currently visible groups.
	     * @returns {Array} The ids of the visible groups
	     */

	  }, {
	    key: "getVisibleGroups",
	    value: function getVisibleGroups() {
	      return this.itemSet && this.itemSet.getVisibleGroups() || [];
	    }
	    /**
	     * Set Core window such that it fits all items
	     * @param {Object} [options]  Available options:
	     *                                `animation: boolean | {duration: number, easingFunction: string}`
	     *                                    If true (default), the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     * @param {function} [callback] a callback funtion to be executed at the end of this function
	     */

	  }, {
	    key: "fit",
	    value: function fit(options, callback) {
	      var range = this.getDataRange(); // skip range set if there is no min and max date

	      if (range.min === null && range.max === null) {
	        return;
	      } // apply a margin of 1% left and right of the data


	      var interval = range.max - range.min;
	      var min = new Date(range.min.valueOf() - interval * 0.01);
	      var max = new Date(range.max.valueOf() + interval * 0.01);
	      var animation = options && options.animation !== undefined ? options.animation : true;
	      this.range.setRange(min, max, {
	        animation: animation
	      }, callback);
	    }
	    /**
	     * Calculate the data range of the items start and end dates
	     * [at]returns {{min: [Date], max: [Date]}}
	     * @protected
	     */

	  }, {
	    key: "getDataRange",
	    value: function getDataRange() {
	      // must be implemented by Timeline and Graph2d
	      throw new Error('Cannot invoke abstract method getDataRange');
	    }
	    /**
	     * Set the visible window. Both parameters are optional, you can change only
	     * start or only end. Syntax:
	     *
	     *     TimeLine.setWindow(start, end)
	     *     TimeLine.setWindow(start, end, options)
	     *     TimeLine.setWindow(range)
	     *
	     * Where start and end can be a Date, number, or string, and range is an
	     * object with properties start and end.
	     *
	     * @param {Date | number | string | Object} [start] Start date of visible window
	     * @param {Date | number | string} [end]            End date of visible window
	     * @param {Object} [options]  Available options:
	     *                                `animation: boolean | {duration: number, easingFunction: string}`
	     *                                    If true (default), the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     * @param {function} [callback] a callback funtion to be executed at the end of this function
	     */

	  }, {
	    key: "setWindow",
	    value: function setWindow(start, end, options, callback) {
	      if (typeof arguments[2] == "function") {
	        callback = arguments[2];
	        options = {};
	      }

	      var animation;
	      var range;

	      if (arguments.length == 1) {
	        range = arguments[0];
	        animation = range.animation !== undefined ? range.animation : true;
	        this.range.setRange(range.start, range.end, {
	          animation: animation
	        });
	      } else if (arguments.length == 2 && typeof arguments[1] == "function") {
	        range = arguments[0];
	        callback = arguments[1];
	        animation = range.animation !== undefined ? range.animation : true;
	        this.range.setRange(range.start, range.end, {
	          animation: animation
	        }, callback);
	      } else {
	        animation = options && options.animation !== undefined ? options.animation : true;
	        this.range.setRange(start, end, {
	          animation: animation
	        }, callback);
	      }
	    }
	    /**
	     * Move the window such that given time is centered on screen.
	     * @param {Date | number | string} time
	     * @param {Object} [options]  Available options:
	     *                                `animation: boolean | {duration: number, easingFunction: string}`
	     *                                    If true (default), the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     * @param {function} [callback] a callback funtion to be executed at the end of this function
	     */

	  }, {
	    key: "moveTo",
	    value: function moveTo(time, options, callback) {
	      if (typeof arguments[1] == "function") {
	        callback = arguments[1];
	        options = {};
	      }

	      var interval = this.range.end - this.range.start;
	      var t = util$1.convert(time, 'Date').valueOf();
	      var start = t - interval / 2;
	      var end = t + interval / 2;
	      var animation = options && options.animation !== undefined ? options.animation : true;
	      this.range.setRange(start, end, {
	        animation: animation
	      }, callback);
	    }
	    /**
	     * Get the visible window
	     * @return {{start: Date, end: Date}}   Visible range
	     */

	  }, {
	    key: "getWindow",
	    value: function getWindow() {
	      var range = this.range.getRange();
	      return {
	        start: new Date(range.start),
	        end: new Date(range.end)
	      };
	    }
	    /**
	     * Zoom in the window such that given time is centered on screen.
	     * @param {number} percentage - must be between [0..1]
	     * @param {Object} [options]  Available options:
	     *                                `animation: boolean | {duration: number, easingFunction: string}`
	     *                                    If true (default), the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     * @param {function} [callback] a callback funtion to be executed at the end of this function
	     */

	  }, {
	    key: "zoomIn",
	    value: function zoomIn(percentage, options, callback) {
	      if (!percentage || percentage < 0 || percentage > 1) return;

	      if (typeof arguments[1] == "function") {
	        callback = arguments[1];
	        options = {};
	      }

	      var range = this.getWindow();
	      var start = range.start.valueOf();
	      var end = range.end.valueOf();
	      var interval = end - start;
	      var newInterval = interval / (1 + percentage);
	      var distance = (interval - newInterval) / 2;
	      var newStart = start + distance;
	      var newEnd = end - distance;
	      this.setWindow(newStart, newEnd, options, callback);
	    }
	    /**
	     * Zoom out the window such that given time is centered on screen.
	     * @param {number} percentage - must be between [0..1]
	     * @param {Object} [options]  Available options:
	     *                                `animation: boolean | {duration: number, easingFunction: string}`
	     *                                    If true (default), the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     * @param {function} [callback] a callback funtion to be executed at the end of this function
	     */

	  }, {
	    key: "zoomOut",
	    value: function zoomOut(percentage, options, callback) {
	      if (!percentage || percentage < 0 || percentage > 1) return;

	      if (typeof arguments[1] == "function") {
	        callback = arguments[1];
	        options = {};
	      }

	      var range = this.getWindow();
	      var start = range.start.valueOf();
	      var end = range.end.valueOf();
	      var interval = end - start;
	      var newStart = start - interval * percentage / 2;
	      var newEnd = end + interval * percentage / 2;
	      this.setWindow(newStart, newEnd, options, callback);
	    }
	    /**
	     * Force a redraw. Can be overridden by implementations of Core
	     *
	     * Note: this function will be overridden on construction with a trottled version
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      this._redraw();
	    }
	    /**
	     * Redraw for internal use. Redraws all components. See also the public
	     * method redraw.
	     * @protected
	     */

	  }, {
	    key: "_redraw",
	    value: function _redraw() {
	      var _context20;

	      this.redrawCount++;
	      var dom = this.dom;
	      if (!dom || !dom.container || dom.root.offsetWidth == 0) return; // when destroyed, or invisible

	      var resized = false;
	      var options = this.options;
	      var props = this.props;
	      updateHiddenDates(this.options.moment, this.body, this.options.hiddenDates); // update class names

	      if (options.orientation == 'top') {
	        util$1.addClassName(dom.root, 'vis-top');
	        util$1.removeClassName(dom.root, 'vis-bottom');
	      } else {
	        util$1.removeClassName(dom.root, 'vis-top');
	        util$1.addClassName(dom.root, 'vis-bottom');
	      }

	      if (options.rtl) {
	        util$1.addClassName(dom.root, 'vis-rtl');
	        util$1.removeClassName(dom.root, 'vis-ltr');
	      } else {
	        util$1.addClassName(dom.root, 'vis-ltr');
	        util$1.removeClassName(dom.root, 'vis-rtl');
	      } // update root width and height options


	      dom.root.style.maxHeight = util$1.option.asSize(options.maxHeight, '');
	      dom.root.style.minHeight = util$1.option.asSize(options.minHeight, '');
	      dom.root.style.width = util$1.option.asSize(options.width, '');
	      var rootOffsetWidth = dom.root.offsetWidth; // calculate border widths

	      props.border.left = 1;
	      props.border.right = 1;
	      props.border.top = 1;
	      props.border.bottom = 1; // calculate the heights. If any of the side panels is empty, we set the height to
	      // minus the border width, such that the border will be invisible

	      props.center.height = dom.center.offsetHeight;
	      props.left.height = dom.left.offsetHeight;
	      props.right.height = dom.right.offsetHeight;
	      props.top.height = dom.top.clientHeight || -props.border.top;
	      props.bottom.height = dom.bottom.clientHeight || -props.border.bottom; // TODO: compensate borders when any of the panels is empty.
	      // apply auto height
	      // TODO: only calculate autoHeight when needed (else we cause an extra reflow/repaint of the DOM)

	      var contentHeight = Math.max(props.left.height, props.center.height, props.right.height);
	      var autoHeight = props.top.height + contentHeight + props.bottom.height + props.border.top + props.border.bottom;
	      dom.root.style.height = util$1.option.asSize(options.height, "".concat(autoHeight, "px")); // calculate heights of the content panels

	      props.root.height = dom.root.offsetHeight;
	      props.background.height = props.root.height;
	      var containerHeight = props.root.height - props.top.height - props.bottom.height;
	      props.centerContainer.height = containerHeight;
	      props.leftContainer.height = containerHeight;
	      props.rightContainer.height = props.leftContainer.height; // calculate the widths of the panels

	      props.root.width = rootOffsetWidth;
	      props.background.width = props.root.width;

	      if (!this.initialDrawDone) {
	        props.scrollbarWidth = util$1.getScrollBarWidth();
	      }

	      var leftContainerClientWidth = dom.leftContainer.clientWidth;
	      var rightContainerClientWidth = dom.rightContainer.clientWidth;

	      if (options.verticalScroll) {
	        if (options.rtl) {
	          props.left.width = leftContainerClientWidth || -props.border.left;
	          props.right.width = rightContainerClientWidth + props.scrollbarWidth || -props.border.right;
	        } else {
	          props.left.width = leftContainerClientWidth + props.scrollbarWidth || -props.border.left;
	          props.right.width = rightContainerClientWidth || -props.border.right;
	        }
	      } else {
	        props.left.width = leftContainerClientWidth || -props.border.left;
	        props.right.width = rightContainerClientWidth || -props.border.right;
	      }

	      this._setDOM(); // update the scrollTop, feasible range for the offset can be changed
	      // when the height of the Core or of the contents of the center changed


	      var offset = this._updateScrollTop(); // reposition the scrollable contents


	      if (options.orientation.item != 'top') {
	        offset += Math.max(props.centerContainer.height - props.center.height - props.border.top - props.border.bottom, 0);
	      }

	      dom.center.style.transform = "translateY(".concat(offset, "px)"); // show shadows when vertical scrolling is available

	      var visibilityTop = props.scrollTop == 0 ? 'hidden' : '';
	      var visibilityBottom = props.scrollTop == props.scrollTopMin ? 'hidden' : '';
	      dom.shadowTop.style.visibility = visibilityTop;
	      dom.shadowBottom.style.visibility = visibilityBottom;
	      dom.shadowTopLeft.style.visibility = visibilityTop;
	      dom.shadowBottomLeft.style.visibility = visibilityBottom;
	      dom.shadowTopRight.style.visibility = visibilityTop;
	      dom.shadowBottomRight.style.visibility = visibilityBottom;

	      if (options.verticalScroll) {
	        dom.rightContainer.className = 'vis-panel vis-right vis-vertical-scroll';
	        dom.leftContainer.className = 'vis-panel vis-left vis-vertical-scroll';
	        dom.shadowTopRight.style.visibility = "hidden";
	        dom.shadowBottomRight.style.visibility = "hidden";
	        dom.shadowTopLeft.style.visibility = "hidden";
	        dom.shadowBottomLeft.style.visibility = "hidden";
	        dom.left.style.top = '0px';
	        dom.right.style.top = '0px';
	      }

	      if (!options.verticalScroll || props.center.height < props.centerContainer.height) {
	        dom.left.style.top = "".concat(offset, "px");
	        dom.right.style.top = "".concat(offset, "px");
	        dom.rightContainer.className = dom.rightContainer.className.replace(new RegExp('(?:^|\\s)' + 'vis-vertical-scroll' + '(?:\\s|$)'), ' ');
	        dom.leftContainer.className = dom.leftContainer.className.replace(new RegExp('(?:^|\\s)' + 'vis-vertical-scroll' + '(?:\\s|$)'), ' ');
	        props.left.width = leftContainerClientWidth || -props.border.left;
	        props.right.width = rightContainerClientWidth || -props.border.right;

	        this._setDOM();
	      } // enable/disable vertical panning


	      var contentsOverflow = props.center.height > props.centerContainer.height;
	      this.hammer.get('pan').set({
	        direction: contentsOverflow ? Hammer$1.DIRECTION_ALL : Hammer$1.DIRECTION_HORIZONTAL
	      }); // set the long press time

	      this.hammer.get('press').set({
	        time: this.options.longSelectPressTime
	      }); // redraw all components

	      forEach$2(_context20 = this.components).call(_context20, function (component) {
	        resized = component.redraw() || resized;
	      });

	      var MAX_REDRAW = 5;

	      if (resized) {
	        if (this.redrawCount < MAX_REDRAW) {
	          this.body.emitter.emit('_change');
	          return;
	        } else {
	          console.log('WARNING: infinite loop in redraw?');
	        }
	      } else {
	        this.redrawCount = 0;
	      } //Emit public 'changed' event for UI updates, see issue #1592


	      this.body.emitter.emit("changed");
	    }
	    /**
	     * sets the basic DOM components needed for the timeline\graph2d
	     */

	  }, {
	    key: "_setDOM",
	    value: function _setDOM() {
	      var props = this.props;
	      var dom = this.dom;
	      props.leftContainer.width = props.left.width;
	      props.rightContainer.width = props.right.width;
	      var centerWidth = props.root.width - props.left.width - props.right.width;
	      props.center.width = centerWidth;
	      props.centerContainer.width = centerWidth;
	      props.top.width = centerWidth;
	      props.bottom.width = centerWidth; // resize the panels

	      dom.background.style.height = "".concat(props.background.height, "px");
	      dom.backgroundVertical.style.height = "".concat(props.background.height, "px");
	      dom.backgroundHorizontal.style.height = "".concat(props.centerContainer.height, "px");
	      dom.centerContainer.style.height = "".concat(props.centerContainer.height, "px");
	      dom.leftContainer.style.height = "".concat(props.leftContainer.height, "px");
	      dom.rightContainer.style.height = "".concat(props.rightContainer.height, "px");
	      dom.background.style.width = "".concat(props.background.width, "px");
	      dom.backgroundVertical.style.width = "".concat(props.centerContainer.width, "px");
	      dom.backgroundHorizontal.style.width = "".concat(props.background.width, "px");
	      dom.centerContainer.style.width = "".concat(props.center.width, "px");
	      dom.top.style.width = "".concat(props.top.width, "px");
	      dom.bottom.style.width = "".concat(props.bottom.width, "px"); // reposition the panels

	      dom.background.style.left = '0';
	      dom.background.style.top = '0';
	      dom.backgroundVertical.style.left = "".concat(props.left.width + props.border.left, "px");
	      dom.backgroundVertical.style.top = '0';
	      dom.backgroundHorizontal.style.left = '0';
	      dom.backgroundHorizontal.style.top = "".concat(props.top.height, "px");
	      dom.centerContainer.style.left = "".concat(props.left.width, "px");
	      dom.centerContainer.style.top = "".concat(props.top.height, "px");
	      dom.leftContainer.style.left = '0';
	      dom.leftContainer.style.top = "".concat(props.top.height, "px");
	      dom.rightContainer.style.left = "".concat(props.left.width + props.center.width, "px");
	      dom.rightContainer.style.top = "".concat(props.top.height, "px");
	      dom.top.style.left = "".concat(props.left.width, "px");
	      dom.top.style.top = '0';
	      dom.bottom.style.left = "".concat(props.left.width, "px");
	      dom.bottom.style.top = "".concat(props.top.height + props.centerContainer.height, "px");
	      dom.center.style.left = '0';
	      dom.left.style.left = '0';
	      dom.right.style.left = '0';
	    }
	    /**
	     * Set a current time. This can be used for example to ensure that a client's
	     * time is synchronized with a shared server time.
	     * Only applicable when option `showCurrentTime` is true.
	     * @param {Date | string | number} time     A Date, unix timestamp, or
	     *                                          ISO date string.
	     */

	  }, {
	    key: "setCurrentTime",
	    value: function setCurrentTime(time) {
	      if (!this.currentTime) {
	        throw new Error('Option showCurrentTime must be true');
	      }

	      this.currentTime.setCurrentTime(time);
	    }
	    /**
	     * Get the current time.
	     * Only applicable when option `showCurrentTime` is true.
	     * @return {Date} Returns the current time.
	     */

	  }, {
	    key: "getCurrentTime",
	    value: function getCurrentTime() {
	      if (!this.currentTime) {
	        throw new Error('Option showCurrentTime must be true');
	      }

	      return this.currentTime.getCurrentTime();
	    }
	    /**
	     * Convert a position on screen (pixels) to a datetime
	     * @param {int}     x    Position on the screen in pixels
	     * @return {Date}   time The datetime the corresponds with given position x
	     * @protected
	     * TODO: move this function to Range
	     */

	  }, {
	    key: "_toTime",
	    value: function _toTime(x) {
	      return toTime(this, x, this.props.center.width);
	    }
	    /**
	     * Convert a position on the global screen (pixels) to a datetime
	     * @param {int}     x    Position on the screen in pixels
	     * @return {Date}   time The datetime the corresponds with given position x
	     * @protected
	     * TODO: move this function to Range
	     */

	  }, {
	    key: "_toGlobalTime",
	    value: function _toGlobalTime(x) {
	      return toTime(this, x, this.props.root.width); //var conversion = this.range.conversion(this.props.root.width);
	      //return new Date(x / conversion.scale + conversion.offset);
	    }
	    /**
	     * Convert a datetime (Date object) into a position on the screen
	     * @param {Date}   time A date
	     * @return {int}   x    The position on the screen in pixels which corresponds
	     *                      with the given date.
	     * @protected
	     * TODO: move this function to Range
	     */

	  }, {
	    key: "_toScreen",
	    value: function _toScreen(time) {
	      return toScreen(this, time, this.props.center.width);
	    }
	    /**
	     * Convert a datetime (Date object) into a position on the root
	     * This is used to get the pixel density estimate for the screen, not the center panel
	     * @param {Date}   time A date
	     * @return {int}   x    The position on root in pixels which corresponds
	     *                      with the given date.
	     * @protected
	     * TODO: move this function to Range
	     */

	  }, {
	    key: "_toGlobalScreen",
	    value: function _toGlobalScreen(time) {
	      return toScreen(this, time, this.props.root.width); //var conversion = this.range.conversion(this.props.root.width);
	      //return (time.valueOf() - conversion.offset) * conversion.scale;
	    }
	    /**
	     * Initialize watching when option autoResize is true
	     * @private
	     */

	  }, {
	    key: "_initAutoResize",
	    value: function _initAutoResize() {
	      if (this.options.autoResize == true) {
	        this._startAutoResize();
	      } else {
	        this._stopAutoResize();
	      }
	    }
	    /**
	     * Watch for changes in the size of the container. On resize, the Panel will
	     * automatically redraw itself.
	     * @private
	     */

	  }, {
	    key: "_startAutoResize",
	    value: function _startAutoResize() {
	      var me = this;

	      this._stopAutoResize();

	      this._onResize = function () {
	        if (me.options.autoResize != true) {
	          // stop watching when the option autoResize is changed to false
	          me._stopAutoResize();

	          return;
	        }

	        if (me.dom.root) {
	          var rootOffsetHeight = me.dom.root.offsetHeight;
	          var rootOffsetWidth = me.dom.root.offsetWidth; // check whether the frame is resized
	          // Note: we compare offsetWidth here, not clientWidth. For some reason,
	          // IE does not restore the clientWidth from 0 to the actual width after
	          // changing the timeline's container display style from none to visible

	          if (rootOffsetWidth != me.props.lastWidth || rootOffsetHeight != me.props.lastHeight) {
	            me.props.lastWidth = rootOffsetWidth;
	            me.props.lastHeight = rootOffsetHeight;
	            me.props.scrollbarWidth = util$1.getScrollBarWidth();
	            me.body.emitter.emit('_change');
	          }
	        }
	      }; // add event listener to window resize


	      util$1.addEventListener(window, 'resize', this._onResize); //Prevent initial unnecessary redraw

	      if (me.dom.root) {
	        me.props.lastWidth = me.dom.root.offsetWidth;
	        me.props.lastHeight = me.dom.root.offsetHeight;
	      }

	      this.watchTimer = setInterval$1(this._onResize, 1000);
	    }
	    /**
	     * Stop watching for a resize of the frame.
	     * @private
	     */

	  }, {
	    key: "_stopAutoResize",
	    value: function _stopAutoResize() {
	      if (this.watchTimer) {
	        clearInterval(this.watchTimer);
	        this.watchTimer = undefined;
	      } // remove event listener on window.resize


	      if (this._onResize) {
	        util$1.removeEventListener(window, 'resize', this._onResize);
	        this._onResize = null;
	      }
	    }
	    /**
	     * Start moving the timeline vertically
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onTouch",
	    value: function _onTouch(event) {
	      // eslint-disable-line no-unused-vars
	      this.touch.allowDragging = true;
	      this.touch.initialScrollTop = this.props.scrollTop;
	    }
	    /**
	     * Start moving the timeline vertically
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onPinch",
	    value: function _onPinch(event) {
	      // eslint-disable-line no-unused-vars
	      this.touch.allowDragging = false;
	    }
	    /**
	     * Move the timeline vertically
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDrag",
	    value: function _onDrag(event) {
	      if (!event) return; // refuse to drag when we where pinching to prevent the timeline make a jump
	      // when releasing the fingers in opposite order from the touch screen

	      if (!this.touch.allowDragging) return;
	      var delta = event.deltaY;

	      var oldScrollTop = this._getScrollTop();

	      var newScrollTop = this._setScrollTop(this.touch.initialScrollTop + delta);

	      if (this.options.verticalScroll) {
	        this.dom.left.parentNode.scrollTop = -this.props.scrollTop;
	        this.dom.right.parentNode.scrollTop = -this.props.scrollTop;
	      }

	      if (newScrollTop != oldScrollTop) {
	        this.emit("verticalDrag");
	      }
	    }
	    /**
	     * Apply a scrollTop
	     * @param {number} scrollTop
	     * @returns {number} scrollTop  Returns the applied scrollTop
	     * @private
	     */

	  }, {
	    key: "_setScrollTop",
	    value: function _setScrollTop(scrollTop) {
	      this.props.scrollTop = scrollTop;

	      this._updateScrollTop();

	      return this.props.scrollTop;
	    }
	    /**
	     * Update the current scrollTop when the height of  the containers has been changed
	     * @returns {number} scrollTop  Returns the applied scrollTop
	     * @private
	     */

	  }, {
	    key: "_updateScrollTop",
	    value: function _updateScrollTop() {
	      // recalculate the scrollTopMin
	      var scrollTopMin = Math.min(this.props.centerContainer.height - this.props.center.height, 0); // is negative or zero

	      if (scrollTopMin != this.props.scrollTopMin) {
	        // in case of bottom orientation, change the scrollTop such that the contents
	        // do not move relative to the time axis at the bottom
	        if (this.options.orientation.item != 'top') {
	          this.props.scrollTop += scrollTopMin - this.props.scrollTopMin;
	        }

	        this.props.scrollTopMin = scrollTopMin;
	      } // limit the scrollTop to the feasible scroll range


	      if (this.props.scrollTop > 0) this.props.scrollTop = 0;
	      if (this.props.scrollTop < scrollTopMin) this.props.scrollTop = scrollTopMin;

	      if (this.options.verticalScroll) {
	        this.dom.left.parentNode.scrollTop = -this.props.scrollTop;
	        this.dom.right.parentNode.scrollTop = -this.props.scrollTop;
	      }

	      this._isProgramaticallyScrolled = true;
	      return this.props.scrollTop;
	    }
	    /**
	     * Get the current scrollTop
	     * @returns {number} scrollTop
	     * @private
	     */

	  }, {
	    key: "_getScrollTop",
	    value: function _getScrollTop() {
	      return this.props.scrollTop;
	    }
	    /**
	     * Load a configurator
	     * [at]returns {Object}
	     * @private
	     */

	  }, {
	    key: "_createConfigurator",
	    value: function _createConfigurator() {
	      throw new Error('Cannot invoke abstract method _createConfigurator');
	    }
	  }]);

	  return Core;
	}(); // turn Core into an event emitter


	componentEmitter(Core.prototype);

	function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * A current time bar
	 */

	var CurrentTime = /*#__PURE__*/function (_Component) {
	  inherits(CurrentTime, _Component);

	  var _super = _createSuper$3(CurrentTime);

	  /**
	   * @param {{range: Range, dom: Object, domProps: Object}} body
	   * @param {Object} [options]        Available parameters:
	   *                                  {Boolean} [showCurrentTime]
	   *                                  {String}  [alignCurrentTime]
	   * @constructor CurrentTime
	   * @extends Component
	   */
	  function CurrentTime(body, options) {
	    var _context;

	    var _this;

	    classCallCheck(this, CurrentTime);

	    _this = _super.call(this);
	    _this.body = body; // default options

	    _this.defaultOptions = {
	      rtl: false,
	      showCurrentTime: true,
	      alignCurrentTime: undefined,
	      moment: moment,
	      locales: locales,
	      locale: 'en'
	    };
	    _this.options = util$1.extend({}, _this.defaultOptions);

	    _this.setOptions(options);

	    _this.options.locales = util$1.extend({}, locales, _this.options.locales);
	    var defaultLocales = _this.defaultOptions.locales[_this.defaultOptions.locale];

	    forEach$2(_context = keys$3(_this.options.locales)).call(_context, function (locale) {
	      _this.options.locales[locale] = util$1.extend({}, defaultLocales, _this.options.locales[locale]);
	    });

	    _this.offset = 0;

	    _this._create();

	    return _this;
	  }
	  /**
	   * Create the HTML DOM for the current time bar
	   * @private
	   */


	  createClass(CurrentTime, [{
	    key: "_create",
	    value: function _create() {
	      var bar = document.createElement('div');
	      bar.className = 'vis-current-time';
	      bar.style.position = 'absolute';
	      bar.style.top = '0px';
	      bar.style.height = '100%';
	      this.bar = bar;
	    }
	    /**
	     * Destroy the CurrentTime bar
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.options.showCurrentTime = false;
	      this.redraw(); // will remove the bar from the DOM and stop refreshing

	      this.body = null;
	    }
	    /**
	     * Set options for the component. Options will be merged in current options.
	     * @param {Object} options  Available parameters:
	     *                          {boolean} [showCurrentTime]
	     *                          {String}  [alignCurrentTime]
	     */

	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options) {
	        // copy all options that we know
	        util$1.selectiveExtend(['rtl', 'showCurrentTime', 'alignCurrentTime', 'moment', 'locale', 'locales'], this.options, options);
	      }
	    }
	    /**
	     * Repaint the component
	     * @return {boolean} Returns true if the component is resized
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      if (this.options.showCurrentTime) {
	        var _context2, _context3;

	        var parent = this.body.dom.backgroundVertical;

	        if (this.bar.parentNode != parent) {
	          // attach to the dom
	          if (this.bar.parentNode) {
	            this.bar.parentNode.removeChild(this.bar);
	          }

	          parent.appendChild(this.bar);
	          this.start();
	        }

	        var now = this.options.moment(now$2() + this.offset);

	        if (this.options.alignCurrentTime) {
	          now = now.startOf(this.options.alignCurrentTime);
	        }

	        var x = this.body.util.toScreen(now);
	        var locale = this.options.locales[this.options.locale];

	        if (!locale) {
	          if (!this.warned) {
	            console.warn("WARNING: options.locales['".concat(this.options.locale, "'] not found. See https://visjs.github.io/vis-timeline/docs/timeline/#Localization"));
	            this.warned = true;
	          }

	          locale = this.options.locales['en']; // fall back on english when not available
	        }

	        var title = concat$2(_context2 = concat$2(_context3 = "".concat(locale.current, " ")).call(_context3, locale.time, ": ")).call(_context2, now.format('dddd, MMMM Do YYYY, H:mm:ss'));

	        title = title.charAt(0).toUpperCase() + title.substring(1);

	        if (this.options.rtl) {
	          this.bar.style.transform = "translateX(".concat(x * -1, "px)");
	        } else {
	          this.bar.style.transform = "translateX(".concat(x, "px)");
	        }

	        this.bar.title = title;
	      } else {
	        // remove the line from the DOM
	        if (this.bar.parentNode) {
	          this.bar.parentNode.removeChild(this.bar);
	        }

	        this.stop();
	      }

	      return false;
	    }
	    /**
	     * Start auto refreshing the current time bar
	     */

	  }, {
	    key: "start",
	    value: function start() {
	      var me = this;
	      /**
	       *  Updates the current time.
	       */

	      function update() {
	        me.stop(); // determine interval to refresh

	        var scale = me.body.range.conversion(me.body.domProps.center.width).scale;
	        var interval = 1 / scale / 10;
	        if (interval < 30) interval = 30;
	        if (interval > 1000) interval = 1000;
	        me.redraw();
	        me.body.emitter.emit('currentTimeTick'); // start a renderTimer to adjust for the new time

	        me.currentTimeTimer = setTimeout$2(update, interval);
	      }

	      update();
	    }
	    /**
	     * Stop auto refreshing the current time bar
	     */

	  }, {
	    key: "stop",
	    value: function stop() {
	      if (this.currentTimeTimer !== undefined) {
	        clearTimeout(this.currentTimeTimer);
	        delete this.currentTimeTimer;
	      }
	    }
	    /**
	     * Set a current time. This can be used for example to ensure that a client's
	     * time is synchronized with a shared server time.
	     * @param {Date | string | number} time     A Date, unix timestamp, or
	     *                                          ISO date string.
	     */

	  }, {
	    key: "setCurrentTime",
	    value: function setCurrentTime(time) {
	      var t = util$1.convert(time, 'Date').valueOf();

	      var now = now$2();

	      this.offset = t - now;
	      this.redraw();
	    }
	    /**
	     * Get the current time.
	     * @return {Date} Returns the current time.
	     */

	  }, {
	    key: "getCurrentTime",
	    value: function getCurrentTime() {
	      return new Date(now$2() + this.offset);
	    }
	  }]);

	  return CurrentTime;
	}(Component);

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	  var defineProperty = objectDefineProperty.f;
	  var METADATA = uid('meta');
	  var id = 0;

	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };

	  var setMetadata = function (it) {
	    defineProperty(it, METADATA, {
	      value: {
	        objectID: 'O' + ++id,
	        // object ID
	        weakData: {} // weak collections IDs

	      }
	    });
	  };

	  var fastKey = function (it, create) {
	    // return a primitive with prefix
	    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

	    if (!has(it, METADATA)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

	      if (!create) return 'E'; // add missing metadata

	      setMetadata(it); // return object ID
	    }

	    return it[METADATA].objectID;
	  };

	  var getWeakData = function (it, create) {
	    if (!has(it, METADATA)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return true; // not necessary to add metadata

	      if (!create) return false; // add missing metadata

	      setMetadata(it); // return the store of weak collections IDs
	    }

	    return it[METADATA].weakData;
	  }; // add metadata on freeze-family methods calling


	  var onFreeze = function (it) {
	    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	    return it;
	  };

	  var meta = module.exports = {
	    REQUIRED: false,
	    fastKey: fastKey,
	    getWeakData: getWeakData,
	    onFreeze: onFreeze
	  };
	  hiddenKeys[METADATA] = true;
	});

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    }

	    return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      }

	      return new Result(false);
	    }

	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;

	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator);
	      throw error;
	    }

	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  }

	  return new Result(false);
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  }

	  return it;
	};

	var defineProperty$9 = objectDefineProperty.f;
	var forEach$4 = arrayIteration.forEach;
	var setInternalState$3 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var exported = {};
	  var Constructor;

	  if (!descriptors || typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  }))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else {
	    Constructor = wrapper(function (target, iterable) {
	      setInternalState$3(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
	        type: CONSTRUCTOR_NAME,
	        collection: new NativeConstructor()
	      });
	      if (iterable != undefined) iterate(iterable, target[ADDER], {
	        that: target,
	        AS_ENTRIES: IS_MAP
	      });
	    });
	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    forEach$4(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';

	      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
	        createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
	          var collection = getInternalState(this).collection;
	          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
	          var result = collection[KEY](a === 0 ? 0 : a, b);
	          return IS_ADDER ? this : result;
	        });
	      }
	    });
	    IS_WEAK || defineProperty$9(Constructor.prototype, 'size', {
	      configurable: true,
	      get: function () {
	        return getInternalState(this).collection.size;
	      }
	    });
	  }

	  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);
	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({
	    global: true,
	    forced: true
	  }, exported);
	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];else redefine(target, key, src[key], options);
	  }

	  return target;
	};

	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () {
	        return this;
	      }
	    });
	  }
	};

	var defineProperty$a = objectDefineProperty.f;
	var fastKey = internalMetadata.fastKey;
	var setInternalState$4 = internalState.set;
	var internalStateGetterFor$1 = internalState.getterFor;
	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$4(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate(iterable, that[ADDER], {
	        that: that,
	        AS_ENTRIES: IS_MAP
	      });
	    });
	    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index; // change existing entry

	      if (entry) {
	        entry.value = value; // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;else that.size++; // add to index

	        if (index !== 'F') state.index[index] = entry;
	      }

	      return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that); // fast case

	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index]; // frozen object case

	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;

	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }

	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);

	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;else that.size--;
	        }

	        return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn
	      /* , that = undefined */
	      ) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;

	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this); // revert to the last existing entry

	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$a(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$4(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last; // revert to the last existing entry

	      while (entry && entry.removed) entry = entry.previous; // get next entry


	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return {
	          value: undefined,
	          done: true
	        };
	      } // return step by kind


	      if (kind == 'keys') return {
	        value: entry.key,
	        done: false
	      };
	      if (kind == 'values') return {
	        value: entry.value,
	        done: false
	      };
	      return {
	        value: [entry.key, entry.value],
	        done: false
	      };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// https://tc39.github.io/ecma262/#sec-set-objects


	var es_set = collection('Set', function (init) {
	  return function Set() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	}, collectionStrong);

	var set$1 = path.Set;

	var set$2 = set$1;

	var set$3 = set$2;

	var $find = arrayIteration.find;
	var FIND = 'find';
	var SKIPS_HOLES = true;
	var USES_TO_LENGTH$8 = arrayMethodUsesToLength(FIND); // Shouldn't skip holes

	if (FIND in []) Array(1)[FIND](function () {
	  SKIPS_HOLES = false;
	}); // `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find

	_export({
	  target: 'Array',
	  proto: true,
	  forced: SKIPS_HOLES || !USES_TO_LENGTH$8
	}, {
	  find: function find(callbackfn
	  /* , that = undefined */
	  ) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	var find = entryVirtual('Array').find;

	var ArrayPrototype$b = Array.prototype;

	var find_1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype$b || it instanceof Array && own === ArrayPrototype$b.find ? find : own;
	};

	var find$1 = find_1;

	var find$2 = find$1;

	// Unique ID creation requires a high quality random # generator. In the browser we therefore
	// require the crypto API and do not support built-in fallback to lower quality random number
	// generators (like Math.random()).
	// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
	// find the complete implementation of crypto (msCrypto) on IE11.
	var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
	var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

	function rng() {
	  if (!getRandomValues) {
	    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
	  }

	  return getRandomValues(rnds8);
	}

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	var byteToHex = [];

	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

	  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
	}

	function v4(options, buf, offset) {
	  var i = buf && offset || 0;

	  if (typeof options == 'string') {
	    buf = options === 'binary' ? new Array(16) : null;
	    options = null;
	  }

	  options = options || {};
	  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

	  rnds[6] = rnds[6] & 0x0f | 0x40;
	  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || bytesToUuid(rnds);
	}

	var $includes = arrayIncludes.includes;
	var USES_TO_LENGTH$9 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !USES_TO_LENGTH$9
	}, {
	  includes: function includes(el
	  /* , fromIndex = 0 */
	  ) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	var includes = entryVirtual('Array').includes;

	var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp

	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  }

	  return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;

	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) {
	      /* empty */
	    }
	  }

	  return false;
	};

	// https://tc39.github.io/ecma262/#sec-string.prototype.includes


	_export({
	  target: 'String',
	  proto: true,
	  forced: !correctIsRegexpLogic('includes')
	}, {
	  includes: function includes(searchString
	  /* , position = 0 */
	  ) {
	    return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var includes$1 = entryVirtual('String').includes;

	var ArrayPrototype$c = Array.prototype;
	var StringPrototype$2 = String.prototype;

	var includes$2 = function (it) {
	  var own = it.includes;
	  if (it === ArrayPrototype$c || it instanceof Array && own === ArrayPrototype$c.includes) return includes;

	  if (typeof it === 'string' || it === StringPrototype$2 || it instanceof String && own === StringPrototype$2.includes) {
	    return includes$1;
	  }

	  return own;
	};

	var includes$3 = includes$2;

	var includes$4 = includes$3;

	// Utility functions for ordering and stacking of items
	var EPSILON = 0.001; // used when checking collisions, to prevent round-off errors

	/**
	 * Order items by their start data
	 * @param {Item[]} items
	 */

	function orderByStart(items) {
	  sort$2(items).call(items, function (a, b) {
	    return a.data.start - b.data.start;
	  });
	}
	/**
	 * Order items by their end date. If they have no end date, their start date
	 * is used.
	 * @param {Item[]} items
	 */

	function orderByEnd(items) {
	  sort$2(items).call(items, function (a, b) {
	    var aTime = 'end' in a.data ? a.data.end : a.data.start;
	    var bTime = 'end' in b.data ? b.data.end : b.data.start;
	    return aTime - bTime;
	  });
	}
	/**
	 * Adjust vertical positions of the items such that they don't overlap each
	 * other.
	 * @param {Item[]} items
	 *            All visible items
	 * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
	 *            Margins between items and between items and the axis.
	 * @param {boolean} [force=false]
	 *            If true, all items will be repositioned. If false (default), only
	 *            items having a top===null will be re-stacked
	 * @param {function} shouldBailItemsRedrawFunction
	 *            bailing function
	 * @return {boolean} shouldBail
	 */

	function stack(items, margin, force, shouldBailItemsRedrawFunction) {
	  if (force) {
	    // reset top position of all items
	    for (var i = 0; i < items.length; i++) {
	      items[i].top = null;
	    }
	  } // calculate new, non-overlapping positions


	  for (var i = 0; i < items.length; i++) {
	    // eslint-disable-line no-redeclare
	    var item = items[i];

	    if (item.stack && item.top === null) {
	      // initialize top position
	      item.top = margin.axis;
	      var shouldBail = false;

	      do {
	        // TODO: optimize checking for overlap. when there is a gap without items,
	        //       you only need to check for items from the next item on, not from zero
	        var collidingItem = null;

	        for (var j = 0, jj = items.length; j < jj; j++) {
	          var other = items[j];
	          shouldBail = shouldBailItemsRedrawFunction() || false;

	          if (shouldBail) {
	            return true;
	          }

	          if (other.top !== null && other !== item && other.stack && collision(item, other, margin.item, other.options.rtl)) {
	            collidingItem = other;
	            break;
	          }
	        }

	        if (collidingItem != null) {
	          // There is a collision. Reposition the items above the colliding element
	          item.top = collidingItem.top + collidingItem.height + margin.item.vertical;
	        }
	      } while (collidingItem);
	    }
	  }

	  return shouldBail;
	}
	/**
	 * Adjust vertical positions of the items within a single subgroup such that they
	 * don't overlap each other.
	 * @param {Item[]} items
	 *            All items withina subgroup
	 * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
	 *            Margins between items and between items and the axis.
	 * @param {subgroup} subgroup
	 *            The subgroup that is being stacked
	 */

	function substack(items, margin, subgroup) {
	  for (var i = 0; i < items.length; i++) {
	    items[i].top = null;
	  } // Set the initial height


	  var subgroupHeight = subgroup.height; // calculate new, non-overlapping positions

	  for (i = 0; i < items.length; i++) {
	    var item = items[i];

	    if (item.stack && item.top === null) {
	      // initialize top position
	      item.top = item.baseTop; //margin.axis + item.baseTop;

	      do {
	        // TODO: optimize checking for overlap. when there is a gap without items,
	        //       you only need to check for items from the next item on, not from zero
	        var collidingItem = null;

	        for (var j = 0, jj = items.length; j < jj; j++) {
	          var other = items[j];

	          if (other.top !== null && other !== item
	          /*&& other.stack*/
	          && collision(item, other, margin.item, other.options.rtl)) {
	            collidingItem = other;
	            break;
	          }
	        }

	        if (collidingItem != null) {
	          // There is a collision. Reposition the items above the colliding element
	          item.top = collidingItem.top + collidingItem.height + margin.item.vertical; // + item.baseTop;
	        }

	        if (item.top + item.height > subgroupHeight) {
	          subgroupHeight = item.top + item.height;
	        }
	      } while (collidingItem);
	    }
	  } // Set the new height


	  subgroup.height = subgroupHeight - subgroup.top + 0.5 * margin.item.vertical;
	}
	/**
	 * Adjust vertical positions of the items without stacking them
	 * @param {Item[]} items
	 *            All visible items
	 * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
	 *            Margins between items and between items and the axis.
	 * @param {subgroups[]} subgroups
	 *            All subgroups
	 * @param {boolean} isStackSubgroups
	 */

	function nostack(items, margin, subgroups, isStackSubgroups) {
	  for (var i = 0; i < items.length; i++) {
	    if (items[i].data.subgroup == undefined) {
	      items[i].top = margin.item.vertical;
	    } else if (items[i].data.subgroup !== undefined && isStackSubgroups) {
	      var newTop = 0;

	      for (var subgroup in subgroups) {
	        if (subgroups.hasOwnProperty(subgroup)) {
	          if (subgroups[subgroup].visible == true && subgroups[subgroup].index < subgroups[items[i].data.subgroup].index) {
	            newTop += subgroups[subgroup].height;
	            subgroups[items[i].data.subgroup].top = newTop;
	          }
	        }
	      }

	      items[i].top = newTop + 0.5 * margin.item.vertical;
	    }
	  }

	  if (!isStackSubgroups) {
	    stackSubgroups(items, margin, subgroups);
	  }
	}
	/**
	 * Adjust vertical positions of the subgroups such that they don't overlap each
	 * other.
	 * @param {Array.<timeline.Item>} items
	 * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin Margins between items and between items and the axis.
	 * @param {subgroups[]} subgroups
	 *            All subgroups
	 */

	function stackSubgroups(items, margin, subgroups) {
	  for (var subgroup in subgroups) {
	    if (subgroups.hasOwnProperty(subgroup)) {
	      subgroups[subgroup].top = 0;

	      do {
	        // TODO: optimize checking for overlap. when there is a gap without items,
	        //       you only need to check for items from the next item on, not from zero
	        var collidingItem = null;

	        for (var otherSubgroup in subgroups) {
	          if (subgroups[otherSubgroup].top !== null && otherSubgroup !== subgroup && subgroups[subgroup].index > subgroups[otherSubgroup].index && collisionByTimes(subgroups[subgroup], subgroups[otherSubgroup])) {
	            collidingItem = subgroups[otherSubgroup];
	            break;
	          }
	        }

	        if (collidingItem != null) {
	          // There is a collision. Reposition the subgroups above the colliding element
	          subgroups[subgroup].top = collidingItem.top + collidingItem.height;
	        }
	      } while (collidingItem);
	    }
	  }

	  for (var i = 0; i < items.length; i++) {
	    if (items[i].data.subgroup !== undefined) {
	      items[i].top = subgroups[items[i].data.subgroup].top + 0.5 * margin.item.vertical;
	    }
	  }
	}
	/**
	 * Adjust vertical positions of the subgroups such that they don't overlap each
	 * other, then stacks the contents of each subgroup individually.
	 * @param {Item[]} subgroupItems
	 *            All the items in a subgroup
	 * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
	 *            Margins between items and between items and the axis.
	 * @param {subgroups[]} subgroups
	 *            All subgroups
	 */

	function stackSubgroupsWithInnerStack(subgroupItems, margin, subgroups) {
	  var doSubStack = false; // Run subgroups in their order (if any)

	  var subgroupOrder = [];

	  for (var subgroup in subgroups) {
	    if (subgroups[subgroup].hasOwnProperty("index")) {
	      subgroupOrder[subgroups[subgroup].index] = subgroup;
	    } else {
	      subgroupOrder.push(subgroup);
	    }
	  }

	  for (var j = 0; j < subgroupOrder.length; j++) {
	    subgroup = subgroupOrder[j];

	    if (subgroups.hasOwnProperty(subgroup)) {
	      doSubStack = doSubStack || subgroups[subgroup].stack;
	      subgroups[subgroup].top = 0;

	      for (var otherSubgroup in subgroups) {
	        if (subgroups[otherSubgroup].visible && subgroups[subgroup].index > subgroups[otherSubgroup].index) {
	          subgroups[subgroup].top += subgroups[otherSubgroup].height;
	        }
	      }

	      var items = subgroupItems[subgroup];

	      for (var i = 0; i < items.length; i++) {
	        if (items[i].data.subgroup !== undefined) {
	          items[i].top = subgroups[items[i].data.subgroup].top + 0.5 * margin.item.vertical;

	          if (subgroups[subgroup].stack) {
	            items[i].baseTop = items[i].top;
	          }
	        }
	      }

	      if (doSubStack && subgroups[subgroup].stack) {
	        substack(subgroupItems[subgroup], margin, subgroups[subgroup]);
	      }
	    }
	  }
	}
	/**
	 * Test if the two provided items collide
	 * The items must have parameters left, width, top, and height.
	 * @param {Item} a          The first item
	 * @param {Item} b          The second item
	 * @param {{horizontal: number, vertical: number}} margin
	 *                          An object containing a horizontal and vertical
	 *                          minimum required margin.
	 * @param {boolean} rtl
	 * @return {boolean}        true if a and b collide, else false
	 */

	function collision(a, b, margin, rtl) {
	  if (rtl) {
	    return a.right - margin.horizontal + EPSILON < b.right + b.width && a.right + a.width + margin.horizontal - EPSILON > b.right && a.top - margin.vertical + EPSILON < b.top + b.height && a.top + a.height + margin.vertical - EPSILON > b.top;
	  } else {
	    return a.left - margin.horizontal + EPSILON < b.left + b.width && a.left + a.width + margin.horizontal - EPSILON > b.left && a.top - margin.vertical + EPSILON < b.top + b.height && a.top + a.height + margin.vertical - EPSILON > b.top;
	  }
	}
	/**
	 * Test if the two provided objects collide
	 * The objects must have parameters start, end, top, and height.
	 * @param {Object} a          The first Object
	 * @param {Object} b          The second Object
	 * @return {boolean}        true if a and b collide, else false
	 */

	function collisionByTimes(a, b) {
	  // Check for overlap by time and height. Abutting is OK and
	  // not considered a collision while overlap is considered a collision.
	  var timeOverlap = a.start < b.end && a.end > b.start;
	  var heightOverlap = a.top < b.top + b.height && a.top + a.height > b.top;
	  return timeOverlap && heightOverlap;
	}

	var stack$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		orderByStart: orderByStart,
		orderByEnd: orderByEnd,
		stack: stack,
		substack: substack,
		nostack: nostack,
		stackSubgroups: stackSubgroups,
		stackSubgroupsWithInnerStack: stackSubgroupsWithInnerStack,
		collision: collision,
		collisionByTimes: collisionByTimes
	});

	var UNGROUPED = '__ungrouped__'; // reserved group id for ungrouped items

	var BACKGROUND = '__background__'; // reserved group id for background items without group

	var ReservedGroupIds = {
	  UNGROUPED: UNGROUPED,
	  BACKGROUND: BACKGROUND
	};
	/**
	 * @constructor Group
	 */

	var Group = /*#__PURE__*/function () {
	  /**
	  * @param {number | string} groupId
	  * @param {Object} data
	  * @param {ItemSet} itemSet
	  * @constructor Group
	  */
	  function Group(groupId, data, itemSet) {
	    var _this = this;

	    classCallCheck(this, Group);

	    this.groupId = groupId;
	    this.subgroups = {};
	    this.subgroupStack = {};
	    this.subgroupStackAll = false;
	    this.subgroupVisibility = {};
	    this.doInnerStack = false;
	    this.shouldBailStackItems = false;
	    this.subgroupIndex = 0;
	    this.subgroupOrderer = data && data.subgroupOrder;
	    this.itemSet = itemSet;
	    this.isVisible = null;
	    this.stackDirty = true; // if true, items will be restacked on next redraw
	    // This is a stack of functions (`() => void`) that will be executed before
	    // the instance is disposed off (method `dispose`). Anything that needs to
	    // be manually disposed off before garbage collection happens (or so that
	    // garbage collection can happen) should be added to this stack.

	    this._disposeCallbacks = [];

	    if (data && data.nestedGroups) {
	      this.nestedGroups = data.nestedGroups;

	      if (data.showNested == false) {
	        this.showNested = false;
	      } else {
	        this.showNested = true;
	      }
	    }

	    if (data && data.subgroupStack) {
	      if (typeof data.subgroupStack === "boolean") {
	        this.doInnerStack = data.subgroupStack;
	        this.subgroupStackAll = data.subgroupStack;
	      } else {
	        // We might be doing stacking on specific sub groups, but only
	        // if at least one is set to do stacking
	        for (var key in data.subgroupStack) {
	          this.subgroupStack[key] = data.subgroupStack[key];
	          this.doInnerStack = this.doInnerStack || data.subgroupStack[key];
	        }
	      }
	    }

	    if (data && data.heightMode) {
	      this.heightMode = data.heightMode;
	    } else {
	      this.heightMode = itemSet.options.groupHeightMode;
	    }

	    this.nestedInGroup = null;
	    this.dom = {};
	    this.props = {
	      label: {
	        width: 0,
	        height: 0
	      }
	    };
	    this.className = null;
	    this.items = {}; // items filtered by groupId of this group

	    this.visibleItems = []; // items currently visible in window

	    this.itemsInRange = []; // items currently in range

	    this.orderedItems = {
	      byStart: [],
	      byEnd: []
	    };
	    this.checkRangedItems = false; // needed to refresh the ranged items if the window is programatically changed with NO overlap.

	    var handleCheckRangedItems = function handleCheckRangedItems() {
	      _this.checkRangedItems = true;
	    };

	    this.itemSet.body.emitter.on("checkRangedItems", handleCheckRangedItems);

	    this._disposeCallbacks.push(function () {
	      _this.itemSet.body.emitter.off("checkRangedItems", handleCheckRangedItems);
	    });

	    this._create();

	    this.setData(data);
	  }
	  /**
	   * Create DOM elements for the group
	   * @private
	   */


	  createClass(Group, [{
	    key: "_create",
	    value: function _create() {
	      var label = document.createElement('div');

	      if (this.itemSet.options.groupEditable.order) {
	        label.className = 'vis-label draggable';
	      } else {
	        label.className = 'vis-label';
	      }

	      this.dom.label = label;
	      var inner = document.createElement('div');
	      inner.className = 'vis-inner';
	      label.appendChild(inner);
	      this.dom.inner = inner;
	      var foreground = document.createElement('div');
	      foreground.className = 'vis-group';
	      foreground['vis-group'] = this;
	      this.dom.foreground = foreground;
	      this.dom.background = document.createElement('div');
	      this.dom.background.className = 'vis-group';
	      this.dom.axis = document.createElement('div');
	      this.dom.axis.className = 'vis-group'; // create a hidden marker to detect when the Timelines container is attached
	      // to the DOM, or the style of a parent of the Timeline is changed from
	      // display:none is changed to visible.

	      this.dom.marker = document.createElement('div');
	      this.dom.marker.style.visibility = 'hidden';
	      this.dom.marker.style.position = 'absolute';
	      this.dom.marker.innerHTML = '';
	      this.dom.background.appendChild(this.dom.marker);
	    }
	    /**
	     * Set the group data for this group
	     * @param {Object} data   Group data, can contain properties content and className
	     */

	  }, {
	    key: "setData",
	    value: function setData(data) {
	      if (this.itemSet.groupTouchParams.isDragging) return; // update contents

	      var content;
	      var templateFunction;

	      if (data && data.subgroupVisibility) {
	        for (var key in data.subgroupVisibility) {
	          this.subgroupVisibility[key] = data.subgroupVisibility[key];
	        }
	      }

	      if (this.itemSet.options && this.itemSet.options.groupTemplate) {
	        var _context;

	        templateFunction = bind$2(_context = this.itemSet.options.groupTemplate).call(_context, this);
	        content = templateFunction(data, this.dom.inner);
	      } else {
	        content = data && data.content;
	      }

	      if (content instanceof Element) {
	        while (this.dom.inner.firstChild) {
	          this.dom.inner.removeChild(this.dom.inner.firstChild);
	        }

	        this.dom.inner.appendChild(content);
	      } else if (content instanceof Object && content.isReactComponent) ; else if (content instanceof Object) {
	        templateFunction(data, this.dom.inner);
	      } else if (content !== undefined && content !== null) {
	        this.dom.inner.innerHTML = content;
	      } else {
	        this.dom.inner.innerHTML = this.groupId || ''; // groupId can be null
	      } // update title


	      this.dom.label.title = data && data.title || '';

	      if (!this.dom.inner.firstChild) {
	        util$1.addClassName(this.dom.inner, 'vis-hidden');
	      } else {
	        util$1.removeClassName(this.dom.inner, 'vis-hidden');
	      }

	      if (data && data.nestedGroups) {
	        if (!this.nestedGroups || this.nestedGroups != data.nestedGroups) {
	          this.nestedGroups = data.nestedGroups;
	        }

	        if (data.showNested !== undefined || this.showNested === undefined) {
	          if (data.showNested == false) {
	            this.showNested = false;
	          } else {
	            this.showNested = true;
	          }
	        }

	        util$1.addClassName(this.dom.label, 'vis-nesting-group');

	        if (this.showNested) {
	          util$1.removeClassName(this.dom.label, 'collapsed');
	          util$1.addClassName(this.dom.label, 'expanded');
	        } else {
	          util$1.removeClassName(this.dom.label, 'expanded');
	          util$1.addClassName(this.dom.label, 'collapsed');
	        }
	      } else if (this.nestedGroups) {
	        this.nestedGroups = null;
	        util$1.removeClassName(this.dom.label, 'collapsed');
	        util$1.removeClassName(this.dom.label, 'expanded');
	        util$1.removeClassName(this.dom.label, 'vis-nesting-group');
	      }

	      if (data && (data.treeLevel || data.nestedInGroup)) {
	        util$1.addClassName(this.dom.label, 'vis-nested-group');

	        if (data.treeLevel) {
	          util$1.addClassName(this.dom.label, 'vis-group-level-' + data.treeLevel);
	        } else {
	          // Nesting level is unknown, but we're sure it's at least 1
	          util$1.addClassName(this.dom.label, 'vis-group-level-unknown-but-gte1');
	        }
	      } else {
	        util$1.addClassName(this.dom.label, 'vis-group-level-0');
	      } // update className


	      var className = data && data.className || null;

	      if (className != this.className) {
	        if (this.className) {
	          util$1.removeClassName(this.dom.label, this.className);
	          util$1.removeClassName(this.dom.foreground, this.className);
	          util$1.removeClassName(this.dom.background, this.className);
	          util$1.removeClassName(this.dom.axis, this.className);
	        }

	        util$1.addClassName(this.dom.label, className);
	        util$1.addClassName(this.dom.foreground, className);
	        util$1.addClassName(this.dom.background, className);
	        util$1.addClassName(this.dom.axis, className);
	        this.className = className;
	      } // update style


	      if (this.style) {
	        util$1.removeCssText(this.dom.label, this.style);
	        this.style = null;
	      }

	      if (data && data.style) {
	        util$1.addCssText(this.dom.label, data.style);
	        this.style = data.style;
	      }
	    }
	    /**
	     * Get the width of the group label
	     * @return {number} width
	     */

	  }, {
	    key: "getLabelWidth",
	    value: function getLabelWidth() {
	      return this.props.label.width;
	    }
	    /**
	     * check if group has had an initial height hange
	     * @returns {boolean} 
	     */

	  }, {
	    key: "_didMarkerHeightChange",
	    value: function _didMarkerHeightChange() {
	      var markerHeight = this.dom.marker.clientHeight;

	      if (markerHeight != this.lastMarkerHeight) {
	        this.lastMarkerHeight = markerHeight;
	        var redrawQueue = {};
	        var redrawQueueLength = 0;

	        forEach$2(util$1).call(util$1, this.items, function (item, key) {
	          item.dirty = true;

	          if (item.displayed) {
	            var returnQueue = true;
	            redrawQueue[key] = item.redraw(returnQueue);
	            redrawQueueLength = redrawQueue[key].length;
	          }
	        });

	        var needRedraw = redrawQueueLength > 0;

	        if (needRedraw) {
	          var _loop = function _loop(i) {
	            forEach$2(util$1).call(util$1, redrawQueue, function (fns) {
	              fns[i]();
	            });
	          };

	          // redraw all regular items
	          for (var i = 0; i < redrawQueueLength; i++) {
	            _loop(i);
	          }
	        }

	        return true;
	      } else {
	        return false;
	      }
	    }
	    /**
	     * calculate group dimentions and position
	     * @param {number} pixels
	     */

	  }, {
	    key: "_calculateGroupSizeAndPosition",
	    value: function _calculateGroupSizeAndPosition() {
	      var _this$dom$foreground = this.dom.foreground,
	          offsetTop = _this$dom$foreground.offsetTop,
	          offsetLeft = _this$dom$foreground.offsetLeft,
	          offsetWidth = _this$dom$foreground.offsetWidth;
	      this.top = offsetTop;
	      this.right = offsetLeft;
	      this.width = offsetWidth;
	    }
	    /**
	     * checks if should bail redraw of items
	     * @returns {boolean} should bail 
	     */

	  }, {
	    key: "_shouldBailItemsRedraw",
	    value: function _shouldBailItemsRedraw() {
	      var me = this;
	      var timeoutOptions = this.itemSet.options.onTimeout;
	      var bailOptions = {
	        relativeBailingTime: this.itemSet.itemsSettingTime,
	        bailTimeMs: timeoutOptions && timeoutOptions.timeoutMs,
	        userBailFunction: timeoutOptions && timeoutOptions.callback,
	        shouldBailStackItems: this.shouldBailStackItems
	      };
	      var bail = null;

	      if (!this.itemSet.initialDrawDone) {
	        if (bailOptions.shouldBailStackItems) {
	          return true;
	        }

	        if (Math.abs(now$2() - new Date(bailOptions.relativeBailingTime)) > bailOptions.bailTimeMs) {
	          if (bailOptions.userBailFunction && this.itemSet.userContinueNotBail == null) {
	            bailOptions.userBailFunction(function (didUserContinue) {
	              me.itemSet.userContinueNotBail = didUserContinue;
	              bail = !didUserContinue;
	            });
	          } else if (me.itemSet.userContinueNotBail == false) {
	            bail = true;
	          } else {
	            bail = false;
	          }
	        }
	      }

	      return bail;
	    }
	    /**
	     * redraws items
	     * @param {boolean} forceRestack
	     * @param {boolean} lastIsVisible
	     * @param {number} margin
	     * @param {object} range
	     * @private
	     */

	  }, {
	    key: "_redrawItems",
	    value: function _redrawItems(forceRestack, lastIsVisible, margin, range) {
	      var _this2 = this;

	      var restack = forceRestack || this.stackDirty || this.isVisible && !lastIsVisible; // if restacking, reposition visible items vertically

	      if (restack) {
	        var _context2, _context3, _context4, _context5, _context6, _context7;

	        var orderedItems = {
	          byEnd: filter$2(_context2 = this.orderedItems.byEnd).call(_context2, function (item) {
	            return !item.isCluster;
	          }),
	          byStart: filter$2(_context3 = this.orderedItems.byStart).call(_context3, function (item) {
	            return !item.isCluster;
	          })
	        };
	        var orderedClusters = {
	          byEnd: toConsumableArray(new set$3(filter$2(_context4 = map$2(_context5 = this.orderedItems.byEnd).call(_context5, function (item) {
	            return item.cluster;
	          })).call(_context4, function (item) {
	            return !!item;
	          }))),
	          byStart: toConsumableArray(new set$3(filter$2(_context6 = map$2(_context7 = this.orderedItems.byStart).call(_context7, function (item) {
	            return item.cluster;
	          })).call(_context6, function (item) {
	            return !!item;
	          })))
	        };
	        /**
	        * Get all visible items in range
	        * @return {array} items
	        */

	        var getVisibleItems = function getVisibleItems() {
	          var _context8, _context9, _context10;

	          var visibleItems = _this2._updateItemsInRange(orderedItems, filter$2(_context8 = _this2.visibleItems).call(_context8, function (item) {
	            return !item.isCluster;
	          }), range);

	          var visibleClusters = _this2._updateClustersInRange(orderedClusters, filter$2(_context9 = _this2.visibleItems).call(_context9, function (item) {
	            return item.isCluster;
	          }), range);

	          return concat$2(_context10 = []).call(_context10, toConsumableArray(visibleItems), toConsumableArray(visibleClusters));
	        };
	        /**
	         * Get visible items grouped by subgroup
	         * @param {function} orderFn An optional function to order items inside the subgroups
	         * @return {Object}
	         */


	        var getVisibleItemsGroupedBySubgroup = function getVisibleItemsGroupedBySubgroup(orderFn) {
	          var visibleSubgroupsItems = {};

	          var _loop2 = function _loop2(subgroup) {
	            var _context11;

	            var items = filter$2(_context11 = _this2.visibleItems).call(_context11, function (item) {
	              return item.data.subgroup === subgroup;
	            });

	            visibleSubgroupsItems[subgroup] = orderFn ? sort$2(items).call(items, function (a, b) {
	              return orderFn(a.data, b.data);
	            }) : items;
	          };

	          for (var subgroup in _this2.subgroups) {
	            _loop2(subgroup);
	          }

	          return visibleSubgroupsItems;
	        };

	        if (typeof this.itemSet.options.order === 'function') {
	          // a custom order function
	          //show all items
	          var me = this;

	          if (this.doInnerStack && this.itemSet.options.stackSubgroups) {
	            // Order the items within each subgroup
	            var visibleSubgroupsItems = getVisibleItemsGroupedBySubgroup(this.itemSet.options.order);
	            stackSubgroupsWithInnerStack(visibleSubgroupsItems, margin, this.subgroups);
	            this.visibleItems = getVisibleItems();

	            this._updateSubGroupHeights(margin);
	          } else {
	            var _context12, _context13, _context14, _context15;

	            this.visibleItems = getVisibleItems();

	            this._updateSubGroupHeights(margin); // order all items and force a restacking
	            // order all items outside clusters and force a restacking


	            var customOrderedItems = sort$2(_context12 = filter$2(_context13 = slice$6(_context14 = this.visibleItems).call(_context14)).call(_context13, function (item) {
	              return item.isCluster || !item.isCluster && !item.cluster;
	            })).call(_context12, function (a, b) {
	              return me.itemSet.options.order(a.data, b.data);
	            });

	            this.shouldBailStackItems = stack(customOrderedItems, margin, true, bind$2(_context15 = this._shouldBailItemsRedraw).call(_context15, this));
	          }
	        } else {
	          // no custom order function, lazy stacking
	          this.visibleItems = getVisibleItems();

	          this._updateSubGroupHeights(margin);

	          if (this.itemSet.options.stack) {
	            if (this.doInnerStack && this.itemSet.options.stackSubgroups) {
	              var _visibleSubgroupsItems = getVisibleItemsGroupedBySubgroup();

	              stackSubgroupsWithInnerStack(_visibleSubgroupsItems, margin, this.subgroups);
	            } else {
	              var _context16;

	              // TODO: ugly way to access options...
	              this.shouldBailStackItems = stack(this.visibleItems, margin, true, bind$2(_context16 = this._shouldBailItemsRedraw).call(_context16, this));
	            }
	          } else {
	            // no stacking
	            nostack(this.visibleItems, margin, this.subgroups, this.itemSet.options.stackSubgroups);
	          }
	        }

	        for (var i = 0; i < this.visibleItems.length; i++) {
	          this.visibleItems[i].repositionX();

	          if (this.subgroupVisibility[this.visibleItems[i].data.subgroup] !== undefined) {
	            if (!this.subgroupVisibility[this.visibleItems[i].data.subgroup]) {
	              this.visibleItems[i].hide();
	            }
	          }
	        }

	        if (this.itemSet.options.cluster) {
	          forEach$2(util$1).call(util$1, this.items, function (item) {
	            if (item.cluster && item.displayed) {
	              item.hide();
	            }
	          });
	        }

	        if (this.shouldBailStackItems) {
	          this.itemSet.body.emitter.emit('destroyTimeline');
	        }

	        this.stackDirty = false;
	      }
	    }
	    /**
	     * check if group resized
	     * @param {boolean} resized
	     * @param {number} height
	     * @return {boolean} did resize
	     */

	  }, {
	    key: "_didResize",
	    value: function _didResize(resized, height) {
	      resized = util$1.updateProperty(this, 'height', height) || resized; // recalculate size of label

	      var labelWidth = this.dom.inner.clientWidth;
	      var labelHeight = this.dom.inner.clientHeight;
	      resized = util$1.updateProperty(this.props.label, 'width', labelWidth) || resized;
	      resized = util$1.updateProperty(this.props.label, 'height', labelHeight) || resized;
	      return resized;
	    }
	    /**
	     * apply group height
	     * @param {number} height
	     */

	  }, {
	    key: "_applyGroupHeight",
	    value: function _applyGroupHeight(height) {
	      this.dom.background.style.height = "".concat(height, "px");
	      this.dom.foreground.style.height = "".concat(height, "px");
	      this.dom.label.style.height = "".concat(height, "px");
	    }
	    /**
	     * update vertical position of items after they are re-stacked and the height of the group is calculated
	     * @param {number} margin
	     */

	  }, {
	    key: "_updateItemsVerticalPosition",
	    value: function _updateItemsVerticalPosition(margin) {
	      for (var i = 0, ii = this.visibleItems.length; i < ii; i++) {
	        var _item = this.visibleItems[i];

	        _item.repositionY(margin);

	        if (!this.isVisible && this.groupId != ReservedGroupIds.BACKGROUND) {
	          if (_item.displayed) _item.hide();
	        }
	      }
	    }
	    /**
	     * Repaint this group
	     * @param {{start: number, end: number}} range
	     * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
	     * @param {boolean} [forceRestack=false]  Force restacking of all items
	     * @param {boolean} [returnQueue=false]  return the queue or if the group resized
	     * @return {boolean} Returns true if the group is resized or the redraw queue if returnQueue=true
	     */

	  }, {
	    key: "redraw",
	    value: function redraw(range, margin, forceRestack, returnQueue) {
	      var _this3 = this,
	          _context17,
	          _context18,
	          _context21,
	          _context23,
	          _context27;

	      var resized = false;
	      var lastIsVisible = this.isVisible;
	      var height;
	      var queue = [function () {
	        forceRestack = _this3._didMarkerHeightChange.call(_this3) || forceRestack;
	      }, // recalculate the height of the subgroups
	      bind$2(_context17 = this._updateSubGroupHeights).call(_context17, this, margin), // calculate actual size and position
	      bind$2(_context18 = this._calculateGroupSizeAndPosition).call(_context18, this), function () {
	        var _context19;

	        _this3.isVisible = bind$2(_context19 = _this3._isGroupVisible).call(_context19, _this3)(range, margin);
	      }, function () {
	        var _context20;

	        bind$2(_context20 = _this3._redrawItems).call(_context20, _this3)(forceRestack, lastIsVisible, margin, range);
	      }, // update subgroups
	      bind$2(_context21 = this._updateSubgroupsSizes).call(_context21, this), function () {
	        var _context22;

	        height = bind$2(_context22 = _this3._calculateHeight).call(_context22, _this3)(margin);
	      }, // calculate actual size and position again
	      bind$2(_context23 = this._calculateGroupSizeAndPosition).call(_context23, this), function () {
	        var _context24;

	        resized = bind$2(_context24 = _this3._didResize).call(_context24, _this3)(resized, height);
	      }, function () {
	        var _context25;

	        bind$2(_context25 = _this3._applyGroupHeight).call(_context25, _this3)(height);
	      }, function () {
	        var _context26;

	        bind$2(_context26 = _this3._updateItemsVerticalPosition).call(_context26, _this3)(margin);
	      }, bind$2(_context27 = function _context27() {
	        if (!_this3.isVisible && _this3.height) {
	          resized = false;
	        }

	        return resized;
	      }).call(_context27, this)];

	      if (returnQueue) {
	        return queue;
	      } else {
	        var result;

	        forEach$2(queue).call(queue, function (fn) {
	          result = fn();
	        });

	        return result;
	      }
	    }
	    /**
	     * recalculate the height of the subgroups
	     *
	     * @param {{item: timeline.Item}} margin
	     * @private
	     */

	  }, {
	    key: "_updateSubGroupHeights",
	    value: function _updateSubGroupHeights(margin) {
	      var _this4 = this;

	      if (keys$3(this.subgroups).length > 0) {
	        var me = this;

	        this._resetSubgroups();

	        forEach$2(util$1).call(util$1, this.visibleItems, function (item) {
	          if (item.data.subgroup !== undefined) {
	            me.subgroups[item.data.subgroup].height = Math.max(me.subgroups[item.data.subgroup].height, item.height + margin.item.vertical);
	            me.subgroups[item.data.subgroup].visible = typeof _this4.subgroupVisibility[item.data.subgroup] === 'undefined' ? true : Boolean(_this4.subgroupVisibility[item.data.subgroup]);
	          }
	        });
	      }
	    }
	    /**
	     * check if group is visible
	     *
	     * @param {timeline.Range} range
	     * @param {{axis: timeline.DataAxis}} margin
	     * @returns {boolean} is visible
	     * @private
	     */

	  }, {
	    key: "_isGroupVisible",
	    value: function _isGroupVisible(range, margin) {
	      return this.top <= range.body.domProps.centerContainer.height - range.body.domProps.scrollTop + margin.axis && this.top + this.height + margin.axis >= -range.body.domProps.scrollTop;
	    }
	    /**
	     * recalculate the height of the group
	     * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
	     * @returns {number} Returns the height
	     * @private
	     */

	  }, {
	    key: "_calculateHeight",
	    value: function _calculateHeight(margin) {
	      // recalculate the height of the group
	      var height;
	      var items;

	      if (this.heightMode === 'fixed') {
	        items = util$1.toArray(this.items);
	      } else {
	        // default or 'auto'
	        items = this.visibleItems;
	      }

	      if (items.length > 0) {
	        var min = items[0].top;
	        var max = items[0].top + items[0].height;

	        forEach$2(util$1).call(util$1, items, function (item) {
	          min = Math.min(min, item.top);
	          max = Math.max(max, item.top + item.height);
	        });

	        if (min > margin.axis) {
	          // there is an empty gap between the lowest item and the axis
	          var offset = min - margin.axis;
	          max -= offset;

	          forEach$2(util$1).call(util$1, items, function (item) {
	            item.top -= offset;
	          });
	        }

	        height = Math.ceil(max + margin.item.vertical / 2);

	        if (this.heightMode !== "fitItems") {
	          height = Math.max(height, this.props.label.height);
	        }
	      } else {
	        height =  this.props.label.height;
	      }

	      return height;
	    }
	    /**
	     * Show this group: attach to the DOM
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      if (!this.dom.label.parentNode) {
	        this.itemSet.dom.labelSet.appendChild(this.dom.label);
	      }

	      if (!this.dom.foreground.parentNode) {
	        this.itemSet.dom.foreground.appendChild(this.dom.foreground);
	      }

	      if (!this.dom.background.parentNode) {
	        this.itemSet.dom.background.appendChild(this.dom.background);
	      }

	      if (!this.dom.axis.parentNode) {
	        this.itemSet.dom.axis.appendChild(this.dom.axis);
	      }
	    }
	    /**
	     * Hide this group: remove from the DOM
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      var label = this.dom.label;

	      if (label.parentNode) {
	        label.parentNode.removeChild(label);
	      }

	      var foreground = this.dom.foreground;

	      if (foreground.parentNode) {
	        foreground.parentNode.removeChild(foreground);
	      }

	      var background = this.dom.background;

	      if (background.parentNode) {
	        background.parentNode.removeChild(background);
	      }

	      var axis = this.dom.axis;

	      if (axis.parentNode) {
	        axis.parentNode.removeChild(axis);
	      }
	    }
	    /**
	     * Add an item to the group
	     * @param {Item} item
	     */

	  }, {
	    key: "add",
	    value: function add(item) {
	      var _context28;

	      this.items[item.id] = item;
	      item.setParent(this);
	      this.stackDirty = true; // add to

	      if (item.data.subgroup !== undefined) {
	        this._addToSubgroup(item);

	        this.orderSubgroups();
	      }

	      if (!includes$4(_context28 = this.visibleItems).call(_context28, item)) {
	        var range = this.itemSet.body.range; // TODO: not nice accessing the range like this

	        this._checkIfVisible(item, this.visibleItems, range);
	      }
	    }
	    /**
	     * add item to subgroup
	     * @param {object} item
	     * @param {string} subgroupId
	     */

	  }, {
	    key: "_addToSubgroup",
	    value: function _addToSubgroup(item) {
	      var subgroupId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item.data.subgroup;

	      if (subgroupId != undefined && this.subgroups[subgroupId] === undefined) {
	        this.subgroups[subgroupId] = {
	          height: 0,
	          top: 0,
	          start: item.data.start,
	          end: item.data.end || item.data.start,
	          visible: false,
	          index: this.subgroupIndex,
	          items: [],
	          stack: this.subgroupStackAll || this.subgroupStack[subgroupId] || false
	        };
	        this.subgroupIndex++;
	      }

	      if (new Date(item.data.start) < new Date(this.subgroups[subgroupId].start)) {
	        this.subgroups[subgroupId].start = item.data.start;
	      }

	      var itemEnd = item.data.end || item.data.start;

	      if (new Date(itemEnd) > new Date(this.subgroups[subgroupId].end)) {
	        this.subgroups[subgroupId].end = itemEnd;
	      }

	      this.subgroups[subgroupId].items.push(item);
	    }
	    /**
	     * update subgroup sizes
	     */

	  }, {
	    key: "_updateSubgroupsSizes",
	    value: function _updateSubgroupsSizes() {
	      var me = this;

	      if (me.subgroups) {
	        var _loop3 = function _loop3(subgroup) {
	          var _context29;

	          var initialEnd = me.subgroups[subgroup].items[0].data.end || me.subgroups[subgroup].items[0].data.start;
	          var newStart = me.subgroups[subgroup].items[0].data.start;
	          var newEnd = initialEnd - 1;

	          forEach$2(_context29 = me.subgroups[subgroup].items).call(_context29, function (item) {
	            if (new Date(item.data.start) < new Date(newStart)) {
	              newStart = item.data.start;
	            }

	            var itemEnd = item.data.end || item.data.start;

	            if (new Date(itemEnd) > new Date(newEnd)) {
	              newEnd = itemEnd;
	            }
	          });

	          me.subgroups[subgroup].start = newStart;
	          me.subgroups[subgroup].end = new Date(newEnd - 1); // -1 to compensate for colliding end to start subgroups;
	        };

	        for (var subgroup in me.subgroups) {
	          _loop3(subgroup);
	        }
	      }
	    }
	    /**
	     * order subgroups
	     */

	  }, {
	    key: "orderSubgroups",
	    value: function orderSubgroups() {
	      if (this.subgroupOrderer !== undefined) {
	        var sortArray = [];

	        if (typeof this.subgroupOrderer == 'string') {
	          for (var subgroup in this.subgroups) {
	            sortArray.push({
	              subgroup: subgroup,
	              sortField: this.subgroups[subgroup].items[0].data[this.subgroupOrderer]
	            });
	          }

	          sort$2(sortArray).call(sortArray, function (a, b) {
	            return a.sortField - b.sortField;
	          });
	        } else if (typeof this.subgroupOrderer == 'function') {
	          for (var _subgroup in this.subgroups) {
	            sortArray.push(this.subgroups[_subgroup].items[0].data);
	          }

	          sort$2(sortArray).call(sortArray, this.subgroupOrderer);
	        }

	        if (sortArray.length > 0) {
	          for (var i = 0; i < sortArray.length; i++) {
	            this.subgroups[sortArray[i].subgroup].index = i;
	          }
	        }
	      }
	    }
	    /**
	     * add item to subgroup
	     */

	  }, {
	    key: "_resetSubgroups",
	    value: function _resetSubgroups() {
	      for (var subgroup in this.subgroups) {
	        if (this.subgroups.hasOwnProperty(subgroup)) {
	          this.subgroups[subgroup].visible = false;
	          this.subgroups[subgroup].height = 0;
	        }
	      }
	    }
	    /**
	     * Remove an item from the group
	     * @param {Item} item
	     */

	  }, {
	    key: "remove",
	    value: function remove(item) {
	      var _context30, _context31;

	      delete this.items[item.id];
	      item.setParent(null);
	      this.stackDirty = true; // remove from visible items

	      var index = indexOf$3(_context30 = this.visibleItems).call(_context30, item);

	      if (index != -1) splice$2(_context31 = this.visibleItems).call(_context31, index, 1);

	      if (item.data.subgroup !== undefined) {
	        this._removeFromSubgroup(item);

	        this.orderSubgroups();
	      }
	    }
	    /**
	     * remove item from subgroup
	     * @param {object} item
	     * @param {string} subgroupId
	     */

	  }, {
	    key: "_removeFromSubgroup",
	    value: function _removeFromSubgroup(item) {
	      var subgroupId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item.data.subgroup;

	      if (subgroupId != undefined) {
	        var subgroup = this.subgroups[subgroupId];

	        if (subgroup) {
	          var _context32;

	          var itemIndex = indexOf$3(_context32 = subgroup.items).call(_context32, item); //  Check the item is actually in this subgroup. How should items not in the group be handled?


	          if (itemIndex >= 0) {
	            var _context33;

	            splice$2(_context33 = subgroup.items).call(_context33, itemIndex, 1);

	            if (!subgroup.items.length) {
	              delete this.subgroups[subgroupId];
	            } else {
	              this._updateSubgroupsSizes();
	            }
	          }
	        }
	      }
	    }
	    /**
	     * Remove an item from the corresponding DataSet
	     * @param {Item} item
	     */

	  }, {
	    key: "removeFromDataSet",
	    value: function removeFromDataSet(item) {
	      this.itemSet.removeItem(item.id);
	    }
	    /**
	     * Reorder the items
	     */

	  }, {
	    key: "order",
	    value: function order() {
	      var array = util$1.toArray(this.items);
	      var startArray = [];
	      var endArray = [];

	      for (var i = 0; i < array.length; i++) {
	        if (array[i].data.end !== undefined) {
	          endArray.push(array[i]);
	        }

	        startArray.push(array[i]);
	      }

	      this.orderedItems = {
	        byStart: startArray,
	        byEnd: endArray
	      };
	      orderByStart(this.orderedItems.byStart);
	      orderByEnd(this.orderedItems.byEnd);
	    }
	    /**
	     * Update the visible items
	     * @param {{byStart: Item[], byEnd: Item[]}} orderedItems   All items ordered by start date and by end date
	     * @param {Item[]} oldVisibleItems                          The previously visible items.
	     * @param {{start: number, end: number}} range              Visible range
	     * @return {Item[]} visibleItems                            The new visible items.
	     * @private
	     */

	  }, {
	    key: "_updateItemsInRange",
	    value: function _updateItemsInRange(orderedItems, oldVisibleItems, range) {
	      var visibleItems = [];
	      var visibleItemsLookup = {}; // we keep this to quickly look up if an item already exists in the list without using indexOf on visibleItems

	      if (!this.isVisible && this.groupId != ReservedGroupIds.BACKGROUND) {
	        for (var i = 0; i < oldVisibleItems.length; i++) {
	          var item = oldVisibleItems[i];
	          if (item.displayed) item.hide();
	        }

	        return visibleItems;
	      }

	      var interval = (range.end - range.start) / 4;
	      var lowerBound = range.start - interval;
	      var upperBound = range.end + interval; // this function is used to do the binary search for items having start date only.

	      var startSearchFunction = function startSearchFunction(value) {
	        if (value < lowerBound) {
	          return -1;
	        } else if (value <= upperBound) {
	          return 0;
	        } else {
	          return 1;
	        }
	      }; // this function is used to do the binary search for items having start and end dates (range).


	      var endSearchFunction = function endSearchFunction(data) {
	        var start = data.start,
	            end = data.end;

	        if (end < lowerBound) {
	          return -1;
	        } else if (start <= upperBound) {
	          return 0;
	        } else {
	          return 1;
	        }
	      }; // first check if the items that were in view previously are still in view.
	      // IMPORTANT: this handles the case for the items with startdate before the window and enddate after the window!
	      // also cleans up invisible items.


	      if (oldVisibleItems.length > 0) {
	        for (var _i = 0; _i < oldVisibleItems.length; _i++) {
	          this._checkIfVisibleWithReference(oldVisibleItems[_i], visibleItems, visibleItemsLookup, range);
	        }
	      } // we do a binary search for the items that have only start values.


	      var initialPosByStart = util$1.binarySearchCustom(orderedItems.byStart, startSearchFunction, 'data', 'start'); // trace the visible items from the inital start pos both ways until an invisible item is found, we only look at the start values.

	      this._traceVisible(initialPosByStart, orderedItems.byStart, visibleItems, visibleItemsLookup, function (item) {
	        return item.data.start < lowerBound || item.data.start > upperBound;
	      }); // if the window has changed programmatically without overlapping the old window, the ranged items with start < lowerBound and end > upperbound are not shown.
	      // We therefore have to brute force check all items in the byEnd list


	      if (this.checkRangedItems == true) {
	        this.checkRangedItems = false;

	        for (var _i2 = 0; _i2 < orderedItems.byEnd.length; _i2++) {
	          this._checkIfVisibleWithReference(orderedItems.byEnd[_i2], visibleItems, visibleItemsLookup, range);
	        }
	      } else {
	        // we do a binary search for the items that have defined end times.
	        var initialPosByEnd = util$1.binarySearchCustom(orderedItems.byEnd, endSearchFunction, 'data'); // trace the visible items from the inital start pos both ways until an invisible item is found, we only look at the end values.

	        this._traceVisible(initialPosByEnd, orderedItems.byEnd, visibleItems, visibleItemsLookup, function (item) {
	          return item.data.end < lowerBound || item.data.start > upperBound;
	        });
	      }

	      var redrawQueue = {};
	      var redrawQueueLength = 0;

	      for (var _i3 = 0; _i3 < visibleItems.length; _i3++) {
	        var _item2 = visibleItems[_i3];

	        if (!_item2.displayed) {
	          var returnQueue = true;
	          redrawQueue[_i3] = _item2.redraw(returnQueue);
	          redrawQueueLength = redrawQueue[_i3].length;
	        }
	      }

	      var needRedraw = redrawQueueLength > 0;

	      if (needRedraw) {
	        var _loop4 = function _loop4(j) {
	          forEach$2(util$1).call(util$1, redrawQueue, function (fns) {
	            fns[j]();
	          });
	        };

	        // redraw all regular items
	        for (var j = 0; j < redrawQueueLength; j++) {
	          _loop4(j);
	        }
	      }

	      for (var _i4 = 0; _i4 < visibleItems.length; _i4++) {
	        visibleItems[_i4].repositionX();
	      }

	      return visibleItems;
	    }
	    /**
	     * trace visible items in group
	     * @param {number} initialPos
	     * @param {array} items
	     * @param {aray} visibleItems
	     * @param {object} visibleItemsLookup
	     * @param {function} breakCondition
	     */

	  }, {
	    key: "_traceVisible",
	    value: function _traceVisible(initialPos, items, visibleItems, visibleItemsLookup, breakCondition) {
	      if (initialPos != -1) {
	        for (var i = initialPos; i >= 0; i--) {
	          var _item3 = items[i];

	          if (breakCondition(_item3)) {
	            break;
	          } else {
	            if (!(_item3.isCluster && !_item3.hasItems()) && !_item3.cluster) {
	              if (visibleItemsLookup[_item3.id] === undefined) {
	                visibleItemsLookup[_item3.id] = true;
	                visibleItems.push(_item3);
	              }
	            }
	          }
	        }

	        for (var _i5 = initialPos + 1; _i5 < items.length; _i5++) {
	          var _item4 = items[_i5];

	          if (breakCondition(_item4)) {
	            break;
	          } else {
	            if (!(_item4.isCluster && !_item4.hasItems()) && !_item4.cluster) {
	              if (visibleItemsLookup[_item4.id] === undefined) {
	                visibleItemsLookup[_item4.id] = true;
	                visibleItems.push(_item4);
	              }
	            }
	          }
	        }
	      }
	    }
	    /**
	     * this function is very similar to the _checkIfInvisible() but it does not
	     * return booleans, hides the item if it should not be seen and always adds to
	     * the visibleItems.
	     * this one is for brute forcing and hiding.
	     *
	     * @param {Item} item
	     * @param {Array} visibleItems
	     * @param {{start:number, end:number}} range
	     * @private
	     */

	  }, {
	    key: "_checkIfVisible",
	    value: function _checkIfVisible(item, visibleItems, range) {
	      if (item.isVisible(range)) {
	        if (!item.displayed) item.show(); // reposition item horizontally

	        item.repositionX();
	        visibleItems.push(item);
	      } else {
	        if (item.displayed) item.hide();
	      }
	    }
	    /**
	     * this function is very similar to the _checkIfInvisible() but it does not
	     * return booleans, hides the item if it should not be seen and always adds to
	     * the visibleItems.
	     * this one is for brute forcing and hiding.
	     *
	     * @param {Item} item
	     * @param {Array.<timeline.Item>} visibleItems
	     * @param {Object<number, boolean>} visibleItemsLookup
	     * @param {{start:number, end:number}} range
	     * @private
	     */

	  }, {
	    key: "_checkIfVisibleWithReference",
	    value: function _checkIfVisibleWithReference(item, visibleItems, visibleItemsLookup, range) {
	      if (item.isVisible(range)) {
	        if (visibleItemsLookup[item.id] === undefined) {
	          visibleItemsLookup[item.id] = true;
	          visibleItems.push(item);
	        }
	      } else {
	        if (item.displayed) item.hide();
	      }
	    }
	    /**
	     * Update the visible items
	     * @param {array} orderedClusters 
	     * @param {array} oldVisibleClusters                         
	     * @param {{start: number, end: number}} range             
	     * @return {Item[]} visibleItems                            
	     * @private
	     */

	  }, {
	    key: "_updateClustersInRange",
	    value: function _updateClustersInRange(orderedClusters, oldVisibleClusters, range) {
	      // Clusters can overlap each other so we cannot use binary search here
	      var visibleClusters = [];
	      var visibleClustersLookup = {}; // we keep this to quickly look up if an item already exists in the list without using indexOf on visibleItems

	      if (oldVisibleClusters.length > 0) {
	        for (var i = 0; i < oldVisibleClusters.length; i++) {
	          this._checkIfVisibleWithReference(oldVisibleClusters[i], visibleClusters, visibleClustersLookup, range);
	        }
	      }

	      for (var _i6 = 0; _i6 < orderedClusters.byStart.length; _i6++) {
	        this._checkIfVisibleWithReference(orderedClusters.byStart[_i6], visibleClusters, visibleClustersLookup, range);
	      }

	      for (var _i7 = 0; _i7 < orderedClusters.byEnd.length; _i7++) {
	        this._checkIfVisibleWithReference(orderedClusters.byEnd[_i7], visibleClusters, visibleClustersLookup, range);
	      }

	      var redrawQueue = {};
	      var redrawQueueLength = 0;

	      for (var _i8 = 0; _i8 < visibleClusters.length; _i8++) {
	        var _item5 = visibleClusters[_i8];

	        if (!_item5.displayed) {
	          var returnQueue = true;
	          redrawQueue[_i8] = _item5.redraw(returnQueue);
	          redrawQueueLength = redrawQueue[_i8].length;
	        }
	      }

	      var needRedraw = redrawQueueLength > 0;

	      if (needRedraw) {
	        // redraw all regular items
	        for (var j = 0; j < redrawQueueLength; j++) {
	          forEach$2(util$1).call(util$1, redrawQueue, function (fns) {
	            fns[j]();
	          });
	        }
	      }

	      for (var _i9 = 0; _i9 < visibleClusters.length; _i9++) {
	        visibleClusters[_i9].repositionX();
	      }

	      return visibleClusters;
	    }
	    /**
	     * change item subgroup
	     * @param {object} item
	     * @param {string} oldSubgroup
	     * @param {string} newSubgroup
	     */

	  }, {
	    key: "changeSubgroup",
	    value: function changeSubgroup(item, oldSubgroup, newSubgroup) {
	      this._removeFromSubgroup(item, oldSubgroup);

	      this._addToSubgroup(item, newSubgroup);

	      this.orderSubgroups();
	    }
	    /**
	     * Call this method before you lose the last reference to an instance of this.
	     * It will remove listeners etc.
	     */

	  }, {
	    key: "dispose",
	    value: function dispose() {
	      this.hide();
	      var disposeCallback;

	      while (disposeCallback = this._disposeCallbacks.pop()) {
	        disposeCallback();
	      }
	    }
	  }]);

	  return Group;
	}();

	function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * @constructor BackgroundGroup
	 * @extends Group
	 */

	var BackgroundGroup = /*#__PURE__*/function (_Group) {
	  inherits(BackgroundGroup, _Group);

	  var _super = _createSuper$4(BackgroundGroup);

	  /**
	  * @param {number | string} groupId
	  * @param {Object} data
	  * @param {ItemSet} itemSet
	  */
	  function BackgroundGroup(groupId, data, itemSet) {
	    var _this;

	    classCallCheck(this, BackgroundGroup);

	    _this = _super.call(this, groupId, data, itemSet); // Group.call(this, groupId, data, itemSet);

	    _this.width = 0;
	    _this.height = 0;
	    _this.top = 0;
	    _this.left = 0;
	    return _this;
	  }
	  /**
	   * Repaint this group
	   * @param {{start: number, end: number}} range
	   * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
	   * @param {boolean} [forceRestack=false]  Force restacking of all items
	   * @return {boolean} Returns true if the group is resized
	   */


	  createClass(BackgroundGroup, [{
	    key: "redraw",
	    value: function redraw(range, margin, forceRestack) {
	      // eslint-disable-line no-unused-vars
	      var resized = false;
	      this.visibleItems = this._updateItemsInRange(this.orderedItems, this.visibleItems, range); // calculate actual size

	      this.width = this.dom.background.offsetWidth; // apply new height (just always zero for BackgroundGroup

	      this.dom.background.style.height = '0'; // update vertical position of items after they are re-stacked and the height of the group is calculated

	      for (var i = 0, ii = this.visibleItems.length; i < ii; i++) {
	        var item = this.visibleItems[i];
	        item.repositionY(margin);
	      }

	      return resized;
	    }
	    /**
	     * Show this group: attach to the DOM
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      if (!this.dom.background.parentNode) {
	        this.itemSet.dom.background.appendChild(this.dom.background);
	      }
	    }
	  }]);

	  return BackgroundGroup;
	}(Group);

	function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$3(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$2(o, minLen) { var _context8; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = slice$6(_context8 = Object.prototype.toString.call(o)).call(_context8, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

	function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	/**
	 * Item
	 */

	var Item = /*#__PURE__*/function () {
	  /**
	  * @constructor Item
	  * @param {Object} data             Object containing (optional) parameters type,
	  *                                  start, end, content, group, className.
	  * @param {{toScreen: function, toTime: function}} conversion
	  *                                  Conversion functions from time to screen and vice versa
	  * @param {Object} options          Configuration options
	  *                                  // TODO: describe available options
	  */
	  function Item(data, conversion, options) {
	    var _context,
	        _this = this;

	    classCallCheck(this, Item);

	    this.id = null;
	    this.parent = null;
	    this.data = data;
	    this.dom = null;
	    this.conversion = conversion || {};
	    this.defaultOptions = {
	      locales: locales,
	      locale: 'en'
	    };
	    this.options = util$1.extend({}, this.defaultOptions, options);
	    this.options.locales = util$1.extend({}, locales, this.options.locales);
	    var defaultLocales = this.defaultOptions.locales[this.defaultOptions.locale];

	    forEach$2(_context = keys$3(this.options.locales)).call(_context, function (locale) {
	      _this.options.locales[locale] = util$1.extend({}, defaultLocales, _this.options.locales[locale]);
	    });

	    this.selected = false;
	    this.displayed = false;
	    this.groupShowing = true;
	    this.selectable = options && options.selectable || false;
	    this.dirty = true;
	    this.top = null;
	    this.right = null;
	    this.left = null;
	    this.width = null;
	    this.height = null;
	    this.setSelectability(data);
	    this.editable = null;

	    this._updateEditStatus();
	  }
	  /**
	   * Select current item
	   */


	  createClass(Item, [{
	    key: "select",
	    value: function select() {
	      if (this.selectable) {
	        this.selected = true;
	        this.dirty = true;
	        if (this.displayed) this.redraw();
	      }
	    }
	    /**
	     * Unselect current item
	     */

	  }, {
	    key: "unselect",
	    value: function unselect() {
	      this.selected = false;
	      this.dirty = true;
	      if (this.displayed) this.redraw();
	    }
	    /**
	     * Set data for the item. Existing data will be updated. The id should not
	     * be changed. When the item is displayed, it will be redrawn immediately.
	     * @param {Object} data
	     */

	  }, {
	    key: "setData",
	    value: function setData(data) {
	      var groupChanged = data.group != undefined && this.data.group != data.group;

	      if (groupChanged && this.parent != null) {
	        this.parent.itemSet._moveToGroup(this, data.group);
	      }

	      this.setSelectability(data);

	      if (this.parent) {
	        this.parent.stackDirty = true;
	      }

	      var subGroupChanged = data.subgroup != undefined && this.data.subgroup != data.subgroup;

	      if (subGroupChanged && this.parent != null) {
	        this.parent.changeSubgroup(this, this.data.subgroup, data.subgroup);
	      }

	      this.data = data;

	      this._updateEditStatus();

	      this.dirty = true;
	      if (this.displayed) this.redraw();
	    }
	    /**
	     * Set whether the item can be selected.
	     * Can only be set/unset if the timeline's `selectable` configuration option is `true`.
	     * @param {Object} data `data` from `constructor` and `setData`
	     */

	  }, {
	    key: "setSelectability",
	    value: function setSelectability(data) {
	      if (data) {
	        this.selectable = typeof data.selectable === 'undefined' ? true : Boolean(data.selectable);
	      }
	    }
	    /**
	     * Set a parent for the item
	     * @param {Group} parent
	     */

	  }, {
	    key: "setParent",
	    value: function setParent(parent) {
	      if (this.displayed) {
	        this.hide();
	        this.parent = parent;

	        if (this.parent) {
	          this.show();
	        }
	      } else {
	        this.parent = parent;
	      }
	    }
	    /**
	     * Check whether this item is visible inside given range
	     * @param {timeline.Range} range with a timestamp for start and end
	     * @returns {boolean} True if visible
	     */

	  }, {
	    key: "isVisible",
	    value: function isVisible(range) {
	      // eslint-disable-line no-unused-vars
	      return false;
	    }
	    /**
	     * Show the Item in the DOM (when not already visible)
	     * @return {Boolean} changed
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      return false;
	    }
	    /**
	     * Hide the Item from the DOM (when visible)
	     * @return {Boolean} changed
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      return false;
	    }
	    /**
	     * Repaint the item
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {// should be implemented by the item
	    }
	    /**
	     * Reposition the Item horizontally
	     */

	  }, {
	    key: "repositionX",
	    value: function repositionX() {// should be implemented by the item
	    }
	    /**
	     * Reposition the Item vertically
	     */

	  }, {
	    key: "repositionY",
	    value: function repositionY() {// should be implemented by the item
	    }
	    /**
	     * Repaint a drag area on the center of the item when the item is selected
	     * @protected
	     */

	  }, {
	    key: "_repaintDragCenter",
	    value: function _repaintDragCenter() {
	      if (this.selected && this.editable.updateTime && !this.dom.dragCenter) {
	        var _context2, _context3;

	        var me = this; // create and show drag area

	        var dragCenter = document.createElement('div');
	        dragCenter.className = 'vis-drag-center';
	        dragCenter.dragCenterItem = this;
	        this.hammerDragCenter = new Hammer$1(dragCenter);
	        this.hammerDragCenter.on('tap', function (event) {
	          me.parent.itemSet.body.emitter.emit('click', {
	            event: event,
	            item: me.id
	          });
	        });
	        this.hammerDragCenter.on('doubletap', function (event) {
	          event.stopPropagation();

	          me.parent.itemSet._onUpdateItem(me);

	          me.parent.itemSet.body.emitter.emit('doubleClick', {
	            event: event,
	            item: me.id
	          });
	        });
	        this.hammerDragCenter.on('panstart', function (event) {
	          // do not allow this event to propagate to the Range
	          event.stopPropagation();

	          me.parent.itemSet._onDragStart(event);
	        });
	        this.hammerDragCenter.on('panmove', bind$2(_context2 = me.parent.itemSet._onDrag).call(_context2, me.parent.itemSet));
	        this.hammerDragCenter.on('panend', bind$2(_context3 = me.parent.itemSet._onDragEnd).call(_context3, me.parent.itemSet));

	        if (this.dom.box) {
	          if (this.dom.dragLeft) {
	            this.dom.box.insertBefore(dragCenter, this.dom.dragLeft);
	          } else {
	            this.dom.box.appendChild(dragCenter);
	          }
	        } else if (this.dom.point) {
	          this.dom.point.appendChild(dragCenter);
	        }

	        this.dom.dragCenter = dragCenter;
	      } else if (!this.selected && this.dom.dragCenter) {
	        // delete drag area
	        if (this.dom.dragCenter.parentNode) {
	          this.dom.dragCenter.parentNode.removeChild(this.dom.dragCenter);
	        }

	        this.dom.dragCenter = null;

	        if (this.hammerDragCenter) {
	          this.hammerDragCenter.destroy();
	          this.hammerDragCenter = null;
	        }
	      }
	    }
	    /**
	     * Repaint a delete button on the top right of the item when the item is selected
	     * @param {HTMLElement} anchor
	     * @protected
	     */

	  }, {
	    key: "_repaintDeleteButton",
	    value: function _repaintDeleteButton(anchor) {
	      var editable = (this.options.editable.overrideItems || this.editable == null) && this.options.editable.remove || !this.options.editable.overrideItems && this.editable != null && this.editable.remove;

	      if (this.selected && editable && !this.dom.deleteButton) {
	        // create and show button
	        var me = this;
	        var deleteButton = document.createElement('div');

	        if (this.options.rtl) {
	          deleteButton.className = 'vis-delete-rtl';
	        } else {
	          deleteButton.className = 'vis-delete';
	        }

	        var optionsLocale = this.options.locales[this.options.locale];

	        if (!optionsLocale) {
	          if (!this.warned) {
	            console.warn("WARNING: options.locales['".concat(this.options.locale, "'] not found. See https://visjs.github.io/vis-timeline/docs/timeline/#Localization"));
	            this.warned = true;
	          }

	          optionsLocale = this.options.locales['en']; // fall back on english when not available
	        }

	        deleteButton.title = optionsLocale.deleteSelected; // TODO: be able to destroy the delete button

	        this.hammerDeleteButton = new Hammer$1(deleteButton).on('tap', function (event) {
	          event.stopPropagation();
	          me.parent.removeFromDataSet(me);
	        });
	        anchor.appendChild(deleteButton);
	        this.dom.deleteButton = deleteButton;
	      } else if (!this.selected && this.dom.deleteButton) {
	        // remove button
	        if (this.dom.deleteButton.parentNode) {
	          this.dom.deleteButton.parentNode.removeChild(this.dom.deleteButton);
	        }

	        this.dom.deleteButton = null;

	        if (this.hammerDeleteButton) {
	          this.hammerDeleteButton.destroy();
	          this.hammerDeleteButton = null;
	        }
	      }
	    }
	    /**
	     * Repaint a onChange tooltip on the top right of the item when the item is selected
	     * @param {HTMLElement} anchor
	     * @protected
	     */

	  }, {
	    key: "_repaintOnItemUpdateTimeTooltip",
	    value: function _repaintOnItemUpdateTimeTooltip(anchor) {
	      if (!this.options.tooltipOnItemUpdateTime) return;
	      var editable = (this.options.editable.updateTime || this.data.editable === true) && this.data.editable !== false;

	      if (this.selected && editable && !this.dom.onItemUpdateTimeTooltip) {
	        var onItemUpdateTimeTooltip = document.createElement('div');
	        onItemUpdateTimeTooltip.className = 'vis-onUpdateTime-tooltip';
	        anchor.appendChild(onItemUpdateTimeTooltip);
	        this.dom.onItemUpdateTimeTooltip = onItemUpdateTimeTooltip;
	      } else if (!this.selected && this.dom.onItemUpdateTimeTooltip) {
	        // remove button
	        if (this.dom.onItemUpdateTimeTooltip.parentNode) {
	          this.dom.onItemUpdateTimeTooltip.parentNode.removeChild(this.dom.onItemUpdateTimeTooltip);
	        }

	        this.dom.onItemUpdateTimeTooltip = null;
	      } // position onChange tooltip


	      if (this.dom.onItemUpdateTimeTooltip) {
	        // only show when editing
	        this.dom.onItemUpdateTimeTooltip.style.visibility = this.parent.itemSet.touchParams.itemIsDragging ? 'visible' : 'hidden'; // position relative to item's content

	        this.dom.onItemUpdateTimeTooltip.style.transform = 'translateX(-50%)';
	        this.dom.onItemUpdateTimeTooltip.style.left = '50%'; // position above or below the item depending on the item's position in the window

	        var tooltipOffset = 50; // TODO: should be tooltip height (depends on template)

	        var scrollTop = this.parent.itemSet.body.domProps.scrollTop; // TODO: this.top for orientation:true is actually the items distance from the bottom... 
	        // (should be this.bottom)

	        var itemDistanceFromTop;

	        if (this.options.orientation.item == 'top') {
	          itemDistanceFromTop = this.top;
	        } else {
	          itemDistanceFromTop = this.parent.height - this.top - this.height;
	        }

	        var isCloseToTop = itemDistanceFromTop + this.parent.top - tooltipOffset < -scrollTop;

	        if (isCloseToTop) {
	          this.dom.onItemUpdateTimeTooltip.style.bottom = "";
	          this.dom.onItemUpdateTimeTooltip.style.top = "".concat(this.height + 2, "px");
	        } else {
	          this.dom.onItemUpdateTimeTooltip.style.top = "";
	          this.dom.onItemUpdateTimeTooltip.style.bottom = "".concat(this.height + 2, "px");
	        } // handle tooltip content


	        var content;
	        var templateFunction;

	        if (this.options.tooltipOnItemUpdateTime && this.options.tooltipOnItemUpdateTime.template) {
	          var _context4;

	          templateFunction = bind$2(_context4 = this.options.tooltipOnItemUpdateTime.template).call(_context4, this);
	          content = templateFunction(this.data);
	        } else {
	          content = "start: ".concat(moment(this.data.start).format('MM/DD/YYYY hh:mm'));

	          if (this.data.end) {
	            content += "<br> end: ".concat(moment(this.data.end).format('MM/DD/YYYY hh:mm'));
	          }
	        }

	        this.dom.onItemUpdateTimeTooltip.innerHTML = content;
	      }
	    }
	    /**
	    * get item data
	    * @return {object}
	    * @private
	    */

	  }, {
	    key: "_getItemData",
	    value: function _getItemData() {
	      return this.parent.itemSet.itemsData.get(this.id);
	    }
	    /**
	     * Set HTML contents for the item
	     * @param {Element} element   HTML element to fill with the contents
	     * @private
	     */

	  }, {
	    key: "_updateContents",
	    value: function _updateContents(element) {
	      var content;
	      var changed;
	      var templateFunction;
	      var itemVisibleFrameContent;
	      var visibleFrameTemplateFunction;

	      var itemData = this._getItemData(); // get a clone of the data from the dataset


	      var frameElement = this.dom.box || this.dom.point;
	      var itemVisibleFrameContentElement = frameElement.getElementsByClassName('vis-item-visible-frame')[0];

	      if (this.options.visibleFrameTemplate) {
	        var _context5;

	        visibleFrameTemplateFunction = bind$2(_context5 = this.options.visibleFrameTemplate).call(_context5, this);
	        itemVisibleFrameContent = visibleFrameTemplateFunction(itemData, itemVisibleFrameContentElement);
	      } else {
	        itemVisibleFrameContent = '';
	      }

	      if (itemVisibleFrameContentElement) {
	        if (itemVisibleFrameContent instanceof Object && !(itemVisibleFrameContent instanceof Element)) {
	          visibleFrameTemplateFunction(itemData, itemVisibleFrameContentElement);
	        } else {
	          changed = this._contentToString(this.itemVisibleFrameContent) !== this._contentToString(itemVisibleFrameContent);

	          if (changed) {
	            // only replace the content when changed
	            if (itemVisibleFrameContent instanceof Element) {
	              itemVisibleFrameContentElement.innerHTML = '';
	              itemVisibleFrameContentElement.appendChild(itemVisibleFrameContent);
	            } else if (itemVisibleFrameContent != undefined) {
	              itemVisibleFrameContentElement.innerHTML = itemVisibleFrameContent;
	            } else {
	              if (!(this.data.type == 'background' && this.data.content === undefined)) {
	                throw new Error("Property \"content\" missing in item ".concat(this.id));
	              }
	            }

	            this.itemVisibleFrameContent = itemVisibleFrameContent;
	          }
	        }
	      }

	      if (this.options.template) {
	        var _context6;

	        templateFunction = bind$2(_context6 = this.options.template).call(_context6, this);
	        content = templateFunction(itemData, element, this.data);
	      } else {
	        content = this.data.content;
	      }

	      if (content instanceof Object && !(content instanceof Element)) {
	        templateFunction(itemData, element);
	      } else {
	        changed = this._contentToString(this.content) !== this._contentToString(content);

	        if (changed) {
	          // only replace the content when changed
	          if (content instanceof Element) {
	            element.innerHTML = '';
	            element.appendChild(content);
	          } else if (content != undefined) {
	            element.innerHTML = content;
	          } else {
	            if (!(this.data.type == 'background' && this.data.content === undefined)) {
	              throw new Error("Property \"content\" missing in item ".concat(this.id));
	            }
	          }

	          this.content = content;
	        }
	      }
	    }
	    /**
	     * Process dataAttributes timeline option and set as data- attributes on dom.content
	     * @param {Element} element   HTML element to which the attributes will be attached
	     * @private
	     */

	  }, {
	    key: "_updateDataAttributes",
	    value: function _updateDataAttributes(element) {
	      if (this.options.dataAttributes && this.options.dataAttributes.length > 0) {
	        var attributes = [];

	        if (isArray$3(this.options.dataAttributes)) {
	          attributes = this.options.dataAttributes;
	        } else if (this.options.dataAttributes == 'all') {
	          attributes = keys$3(this.data);
	        } else {
	          return;
	        }

	        var _iterator = _createForOfIteratorHelper$1(attributes),
	            _step;

	        try {
	          for (_iterator.s(); !(_step = _iterator.n()).done;) {
	            var name = _step.value;
	            var value = this.data[name];

	            if (value != null) {
	              element.setAttribute("data-".concat(name), value);
	            } else {
	              element.removeAttribute("data-".concat(name));
	            }
	          }
	        } catch (err) {
	          _iterator.e(err);
	        } finally {
	          _iterator.f();
	        }
	      }
	    }
	    /**
	     * Update custom styles of the element
	     * @param {Element} element
	     * @private
	     */

	  }, {
	    key: "_updateStyle",
	    value: function _updateStyle(element) {
	      // remove old styles
	      if (this.style) {
	        util$1.removeCssText(element, this.style);
	        this.style = null;
	      } // append new styles


	      if (this.data.style) {
	        util$1.addCssText(element, this.data.style);
	        this.style = this.data.style;
	      }
	    }
	    /**
	     * Stringify the items contents
	     * @param {string | Element | undefined} content
	     * @returns {string | undefined}
	     * @private
	     */

	  }, {
	    key: "_contentToString",
	    value: function _contentToString(content) {
	      if (typeof content === 'string') return content;
	      if (content && 'outerHTML' in content) return content.outerHTML;
	      return content;
	    }
	    /**
	     * Update the editability of this item.
	     */

	  }, {
	    key: "_updateEditStatus",
	    value: function _updateEditStatus() {
	      if (this.options) {
	        if (typeof this.options.editable === 'boolean') {
	          this.editable = {
	            updateTime: this.options.editable,
	            updateGroup: this.options.editable,
	            remove: this.options.editable
	          };
	        } else if (_typeof_1(this.options.editable) === 'object') {
	          this.editable = {};
	          util$1.selectiveExtend(['updateTime', 'updateGroup', 'remove'], this.editable, this.options.editable);
	        }
	      } // Item data overrides, except if options.editable.overrideItems is set.


	      if (!this.options || !this.options.editable || this.options.editable.overrideItems !== true) {
	        if (this.data) {
	          if (typeof this.data.editable === 'boolean') {
	            this.editable = {
	              updateTime: this.data.editable,
	              updateGroup: this.data.editable,
	              remove: this.data.editable
	            };
	          } else if (_typeof_1(this.data.editable) === 'object') {
	            // TODO: in timeline.js 5.0, we should change this to not reset options from the timeline configuration.
	            // Basically just remove the next line...
	            this.editable = {};
	            util$1.selectiveExtend(['updateTime', 'updateGroup', 'remove'], this.editable, this.data.editable);
	          }
	        }
	      }
	    }
	    /**
	     * Return the width of the item left from its start date
	     * @return {number}
	     */

	  }, {
	    key: "getWidthLeft",
	    value: function getWidthLeft() {
	      return 0;
	    }
	    /**
	     * Return the width of the item right from the max of its start and end date
	     * @return {number}
	     */

	  }, {
	    key: "getWidthRight",
	    value: function getWidthRight() {
	      return 0;
	    }
	    /**
	     * Return the title of the item
	     * @return {string | undefined}
	     */

	  }, {
	    key: "getTitle",
	    value: function getTitle() {
	      if (this.options.tooltip && this.options.tooltip.template) {
	        var _context7;

	        var templateFunction = bind$2(_context7 = this.options.tooltip.template).call(_context7, this);

	        return templateFunction(this._getItemData(), this.data);
	      }

	      return this.data.title;
	    }
	  }]);

	  return Item;
	}();

	Item.prototype.stack = true;

	function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * @constructor BoxItem
	 * @extends Item
	 */

	var BoxItem = /*#__PURE__*/function (_Item) {
	  inherits(BoxItem, _Item);

	  var _super = _createSuper$5(BoxItem);

	  /**
	  * @param {Object} data             Object containing parameters start
	  *                                  content, className.
	  * @param {{toScreen: function, toTime: function}} conversion
	  *                                  Conversion functions from time to screen and vice versa
	  * @param {Object} [options]        Configuration options
	  *                                  // TODO: describe available options
	  */
	  function BoxItem(data, conversion, options) {
	    var _this;

	    classCallCheck(this, BoxItem);

	    _this = _super.call(this, data, conversion, options);
	    _this.props = {
	      dot: {
	        width: 0,
	        height: 0
	      },
	      line: {
	        width: 0,
	        height: 0
	      }
	    }; // validate data

	    if (data) {
	      if (data.start == undefined) {
	        throw new Error("Property \"start\" missing in item ".concat(data));
	      }
	    }

	    return _this;
	  }
	  /**
	   * Check whether this item is visible inside given range
	   * @param {{start: number, end: number}} range with a timestamp for start and end
	   * @returns {boolean} True if visible
	   */


	  createClass(BoxItem, [{
	    key: "isVisible",
	    value: function isVisible(range) {
	      if (this.cluster) {
	        return false;
	      } // determine visibility


	      var isVisible;
	      var align = this.data.align || this.options.align;
	      var widthInMs = this.width * range.getMillisecondsPerPixel();

	      if (align == 'right') {
	        isVisible = this.data.start.getTime() > range.start && this.data.start.getTime() - widthInMs < range.end;
	      } else if (align == 'left') {
	        isVisible = this.data.start.getTime() + widthInMs > range.start && this.data.start.getTime() < range.end;
	      } else {
	        // default or 'center'
	        isVisible = this.data.start.getTime() + widthInMs / 2 > range.start && this.data.start.getTime() - widthInMs / 2 < range.end;
	      }

	      return isVisible;
	    }
	    /**
	    * create DOM element
	    * @private
	    */

	  }, {
	    key: "_createDomElement",
	    value: function _createDomElement() {
	      if (!this.dom) {
	        // create DOM
	        this.dom = {}; // create main box

	        this.dom.box = document.createElement('DIV'); // contents box (inside the background box). used for making margins

	        this.dom.content = document.createElement('DIV');
	        this.dom.content.className = 'vis-item-content';
	        this.dom.box.appendChild(this.dom.content); // line to axis

	        this.dom.line = document.createElement('DIV');
	        this.dom.line.className = 'vis-line'; // dot on axis

	        this.dom.dot = document.createElement('DIV');
	        this.dom.dot.className = 'vis-dot'; // attach this item as attribute

	        this.dom.box['vis-item'] = this;
	        this.dirty = true;
	      }
	    }
	    /**
	     * append DOM element
	     * @private
	     */

	  }, {
	    key: "_appendDomElement",
	    value: function _appendDomElement() {
	      if (!this.parent) {
	        throw new Error('Cannot redraw item: no parent attached');
	      }

	      if (!this.dom.box.parentNode) {
	        var foreground = this.parent.dom.foreground;
	        if (!foreground) throw new Error('Cannot redraw item: parent has no foreground container element');
	        foreground.appendChild(this.dom.box);
	      }

	      if (!this.dom.line.parentNode) {
	        var background = this.parent.dom.background;
	        if (!background) throw new Error('Cannot redraw item: parent has no background container element');
	        background.appendChild(this.dom.line);
	      }

	      if (!this.dom.dot.parentNode) {
	        var axis = this.parent.dom.axis;
	        if (!background) throw new Error('Cannot redraw item: parent has no axis container element');
	        axis.appendChild(this.dom.dot);
	      }

	      this.displayed = true;
	    }
	    /**
	     * update dirty DOM element
	     * @private
	     */

	  }, {
	    key: "_updateDirtyDomComponents",
	    value: function _updateDirtyDomComponents() {
	      // An item is marked dirty when:
	      // - the item is not yet rendered
	      // - the item's data is changed
	      // - the item is selected/deselected
	      if (this.dirty) {
	        this._updateContents(this.dom.content);

	        this._updateDataAttributes(this.dom.box);

	        this._updateStyle(this.dom.box);

	        var editable = this.editable.updateTime || this.editable.updateGroup; // update class

	        var className = (this.data.className ? ' ' + this.data.className : '') + (this.selected ? ' vis-selected' : '') + (editable ? ' vis-editable' : ' vis-readonly');
	        this.dom.box.className = "vis-item vis-box".concat(className);
	        this.dom.line.className = "vis-item vis-line".concat(className);
	        this.dom.dot.className = "vis-item vis-dot".concat(className);
	      }
	    }
	    /**
	     * get DOM components sizes
	     * @return {object}
	     * @private
	     */

	  }, {
	    key: "_getDomComponentsSizes",
	    value: function _getDomComponentsSizes() {
	      return {
	        previous: {
	          right: this.dom.box.style.right,
	          left: this.dom.box.style.left
	        },
	        dot: {
	          height: this.dom.dot.offsetHeight,
	          width: this.dom.dot.offsetWidth
	        },
	        line: {
	          width: this.dom.line.offsetWidth
	        },
	        box: {
	          width: this.dom.box.offsetWidth,
	          height: this.dom.box.offsetHeight
	        }
	      };
	    }
	    /**
	     * update DOM components sizes
	     * @param {object} sizes
	     * @private
	     */

	  }, {
	    key: "_updateDomComponentsSizes",
	    value: function _updateDomComponentsSizes(sizes) {
	      if (this.options.rtl) {
	        this.dom.box.style.right = "0px";
	      } else {
	        this.dom.box.style.left = "0px";
	      } // recalculate size


	      this.props.dot.height = sizes.dot.height;
	      this.props.dot.width = sizes.dot.width;
	      this.props.line.width = sizes.line.width;
	      this.width = sizes.box.width;
	      this.height = sizes.box.height; // restore previous position

	      if (this.options.rtl) {
	        this.dom.box.style.right = sizes.previous.right;
	      } else {
	        this.dom.box.style.left = sizes.previous.left;
	      }

	      this.dirty = false;
	    }
	    /**
	     * repaint DOM additionals
	     * @private
	     */

	  }, {
	    key: "_repaintDomAdditionals",
	    value: function _repaintDomAdditionals() {
	      this._repaintOnItemUpdateTimeTooltip(this.dom.box);

	      this._repaintDragCenter();

	      this._repaintDeleteButton(this.dom.box);
	    }
	    /**
	     * Repaint the item
	     * @param {boolean} [returnQueue=false]  return the queue
	     * @return {boolean} the redraw queue if returnQueue=true
	     */

	  }, {
	    key: "redraw",
	    value: function redraw(returnQueue) {
	      var _context,
	          _context2,
	          _context3,
	          _this2 = this,
	          _context5;

	      var sizes;
	      var queue = [// create item DOM
	      bind$2(_context = this._createDomElement).call(_context, this), // append DOM to parent DOM
	      bind$2(_context2 = this._appendDomElement).call(_context2, this), // update dirty DOM
	      bind$2(_context3 = this._updateDirtyDomComponents).call(_context3, this), function () {
	        if (_this2.dirty) {
	          sizes = _this2._getDomComponentsSizes();
	        }
	      }, function () {
	        if (_this2.dirty) {
	          var _context4;

	          bind$2(_context4 = _this2._updateDomComponentsSizes).call(_context4, _this2)(sizes);
	        }
	      }, // repaint DOM additionals
	      bind$2(_context5 = this._repaintDomAdditionals).call(_context5, this)];

	      if (returnQueue) {
	        return queue;
	      } else {
	        var result;

	        forEach$2(queue).call(queue, function (fn) {
	          result = fn();
	        });

	        return result;
	      }
	    }
	    /**
	     * Show the item in the DOM (when not already visible). The items DOM will
	     * be created when needed.
	     * @param {boolean} [returnQueue=false]  whether to return a queue of functions to execute instead of just executing them
	     * @return {boolean} the redraw queue if returnQueue=true
	     */

	  }, {
	    key: "show",
	    value: function show(returnQueue) {
	      if (!this.displayed) {
	        return this.redraw(returnQueue);
	      }
	    }
	    /**
	     * Hide the item from the DOM (when visible)
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      if (this.displayed) {
	        var dom = this.dom;
	        if (dom.box.remove) dom.box.remove();else if (dom.box.parentNode) dom.box.parentNode.removeChild(dom.box); // IE11

	        if (dom.line.remove) dom.line.remove();else if (dom.line.parentNode) dom.line.parentNode.removeChild(dom.line); // IE11

	        if (dom.dot.remove) dom.dot.remove();else if (dom.dot.parentNode) dom.dot.parentNode.removeChild(dom.dot); // IE11

	        this.displayed = false;
	      }
	    }
	    /**
	     * Reposition the item XY
	     */

	  }, {
	    key: "repositionXY",
	    value: function repositionXY() {
	      var rtl = this.options.rtl;

	      var repositionXY = function repositionXY(element, x, y) {
	        var _context6;

	        var rtl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	        if (x === undefined && y === undefined) return; // If rtl invert the number.

	        var directionX = rtl ? x * -1 : x; //no y. translate x

	        if (y === undefined) {
	          element.style.transform = "translateX(".concat(directionX, "px)");
	          return;
	        } //no x. translate y


	        if (x === undefined) {
	          element.style.transform = "translateY(".concat(y, "px)");
	          return;
	        }

	        element.style.transform = concat$2(_context6 = "translate(".concat(directionX, "px, ")).call(_context6, y, "px)");
	      };

	      repositionXY(this.dom.box, this.boxX, this.boxY, rtl);
	      repositionXY(this.dom.dot, this.dotX, this.dotY, rtl);
	      repositionXY(this.dom.line, this.lineX, this.lineY, rtl);
	    }
	    /**
	     * Reposition the item horizontally
	     * @Override
	     */

	  }, {
	    key: "repositionX",
	    value: function repositionX() {
	      var start = this.conversion.toScreen(this.data.start);
	      var align = this.data.align === undefined ? this.options.align : this.data.align;
	      var lineWidth = this.props.line.width;
	      var dotWidth = this.props.dot.width;

	      if (align == 'right') {
	        // calculate right position of the box
	        this.boxX = start - this.width;
	        this.lineX = start - lineWidth;
	        this.dotX = start - lineWidth / 2 - dotWidth / 2;
	      } else if (align == 'left') {
	        // calculate left position of the box
	        this.boxX = start;
	        this.lineX = start;
	        this.dotX = start + lineWidth / 2 - dotWidth / 2;
	      } else {
	        // default or 'center'
	        this.boxX = start - this.width / 2;
	        this.lineX = this.options.rtl ? start - lineWidth : start - lineWidth / 2;
	        this.dotX = start - dotWidth / 2;
	      }

	      if (this.options.rtl) this.right = this.boxX;else this.left = this.boxX;
	      this.repositionXY();
	    }
	    /**
	     * Reposition the item vertically
	     * @Override
	     */

	  }, {
	    key: "repositionY",
	    value: function repositionY() {
	      var orientation = this.options.orientation.item;
	      var lineStyle = this.dom.line.style;

	      if (orientation == 'top') {
	        var lineHeight = this.parent.top + this.top + 1;
	        this.boxY = this.top || 0;
	        lineStyle.height = "".concat(lineHeight, "px");
	        lineStyle.bottom = '';
	        lineStyle.top = '0';
	      } else {
	        // orientation 'bottom'
	        var itemSetHeight = this.parent.itemSet.props.height; // TODO: this is nasty

	        var _lineHeight = itemSetHeight - this.parent.top - this.parent.height + this.top;

	        this.boxY = this.parent.height - this.top - (this.height || 0);
	        lineStyle.height = "".concat(_lineHeight, "px");
	        lineStyle.top = '';
	        lineStyle.bottom = '0';
	      }

	      this.dotY = -this.props.dot.height / 2;
	      this.repositionXY();
	    }
	    /**
	     * Return the width of the item left from its start date
	     * @return {number}
	     */

	  }, {
	    key: "getWidthLeft",
	    value: function getWidthLeft() {
	      return this.width / 2;
	    }
	    /**
	     * Return the width of the item right from its start date
	     * @return {number}
	     */

	  }, {
	    key: "getWidthRight",
	    value: function getWidthRight() {
	      return this.width / 2;
	    }
	  }]);

	  return BoxItem;
	}(Item);

	function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * @constructor PointItem
	 * @extends Item
	 */

	var PointItem = /*#__PURE__*/function (_Item) {
	  inherits(PointItem, _Item);

	  var _super = _createSuper$6(PointItem);

	  /**
	  * @param {Object} data             Object containing parameters start
	  *                                  content, className.
	  * @param {{toScreen: function, toTime: function}} conversion
	  *                                  Conversion functions from time to screen and vice versa
	  * @param {Object} [options]        Configuration options
	  *                                  // TODO: describe available options
	  */
	  function PointItem(data, conversion, options) {
	    var _this;

	    classCallCheck(this, PointItem);

	    _this = _super.call(this, data, conversion, options);
	    _this.props = {
	      dot: {
	        top: 0,
	        width: 0,
	        height: 0
	      },
	      content: {
	        height: 0,
	        marginLeft: 0,
	        marginRight: 0
	      }
	    }; // validate data

	    if (data) {
	      if (data.start == undefined) {
	        throw new Error("Property \"start\" missing in item ".concat(data));
	      }
	    }

	    return _this;
	  }
	  /**
	   * Check whether this item is visible inside given range
	   * @param {{start: number, end: number}} range with a timestamp for start and end
	   * @returns {boolean} True if visible
	   */


	  createClass(PointItem, [{
	    key: "isVisible",
	    value: function isVisible(range) {
	      if (this.cluster) {
	        return false;
	      } // determine visibility


	      var widthInMs = this.width * range.getMillisecondsPerPixel();
	      return this.data.start.getTime() + widthInMs > range.start && this.data.start < range.end;
	    }
	    /**
	     * create DOM element
	     * @private
	     */

	  }, {
	    key: "_createDomElement",
	    value: function _createDomElement() {
	      if (!this.dom) {
	        // create DOM
	        this.dom = {}; // background box

	        this.dom.point = document.createElement('div'); // className is updated in redraw()
	        // contents box, right from the dot

	        this.dom.content = document.createElement('div');
	        this.dom.content.className = 'vis-item-content';
	        this.dom.point.appendChild(this.dom.content); // dot at start

	        this.dom.dot = document.createElement('div');
	        this.dom.point.appendChild(this.dom.dot); // attach this item as attribute

	        this.dom.point['vis-item'] = this;
	        this.dirty = true;
	      }
	    }
	    /**
	     * append DOM element
	     * @private
	     */

	  }, {
	    key: "_appendDomElement",
	    value: function _appendDomElement() {
	      if (!this.parent) {
	        throw new Error('Cannot redraw item: no parent attached');
	      }

	      if (!this.dom.point.parentNode) {
	        var foreground = this.parent.dom.foreground;

	        if (!foreground) {
	          throw new Error('Cannot redraw item: parent has no foreground container element');
	        }

	        foreground.appendChild(this.dom.point);
	      }

	      this.displayed = true;
	    }
	    /**
	     * update dirty DOM components
	     * @private
	     */

	  }, {
	    key: "_updateDirtyDomComponents",
	    value: function _updateDirtyDomComponents() {
	      // An item is marked dirty when:
	      // - the item is not yet rendered
	      // - the item's data is changed
	      // - the item is selected/deselected
	      if (this.dirty) {
	        this._updateContents(this.dom.content);

	        this._updateDataAttributes(this.dom.point);

	        this._updateStyle(this.dom.point);

	        var editable = this.editable.updateTime || this.editable.updateGroup; // update class

	        var className = (this.data.className ? ' ' + this.data.className : '') + (this.selected ? ' vis-selected' : '') + (editable ? ' vis-editable' : ' vis-readonly');
	        this.dom.point.className = "vis-item vis-point".concat(className);
	        this.dom.dot.className = "vis-item vis-dot".concat(className);
	      }
	    }
	    /**
	     * get DOM component sizes
	     * @return {object}
	     * @private
	     */

	  }, {
	    key: "_getDomComponentsSizes",
	    value: function _getDomComponentsSizes() {
	      return {
	        dot: {
	          width: this.dom.dot.offsetWidth,
	          height: this.dom.dot.offsetHeight
	        },
	        content: {
	          width: this.dom.content.offsetWidth,
	          height: this.dom.content.offsetHeight
	        },
	        point: {
	          width: this.dom.point.offsetWidth,
	          height: this.dom.point.offsetHeight
	        }
	      };
	    }
	    /**
	     * update DOM components sizes
	     * @param {array} sizes
	     * @private
	     */

	  }, {
	    key: "_updateDomComponentsSizes",
	    value: function _updateDomComponentsSizes(sizes) {
	      // recalculate size of dot and contents
	      this.props.dot.width = sizes.dot.width;
	      this.props.dot.height = sizes.dot.height;
	      this.props.content.height = sizes.content.height; // resize contents

	      if (this.options.rtl) {
	        this.dom.content.style.marginRight = "".concat(2 * this.props.dot.width, "px");
	      } else {
	        this.dom.content.style.marginLeft = "".concat(2 * this.props.dot.width, "px");
	      } //this.dom.content.style.marginRight = ... + 'px'; // TODO: margin right
	      // recalculate size


	      this.width = sizes.point.width;
	      this.height = sizes.point.height; // reposition the dot

	      this.dom.dot.style.top = "".concat((this.height - this.props.dot.height) / 2, "px");
	      var dotWidth = this.props.dot.width;
	      var translateX = this.options.rtl ? dotWidth / 2 * -1 : dotWidth / 2;
	      this.dom.dot.style.transform = "translateX(".concat(translateX, "px");
	      this.dirty = false;
	    }
	    /**
	     * Repain DOM additionals
	     * @private
	     */

	  }, {
	    key: "_repaintDomAdditionals",
	    value: function _repaintDomAdditionals() {
	      this._repaintOnItemUpdateTimeTooltip(this.dom.point);

	      this._repaintDragCenter();

	      this._repaintDeleteButton(this.dom.point);
	    }
	    /**
	     * Repaint the item
	     * @param {boolean} [returnQueue=false]  return the queue
	     * @return {boolean} the redraw queue if returnQueue=true
	     */

	  }, {
	    key: "redraw",
	    value: function redraw(returnQueue) {
	      var _context,
	          _context2,
	          _context3,
	          _this2 = this,
	          _context5;

	      var sizes;
	      var queue = [// create item DOM
	      bind$2(_context = this._createDomElement).call(_context, this), // append DOM to parent DOM
	      bind$2(_context2 = this._appendDomElement).call(_context2, this), // update dirty DOM
	      bind$2(_context3 = this._updateDirtyDomComponents).call(_context3, this), function () {
	        if (_this2.dirty) {
	          sizes = _this2._getDomComponentsSizes();
	        }
	      }, function () {
	        if (_this2.dirty) {
	          var _context4;

	          bind$2(_context4 = _this2._updateDomComponentsSizes).call(_context4, _this2)(sizes);
	        }
	      }, // repaint DOM additionals
	      bind$2(_context5 = this._repaintDomAdditionals).call(_context5, this)];

	      if (returnQueue) {
	        return queue;
	      } else {
	        var result;

	        forEach$2(queue).call(queue, function (fn) {
	          result = fn();
	        });

	        return result;
	      }
	    }
	    /**
	     * Reposition XY
	     */

	  }, {
	    key: "repositionXY",
	    value: function repositionXY() {
	      var rtl = this.options.rtl;

	      var repositionXY = function repositionXY(element, x, y) {
	        var _context6;

	        var rtl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	        if (x === undefined && y === undefined) return; // If rtl invert the number.

	        var directionX = rtl ? x * -1 : x; //no y. translate x

	        if (y === undefined) {
	          element.style.transform = "translateX(".concat(directionX, "px)");
	          return;
	        } //no x. translate y


	        if (x === undefined) {
	          element.style.transform = "translateY(".concat(y, "px)");
	          return;
	        }

	        element.style.transform = concat$2(_context6 = "translate(".concat(directionX, "px, ")).call(_context6, y, "px)");
	      };

	      repositionXY(this.dom.point, this.pointX, this.pointY, rtl);
	    }
	    /**
	     * Show the item in the DOM (when not already visible). The items DOM will
	     * be created when needed.
	     * @param {boolean} [returnQueue=false]  whether to return a queue of functions to execute instead of just executing them
	     * @return {boolean} the redraw queue if returnQueue=true
	     */

	  }, {
	    key: "show",
	    value: function show(returnQueue) {
	      if (!this.displayed) {
	        return this.redraw(returnQueue);
	      }
	    }
	    /**
	     * Hide the item from the DOM (when visible)
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      if (this.displayed) {
	        if (this.dom.point.parentNode) {
	          this.dom.point.parentNode.removeChild(this.dom.point);
	        }

	        this.displayed = false;
	      }
	    }
	    /**
	     * Reposition the item horizontally
	     * @Override
	     */

	  }, {
	    key: "repositionX",
	    value: function repositionX() {
	      var start = this.conversion.toScreen(this.data.start);
	      this.pointX = start;

	      if (this.options.rtl) {
	        this.right = start - this.props.dot.width;
	      } else {
	        this.left = start - this.props.dot.width;
	      }

	      this.repositionXY();
	    }
	    /**
	     * Reposition the item vertically
	     * @Override
	     */

	  }, {
	    key: "repositionY",
	    value: function repositionY() {
	      var orientation = this.options.orientation.item;

	      if (orientation == 'top') {
	        this.pointY = this.top;
	      } else {
	        this.pointY = this.parent.height - this.top - this.height;
	      }

	      this.repositionXY();
	    }
	    /**
	     * Return the width of the item left from its start date
	     * @return {number}
	     */

	  }, {
	    key: "getWidthLeft",
	    value: function getWidthLeft() {
	      return this.props.dot.width;
	    }
	    /**
	     * Return the width of the item right from  its start date
	     * @return {number}
	     */

	  }, {
	    key: "getWidthRight",
	    value: function getWidthRight() {
	      return this.props.dot.width;
	    }
	  }]);

	  return PointItem;
	}(Item);

	function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * @constructor RangeItem
	 * @extends Item
	 */

	var RangeItem = /*#__PURE__*/function (_Item) {
	  inherits(RangeItem, _Item);

	  var _super = _createSuper$7(RangeItem);

	  /**
	  * @param {Object} data             Object containing parameters start, end
	  *                                  content, className.
	  * @param {{toScreen: function, toTime: function}} conversion
	  *                                  Conversion functions from time to screen and vice versa
	  * @param {Object} [options]        Configuration options
	  *                                  // TODO: describe options
	  */
	  function RangeItem(data, conversion, options) {
	    var _this;

	    classCallCheck(this, RangeItem);

	    _this = _super.call(this, data, conversion, options);
	    _this.props = {
	      content: {
	        width: 0
	      }
	    };
	    _this.overflow = false; // if contents can overflow (css styling), this flag is set to true
	    // validate data

	    if (data) {
	      if (data.start == undefined) {
	        throw new Error("Property \"start\" missing in item ".concat(data.id));
	      }

	      if (data.end == undefined) {
	        throw new Error("Property \"end\" missing in item ".concat(data.id));
	      }
	    }

	    return _this;
	  }
	  /**
	   * Check whether this item is visible inside given range
	   *
	   * @param {timeline.Range} range with a timestamp for start and end
	   * @returns {boolean} True if visible
	   */


	  createClass(RangeItem, [{
	    key: "isVisible",
	    value: function isVisible(range) {
	      if (this.cluster) {
	        return false;
	      } // determine visibility


	      return this.data.start < range.end && this.data.end > range.start;
	    }
	    /**
	     * create DOM elements
	     * @private
	     */

	  }, {
	    key: "_createDomElement",
	    value: function _createDomElement() {
	      if (!this.dom) {
	        // create DOM
	        this.dom = {}; // background box

	        this.dom.box = document.createElement('div'); // className is updated in redraw()
	        // frame box (to prevent the item contents from overflowing)

	        this.dom.frame = document.createElement('div');
	        this.dom.frame.className = 'vis-item-overflow';
	        this.dom.box.appendChild(this.dom.frame); // visible frame box (showing the frame that is always visible)

	        this.dom.visibleFrame = document.createElement('div');
	        this.dom.visibleFrame.className = 'vis-item-visible-frame';
	        this.dom.box.appendChild(this.dom.visibleFrame); // contents box

	        this.dom.content = document.createElement('div');
	        this.dom.content.className = 'vis-item-content';
	        this.dom.frame.appendChild(this.dom.content); // attach this item as attribute

	        this.dom.box['vis-item'] = this;
	        this.dirty = true;
	      }
	    }
	    /**
	     * append element to DOM
	     * @private
	     */

	  }, {
	    key: "_appendDomElement",
	    value: function _appendDomElement() {
	      if (!this.parent) {
	        throw new Error('Cannot redraw item: no parent attached');
	      }

	      if (!this.dom.box.parentNode) {
	        var foreground = this.parent.dom.foreground;

	        if (!foreground) {
	          throw new Error('Cannot redraw item: parent has no foreground container element');
	        }

	        foreground.appendChild(this.dom.box);
	      }

	      this.displayed = true;
	    }
	    /**
	     * update dirty DOM components
	     * @private
	     */

	  }, {
	    key: "_updateDirtyDomComponents",
	    value: function _updateDirtyDomComponents() {
	      // update dirty DOM. An item is marked dirty when:
	      // - the item is not yet rendered
	      // - the item's data is changed
	      // - the item is selected/deselected
	      if (this.dirty) {
	        this._updateContents(this.dom.content);

	        this._updateDataAttributes(this.dom.box);

	        this._updateStyle(this.dom.box);

	        var editable = this.editable.updateTime || this.editable.updateGroup; // update class

	        var className = (this.data.className ? ' ' + this.data.className : '') + (this.selected ? ' vis-selected' : '') + (editable ? ' vis-editable' : ' vis-readonly');
	        this.dom.box.className = this.baseClassName + className; // turn off max-width to be able to calculate the real width
	        // this causes an extra browser repaint/reflow, but so be it

	        this.dom.content.style.maxWidth = 'none';
	      }
	    }
	    /**
	     * get DOM component sizes
	     * @return {object}
	     * @private
	     */

	  }, {
	    key: "_getDomComponentsSizes",
	    value: function _getDomComponentsSizes() {
	      // determine from css whether this box has overflow
	      this.overflow = window.getComputedStyle(this.dom.frame).overflow !== 'hidden';
	      this.whiteSpace = window.getComputedStyle(this.dom.content).whiteSpace !== 'nowrap';
	      return {
	        content: {
	          width: this.dom.content.offsetWidth
	        },
	        box: {
	          height: this.dom.box.offsetHeight
	        }
	      };
	    }
	    /**
	     * update DOM component sizes
	     * @param {array} sizes
	     * @private
	     */

	  }, {
	    key: "_updateDomComponentsSizes",
	    value: function _updateDomComponentsSizes(sizes) {
	      this.props.content.width = sizes.content.width;
	      this.height = sizes.box.height;
	      this.dom.content.style.maxWidth = '';
	      this.dirty = false;
	    }
	    /**
	     * repaint DOM additional components
	     * @private
	     */

	  }, {
	    key: "_repaintDomAdditionals",
	    value: function _repaintDomAdditionals() {
	      this._repaintOnItemUpdateTimeTooltip(this.dom.box);

	      this._repaintDeleteButton(this.dom.box);

	      this._repaintDragCenter();

	      this._repaintDragLeft();

	      this._repaintDragRight();
	    }
	    /**
	     * Repaint the item
	     * @param {boolean} [returnQueue=false]  return the queue
	     * @return {boolean} the redraw queue if returnQueue=true
	     */

	  }, {
	    key: "redraw",
	    value: function redraw(returnQueue) {
	      var _context,
	          _context2,
	          _context3,
	          _this2 = this,
	          _context6;

	      var sizes;
	      var queue = [// create item DOM
	      bind$2(_context = this._createDomElement).call(_context, this), // append DOM to parent DOM
	      bind$2(_context2 = this._appendDomElement).call(_context2, this), // update dirty DOM 
	      bind$2(_context3 = this._updateDirtyDomComponents).call(_context3, this), function () {
	        if (_this2.dirty) {
	          var _context4;

	          sizes = bind$2(_context4 = _this2._getDomComponentsSizes).call(_context4, _this2)();
	        }
	      }, function () {
	        if (_this2.dirty) {
	          var _context5;

	          bind$2(_context5 = _this2._updateDomComponentsSizes).call(_context5, _this2)(sizes);
	        }
	      }, // repaint DOM additionals
	      bind$2(_context6 = this._repaintDomAdditionals).call(_context6, this)];

	      if (returnQueue) {
	        return queue;
	      } else {
	        var result;

	        forEach$2(queue).call(queue, function (fn) {
	          result = fn();
	        });

	        return result;
	      }
	    }
	    /**
	     * Show the item in the DOM (when not already visible). The items DOM will
	     * be created when needed.
	     * @param {boolean} [returnQueue=false]  whether to return a queue of functions to execute instead of just executing them
	     * @return {boolean} the redraw queue if returnQueue=true
	     */

	  }, {
	    key: "show",
	    value: function show(returnQueue) {
	      if (!this.displayed) {
	        return this.redraw(returnQueue);
	      }
	    }
	    /**
	     * Hide the item from the DOM (when visible)
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      if (this.displayed) {
	        var box = this.dom.box;

	        if (box.parentNode) {
	          box.parentNode.removeChild(box);
	        }

	        this.displayed = false;
	      }
	    }
	    /**
	     * Reposition the item horizontally
	     * @param {boolean} [limitSize=true] If true (default), the width of the range
	     *                                   item will be limited, as the browser cannot
	     *                                   display very wide divs. This means though
	     *                                   that the applied left and width may
	     *                                   not correspond to the ranges start and end
	     * @Override
	     */

	  }, {
	    key: "repositionX",
	    value: function repositionX(limitSize) {
	      var parentWidth = this.parent.width;
	      var start = this.conversion.toScreen(this.data.start);
	      var end = this.conversion.toScreen(this.data.end);
	      var align = this.data.align === undefined ? this.options.align : this.data.align;
	      var contentStartPosition;
	      var contentWidth; // limit the width of the range, as browsers cannot draw very wide divs
	      // unless limitSize: false is explicitly set in item data

	      if (this.data.limitSize !== false && (limitSize === undefined || limitSize === true)) {
	        if (start < -parentWidth) {
	          start = -parentWidth;
	        }

	        if (end > 2 * parentWidth) {
	          end = 2 * parentWidth;
	        }
	      } //round to 3 decimals to compensate floating-point values rounding


	      var boxWidth = Math.max(Math.round((end - start) * 1000) / 1000, 1);

	      if (this.overflow) {
	        if (this.options.rtl) {
	          this.right = start;
	        } else {
	          this.left = start;
	        }

	        this.width = boxWidth + this.props.content.width;
	        contentWidth = this.props.content.width; // Note: The calculation of width is an optimistic calculation, giving
	        //       a width which will not change when moving the Timeline
	        //       So no re-stacking needed, which is nicer for the eye;
	      } else {
	        if (this.options.rtl) {
	          this.right = start;
	        } else {
	          this.left = start;
	        }

	        this.width = boxWidth;
	        contentWidth = Math.min(end - start, this.props.content.width);
	      }

	      if (this.options.rtl) {
	        this.dom.box.style.transform = "translateX(".concat(this.right * -1, "px)");
	      } else {
	        this.dom.box.style.transform = "translateX(".concat(this.left, "px)");
	      }

	      this.dom.box.style.width = "".concat(boxWidth, "px");

	      if (this.whiteSpace) {
	        this.height = this.dom.box.offsetHeight;
	      }

	      switch (align) {
	        case 'left':
	          this.dom.content.style.transform = 'translateX(0)';
	          break;

	        case 'right':
	          if (this.options.rtl) {
	            var translateX = Math.max(boxWidth - contentWidth, 0) * -1;
	            this.dom.content.style.transform = "translateX(".concat(translateX, "px)");
	          } else {
	            this.dom.content.style.transform = "translateX(".concat(Math.max(boxWidth - contentWidth, 0), "px)");
	          }

	          break;

	        case 'center':
	          if (this.options.rtl) {
	            var _translateX = Math.max((boxWidth - contentWidth) / 2, 0) * -1;

	            this.dom.content.style.transform = "translateX(".concat(_translateX, "px)");
	          } else {
	            this.dom.content.style.transform = "translateX(".concat(Math.max((boxWidth - contentWidth) / 2, 0), "px)");
	          }

	          break;

	        default:
	          // 'auto'
	          // when range exceeds left of the window, position the contents at the left of the visible area
	          if (this.overflow) {
	            if (end > 0) {
	              contentStartPosition = Math.max(-start, 0);
	            } else {
	              contentStartPosition = -contentWidth; // ensure it's not visible anymore
	            }
	          } else {
	            if (start < 0) {
	              contentStartPosition = -start;
	            } else {
	              contentStartPosition = 0;
	            }
	          }

	          if (this.options.rtl) {
	            var _translateX2 = contentStartPosition * -1;

	            this.dom.content.style.transform = "translateX(".concat(_translateX2, "px)");
	          } else {
	            this.dom.content.style.transform = "translateX(".concat(contentStartPosition, "px)"); // this.dom.content.style.width = `calc(100% - ${contentStartPosition}px)`;
	          }

	      }
	    }
	    /**
	     * Reposition the item vertically
	     * @Override
	     */

	  }, {
	    key: "repositionY",
	    value: function repositionY() {
	      var orientation = this.options.orientation.item;
	      var box = this.dom.box;

	      if (orientation == 'top') {
	        box.style.top = "".concat(this.top, "px");
	      } else {
	        box.style.top = "".concat(this.parent.height - this.top - this.height, "px");
	      }
	    }
	    /**
	     * Repaint a drag area on the left side of the range when the range is selected
	     * @protected
	     */

	  }, {
	    key: "_repaintDragLeft",
	    value: function _repaintDragLeft() {
	      if ((this.selected || this.options.itemsAlwaysDraggable.range) && this.editable.updateTime && !this.dom.dragLeft) {
	        // create and show drag area
	        var dragLeft = document.createElement('div');
	        dragLeft.className = 'vis-drag-left';
	        dragLeft.dragLeftItem = this;
	        this.dom.box.appendChild(dragLeft);
	        this.dom.dragLeft = dragLeft;
	      } else if (!this.selected && !this.options.itemsAlwaysDraggable.range && this.dom.dragLeft) {
	        // delete drag area
	        if (this.dom.dragLeft.parentNode) {
	          this.dom.dragLeft.parentNode.removeChild(this.dom.dragLeft);
	        }

	        this.dom.dragLeft = null;
	      }
	    }
	    /**
	     * Repaint a drag area on the right side of the range when the range is selected
	     * @protected
	     */

	  }, {
	    key: "_repaintDragRight",
	    value: function _repaintDragRight() {
	      if ((this.selected || this.options.itemsAlwaysDraggable.range) && this.editable.updateTime && !this.dom.dragRight) {
	        // create and show drag area
	        var dragRight = document.createElement('div');
	        dragRight.className = 'vis-drag-right';
	        dragRight.dragRightItem = this;
	        this.dom.box.appendChild(dragRight);
	        this.dom.dragRight = dragRight;
	      } else if (!this.selected && !this.options.itemsAlwaysDraggable.range && this.dom.dragRight) {
	        // delete drag area
	        if (this.dom.dragRight.parentNode) {
	          this.dom.dragRight.parentNode.removeChild(this.dom.dragRight);
	        }

	        this.dom.dragRight = null;
	      }
	    }
	  }]);

	  return RangeItem;
	}(Item);

	RangeItem.prototype.baseClassName = 'vis-item vis-range';

	function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * @constructor BackgroundItem
	 * @extends Item
	 */

	var BackgroundItem = /*#__PURE__*/function (_Item) {
	  inherits(BackgroundItem, _Item);

	  var _super = _createSuper$8(BackgroundItem);

	  /**
	  * @constructor BackgroundItem
	  * @param {Object} data             Object containing parameters start, end
	  *                                  content, className.
	  * @param {{toScreen: function, toTime: function}} conversion
	  *                                  Conversion functions from time to screen and vice versa
	  * @param {Object} [options]        Configuration options
	  *                                  // TODO: describe options
	  * // TODO: implement support for the BackgroundItem just having a start, then being displayed as a sort of an annotation
	  */
	  function BackgroundItem(data, conversion, options) {
	    var _this;

	    classCallCheck(this, BackgroundItem);

	    _this = _super.call(this, data, conversion, options);
	    _this.props = {
	      content: {
	        width: 0
	      }
	    };
	    _this.overflow = false; // if contents can overflow (css styling), this flag is set to true
	    // validate data

	    if (data) {
	      if (data.start == undefined) {
	        throw new Error("Property \"start\" missing in item ".concat(data.id));
	      }

	      if (data.end == undefined) {
	        throw new Error("Property \"end\" missing in item ".concat(data.id));
	      }
	    }

	    return _this;
	  }
	  /**
	   * Check whether this item is visible inside given range
	   * @param {timeline.Range} range with a timestamp for start and end
	   * @returns {boolean} True if visible
	   */


	  createClass(BackgroundItem, [{
	    key: "isVisible",
	    value: function isVisible(range) {
	      // determine visibility
	      return this.data.start < range.end && this.data.end > range.start;
	    }
	    /**
	     * create DOM element
	     * @private
	     */

	  }, {
	    key: "_createDomElement",
	    value: function _createDomElement() {
	      if (!this.dom) {
	        // create DOM
	        this.dom = {}; // background box

	        this.dom.box = document.createElement('div'); // className is updated in redraw()
	        // frame box (to prevent the item contents from overflowing

	        this.dom.frame = document.createElement('div');
	        this.dom.frame.className = 'vis-item-overflow';
	        this.dom.box.appendChild(this.dom.frame); // contents box

	        this.dom.content = document.createElement('div');
	        this.dom.content.className = 'vis-item-content';
	        this.dom.frame.appendChild(this.dom.content); // Note: we do NOT attach this item as attribute to the DOM,
	        //       such that background items cannot be selected
	        //this.dom.box['vis-item'] = this;

	        this.dirty = true;
	      }
	    }
	    /**
	     * append DOM element
	     * @private
	     */

	  }, {
	    key: "_appendDomElement",
	    value: function _appendDomElement() {
	      if (!this.parent) {
	        throw new Error('Cannot redraw item: no parent attached');
	      }

	      if (!this.dom.box.parentNode) {
	        var background = this.parent.dom.background;

	        if (!background) {
	          throw new Error('Cannot redraw item: parent has no background container element');
	        }

	        background.appendChild(this.dom.box);
	      }

	      this.displayed = true;
	    }
	    /**
	     * update DOM Dirty components
	     * @private
	     */

	  }, {
	    key: "_updateDirtyDomComponents",
	    value: function _updateDirtyDomComponents() {
	      // update dirty DOM. An item is marked dirty when:
	      // - the item is not yet rendered
	      // - the item's data is changed
	      // - the item is selected/deselected
	      if (this.dirty) {
	        this._updateContents(this.dom.content);

	        this._updateDataAttributes(this.dom.content);

	        this._updateStyle(this.dom.box); // update class


	        var className = (this.data.className ? ' ' + this.data.className : '') + (this.selected ? ' vis-selected' : '');
	        this.dom.box.className = this.baseClassName + className;
	      }
	    }
	    /**
	     * get DOM components sizes
	     * @return {object}
	     * @private
	     */

	  }, {
	    key: "_getDomComponentsSizes",
	    value: function _getDomComponentsSizes() {
	      // determine from css whether this box has overflow
	      this.overflow = window.getComputedStyle(this.dom.content).overflow !== 'hidden';
	      return {
	        content: {
	          width: this.dom.content.offsetWidth
	        }
	      };
	    }
	    /**
	     * update DOM components sizes
	     * @param {object} sizes
	     * @private
	     */

	  }, {
	    key: "_updateDomComponentsSizes",
	    value: function _updateDomComponentsSizes(sizes) {
	      // recalculate size
	      this.props.content.width = sizes.content.width;
	      this.height = 0; // set height zero, so this item will be ignored when stacking items

	      this.dirty = false;
	    }
	    /**
	     * repaint DOM additionals
	     * @private
	     */

	  }, {
	    key: "_repaintDomAdditionals",
	    value: function _repaintDomAdditionals() {}
	    /**
	     * Repaint the item
	     * @param {boolean} [returnQueue=false]  return the queue
	     * @return {boolean} the redraw result or the redraw queue if returnQueue=true
	     */

	  }, {
	    key: "redraw",
	    value: function redraw(returnQueue) {
	      var _context,
	          _context2,
	          _context3,
	          _this2 = this,
	          _context6;

	      var sizes;
	      var queue = [// create item DOM
	      bind$2(_context = this._createDomElement).call(_context, this), // append DOM to parent DOM
	      bind$2(_context2 = this._appendDomElement).call(_context2, this), bind$2(_context3 = this._updateDirtyDomComponents).call(_context3, this), function () {
	        if (_this2.dirty) {
	          var _context4;

	          sizes = bind$2(_context4 = _this2._getDomComponentsSizes).call(_context4, _this2)();
	        }
	      }, function () {
	        if (_this2.dirty) {
	          var _context5;

	          bind$2(_context5 = _this2._updateDomComponentsSizes).call(_context5, _this2)(sizes);
	        }
	      }, // repaint DOM additionals
	      bind$2(_context6 = this._repaintDomAdditionals).call(_context6, this)];

	      if (returnQueue) {
	        return queue;
	      } else {
	        var result;

	        forEach$2(queue).call(queue, function (fn) {
	          result = fn();
	        });

	        return result;
	      }
	    }
	    /**
	     * Reposition the item vertically
	     * @Override
	     */

	  }, {
	    key: "repositionY",
	    value: function repositionY(margin) {
	      // eslint-disable-line no-unused-vars
	      var height;
	      var orientation = this.options.orientation.item; // special positioning for subgroups

	      if (this.data.subgroup !== undefined) {
	        // TODO: instead of calculating the top position of the subgroups here for every BackgroundItem, calculate the top of the subgroup once in Itemset
	        var itemSubgroup = this.data.subgroup;
	        this.dom.box.style.height = "".concat(this.parent.subgroups[itemSubgroup].height, "px");

	        if (orientation == 'top') {
	          this.dom.box.style.top = "".concat(this.parent.top + this.parent.subgroups[itemSubgroup].top, "px");
	        } else {
	          this.dom.box.style.top = "".concat(this.parent.top + this.parent.height - this.parent.subgroups[itemSubgroup].top - this.parent.subgroups[itemSubgroup].height, "px");
	        }

	        this.dom.box.style.bottom = '';
	      } // and in the case of no subgroups:
	      else {
	          // we want backgrounds with groups to only show in groups.
	          if (this.parent instanceof BackgroundGroup) {
	            // if the item is not in a group:
	            height = Math.max(this.parent.height, this.parent.itemSet.body.domProps.center.height, this.parent.itemSet.body.domProps.centerContainer.height);
	            this.dom.box.style.bottom = orientation == 'bottom' ? '0' : '';
	            this.dom.box.style.top = orientation == 'top' ? '0' : '';
	          } else {
	            height = this.parent.height; // same alignment for items when orientation is top or bottom

	            this.dom.box.style.top = "".concat(this.parent.top, "px");
	            this.dom.box.style.bottom = '';
	          }
	        }

	      this.dom.box.style.height = "".concat(height, "px");
	    }
	  }]);

	  return BackgroundItem;
	}(Item);

	BackgroundItem.prototype.baseClassName = 'vis-item vis-background';
	BackgroundItem.prototype.stack = false;
	/**
	 * Show the item in the DOM (when not already visible). The items DOM will
	 * be created when needed.
	 */

	BackgroundItem.prototype.show = RangeItem.prototype.show;
	/**
	 * Hide the item from the DOM (when visible)
	 * @return {Boolean} changed
	 */

	BackgroundItem.prototype.hide = RangeItem.prototype.hide;
	/**
	 * Reposition the item horizontally
	 * @Override
	 */

	BackgroundItem.prototype.repositionX = RangeItem.prototype.repositionX;

	/**
	 * Popup is a class to create a popup window with some text
	 */

	var Popup = /*#__PURE__*/function () {
	  /**
	   * @param {Element} container       The container object.
	   * @param {string}  overflowMethod  How the popup should act to overflowing ('flip', 'cap' or 'none')
	   */
	  function Popup(container, overflowMethod) {
	    classCallCheck(this, Popup);

	    this.container = container;
	    this.overflowMethod = overflowMethod || 'cap';
	    this.x = 0;
	    this.y = 0;
	    this.padding = 5;
	    this.hidden = false; // create the frame

	    this.frame = document.createElement('div');
	    this.frame.className = 'vis-tooltip';
	    this.container.appendChild(this.frame);
	  }
	  /**
	   * @param {number} x   Horizontal position of the popup window
	   * @param {number} y   Vertical position of the popup window
	   */


	  createClass(Popup, [{
	    key: "setPosition",
	    value: function setPosition(x, y) {
	      this.x = _parseInt$2(x);
	      this.y = _parseInt$2(y);
	    }
	    /**
	     * Set the content for the popup window. This can be HTML code or text.
	     * @param {string | Element} content
	     */

	  }, {
	    key: "setText",
	    value: function setText(content) {
	      if (content instanceof Element) {
	        this.frame.innerHTML = '';
	        this.frame.appendChild(content);
	      } else {
	        this.frame.innerHTML = content; // string containing text or HTML
	      }
	    }
	    /**
	     * Show the popup window
	     * @param {boolean} [doShow]    Show or hide the window
	     */

	  }, {
	    key: "show",
	    value: function show(doShow) {
	      if (doShow === undefined) {
	        doShow = true;
	      }

	      if (doShow === true) {
	        var height = this.frame.clientHeight;
	        var width = this.frame.clientWidth;
	        var maxHeight = this.frame.parentNode.clientHeight;
	        var maxWidth = this.frame.parentNode.clientWidth;
	        var left = 0,
	            top = 0;

	        if (this.overflowMethod == 'flip' || this.overflowMethod == 'none') {
	          var isLeft = false,
	              isTop = true; // Where around the position it's located

	          if (this.overflowMethod == 'flip') {
	            if (this.y - height < this.padding) {
	              isTop = false;
	            }

	            if (this.x + width > maxWidth - this.padding) {
	              isLeft = true;
	            }
	          }

	          if (isLeft) {
	            left = this.x - width;
	          } else {
	            left = this.x;
	          }

	          if (isTop) {
	            top = this.y - height;
	          } else {
	            top = this.y;
	          }
	        } else {
	          // this.overflowMethod == 'cap'
	          top = this.y - height;

	          if (top + height + this.padding > maxHeight) {
	            top = maxHeight - height - this.padding;
	          }

	          if (top < this.padding) {
	            top = this.padding;
	          }

	          left = this.x;

	          if (left + width + this.padding > maxWidth) {
	            left = maxWidth - width - this.padding;
	          }

	          if (left < this.padding) {
	            left = this.padding;
	          }
	        }

	        this.frame.style.left = left + "px";
	        this.frame.style.top = top + "px";
	        this.frame.style.visibility = "visible";
	        this.hidden = false;
	      } else {
	        this.hide();
	      }
	    }
	    /**
	     * Hide the popup window
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      this.hidden = true;
	      this.frame.style.left = "0";
	      this.frame.style.top = "0";
	      this.frame.style.visibility = "hidden";
	    }
	    /**
	     * Remove the popup window
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.frame.parentNode.removeChild(this.frame); // Remove element from DOM
	    }
	  }]);

	  return Popup;
	}();

	var $every = arrayIteration.every;
	var STRICT_METHOD$5 = arrayMethodIsStrict('every');
	var USES_TO_LENGTH$a = arrayMethodUsesToLength('every'); // `Array.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.every

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$5 || !USES_TO_LENGTH$a
	}, {
	  every: function every(callbackfn
	  /* , thisArg */
	  ) {
	    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var every = entryVirtual('Array').every;

	var ArrayPrototype$d = Array.prototype;

	var every_1 = function (it) {
	  var own = it.every;
	  return it === ArrayPrototype$d || it instanceof Array && own === ArrayPrototype$d.every ? every : own;
	};

	var every$1 = every_1;

	var every$2 = every$1;

	function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$3(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$3(o, minLen) { var _context14; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = slice$6(_context14 = Object.prototype.toString.call(o)).call(_context14, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

	function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * ClusterItem
	 */

	var ClusterItem = /*#__PURE__*/function (_Item) {
	  inherits(ClusterItem, _Item);

	  var _super = _createSuper$9(ClusterItem);

	  /**
	  * @constructor Item
	  * @param {Object} data             Object containing (optional) parameters type,
	  *                                  start, end, content, group, className.
	  * @param {{toScreen: function, toTime: function}} conversion
	  *                                  Conversion functions from time to screen and vice versa
	  * @param {Object} options          Configuration options
	  *                                  // TODO: describe available options
	  */
	  function ClusterItem(data, conversion, options) {
	    var _this;

	    classCallCheck(this, ClusterItem);

	    var modifiedOptions = assign$2({}, {
	      fitOnDoubleClick: true
	    }, options, {
	      editable: false
	    });

	    _this = _super.call(this, data, conversion, modifiedOptions);
	    _this.props = {
	      content: {
	        width: 0,
	        height: 0
	      }
	    };

	    if (!data || data.uiItems == undefined) {
	      throw new Error('Property "uiItems" missing in item ' + data.id);
	    }

	    _this.id = v4();
	    _this.group = data.group;

	    _this._setupRange();

	    _this.emitter = _this.data.eventEmitter;
	    _this.range = _this.data.range;
	    _this.attached = false;
	    _this.isCluster = true;
	    _this.data.isCluster = true;
	    return _this;
	  }
	  /**
	   * check if there are items
	   * @return {boolean}
	   */


	  createClass(ClusterItem, [{
	    key: "hasItems",
	    value: function hasItems() {
	      return this.data.uiItems && this.data.uiItems.length && this.attached;
	    }
	    /**
	     * set UI items
	     * @param {array} items
	     */

	  }, {
	    key: "setUiItems",
	    value: function setUiItems(items) {
	      this.detach();
	      this.data.uiItems = items;

	      this._setupRange();

	      this.attach();
	    }
	    /**
	     * check is visible
	     * @param {object} range
	     * @return {boolean}
	     */

	  }, {
	    key: "isVisible",
	    value: function isVisible(range) {
	      var rangeWidth = this.data.end ? this.data.end - this.data.start : 0;
	      var widthInMs = this.width * range.getMillisecondsPerPixel();
	      var end = Math.max(this.data.start.getTime() + rangeWidth, this.data.start.getTime() + widthInMs);
	      return this.data.start < range.end && end > range.start && this.hasItems();
	    }
	    /**
	     * get cluster data
	     * @return {object}
	     */

	  }, {
	    key: "getData",
	    value: function getData() {
	      return {
	        isCluster: true,
	        id: this.id,
	        items: this.data.items || [],
	        data: this.data
	      };
	    }
	    /**
	     * redraw cluster item
	     * @param {boolean} returnQueue
	     * @return {boolean}
	     */

	  }, {
	    key: "redraw",
	    value: function redraw(returnQueue) {
	      var _context, _context2, _context3, _context4, _context5, _context7;

	      var sizes;
	      var queue = [// create item DOM
	      bind$2(_context = this._createDomElement).call(_context, this), // append DOM to parent DOM
	      bind$2(_context2 = this._appendDomElement).call(_context2, this), // update dirty DOM
	      bind$2(_context3 = this._updateDirtyDomComponents).call(_context3, this), bind$2(_context4 = function _context4() {
	        if (this.dirty) {
	          sizes = this._getDomComponentsSizes();
	        }
	      }).call(_context4, this), bind$2(_context5 = function _context5() {
	        if (this.dirty) {
	          var _context6;

	          bind$2(_context6 = this._updateDomComponentsSizes).call(_context6, this)(sizes);
	        }
	      }).call(_context5, this), // repaint DOM additionals
	      bind$2(_context7 = this._repaintDomAdditionals).call(_context7, this)];

	      if (returnQueue) {
	        return queue;
	      } else {
	        var result;

	        forEach$2(queue).call(queue, function (fn) {
	          result = fn();
	        });

	        return result;
	      }
	    }
	    /**
	     * show cluster item
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      if (!this.displayed) {
	        this.redraw();
	      }
	    }
	    /**
	     * Hide the item from the DOM (when visible)
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      if (this.displayed) {
	        var dom = this.dom;

	        if (dom.box.parentNode) {
	          dom.box.parentNode.removeChild(dom.box);
	        }

	        if (this.options.showStipes) {
	          if (dom.line.parentNode) {
	            dom.line.parentNode.removeChild(dom.line);
	          }

	          if (dom.dot.parentNode) {
	            dom.dot.parentNode.removeChild(dom.dot);
	          }
	        }

	        this.displayed = false;
	      }
	    }
	    /**
	     * reposition item x axis
	     */

	  }, {
	    key: "repositionX",
	    value: function repositionX() {
	      var start = this.conversion.toScreen(this.data.start);
	      var end = this.data.end ? this.conversion.toScreen(this.data.end) : 0;

	      if (end) {
	        this.repositionXWithRanges(start, end);
	      } else {
	        var align = this.data.align === undefined ? this.options.align : this.data.align;
	        this.repositionXWithoutRanges(start, align);
	      }

	      if (this.options.showStipes) {
	        this.dom.line.style.display = this._isStipeVisible() ? 'block' : 'none';
	        this.dom.dot.style.display = this._isStipeVisible() ? 'block' : 'none';

	        if (this._isStipeVisible()) {
	          this.repositionStype(start, end);
	        }
	      }
	    }
	    /**
	     * reposition item stype
	     * @param {date} start
	     * @param {date} end
	     */

	  }, {
	    key: "repositionStype",
	    value: function repositionStype(start, end) {
	      this.dom.line.style.display = 'block';
	      this.dom.dot.style.display = 'block';
	      var lineOffsetWidth = this.dom.line.offsetWidth;
	      var dotOffsetWidth = this.dom.dot.offsetWidth;

	      if (end) {
	        var lineOffset = lineOffsetWidth + start + (end - start) / 2;
	        var dotOffset = lineOffset - dotOffsetWidth / 2;
	        var lineOffsetDirection = this.options.rtl ? lineOffset * -1 : lineOffset;
	        var dotOffsetDirection = this.options.rtl ? dotOffset * -1 : dotOffset;
	        this.dom.line.style.transform = "translateX(".concat(lineOffsetDirection, "px)");
	        this.dom.dot.style.transform = "translateX(".concat(dotOffsetDirection, "px)");
	      } else {
	        var _lineOffsetDirection = this.options.rtl ? start * -1 : start;

	        var _dotOffsetDirection = this.options.rtl ? (start - dotOffsetWidth / 2) * -1 : start - dotOffsetWidth / 2;

	        this.dom.line.style.transform = "translateX(".concat(_lineOffsetDirection, "px)");
	        this.dom.dot.style.transform = "translateX(".concat(_dotOffsetDirection, "px)");
	      }
	    }
	    /**
	     * reposition x without ranges
	     * @param {date} start
	     * @param {string} align
	     */

	  }, {
	    key: "repositionXWithoutRanges",
	    value: function repositionXWithoutRanges(start, align) {
	      // calculate left position of the box
	      if (align == 'right') {
	        if (this.options.rtl) {
	          this.right = start - this.width; // reposition box, line, and dot

	          this.dom.box.style.right = this.right + 'px';
	        } else {
	          this.left = start - this.width; // reposition box, line, and dot

	          this.dom.box.style.left = this.left + 'px';
	        }
	      } else if (align == 'left') {
	        if (this.options.rtl) {
	          this.right = start; // reposition box, line, and dot

	          this.dom.box.style.right = this.right + 'px';
	        } else {
	          this.left = start; // reposition box, line, and dot

	          this.dom.box.style.left = this.left + 'px';
	        }
	      } else {
	        // default or 'center'
	        if (this.options.rtl) {
	          this.right = start - this.width / 2; // reposition box, line, and dot

	          this.dom.box.style.right = this.right + 'px';
	        } else {
	          this.left = start - this.width / 2; // reposition box, line, and dot

	          this.dom.box.style.left = this.left + 'px';
	        }
	      }
	    }
	    /**
	     * reposition x with ranges
	     * @param {date} start
	     * @param {date} end
	     */

	  }, {
	    key: "repositionXWithRanges",
	    value: function repositionXWithRanges(start, end) {
	      var boxWidth = Math.round(Math.max(end - start + 0.5, 1));

	      if (this.options.rtl) {
	        this.right = start;
	      } else {
	        this.left = start;
	      }

	      this.width = Math.max(boxWidth, this.minWidth || 0);

	      if (this.options.rtl) {
	        this.dom.box.style.right = this.right + 'px';
	      } else {
	        this.dom.box.style.left = this.left + 'px';
	      }

	      this.dom.box.style.width = boxWidth + 'px';
	    }
	    /**
	     * reposition item y axis
	     */

	  }, {
	    key: "repositionY",
	    value: function repositionY() {
	      var orientation = this.options.orientation.item;
	      var box = this.dom.box;

	      if (orientation == 'top') {
	        box.style.top = (this.top || 0) + 'px';
	      } else {
	        // orientation 'bottom'
	        box.style.top = (this.parent.height - this.top - this.height || 0) + 'px';
	      }

	      if (this.options.showStipes) {
	        if (orientation == 'top') {
	          this.dom.line.style.top = '0';
	          this.dom.line.style.height = this.parent.top + this.top + 1 + 'px';
	          this.dom.line.style.bottom = '';
	        } else {
	          // orientation 'bottom'
	          var itemSetHeight = this.parent.itemSet.props.height;
	          var lineHeight = itemSetHeight - this.parent.top - this.parent.height + this.top;
	          this.dom.line.style.top = itemSetHeight - lineHeight + 'px';
	          this.dom.line.style.bottom = '0';
	        }

	        this.dom.dot.style.top = -this.dom.dot.offsetHeight / 2 + 'px';
	      }
	    }
	    /**
	     * get width left
	     * @return {number}
	     */

	  }, {
	    key: "getWidthLeft",
	    value: function getWidthLeft() {
	      return this.width / 2;
	    }
	    /**
	     * get width right
	     * @return {number}
	     */

	  }, {
	    key: "getWidthRight",
	    value: function getWidthRight() {
	      return this.width / 2;
	    }
	    /**
	     * move cluster item
	     */

	  }, {
	    key: "move",
	    value: function move() {
	      this.repositionX();
	      this.repositionY();
	    }
	    /**
	     * attach
	     */

	  }, {
	    key: "attach",
	    value: function attach() {
	      var _context8;

	      var _iterator = _createForOfIteratorHelper$2(this.data.uiItems),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var item = _step.value;
	          item.cluster = this;
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }

	      this.data.items = map$2(_context8 = this.data.uiItems).call(_context8, function (item) {
	        return item.data;
	      });
	      this.attached = true;
	      this.dirty = true;
	    }
	    /**
	     * detach
	     * @param {boolean} detachFromParent
	     * @return {void}
	     */

	  }, {
	    key: "detach",
	    value: function detach() {
	      var detachFromParent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (!this.hasItems()) {
	        return;
	      }

	      var _iterator2 = _createForOfIteratorHelper$2(this.data.uiItems),
	          _step2;

	      try {
	        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	          var item = _step2.value;
	          delete item.cluster;
	        }
	      } catch (err) {
	        _iterator2.e(err);
	      } finally {
	        _iterator2.f();
	      }

	      this.attached = false;

	      if (detachFromParent && this.group) {
	        this.group.remove(this);
	        this.group = null;
	      }

	      this.data.items = [];
	      this.dirty = true;
	    }
	    /**
	     * handle on double click
	     */

	  }, {
	    key: "_onDoubleClick",
	    value: function _onDoubleClick() {
	      this._fit();
	    }
	    /**
	     * set range
	     */

	  }, {
	    key: "_setupRange",
	    value: function _setupRange() {
	      var _context9, _context10, _context11;

	      var stats = map$2(_context9 = this.data.uiItems).call(_context9, function (item) {
	        return {
	          start: item.data.start.valueOf(),
	          end: item.data.end ? item.data.end.valueOf() : item.data.start.valueOf()
	        };
	      });

	      this.data.min = Math.min.apply(Math, toConsumableArray(map$2(stats).call(stats, function (s) {
	        return Math.min(s.start, s.end || s.start);
	      })));
	      this.data.max = Math.max.apply(Math, toConsumableArray(map$2(stats).call(stats, function (s) {
	        return Math.max(s.start, s.end || s.start);
	      })));

	      var centers = map$2(_context10 = this.data.uiItems).call(_context10, function (item) {
	        return item.center;
	      });

	      var avg = reduce$2(centers).call(centers, function (sum, value) {
	        return sum + value;
	      }, 0) / this.data.uiItems.length;

	      if (some$2(_context11 = this.data.uiItems).call(_context11, function (item) {
	        return item.data.end;
	      })) {
	        // contains ranges
	        this.data.start = new Date(this.data.min);
	        this.data.end = new Date(this.data.max);
	      } else {
	        this.data.start = new Date(avg);
	        this.data.end = null;
	      }
	    }
	    /**
	     * get UI items
	     * @return {array}
	     */

	  }, {
	    key: "_getUiItems",
	    value: function _getUiItems() {
	      var _this2 = this;

	      if (this.data.uiItems && this.data.uiItems.length) {
	        var _context12;

	        return filter$2(_context12 = this.data.uiItems).call(_context12, function (item) {
	          return item.cluster === _this2;
	        });
	      }

	      return [];
	    }
	    /**
	     * create DOM element
	     */

	  }, {
	    key: "_createDomElement",
	    value: function _createDomElement() {
	      if (!this.dom) {
	        // create DOM
	        this.dom = {}; // create main box

	        this.dom.box = document.createElement('DIV'); // contents box (inside the background box). used for making margins

	        this.dom.content = document.createElement('DIV');
	        this.dom.content.className = 'vis-item-content';
	        this.dom.box.appendChild(this.dom.content);

	        if (this.options.showStipes) {
	          // line to axis
	          this.dom.line = document.createElement('DIV');
	          this.dom.line.className = 'vis-cluster-line';
	          this.dom.line.style.display = 'none'; // dot on axis

	          this.dom.dot = document.createElement('DIV');
	          this.dom.dot.className = 'vis-cluster-dot';
	          this.dom.dot.style.display = 'none';
	        }

	        if (this.options.fitOnDoubleClick) {
	          var _context13;

	          this.dom.box.ondblclick = bind$2(_context13 = ClusterItem.prototype._onDoubleClick).call(_context13, this);
	        } // attach this item as attribute


	        this.dom.box['vis-item'] = this;
	        this.dirty = true;
	      }
	    }
	    /**
	     * append element to DOM
	     */

	  }, {
	    key: "_appendDomElement",
	    value: function _appendDomElement() {
	      if (!this.parent) {
	        throw new Error('Cannot redraw item: no parent attached');
	      }

	      if (!this.dom.box.parentNode) {
	        var foreground = this.parent.dom.foreground;

	        if (!foreground) {
	          throw new Error('Cannot redraw item: parent has no foreground container element');
	        }

	        foreground.appendChild(this.dom.box);
	      }

	      var background = this.parent.dom.background;

	      if (this.options.showStipes) {
	        if (!this.dom.line.parentNode) {
	          if (!background) throw new Error('Cannot redraw item: parent has no background container element');
	          background.appendChild(this.dom.line);
	        }

	        if (!this.dom.dot.parentNode) {
	          var axis = this.parent.dom.axis;
	          if (!background) throw new Error('Cannot redraw item: parent has no axis container element');
	          axis.appendChild(this.dom.dot);
	        }
	      }

	      this.displayed = true;
	    }
	    /**
	     * update dirty DOM components
	     */

	  }, {
	    key: "_updateDirtyDomComponents",
	    value: function _updateDirtyDomComponents() {
	      // An item is marked dirty when:
	      // - the item is not yet rendered
	      // - the item's data is changed
	      // - the item is selected/deselected
	      if (this.dirty) {
	        this._updateContents(this.dom.content);

	        this._updateDataAttributes(this.dom.box);

	        this._updateStyle(this.dom.box); // update class


	        var className = this.baseClassName + ' ' + (this.data.className ? ' ' + this.data.className : '') + (this.selected ? ' vis-selected' : '') + ' vis-readonly';
	        this.dom.box.className = 'vis-item ' + className;

	        if (this.options.showStipes) {
	          this.dom.line.className = 'vis-item vis-cluster-line ' + (this.selected ? ' vis-selected' : '');
	          this.dom.dot.className = 'vis-item vis-cluster-dot ' + (this.selected ? ' vis-selected' : '');
	        }

	        if (this.data.end) {
	          // turn off max-width to be able to calculate the real width
	          // this causes an extra browser repaint/reflow, but so be it
	          this.dom.content.style.maxWidth = 'none';
	        }
	      }
	    }
	    /**
	     * get DOM components sizes
	     * @return {object}
	     */

	  }, {
	    key: "_getDomComponentsSizes",
	    value: function _getDomComponentsSizes() {
	      var sizes = {
	        previous: {
	          right: this.dom.box.style.right,
	          left: this.dom.box.style.left
	        },
	        box: {
	          width: this.dom.box.offsetWidth,
	          height: this.dom.box.offsetHeight
	        }
	      };

	      if (this.options.showStipes) {
	        sizes.dot = {
	          height: this.dom.dot.offsetHeight,
	          width: this.dom.dot.offsetWidth
	        };
	        sizes.line = {
	          width: this.dom.line.offsetWidth
	        };
	      }

	      return sizes;
	    }
	    /**
	     * update DOM components sizes
	     * @param {object} sizes
	     */

	  }, {
	    key: "_updateDomComponentsSizes",
	    value: function _updateDomComponentsSizes(sizes) {
	      if (this.options.rtl) {
	        this.dom.box.style.right = "0px";
	      } else {
	        this.dom.box.style.left = "0px";
	      } // recalculate size


	      if (!this.data.end) {
	        this.width = sizes.box.width;
	      } else {
	        this.minWidth = sizes.box.width;
	      }

	      this.height = sizes.box.height; // restore previous position

	      if (this.options.rtl) {
	        this.dom.box.style.right = sizes.previous.right;
	      } else {
	        this.dom.box.style.left = sizes.previous.left;
	      }

	      this.dirty = false;
	    }
	    /**
	     * repaint DOM additional components
	     */

	  }, {
	    key: "_repaintDomAdditionals",
	    value: function _repaintDomAdditionals() {
	      this._repaintOnItemUpdateTimeTooltip(this.dom.box);
	    }
	    /**
	     * check is stripe visible
	     * @return {number}
	     * @private
	     */

	  }, {
	    key: "_isStipeVisible",
	    value: function _isStipeVisible() {
	      return this.minWidth >= this.width || !this.data.end;
	    }
	    /**
	     * get fit range
	     * @return {object}
	     * @private
	     */

	  }, {
	    key: "_getFitRange",
	    value: function _getFitRange() {
	      var offset = 0.05 * (this.data.max - this.data.min) / 2;
	      return {
	        fitStart: this.data.min - offset,
	        fitEnd: this.data.max + offset
	      };
	    }
	    /**
	    * fit
	    * @private
	    */

	  }, {
	    key: "_fit",
	    value: function _fit() {
	      if (this.emitter) {
	        var _this$_getFitRange = this._getFitRange(),
	            fitStart = _this$_getFitRange.fitStart,
	            fitEnd = _this$_getFitRange.fitEnd;

	        var fitArgs = {
	          start: new Date(fitStart),
	          end: new Date(fitEnd),
	          animation: true
	        };
	        this.emitter.emit('fit', fitArgs);
	      }
	    }
	    /**
	    * get item data
	    * @return {object}
	    * @private
	    */

	  }, {
	    key: "_getItemData",
	    value: function _getItemData() {
	      return this.data;
	    }
	  }]);

	  return ClusterItem;
	}(Item);

	ClusterItem.prototype.baseClassName = 'vis-item vis-range vis-cluster';

	function _createForOfIteratorHelper$3(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$3(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$4(o, minLen) { var _context4; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = slice$6(_context4 = Object.prototype.toString.call(o)).call(_context4, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

	function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	var UNGROUPED$1 = '__ungrouped__'; // reserved group id for ungrouped items

	var BACKGROUND$1 = '__background__'; // reserved group id for background items without group

	var ReservedGroupIds$1 = {
	  UNGROUPED: UNGROUPED$1,
	  BACKGROUND: BACKGROUND$1
	};
	/**
	 * An Cluster generator generates cluster items
	 */

	var ClusterGenerator = /*#__PURE__*/function () {
	  /**
	   * @param {ItemSet} itemSet itemsSet instance
	   * @constructor ClusterGenerator
	  */
	  function ClusterGenerator(itemSet) {
	    classCallCheck(this, ClusterGenerator);

	    this.itemSet = itemSet;
	    this.groups = {};
	    this.cache = {};
	    this.cache[-1] = [];
	  }
	  /**
	   * @param {Object} itemData             Object containing parameters start content, className.
	   * @param {{toScreen: function, toTime: function}} conversion
	   *                                  Conversion functions from time to screen and vice versa
	   * @param {Object} [options]        Configuration options
	   * @return {Object} newItem
	  */


	  createClass(ClusterGenerator, [{
	    key: "createClusterItem",
	    value: function createClusterItem(itemData, conversion, options) {
	      var newItem = new ClusterItem(itemData, conversion, options);
	      return newItem;
	    }
	    /**
	     * Set the items to be clustered.
	     * This will clear cached clusters.
	     * @param {Item[]} items
	     * @param {Object} [options]  Available options:
	     *                            {boolean} applyOnChangedLevel
	     *                                If true (default), the changed data is applied
	     *                                as soon the cluster level changes. If false,
	     *                                The changed data is applied immediately
	     */

	  }, {
	    key: "setItems",
	    value: function setItems(items, options) {
	      this.items = items || [];
	      this.dataChanged = true;
	      this.applyOnChangedLevel = false;

	      if (options && options.applyOnChangedLevel) {
	        this.applyOnChangedLevel = options.applyOnChangedLevel;
	      }
	    }
	    /**
	     * Update the current data set: clear cache, and recalculate the clustering for
	     * the current level
	     */

	  }, {
	    key: "updateData",
	    value: function updateData() {
	      this.dataChanged = true;
	      this.applyOnChangedLevel = false;
	    }
	    /**
	     * Cluster the items which are too close together
	     * @param {array} oldClusters 
	     * @param {number} scale      The scale of the current window : (windowWidth / (endDate - startDate)) 
	     * @param {{maxItems: number, clusterCriteria: function, titleTemplate: string}} options             
	     * @return {array} clusters
	    */

	  }, {
	    key: "getClusters",
	    value: function getClusters(oldClusters, scale, options) {
	      var _ref = typeof options === "boolean" ? {} : options,
	          maxItems = _ref.maxItems,
	          clusterCriteria = _ref.clusterCriteria;

	      if (!clusterCriteria) {
	        clusterCriteria = function clusterCriteria() {
	          return true;
	        };
	      }

	      maxItems = maxItems || 1;
	      var level = -1;
	      var granularity = 2;
	      var timeWindow = 0;

	      if (scale > 0) {
	        if (scale >= 1) {
	          return [];
	        }

	        level = Math.abs(Math.round(Math.log(100 / scale) / Math.log(granularity)));
	        timeWindow = Math.abs(Math.pow(granularity, level));
	      } // clear the cache when and re-generate groups the data when needed.


	      if (this.dataChanged) {
	        var levelChanged = level != this.cacheLevel;
	        var applyDataNow = this.applyOnChangedLevel ? levelChanged : true;

	        if (applyDataNow) {
	          this._dropLevelsCache();

	          this._filterData();
	        }
	      }

	      this.cacheLevel = level;
	      var clusters = this.cache[level];

	      if (!clusters) {
	        clusters = [];

	        for (var groupName in this.groups) {
	          if (this.groups.hasOwnProperty(groupName)) {
	            var items = this.groups[groupName];
	            var iMax = items.length;
	            var i = 0;

	            while (i < iMax) {
	              // find all items around current item, within the timeWindow
	              var item = items[i];
	              var neighbors = 1; // start at 1, to include itself)
	              // loop through items left from the current item

	              var j = i - 1;

	              while (j >= 0 && item.center - items[j].center < timeWindow / 2) {
	                if (!items[j].cluster && clusterCriteria(item.data, items[j].data)) {
	                  neighbors++;
	                }

	                j--;
	              } // loop through items right from the current item


	              var k = i + 1;

	              while (k < items.length && items[k].center - item.center < timeWindow / 2) {
	                if (clusterCriteria(item.data, items[k].data)) {
	                  neighbors++;
	                }

	                k++;
	              } // loop through the created clusters


	              var l = clusters.length - 1;

	              while (l >= 0 && item.center - clusters[l].center < timeWindow) {
	                if (item.group == clusters[l].group && clusterCriteria(item.data, clusters[l].data)) {
	                  neighbors++;
	                }

	                l--;
	              } // aggregate until the number of items is within maxItems


	              if (neighbors > maxItems) {
	                // too busy in this window.
	                var num = neighbors - maxItems + 1;
	                var clusterItems = []; // append the items to the cluster,
	                // and calculate the average start for the cluster

	                var m = i;

	                while (clusterItems.length < num && m < items.length) {
	                  if (clusterCriteria(items[i].data, items[m].data)) {
	                    clusterItems.push(items[m]);
	                  }

	                  m++;
	                }

	                var groupId = this.itemSet.getGroupId(item.data);
	                var group = this.itemSet.groups[groupId] || this.itemSet.groups[ReservedGroupIds$1.UNGROUPED];

	                var cluster = this._getClusterForItems(clusterItems, group, oldClusters, options);

	                clusters.push(cluster);
	                i += num;
	              } else {
	                delete item.cluster;
	                i += 1;
	              }
	            }
	          }
	        }

	        this.cache[level] = clusters;
	      }

	      return clusters;
	    }
	    /**
	     * Filter the items per group.
	     * @private
	     */

	  }, {
	    key: "_filterData",
	    value: function _filterData() {
	      // filter per group
	      var groups = {};
	      this.groups = groups; // split the items per group

	      for (var _i = 0, _Object$values = values$2(this.items); _i < _Object$values.length; _i++) {
	        var item = _Object$values[_i];
	        // put the item in the correct group
	        var groupName = item.parent ? item.parent.groupId : '';
	        var group = groups[groupName];

	        if (!group) {
	          group = [];
	          groups[groupName] = group;
	        }

	        group.push(item); // calculate the center of the item

	        if (item.data.start) {
	          if (item.data.end) {
	            // range
	            item.center = (item.data.start.valueOf() + item.data.end.valueOf()) / 2;
	          } else {
	            // box, dot
	            item.center = item.data.start.valueOf();
	          }
	        }
	      } // sort the items per group


	      for (var currentGroupName in groups) {
	        if (groups.hasOwnProperty(currentGroupName)) {
	          var _context;

	          sort$2(_context = groups[currentGroupName]).call(_context, function (a, b) {
	            return a.center - b.center;
	          });
	        }
	      }

	      this.dataChanged = false;
	    }
	    /**
	     * Create new cluster or return existing
	     * @private
	     * @param {array} clusterItems    
	     * @param {object} group 
	     * @param {array} oldClusters 
	     * @param {object} options 
	     * @returns {object} cluster
	     */

	  }, {
	    key: "_getClusterForItems",
	    value: function _getClusterForItems(clusterItems, group, oldClusters, options) {
	      var _context2;

	      var oldClustersLookup = map$2(_context2 = oldClusters || []).call(_context2, function (cluster) {
	        var _context3;

	        return {
	          cluster: cluster,
	          itemsIds: new set$3(map$2(_context3 = cluster.data.uiItems).call(_context3, function (item) {
	            return item.id;
	          }))
	        };
	      });

	      var cluster;

	      if (oldClustersLookup.length) {
	        var _iterator = _createForOfIteratorHelper$3(oldClustersLookup),
	            _step;

	        try {
	          var _loop = function _loop() {
	            var oldClusterData = _step.value;

	            if (oldClusterData.itemsIds.size === clusterItems.length && every$2(clusterItems).call(clusterItems, function (clusterItem) {
	              return oldClusterData.itemsIds.has(clusterItem.id);
	            })) {
	              cluster = oldClusterData.cluster;
	              return "break";
	            }
	          };

	          for (_iterator.s(); !(_step = _iterator.n()).done;) {
	            var _ret = _loop();

	            if (_ret === "break") break;
	          }
	        } catch (err) {
	          _iterator.e(err);
	        } finally {
	          _iterator.f();
	        }
	      }

	      if (cluster) {
	        cluster.setUiItems(clusterItems);

	        if (cluster.group !== group) {
	          if (cluster.group) {
	            cluster.group.remove(cluster);
	          }

	          if (group) {
	            group.add(cluster);
	            cluster.group = group;
	          }
	        }

	        return cluster;
	      }

	      var titleTemplate = options.titleTemplate || '';
	      var conversion = {
	        toScreen: this.itemSet.body.util.toScreen,
	        toTime: this.itemSet.body.util.toTime
	      };
	      var title = titleTemplate.replace(/{count}/, clusterItems.length);
	      var clusterContent = '<div title="' + title + '">' + clusterItems.length + '</div>';

	      var clusterOptions = assign$2({}, options, this.itemSet.options);

	      var data = {
	        'content': clusterContent,
	        'title': title,
	        'group': group,
	        'uiItems': clusterItems,
	        'eventEmitter': this.itemSet.body.emitter,
	        'range': this.itemSet.body.range
	      };
	      cluster = this.createClusterItem(data, conversion, clusterOptions);

	      if (group) {
	        group.add(cluster);
	        cluster.group = group;
	      }

	      cluster.attach();
	      return cluster;
	    }
	    /**
	     * Drop cache
	     * @private
	     */

	  }, {
	    key: "_dropLevelsCache",
	    value: function _dropLevelsCache() {
	      this.cache = {};
	      this.cacheLevel = -1;
	      this.cache[this.cacheLevel] = [];
	    }
	  }]);

	  return ClusterGenerator;
	}();

	function _createForOfIteratorHelper$4(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$3(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$5(o, minLen) { var _context34; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = slice$6(_context34 = Object.prototype.toString.call(o)).call(_context34, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }

	function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	var UNGROUPED$2 = '__ungrouped__'; // reserved group id for ungrouped items

	var BACKGROUND$2 = '__background__'; // reserved group id for background items without group
	/**
	 * An ItemSet holds a set of items and ranges which can be displayed in a
	 * range. The width is determined by the parent of the ItemSet, and the height
	 * is determined by the size of the items.
	 */

	var ItemSet = /*#__PURE__*/function (_Component) {
	  inherits(ItemSet, _Component);

	  var _super = _createSuper$a(ItemSet);

	  /**
	  * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} body
	  * @param {Object} [options]      See ItemSet.setOptions for the available options.
	  * @constructor ItemSet
	  * @extends Component
	  */
	  function ItemSet(body, options) {
	    var _this;

	    classCallCheck(this, ItemSet);

	    _this = _super.call(this);
	    _this.body = body;
	    _this.defaultOptions = {
	      type: null,
	      // 'box', 'point', 'range', 'background'
	      orientation: {
	        item: 'bottom' // item orientation: 'top' or 'bottom'

	      },
	      align: 'auto',
	      // alignment of box items
	      stack: true,
	      stackSubgroups: true,
	      groupOrderSwap: function groupOrderSwap(fromGroup, toGroup, groups) {
	        // eslint-disable-line no-unused-vars
	        var targetOrder = toGroup.order;
	        toGroup.order = fromGroup.order;
	        fromGroup.order = targetOrder;
	      },
	      groupOrder: 'order',
	      selectable: true,
	      multiselect: false,
	      longSelectPressTime: 251,
	      itemsAlwaysDraggable: {
	        item: false,
	        range: false
	      },
	      editable: {
	        updateTime: false,
	        updateGroup: false,
	        add: false,
	        remove: false,
	        overrideItems: false
	      },
	      groupEditable: {
	        order: false,
	        add: false,
	        remove: false
	      },
	      snap: TimeStep.snap,
	      // Only called when `objectData.target === 'item'.
	      onDropObjectOnItem: function onDropObjectOnItem(objectData, item, callback) {
	        callback(item);
	      },
	      onAdd: function onAdd(item, callback) {
	        callback(item);
	      },
	      onUpdate: function onUpdate(item, callback) {
	        callback(item);
	      },
	      onMove: function onMove(item, callback) {
	        callback(item);
	      },
	      onRemove: function onRemove(item, callback) {
	        callback(item);
	      },
	      onMoving: function onMoving(item, callback) {
	        callback(item);
	      },
	      onAddGroup: function onAddGroup(item, callback) {
	        callback(item);
	      },
	      onMoveGroup: function onMoveGroup(item, callback) {
	        callback(item);
	      },
	      onRemoveGroup: function onRemoveGroup(item, callback) {
	        callback(item);
	      },
	      margin: {
	        item: {
	          horizontal: 10,
	          vertical: 10
	        },
	        axis: 20
	      },
	      showTooltips: true,
	      tooltip: {
	        followMouse: false,
	        overflowMethod: 'flip',
	        delay: 500
	      },
	      tooltipOnItemUpdateTime: false
	    }; // options is shared by this ItemSet and all its items

	    _this.options = util$1.extend({}, _this.defaultOptions);
	    _this.options.rtl = options.rtl;
	    _this.options.onTimeout = options.onTimeout;
	    _this.conversion = {
	      toScreen: body.util.toScreen,
	      toTime: body.util.toTime
	    };
	    _this.dom = {};
	    _this.props = {};
	    _this.hammer = null;

	    var me = assertThisInitialized(_this);

	    _this.itemsData = null; // DataSet

	    _this.groupsData = null; // DataSet

	    _this.itemsSettingTime = null;
	    _this.initialItemSetDrawn = false;
	    _this.userContinueNotBail = null;
	    _this.sequentialSelection = false; // listeners for the DataSet of the items

	    _this.itemListeners = {
	      'add': function add(event, params, senderId) {
	        // eslint-disable-line no-unused-vars
	        me._onAdd(params.items);

	        if (me.options.cluster) {
	          me.clusterGenerator.setItems(me.items, {
	            applyOnChangedLevel: false
	          });
	        }

	        me.redraw();
	      },
	      'update': function update(event, params, senderId) {
	        // eslint-disable-line no-unused-vars
	        me._onUpdate(params.items);

	        if (me.options.cluster) {
	          me.clusterGenerator.setItems(me.items, {
	            applyOnChangedLevel: false
	          });
	        }

	        me.redraw();
	      },
	      'remove': function remove(event, params, senderId) {
	        // eslint-disable-line no-unused-vars
	        me._onRemove(params.items);

	        if (me.options.cluster) {
	          me.clusterGenerator.setItems(me.items, {
	            applyOnChangedLevel: false
	          });
	        }

	        me.redraw();
	      }
	    }; // listeners for the DataSet of the groups

	    _this.groupListeners = {
	      'add': function add(event, params, senderId) {
	        // eslint-disable-line no-unused-vars
	        me._onAddGroups(params.items);

	        if (me.groupsData && me.groupsData.length > 0) {
	          var _context;

	          var groupsData = me.groupsData.getDataSet();

	          forEach$2(_context = groupsData.get()).call(_context, function (groupData) {
	            if (groupData.nestedGroups) {
	              var _context2;

	              if (groupData.showNested != false) {
	                groupData.showNested = true;
	              }

	              var updatedGroups = [];

	              forEach$2(_context2 = groupData.nestedGroups).call(_context2, function (nestedGroupId) {
	                var updatedNestedGroup = groupsData.get(nestedGroupId);

	                if (!updatedNestedGroup) {
	                  return;
	                }

	                updatedNestedGroup.nestedInGroup = groupData.id;

	                if (groupData.showNested == false) {
	                  updatedNestedGroup.visible = false;
	                }

	                updatedGroups = concat$2(updatedGroups).call(updatedGroups, updatedNestedGroup);
	              });

	              groupsData.update(updatedGroups, senderId);
	            }
	          });
	        }
	      },
	      'update': function update(event, params, senderId) {
	        // eslint-disable-line no-unused-vars
	        me._onUpdateGroups(params.items);
	      },
	      'remove': function remove(event, params, senderId) {
	        // eslint-disable-line no-unused-vars
	        me._onRemoveGroups(params.items);
	      }
	    };
	    _this.items = {}; // object with an Item for every data item

	    _this.groups = {}; // Group object for every group

	    _this.groupIds = [];
	    _this.selection = []; // list with the ids of all selected nodes

	    _this.popup = null;
	    _this.popupTimer = null;
	    _this.touchParams = {}; // stores properties while dragging

	    _this.groupTouchParams = {
	      group: null,
	      isDragging: false
	    }; // create the HTML DOM

	    _this._create();

	    _this.setOptions(options);

	    _this.clusters = [];
	    return _this;
	  }
	  /**
	   * Create the HTML DOM for the ItemSet
	   */


	  createClass(ItemSet, [{
	    key: "_create",
	    value: function _create() {
	      var _this2 = this,
	          _context3,
	          _context4,
	          _context5,
	          _context6,
	          _context7,
	          _context8,
	          _context9,
	          _context10,
	          _context11,
	          _context12,
	          _context13,
	          _context14,
	          _context15,
	          _context16,
	          _context17;

	      var frame = document.createElement('div');
	      frame.className = 'vis-itemset';
	      frame['vis-itemset'] = this;
	      this.dom.frame = frame; // create background panel

	      var background = document.createElement('div');
	      background.className = 'vis-background';
	      frame.appendChild(background);
	      this.dom.background = background; // create foreground panel

	      var foreground = document.createElement('div');
	      foreground.className = 'vis-foreground';
	      frame.appendChild(foreground);
	      this.dom.foreground = foreground; // create axis panel

	      var axis = document.createElement('div');
	      axis.className = 'vis-axis';
	      this.dom.axis = axis; // create labelset

	      var labelSet = document.createElement('div');
	      labelSet.className = 'vis-labelset';
	      this.dom.labelSet = labelSet; // create ungrouped Group

	      this._updateUngrouped(); // create background Group


	      var backgroundGroup = new BackgroundGroup(BACKGROUND$2, null, this);
	      backgroundGroup.show();
	      this.groups[BACKGROUND$2] = backgroundGroup; // attach event listeners
	      // Note: we bind to the centerContainer for the case where the height
	      //       of the center container is larger than of the ItemSet, so we
	      //       can click in the empty area to create a new item or deselect an item.

	      this.hammer = new Hammer$1(this.body.dom.centerContainer); // drag items when selected

	      this.hammer.on('hammer.input', function (event) {
	        if (event.isFirst) {
	          _this2._onTouch(event);
	        }
	      });
	      this.hammer.on('panstart', bind$2(_context3 = this._onDragStart).call(_context3, this));
	      this.hammer.on('panmove', bind$2(_context4 = this._onDrag).call(_context4, this));
	      this.hammer.on('panend', bind$2(_context5 = this._onDragEnd).call(_context5, this));
	      this.hammer.get('pan').set({
	        threshold: 5,
	        direction: Hammer$1.ALL
	      }); // single select (or unselect) when tapping an item

	      this.hammer.on('tap', bind$2(_context6 = this._onSelectItem).call(_context6, this)); // multi select when holding mouse/touch, or on ctrl+click

	      this.hammer.on('press', bind$2(_context7 = this._onMultiSelectItem).call(_context7, this)); // add item on doubletap

	      this.hammer.on('doubletap', bind$2(_context8 = this._onAddItem).call(_context8, this));

	      if (this.options.rtl) {
	        this.groupHammer = new Hammer$1(this.body.dom.rightContainer);
	      } else {
	        this.groupHammer = new Hammer$1(this.body.dom.leftContainer);
	      }

	      this.groupHammer.on('tap', bind$2(_context9 = this._onGroupClick).call(_context9, this));
	      this.groupHammer.on('panstart', bind$2(_context10 = this._onGroupDragStart).call(_context10, this));
	      this.groupHammer.on('panmove', bind$2(_context11 = this._onGroupDrag).call(_context11, this));
	      this.groupHammer.on('panend', bind$2(_context12 = this._onGroupDragEnd).call(_context12, this));
	      this.groupHammer.get('pan').set({
	        threshold: 5,
	        direction: Hammer$1.DIRECTION_VERTICAL
	      });
	      this.body.dom.centerContainer.addEventListener('mouseover', bind$2(_context13 = this._onMouseOver).call(_context13, this));
	      this.body.dom.centerContainer.addEventListener('mouseout', bind$2(_context14 = this._onMouseOut).call(_context14, this));
	      this.body.dom.centerContainer.addEventListener('mousemove', bind$2(_context15 = this._onMouseMove).call(_context15, this)); // right-click on timeline 

	      this.body.dom.centerContainer.addEventListener('contextmenu', bind$2(_context16 = this._onDragEnd).call(_context16, this));
	      this.body.dom.centerContainer.addEventListener('mousewheel', bind$2(_context17 = this._onMouseWheel).call(_context17, this)); // attach to the DOM

	      this.show();
	    }
	    /**
	     * Set options for the ItemSet. Existing options will be extended/overwritten.
	     * @param {Object} [options] The following options are available:
	     *                           {string} type
	     *                              Default type for the items. Choose from 'box'
	     *                              (default), 'point', 'range', or 'background'.
	     *                              The default style can be overwritten by
	     *                              individual items.
	     *                           {string} align
	     *                              Alignment for the items, only applicable for
	     *                              BoxItem. Choose 'center' (default), 'left', or
	     *                              'right'.
	     *                           {string} orientation.item
	     *                              Orientation of the item set. Choose 'top' or
	     *                              'bottom' (default).
	     *                           {Function} groupOrder
	     *                              A sorting function for ordering groups
	     *                           {boolean} stack
	     *                              If true (default), items will be stacked on
	     *                              top of each other.
	     *                           {number} margin.axis
	     *                              Margin between the axis and the items in pixels.
	     *                              Default is 20.
	     *                           {number} margin.item.horizontal
	     *                              Horizontal margin between items in pixels.
	     *                              Default is 10.
	     *                           {number} margin.item.vertical
	     *                              Vertical Margin between items in pixels.
	     *                              Default is 10.
	     *                           {number} margin.item
	     *                              Margin between items in pixels in both horizontal
	     *                              and vertical direction. Default is 10.
	     *                           {number} margin
	     *                              Set margin for both axis and items in pixels.
	     *                           {boolean} selectable
	     *                              If true (default), items can be selected.
	     *                           {boolean} multiselect
	     *                              If true, multiple items can be selected.
	     *                              False by default.
	     *                           {boolean} editable
	     *                              Set all editable options to true or false
	     *                           {boolean} editable.updateTime
	     *                              Allow dragging an item to an other moment in time
	     *                           {boolean} editable.updateGroup
	     *                              Allow dragging an item to an other group
	     *                           {boolean} editable.add
	     *                              Allow creating new items on double tap
	     *                           {boolean} editable.remove
	     *                              Allow removing items by clicking the delete button
	     *                              top right of a selected item.
	     *                           {Function(item: Item, callback: Function)} onAdd
	     *                              Callback function triggered when an item is about to be added:
	     *                              when the user double taps an empty space in the Timeline.
	     *                           {Function(item: Item, callback: Function)} onUpdate
	     *                              Callback function fired when an item is about to be updated.
	     *                              This function typically has to show a dialog where the user
	     *                              change the item. If not implemented, nothing happens.
	     *                           {Function(item: Item, callback: Function)} onMove
	     *                              Fired when an item has been moved. If not implemented,
	     *                              the move action will be accepted.
	     *                           {Function(item: Item, callback: Function)} onRemove
	     *                              Fired when an item is about to be deleted.
	     *                              If not implemented, the item will be always removed.
	     */

	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      var _this3 = this;

	      if (options) {
	        var _context18, _context20;

	        // copy all options that we know
	        var fields = ['type', 'rtl', 'align', 'order', 'stack', 'stackSubgroups', 'selectable', 'multiselect', 'sequentialSelection', 'multiselectPerGroup', 'longSelectPressTime', 'groupOrder', 'dataAttributes', 'template', 'groupTemplate', 'visibleFrameTemplate', 'hide', 'snap', 'groupOrderSwap', 'showTooltips', 'tooltip', 'tooltipOnItemUpdateTime', 'groupHeightMode', 'onTimeout'];
	        util$1.selectiveExtend(fields, this.options, options);

	        if ('itemsAlwaysDraggable' in options) {
	          if (typeof options.itemsAlwaysDraggable === 'boolean') {
	            this.options.itemsAlwaysDraggable.item = options.itemsAlwaysDraggable;
	            this.options.itemsAlwaysDraggable.range = false;
	          } else if (_typeof_1(options.itemsAlwaysDraggable) === 'object') {
	            util$1.selectiveExtend(['item', 'range'], this.options.itemsAlwaysDraggable, options.itemsAlwaysDraggable); // only allow range always draggable when item is always draggable as well

	            if (!this.options.itemsAlwaysDraggable.item) {
	              this.options.itemsAlwaysDraggable.range = false;
	            }
	          }
	        }

	        if ('sequentialSelection' in options) {
	          if (typeof options.sequentialSelection === 'boolean') {
	            this.options.sequentialSelection = options.sequentialSelection;
	          }
	        }

	        if ('orientation' in options) {
	          if (typeof options.orientation === 'string') {
	            this.options.orientation.item = options.orientation === 'top' ? 'top' : 'bottom';
	          } else if (_typeof_1(options.orientation) === 'object' && 'item' in options.orientation) {
	            this.options.orientation.item = options.orientation.item;
	          }
	        }

	        if ('margin' in options) {
	          if (typeof options.margin === 'number') {
	            this.options.margin.axis = options.margin;
	            this.options.margin.item.horizontal = options.margin;
	            this.options.margin.item.vertical = options.margin;
	          } else if (_typeof_1(options.margin) === 'object') {
	            util$1.selectiveExtend(['axis'], this.options.margin, options.margin);

	            if ('item' in options.margin) {
	              if (typeof options.margin.item === 'number') {
	                this.options.margin.item.horizontal = options.margin.item;
	                this.options.margin.item.vertical = options.margin.item;
	              } else if (_typeof_1(options.margin.item) === 'object') {
	                util$1.selectiveExtend(['horizontal', 'vertical'], this.options.margin.item, options.margin.item);
	              }
	            }
	          }
	        }

	        forEach$2(_context18 = ['locale', 'locales']).call(_context18, function (key) {
	          if (key in options) {
	            _this3.options[key] = options[key];
	          }
	        });

	        if ('editable' in options) {
	          if (typeof options.editable === 'boolean') {
	            this.options.editable.updateTime = options.editable;
	            this.options.editable.updateGroup = options.editable;
	            this.options.editable.add = options.editable;
	            this.options.editable.remove = options.editable;
	            this.options.editable.overrideItems = false;
	          } else if (_typeof_1(options.editable) === 'object') {
	            util$1.selectiveExtend(['updateTime', 'updateGroup', 'add', 'remove', 'overrideItems'], this.options.editable, options.editable);
	          }
	        }

	        if ('groupEditable' in options) {
	          if (typeof options.groupEditable === 'boolean') {
	            this.options.groupEditable.order = options.groupEditable;
	            this.options.groupEditable.add = options.groupEditable;
	            this.options.groupEditable.remove = options.groupEditable;
	          } else if (_typeof_1(options.groupEditable) === 'object') {
	            util$1.selectiveExtend(['order', 'add', 'remove'], this.options.groupEditable, options.groupEditable);
	          }
	        } // callback functions


	        var addCallback = function addCallback(name) {
	          var fn = options[name];

	          if (fn) {
	            if (!(typeof fn === 'function')) {
	              var _context19;

	              throw new Error(concat$2(_context19 = "option ".concat(name, " must be a function ")).call(_context19, name, "(item, callback)"));
	            }

	            _this3.options[name] = fn;
	          }
	        };

	        forEach$2(_context20 = ['onDropObjectOnItem', 'onAdd', 'onUpdate', 'onRemove', 'onMove', 'onMoving', 'onAddGroup', 'onMoveGroup', 'onRemoveGroup']).call(_context20, addCallback);

	        if (options.cluster) {
	          assign$2(this.options, {
	            cluster: options.cluster
	          });

	          if (!this.clusterGenerator) {
	            this.clusterGenerator = new ClusterGenerator(this);
	          }

	          this.clusterGenerator.setItems(this.items, {
	            applyOnChangedLevel: false
	          });
	          this.markDirty({
	            refreshItems: true,
	            restackGroups: true
	          });
	          this.redraw();
	        } else if (this.clusterGenerator) {
	          this._detachAllClusters();

	          this.clusters = [];
	          this.clusterGenerator = null;
	          this.options.cluster = undefined;
	          this.markDirty({
	            refreshItems: true,
	            restackGroups: true
	          });
	          this.redraw();
	        } else {
	          // force the itemSet to refresh: options like orientation and margins may be changed
	          this.markDirty();
	        }
	      }
	    }
	    /**
	     * Mark the ItemSet dirty so it will refresh everything with next redraw.
	     * Optionally, all items can be marked as dirty and be refreshed.
	     * @param {{refreshItems: boolean}} [options]
	     */

	  }, {
	    key: "markDirty",
	    value: function markDirty(options) {
	      this.groupIds = [];

	      if (options) {
	        if (options.refreshItems) {
	          forEach$2(util$1).call(util$1, this.items, function (item) {
	            item.dirty = true;
	            if (item.displayed) item.redraw();
	          });
	        }

	        if (options.restackGroups) {
	          forEach$2(util$1).call(util$1, this.groups, function (group, key) {
	            if (key === BACKGROUND$2) return;
	            group.stackDirty = true;
	          });
	        }
	      }
	    }
	    /**
	     * Destroy the ItemSet
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.clearPopupTimer();
	      this.hide();
	      this.setItems(null);
	      this.setGroups(null);
	      this.hammer && this.hammer.destroy();
	      this.groupHammer && this.groupHammer.destroy();
	      this.hammer = null;
	      this.body = null;
	      this.conversion = null;
	    }
	    /**
	     * Hide the component from the DOM
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      // remove the frame containing the items
	      if (this.dom.frame.parentNode) {
	        this.dom.frame.parentNode.removeChild(this.dom.frame);
	      } // remove the axis with dots


	      if (this.dom.axis.parentNode) {
	        this.dom.axis.parentNode.removeChild(this.dom.axis);
	      } // remove the labelset containing all group labels


	      if (this.dom.labelSet.parentNode) {
	        this.dom.labelSet.parentNode.removeChild(this.dom.labelSet);
	      }
	    }
	    /**
	     * Show the component in the DOM (when not already visible).
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      // show frame containing the items
	      if (!this.dom.frame.parentNode) {
	        this.body.dom.center.appendChild(this.dom.frame);
	      } // show axis with dots


	      if (!this.dom.axis.parentNode) {
	        this.body.dom.backgroundVertical.appendChild(this.dom.axis);
	      } // show labelset containing labels


	      if (!this.dom.labelSet.parentNode) {
	        if (this.options.rtl) {
	          this.body.dom.right.appendChild(this.dom.labelSet);
	        } else {
	          this.body.dom.left.appendChild(this.dom.labelSet);
	        }
	      }
	    }
	    /**
	     * Activates the popup timer to show the given popup after a fixed time.
	     * @param {Popup} popup
	     */

	  }, {
	    key: "setPopupTimer",
	    value: function setPopupTimer(popup) {
	      this.clearPopupTimer();

	      if (popup) {
	        var delay = this.options.tooltip.delay || typeof this.options.tooltip.delay === 'number' ? this.options.tooltip.delay : 500;
	        this.popupTimer = setTimeout$2(function () {
	          popup.show();
	        }, delay);
	      }
	    }
	    /**
	     * Clears the popup timer for the tooltip.
	     */

	  }, {
	    key: "clearPopupTimer",
	    value: function clearPopupTimer() {
	      if (this.popupTimer != null) {
	        clearTimeout(this.popupTimer);
	        this.popupTimer = null;
	      }
	    }
	    /**
	     * Set selected items by their id. Replaces the current selection
	     * Unknown id's are silently ignored.
	     * @param {string[] | string} [ids] An array with zero or more id's of the items to be
	     *                                  selected, or a single item id. If ids is undefined
	     *                                  or an empty array, all items will be unselected.
	     */

	  }, {
	    key: "setSelection",
	    value: function setSelection(ids) {
	      var _context21;

	      if (ids == undefined) {
	        ids = [];
	      }

	      if (!isArray$3(ids)) {
	        ids = [ids];
	      }

	      var idsToDeselect = filter$2(_context21 = this.selection).call(_context21, function (id) {
	        return indexOf$3(ids).call(ids, id) === -1;
	      }); // unselect currently selected items


	      var _iterator = _createForOfIteratorHelper$4(idsToDeselect),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var selectedId = _step.value;
	          var item = this.getItemById(selectedId);

	          if (item) {
	            item.unselect();
	          }
	        } // select items

	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }

	      this.selection = toConsumableArray(ids);

	      var _iterator2 = _createForOfIteratorHelper$4(ids),
	          _step2;

	      try {
	        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	          var id = _step2.value;

	          var _item2 = this.getItemById(id);

	          if (_item2) {
	            _item2.select();
	          }
	        }
	      } catch (err) {
	        _iterator2.e(err);
	      } finally {
	        _iterator2.f();
	      }
	    }
	    /**
	     * Get the selected items by their id
	     * @return {Array} ids  The ids of the selected items
	     */

	  }, {
	    key: "getSelection",
	    value: function getSelection() {
	      var _context22;

	      return concat$2(_context22 = this.selection).call(_context22, []);
	    }
	    /**
	     * Get the id's of the currently visible items.
	     * @returns {Array} The ids of the visible items
	     */

	  }, {
	    key: "getVisibleItems",
	    value: function getVisibleItems() {
	      var range = this.body.range.getRange();
	      var right;
	      var left;

	      if (this.options.rtl) {
	        right = this.body.util.toScreen(range.start);
	        left = this.body.util.toScreen(range.end);
	      } else {
	        left = this.body.util.toScreen(range.start);
	        right = this.body.util.toScreen(range.end);
	      }

	      var ids = [];

	      for (var groupId in this.groups) {
	        if (this.groups.hasOwnProperty(groupId)) {
	          var group = this.groups[groupId];
	          var rawVisibleItems = group.isVisible ? group.visibleItems : []; // filter the "raw" set with visibleItems into a set which is really
	          // visible by pixels

	          var _iterator3 = _createForOfIteratorHelper$4(rawVisibleItems),
	              _step3;

	          try {
	            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
	              var item = _step3.value;

	              // TODO: also check whether visible vertically
	              if (this.options.rtl) {
	                if (item.right < left && item.right + item.width > right) {
	                  ids.push(item.id);
	                }
	              } else {
	                if (item.left < right && item.left + item.width > left) {
	                  ids.push(item.id);
	                }
	              }
	            }
	          } catch (err) {
	            _iterator3.e(err);
	          } finally {
	            _iterator3.f();
	          }
	        }
	      }

	      return ids;
	    }
	    /**
	     * Get the id's of the currently visible groups.
	     * @returns {Array} The ids of the visible groups
	     */

	  }, {
	    key: "getVisibleGroups",
	    value: function getVisibleGroups() {
	      var ids = [];

	      for (var groupId in this.groups) {
	        if (this.groups.hasOwnProperty(groupId)) {
	          var group = this.groups[groupId];

	          if (group.isVisible) {
	            ids.push(groupId);
	          }
	        }
	      }

	      return ids;
	    }
	    /**
	     * get item by id
	     * @param {string} id
	     * @return {object} item
	     */

	  }, {
	    key: "getItemById",
	    value: function getItemById(id) {
	      var _context23;

	      return this.items[id] || find$2(_context23 = this.clusters).call(_context23, function (cluster) {
	        return cluster.id === id;
	      });
	    }
	    /**
	     * Deselect a selected item
	     * @param {string | number} id
	     * @private
	     */

	  }, {
	    key: "_deselect",
	    value: function _deselect(id) {
	      var selection = this.selection;

	      for (var i = 0, ii = selection.length; i < ii; i++) {
	        if (selection[i] == id) {
	          // non-strict comparison!
	          splice$2(selection).call(selection, i, 1);

	          break;
	        }
	      }
	    }
	    /**
	     * Repaint the component
	     * @return {boolean} Returns true if the component is resized
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      var _this4 = this;

	      var margin = this.options.margin;
	      var range = this.body.range;
	      var asSize = util$1.option.asSize;
	      var options = this.options;
	      var orientation = options.orientation.item;
	      var resized = false;
	      var frame = this.dom.frame; // recalculate absolute position (before redrawing groups)

	      this.props.top = this.body.domProps.top.height + this.body.domProps.border.top;

	      if (this.options.rtl) {
	        this.props.right = this.body.domProps.right.width + this.body.domProps.border.right;
	      } else {
	        this.props.left = this.body.domProps.left.width + this.body.domProps.border.left;
	      } // update class name


	      frame.className = 'vis-itemset';

	      if (this.options.cluster) {
	        this._clusterItems();
	      } // reorder the groups (if needed)


	      resized = this._orderGroups() || resized; // check whether zoomed (in that case we need to re-stack everything)
	      // TODO: would be nicer to get this as a trigger from Range

	      var visibleInterval = range.end - range.start;
	      var zoomed = visibleInterval != this.lastVisibleInterval || this.props.width != this.props.lastWidth;
	      var scrolled = range.start != this.lastRangeStart;
	      var changedStackOption = options.stack != this.lastStack;
	      var changedStackSubgroupsOption = options.stackSubgroups != this.lastStackSubgroups;
	      var forceRestack = zoomed || scrolled || changedStackOption || changedStackSubgroupsOption;
	      this.lastVisibleInterval = visibleInterval;
	      this.lastRangeStart = range.start;
	      this.lastStack = options.stack;
	      this.lastStackSubgroups = options.stackSubgroups;
	      this.props.lastWidth = this.props.width;

	      var firstGroup = this._firstGroup();

	      var firstMargin = {
	        item: margin.item,
	        axis: margin.axis
	      };
	      var nonFirstMargin = {
	        item: margin.item,
	        axis: margin.item.vertical / 2
	      };
	      var height = 0;
	      var minHeight = margin.axis + margin.item.vertical; // redraw the background group

	      this.groups[BACKGROUND$2].redraw(range, nonFirstMargin, forceRestack);
	      var redrawQueue = {};
	      var redrawQueueLength = 0; // collect redraw functions

	      forEach$2(util$1).call(util$1, this.groups, function (group, key) {
	        if (key === BACKGROUND$2) return;
	        var groupMargin = group == firstGroup ? firstMargin : nonFirstMargin;
	        var returnQueue = true;
	        redrawQueue[key] = group.redraw(range, groupMargin, forceRestack, returnQueue);
	        redrawQueueLength = redrawQueue[key].length;
	      });

	      var needRedraw = redrawQueueLength > 0;

	      if (needRedraw) {
	        (function () {
	          var redrawResults = {};

	          var _loop = function _loop(i) {
	            forEach$2(util$1).call(util$1, redrawQueue, function (fns, key) {
	              redrawResults[key] = fns[i]();
	            });
	          };

	          for (var i = 0; i < redrawQueueLength; i++) {
	            _loop(i);
	          } // redraw all regular groups


	          forEach$2(util$1).call(util$1, _this4.groups, function (group, key) {
	            if (key === BACKGROUND$2) return;
	            var groupResized = redrawResults[key];
	            resized = groupResized || resized;
	            height += group.height;
	          });

	          height = Math.max(height, minHeight);
	        })();
	      }

	      height = Math.max(height, minHeight); // update frame height

	      frame.style.height = asSize(height); // calculate actual size

	      this.props.width = frame.offsetWidth;
	      this.props.height = height; // reposition axis

	      this.dom.axis.style.top = asSize(orientation == 'top' ? this.body.domProps.top.height + this.body.domProps.border.top : this.body.domProps.top.height + this.body.domProps.centerContainer.height);

	      if (this.options.rtl) {
	        this.dom.axis.style.right = '0';
	      } else {
	        this.dom.axis.style.left = '0';
	      }

	      this.hammer.get('press').set({
	        time: this.options.longSelectPressTime
	      });
	      this.initialItemSetDrawn = true; // check if this component is resized

	      resized = this._isResized() || resized;
	      return resized;
	    }
	    /**
	     * Get the first group, aligned with the axis
	     * @return {Group | null} firstGroup
	     * @private
	     */

	  }, {
	    key: "_firstGroup",
	    value: function _firstGroup() {
	      var firstGroupIndex = this.options.orientation.item == 'top' ? 0 : this.groupIds.length - 1;
	      var firstGroupId = this.groupIds[firstGroupIndex];
	      var firstGroup = this.groups[firstGroupId] || this.groups[UNGROUPED$2];
	      return firstGroup || null;
	    }
	    /**
	     * Create or delete the group holding all ungrouped items. This group is used when
	     * there are no groups specified.
	     * @protected
	     */

	  }, {
	    key: "_updateUngrouped",
	    value: function _updateUngrouped() {
	      var ungrouped = this.groups[UNGROUPED$2];
	      var item;
	      var itemId;

	      if (this.groupsData) {
	        // remove the group holding all ungrouped items
	        if (ungrouped) {
	          ungrouped.dispose();
	          delete this.groups[UNGROUPED$2];

	          for (itemId in this.items) {
	            if (this.items.hasOwnProperty(itemId)) {
	              item = this.items[itemId];
	              item.parent && item.parent.remove(item);
	              var groupId = this.getGroupId(item.data);
	              var group = this.groups[groupId];
	              group && group.add(item) || item.hide();
	            }
	          }
	        }
	      } else {
	        // create a group holding all (unfiltered) items
	        if (!ungrouped) {
	          var id = null;
	          var data = null;
	          ungrouped = new Group(id, data, this);
	          this.groups[UNGROUPED$2] = ungrouped;

	          for (itemId in this.items) {
	            if (this.items.hasOwnProperty(itemId)) {
	              item = this.items[itemId];
	              ungrouped.add(item);
	            }
	          }

	          ungrouped.show();
	        }
	      }
	    }
	    /**
	     * Get the element for the labelset
	     * @return {HTMLElement} labelSet
	     */

	  }, {
	    key: "getLabelSet",
	    value: function getLabelSet() {
	      return this.dom.labelSet;
	    }
	    /**
	     * Set items
	     * @param {vis.DataSet | null} items
	     */

	  }, {
	    key: "setItems",
	    value: function setItems(items) {
	      this.itemsSettingTime = new Date();
	      var me = this;
	      var ids;
	      var oldItemsData = this.itemsData; // replace the dataset

	      if (!items) {
	        this.itemsData = null;
	      } else if (esnext.isDataViewLike("id", items)) {
	        this.itemsData = typeCoerceDataSet(items);
	      } else {
	        throw new TypeError('Data must implement the interface of DataSet or DataView');
	      }

	      if (oldItemsData) {
	        // unsubscribe from old dataset
	        forEach$2(util$1).call(util$1, this.itemListeners, function (callback, event) {
	          oldItemsData.off(event, callback);
	        }); // stop maintaining a coerced version of the old data set


	        oldItemsData.dispose(); // remove all drawn items

	        ids = oldItemsData.getIds();

	        this._onRemove(ids);
	      }

	      if (this.itemsData) {
	        // subscribe to new dataset
	        var id = this.id;

	        forEach$2(util$1).call(util$1, this.itemListeners, function (callback, event) {
	          me.itemsData.on(event, callback, id);
	        }); // add all new items


	        ids = this.itemsData.getIds();

	        this._onAdd(ids); // update the group holding all ungrouped items


	        this._updateUngrouped();
	      }

	      this.body.emitter.emit('_change', {
	        queue: true
	      });
	    }
	    /**
	     * Get the current items
	     * @returns {vis.DataSet | null}
	     */

	  }, {
	    key: "getItems",
	    value: function getItems() {
	      return this.itemsData != null ? this.itemsData.rawDS : null;
	    }
	    /**
	     * Set groups
	     * @param {vis.DataSet} groups
	     */

	  }, {
	    key: "setGroups",
	    value: function setGroups(groups) {
	      var me = this;
	      var ids; // unsubscribe from current dataset

	      if (this.groupsData) {
	        forEach$2(util$1).call(util$1, this.groupListeners, function (callback, event) {
	          me.groupsData.off(event, callback);
	        }); // remove all drawn groups


	        ids = this.groupsData.getIds();
	        this.groupsData = null;

	        this._onRemoveGroups(ids); // note: this will cause a redraw

	      } // replace the dataset


	      if (!groups) {
	        this.groupsData = null;
	      } else if (esnext.isDataViewLike("id", groups)) {
	        this.groupsData = groups;
	      } else {
	        throw new TypeError('Data must implement the interface of DataSet or DataView');
	      }

	      if (this.groupsData) {
	        var _context24;

	        // go over all groups nesting
	        var groupsData = this.groupsData.getDataSet();

	        forEach$2(_context24 = groupsData.get()).call(_context24, function (group) {
	          if (group.nestedGroups) {
	            var _context25;

	            forEach$2(_context25 = group.nestedGroups).call(_context25, function (nestedGroupId) {
	              var updatedNestedGroup = groupsData.get(nestedGroupId);
	              updatedNestedGroup.nestedInGroup = group.id;

	              if (group.showNested == false) {
	                updatedNestedGroup.visible = false;
	              }

	              groupsData.update(updatedNestedGroup);
	            });
	          }
	        }); // subscribe to new dataset


	        var id = this.id;

	        forEach$2(util$1).call(util$1, this.groupListeners, function (callback, event) {
	          me.groupsData.on(event, callback, id);
	        }); // draw all ms


	        ids = this.groupsData.getIds();

	        this._onAddGroups(ids);
	      } // update the group holding all ungrouped items


	      this._updateUngrouped(); // update the order of all items in each group


	      this._order();

	      if (this.options.cluster) {
	        this.clusterGenerator.updateData();

	        this._clusterItems();

	        this.markDirty({
	          refreshItems: true,
	          restackGroups: true
	        });
	      }

	      this.body.emitter.emit('_change', {
	        queue: true
	      });
	    }
	    /**
	     * Get the current groups
	     * @returns {vis.DataSet | null} groups
	     */

	  }, {
	    key: "getGroups",
	    value: function getGroups() {
	      return this.groupsData;
	    }
	    /**
	     * Remove an item by its id
	     * @param {string | number} id
	     */

	  }, {
	    key: "removeItem",
	    value: function removeItem(id) {
	      var _this5 = this;

	      var item = this.itemsData.get(id);

	      if (item) {
	        // confirm deletion
	        this.options.onRemove(item, function (item) {
	          if (item) {
	            // remove by id here, it is possible that an item has no id defined
	            // itself, so better not delete by the item itself
	            _this5.itemsData.remove(id);
	          }
	        });
	      }
	    }
	    /**
	     * Get the time of an item based on it's data and options.type
	     * @param {Object} itemData
	     * @returns {string} Returns the type
	     * @private
	     */

	  }, {
	    key: "_getType",
	    value: function _getType(itemData) {
	      return itemData.type || this.options.type || (itemData.end ? 'range' : 'box');
	    }
	    /**
	     * Get the group id for an item
	     * @param {Object} itemData
	     * @returns {string} Returns the groupId
	     * @private
	     */

	  }, {
	    key: "getGroupId",
	    value: function getGroupId(itemData) {
	      var type = this._getType(itemData);

	      if (type == 'background' && itemData.group == undefined) {
	        return BACKGROUND$2;
	      } else {
	        return this.groupsData ? itemData.group : UNGROUPED$2;
	      }
	    }
	    /**
	     * Handle updated items
	     * @param {number[]} ids
	     * @protected
	     */

	  }, {
	    key: "_onUpdate",
	    value: function _onUpdate(ids) {
	      var _this6 = this;

	      var me = this;

	      forEach$2(ids).call(ids, function (id) {
	        var itemData = me.itemsData.get(id);
	        var item = me.items[id];
	        var type = itemData ? me._getType(itemData) : null;
	        var constructor = ItemSet.types[type];
	        var selected;

	        if (item) {
	          // update item   	
	          if (!constructor || !(item instanceof constructor)) {
	            // item type has changed, delete the item and recreate it
	            selected = item.selected; // preserve selection of this item

	            me._removeItem(item);

	            item = null;
	          } else {
	            me._updateItem(item, itemData);
	          }
	        }

	        if (!item && itemData) {
	          // create item
	          if (constructor) {
	            item = new constructor(itemData, me.conversion, me.options);
	            item.id = id; // TODO: not so nice setting id afterwards

	            me._addItem(item);

	            if (selected) {
	              _this6.selection.push(id);

	              item.select();
	            }
	          } else {
	            throw new TypeError("Unknown item type \"".concat(type, "\""));
	          }
	        }
	      });

	      this._order();

	      if (this.options.cluster) {
	        this.clusterGenerator.setItems(this.items, {
	          applyOnChangedLevel: false
	        });

	        this._clusterItems();
	      }

	      this.body.emitter.emit('_change', {
	        queue: true
	      });
	    }
	    /**
	     * Handle removed items
	     * @param {number[]} ids
	     * @protected
	     */

	  }, {
	    key: "_onRemove",
	    value: function _onRemove(ids) {
	      var count = 0;
	      var me = this;

	      forEach$2(ids).call(ids, function (id) {
	        var item = me.items[id];

	        if (item) {
	          count++;

	          me._removeItem(item);
	        }
	      });

	      if (count) {
	        // update order
	        this._order();

	        this.body.emitter.emit('_change', {
	          queue: true
	        });
	      }
	    }
	    /**
	     * Update the order of item in all groups
	     * @private
	     */

	  }, {
	    key: "_order",
	    value: function _order() {
	      // reorder the items in all groups
	      // TODO: optimization: only reorder groups affected by the changed items
	      forEach$2(util$1).call(util$1, this.groups, function (group) {
	        group.order();
	      });
	    }
	    /**
	     * Handle updated groups
	     * @param {number[]} ids
	     * @private
	     */

	  }, {
	    key: "_onUpdateGroups",
	    value: function _onUpdateGroups(ids) {
	      this._onAddGroups(ids);
	    }
	    /**
	     * Handle changed groups (added or updated)
	     * @param {number[]} ids
	     * @private
	     */

	  }, {
	    key: "_onAddGroups",
	    value: function _onAddGroups(ids) {
	      var me = this;

	      forEach$2(ids).call(ids, function (id) {
	        var groupData = me.groupsData.get(id);
	        var group = me.groups[id];

	        if (!group) {
	          // check for reserved ids
	          if (id == UNGROUPED$2 || id == BACKGROUND$2) {
	            throw new Error("Illegal group id. ".concat(id, " is a reserved id."));
	          }

	          var groupOptions = create$4(me.options);

	          util$1.extend(groupOptions, {
	            height: null
	          });
	          group = new Group(id, groupData, me);
	          me.groups[id] = group; // add items with this groupId to the new group

	          for (var itemId in me.items) {
	            if (me.items.hasOwnProperty(itemId)) {
	              var item = me.items[itemId];

	              if (item.data.group == id) {
	                group.add(item);
	              }
	            }
	          }

	          group.order();
	          group.show();
	        } else {
	          // update group
	          group.setData(groupData);
	        }
	      });

	      this.body.emitter.emit('_change', {
	        queue: true
	      });
	    }
	    /**
	     * Handle removed groups
	     * @param {number[]} ids
	     * @private
	     */

	  }, {
	    key: "_onRemoveGroups",
	    value: function _onRemoveGroups(ids) {
	      var _this7 = this;

	      forEach$2(ids).call(ids, function (id) {
	        var group = _this7.groups[id];

	        if (group) {
	          group.dispose();
	          delete _this7.groups[id];
	        }
	      });

	      if (this.options.cluster) {
	        this.clusterGenerator.updateData();

	        this._clusterItems();
	      }

	      this.markDirty({
	        restackGroups: !!this.options.cluster
	      });
	      this.body.emitter.emit('_change', {
	        queue: true
	      });
	    }
	    /**
	     * Reorder the groups if needed
	     * @return {boolean} changed
	     * @private
	     */

	  }, {
	    key: "_orderGroups",
	    value: function _orderGroups() {
	      if (this.groupsData) {
	        // reorder the groups
	        var groupIds = this.groupsData.getIds({
	          order: this.options.groupOrder
	        });
	        groupIds = this._orderNestedGroups(groupIds);
	        var changed = !util$1.equalArray(groupIds, this.groupIds);

	        if (changed) {
	          // hide all groups, removes them from the DOM
	          var groups = this.groups;

	          forEach$2(groupIds).call(groupIds, function (groupId) {
	            groups[groupId].hide();
	          }); // show the groups again, attach them to the DOM in correct order


	          forEach$2(groupIds).call(groupIds, function (groupId) {
	            groups[groupId].show();
	          });

	          this.groupIds = groupIds;
	        }

	        return changed;
	      } else {
	        return false;
	      }
	    }
	    /**
	     * Reorder the nested groups
	     *
	     * @param {Array.<number>} groupIds
	     * @returns {Array.<number>}
	     * @private
	     */

	  }, {
	    key: "_orderNestedGroups",
	    value: function _orderNestedGroups(groupIds) {
	      var _this8 = this;

	      /**
	       * Recursively order nested groups
	       *
	       * @param {ItemSet} t
	       * @param {Array.<number>} groupIds
	       * @returns {Array.<number>}
	       * @private
	       */
	      function getOrderedNestedGroups(t, groupIds) {
	        var result = [];

	        forEach$2(groupIds).call(groupIds, function (groupId) {
	          result.push(groupId);
	          var groupData = t.groupsData.get(groupId);

	          if (groupData.nestedGroups) {
	            var _context26;

	            var nestedGroupIds = map$2(_context26 = t.groupsData.get({
	              filter: function filter(nestedGroup) {
	                return nestedGroup.nestedInGroup == groupId;
	              },
	              order: t.options.groupOrder
	            })).call(_context26, function (nestedGroup) {
	              return nestedGroup.id;
	            });

	            result = concat$2(result).call(result, getOrderedNestedGroups(t, nestedGroupIds));
	          }
	        });

	        return result;
	      }

	      var topGroupIds = filter$2(groupIds).call(groupIds, function (groupId) {
	        return !_this8.groupsData.get(groupId).nestedInGroup;
	      });

	      return getOrderedNestedGroups(this, topGroupIds);
	    }
	    /**
	     * Add a new item
	     * @param {Item} item
	     * @private
	     */

	  }, {
	    key: "_addItem",
	    value: function _addItem(item) {
	      this.items[item.id] = item; // add to group

	      var groupId = this.getGroupId(item.data);
	      var group = this.groups[groupId];

	      if (!group) {
	        item.groupShowing = false;
	      } else if (group && group.data && group.data.showNested) {
	        item.groupShowing = true;
	      }

	      if (group) group.add(item);
	    }
	    /**
	     * Update an existing item
	     * @param {Item} item
	     * @param {Object} itemData
	     * @private
	     */

	  }, {
	    key: "_updateItem",
	    value: function _updateItem(item, itemData) {
	      // update the items data (will redraw the item when displayed)
	      item.setData(itemData);
	      var groupId = this.getGroupId(item.data);
	      var group = this.groups[groupId];

	      if (!group) {
	        item.groupShowing = false;
	      } else if (group && group.data && group.data.showNested) {
	        item.groupShowing = true;
	      }
	    }
	    /**
	     * Delete an item from the ItemSet: remove it from the DOM, from the map
	     * with items, and from the map with visible items, and from the selection
	     * @param {Item} item
	     * @private
	     */

	  }, {
	    key: "_removeItem",
	    value: function _removeItem(item) {
	      var _context27, _context28;

	      // remove from DOM
	      item.hide(); // remove from items

	      delete this.items[item.id]; // remove from selection

	      var index = indexOf$3(_context27 = this.selection).call(_context27, item.id);

	      if (index != -1) splice$2(_context28 = this.selection).call(_context28, index, 1); // remove from group

	      item.parent && item.parent.remove(item); // remove Tooltip from DOM

	      if (this.popup != null) {
	        this.popup.hide();
	      }
	    }
	    /**
	     * Create an array containing all items being a range (having an end date)
	     * @param {Array.<Object>} array
	     * @returns {Array}
	     * @private
	     */

	  }, {
	    key: "_constructByEndArray",
	    value: function _constructByEndArray(array) {
	      var endArray = [];

	      for (var i = 0; i < array.length; i++) {
	        if (array[i] instanceof RangeItem) {
	          endArray.push(array[i]);
	        }
	      }

	      return endArray;
	    }
	    /**
	     * Register the clicked item on touch, before dragStart is initiated.
	     *
	     * dragStart is initiated from a mousemove event, AFTER the mouse/touch is
	     * already moving. Therefore, the mouse/touch can sometimes be above an other
	     * DOM element than the item itself.
	     *
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onTouch",
	    value: function _onTouch(event) {
	      // store the touched item, used in _onDragStart
	      this.touchParams.item = this.itemFromTarget(event);
	      this.touchParams.dragLeftItem = event.target.dragLeftItem || false;
	      this.touchParams.dragRightItem = event.target.dragRightItem || false;
	      this.touchParams.itemProps = null;
	    }
	    /**
	     * Given an group id, returns the index it has.
	     *
	     * @param {number} groupId
	     * @returns {number} index / groupId
	     * @private
	     */

	  }, {
	    key: "_getGroupIndex",
	    value: function _getGroupIndex(groupId) {
	      for (var i = 0; i < this.groupIds.length; i++) {
	        if (groupId == this.groupIds[i]) return i;
	      }
	    }
	    /**
	     * Start dragging the selected events
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDragStart",
	    value: function _onDragStart(event) {
	      var _this9 = this;

	      if (this.touchParams.itemIsDragging) {
	        return;
	      }

	      var item = this.touchParams.item || null;
	      var me = this;
	      var props;

	      if (item && (item.selected || this.options.itemsAlwaysDraggable.item)) {
	        if (this.options.editable.overrideItems && !this.options.editable.updateTime && !this.options.editable.updateGroup) {
	          return;
	        } // override options.editable


	        if (item.editable != null && !item.editable.updateTime && !item.editable.updateGroup && !this.options.editable.overrideItems) {
	          return;
	        }

	        var dragLeftItem = this.touchParams.dragLeftItem;
	        var dragRightItem = this.touchParams.dragRightItem;
	        this.touchParams.itemIsDragging = true;
	        this.touchParams.selectedItem = item;

	        if (dragLeftItem) {
	          props = {
	            item: dragLeftItem,
	            initialX: event.center.x,
	            dragLeft: true,
	            data: this._cloneItemData(item.data)
	          };
	          this.touchParams.itemProps = [props];
	        } else if (dragRightItem) {
	          props = {
	            item: dragRightItem,
	            initialX: event.center.x,
	            dragRight: true,
	            data: this._cloneItemData(item.data)
	          };
	          this.touchParams.itemProps = [props];
	        } else if (this.options.editable.add && (event.srcEvent.ctrlKey || event.srcEvent.metaKey)) {
	          // create a new range item when dragging with ctrl key down
	          this._onDragStartAddItem(event);
	        } else {
	          if (this.groupIds.length < 1) {
	            // Mitigates a race condition if _onDragStart() is
	            // called after markDirty() without redraw() being called between.
	            this.redraw();
	          }

	          var baseGroupIndex = this._getGroupIndex(item.data.group);

	          var itemsToDrag = this.options.itemsAlwaysDraggable.item && !item.selected ? [item.id] : this.getSelection();
	          this.touchParams.itemProps = map$2(itemsToDrag).call(itemsToDrag, function (id) {
	            var item = me.items[id];

	            var groupIndex = me._getGroupIndex(item.data.group);

	            return {
	              item: item,
	              initialX: event.center.x,
	              groupOffset: baseGroupIndex - groupIndex,
	              data: _this9._cloneItemData(item.data)
	            };
	          });
	        }

	        event.stopPropagation();
	      } else if (this.options.editable.add && (event.srcEvent.ctrlKey || event.srcEvent.metaKey)) {
	        // create a new range item when dragging with ctrl key down
	        this._onDragStartAddItem(event);
	      }
	    }
	    /**
	     * Start creating a new range item by dragging.
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDragStartAddItem",
	    value: function _onDragStartAddItem(event) {
	      var snap = this.options.snap || null;
	      var frameRect = this.dom.frame.getBoundingClientRect(); // plus (if rtl) 10 to compensate for the drag starting as soon as you've moved 10px

	      var x = this.options.rtl ? frameRect.right - event.center.x + 10 : event.center.x - frameRect.left - 10;
	      var time = this.body.util.toTime(x);
	      var scale = this.body.util.getScale();
	      var step = this.body.util.getStep();
	      var start = snap ? snap(time, scale, step) : time;
	      var end = start;
	      var itemData = {
	        type: 'range',
	        start: start,
	        end: end,
	        content: 'new item'
	      };
	      var id = v4();
	      itemData[this.itemsData.idProp] = id;
	      var group = this.groupFromTarget(event);

	      if (group) {
	        itemData.group = group.groupId;
	      }

	      var newItem = new RangeItem(itemData, this.conversion, this.options);
	      newItem.id = id; // TODO: not so nice setting id afterwards

	      newItem.data = this._cloneItemData(itemData);

	      this._addItem(newItem);

	      this.touchParams.selectedItem = newItem;
	      var props = {
	        item: newItem,
	        initialX: event.center.x,
	        data: newItem.data
	      };

	      if (this.options.rtl) {
	        props.dragLeft = true;
	      } else {
	        props.dragRight = true;
	      }

	      this.touchParams.itemProps = [props];
	      event.stopPropagation();
	    }
	    /**
	     * Drag selected items
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDrag",
	    value: function _onDrag(event) {
	      var _this10 = this;

	      if (this.popup != null && this.options.showTooltips && !this.popup.hidden) {
	        // this.popup.hide();
	        var container = this.body.dom.centerContainer;
	        var containerRect = container.getBoundingClientRect();
	        this.popup.setPosition(event.center.x - containerRect.left + container.offsetLeft, event.center.y - containerRect.top + container.offsetTop);
	        this.popup.show(); // redraw
	      }

	      if (this.touchParams.itemProps) {
	        var _context29;

	        event.stopPropagation();
	        var me = this;
	        var snap = this.options.snap || null;
	        var domRootOffsetLeft = this.body.dom.root.offsetLeft;
	        var xOffset = this.options.rtl ? domRootOffsetLeft + this.body.domProps.right.width : domRootOffsetLeft + this.body.domProps.left.width;
	        var scale = this.body.util.getScale();
	        var step = this.body.util.getStep(); //only calculate the new group for the item that's actually dragged

	        var selectedItem = this.touchParams.selectedItem;
	        var updateGroupAllowed = (this.options.editable.overrideItems || selectedItem.editable == null) && this.options.editable.updateGroup || !this.options.editable.overrideItems && selectedItem.editable != null && selectedItem.editable.updateGroup;
	        var newGroupBase = null;

	        if (updateGroupAllowed && selectedItem) {
	          if (selectedItem.data.group != undefined) {
	            // drag from one group to another
	            var group = me.groupFromTarget(event);

	            if (group) {
	              //we know the offset for all items, so the new group for all items
	              //will be relative to this one.
	              newGroupBase = this._getGroupIndex(group.groupId);
	            }
	          }
	        } // move


	        forEach$2(_context29 = this.touchParams.itemProps).call(_context29, function (props) {
	          var current = me.body.util.toTime(event.center.x - xOffset);
	          var initial = me.body.util.toTime(props.initialX - xOffset);
	          var offset;
	          var initialStart;
	          var initialEnd;
	          var start;
	          var end;

	          if (_this10.options.rtl) {
	            offset = -(current - initial); // ms
	          } else {
	            offset = current - initial; // ms
	          }

	          var itemData = _this10._cloneItemData(props.item.data); // clone the data


	          if (props.item.editable != null && !props.item.editable.updateTime && !props.item.editable.updateGroup && !me.options.editable.overrideItems) {
	            return;
	          }

	          var updateTimeAllowed = (_this10.options.editable.overrideItems || selectedItem.editable == null) && _this10.options.editable.updateTime || !_this10.options.editable.overrideItems && selectedItem.editable != null && selectedItem.editable.updateTime;

	          if (updateTimeAllowed) {
	            if (props.dragLeft) {
	              // drag left side of a range item
	              if (_this10.options.rtl) {
	                if (itemData.end != undefined) {
	                  initialEnd = util$1.convert(props.data.end, 'Date');
	                  end = new Date(initialEnd.valueOf() + offset); // TODO: pass a Moment instead of a Date to snap(). (Breaking change)

	                  itemData.end = snap ? snap(end, scale, step) : end;
	                }
	              } else {
	                if (itemData.start != undefined) {
	                  initialStart = util$1.convert(props.data.start, 'Date');
	                  start = new Date(initialStart.valueOf() + offset); // TODO: pass a Moment instead of a Date to snap(). (Breaking change)

	                  itemData.start = snap ? snap(start, scale, step) : start;
	                }
	              }
	            } else if (props.dragRight) {
	              // drag right side of a range item
	              if (_this10.options.rtl) {
	                if (itemData.start != undefined) {
	                  initialStart = util$1.convert(props.data.start, 'Date');
	                  start = new Date(initialStart.valueOf() + offset); // TODO: pass a Moment instead of a Date to snap(). (Breaking change)

	                  itemData.start = snap ? snap(start, scale, step) : start;
	                }
	              } else {
	                if (itemData.end != undefined) {
	                  initialEnd = util$1.convert(props.data.end, 'Date');
	                  end = new Date(initialEnd.valueOf() + offset); // TODO: pass a Moment instead of a Date to snap(). (Breaking change)

	                  itemData.end = snap ? snap(end, scale, step) : end;
	                }
	              }
	            } else {
	              // drag both start and end
	              if (itemData.start != undefined) {
	                initialStart = util$1.convert(props.data.start, 'Date').valueOf();
	                start = new Date(initialStart + offset);

	                if (itemData.end != undefined) {
	                  initialEnd = util$1.convert(props.data.end, 'Date');
	                  var duration = initialEnd.valueOf() - initialStart.valueOf(); // TODO: pass a Moment instead of a Date to snap(). (Breaking change)

	                  itemData.start = snap ? snap(start, scale, step) : start;
	                  itemData.end = new Date(itemData.start.valueOf() + duration);
	                } else {
	                  // TODO: pass a Moment instead of a Date to snap(). (Breaking change)
	                  itemData.start = snap ? snap(start, scale, step) : start;
	                }
	              }
	            }
	          }

	          if (updateGroupAllowed && !props.dragLeft && !props.dragRight && newGroupBase != null) {
	            if (itemData.group != undefined) {
	              var newOffset = newGroupBase - props.groupOffset; //make sure we stay in bounds

	              newOffset = Math.max(0, newOffset);
	              newOffset = Math.min(me.groupIds.length - 1, newOffset);
	              itemData.group = me.groupIds[newOffset];
	            }
	          } // confirm moving the item


	          itemData = _this10._cloneItemData(itemData); // convert start and end to the correct type

	          me.options.onMoving(itemData, function (itemData) {
	            if (itemData) {
	              props.item.setData(_this10._cloneItemData(itemData, 'Date'));
	            }
	          });
	        });

	        this.body.emitter.emit('_change');
	      }
	    }
	    /**
	     * Move an item to another group
	     * @param {Item} item
	     * @param {string | number} groupId
	     * @private
	     */

	  }, {
	    key: "_moveToGroup",
	    value: function _moveToGroup(item, groupId) {
	      var group = this.groups[groupId];

	      if (group && group.groupId != item.data.group) {
	        var oldGroup = item.parent;
	        oldGroup.remove(item);
	        oldGroup.order();
	        item.data.group = group.groupId;
	        group.add(item);
	        group.order();
	      }
	    }
	    /**
	     * End of dragging selected items
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onDragEnd",
	    value: function _onDragEnd(event) {
	      var _this11 = this;

	      this.touchParams.itemIsDragging = false;

	      if (this.touchParams.itemProps) {
	        event.stopPropagation();
	        var me = this;
	        var itemProps = this.touchParams.itemProps;
	        this.touchParams.itemProps = null;

	        forEach$2(itemProps).call(itemProps, function (props) {
	          var id = props.item.id;
	          var exists = me.itemsData.get(id) != null;

	          if (!exists) {
	            // add a new item
	            me.options.onAdd(props.item.data, function (itemData) {
	              me._removeItem(props.item); // remove temporary item


	              if (itemData) {
	                me.itemsData.add(itemData);
	              } // force re-stacking of all items next redraw


	              me.body.emitter.emit('_change');
	            });
	          } else {
	            // update existing item
	            var itemData = _this11._cloneItemData(props.item.data); // convert start and end to the correct type


	            me.options.onMove(itemData, function (itemData) {
	              if (itemData) {
	                // apply changes
	                itemData[_this11.itemsData.idProp] = id; // ensure the item contains its id (can be undefined)

	                _this11.itemsData.update(itemData);
	              } else {
	                // restore original values
	                props.item.setData(props.data);
	                me.body.emitter.emit('_change');
	              }
	            });
	          }
	        });
	      }
	    }
	    /**
	     * On group click
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onGroupClick",
	    value: function _onGroupClick(event) {
	      var _this12 = this;

	      var group = this.groupFromTarget(event);

	      setTimeout$2(function () {
	        _this12.toggleGroupShowNested(group);
	      }, 1);
	    }
	    /**
	     * Toggle show nested
	     * @param {object} group
	     * @param {boolean} force
	     */

	  }, {
	    key: "toggleGroupShowNested",
	    value: function toggleGroupShowNested(group) {
	      var _context30;

	      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	      if (!group || !group.nestedGroups) return;
	      var groupsData = this.groupsData.getDataSet();

	      if (force != undefined) {
	        group.showNested = !!force;
	      } else {
	        group.showNested = !group.showNested;
	      }

	      var nestingGroup = groupsData.get(group.groupId);
	      nestingGroup.showNested = group.showNested;
	      var fullNestedGroups = group.nestedGroups;
	      var nextLevel = fullNestedGroups;

	      while (nextLevel.length > 0) {
	        var current = nextLevel;
	        nextLevel = [];

	        for (var i = 0; i < current.length; i++) {
	          var node = groupsData.get(current[i]);

	          if (node.nestedGroups) {
	            nextLevel = concat$2(nextLevel).call(nextLevel, node.nestedGroups);
	          }
	        }

	        if (nextLevel.length > 0) {
	          fullNestedGroups = concat$2(fullNestedGroups).call(fullNestedGroups, nextLevel);
	        }
	      }

	      var nestedGroups = map$2(_context30 = groupsData.get(fullNestedGroups)).call(_context30, function (nestedGroup) {
	        if (nestedGroup.visible == undefined) {
	          nestedGroup.visible = true;
	        }

	        nestedGroup.visible = !!nestingGroup.showNested;
	        return nestedGroup;
	      });

	      groupsData.update(concat$2(nestedGroups).call(nestedGroups, nestingGroup));

	      if (nestingGroup.showNested) {
	        util$1.removeClassName(group.dom.label, 'collapsed');
	        util$1.addClassName(group.dom.label, 'expanded');
	      } else {
	        util$1.removeClassName(group.dom.label, 'expanded');
	        util$1.addClassName(group.dom.label, 'collapsed');
	      }
	    }
	    /**
	     * Toggle group drag classname
	     * @param {object} group
	     */

	  }, {
	    key: "toggleGroupDragClassName",
	    value: function toggleGroupDragClassName(group) {
	      group.dom.label.classList.toggle('vis-group-is-dragging');
	      group.dom.foreground.classList.toggle('vis-group-is-dragging');
	    }
	    /**
	     * on drag start
	     * @param {Event} event
	     * @return {void}   
	     * @private
	     */

	  }, {
	    key: "_onGroupDragStart",
	    value: function _onGroupDragStart(event) {
	      if (this.groupTouchParams.isDragging) return;

	      if (this.options.groupEditable.order) {
	        this.groupTouchParams.group = this.groupFromTarget(event);

	        if (this.groupTouchParams.group) {
	          event.stopPropagation();
	          this.groupTouchParams.isDragging = true;
	          this.toggleGroupDragClassName(this.groupTouchParams.group);
	          this.groupTouchParams.originalOrder = this.groupsData.getIds({
	            order: this.options.groupOrder
	          });
	        }
	      }
	    }
	    /**
	     * on drag
	     * @param {Event} event
	     * @return {void}
	     * @private
	     */

	  }, {
	    key: "_onGroupDrag",
	    value: function _onGroupDrag(event) {
	      if (this.options.groupEditable.order && this.groupTouchParams.group) {
	        event.stopPropagation();
	        var groupsData = this.groupsData.getDataSet(); // drag from one group to another

	        var group = this.groupFromTarget(event); // try to avoid toggling when groups differ in height

	        if (group && group.height != this.groupTouchParams.group.height) {
	          var movingUp = group.top < this.groupTouchParams.group.top;
	          var clientY = event.center ? event.center.y : event.clientY;
	          var targetGroup = group.dom.foreground.getBoundingClientRect();
	          var draggedGroupHeight = this.groupTouchParams.group.height;

	          if (movingUp) {
	            // skip swapping the groups when the dragged group is not below clientY afterwards
	            if (targetGroup.top + draggedGroupHeight < clientY) {
	              return;
	            }
	          } else {
	            var targetGroupHeight = group.height; // skip swapping the groups when the dragged group is not below clientY afterwards

	            if (targetGroup.top + targetGroupHeight - draggedGroupHeight > clientY) {
	              return;
	            }
	          }
	        }

	        if (group && group != this.groupTouchParams.group) {
	          var _targetGroup = groupsData.get(group.groupId);

	          var draggedGroup = groupsData.get(this.groupTouchParams.group.groupId); // switch groups

	          if (draggedGroup && _targetGroup) {
	            this.options.groupOrderSwap(draggedGroup, _targetGroup, groupsData);
	            groupsData.update(draggedGroup);
	            groupsData.update(_targetGroup);
	          } // fetch current order of groups


	          var newOrder = groupsData.getIds({
	            order: this.options.groupOrder
	          }); // in case of changes since _onGroupDragStart

	          if (!util$1.equalArray(newOrder, this.groupTouchParams.originalOrder)) {
	            var origOrder = this.groupTouchParams.originalOrder;
	            var draggedId = this.groupTouchParams.group.groupId;
	            var numGroups = Math.min(origOrder.length, newOrder.length);
	            var curPos = 0;
	            var newOffset = 0;
	            var orgOffset = 0;

	            while (curPos < numGroups) {
	              // as long as the groups are where they should be step down along the groups order
	              while (curPos + newOffset < numGroups && curPos + orgOffset < numGroups && newOrder[curPos + newOffset] == origOrder[curPos + orgOffset]) {
	                curPos++;
	              } // all ok


	              if (curPos + newOffset >= numGroups) {
	                break;
	              } // not all ok
	              // if dragged group was move upwards everything below should have an offset


	              if (newOrder[curPos + newOffset] == draggedId) {
	                newOffset = 1;
	              } // if dragged group was move downwards everything above should have an offset
	              else if (origOrder[curPos + orgOffset] == draggedId) {
	                  orgOffset = 1;
	                } // found a group (apart from dragged group) that has the wrong position -> switch with the 
	                // group at the position where other one should be, fix index arrays and continue
	                else {
	                    var slippedPosition = indexOf$3(newOrder).call(newOrder, origOrder[curPos + orgOffset]);

	                    var switchGroup = groupsData.get(newOrder[curPos + newOffset]);
	                    var shouldBeGroup = groupsData.get(origOrder[curPos + orgOffset]);
	                    this.options.groupOrderSwap(switchGroup, shouldBeGroup, groupsData);
	                    groupsData.update(switchGroup);
	                    groupsData.update(shouldBeGroup);
	                    var switchGroupId = newOrder[curPos + newOffset];
	                    newOrder[curPos + newOffset] = origOrder[curPos + orgOffset];
	                    newOrder[slippedPosition] = switchGroupId;
	                    curPos++;
	                  }
	            }
	          }
	        }
	      }
	    }
	    /**
	     * on drag end
	     * @param {Event} event
	     * @return {void}
	     * @private
	     */

	  }, {
	    key: "_onGroupDragEnd",
	    value: function _onGroupDragEnd(event) {
	      this.groupTouchParams.isDragging = false;

	      if (this.options.groupEditable.order && this.groupTouchParams.group) {
	        event.stopPropagation(); // update existing group

	        var me = this;
	        var id = me.groupTouchParams.group.groupId;
	        var dataset = me.groupsData.getDataSet();
	        var groupData = util$1.extend({}, dataset.get(id)); // clone the data

	        me.options.onMoveGroup(groupData, function (groupData) {
	          if (groupData) {
	            // apply changes
	            groupData[dataset._idProp] = id; // ensure the group contains its id (can be undefined)

	            dataset.update(groupData);
	          } else {
	            // fetch current order of groups
	            var newOrder = dataset.getIds({
	              order: me.options.groupOrder
	            }); // restore original order

	            if (!util$1.equalArray(newOrder, me.groupTouchParams.originalOrder)) {
	              var origOrder = me.groupTouchParams.originalOrder;
	              var numGroups = Math.min(origOrder.length, newOrder.length);
	              var curPos = 0;

	              while (curPos < numGroups) {
	                // as long as the groups are where they should be step down along the groups order
	                while (curPos < numGroups && newOrder[curPos] == origOrder[curPos]) {
	                  curPos++;
	                } // all ok


	                if (curPos >= numGroups) {
	                  break;
	                } // found a group that has the wrong position -> switch with the
	                // group at the position where other one should be, fix index arrays and continue


	                var slippedPosition = indexOf$3(newOrder).call(newOrder, origOrder[curPos]);

	                var switchGroup = dataset.get(newOrder[curPos]);
	                var shouldBeGroup = dataset.get(origOrder[curPos]);
	                me.options.groupOrderSwap(switchGroup, shouldBeGroup, dataset);
	                dataset.update(switchGroup);
	                dataset.update(shouldBeGroup);
	                var switchGroupId = newOrder[curPos];
	                newOrder[curPos] = origOrder[curPos];
	                newOrder[slippedPosition] = switchGroupId;
	                curPos++;
	              }
	            }
	          }
	        });
	        me.body.emitter.emit('groupDragged', {
	          groupId: id
	        });
	        this.toggleGroupDragClassName(this.groupTouchParams.group);
	        this.groupTouchParams.group = null;
	      }
	    }
	    /**
	     * Handle selecting/deselecting an item when tapping it
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onSelectItem",
	    value: function _onSelectItem(event) {
	      if (!this.options.selectable) return;
	      var ctrlKey = event.srcEvent && (event.srcEvent.ctrlKey || event.srcEvent.metaKey);
	      var shiftKey = event.srcEvent && event.srcEvent.shiftKey;

	      if (ctrlKey || shiftKey) {
	        this._onMultiSelectItem(event);

	        return;
	      }

	      var oldSelection = this.getSelection();
	      var item = this.itemFromTarget(event);
	      var selection = item && item.selectable ? [item.id] : [];
	      this.setSelection(selection);
	      var newSelection = this.getSelection(); // emit a select event,
	      // except when old selection is empty and new selection is still empty

	      if (newSelection.length > 0 || oldSelection.length > 0) {
	        this.body.emitter.emit('select', {
	          items: newSelection,
	          event: event
	        });
	      }
	    }
	    /**
	     * Handle hovering an item
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onMouseOver",
	    value: function _onMouseOver(event) {
	      var item = this.itemFromTarget(event);
	      if (!item) return; // Item we just left

	      var related = this.itemFromRelatedTarget(event);

	      if (item === related) {
	        // We haven't changed item, just element in the item
	        return;
	      }

	      var title = item.getTitle();

	      if (this.options.showTooltips && title) {
	        if (this.popup == null) {
	          this.popup = new Popup(this.body.dom.root, this.options.tooltip.overflowMethod || 'flip');
	        }

	        this.popup.setText(title);
	        var container = this.body.dom.centerContainer;
	        var containerRect = container.getBoundingClientRect();
	        this.popup.setPosition(event.clientX - containerRect.left + container.offsetLeft, event.clientY - containerRect.top + container.offsetTop);
	        this.setPopupTimer(this.popup);
	      } else {
	        // Hovering over item without a title, hide popup
	        // Needed instead of _just_ in _onMouseOut due to #2572
	        this.clearPopupTimer();

	        if (this.popup != null) {
	          this.popup.hide();
	        }
	      }

	      this.body.emitter.emit('itemover', {
	        item: item.id,
	        event: event
	      });
	    }
	    /**
	     * on mouse start
	     * @param {Event} event
	     * @return {void}   
	     * @private
	     */

	  }, {
	    key: "_onMouseOut",
	    value: function _onMouseOut(event) {
	      var item = this.itemFromTarget(event);
	      if (!item) return; // Item we are going to

	      var related = this.itemFromRelatedTarget(event);

	      if (item === related) {
	        // We aren't changing item, just element in the item
	        return;
	      }

	      this.clearPopupTimer();

	      if (this.popup != null) {
	        this.popup.hide();
	      }

	      this.body.emitter.emit('itemout', {
	        item: item.id,
	        event: event
	      });
	    }
	    /**
	     * on mouse move
	     * @param {Event} event
	     * @return {void}   
	     * @private
	     */

	  }, {
	    key: "_onMouseMove",
	    value: function _onMouseMove(event) {
	      var item = this.itemFromTarget(event);
	      if (!item) return;

	      if (this.popupTimer != null) {
	        // restart timer
	        this.setPopupTimer(this.popup);
	      }

	      if (this.options.showTooltips && this.options.tooltip.followMouse && this.popup && !this.popup.hidden) {
	        var container = this.body.dom.centerContainer;
	        var containerRect = container.getBoundingClientRect();
	        this.popup.setPosition(event.clientX - containerRect.left + container.offsetLeft, event.clientY - containerRect.top + container.offsetTop);
	        this.popup.show(); // Redraw
	      }
	    }
	    /**
	     * Handle mousewheel
	     * @param {Event}  event   The event
	     * @private
	     */

	  }, {
	    key: "_onMouseWheel",
	    value: function _onMouseWheel(event) {
	      if (this.touchParams.itemIsDragging) {
	        this._onDragEnd(event);
	      }
	    }
	    /**
	     * Handle updates of an item on double tap
	     * @param {timeline.Item}  item   The item
	     * @private
	     */

	  }, {
	    key: "_onUpdateItem",
	    value: function _onUpdateItem(item) {
	      if (!this.options.selectable) return;
	      if (!this.options.editable.updateTime && !this.options.editable.updateGroup) return;
	      var me = this;

	      if (item) {
	        // execute async handler to update the item (or cancel it)
	        var itemData = me.itemsData.get(item.id); // get a clone of the data from the dataset

	        this.options.onUpdate(itemData, function (itemData) {
	          if (itemData) {
	            me.itemsData.update(itemData);
	          }
	        });
	      }
	    }
	    /**
	     * Handle drop event of data on item
	     * Only called when `objectData.target === 'item'.
	     * @param {Event} event The event 
	     * @private
	     */

	  }, {
	    key: "_onDropObjectOnItem",
	    value: function _onDropObjectOnItem(event) {
	      var item = this.itemFromTarget(event);
	      var objectData = JSON.parse(event.dataTransfer.getData("text"));
	      this.options.onDropObjectOnItem(objectData, item);
	    }
	    /**
	     * Handle creation of an item on double tap or drop of a drag event
	     * @param {Event} event   The event
	     * @private
	     */

	  }, {
	    key: "_onAddItem",
	    value: function _onAddItem(event) {
	      if (!this.options.selectable) return;
	      if (!this.options.editable.add) return;
	      var me = this;
	      var snap = this.options.snap || null; // add item

	      var frameRect = this.dom.frame.getBoundingClientRect();
	      var x = this.options.rtl ? frameRect.right - event.center.x : event.center.x - frameRect.left;
	      var start = this.body.util.toTime(x);
	      var scale = this.body.util.getScale();
	      var step = this.body.util.getStep();
	      var end;
	      var newItemData;

	      if (event.type == 'drop') {
	        newItemData = JSON.parse(event.dataTransfer.getData("text"));
	        newItemData.content = newItemData.content ? newItemData.content : 'new item';
	        newItemData.start = newItemData.start ? newItemData.start : snap ? snap(start, scale, step) : start;
	        newItemData.type = newItemData.type || 'box';
	        newItemData[this.itemsData.idProp] = newItemData.id || v4();

	        if (newItemData.type == 'range' && !newItemData.end) {
	          end = this.body.util.toTime(x + this.props.width / 5);
	          newItemData.end = snap ? snap(end, scale, step) : end;
	        }
	      } else {
	        newItemData = {
	          start: snap ? snap(start, scale, step) : start,
	          content: 'new item'
	        };
	        newItemData[this.itemsData.idProp] = v4(); // when default type is a range, add a default end date to the new item

	        if (this.options.type === 'range') {
	          end = this.body.util.toTime(x + this.props.width / 5);
	          newItemData.end = snap ? snap(end, scale, step) : end;
	        }
	      }

	      var group = this.groupFromTarget(event);

	      if (group) {
	        newItemData.group = group.groupId;
	      } // execute async handler to customize (or cancel) adding an item


	      newItemData = this._cloneItemData(newItemData); // convert start and end to the correct type

	      this.options.onAdd(newItemData, function (item) {
	        if (item) {
	          me.itemsData.add(item);

	          if (event.type == 'drop') {
	            me.setSelection([item.id]);
	          } // TODO: need to trigger a redraw?

	        }
	      });
	    }
	    /**
	     * Handle selecting/deselecting multiple items when holding an item
	     * @param {Event} event
	     * @private
	     */

	  }, {
	    key: "_onMultiSelectItem",
	    value: function _onMultiSelectItem(event) {
	      var _this13 = this;

	      if (!this.options.selectable) return;
	      var item = this.itemFromTarget(event);

	      if (item) {
	        // multi select items (if allowed)
	        var selection = this.options.multiselect ? this.getSelection() // take current selection
	        : []; // deselect current selection

	        var shiftKey = event.srcEvent && event.srcEvent.shiftKey || false;

	        if ((shiftKey || this.options.sequentialSelection) && this.options.multiselect) {
	          // select all items between the old selection and the tapped item
	          var itemGroup = this.itemsData.get(item.id).group; // when filtering get the group of the last selected item

	          var lastSelectedGroup = undefined;

	          if (this.options.multiselectPerGroup) {
	            if (selection.length > 0) {
	              lastSelectedGroup = this.itemsData.get(selection[0]).group;
	            }
	          } // determine the selection range


	          if (!this.options.multiselectPerGroup || lastSelectedGroup == undefined || lastSelectedGroup == itemGroup) {
	            selection.push(item.id);
	          }

	          var range = ItemSet._getItemRange(this.itemsData.get(selection));

	          if (!this.options.multiselectPerGroup || lastSelectedGroup == itemGroup) {
	            // select all items within the selection range
	            selection = [];

	            for (var id in this.items) {
	              if (this.items.hasOwnProperty(id)) {
	                var _item = this.items[id];
	                var start = _item.data.start;
	                var end = _item.data.end !== undefined ? _item.data.end : start;

	                if (start >= range.min && end <= range.max && (!this.options.multiselectPerGroup || lastSelectedGroup == this.itemsData.get(_item.id).group) && !(_item instanceof BackgroundItem)) {
	                  selection.push(_item.id); // do not use id but item.id, id itself is stringified
	                }
	              }
	            }
	          }
	        } else {
	          // add/remove this item from the current selection
	          var index = indexOf$3(selection).call(selection, item.id);

	          if (index == -1) {
	            // item is not yet selected -> select it
	            selection.push(item.id);
	          } else {
	            // item is already selected -> deselect it
	            splice$2(selection).call(selection, index, 1);
	          }
	        }

	        var filteredSelection = filter$2(selection).call(selection, function (item) {
	          return _this13.getItemById(item).selectable;
	        });

	        this.setSelection(filteredSelection);
	        this.body.emitter.emit('select', {
	          items: this.getSelection(),
	          event: event
	        });
	      }
	    }
	    /**
	     * Calculate the time range of a list of items
	     * @param {Array.<Object>} itemsData
	     * @return {{min: Date, max: Date}} Returns the range of the provided items
	     * @private
	     */

	  }, {
	    key: "itemFromElement",

	    /**
	     * Find an item from an element:
	     * searches for the attribute 'vis-item' in the element's tree
	     * @param {HTMLElement} element
	     * @return {Item | null} item
	     */
	    value: function itemFromElement(element) {
	      var cur = element;

	      while (cur) {
	        if (cur.hasOwnProperty('vis-item')) {
	          return cur['vis-item'];
	        }

	        cur = cur.parentNode;
	      }

	      return null;
	    }
	    /**
	     * Find an item from an event target:
	     * searches for the attribute 'vis-item' in the event target's element tree
	     * @param {Event} event
	     * @return {Item | null} item
	     */

	  }, {
	    key: "itemFromTarget",
	    value: function itemFromTarget(event) {
	      return this.itemFromElement(event.target);
	    }
	    /**
	     * Find an item from an event's related target:
	     * searches for the attribute 'vis-item' in the related target's element tree
	     * @param {Event} event
	     * @return {Item | null} item
	     */

	  }, {
	    key: "itemFromRelatedTarget",
	    value: function itemFromRelatedTarget(event) {
	      return this.itemFromElement(event.relatedTarget);
	    }
	    /**
	     * Find the Group from an event target:
	     * searches for the attribute 'vis-group' in the event target's element tree
	     * @param {Event} event
	     * @return {Group | null} group
	     */

	  }, {
	    key: "groupFromTarget",
	    value: function groupFromTarget(event) {
	      var clientY = event.center ? event.center.y : event.clientY;
	      var groupIds = this.groupIds;

	      if (groupIds.length <= 0 && this.groupsData) {
	        groupIds = this.groupsData.getIds({
	          order: this.options.groupOrder
	        });
	      }

	      for (var i = 0; i < groupIds.length; i++) {
	        var groupId = groupIds[i];
	        var group = this.groups[groupId];
	        var foreground = group.dom.foreground;
	        var foregroundRect = foreground.getBoundingClientRect();

	        if (clientY >= foregroundRect.top && clientY < foregroundRect.top + foreground.offsetHeight) {
	          return group;
	        }

	        if (this.options.orientation.item === 'top') {
	          if (i === this.groupIds.length - 1 && clientY > foregroundRect.top) {
	            return group;
	          }
	        } else {
	          if (i === 0 && clientY < foregroundRect.top + foreground.offset) {
	            return group;
	          }
	        }
	      }

	      return null;
	    }
	    /**
	     * Find the ItemSet from an event target:
	     * searches for the attribute 'vis-itemset' in the event target's element tree
	     * @param {Event} event
	     * @return {ItemSet | null} item
	     */

	  }, {
	    key: "_cloneItemData",

	    /**
	     * Clone the data of an item, and "normalize" it: convert the start and end date
	     * to the type (Date, Moment, ...) configured in the DataSet. If not configured,
	     * start and end are converted to Date.
	     * @param {Object} itemData, typically `item.data`
	     * @param {string} [type]  Optional Date type. If not provided, the type from the DataSet is taken
	     * @return {Object} The cloned object
	     * @private
	     */
	    value: function _cloneItemData(itemData, type) {
	      var clone = util$1.extend({}, itemData);

	      if (!type) {
	        // convert start and end date to the type (Date, Moment, ...) configured in the DataSet
	        type = this.itemsData.type;
	      }

	      if (clone.start != undefined) {
	        clone.start = util$1.convert(clone.start, type && type.start || 'Date');
	      }

	      if (clone.end != undefined) {
	        clone.end = util$1.convert(clone.end, type && type.end || 'Date');
	      }

	      return clone;
	    }
	    /**
	     * cluster items
	     * @return {void}   
	     * @private
	     */

	  }, {
	    key: "_clusterItems",
	    value: function _clusterItems() {
	      if (!this.options.cluster) {
	        return;
	      }

	      var _this$body$range$conv = this.body.range.conversion(this.body.domProps.center.width),
	          scale = _this$body$range$conv.scale;

	      var clusters = this.clusterGenerator.getClusters(this.clusters, scale, this.options.cluster);

	      if (this.clusters != clusters) {
	        this._detachAllClusters();

	        if (clusters) {
	          var _iterator4 = _createForOfIteratorHelper$4(clusters),
	              _step4;

	          try {
	            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
	              var cluster = _step4.value;
	              cluster.attach();
	            }
	          } catch (err) {
	            _iterator4.e(err);
	          } finally {
	            _iterator4.f();
	          }

	          this.clusters = clusters;
	        }

	        this._updateClusters(clusters);
	      }
	    }
	    /**
	     * detach all cluster items
	     * @private
	     */

	  }, {
	    key: "_detachAllClusters",
	    value: function _detachAllClusters() {
	      if (this.options.cluster) {
	        if (this.clusters && this.clusters.length) {
	          var _iterator5 = _createForOfIteratorHelper$4(this.clusters),
	              _step5;

	          try {
	            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
	              var cluster = _step5.value;
	              cluster.detach();
	            }
	          } catch (err) {
	            _iterator5.e(err);
	          } finally {
	            _iterator5.f();
	          }
	        }
	      }
	    }
	    /**
	     * update clusters
	     * @param {array} clusters
	     * @private
	     */

	  }, {
	    key: "_updateClusters",
	    value: function _updateClusters(clusters) {
	      if (this.clusters && this.clusters.length) {
	        var _context31;

	        var newClustersIds = new set$3(map$2(clusters).call(clusters, function (cluster) {
	          return cluster.id;
	        }));

	        var clustersToUnselect = filter$2(_context31 = this.clusters).call(_context31, function (cluster) {
	          return !newClustersIds.has(cluster.id);
	        });

	        var selectionChanged = false;

	        var _iterator6 = _createForOfIteratorHelper$4(clustersToUnselect),
	            _step6;

	        try {
	          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
	            var _context32;

	            var cluster = _step6.value;

	            var selectedIdx = indexOf$3(_context32 = this.selection).call(_context32, cluster.id);

	            if (selectedIdx !== -1) {
	              var _context33;

	              cluster.unselect();

	              splice$2(_context33 = this.selection).call(_context33, selectedIdx, 1);

	              selectionChanged = true;
	            }
	          }
	        } catch (err) {
	          _iterator6.e(err);
	        } finally {
	          _iterator6.f();
	        }

	        if (selectionChanged) {
	          var newSelection = this.getSelection();
	          this.body.emitter.emit('select', {
	            items: newSelection,
	            event: event
	          });
	        }
	      }

	      this.clusters = clusters || [];
	    }
	  }], [{
	    key: "_getItemRange",
	    value: function _getItemRange(itemsData) {
	      var max = null;
	      var min = null;

	      forEach$2(itemsData).call(itemsData, function (data) {
	        if (min == null || data.start < min) {
	          min = data.start;
	        }

	        if (data.end != undefined) {
	          if (max == null || data.end > max) {
	            max = data.end;
	          }
	        } else {
	          if (max == null || data.start > max) {
	            max = data.start;
	          }
	        }
	      });

	      return {
	        min: min,
	        max: max
	      };
	    }
	  }, {
	    key: "itemSetFromTarget",
	    value: function itemSetFromTarget(event) {
	      var target = event.target;

	      while (target) {
	        if (target.hasOwnProperty('vis-itemset')) {
	          return target['vis-itemset'];
	        }

	        target = target.parentNode;
	      }

	      return null;
	    }
	  }]);

	  return ItemSet;
	}(Component); // available item types will be registered here


	ItemSet.types = {
	  background: BackgroundItem,
	  box: BoxItem,
	  range: RangeItem,
	  point: PointItem
	};
	/**
	 * Handle added items
	 * @param {number[]} ids
	 * @protected
	 */

	ItemSet.prototype._onAdd = ItemSet.prototype._onUpdate;

	var errorFound = false;
	var allOptions;
	var printStyle = 'background: #FFeeee; color: #dd0000';
	/**
	 *  Used to validate options.
	 */

	var Validator = /*#__PURE__*/function () {
	  /**
	   * @ignore
	   */
	  function Validator() {
	    classCallCheck(this, Validator);
	  }
	  /**
	   * Main function to be called
	   * @param {Object} options
	   * @param {Object} referenceOptions
	   * @param {Object} subObject
	   * @returns {boolean}
	   * @static
	   */


	  createClass(Validator, null, [{
	    key: "validate",
	    value: function validate(options, referenceOptions, subObject) {
	      errorFound = false;
	      allOptions = referenceOptions;
	      var usedOptions = referenceOptions;

	      if (subObject !== undefined) {
	        usedOptions = referenceOptions[subObject];
	      }

	      Validator.parse(options, usedOptions, []);
	      return errorFound;
	    }
	    /**
	     * Will traverse an object recursively and check every value
	     * @param {Object} options
	     * @param {Object} referenceOptions
	     * @param {array} path    | where to look for the actual option
	     * @static
	     */

	  }, {
	    key: "parse",
	    value: function parse(options, referenceOptions, path) {
	      for (var option in options) {
	        if (options.hasOwnProperty(option)) {
	          Validator.check(option, options, referenceOptions, path);
	        }
	      }
	    }
	    /**
	     * Check every value. If the value is an object, call the parse function on that object.
	     * @param {string} option
	     * @param {Object} options
	     * @param {Object} referenceOptions
	     * @param {array} path    | where to look for the actual option
	     * @static
	     */

	  }, {
	    key: "check",
	    value: function check(option, options, referenceOptions, path) {
	      if (referenceOptions[option] === undefined && referenceOptions.__any__ === undefined) {
	        Validator.getSuggestion(option, referenceOptions, path);
	        return;
	      }

	      var referenceOption = option;
	      var is_object = true;

	      if (referenceOptions[option] === undefined && referenceOptions.__any__ !== undefined) {
	        // NOTE: This only triggers if the __any__ is in the top level of the options object.
	        //       THAT'S A REALLY BAD PLACE TO ALLOW IT!!!!
	        // TODO: Examine if needed, remove if possible
	        // __any__ is a wildcard. Any value is accepted and will be further analysed by reference.
	        referenceOption = '__any__'; // if the any-subgroup is not a predefined object in the configurator,
	        // we do not look deeper into the object.

	        is_object = Validator.getType(options[option]) === 'object';
	      }

	      var refOptionObj = referenceOptions[referenceOption];

	      if (is_object && refOptionObj.__type__ !== undefined) {
	        refOptionObj = refOptionObj.__type__;
	      }

	      Validator.checkFields(option, options, referenceOptions, referenceOption, refOptionObj, path);
	    }
	    /**
	     *
	     * @param {string}  option           | the option property
	     * @param {Object}  options          | The supplied options object
	     * @param {Object}  referenceOptions | The reference options containing all options and their allowed formats
	     * @param {string}  referenceOption  | Usually this is the same as option, except when handling an __any__ tag.
	     * @param {string}  refOptionObj     | This is the type object from the reference options
	     * @param {Array}   path             | where in the object is the option
	     * @static
	     */

	  }, {
	    key: "checkFields",
	    value: function checkFields(option, options, referenceOptions, referenceOption, refOptionObj, path) {
	      var log = function log(message) {
	        console.log('%c' + message + Validator.printLocation(path, option), printStyle);
	      };

	      var optionType = Validator.getType(options[option]);
	      var refOptionType = refOptionObj[optionType];

	      if (refOptionType !== undefined) {
	        // if the type is correct, we check if it is supposed to be one of a few select values
	        if (Validator.getType(refOptionType) === 'array' && indexOf$3(refOptionType).call(refOptionType, options[option]) === -1) {
	          log('Invalid option detected in "' + option + '".' + ' Allowed values are:' + Validator.print(refOptionType) + ' not "' + options[option] + '". ');
	          errorFound = true;
	        } else if (optionType === 'object' && referenceOption !== "__any__") {
	          path = util$1.copyAndExtendArray(path, option);
	          Validator.parse(options[option], referenceOptions[referenceOption], path);
	        }
	      } else if (refOptionObj['any'] === undefined) {
	        // type of the field is incorrect and the field cannot be any
	        log('Invalid type received for "' + option + '". Expected: ' + Validator.print(keys$3(refOptionObj)) + '. Received [' + optionType + '] "' + options[option] + '"');
	        errorFound = true;
	      }
	    }
	    /**
	     *
	     * @param {Object|boolean|number|string|Array.<number>|Date|Node|Moment|undefined|null} object
	     * @returns {string}
	     * @static
	     */

	  }, {
	    key: "getType",
	    value: function getType(object) {
	      var type = _typeof_1(object);

	      if (type === 'object') {
	        if (object === null) {
	          return 'null';
	        }

	        if (object instanceof Boolean) {
	          return 'boolean';
	        }

	        if (object instanceof Number) {
	          return 'number';
	        }

	        if (object instanceof String) {
	          return 'string';
	        }

	        if (isArray$3(object)) {
	          return 'array';
	        }

	        if (object instanceof Date) {
	          return 'date';
	        }

	        if (object.nodeType !== undefined) {
	          return 'dom';
	        }

	        if (object._isAMomentObject === true) {
	          return 'moment';
	        }

	        return 'object';
	      } else if (type === 'number') {
	        return 'number';
	      } else if (type === 'boolean') {
	        return 'boolean';
	      } else if (type === 'string') {
	        return 'string';
	      } else if (type === undefined) {
	        return 'undefined';
	      }

	      return type;
	    }
	    /**
	     * @param {string} option
	     * @param {Object} options
	     * @param {Array.<string>} path
	     * @static
	     */

	  }, {
	    key: "getSuggestion",
	    value: function getSuggestion(option, options, path) {
	      var localSearch = Validator.findInOptions(option, options, path, false);
	      var globalSearch = Validator.findInOptions(option, allOptions, [], true);
	      var localSearchThreshold = 8;
	      var globalSearchThreshold = 4;
	      var msg;

	      if (localSearch.indexMatch !== undefined) {
	        msg = ' in ' + Validator.printLocation(localSearch.path, option, '') + 'Perhaps it was incomplete? Did you mean: "' + localSearch.indexMatch + '"?\n\n';
	      } else if (globalSearch.distance <= globalSearchThreshold && localSearch.distance > globalSearch.distance) {
	        msg = ' in ' + Validator.printLocation(localSearch.path, option, '') + 'Perhaps it was misplaced? Matching option found at: ' + Validator.printLocation(globalSearch.path, globalSearch.closestMatch, '');
	      } else if (localSearch.distance <= localSearchThreshold) {
	        msg = '. Did you mean "' + localSearch.closestMatch + '"?' + Validator.printLocation(localSearch.path, option);
	      } else {
	        msg = '. Did you mean one of these: ' + Validator.print(keys$3(options)) + Validator.printLocation(path, option);
	      }

	      console.log('%cUnknown option detected: "' + option + '"' + msg, printStyle);
	      errorFound = true;
	    }
	    /**
	     * traverse the options in search for a match.
	     * @param {string} option
	     * @param {Object} options
	     * @param {Array} path    | where to look for the actual option
	     * @param {boolean} [recursive=false]
	     * @returns {{closestMatch: string, path: Array, distance: number}}
	     * @static
	     */

	  }, {
	    key: "findInOptions",
	    value: function findInOptions(option, options, path) {
	      var recursive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	      var min = 1e9;
	      var closestMatch = '';
	      var closestMatchPath = [];
	      var lowerCaseOption = option.toLowerCase();
	      var indexMatch = undefined;

	      for (var op in options) {
	        // eslint-disable-line guard-for-in
	        var distance = void 0;

	        if (options[op].__type__ !== undefined && recursive === true) {
	          var result = Validator.findInOptions(option, options[op], util$1.copyAndExtendArray(path, op));

	          if (min > result.distance) {
	            closestMatch = result.closestMatch;
	            closestMatchPath = result.path;
	            min = result.distance;
	            indexMatch = result.indexMatch;
	          }
	        } else {
	          var _context;

	          if (indexOf$3(_context = op.toLowerCase()).call(_context, lowerCaseOption) !== -1) {
	            indexMatch = op;
	          }

	          distance = Validator.levenshteinDistance(option, op);

	          if (min > distance) {
	            closestMatch = op;
	            closestMatchPath = util$1.copyArray(path);
	            min = distance;
	          }
	        }
	      }

	      return {
	        closestMatch: closestMatch,
	        path: closestMatchPath,
	        distance: min,
	        indexMatch: indexMatch
	      };
	    }
	    /**
	     * @param {Array.<string>} path
	     * @param {Object} option
	     * @param {string} prefix
	     * @returns {String}
	     * @static
	     */

	  }, {
	    key: "printLocation",
	    value: function printLocation(path, option) {
	      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Problem value found at: \n';
	      var str = '\n\n' + prefix + 'options = {\n';

	      for (var i = 0; i < path.length; i++) {
	        for (var j = 0; j < i + 1; j++) {
	          str += '  ';
	        }

	        str += path[i] + ': {\n';
	      }

	      for (var _j = 0; _j < path.length + 1; _j++) {
	        str += '  ';
	      }

	      str += option + '\n';

	      for (var _i = 0; _i < path.length + 1; _i++) {
	        for (var _j2 = 0; _j2 < path.length - _i; _j2++) {
	          str += '  ';
	        }

	        str += '}\n';
	      }

	      return str + '\n\n';
	    }
	    /**
	     * @param {Object} options
	     * @returns {String}
	     * @static
	     */

	  }, {
	    key: "print",
	    value: function print(options) {
	      return stringify$2(options).replace(/(\")|(\[)|(\])|(,"__type__")/g, "").replace(/(\,)/g, ', ');
	    }
	    /**
	     *  Compute the edit distance between the two given strings
	     * http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
	     *
	     * Copyright (c) 2011 Andrei Mackenzie
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	     *
	     * @param {string} a
	     * @param {string} b
	     * @returns {Array.<Array.<number>>}}
	     * @static
	     */

	  }, {
	    key: "levenshteinDistance",
	    value: function levenshteinDistance(a, b) {
	      if (a.length === 0) return b.length;
	      if (b.length === 0) return a.length;
	      var matrix = []; // increment along the first column of each row

	      var i;

	      for (i = 0; i <= b.length; i++) {
	        matrix[i] = [i];
	      } // increment each column in the first row


	      var j;

	      for (j = 0; j <= a.length; j++) {
	        matrix[0][j] = j;
	      } // Fill in the rest of the matrix


	      for (i = 1; i <= b.length; i++) {
	        for (j = 1; j <= a.length; j++) {
	          if (b.charAt(i - 1) == a.charAt(j - 1)) {
	            matrix[i][j] = matrix[i - 1][j - 1];
	          } else {
	            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
	            Math.min(matrix[i][j - 1] + 1, // insertion
	            matrix[i - 1][j] + 1)); // deletion
	          }
	        }
	      }

	      return matrix[b.length][a.length];
	    }
	  }]);

	  return Validator;
	}();

	/**
	 * This object contains all possible options. It will check if the types are correct, if required if the option is one
	 * of the allowed values.
	 *
	 * __any__ means that the name of the property does not matter.
	 * __type__ is a required field for all objects and contains the allowed types of all objects
	 */
	var string = 'string';
	var bool = 'boolean';
	var number = 'number';
	var array = 'array';
	var date = 'date';
	var object = 'object'; // should only be in a __type__ property

	var dom = 'dom';
	var moment$1 = 'moment';
	var any = 'any';
	var allOptions$1 = {
	  configure: {
	    enabled: {
	      'boolean': bool
	    },
	    filter: {
	      'boolean': bool,
	      'function': 'function'
	    },
	    container: {
	      dom: dom
	    },
	    __type__: {
	      object: object,
	      'boolean': bool,
	      'function': 'function'
	    }
	  },
	  //globals :
	  align: {
	    string: string
	  },
	  alignCurrentTime: {
	    string: string,
	    'undefined': 'undefined'
	  },
	  rtl: {
	    'boolean': bool,
	    'undefined': 'undefined'
	  },
	  rollingMode: {
	    follow: {
	      'boolean': bool
	    },
	    offset: {
	      number: number,
	      'undefined': 'undefined'
	    },
	    __type__: {
	      object: object
	    }
	  },
	  onTimeout: {
	    timeoutMs: {
	      number: number
	    },
	    callback: {
	      'function': 'function'
	    },
	    __type__: {
	      object: object
	    }
	  },
	  verticalScroll: {
	    'boolean': bool,
	    'undefined': 'undefined'
	  },
	  horizontalScroll: {
	    'boolean': bool,
	    'undefined': 'undefined'
	  },
	  autoResize: {
	    'boolean': bool
	  },
	  throttleRedraw: {
	    number: number
	  },
	  // TODO: DEPRICATED see https://github.com/almende/vis/issues/2511
	  clickToUse: {
	    'boolean': bool
	  },
	  dataAttributes: {
	    string: string,
	    array: array
	  },
	  editable: {
	    add: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    remove: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    updateGroup: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    updateTime: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    overrideItems: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    __type__: {
	      'boolean': bool,
	      object: object
	    }
	  },
	  end: {
	    number: number,
	    date: date,
	    string: string,
	    moment: moment$1
	  },
	  format: {
	    minorLabels: {
	      millisecond: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      second: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      minute: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      hour: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      weekday: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      day: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      week: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      month: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      year: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      __type__: {
	        object: object,
	        'function': 'function'
	      }
	    },
	    majorLabels: {
	      millisecond: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      second: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      minute: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      hour: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      weekday: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      day: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      week: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      month: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      year: {
	        string: string,
	        'undefined': 'undefined'
	      },
	      __type__: {
	        object: object,
	        'function': 'function'
	      }
	    },
	    __type__: {
	      object: object
	    }
	  },
	  moment: {
	    'function': 'function'
	  },
	  groupHeightMode: {
	    string: string
	  },
	  groupOrder: {
	    string: string,
	    'function': 'function'
	  },
	  groupEditable: {
	    add: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    remove: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    order: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    __type__: {
	      'boolean': bool,
	      object: object
	    }
	  },
	  groupOrderSwap: {
	    'function': 'function'
	  },
	  height: {
	    string: string,
	    number: number
	  },
	  hiddenDates: {
	    start: {
	      date: date,
	      number: number,
	      string: string,
	      moment: moment$1
	    },
	    end: {
	      date: date,
	      number: number,
	      string: string,
	      moment: moment$1
	    },
	    repeat: {
	      string: string
	    },
	    __type__: {
	      object: object,
	      array: array
	    }
	  },
	  itemsAlwaysDraggable: {
	    item: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    range: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    __type__: {
	      'boolean': bool,
	      object: object
	    }
	  },
	  limitSize: {
	    'boolean': bool
	  },
	  locale: {
	    string: string
	  },
	  locales: {
	    __any__: {
	      any: any
	    },
	    __type__: {
	      object: object
	    }
	  },
	  longSelectPressTime: {
	    number: number
	  },
	  margin: {
	    axis: {
	      number: number
	    },
	    item: {
	      horizontal: {
	        number: number,
	        'undefined': 'undefined'
	      },
	      vertical: {
	        number: number,
	        'undefined': 'undefined'
	      },
	      __type__: {
	        object: object,
	        number: number
	      }
	    },
	    __type__: {
	      object: object,
	      number: number
	    }
	  },
	  max: {
	    date: date,
	    number: number,
	    string: string,
	    moment: moment$1
	  },
	  maxHeight: {
	    number: number,
	    string: string
	  },
	  maxMinorChars: {
	    number: number
	  },
	  min: {
	    date: date,
	    number: number,
	    string: string,
	    moment: moment$1
	  },
	  minHeight: {
	    number: number,
	    string: string
	  },
	  moveable: {
	    'boolean': bool
	  },
	  multiselect: {
	    'boolean': bool
	  },
	  multiselectPerGroup: {
	    'boolean': bool
	  },
	  onAdd: {
	    'function': 'function'
	  },
	  onDropObjectOnItem: {
	    'function': 'function'
	  },
	  onUpdate: {
	    'function': 'function'
	  },
	  onMove: {
	    'function': 'function'
	  },
	  onMoving: {
	    'function': 'function'
	  },
	  onRemove: {
	    'function': 'function'
	  },
	  onAddGroup: {
	    'function': 'function'
	  },
	  onMoveGroup: {
	    'function': 'function'
	  },
	  onRemoveGroup: {
	    'function': 'function'
	  },
	  onInitialDrawComplete: {
	    'function': 'function'
	  },
	  order: {
	    'function': 'function'
	  },
	  orientation: {
	    axis: {
	      string: string,
	      'undefined': 'undefined'
	    },
	    item: {
	      string: string,
	      'undefined': 'undefined'
	    },
	    __type__: {
	      string: string,
	      object: object
	    }
	  },
	  selectable: {
	    'boolean': bool
	  },
	  sequentialSelection: {
	    'boolean': bool
	  },
	  showCurrentTime: {
	    'boolean': bool
	  },
	  showMajorLabels: {
	    'boolean': bool
	  },
	  showMinorLabels: {
	    'boolean': bool
	  },
	  showWeekScale: {
	    'boolean': bool
	  },
	  stack: {
	    'boolean': bool
	  },
	  stackSubgroups: {
	    'boolean': bool
	  },
	  cluster: {
	    maxItems: {
	      'number': number,
	      'undefined': 'undefined'
	    },
	    titleTemplate: {
	      'string': string,
	      'undefined': 'undefined'
	    },
	    clusterCriteria: {
	      'function': 'function',
	      'undefined': 'undefined'
	    },
	    showStipes: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    fitOnDoubleClick: {
	      'boolean': bool,
	      'undefined': 'undefined'
	    },
	    __type__: {
	      'boolean': bool,
	      object: object
	    }
	  },
	  snap: {
	    'function': 'function',
	    'null': 'null'
	  },
	  start: {
	    date: date,
	    number: number,
	    string: string,
	    moment: moment$1
	  },
	  template: {
	    'function': 'function'
	  },
	  loadingScreenTemplate: {
	    'function': 'function'
	  },
	  groupTemplate: {
	    'function': 'function'
	  },
	  visibleFrameTemplate: {
	    string: string,
	    'function': 'function'
	  },
	  showTooltips: {
	    'boolean': bool
	  },
	  tooltip: {
	    followMouse: {
	      'boolean': bool
	    },
	    overflowMethod: {
	      'string': ['cap', 'flip', 'none']
	    },
	    delay: {
	      number: number
	    },
	    template: {
	      'function': 'function'
	    },
	    __type__: {
	      object: object
	    }
	  },
	  tooltipOnItemUpdateTime: {
	    template: {
	      'function': 'function'
	    },
	    __type__: {
	      'boolean': bool,
	      object: object
	    }
	  },
	  timeAxis: {
	    scale: {
	      string: string,
	      'undefined': 'undefined'
	    },
	    step: {
	      number: number,
	      'undefined': 'undefined'
	    },
	    __type__: {
	      object: object
	    }
	  },
	  type: {
	    string: string
	  },
	  width: {
	    string: string,
	    number: number
	  },
	  preferZoom: {
	    'boolean': bool
	  },
	  zoomable: {
	    'boolean': bool
	  },
	  zoomKey: {
	    string: ['ctrlKey', 'altKey', 'shiftKey', 'metaKey', '']
	  },
	  zoomFriction: {
	    number: number
	  },
	  zoomMax: {
	    number: number
	  },
	  zoomMin: {
	    number: number
	  },
	  __type__: {
	    object: object
	  }
	};
	var configureOptions = {
	  global: {
	    align: ['center', 'left', 'right'],
	    alignCurrentTime: ['none', 'year', 'month', 'quarter', 'week', 'isoWeek', 'day', 'date', 'hour', 'minute', 'second'],
	    direction: false,
	    autoResize: true,
	    clickToUse: false,
	    // dataAttributes: ['all'], // FIXME: can be 'all' or string[]
	    editable: {
	      add: false,
	      remove: false,
	      updateGroup: false,
	      updateTime: false
	    },
	    end: '',
	    format: {
	      minorLabels: {
	        millisecond: 'SSS',
	        second: 's',
	        minute: 'HH:mm',
	        hour: 'HH:mm',
	        weekday: 'ddd D',
	        day: 'D',
	        week: 'w',
	        month: 'MMM',
	        year: 'YYYY'
	      },
	      majorLabels: {
	        millisecond: 'HH:mm:ss',
	        second: 'D MMMM HH:mm',
	        minute: 'ddd D MMMM',
	        hour: 'ddd D MMMM',
	        weekday: 'MMMM YYYY',
	        day: 'MMMM YYYY',
	        week: 'MMMM YYYY',
	        month: 'YYYY',
	        year: ''
	      }
	    },
	    groupHeightMode: ['auto', 'fixed', 'fitItems'],
	    //groupOrder: {string, 'function': 'function'},
	    groupsDraggable: false,
	    height: '',
	    //hiddenDates: {object, array},
	    locale: '',
	    longSelectPressTime: 251,
	    margin: {
	      axis: [20, 0, 100, 1],
	      item: {
	        horizontal: [10, 0, 100, 1],
	        vertical: [10, 0, 100, 1]
	      }
	    },
	    max: '',
	    maxHeight: '',
	    maxMinorChars: [7, 0, 20, 1],
	    min: '',
	    minHeight: '',
	    moveable: false,
	    multiselect: false,
	    multiselectPerGroup: false,
	    //onAdd: {'function': 'function'},
	    //onUpdate: {'function': 'function'},
	    //onMove: {'function': 'function'},
	    //onMoving: {'function': 'function'},
	    //onRename: {'function': 'function'},
	    //order: {'function': 'function'},
	    orientation: {
	      axis: ['both', 'bottom', 'top'],
	      item: ['bottom', 'top']
	    },
	    preferZoom: false,
	    selectable: true,
	    showCurrentTime: false,
	    showMajorLabels: true,
	    showMinorLabels: true,
	    stack: true,
	    stackSubgroups: true,
	    cluster: false,
	    //snap: {'function': 'function', nada},
	    start: '',
	    //template: {'function': 'function'},
	    //timeAxis: {
	    //  scale: ['millisecond', 'second', 'minute', 'hour', 'weekday', 'day', 'week', 'month', 'year'],
	    //  step: [1, 1, 10, 1]
	    //},
	    showTooltips: true,
	    tooltip: {
	      followMouse: false,
	      overflowMethod: 'flip',
	      delay: [500, 0, 99999, 100]
	    },
	    tooltipOnItemUpdateTime: false,
	    type: ['box', 'point', 'range', 'background'],
	    width: '100%',
	    zoomable: true,
	    zoomKey: ['ctrlKey', 'altKey', 'shiftKey', 'metaKey', ''],
	    zoomMax: [315360000000000, 10, 315360000000000, 1],
	    zoomMin: [10, 10, 315360000000000, 1]
	  }
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill


	var arrayFill = function fill(value
	/* , start = 0, end = @length */
	) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

	  while (endPos > index) O[index++] = value;

	  return O;
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill

	_export({
	  target: 'Array',
	  proto: true
	}, {
	  fill: arrayFill
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	var fill = entryVirtual('Array').fill;

	var ArrayPrototype$e = Array.prototype;

	var fill_1 = function (it) {
	  var own = it.fill;
	  return it === ArrayPrototype$e || it instanceof Array && own === ArrayPrototype$e.fill ? fill : own;
	};

	var fill$1 = fill_1;

	var fill$2 = fill$1;

	var htmlColors = {
	  black: '#000000',
	  navy: '#000080',
	  darkblue: '#00008B',
	  mediumblue: '#0000CD',
	  blue: '#0000FF',
	  darkgreen: '#006400',
	  green: '#008000',
	  teal: '#008080',
	  darkcyan: '#008B8B',
	  deepskyblue: '#00BFFF',
	  darkturquoise: '#00CED1',
	  mediumspringgreen: '#00FA9A',
	  lime: '#00FF00',
	  springgreen: '#00FF7F',
	  aqua: '#00FFFF',
	  cyan: '#00FFFF',
	  midnightblue: '#191970',
	  dodgerblue: '#1E90FF',
	  lightseagreen: '#20B2AA',
	  forestgreen: '#228B22',
	  seagreen: '#2E8B57',
	  darkslategray: '#2F4F4F',
	  limegreen: '#32CD32',
	  mediumseagreen: '#3CB371',
	  turquoise: '#40E0D0',
	  royalblue: '#4169E1',
	  steelblue: '#4682B4',
	  darkslateblue: '#483D8B',
	  mediumturquoise: '#48D1CC',
	  indigo: '#4B0082',
	  darkolivegreen: '#556B2F',
	  cadetblue: '#5F9EA0',
	  cornflowerblue: '#6495ED',
	  mediumaquamarine: '#66CDAA',
	  dimgray: '#696969',
	  slateblue: '#6A5ACD',
	  olivedrab: '#6B8E23',
	  slategray: '#708090',
	  lightslategray: '#778899',
	  mediumslateblue: '#7B68EE',
	  lawngreen: '#7CFC00',
	  chartreuse: '#7FFF00',
	  aquamarine: '#7FFFD4',
	  maroon: '#800000',
	  purple: '#800080',
	  olive: '#808000',
	  gray: '#808080',
	  skyblue: '#87CEEB',
	  lightskyblue: '#87CEFA',
	  blueviolet: '#8A2BE2',
	  darkred: '#8B0000',
	  darkmagenta: '#8B008B',
	  saddlebrown: '#8B4513',
	  darkseagreen: '#8FBC8F',
	  lightgreen: '#90EE90',
	  mediumpurple: '#9370D8',
	  darkviolet: '#9400D3',
	  palegreen: '#98FB98',
	  darkorchid: '#9932CC',
	  yellowgreen: '#9ACD32',
	  sienna: '#A0522D',
	  brown: '#A52A2A',
	  darkgray: '#A9A9A9',
	  lightblue: '#ADD8E6',
	  greenyellow: '#ADFF2F',
	  paleturquoise: '#AFEEEE',
	  lightsteelblue: '#B0C4DE',
	  powderblue: '#B0E0E6',
	  firebrick: '#B22222',
	  darkgoldenrod: '#B8860B',
	  mediumorchid: '#BA55D3',
	  rosybrown: '#BC8F8F',
	  darkkhaki: '#BDB76B',
	  silver: '#C0C0C0',
	  mediumvioletred: '#C71585',
	  indianred: '#CD5C5C',
	  peru: '#CD853F',
	  chocolate: '#D2691E',
	  tan: '#D2B48C',
	  lightgrey: '#D3D3D3',
	  palevioletred: '#D87093',
	  thistle: '#D8BFD8',
	  orchid: '#DA70D6',
	  goldenrod: '#DAA520',
	  crimson: '#DC143C',
	  gainsboro: '#DCDCDC',
	  plum: '#DDA0DD',
	  burlywood: '#DEB887',
	  lightcyan: '#E0FFFF',
	  lavender: '#E6E6FA',
	  darksalmon: '#E9967A',
	  violet: '#EE82EE',
	  palegoldenrod: '#EEE8AA',
	  lightcoral: '#F08080',
	  khaki: '#F0E68C',
	  aliceblue: '#F0F8FF',
	  honeydew: '#F0FFF0',
	  azure: '#F0FFFF',
	  sandybrown: '#F4A460',
	  wheat: '#F5DEB3',
	  beige: '#F5F5DC',
	  whitesmoke: '#F5F5F5',
	  mintcream: '#F5FFFA',
	  ghostwhite: '#F8F8FF',
	  salmon: '#FA8072',
	  antiquewhite: '#FAEBD7',
	  linen: '#FAF0E6',
	  lightgoldenrodyellow: '#FAFAD2',
	  oldlace: '#FDF5E6',
	  red: '#FF0000',
	  fuchsia: '#FF00FF',
	  magenta: '#FF00FF',
	  deeppink: '#FF1493',
	  orangered: '#FF4500',
	  tomato: '#FF6347',
	  hotpink: '#FF69B4',
	  coral: '#FF7F50',
	  darkorange: '#FF8C00',
	  lightsalmon: '#FFA07A',
	  orange: '#FFA500',
	  lightpink: '#FFB6C1',
	  pink: '#FFC0CB',
	  gold: '#FFD700',
	  peachpuff: '#FFDAB9',
	  navajowhite: '#FFDEAD',
	  moccasin: '#FFE4B5',
	  bisque: '#FFE4C4',
	  mistyrose: '#FFE4E1',
	  blanchedalmond: '#FFEBCD',
	  papayawhip: '#FFEFD5',
	  lavenderblush: '#FFF0F5',
	  seashell: '#FFF5EE',
	  cornsilk: '#FFF8DC',
	  lemonchiffon: '#FFFACD',
	  floralwhite: '#FFFAF0',
	  snow: '#FFFAFA',
	  yellow: '#FFFF00',
	  lightyellow: '#FFFFE0',
	  ivory: '#FFFFF0',
	  white: '#FFFFFF'
	};
	/**
	 * @param {number} [pixelRatio=1]
	 */

	var ColorPicker = /*#__PURE__*/function () {
	  /**
	   * @param {number} [pixelRatio=1]
	   */
	  function ColorPicker() {
	    var pixelRatio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	    classCallCheck(this, ColorPicker);

	    this.pixelRatio = pixelRatio;
	    this.generated = false;
	    this.centerCoordinates = {
	      x: 289 / 2,
	      y: 289 / 2
	    };
	    this.r = 289 * 0.49;
	    this.color = {
	      r: 255,
	      g: 255,
	      b: 255,
	      a: 1.0
	    };
	    this.hueCircle = undefined;
	    this.initialColor = {
	      r: 255,
	      g: 255,
	      b: 255,
	      a: 1.0
	    };
	    this.previousColor = undefined;
	    this.applied = false; // bound by

	    this.updateCallback = function () {};

	    this.closeCallback = function () {}; // create all DOM elements


	    this._create();
	  }
	  /**
	   * this inserts the colorPicker into a div from the DOM
	   * @param {Element} container
	   */


	  createClass(ColorPicker, [{
	    key: "insertTo",
	    value: function insertTo(container) {
	      if (this.hammer !== undefined) {
	        this.hammer.destroy();
	        this.hammer = undefined;
	      }

	      this.container = container;
	      this.container.appendChild(this.frame);

	      this._bindHammer();

	      this._setSize();
	    }
	    /**
	     * the callback is executed on apply and save. Bind it to the application
	     * @param {function} callback
	     */

	  }, {
	    key: "setUpdateCallback",
	    value: function setUpdateCallback(callback) {
	      if (typeof callback === 'function') {
	        this.updateCallback = callback;
	      } else {
	        throw new Error("Function attempted to set as colorPicker update callback is not a function.");
	      }
	    }
	    /**
	     * the callback is executed on apply and save. Bind it to the application
	     * @param {function} callback
	     */

	  }, {
	    key: "setCloseCallback",
	    value: function setCloseCallback(callback) {
	      if (typeof callback === 'function') {
	        this.closeCallback = callback;
	      } else {
	        throw new Error("Function attempted to set as colorPicker closing callback is not a function.");
	      }
	    }
	    /**
	     *
	     * @param {string} color
	     * @returns {String}
	     * @private
	     */

	  }, {
	    key: "_isColorString",
	    value: function _isColorString(color) {
	      if (typeof color === 'string') {
	        return htmlColors[color];
	      }
	    }
	    /**
	     * Set the color of the colorPicker
	     * Supported formats:
	     * 'red'                   --> HTML color string
	     * '#ffffff'               --> hex string
	     * 'rgb(255,255,255)'      --> rgb string
	     * 'rgba(255,255,255,1.0)' --> rgba string
	     * {r:255,g:255,b:255}     --> rgb object
	     * {r:255,g:255,b:255,a:1.0} --> rgba object
	     * @param {string|Object} color
	     * @param {boolean} [setInitial=true]
	     */

	  }, {
	    key: "setColor",
	    value: function setColor(color) {
	      var setInitial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      if (color === 'none') {
	        return;
	      }

	      var rgba; // if a html color shorthand is used, convert to hex

	      var htmlColor = this._isColorString(color);

	      if (htmlColor !== undefined) {
	        color = htmlColor;
	      } // check format


	      if (util$1.isString(color) === true) {
	        if (util$1.isValidRGB(color) === true) {
	          var rgbaArray = color.substr(4).substr(0, color.length - 5).split(',');
	          rgba = {
	            r: rgbaArray[0],
	            g: rgbaArray[1],
	            b: rgbaArray[2],
	            a: 1.0
	          };
	        } else if (util$1.isValidRGBA(color) === true) {
	          var _rgbaArray = color.substr(5).substr(0, color.length - 6).split(',');

	          rgba = {
	            r: _rgbaArray[0],
	            g: _rgbaArray[1],
	            b: _rgbaArray[2],
	            a: _rgbaArray[3]
	          };
	        } else if (util$1.isValidHex(color) === true) {
	          var rgbObj = util$1.hexToRGB(color);
	          rgba = {
	            r: rgbObj.r,
	            g: rgbObj.g,
	            b: rgbObj.b,
	            a: 1.0
	          };
	        }
	      } else {
	        if (color instanceof Object) {
	          if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
	            var alpha = color.a !== undefined ? color.a : '1.0';
	            rgba = {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: alpha
	            };
	          }
	        }
	      } // set color


	      if (rgba === undefined) {
	        throw new Error("Unknown color passed to the colorPicker. Supported are strings: rgb, hex, rgba. Object: rgb ({r:r,g:g,b:b,[a:a]}). Supplied: " + stringify$2(color));
	      } else {
	        this._setColor(rgba, setInitial);
	      }
	    }
	    /**
	     * this shows the color picker.
	     * The hue circle is constructed once and stored.
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      if (this.closeCallback !== undefined) {
	        this.closeCallback();
	        this.closeCallback = undefined;
	      }

	      this.applied = false;
	      this.frame.style.display = 'block';

	      this._generateHueCircle();
	    } // ------------------------------------------ PRIVATE ----------------------------- //

	    /**
	     * Hide the picker. Is called by the cancel button.
	     * Optional boolean to store the previous color for easy access later on.
	     * @param {boolean} [storePrevious=true]
	     * @private
	     */

	  }, {
	    key: "_hide",
	    value: function _hide() {
	      var _this = this;

	      var storePrevious = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	      // store the previous color for next time;
	      if (storePrevious === true) {
	        this.previousColor = util$1.extend({}, this.color);
	      }

	      if (this.applied === true) {
	        this.updateCallback(this.initialColor);
	      }

	      this.frame.style.display = 'none'; // call the closing callback, restoring the onclick method.
	      // this is in a setTimeout because it will trigger the show again before the click is done.

	      setTimeout$2(function () {
	        if (_this.closeCallback !== undefined) {
	          _this.closeCallback();

	          _this.closeCallback = undefined;
	        }
	      }, 0);
	    }
	    /**
	     * bound to the save button. Saves and hides.
	     * @private
	     */

	  }, {
	    key: "_save",
	    value: function _save() {
	      this.updateCallback(this.color);
	      this.applied = false;

	      this._hide();
	    }
	    /**
	     * Bound to apply button. Saves but does not close. Is undone by the cancel button.
	     * @private
	     */

	  }, {
	    key: "_apply",
	    value: function _apply() {
	      this.applied = true;
	      this.updateCallback(this.color);

	      this._updatePicker(this.color);
	    }
	    /**
	     * load the color from the previous session.
	     * @private
	     */

	  }, {
	    key: "_loadLast",
	    value: function _loadLast() {
	      if (this.previousColor !== undefined) {
	        this.setColor(this.previousColor, false);
	      } else {
	        alert("There is no last color to load...");
	      }
	    }
	    /**
	     * set the color, place the picker
	     * @param {Object} rgba
	     * @param {boolean} [setInitial=true]
	     * @private
	     */

	  }, {
	    key: "_setColor",
	    value: function _setColor(rgba) {
	      var setInitial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      // store the initial color
	      if (setInitial === true) {
	        this.initialColor = util$1.extend({}, rgba);
	      }

	      this.color = rgba;
	      var hsv = util$1.RGBToHSV(rgba.r, rgba.g, rgba.b);
	      var angleConvert = 2 * Math.PI;
	      var radius = this.r * hsv.s;
	      var x = this.centerCoordinates.x + radius * Math.sin(angleConvert * hsv.h);
	      var y = this.centerCoordinates.y + radius * Math.cos(angleConvert * hsv.h);
	      this.colorPickerSelector.style.left = x - 0.5 * this.colorPickerSelector.clientWidth + 'px';
	      this.colorPickerSelector.style.top = y - 0.5 * this.colorPickerSelector.clientHeight + 'px';

	      this._updatePicker(rgba);
	    }
	    /**
	     * bound to opacity control
	     * @param {number} value
	     * @private
	     */

	  }, {
	    key: "_setOpacity",
	    value: function _setOpacity(value) {
	      this.color.a = value / 100;

	      this._updatePicker(this.color);
	    }
	    /**
	     * bound to brightness control
	     * @param {number} value
	     * @private
	     */

	  }, {
	    key: "_setBrightness",
	    value: function _setBrightness(value) {
	      var hsv = util$1.RGBToHSV(this.color.r, this.color.g, this.color.b);
	      hsv.v = value / 100;
	      var rgba = util$1.HSVToRGB(hsv.h, hsv.s, hsv.v);
	      rgba['a'] = this.color.a;
	      this.color = rgba;

	      this._updatePicker();
	    }
	    /**
	     * update the color picker. A black circle overlays the hue circle to mimic the brightness decreasing.
	     * @param {Object} rgba
	     * @private
	     */

	  }, {
	    key: "_updatePicker",
	    value: function _updatePicker() {
	      var rgba = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.color;
	      var hsv = util$1.RGBToHSV(rgba.r, rgba.g, rgba.b);
	      var ctx = this.colorPickerCanvas.getContext('2d');

	      if (this.pixelRation === undefined) {
	        this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
	      }

	      ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0); // clear the canvas

	      var w = this.colorPickerCanvas.clientWidth;
	      var h = this.colorPickerCanvas.clientHeight;
	      ctx.clearRect(0, 0, w, h);
	      ctx.putImageData(this.hueCircle, 0, 0);
	      ctx.fillStyle = 'rgba(0,0,0,' + (1 - hsv.v) + ')';
	      ctx.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r);

	      fill$2(ctx).call(ctx);

	      this.brightnessRange.value = 100 * hsv.v;
	      this.opacityRange.value = 100 * rgba.a;
	      this.initialColorDiv.style.backgroundColor = 'rgba(' + this.initialColor.r + ',' + this.initialColor.g + ',' + this.initialColor.b + ',' + this.initialColor.a + ')';
	      this.newColorDiv.style.backgroundColor = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';
	    }
	    /**
	     * used by create to set the size of the canvas.
	     * @private
	     */

	  }, {
	    key: "_setSize",
	    value: function _setSize() {
	      this.colorPickerCanvas.style.width = '100%';
	      this.colorPickerCanvas.style.height = '100%';
	      this.colorPickerCanvas.width = 289 * this.pixelRatio;
	      this.colorPickerCanvas.height = 289 * this.pixelRatio;
	    }
	    /**
	     * create all dom elements
	     * TODO: cleanup, lots of similar dom elements
	     * @private
	     */

	  }, {
	    key: "_create",
	    value: function _create() {
	      var _context, _context2, _context3, _context4;

	      this.frame = document.createElement('div');
	      this.frame.className = 'vis-color-picker';
	      this.colorPickerDiv = document.createElement('div');
	      this.colorPickerSelector = document.createElement('div');
	      this.colorPickerSelector.className = 'vis-selector';
	      this.colorPickerDiv.appendChild(this.colorPickerSelector);
	      this.colorPickerCanvas = document.createElement('canvas');
	      this.colorPickerDiv.appendChild(this.colorPickerCanvas);

	      if (!this.colorPickerCanvas.getContext) {
	        var noCanvas = document.createElement('DIV');
	        noCanvas.style.color = 'red';
	        noCanvas.style.fontWeight = 'bold';
	        noCanvas.style.padding = '10px';
	        noCanvas.innerHTML = 'Error: your browser does not support HTML canvas';
	        this.colorPickerCanvas.appendChild(noCanvas);
	      } else {
	        var ctx = this.colorPickerCanvas.getContext("2d");
	        this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
	        this.colorPickerCanvas.getContext("2d").setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
	      }

	      this.colorPickerDiv.className = 'vis-color';
	      this.opacityDiv = document.createElement('div');
	      this.opacityDiv.className = 'vis-opacity';
	      this.brightnessDiv = document.createElement('div');
	      this.brightnessDiv.className = 'vis-brightness';
	      this.arrowDiv = document.createElement('div');
	      this.arrowDiv.className = 'vis-arrow';
	      this.opacityRange = document.createElement('input');

	      try {
	        this.opacityRange.type = 'range'; // Not supported on IE9

	        this.opacityRange.min = '0';
	        this.opacityRange.max = '100';
	      } // TODO: Add some error handling and remove this lint exception
	      catch (err) {} // eslint-disable-line no-empty


	      this.opacityRange.value = '100';
	      this.opacityRange.className = 'vis-range';
	      this.brightnessRange = document.createElement('input');

	      try {
	        this.brightnessRange.type = 'range'; // Not supported on IE9

	        this.brightnessRange.min = '0';
	        this.brightnessRange.max = '100';
	      } // TODO: Add some error handling and remove this lint exception
	      catch (err) {} // eslint-disable-line no-empty


	      this.brightnessRange.value = '100';
	      this.brightnessRange.className = 'vis-range';
	      this.opacityDiv.appendChild(this.opacityRange);
	      this.brightnessDiv.appendChild(this.brightnessRange);
	      var me = this;

	      this.opacityRange.onchange = function () {
	        me._setOpacity(this.value);
	      };

	      this.opacityRange.oninput = function () {
	        me._setOpacity(this.value);
	      };

	      this.brightnessRange.onchange = function () {
	        me._setBrightness(this.value);
	      };

	      this.brightnessRange.oninput = function () {
	        me._setBrightness(this.value);
	      };

	      this.brightnessLabel = document.createElement("div");
	      this.brightnessLabel.className = "vis-label vis-brightness";
	      this.brightnessLabel.innerHTML = 'brightness:';
	      this.opacityLabel = document.createElement("div");
	      this.opacityLabel.className = "vis-label vis-opacity";
	      this.opacityLabel.innerHTML = 'opacity:';
	      this.newColorDiv = document.createElement("div");
	      this.newColorDiv.className = "vis-new-color";
	      this.newColorDiv.innerHTML = 'new';
	      this.initialColorDiv = document.createElement("div");
	      this.initialColorDiv.className = "vis-initial-color";
	      this.initialColorDiv.innerHTML = 'initial';
	      this.cancelButton = document.createElement("div");
	      this.cancelButton.className = "vis-button vis-cancel";
	      this.cancelButton.innerHTML = 'cancel';
	      this.cancelButton.onclick = bind$2(_context = this._hide).call(_context, this, false);
	      this.applyButton = document.createElement("div");
	      this.applyButton.className = "vis-button vis-apply";
	      this.applyButton.innerHTML = 'apply';
	      this.applyButton.onclick = bind$2(_context2 = this._apply).call(_context2, this);
	      this.saveButton = document.createElement("div");
	      this.saveButton.className = "vis-button vis-save";
	      this.saveButton.innerHTML = 'save';
	      this.saveButton.onclick = bind$2(_context3 = this._save).call(_context3, this);
	      this.loadButton = document.createElement("div");
	      this.loadButton.className = "vis-button vis-load";
	      this.loadButton.innerHTML = 'load last';
	      this.loadButton.onclick = bind$2(_context4 = this._loadLast).call(_context4, this);
	      this.frame.appendChild(this.colorPickerDiv);
	      this.frame.appendChild(this.arrowDiv);
	      this.frame.appendChild(this.brightnessLabel);
	      this.frame.appendChild(this.brightnessDiv);
	      this.frame.appendChild(this.opacityLabel);
	      this.frame.appendChild(this.opacityDiv);
	      this.frame.appendChild(this.newColorDiv);
	      this.frame.appendChild(this.initialColorDiv);
	      this.frame.appendChild(this.cancelButton);
	      this.frame.appendChild(this.applyButton);
	      this.frame.appendChild(this.saveButton);
	      this.frame.appendChild(this.loadButton);
	    }
	    /**
	     * bind hammer to the color picker
	     * @private
	     */

	  }, {
	    key: "_bindHammer",
	    value: function _bindHammer() {
	      var _this2 = this;

	      this.drag = {};
	      this.pinch = {};
	      this.hammer = new Hammer$1(this.colorPickerCanvas);
	      this.hammer.get('pinch').set({
	        enable: true
	      });
	      onTouch(this.hammer, function (event) {
	        _this2._moveSelector(event);
	      });
	      this.hammer.on('tap', function (event) {
	        _this2._moveSelector(event);
	      });
	      this.hammer.on('panstart', function (event) {
	        _this2._moveSelector(event);
	      });
	      this.hammer.on('panmove', function (event) {
	        _this2._moveSelector(event);
	      });
	      this.hammer.on('panend', function (event) {
	        _this2._moveSelector(event);
	      });
	    }
	    /**
	     * generate the hue circle. This is relatively heavy (200ms) and is done only once on the first time it is shown.
	     * @private
	     */

	  }, {
	    key: "_generateHueCircle",
	    value: function _generateHueCircle() {
	      if (this.generated === false) {
	        var ctx = this.colorPickerCanvas.getContext('2d');

	        if (this.pixelRation === undefined) {
	          this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
	        }

	        ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0); // clear the canvas

	        var w = this.colorPickerCanvas.clientWidth;
	        var h = this.colorPickerCanvas.clientHeight;
	        ctx.clearRect(0, 0, w, h); // draw hue circle

	        var x, y, hue, sat;
	        this.centerCoordinates = {
	          x: w * 0.5,
	          y: h * 0.5
	        };
	        this.r = 0.49 * w;
	        var angleConvert = 2 * Math.PI / 360;
	        var hfac = 1 / 360;
	        var sfac = 1 / this.r;
	        var rgb;

	        for (hue = 0; hue < 360; hue++) {
	          for (sat = 0; sat < this.r; sat++) {
	            x = this.centerCoordinates.x + sat * Math.sin(angleConvert * hue);
	            y = this.centerCoordinates.y + sat * Math.cos(angleConvert * hue);
	            rgb = util$1.HSVToRGB(hue * hfac, sat * sfac, 1);
	            ctx.fillStyle = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
	            ctx.fillRect(x - 0.5, y - 0.5, 2, 2);
	          }
	        }

	        ctx.strokeStyle = 'rgba(0,0,0,1)';
	        ctx.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r);
	        ctx.stroke();
	        this.hueCircle = ctx.getImageData(0, 0, w, h);
	      }

	      this.generated = true;
	    }
	    /**
	     * move the selector. This is called by hammer functions.
	     *
	     * @param {Event}  event   The event
	     * @private
	     */

	  }, {
	    key: "_moveSelector",
	    value: function _moveSelector(event) {
	      var rect = this.colorPickerDiv.getBoundingClientRect();
	      var left = event.center.x - rect.left;
	      var top = event.center.y - rect.top;
	      var centerY = 0.5 * this.colorPickerDiv.clientHeight;
	      var centerX = 0.5 * this.colorPickerDiv.clientWidth;
	      var x = left - centerX;
	      var y = top - centerY;
	      var angle = Math.atan2(x, y);
	      var radius = 0.98 * Math.min(Math.sqrt(x * x + y * y), centerX);
	      var newTop = Math.cos(angle) * radius + centerY;
	      var newLeft = Math.sin(angle) * radius + centerX;
	      this.colorPickerSelector.style.top = newTop - 0.5 * this.colorPickerSelector.clientHeight + 'px';
	      this.colorPickerSelector.style.left = newLeft - 0.5 * this.colorPickerSelector.clientWidth + 'px'; // set color

	      var h = angle / (2 * Math.PI);
	      h = h < 0 ? h + 1 : h;
	      var s = radius / this.r;
	      var hsv = util$1.RGBToHSV(this.color.r, this.color.g, this.color.b);
	      hsv.h = h;
	      hsv.s = s;
	      var rgba = util$1.HSVToRGB(hsv.h, hsv.s, hsv.v);
	      rgba['a'] = this.color.a;
	      this.color = rgba; // update previews

	      this.initialColorDiv.style.backgroundColor = 'rgba(' + this.initialColor.r + ',' + this.initialColor.g + ',' + this.initialColor.b + ',' + this.initialColor.a + ')';
	      this.newColorDiv.style.backgroundColor = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';
	    }
	  }]);

	  return ColorPicker;
	}();

	/**
	 * The way this works is for all properties of this.possible options, you can supply the property name in any form to list the options.
	 * Boolean options are recognised as Boolean
	 * Number options should be written as array: [default value, min value, max value, stepsize]
	 * Colors should be written as array: ['color', '#ffffff']
	 * Strings with should be written as array: [option1, option2, option3, ..]
	 *
	 * The options are matched with their counterparts in each of the modules and the values used in the configuration are
	 */

	var Configurator = /*#__PURE__*/function () {
	  /**
	   * @param {Object} parentModule        | the location where parentModule.setOptions() can be called
	   * @param {Object} defaultContainer    | the default container of the module
	   * @param {Object} configureOptions    | the fully configured and predefined options set found in allOptions.js
	   * @param {number} pixelRatio          | canvas pixel ratio
	   */
	  function Configurator(parentModule, defaultContainer, configureOptions) {
	    var pixelRatio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

	    classCallCheck(this, Configurator);

	    this.parent = parentModule;
	    this.changedOptions = [];
	    this.container = defaultContainer;
	    this.allowCreation = false;
	    this.options = {};
	    this.initialized = false;
	    this.popupCounter = 0;
	    this.defaultOptions = {
	      enabled: false,
	      filter: true,
	      container: undefined,
	      showButton: true
	    };
	    util$1.extend(this.options, this.defaultOptions);
	    this.configureOptions = configureOptions;
	    this.moduleOptions = {};
	    this.domElements = [];
	    this.popupDiv = {};
	    this.popupLimit = 5;
	    this.popupHistory = {};
	    this.colorPicker = new ColorPicker(pixelRatio);
	    this.wrapper = undefined;
	  }
	  /**
	   * refresh all options.
	   * Because all modules parse their options by themselves, we just use their options. We copy them here.
	   *
	   * @param {Object} options
	   */


	  createClass(Configurator, [{
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options !== undefined) {
	        // reset the popup history because the indices may have been changed.
	        this.popupHistory = {};

	        this._removePopup();

	        var enabled = true;

	        if (typeof options === 'string') {
	          this.options.filter = options;
	        } else if (isArray$3(options)) {
	          this.options.filter = options.join();
	        } else if (_typeof_1(options) === 'object') {
	          if (options == null) {
	            throw new TypeError('options cannot be null');
	          }

	          if (options.container !== undefined) {
	            this.options.container = options.container;
	          }

	          if (filter$2(options) !== undefined) {
	            this.options.filter = filter$2(options);
	          }

	          if (options.showButton !== undefined) {
	            this.options.showButton = options.showButton;
	          }

	          if (options.enabled !== undefined) {
	            enabled = options.enabled;
	          }
	        } else if (typeof options === 'boolean') {
	          this.options.filter = true;
	          enabled = options;
	        } else if (typeof options === 'function') {
	          this.options.filter = options;
	          enabled = true;
	        }

	        if (filter$2(this.options) === false) {
	          enabled = false;
	        }

	        this.options.enabled = enabled;
	      }

	      this._clean();
	    }
	    /**
	     *
	     * @param {Object} moduleOptions
	     */

	  }, {
	    key: "setModuleOptions",
	    value: function setModuleOptions(moduleOptions) {
	      this.moduleOptions = moduleOptions;

	      if (this.options.enabled === true) {
	        this._clean();

	        if (this.options.container !== undefined) {
	          this.container = this.options.container;
	        }

	        this._create();
	      }
	    }
	    /**
	     * Create all DOM elements
	     * @private
	     */

	  }, {
	    key: "_create",
	    value: function _create() {
	      this._clean();

	      this.changedOptions = [];

	      var filter = filter$2(this.options);

	      var counter = 0;
	      var show = false;

	      for (var option in this.configureOptions) {
	        if (this.configureOptions.hasOwnProperty(option)) {
	          this.allowCreation = false;
	          show = false;

	          if (typeof filter === 'function') {
	            show = filter(option, []);
	            show = show || this._handleObject(this.configureOptions[option], [option], true);
	          } else if (filter === true || indexOf$3(filter).call(filter, option) !== -1) {
	            show = true;
	          }

	          if (show !== false) {
	            this.allowCreation = true; // linebreak between categories

	            if (counter > 0) {
	              this._makeItem([]);
	            } // a header for the category


	            this._makeHeader(option); // get the sub options


	            this._handleObject(this.configureOptions[option], [option]);
	          }

	          counter++;
	        }
	      }

	      this._makeButton();

	      this._push(); //~ this.colorPicker.insertTo(this.container);

	    }
	    /**
	     * draw all DOM elements on the screen
	     * @private
	     */

	  }, {
	    key: "_push",
	    value: function _push() {
	      this.wrapper = document.createElement('div');
	      this.wrapper.className = 'vis-configuration-wrapper';
	      this.container.appendChild(this.wrapper);

	      for (var i = 0; i < this.domElements.length; i++) {
	        this.wrapper.appendChild(this.domElements[i]);
	      }

	      this._showPopupIfNeeded();
	    }
	    /**
	     * delete all DOM elements
	     * @private
	     */

	  }, {
	    key: "_clean",
	    value: function _clean() {
	      for (var i = 0; i < this.domElements.length; i++) {
	        this.wrapper.removeChild(this.domElements[i]);
	      }

	      if (this.wrapper !== undefined) {
	        this.container.removeChild(this.wrapper);
	        this.wrapper = undefined;
	      }

	      this.domElements = [];

	      this._removePopup();
	    }
	    /**
	     * get the value from the actualOptions if it exists
	     * @param {array} path    | where to look for the actual option
	     * @returns {*}
	     * @private
	     */

	  }, {
	    key: "_getValue",
	    value: function _getValue(path) {
	      var base = this.moduleOptions;

	      for (var i = 0; i < path.length; i++) {
	        if (base[path[i]] !== undefined) {
	          base = base[path[i]];
	        } else {
	          base = undefined;
	          break;
	        }
	      }

	      return base;
	    }
	    /**
	     * all option elements are wrapped in an item
	     * @param {Array} path    | where to look for the actual option
	     * @param {Array.<Element>} domElements
	     * @returns {number}
	     * @private
	     */

	  }, {
	    key: "_makeItem",
	    value: function _makeItem(path) {
	      if (this.allowCreation === true) {
	        var item = document.createElement('div');
	        item.className = 'vis-configuration vis-config-item vis-config-s' + path.length;

	        for (var _len = arguments.length, domElements = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          domElements[_key - 1] = arguments[_key];
	        }

	        forEach$2(domElements).call(domElements, function (element) {
	          item.appendChild(element);
	        });

	        this.domElements.push(item);
	        return this.domElements.length;
	      }

	      return 0;
	    }
	    /**
	     * header for major subjects
	     * @param {string} name
	     * @private
	     */

	  }, {
	    key: "_makeHeader",
	    value: function _makeHeader(name) {
	      var div = document.createElement('div');
	      div.className = 'vis-configuration vis-config-header';
	      div.innerHTML = name;

	      this._makeItem([], div);
	    }
	    /**
	     * make a label, if it is an object label, it gets different styling.
	     * @param {string} name
	     * @param {array} path    | where to look for the actual option
	     * @param {string} objectLabel
	     * @returns {HTMLElement}
	     * @private
	     */

	  }, {
	    key: "_makeLabel",
	    value: function _makeLabel(name, path) {
	      var objectLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var div = document.createElement('div');
	      div.className = 'vis-configuration vis-config-label vis-config-s' + path.length;

	      if (objectLabel === true) {
	        div.innerHTML = '<i><b>' + name + ':</b></i>';
	      } else {
	        div.innerHTML = name + ':';
	      }

	      return div;
	    }
	    /**
	     * make a dropdown list for multiple possible string optoins
	     * @param {Array.<number>} arr
	     * @param {number} value
	     * @param {array} path    | where to look for the actual option
	     * @private
	     */

	  }, {
	    key: "_makeDropdown",
	    value: function _makeDropdown(arr, value, path) {
	      var select = document.createElement('select');
	      select.className = 'vis-configuration vis-config-select';
	      var selectedValue = 0;

	      if (value !== undefined) {
	        if (indexOf$3(arr).call(arr, value) !== -1) {
	          selectedValue = indexOf$3(arr).call(arr, value);
	        }
	      }

	      for (var i = 0; i < arr.length; i++) {
	        var option = document.createElement('option');
	        option.value = arr[i];

	        if (i === selectedValue) {
	          option.selected = 'selected';
	        }

	        option.innerHTML = arr[i];
	        select.appendChild(option);
	      }

	      var me = this;

	      select.onchange = function () {
	        me._update(this.value, path);
	      };

	      var label = this._makeLabel(path[path.length - 1], path);

	      this._makeItem(path, label, select);
	    }
	    /**
	     * make a range object for numeric options
	     * @param {Array.<number>} arr
	     * @param {number} value
	     * @param {array} path    | where to look for the actual option
	     * @private
	     */

	  }, {
	    key: "_makeRange",
	    value: function _makeRange(arr, value, path) {
	      var defaultValue = arr[0];
	      var min = arr[1];
	      var max = arr[2];
	      var step = arr[3];
	      var range = document.createElement('input');
	      range.className = 'vis-configuration vis-config-range';

	      try {
	        range.type = 'range'; // not supported on IE9

	        range.min = min;
	        range.max = max;
	      } // TODO: Add some error handling and remove this lint exception
	      catch (err) {} // eslint-disable-line no-empty


	      range.step = step; // set up the popup settings in case they are needed.

	      var popupString = '';
	      var popupValue = 0;

	      if (value !== undefined) {
	        var factor = 1.20;

	        if (value < 0 && value * factor < min) {
	          range.min = Math.ceil(value * factor);
	          popupValue = range.min;
	          popupString = 'range increased';
	        } else if (value / factor < min) {
	          range.min = Math.ceil(value / factor);
	          popupValue = range.min;
	          popupString = 'range increased';
	        }

	        if (value * factor > max && max !== 1) {
	          range.max = Math.ceil(value * factor);
	          popupValue = range.max;
	          popupString = 'range increased';
	        }

	        range.value = value;
	      } else {
	        range.value = defaultValue;
	      }

	      var input = document.createElement('input');
	      input.className = 'vis-configuration vis-config-rangeinput';
	      input.value = Number(range.value);
	      var me = this;

	      range.onchange = function () {
	        input.value = this.value;

	        me._update(Number(this.value), path);
	      };

	      range.oninput = function () {
	        input.value = this.value;
	      };

	      var label = this._makeLabel(path[path.length - 1], path);

	      var itemIndex = this._makeItem(path, label, range, input); // if a popup is needed AND it has not been shown for this value, show it.


	      if (popupString !== '' && this.popupHistory[itemIndex] !== popupValue) {
	        this.popupHistory[itemIndex] = popupValue;

	        this._setupPopup(popupString, itemIndex);
	      }
	    }
	    /**
	     * make a button object
	     * @private
	     */

	  }, {
	    key: "_makeButton",
	    value: function _makeButton() {
	      var _this = this;

	      if (this.options.showButton === true) {
	        var generateButton = document.createElement('div');
	        generateButton.className = 'vis-configuration vis-config-button';
	        generateButton.innerHTML = 'generate options';

	        generateButton.onclick = function () {
	          _this._printOptions();
	        };

	        generateButton.onmouseover = function () {
	          generateButton.className = 'vis-configuration vis-config-button hover';
	        };

	        generateButton.onmouseout = function () {
	          generateButton.className = 'vis-configuration vis-config-button';
	        };

	        this.optionsContainer = document.createElement('div');
	        this.optionsContainer.className = 'vis-configuration vis-config-option-container';
	        this.domElements.push(this.optionsContainer);
	        this.domElements.push(generateButton);
	      }
	    }
	    /**
	     * prepare the popup
	     * @param {string} string
	     * @param {number} index
	     * @private
	     */

	  }, {
	    key: "_setupPopup",
	    value: function _setupPopup(string, index) {
	      var _this2 = this;

	      if (this.initialized === true && this.allowCreation === true && this.popupCounter < this.popupLimit) {
	        var div = document.createElement("div");
	        div.id = "vis-configuration-popup";
	        div.className = "vis-configuration-popup";
	        div.innerHTML = string;

	        div.onclick = function () {
	          _this2._removePopup();
	        };

	        this.popupCounter += 1;
	        this.popupDiv = {
	          html: div,
	          index: index
	        };
	      }
	    }
	    /**
	     * remove the popup from the dom
	     * @private
	     */

	  }, {
	    key: "_removePopup",
	    value: function _removePopup() {
	      if (this.popupDiv.html !== undefined) {
	        this.popupDiv.html.parentNode.removeChild(this.popupDiv.html);
	        clearTimeout(this.popupDiv.hideTimeout);
	        clearTimeout(this.popupDiv.deleteTimeout);
	        this.popupDiv = {};
	      }
	    }
	    /**
	     * Show the popup if it is needed.
	     * @private
	     */

	  }, {
	    key: "_showPopupIfNeeded",
	    value: function _showPopupIfNeeded() {
	      var _this3 = this;

	      if (this.popupDiv.html !== undefined) {
	        var correspondingElement = this.domElements[this.popupDiv.index];
	        var rect = correspondingElement.getBoundingClientRect();
	        this.popupDiv.html.style.left = rect.left + "px";
	        this.popupDiv.html.style.top = rect.top - 30 + "px"; // 30 is the height;

	        document.body.appendChild(this.popupDiv.html);
	        this.popupDiv.hideTimeout = setTimeout$2(function () {
	          _this3.popupDiv.html.style.opacity = 0;
	        }, 1500);
	        this.popupDiv.deleteTimeout = setTimeout$2(function () {
	          _this3._removePopup();
	        }, 1800);
	      }
	    }
	    /**
	     * make a checkbox for boolean options.
	     * @param {number} defaultValue
	     * @param {number} value
	     * @param {array} path    | where to look for the actual option
	     * @private
	     */

	  }, {
	    key: "_makeCheckbox",
	    value: function _makeCheckbox(defaultValue, value, path) {
	      var checkbox = document.createElement('input');
	      checkbox.type = 'checkbox';
	      checkbox.className = 'vis-configuration vis-config-checkbox';
	      checkbox.checked = defaultValue;

	      if (value !== undefined) {
	        checkbox.checked = value;

	        if (value !== defaultValue) {
	          if (_typeof_1(defaultValue) === 'object') {
	            if (value !== defaultValue.enabled) {
	              this.changedOptions.push({
	                path: path,
	                value: value
	              });
	            }
	          } else {
	            this.changedOptions.push({
	              path: path,
	              value: value
	            });
	          }
	        }
	      }

	      var me = this;

	      checkbox.onchange = function () {
	        me._update(this.checked, path);
	      };

	      var label = this._makeLabel(path[path.length - 1], path);

	      this._makeItem(path, label, checkbox);
	    }
	    /**
	     * make a text input field for string options.
	     * @param {number} defaultValue
	     * @param {number} value
	     * @param {array} path    | where to look for the actual option
	     * @private
	     */

	  }, {
	    key: "_makeTextInput",
	    value: function _makeTextInput(defaultValue, value, path) {
	      var checkbox = document.createElement('input');
	      checkbox.type = 'text';
	      checkbox.className = 'vis-configuration vis-config-text';
	      checkbox.value = value;

	      if (value !== defaultValue) {
	        this.changedOptions.push({
	          path: path,
	          value: value
	        });
	      }

	      var me = this;

	      checkbox.onchange = function () {
	        me._update(this.value, path);
	      };

	      var label = this._makeLabel(path[path.length - 1], path);

	      this._makeItem(path, label, checkbox);
	    }
	    /**
	     * make a color field with a color picker for color fields
	     * @param {Array.<number>} arr
	     * @param {number} value
	     * @param {array} path    | where to look for the actual option
	     * @private
	     */

	  }, {
	    key: "_makeColorField",
	    value: function _makeColorField(arr, value, path) {
	      var _this4 = this;

	      var defaultColor = arr[1];
	      var div = document.createElement('div');
	      value = value === undefined ? defaultColor : value;

	      if (value !== 'none') {
	        div.className = 'vis-configuration vis-config-colorBlock';
	        div.style.backgroundColor = value;
	      } else {
	        div.className = 'vis-configuration vis-config-colorBlock none';
	      }

	      value = value === undefined ? defaultColor : value;

	      div.onclick = function () {
	        _this4._showColorPicker(value, div, path);
	      };

	      var label = this._makeLabel(path[path.length - 1], path);

	      this._makeItem(path, label, div);
	    }
	    /**
	     * used by the color buttons to call the color picker.
	     * @param {number} value
	     * @param {HTMLElement} div
	     * @param {array} path    | where to look for the actual option
	     * @private
	     */

	  }, {
	    key: "_showColorPicker",
	    value: function _showColorPicker(value, div, path) {
	      var _this5 = this;

	      // clear the callback from this div
	      div.onclick = function () {};

	      this.colorPicker.insertTo(div);
	      this.colorPicker.show();
	      this.colorPicker.setColor(value);
	      this.colorPicker.setUpdateCallback(function (color) {
	        var colorString = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
	        div.style.backgroundColor = colorString;

	        _this5._update(colorString, path);
	      }); // on close of the colorpicker, restore the callback.

	      this.colorPicker.setCloseCallback(function () {
	        div.onclick = function () {
	          _this5._showColorPicker(value, div, path);
	        };
	      });
	    }
	    /**
	     * parse an object and draw the correct items
	     * @param {Object} obj
	     * @param {array} [path=[]]    | where to look for the actual option
	     * @param {boolean} [checkOnly=false]
	     * @returns {boolean}
	     * @private
	     */

	  }, {
	    key: "_handleObject",
	    value: function _handleObject(obj) {
	      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	      var checkOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var show = false;

	      var filter = filter$2(this.options);

	      var visibleInSet = false;

	      for (var subObj in obj) {
	        if (obj.hasOwnProperty(subObj)) {
	          show = true;
	          var item = obj[subObj];
	          var newPath = util$1.copyAndExtendArray(path, subObj);

	          if (typeof filter === 'function') {
	            show = filter(subObj, path); // if needed we must go deeper into the object.

	            if (show === false) {
	              if (!isArray$3(item) && typeof item !== 'string' && typeof item !== 'boolean' && item instanceof Object) {
	                this.allowCreation = false;
	                show = this._handleObject(item, newPath, true);
	                this.allowCreation = checkOnly === false;
	              }
	            }
	          }

	          if (show !== false) {
	            visibleInSet = true;

	            var value = this._getValue(newPath);

	            if (isArray$3(item)) {
	              this._handleArray(item, value, newPath);
	            } else if (typeof item === 'string') {
	              this._makeTextInput(item, value, newPath);
	            } else if (typeof item === 'boolean') {
	              this._makeCheckbox(item, value, newPath);
	            } else if (item instanceof Object) {
	              // collapse the physics options that are not enabled
	              var draw = true;

	              if (indexOf$3(path).call(path, 'physics') !== -1) {
	                if (this.moduleOptions.physics.solver !== subObj) {
	                  draw = false;
	                }
	              }

	              if (draw === true) {
	                // initially collapse options with an disabled enabled option.
	                if (item.enabled !== undefined) {
	                  var enabledPath = util$1.copyAndExtendArray(newPath, 'enabled');

	                  var enabledValue = this._getValue(enabledPath);

	                  if (enabledValue === true) {
	                    var label = this._makeLabel(subObj, newPath, true);

	                    this._makeItem(newPath, label);

	                    visibleInSet = this._handleObject(item, newPath) || visibleInSet;
	                  } else {
	                    this._makeCheckbox(item, enabledValue, newPath);
	                  }
	                } else {
	                  var _label = this._makeLabel(subObj, newPath, true);

	                  this._makeItem(newPath, _label);

	                  visibleInSet = this._handleObject(item, newPath) || visibleInSet;
	                }
	              }
	            } else {
	              console.error('dont know how to handle', item, subObj, newPath);
	            }
	          }
	        }
	      }

	      return visibleInSet;
	    }
	    /**
	     * handle the array type of option
	     * @param {Array.<number>} arr
	     * @param {number} value
	     * @param {array} path    | where to look for the actual option
	     * @private
	     */

	  }, {
	    key: "_handleArray",
	    value: function _handleArray(arr, value, path) {
	      if (typeof arr[0] === 'string' && arr[0] === 'color') {
	        this._makeColorField(arr, value, path);

	        if (arr[1] !== value) {
	          this.changedOptions.push({
	            path: path,
	            value: value
	          });
	        }
	      } else if (typeof arr[0] === 'string') {
	        this._makeDropdown(arr, value, path);

	        if (arr[0] !== value) {
	          this.changedOptions.push({
	            path: path,
	            value: value
	          });
	        }
	      } else if (typeof arr[0] === 'number') {
	        this._makeRange(arr, value, path);

	        if (arr[0] !== value) {
	          this.changedOptions.push({
	            path: path,
	            value: Number(value)
	          });
	        }
	      }
	    }
	    /**
	     * called to update the network with the new settings.
	     * @param {number} value
	     * @param {array} path    | where to look for the actual option
	     * @private
	     */

	  }, {
	    key: "_update",
	    value: function _update(value, path) {
	      var options = this._constructOptions(value, path);

	      if (this.parent.body && this.parent.body.emitter && this.parent.body.emitter.emit) {
	        this.parent.body.emitter.emit("configChange", options);
	      }

	      this.initialized = true;
	      this.parent.setOptions(options);
	    }
	    /**
	     *
	     * @param {string|Boolean} value
	     * @param {Array.<string>} path
	     * @param {{}} optionsObj
	     * @returns {{}}
	     * @private
	     */

	  }, {
	    key: "_constructOptions",
	    value: function _constructOptions(value, path) {
	      var optionsObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      var pointer = optionsObj; // when dropdown boxes can be string or boolean, we typecast it into correct types

	      value = value === 'true' ? true : value;
	      value = value === 'false' ? false : value;

	      for (var i = 0; i < path.length; i++) {
	        if (path[i] !== 'global') {
	          if (pointer[path[i]] === undefined) {
	            pointer[path[i]] = {};
	          }

	          if (i !== path.length - 1) {
	            pointer = pointer[path[i]];
	          } else {
	            pointer[path[i]] = value;
	          }
	        }
	      }

	      return optionsObj;
	    }
	    /**
	     * @private
	     */

	  }, {
	    key: "_printOptions",
	    value: function _printOptions() {
	      var options = this.getOptions();
	      this.optionsContainer.innerHTML = '<pre>var options = ' + stringify$2(options, null, 2) + '</pre>';
	    }
	    /**
	     *
	     * @returns {{}} options
	     */

	  }, {
	    key: "getOptions",
	    value: function getOptions() {
	      var options = {};

	      for (var i = 0; i < this.changedOptions.length; i++) {
	        this._constructOptions(this.changedOptions[i].value, this.changedOptions[i].path, options);
	      }

	      return options;
	    }
	  }]);

	  return Configurator;
	}();

	function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * Create a timeline visualization
	 * @extends Core
	 */

	var Timeline = /*#__PURE__*/function (_Core) {
	  inherits(Timeline, _Core);

	  var _super = _createSuper$b(Timeline);

	  /**
	  * @param {HTMLElement} container
	  * @param {vis.DataSet | vis.DataView | Array} [items]
	  * @param {vis.DataSet | vis.DataView | Array} [groups]
	  * @param {Object} [options]  See Timeline.setOptions for the available options.
	  * @constructor Timeline
	  */
	  function Timeline(container, items, groups, options) {
	    var _context2, _context3, _context4, _context5, _context6, _context7, _context8;

	    var _this;

	    classCallCheck(this, Timeline);

	    _this = _super.call(this);
	    _this.initTime = new Date();
	    _this.itemsDone = false;

	    if (!(assertThisInitialized(_this) instanceof Timeline)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    } // if the third element is options, the forth is groups (optionally);


	    if (!(isArray$3(groups) || esnext.isDataViewLike("id", groups)) && groups instanceof Object) {
	      var forthArgument = options;
	      options = groups;
	      groups = forthArgument;
	    } // TODO: REMOVE THIS in the next MAJOR release
	    // see https://github.com/almende/vis/issues/2511


	    if (options && options.throttleRedraw) {
	      console.warn("Timeline option \"throttleRedraw\" is DEPRICATED and no longer supported. It will be removed in the next MAJOR release.");
	    }

	    var me = assertThisInitialized(_this);

	    _this.defaultOptions = {
	      autoResize: true,
	      longSelectPressTime: 251,
	      orientation: {
	        axis: 'bottom',
	        // axis orientation: 'bottom', 'top', or 'both'
	        item: 'bottom' // not relevant

	      },
	      moment: moment
	    };
	    _this.options = util$1.deepExtend({}, _this.defaultOptions); // Create the DOM, props, and emitter

	    _this._create(container);

	    if (!options || options && typeof options.rtl == "undefined") {
	      _this.dom.root.style.visibility = 'hidden';
	      var directionFromDom;
	      var domNode = _this.dom.root;

	      while (!directionFromDom && domNode) {
	        directionFromDom = window.getComputedStyle(domNode, null).direction;
	        domNode = domNode.parentElement;
	      }

	      _this.options.rtl = directionFromDom && directionFromDom.toLowerCase() == "rtl";
	    } else {
	      _this.options.rtl = options.rtl;
	    }

	    if (options) {
	      if (options.rollingMode) {
	        _this.options.rollingMode = options.rollingMode;
	      }

	      if (options.onInitialDrawComplete) {
	        _this.options.onInitialDrawComplete = options.onInitialDrawComplete;
	      }

	      if (options.onTimeout) {
	        _this.options.onTimeout = options.onTimeout;
	      }

	      if (options.loadingScreenTemplate) {
	        _this.options.loadingScreenTemplate = options.loadingScreenTemplate;
	      }
	    } // Prepare loading screen


	    var loadingScreenFragment = document.createElement('div');

	    if (_this.options.loadingScreenTemplate) {
	      var _context;

	      var templateFunction = bind$2(_context = _this.options.loadingScreenTemplate).call(_context, assertThisInitialized(_this));

	      var loadingScreen = templateFunction(_this.dom.loadingScreen);

	      if (loadingScreen instanceof Object && !(loadingScreen instanceof Element)) {
	        templateFunction(loadingScreenFragment);
	      } else {
	        if (loadingScreen instanceof Element) {
	          loadingScreenFragment.innerHTML = '';
	          loadingScreenFragment.appendChild(loadingScreen);
	        } else if (loadingScreen != undefined) {
	          loadingScreenFragment.innerHTML = loadingScreen;
	        }
	      }
	    }

	    _this.dom.loadingScreen.appendChild(loadingScreenFragment); // all components listed here will be repainted automatically


	    _this.components = [];
	    _this.body = {
	      dom: _this.dom,
	      domProps: _this.props,
	      emitter: {
	        on: bind$2(_context2 = _this.on).call(_context2, assertThisInitialized(_this)),
	        off: bind$2(_context3 = _this.off).call(_context3, assertThisInitialized(_this)),
	        emit: bind$2(_context4 = _this.emit).call(_context4, assertThisInitialized(_this))
	      },
	      hiddenDates: [],
	      util: {
	        getScale: function getScale() {
	          return me.timeAxis.step.scale;
	        },
	        getStep: function getStep() {
	          return me.timeAxis.step.step;
	        },
	        toScreen: bind$2(_context5 = me._toScreen).call(_context5, me),
	        toGlobalScreen: bind$2(_context6 = me._toGlobalScreen).call(_context6, me),
	        // this refers to the root.width
	        toTime: bind$2(_context7 = me._toTime).call(_context7, me),
	        toGlobalTime: bind$2(_context8 = me._toGlobalTime).call(_context8, me)
	      }
	    }; // range

	    _this.range = new Range(_this.body, _this.options);

	    _this.components.push(_this.range);

	    _this.body.range = _this.range; // time axis

	    _this.timeAxis = new TimeAxis(_this.body, _this.options);
	    _this.timeAxis2 = null; // used in case of orientation option 'both'

	    _this.components.push(_this.timeAxis); // current time bar


	    _this.currentTime = new CurrentTime(_this.body, _this.options);

	    _this.components.push(_this.currentTime); // item set


	    _this.itemSet = new ItemSet(_this.body, _this.options);

	    _this.components.push(_this.itemSet);

	    _this.itemsData = null; // DataSet

	    _this.groupsData = null; // DataSet

	    function emit(eventName, event) {
	      if (!me.hasListeners(eventName)) {
	        return;
	      }

	      me.emit(eventName, me.getEventProperties(event));
	    }

	    _this.dom.root.onclick = function (event) {
	      emit('click', event);
	    };

	    _this.dom.root.ondblclick = function (event) {
	      emit('doubleClick', event);
	    };

	    _this.dom.root.oncontextmenu = function (event) {
	      emit('contextmenu', event);
	    };

	    _this.dom.root.onmouseover = function (event) {
	      emit('mouseOver', event);
	    };

	    if (window.PointerEvent) {
	      _this.dom.root.onpointerdown = function (event) {
	        emit('mouseDown', event);
	      };

	      _this.dom.root.onpointermove = function (event) {
	        emit('mouseMove', event);
	      };

	      _this.dom.root.onpointerup = function (event) {
	        emit('mouseUp', event);
	      };
	    } else {
	      _this.dom.root.onmousemove = function (event) {
	        emit('mouseMove', event);
	      };

	      _this.dom.root.onmousedown = function (event) {
	        emit('mouseDown', event);
	      };

	      _this.dom.root.onmouseup = function (event) {
	        emit('mouseUp', event);
	      };
	    } //Single time autoscale/fit


	    _this.initialFitDone = false;

	    _this.on('changed', function () {
	      if (me.itemsData == null) return;

	      if (!me.initialFitDone && !me.options.rollingMode) {
	        me.initialFitDone = true;

	        if (me.options.start != undefined || me.options.end != undefined) {
	          if (me.options.start == undefined || me.options.end == undefined) {
	            var range = me.getItemRange();
	          }

	          var start = me.options.start != undefined ? me.options.start : range.min;
	          var end = me.options.end != undefined ? me.options.end : range.max;
	          me.setWindow(start, end, {
	            animation: false
	          });
	        } else {
	          me.fit({
	            animation: false
	          });
	        }
	      }

	      if (!me.initialDrawDone && (me.initialRangeChangeDone || !me.options.start && !me.options.end || me.options.rollingMode)) {
	        me.initialDrawDone = true;
	        me.itemSet.initialDrawDone = true;
	        me.dom.root.style.visibility = 'visible';
	        me.dom.loadingScreen.parentNode.removeChild(me.dom.loadingScreen);

	        if (me.options.onInitialDrawComplete) {
	          setTimeout$2(function () {
	            return me.options.onInitialDrawComplete();
	          }, 0);
	        }
	      }
	    });

	    _this.on('destroyTimeline', function () {
	      me.destroy();
	    }); // apply options


	    if (options) {
	      _this.setOptions(options);
	    }

	    _this.body.emitter.on('fit', function (args) {
	      _this._onFit(args);

	      _this.redraw();
	    }); // IMPORTANT: THIS HAPPENS BEFORE SET ITEMS!


	    if (groups) {
	      _this.setGroups(groups);
	    } // create itemset


	    if (items) {
	      _this.setItems(items);
	    } // draw for the first time


	    _this._redraw();

	    return _this;
	  }
	  /**
	   * Load a configurator
	   * @return {Object}
	   * @private
	   */


	  createClass(Timeline, [{
	    key: "_createConfigurator",
	    value: function _createConfigurator() {
	      return new Configurator(this, this.dom.container, configureOptions);
	    }
	    /**
	     * Force a redraw. The size of all items will be recalculated.
	     * Can be useful to manually redraw when option autoResize=false and the window
	     * has been resized, or when the items CSS has been changed.
	     *
	     * Note: this function will be overridden on construction with a trottled version
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      this.itemSet && this.itemSet.markDirty({
	        refreshItems: true
	      });

	      this._redraw();
	    }
	    /**
	     * Remove an item from the group
	     * @param {object} options
	     */

	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      // validate options
	      var errorFound = Validator.validate(options, allOptions$1);

	      if (errorFound === true) {
	        console.log('%cErrors have been found in the supplied options object.', printStyle);
	      }

	      Core.prototype.setOptions.call(this, options);

	      if ('type' in options) {
	        if (options.type !== this.options.type) {
	          this.options.type = options.type; // force recreation of all items

	          var itemsData = this.itemsData;

	          if (itemsData) {
	            var selection = this.getSelection();
	            this.setItems(null); // remove all

	            this.setItems(itemsData.rawDS); // add all

	            this.setSelection(selection); // restore selection
	          }
	        }
	      }
	    }
	    /**
	     * Set items
	     * @param {vis.DataSet | Array | null} items
	     */

	  }, {
	    key: "setItems",
	    value: function setItems(items) {
	      this.itemsDone = false; // convert to type DataSet when needed

	      var newDataSet;

	      if (!items) {
	        newDataSet = null;
	      } else if (esnext.isDataViewLike("id", items)) {
	        newDataSet = typeCoerceDataSet(items);
	      } else {
	        // turn an array into a dataset
	        newDataSet = typeCoerceDataSet(new esnext.DataSet(items));
	      } // set items


	      if (this.itemsData) {
	        // stop maintaining a coerced version of the old data set
	        this.itemsData.dispose();
	      }

	      this.itemsData = newDataSet;
	      this.itemSet && this.itemSet.setItems(newDataSet != null ? newDataSet.rawDS : null);
	    }
	    /**
	     * Set groups
	     * @param {vis.DataSet | Array} groups
	     */

	  }, {
	    key: "setGroups",
	    value: function setGroups(groups) {
	      // convert to type DataSet when needed
	      var newDataSet;

	      var filter = function filter(group) {
	        return group.visible !== false;
	      };

	      if (!groups) {
	        newDataSet = null;
	      } else {
	        // If groups is array, turn to DataSet & build dataview from that
	        if (isArray$3(groups)) groups = new esnext.DataSet(groups);
	        newDataSet = new esnext.DataView(groups, {
	          filter: filter
	        });
	      } // This looks weird but it's necessary to prevent memory leaks.
	      //
	      // The problem is that the DataView will exist as long as the DataSet it's
	      // connected to. This will force it to swap the groups DataSet for it's own
	      // DataSet. In this arrangement it will become unreferenced from the outside
	      // and garbage collected.
	      //
	      // IMPORTANT NOTE: If `this.groupsData` is a DataView was created in this
	      // method. Even if the original is a DataView already a new one has been
	      // created and assigned to `this.groupsData`. In case this changes in the
	      // future it will be necessary to rework this!!!!


	      if (this.groupsData != null && typeof this.groupsData.setData === "function") {
	        this.groupsData.setData(null);
	      }

	      this.groupsData = newDataSet;
	      this.itemSet.setGroups(newDataSet);
	    }
	    /**
	     * Set both items and groups in one go
	     * @param {{items: (Array | vis.DataSet), groups: (Array | vis.DataSet)}} data
	     */

	  }, {
	    key: "setData",
	    value: function setData(data) {
	      if (data && data.groups) {
	        this.setGroups(data.groups);
	      }

	      if (data && data.items) {
	        this.setItems(data.items);
	      }
	    }
	    /**
	     * Set selected items by their id. Replaces the current selection
	     * Unknown id's are silently ignored.
	     * @param {string[] | string} [ids]  An array with zero or more id's of the items to be
	     *                                selected. If ids is an empty array, all items will be
	     *                                unselected.
	     * @param {Object} [options]      Available options:
	     *                                `focus: boolean`
	     *                                    If true, focus will be set to the selected item(s)
	     *                                `animation: boolean | {duration: number, easingFunction: string}`
	     *                                    If true (default), the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     *                                    Only applicable when option focus is true.
	     */

	  }, {
	    key: "setSelection",
	    value: function setSelection(ids, options) {
	      this.itemSet && this.itemSet.setSelection(ids);

	      if (options && options.focus) {
	        this.focus(ids, options);
	      }
	    }
	    /**
	     * Get the selected items by their id
	     * @return {Array} ids  The ids of the selected items
	     */

	  }, {
	    key: "getSelection",
	    value: function getSelection() {
	      return this.itemSet && this.itemSet.getSelection() || [];
	    }
	    /**
	     * Adjust the visible window such that the selected item (or multiple items)
	     * are centered on screen.
	     * @param {string | String[]} id     An item id or array with item ids
	     * @param {Object} [options]      Available options:
	     *                                `animation: boolean | {duration: number, easingFunction: string}`
	     *                                    If true (default), the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     *                                `zoom: boolean`
	     *                                    If true (default), the timeline will
	     *                                    zoom on the element after focus it.
	     */

	  }, {
	    key: "focus",
	    value: function focus(id, options) {
	      if (!this.itemsData || id == undefined) return;
	      var ids = isArray$3(id) ? id : [id]; // get the specified item(s)

	      var itemsData = this.itemsData.get(ids); // calculate minimum start and maximum end of specified items

	      var start = null;
	      var end = null;

	      forEach$2(itemsData).call(itemsData, function (itemData) {
	        var s = itemData.start.valueOf();
	        var e = 'end' in itemData ? itemData.end.valueOf() : itemData.start.valueOf();

	        if (start === null || s < start) {
	          start = s;
	        }

	        if (end === null || e > end) {
	          end = e;
	        }
	      });

	      if (start !== null && end !== null) {
	        var _me = this; // Use the first item for the vertical focus


	        var item = this.itemSet.items[ids[0]];
	        var startPos = this._getScrollTop() * -1;
	        var initialVerticalScroll = null; // Setup a handler for each frame of the vertical scroll

	        var verticalAnimationFrame = function verticalAnimationFrame(ease, willDraw, done) {
	          var verticalScroll = getItemVerticalScroll(_me, item);

	          if (verticalScroll === false) {
	            return; // We don't need to scroll, so do nothing
	          }

	          if (!initialVerticalScroll) {
	            initialVerticalScroll = verticalScroll;
	          }

	          if (initialVerticalScroll.itemTop == verticalScroll.itemTop && !initialVerticalScroll.shouldScroll) {
	            return; // We don't need to scroll, so do nothing
	          } else if (initialVerticalScroll.itemTop != verticalScroll.itemTop && verticalScroll.shouldScroll) {
	            // The redraw shifted elements, so reset the animation to correct
	            initialVerticalScroll = verticalScroll;
	            startPos = _me._getScrollTop() * -1;
	          }

	          var from = startPos;
	          var to = initialVerticalScroll.scrollOffset;
	          var scrollTop = done ? to : from + (to - from) * ease;

	          _me._setScrollTop(-scrollTop);

	          if (!willDraw) {
	            _me._redraw();
	          }
	        }; // Enforces the final vertical scroll position


	        var setFinalVerticalPosition = function setFinalVerticalPosition() {
	          var finalVerticalScroll = getItemVerticalScroll(_me, item);

	          if (finalVerticalScroll.shouldScroll && finalVerticalScroll.itemTop != initialVerticalScroll.itemTop) {
	            _me._setScrollTop(-finalVerticalScroll.scrollOffset);

	            _me._redraw();
	          }
	        }; // Perform one last check at the end to make sure the final vertical
	        // position is correct


	        var finalVerticalCallback = function finalVerticalCallback() {
	          // Double check we ended at the proper scroll position
	          setFinalVerticalPosition(); // Let the redraw settle and finalize the position.      

	          setTimeout$2(setFinalVerticalPosition, 100);
	        }; // calculate the new middle and interval for the window


	        var zoom = options && options.zoom !== undefined ? options.zoom : true;
	        var middle = (start + end) / 2;
	        var interval = zoom ? (end - start) * 1.1 : Math.max(this.range.end - this.range.start, (end - start) * 1.1);
	        var animation = options && options.animation !== undefined ? options.animation : true;

	        if (!animation) {
	          // We aren't animating so set a default so that the final callback forces the vertical location
	          initialVerticalScroll = {
	            shouldScroll: false,
	            scrollOffset: -1,
	            itemTop: -1
	          };
	        }

	        this.range.setRange(middle - interval / 2, middle + interval / 2, {
	          animation: animation
	        }, finalVerticalCallback, verticalAnimationFrame);
	      }
	    }
	    /**
	     * Set Timeline window such that it fits all items
	     * @param {Object} [options]  Available options:
	     *                                `animation: boolean | {duration: number, easingFunction: string}`
	     *                                    If true (default), the range is animated
	     *                                    smoothly to the new window. An object can be
	     *                                    provided to specify duration and easing function.
	     *                                    Default duration is 500 ms, and default easing
	     *                                    function is 'easeInOutQuad'.
	     * @param {function} [callback]
	     */

	  }, {
	    key: "fit",
	    value: function fit(options, callback) {
	      var animation = options && options.animation !== undefined ? options.animation : true;
	      var range;

	      if (this.itemsData.length === 1 && this.itemsData.get()[0].end === undefined) {
	        // a single item -> don't fit, just show a range around the item from -4 to +3 days
	        range = this.getDataRange();
	        this.moveTo(range.min.valueOf(), {
	          animation: animation
	        }, callback);
	      } else {
	        // exactly fit the items (plus a small margin)
	        range = this.getItemRange();
	        this.range.setRange(range.min, range.max, {
	          animation: animation
	        }, callback);
	      }
	    }
	    /**
	     * Determine the range of the items, taking into account their actual width
	     * and a margin of 10 pixels on both sides.
	     *
	     * @returns {{min: Date, max: Date}}
	     */

	  }, {
	    key: "getItemRange",
	    value: function getItemRange() {
	      var _this2 = this;

	      // get a rough approximation for the range based on the items start and end dates
	      var range = this.getDataRange();
	      var min = range.min !== null ? range.min.valueOf() : null;
	      var max = range.max !== null ? range.max.valueOf() : null;
	      var minItem = null;
	      var maxItem = null;

	      if (min != null && max != null) {
	        var interval = max - min; // ms

	        if (interval <= 0) {
	          interval = 10;
	        }

	        var factor = interval / this.props.center.width;
	        var redrawQueue = {};
	        var redrawQueueLength = 0; // collect redraw functions

	        forEach$2(util$1).call(util$1, this.itemSet.items, function (item, key) {
	          if (item.groupShowing) {
	            var returnQueue = true;
	            redrawQueue[key] = item.redraw(returnQueue);
	            redrawQueueLength = redrawQueue[key].length;
	          }
	        });

	        var needRedraw = redrawQueueLength > 0;

	        if (needRedraw) {
	          var _loop = function _loop(i) {
	            forEach$2(util$1).call(util$1, redrawQueue, function (fns) {
	              fns[i]();
	            });
	          };

	          // redraw all regular items
	          for (var i = 0; i < redrawQueueLength; i++) {
	            _loop(i);
	          }
	        } // calculate the date of the left side and right side of the items given


	        forEach$2(util$1).call(util$1, this.itemSet.items, function (item) {
	          var start = getStart(item);
	          var end = getEnd(item);
	          var startSide;
	          var endSide;

	          if (_this2.options.rtl) {
	            startSide = start - (item.getWidthRight() + 10) * factor;
	            endSide = end + (item.getWidthLeft() + 10) * factor;
	          } else {
	            startSide = start - (item.getWidthLeft() + 10) * factor;
	            endSide = end + (item.getWidthRight() + 10) * factor;
	          }

	          if (startSide < min) {
	            min = startSide;
	            minItem = item;
	          }

	          if (endSide > max) {
	            max = endSide;
	            maxItem = item;
	          }
	        });

	        if (minItem && maxItem) {
	          var lhs = minItem.getWidthLeft() + 10;
	          var rhs = maxItem.getWidthRight() + 10;
	          var delta = this.props.center.width - lhs - rhs; // px

	          if (delta > 0) {
	            if (this.options.rtl) {
	              min = getStart(minItem) - rhs * interval / delta; // ms

	              max = getEnd(maxItem) + lhs * interval / delta; // ms
	            } else {
	              min = getStart(minItem) - lhs * interval / delta; // ms

	              max = getEnd(maxItem) + rhs * interval / delta; // ms
	            }
	          }
	        }
	      }

	      return {
	        min: min != null ? new Date(min) : null,
	        max: max != null ? new Date(max) : null
	      };
	    }
	    /**
	     * Calculate the data range of the items start and end dates
	     * @returns {{min: Date, max: Date}}
	     */

	  }, {
	    key: "getDataRange",
	    value: function getDataRange() {
	      var min = null;
	      var max = null;

	      if (this.itemsData) {
	        var _context9;

	        forEach$2(_context9 = this.itemsData).call(_context9, function (item) {
	          var start = util$1.convert(item.start, 'Date').valueOf();
	          var end = util$1.convert(item.end != undefined ? item.end : item.start, 'Date').valueOf();

	          if (min === null || start < min) {
	            min = start;
	          }

	          if (max === null || end > max) {
	            max = end;
	          }
	        });
	      }

	      return {
	        min: min != null ? new Date(min) : null,
	        max: max != null ? new Date(max) : null
	      };
	    }
	    /**
	     * Generate Timeline related information from an event
	     * @param {Event} event
	     * @return {Object} An object with related information, like on which area
	     *                  The event happened, whether clicked on an item, etc.
	     */

	  }, {
	    key: "getEventProperties",
	    value: function getEventProperties(event) {
	      var clientX = event.center ? event.center.x : event.clientX;
	      var clientY = event.center ? event.center.y : event.clientY;
	      var centerContainerRect = this.dom.centerContainer.getBoundingClientRect();
	      var x = this.options.rtl ? centerContainerRect.right - clientX : clientX - centerContainerRect.left;
	      var y = clientY - centerContainerRect.top;
	      var item = this.itemSet.itemFromTarget(event);
	      var group = this.itemSet.groupFromTarget(event);
	      var customTime = CustomTime.customTimeFromTarget(event);
	      var snap = this.itemSet.options.snap || null;
	      var scale = this.body.util.getScale();
	      var step = this.body.util.getStep();

	      var time = this._toTime(x);

	      var snappedTime = snap ? snap(time, scale, step) : time;
	      var element = util$1.getTarget(event);
	      var what = null;

	      if (item != null) {
	        what = 'item';
	      } else if (customTime != null) {
	        what = 'custom-time';
	      } else if (util$1.hasParent(element, this.timeAxis.dom.foreground)) {
	        what = 'axis';
	      } else if (this.timeAxis2 && util$1.hasParent(element, this.timeAxis2.dom.foreground)) {
	        what = 'axis';
	      } else if (util$1.hasParent(element, this.itemSet.dom.labelSet)) {
	        what = 'group-label';
	      } else if (util$1.hasParent(element, this.currentTime.bar)) {
	        what = 'current-time';
	      } else if (util$1.hasParent(element, this.dom.center)) {
	        what = 'background';
	      }

	      return {
	        event: event,
	        item: item ? item.id : null,
	        isCluster: item ? !!item.isCluster : false,
	        items: item ? item.items || [] : null,
	        group: group ? group.groupId : null,
	        customTime: customTime ? customTime.options.id : null,
	        what: what,
	        pageX: event.srcEvent ? event.srcEvent.pageX : event.pageX,
	        pageY: event.srcEvent ? event.srcEvent.pageY : event.pageY,
	        x: x,
	        y: y,
	        time: time,
	        snappedTime: snappedTime
	      };
	    }
	    /**
	     * Toggle Timeline rolling mode
	     */

	  }, {
	    key: "toggleRollingMode",
	    value: function toggleRollingMode() {
	      if (this.range.rolling) {
	        this.range.stopRolling();
	      } else {
	        if (this.options.rollingMode == undefined) {
	          this.setOptions(this.options);
	        }

	        this.range.startRolling();
	      }
	    }
	    /**
	     * redraw
	     * @private
	     */

	  }, {
	    key: "_redraw",
	    value: function _redraw() {
	      Core.prototype._redraw.call(this);
	    }
	    /**
	     * on fit callback
	     * @param {object} args
	     * @private
	     */

	  }, {
	    key: "_onFit",
	    value: function _onFit(args) {
	      var start = args.start,
	          end = args.end,
	          animation = args.animation;

	      if (!end) {
	        this.moveTo(start.valueOf(), {
	          animation: animation
	        });
	      } else {
	        this.range.setRange(start, end, {
	          animation: animation
	        });
	      }
	    }
	  }]);

	  return Timeline;
	}(Core);

	function getStart(item) {
	  return util$1.convert(item.data.start, 'Date').valueOf();
	}
	/**
	 *
	 * @param {timeline.Item} item
	 * @returns {number}
	 */


	function getEnd(item) {
	  var end = item.data.end != undefined ? item.data.end : item.data.start;
	  return util$1.convert(end, 'Date').valueOf();
	}
	/**
	 * @param {vis.Timeline} timeline
	 * @param {timeline.Item} item
	 * @return {{shouldScroll: bool, scrollOffset: number, itemTop: number}}
	 */


	function getItemVerticalScroll(timeline, item) {
	  if (!item.parent) {
	    // The item no longer exists, so ignore this focus.
	    return false;
	  }

	  var itemsetHeight = timeline.options.rtl ? timeline.props.rightContainer.height : timeline.props.leftContainer.height;
	  var contentHeight = timeline.props.center.height;
	  var group = item.parent;
	  var offset = group.top;
	  var shouldScroll = true;
	  var orientation = timeline.timeAxis.options.orientation.axis;

	  var itemTop = function itemTop() {
	    if (orientation == "bottom") {
	      return group.height - item.top - item.height;
	    } else {
	      return item.top;
	    }
	  };

	  var currentScrollHeight = timeline._getScrollTop() * -1;
	  var targetOffset = offset + itemTop();
	  var height = item.height;

	  if (targetOffset < currentScrollHeight) {
	    if (offset + itemsetHeight <= offset + itemTop() + height) {
	      offset += itemTop() - timeline.itemSet.options.margin.item.vertical;
	    }
	  } else if (targetOffset + height > currentScrollHeight + itemsetHeight) {
	    offset += itemTop() + height - itemsetHeight + timeline.itemSet.options.margin.item.vertical;
	  } else {
	    shouldScroll = false;
	  }

	  offset = Math.min(offset, contentHeight - itemsetHeight);
	  return {
	    shouldScroll: shouldScroll,
	    scrollOffset: offset,
	    itemTop: targetOffset
	  };
	}

	// DOM utility methods

	/**
	 * this prepares the JSON container for allocating SVG elements
	 * @param {Object} JSONcontainer
	 * @private
	 */
	function prepareElements(JSONcontainer) {
	  // cleanup the redundant svgElements;
	  for (var elementType in JSONcontainer) {
	    if (JSONcontainer.hasOwnProperty(elementType)) {
	      JSONcontainer[elementType].redundant = JSONcontainer[elementType].used;
	      JSONcontainer[elementType].used = [];
	    }
	  }
	}
	/**
	 * this cleans up all the unused SVG elements. By asking for the parentNode, we only need to supply the JSON container from
	 * which to remove the redundant elements.
	 *
	 * @param {Object} JSONcontainer
	 * @private
	 */

	function cleanupElements(JSONcontainer) {
	  // cleanup the redundant svgElements;
	  for (var elementType in JSONcontainer) {
	    if (JSONcontainer.hasOwnProperty(elementType)) {
	      if (JSONcontainer[elementType].redundant) {
	        for (var i = 0; i < JSONcontainer[elementType].redundant.length; i++) {
	          JSONcontainer[elementType].redundant[i].parentNode.removeChild(JSONcontainer[elementType].redundant[i]);
	        }

	        JSONcontainer[elementType].redundant = [];
	      }
	    }
	  }
	}
	/**
	 * Ensures that all elements are removed first up so they can be recreated cleanly
	 * @param {Object} JSONcontainer
	 */

	function resetElements(JSONcontainer) {
	  prepareElements(JSONcontainer);
	  cleanupElements(JSONcontainer);
	  prepareElements(JSONcontainer);
	}
	/**
	 * Allocate or generate an SVG element if needed. Store a reference to it in the JSON container and draw it in the svgContainer
	 * the JSON container and the SVG container have to be supplied so other svg containers (like the legend) can use this.
	 *
	 * @param {string} elementType
	 * @param {Object} JSONcontainer
	 * @param {Object} svgContainer
	 * @returns {Element}
	 * @private
	 */

	function getSVGElement(elementType, JSONcontainer, svgContainer) {
	  var element; // allocate SVG element, if it doesnt yet exist, create one.

	  if (JSONcontainer.hasOwnProperty(elementType)) {
	    // this element has been created before
	    // check if there is an redundant element
	    if (JSONcontainer[elementType].redundant.length > 0) {
	      element = JSONcontainer[elementType].redundant[0];
	      JSONcontainer[elementType].redundant.shift();
	    } else {
	      // create a new element and add it to the SVG
	      element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
	      svgContainer.appendChild(element);
	    }
	  } else {
	    // create a new element and add it to the SVG, also create a new object in the svgElements to keep track of it.
	    element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
	    JSONcontainer[elementType] = {
	      used: [],
	      redundant: []
	    };
	    svgContainer.appendChild(element);
	  }

	  JSONcontainer[elementType].used.push(element);
	  return element;
	}
	/**
	 * Allocate or generate an SVG element if needed. Store a reference to it in the JSON container and draw it in the svgContainer
	 * the JSON container and the SVG container have to be supplied so other svg containers (like the legend) can use this.
	 *
	 * @param {string} elementType
	 * @param {Object} JSONcontainer
	 * @param {Element} DOMContainer
	 * @param {Element} insertBefore
	 * @returns {*}
	 */

	function getDOMElement(elementType, JSONcontainer, DOMContainer, insertBefore) {
	  var element; // allocate DOM element, if it doesnt yet exist, create one.

	  if (JSONcontainer.hasOwnProperty(elementType)) {
	    // this element has been created before
	    // check if there is an redundant element
	    if (JSONcontainer[elementType].redundant.length > 0) {
	      element = JSONcontainer[elementType].redundant[0];
	      JSONcontainer[elementType].redundant.shift();
	    } else {
	      // create a new element and add it to the SVG
	      element = document.createElement(elementType);

	      if (insertBefore !== undefined) {
	        DOMContainer.insertBefore(element, insertBefore);
	      } else {
	        DOMContainer.appendChild(element);
	      }
	    }
	  } else {
	    // create a new element and add it to the SVG, also create a new object in the svgElements to keep track of it.
	    element = document.createElement(elementType);
	    JSONcontainer[elementType] = {
	      used: [],
	      redundant: []
	    };

	    if (insertBefore !== undefined) {
	      DOMContainer.insertBefore(element, insertBefore);
	    } else {
	      DOMContainer.appendChild(element);
	    }
	  }

	  JSONcontainer[elementType].used.push(element);
	  return element;
	}
	/**
	 * Draw a point object. This is a separate function because it can also be called by the legend.
	 * The reason the JSONcontainer and the target SVG svgContainer have to be supplied is so the legend can use these functions
	 * as well.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {Object} groupTemplate: A template containing the necessary information to draw the datapoint e.g., {style: 'circle', size: 5, className: 'className' }
	 * @param {Object} JSONcontainer
	 * @param {Object} svgContainer
	 * @param {Object} labelObj
	 * @returns {vis.PointItem}
	 */

	function drawPoint(x, y, groupTemplate, JSONcontainer, svgContainer, labelObj) {
	  var point;

	  if (groupTemplate.style == 'circle') {
	    point = getSVGElement('circle', JSONcontainer, svgContainer);
	    point.setAttributeNS(null, "cx", x);
	    point.setAttributeNS(null, "cy", y);
	    point.setAttributeNS(null, "r", 0.5 * groupTemplate.size);
	  } else {
	    point = getSVGElement('rect', JSONcontainer, svgContainer);
	    point.setAttributeNS(null, "x", x - 0.5 * groupTemplate.size);
	    point.setAttributeNS(null, "y", y - 0.5 * groupTemplate.size);
	    point.setAttributeNS(null, "width", groupTemplate.size);
	    point.setAttributeNS(null, "height", groupTemplate.size);
	  }

	  if (groupTemplate.styles !== undefined) {
	    point.setAttributeNS(null, "style", groupTemplate.styles);
	  }

	  point.setAttributeNS(null, "class", groupTemplate.className + " vis-point"); //handle label

	  if (labelObj) {
	    var label = getSVGElement('text', JSONcontainer, svgContainer);

	    if (labelObj.xOffset) {
	      x = x + labelObj.xOffset;
	    }

	    if (labelObj.yOffset) {
	      y = y + labelObj.yOffset;
	    }

	    if (labelObj.content) {
	      label.textContent = labelObj.content;
	    }

	    if (labelObj.className) {
	      label.setAttributeNS(null, "class", labelObj.className + " vis-label");
	    }

	    label.setAttributeNS(null, "x", x);
	    label.setAttributeNS(null, "y", y);
	  }

	  return point;
	}
	/**
	 * draw a bar SVG element centered on the X coordinate
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {string} className
	 * @param {Object} JSONcontainer
	 * @param {Object} svgContainer
	 * @param {string} style
	 */

	function drawBar(x, y, width, height, className, JSONcontainer, svgContainer, style) {
	  if (height != 0) {
	    if (height < 0) {
	      height *= -1;
	      y -= height;
	    }

	    var rect = getSVGElement('rect', JSONcontainer, svgContainer);
	    rect.setAttributeNS(null, "x", x - 0.5 * width);
	    rect.setAttributeNS(null, "y", y);
	    rect.setAttributeNS(null, "width", width);
	    rect.setAttributeNS(null, "height", height);
	    rect.setAttributeNS(null, "class", className);

	    if (style) {
	      rect.setAttributeNS(null, "style", style);
	    }
	  }
	}
	/**
	 * get default language
	 * @returns {string}
	 */

	function getNavigatorLanguage() {
	  try {
	    if (!navigator) return 'en';

	    if (navigator.languages && navigator.languages.length) {
	      return navigator.languages;
	    } else {
	      return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
	    }
	  } catch (error) {
	    return 'en';
	  }
	}

	/** DataScale */
	var DataScale = /*#__PURE__*/function () {
	  /**
	   *
	   * @param {number} start
	   * @param {number} end
	   * @param {boolean} autoScaleStart
	   * @param {boolean} autoScaleEnd
	   * @param {number} containerHeight
	   * @param {number} majorCharHeight
	   * @param {boolean} zeroAlign
	   * @param {function} formattingFunction
	   * @constructor DataScale
	   */
	  function DataScale(start, end, autoScaleStart, autoScaleEnd, containerHeight, majorCharHeight) {
	    var zeroAlign = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
	    var formattingFunction = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

	    classCallCheck(this, DataScale);

	    this.majorSteps = [1, 2, 5, 10];
	    this.minorSteps = [0.25, 0.5, 1, 2];
	    this.customLines = null;
	    this.containerHeight = containerHeight;
	    this.majorCharHeight = majorCharHeight;
	    this._start = start;
	    this._end = end;
	    this.scale = 1;
	    this.minorStepIdx = -1;
	    this.magnitudefactor = 1;
	    this.determineScale();
	    this.zeroAlign = zeroAlign;
	    this.autoScaleStart = autoScaleStart;
	    this.autoScaleEnd = autoScaleEnd;
	    this.formattingFunction = formattingFunction;

	    if (autoScaleStart || autoScaleEnd) {
	      var me = this;

	      var roundToMinor = function roundToMinor(value) {
	        var rounded = value - value % (me.magnitudefactor * me.minorSteps[me.minorStepIdx]);

	        if (value % (me.magnitudefactor * me.minorSteps[me.minorStepIdx]) > 0.5 * (me.magnitudefactor * me.minorSteps[me.minorStepIdx])) {
	          return rounded + me.magnitudefactor * me.minorSteps[me.minorStepIdx];
	        } else {
	          return rounded;
	        }
	      };

	      if (autoScaleStart) {
	        this._start -= this.magnitudefactor * 2 * this.minorSteps[this.minorStepIdx];
	        this._start = roundToMinor(this._start);
	      }

	      if (autoScaleEnd) {
	        this._end += this.magnitudefactor * this.minorSteps[this.minorStepIdx];
	        this._end = roundToMinor(this._end);
	      }

	      this.determineScale();
	    }
	  }
	  /**
	   * set chart height
	   * @param {number} majorCharHeight 
	   */


	  createClass(DataScale, [{
	    key: "setCharHeight",
	    value: function setCharHeight(majorCharHeight) {
	      this.majorCharHeight = majorCharHeight;
	    }
	    /**
	     * set height
	     * @param {number} containerHeight 
	     */

	  }, {
	    key: "setHeight",
	    value: function setHeight(containerHeight) {
	      this.containerHeight = containerHeight;
	    }
	    /**
	     * determine scale
	     */

	  }, {
	    key: "determineScale",
	    value: function determineScale() {
	      var range = this._end - this._start;
	      this.scale = this.containerHeight / range;
	      var minimumStepValue = this.majorCharHeight / this.scale;
	      var orderOfMagnitude = range > 0 ? Math.round(Math.log(range) / Math.LN10) : 0;
	      this.minorStepIdx = -1;
	      this.magnitudefactor = Math.pow(10, orderOfMagnitude);
	      var start = 0;

	      if (orderOfMagnitude < 0) {
	        start = orderOfMagnitude;
	      }

	      var solutionFound = false;

	      for (var l = start; Math.abs(l) <= Math.abs(orderOfMagnitude); l++) {
	        this.magnitudefactor = Math.pow(10, l);

	        for (var j = 0; j < this.minorSteps.length; j++) {
	          var stepSize = this.magnitudefactor * this.minorSteps[j];

	          if (stepSize >= minimumStepValue) {
	            solutionFound = true;
	            this.minorStepIdx = j;
	            break;
	          }
	        }

	        if (solutionFound === true) {
	          break;
	        }
	      }
	    }
	    /**
	     * returns if value is major
	     * @param {number} value
	     * @returns {boolean} 
	     */

	  }, {
	    key: "is_major",
	    value: function is_major(value) {
	      return value % (this.magnitudefactor * this.majorSteps[this.minorStepIdx]) === 0;
	    }
	    /**
	     * returns step size
	     * @returns {number} 
	     */

	  }, {
	    key: "getStep",
	    value: function getStep() {
	      return this.magnitudefactor * this.minorSteps[this.minorStepIdx];
	    }
	    /**
	     * returns first major
	     * @returns {number} 
	     */

	  }, {
	    key: "getFirstMajor",
	    value: function getFirstMajor() {
	      var majorStep = this.magnitudefactor * this.majorSteps[this.minorStepIdx];
	      return this.convertValue(this._start + (majorStep - this._start % majorStep) % majorStep);
	    }
	    /**
	     * returns first major
	     * @param {date} current
	     * @returns {date} formatted date
	     */

	  }, {
	    key: "formatValue",
	    value: function formatValue(current) {
	      var returnValue = current.toPrecision(5);

	      if (typeof this.formattingFunction === 'function') {
	        returnValue = this.formattingFunction(current);
	      }

	      if (typeof returnValue === 'number') {
	        return "".concat(returnValue);
	      } else if (typeof returnValue === 'string') {
	        return returnValue;
	      } else {
	        return current.toPrecision(5);
	      }
	    }
	    /**
	     * returns lines
	     * @returns {object} lines
	     */

	  }, {
	    key: "getLines",
	    value: function getLines() {
	      var lines = [];
	      var step = this.getStep();
	      var bottomOffset = (step - this._start % step) % step;

	      for (var i = this._start + bottomOffset; this._end - i > 0.00001; i += step) {
	        if (i != this._start) {
	          //Skip the bottom line
	          lines.push({
	            major: this.is_major(i),
	            y: this.convertValue(i),
	            val: this.formatValue(i)
	          });
	        }
	      }

	      return lines;
	    }
	    /**
	     * follow scale
	     * @param {object} other
	     */

	  }, {
	    key: "followScale",
	    value: function followScale(other) {
	      var oldStepIdx = this.minorStepIdx;
	      var oldStart = this._start;
	      var oldEnd = this._end;
	      var me = this;

	      var increaseMagnitude = function increaseMagnitude() {
	        me.magnitudefactor *= 2;
	      };

	      var decreaseMagnitude = function decreaseMagnitude() {
	        me.magnitudefactor /= 2;
	      };

	      if (other.minorStepIdx <= 1 && this.minorStepIdx <= 1 || other.minorStepIdx > 1 && this.minorStepIdx > 1) ; else if (other.minorStepIdx < this.minorStepIdx) {
	        //I'm 5, they are 4 per major.
	        this.minorStepIdx = 1;

	        if (oldStepIdx == 2) {
	          increaseMagnitude();
	        } else {
	          increaseMagnitude();
	          increaseMagnitude();
	        }
	      } else {
	        //I'm 4, they are 5 per major
	        this.minorStepIdx = 2;

	        if (oldStepIdx == 1) {
	          decreaseMagnitude();
	        } else {
	          decreaseMagnitude();
	          decreaseMagnitude();
	        }
	      } //Get masters stats:


	      var otherZero = other.convertValue(0);
	      var otherStep = other.getStep() * other.scale;
	      var done = false;
	      var count = 0; //Loop until magnitude is correct for given constrains.

	      while (!done && count++ < 5) {
	        //Get my stats:
	        this.scale = otherStep / (this.minorSteps[this.minorStepIdx] * this.magnitudefactor);
	        var newRange = this.containerHeight / this.scale; //For the case the magnitudefactor has changed:

	        this._start = oldStart;
	        this._end = this._start + newRange;
	        var myOriginalZero = this._end * this.scale;
	        var majorStep = this.magnitudefactor * this.majorSteps[this.minorStepIdx];
	        var majorOffset = this.getFirstMajor() - other.getFirstMajor();

	        if (this.zeroAlign) {
	          var zeroOffset = otherZero - myOriginalZero;
	          this._end += zeroOffset / this.scale;
	          this._start = this._end - newRange;
	        } else {
	          if (!this.autoScaleStart) {
	            this._start += majorStep - majorOffset / this.scale;
	            this._end = this._start + newRange;
	          } else {
	            this._start -= majorOffset / this.scale;
	            this._end = this._start + newRange;
	          }
	        }

	        if (!this.autoScaleEnd && this._end > oldEnd + 0.00001) {
	          //Need to decrease magnitude to prevent scale overshoot! (end)
	          decreaseMagnitude();
	          done = false;
	          continue;
	        }

	        if (!this.autoScaleStart && this._start < oldStart - 0.00001) {
	          if (this.zeroAlign && oldStart >= 0) {
	            console.warn("Can't adhere to given 'min' range, due to zeroalign");
	          } else {
	            //Need to decrease magnitude to prevent scale overshoot! (start)
	            decreaseMagnitude();
	            done = false;
	            continue;
	          }
	        }

	        if (this.autoScaleStart && this.autoScaleEnd && newRange < oldEnd - oldStart) {
	          increaseMagnitude();
	          done = false;
	          continue;
	        }

	        done = true;
	      }
	    }
	    /**
	     * convert value
	     * @param {number} value
	     * @returns {number} 
	     */

	  }, {
	    key: "convertValue",
	    value: function convertValue(value) {
	      return this.containerHeight - (value - this._start) * this.scale;
	    }
	    /**
	     * returns screen to value
	     * @param {number} pixels
	     * @returns {number} 
	     */

	  }, {
	    key: "screenToValue",
	    value: function screenToValue(pixels) {
	      return (this.containerHeight - pixels) / this.scale + this._start;
	    }
	  }]);

	  return DataScale;
	}();

	function _createForOfIteratorHelper$5(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$3(o) || (it = _unsupportedIterableToArray$6(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$6(o, minLen) { var _context; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = slice$6(_context = Object.prototype.toString.call(o)).call(_context, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }

	function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	/** A horizontal time axis */

	var DataAxis = /*#__PURE__*/function (_Component) {
	  inherits(DataAxis, _Component);

	  var _super = _createSuper$c(DataAxis);

	  /**
	  * @param {Object} body
	  * @param {Object} [options]        See DataAxis.setOptions for the available
	  *                                  options.
	  * @param {SVGElement} svg
	  * @param {timeline.LineGraph.options} linegraphOptions
	  * @constructor DataAxis
	  * @extends Component
	  */
	  function DataAxis(body, options, svg, linegraphOptions) {
	    var _this;

	    classCallCheck(this, DataAxis);

	    _this = _super.call(this);
	    _this.id = v4();
	    _this.body = body;
	    _this.defaultOptions = {
	      orientation: 'left',
	      // supported: 'left', 'right'
	      showMinorLabels: true,
	      showMajorLabels: true,
	      showWeekScale: false,
	      icons: false,
	      majorLinesOffset: 7,
	      minorLinesOffset: 4,
	      labelOffsetX: 10,
	      labelOffsetY: 2,
	      iconWidth: 20,
	      width: '40px',
	      visible: true,
	      alignZeros: true,
	      left: {
	        range: {
	          min: undefined,
	          max: undefined
	        },
	        format: function format(value) {
	          return "".concat(_parseFloat$2(value.toPrecision(3)));
	        },
	        title: {
	          text: undefined,
	          style: undefined
	        }
	      },
	      right: {
	        range: {
	          min: undefined,
	          max: undefined
	        },
	        format: function format(value) {
	          return "".concat(_parseFloat$2(value.toPrecision(3)));
	        },
	        title: {
	          text: undefined,
	          style: undefined
	        }
	      }
	    };
	    _this.linegraphOptions = linegraphOptions;
	    _this.linegraphSVG = svg;
	    _this.props = {};
	    _this.DOMelements = {
	      // dynamic elements
	      lines: {},
	      labels: {},
	      title: {}
	    };
	    _this.dom = {};
	    _this.scale = undefined;
	    _this.range = {
	      start: 0,
	      end: 0
	    };
	    _this.options = util$1.extend({}, _this.defaultOptions);
	    _this.conversionFactor = 1;

	    _this.setOptions(options);

	    _this.width = Number("".concat(_this.options.width).replace("px", ""));
	    _this.minWidth = _this.width;
	    _this.height = _this.linegraphSVG.getBoundingClientRect().height;
	    _this.hidden = false;
	    _this.stepPixels = 25;
	    _this.zeroCrossing = -1;
	    _this.amountOfSteps = -1;
	    _this.lineOffset = 0;
	    _this.master = true;
	    _this.masterAxis = null;
	    _this.svgElements = {};
	    _this.iconsRemoved = false;
	    _this.groups = {};
	    _this.amountOfGroups = 0; // create the HTML DOM

	    _this._create();

	    if (_this.scale == undefined) {
	      _this._redrawLabels();
	    }

	    _this.framework = {
	      svg: _this.svg,
	      svgElements: _this.svgElements,
	      options: _this.options,
	      groups: _this.groups
	    };

	    var me = assertThisInitialized(_this);

	    _this.body.emitter.on("verticalDrag", function () {
	      me.dom.lineContainer.style.top = "".concat(me.body.domProps.scrollTop, "px");
	    });

	    return _this;
	  }
	  /**
	   * Adds group to data axis
	   * @param {string} label 
	   * @param {object} graphOptions
	   */


	  createClass(DataAxis, [{
	    key: "addGroup",
	    value: function addGroup(label, graphOptions) {
	      if (!this.groups.hasOwnProperty(label)) {
	        this.groups[label] = graphOptions;
	      }

	      this.amountOfGroups += 1;
	    }
	    /**
	     * updates group of data axis
	     * @param {string} label 
	     * @param {object} graphOptions
	     */

	  }, {
	    key: "updateGroup",
	    value: function updateGroup(label, graphOptions) {
	      if (!this.groups.hasOwnProperty(label)) {
	        this.amountOfGroups += 1;
	      }

	      this.groups[label] = graphOptions;
	    }
	    /**
	     * removes group of data axis
	     * @param {string} label 
	     */

	  }, {
	    key: "removeGroup",
	    value: function removeGroup(label) {
	      if (this.groups.hasOwnProperty(label)) {
	        delete this.groups[label];
	        this.amountOfGroups -= 1;
	      }
	    }
	    /**
	     * sets options
	     * @param {object} options
	     */

	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options) {
	        var redraw = false;

	        if (this.options.orientation != options.orientation && options.orientation !== undefined) {
	          redraw = true;
	        }

	        var fields = ['orientation', 'showMinorLabels', 'showMajorLabels', 'icons', 'majorLinesOffset', 'minorLinesOffset', 'labelOffsetX', 'labelOffsetY', 'iconWidth', 'width', 'visible', 'left', 'right', 'alignZeros'];
	        util$1.selectiveDeepExtend(fields, this.options, options);
	        this.minWidth = Number("".concat(this.options.width).replace("px", ""));

	        if (redraw === true && this.dom.frame) {
	          this.hide();
	          this.show();
	        }
	      }
	    }
	    /**
	     * Create the HTML DOM for the DataAxis
	     */

	  }, {
	    key: "_create",
	    value: function _create() {
	      this.dom.frame = document.createElement('div');
	      this.dom.frame.style.width = this.options.width;
	      this.dom.frame.style.height = this.height;
	      this.dom.lineContainer = document.createElement('div');
	      this.dom.lineContainer.style.width = '100%';
	      this.dom.lineContainer.style.height = this.height;
	      this.dom.lineContainer.style.position = 'relative';
	      this.dom.lineContainer.style.visibility = 'visible';
	      this.dom.lineContainer.style.display = 'block'; // create svg element for graph drawing.

	      this.svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
	      this.svg.style.position = "absolute";
	      this.svg.style.top = '0px';
	      this.svg.style.height = '100%';
	      this.svg.style.width = '100%';
	      this.svg.style.display = "block";
	      this.dom.frame.appendChild(this.svg);
	    }
	    /**
	     * redraws groups icons
	     */

	  }, {
	    key: "_redrawGroupIcons",
	    value: function _redrawGroupIcons() {
	      prepareElements(this.svgElements);
	      var x;
	      var iconWidth = this.options.iconWidth;
	      var iconHeight = 15;
	      var iconOffset = 4;
	      var y = iconOffset + 0.5 * iconHeight;

	      if (this.options.orientation === 'left') {
	        x = iconOffset;
	      } else {
	        x = this.width - iconWidth - iconOffset;
	      }

	      var groupArray = keys$3(this.groups);

	      sort$2(groupArray).call(groupArray, function (a, b) {
	        return a < b ? -1 : 1;
	      });

	      var _iterator = _createForOfIteratorHelper$5(groupArray),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var groupId = _step.value;

	          if (this.groups[groupId].visible === true && (this.linegraphOptions.visibility[groupId] === undefined || this.linegraphOptions.visibility[groupId] === true)) {
	            this.groups[groupId].getLegend(iconWidth, iconHeight, this.framework, x, y);
	            y += iconHeight + iconOffset;
	          }
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }

	      cleanupElements(this.svgElements);
	      this.iconsRemoved = false;
	    }
	    /**
	     * Cleans up icons
	     */

	  }, {
	    key: "_cleanupIcons",
	    value: function _cleanupIcons() {
	      if (this.iconsRemoved === false) {
	        prepareElements(this.svgElements);
	        cleanupElements(this.svgElements);
	        this.iconsRemoved = true;
	      }
	    }
	    /**
	     * Create the HTML DOM for the DataAxis
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      this.hidden = false;

	      if (!this.dom.frame.parentNode) {
	        if (this.options.orientation === 'left') {
	          this.body.dom.left.appendChild(this.dom.frame);
	        } else {
	          this.body.dom.right.appendChild(this.dom.frame);
	        }
	      }

	      if (!this.dom.lineContainer.parentNode) {
	        this.body.dom.backgroundHorizontal.appendChild(this.dom.lineContainer);
	      }

	      this.dom.lineContainer.style.display = 'block';
	    }
	    /**
	     * Create the HTML DOM for the DataAxis
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      this.hidden = true;

	      if (this.dom.frame.parentNode) {
	        this.dom.frame.parentNode.removeChild(this.dom.frame);
	      }

	      this.dom.lineContainer.style.display = 'none';
	    }
	    /**
	     * Set a range (start and end)
	     * @param {number} start
	     * @param {number} end
	     */

	  }, {
	    key: "setRange",
	    value: function setRange(start, end) {
	      this.range.start = start;
	      this.range.end = end;
	    }
	    /**
	     * Repaint the component
	     * @return {boolean} Returns true if the component is resized
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      var resized = false;
	      var activeGroups = 0; // Make sure the line container adheres to the vertical scrolling.

	      this.dom.lineContainer.style.top = "".concat(this.body.domProps.scrollTop, "px");

	      for (var groupId in this.groups) {
	        if (this.groups.hasOwnProperty(groupId)) {
	          if (this.groups[groupId].visible === true && (this.linegraphOptions.visibility[groupId] === undefined || this.linegraphOptions.visibility[groupId] === true)) {
	            activeGroups++;
	          }
	        }
	      }

	      if (this.amountOfGroups === 0 || activeGroups === 0) {
	        this.hide();
	      } else {
	        this.show();
	        this.height = Number(this.linegraphSVG.style.height.replace("px", "")); // svg offsetheight did not work in firefox and explorer...

	        this.dom.lineContainer.style.height = "".concat(this.height, "px");
	        this.width = this.options.visible === true ? Number("".concat(this.options.width).replace("px", "")) : 0;
	        var props = this.props;
	        var frame = this.dom.frame; // update classname

	        frame.className = 'vis-data-axis'; // calculate character width and height

	        this._calculateCharSize();

	        var orientation = this.options.orientation;
	        var showMinorLabels = this.options.showMinorLabels;
	        var showMajorLabels = this.options.showMajorLabels;
	        var backgroundHorizontalOffsetWidth = this.body.dom.backgroundHorizontal.offsetWidth; // determine the width and height of the elements for the axis

	        props.minorLabelHeight = showMinorLabels ? props.minorCharHeight : 0;
	        props.majorLabelHeight = showMajorLabels ? props.majorCharHeight : 0;
	        props.minorLineWidth = backgroundHorizontalOffsetWidth - this.lineOffset - this.width + 2 * this.options.minorLinesOffset;
	        props.minorLineHeight = 1;
	        props.majorLineWidth = backgroundHorizontalOffsetWidth - this.lineOffset - this.width + 2 * this.options.majorLinesOffset;
	        props.majorLineHeight = 1; //  take frame offline while updating (is almost twice as fast)

	        if (orientation === 'left') {
	          frame.style.top = '0';
	          frame.style.left = '0';
	          frame.style.bottom = '';
	          frame.style.width = "".concat(this.width, "px");
	          frame.style.height = "".concat(this.height, "px");
	          this.props.width = this.body.domProps.left.width;
	          this.props.height = this.body.domProps.left.height;
	        } else {
	          // right
	          frame.style.top = '';
	          frame.style.bottom = '0';
	          frame.style.left = '0';
	          frame.style.width = "".concat(this.width, "px");
	          frame.style.height = "".concat(this.height, "px");
	          this.props.width = this.body.domProps.right.width;
	          this.props.height = this.body.domProps.right.height;
	        }

	        resized = this._redrawLabels();
	        resized = this._isResized() || resized;

	        if (this.options.icons === true) {
	          this._redrawGroupIcons();
	        } else {
	          this._cleanupIcons();
	        }

	        this._redrawTitle(orientation);
	      }

	      return resized;
	    }
	    /**
	     * Repaint major and minor text labels and vertical grid lines
	     *
	     * @returns {boolean}
	     * @private
	     */

	  }, {
	    key: "_redrawLabels",
	    value: function _redrawLabels() {
	      var _this2 = this;

	      var resized = false;
	      prepareElements(this.DOMelements.lines);
	      prepareElements(this.DOMelements.labels);
	      var orientation = this.options['orientation'];
	      var customRange = this.options[orientation].range != undefined ? this.options[orientation].range : {}; //Override range with manual options:

	      var autoScaleEnd = true;

	      if (customRange.max != undefined) {
	        this.range.end = customRange.max;
	        autoScaleEnd = false;
	      }

	      var autoScaleStart = true;

	      if (customRange.min != undefined) {
	        this.range.start = customRange.min;
	        autoScaleStart = false;
	      }

	      this.scale = new DataScale(this.range.start, this.range.end, autoScaleStart, autoScaleEnd, this.dom.frame.offsetHeight, this.props.majorCharHeight, this.options.alignZeros, this.options[orientation].format);

	      if (this.master === false && this.masterAxis != undefined) {
	        this.scale.followScale(this.masterAxis.scale);
	        this.dom.lineContainer.style.display = 'none';
	      } else {
	        this.dom.lineContainer.style.display = 'block';
	      } //Is updated in side-effect of _redrawLabel():


	      this.maxLabelSize = 0;
	      var lines = this.scale.getLines();

	      forEach$2(lines).call(lines, function (line) {
	        var y = line.y;
	        var isMajor = line.major;

	        if (_this2.options['showMinorLabels'] && isMajor === false) {
	          _this2._redrawLabel(y - 2, line.val, orientation, 'vis-y-axis vis-minor', _this2.props.minorCharHeight);
	        }

	        if (isMajor) {
	          if (y >= 0) {
	            _this2._redrawLabel(y - 2, line.val, orientation, 'vis-y-axis vis-major', _this2.props.majorCharHeight);
	          }
	        }

	        if (_this2.master === true) {
	          if (isMajor) {
	            _this2._redrawLine(y, orientation, 'vis-grid vis-horizontal vis-major', _this2.options.majorLinesOffset, _this2.props.majorLineWidth);
	          } else {
	            _this2._redrawLine(y, orientation, 'vis-grid vis-horizontal vis-minor', _this2.options.minorLinesOffset, _this2.props.minorLineWidth);
	          }
	        }
	      }); // Note that title is rotated, so we're using the height, not width!


	      var titleWidth = 0;

	      if (this.options[orientation].title !== undefined && this.options[orientation].title.text !== undefined) {
	        titleWidth = this.props.titleCharHeight;
	      }

	      var offset = this.options.icons === true ? Math.max(this.options.iconWidth, titleWidth) + this.options.labelOffsetX + 15 : titleWidth + this.options.labelOffsetX + 15; // this will resize the yAxis to accommodate the labels.

	      if (this.maxLabelSize > this.width - offset && this.options.visible === true) {
	        this.width = this.maxLabelSize + offset;
	        this.options.width = "".concat(this.width, "px");
	        cleanupElements(this.DOMelements.lines);
	        cleanupElements(this.DOMelements.labels);
	        this.redraw();
	        resized = true;
	      } // this will resize the yAxis if it is too big for the labels.
	      else if (this.maxLabelSize < this.width - offset && this.options.visible === true && this.width > this.minWidth) {
	          this.width = Math.max(this.minWidth, this.maxLabelSize + offset);
	          this.options.width = "".concat(this.width, "px");
	          cleanupElements(this.DOMelements.lines);
	          cleanupElements(this.DOMelements.labels);
	          this.redraw();
	          resized = true;
	        } else {
	          cleanupElements(this.DOMelements.lines);
	          cleanupElements(this.DOMelements.labels);
	          resized = false;
	        }

	      return resized;
	    }
	    /**
	     * converts value
	     * @param {number} value
	     * @returns {number} converted number
	     */

	  }, {
	    key: "convertValue",
	    value: function convertValue(value) {
	      return this.scale.convertValue(value);
	    }
	    /**
	     * converts value
	     * @param {number} x
	     * @returns {number} screen value
	     */

	  }, {
	    key: "screenToValue",
	    value: function screenToValue(x) {
	      return this.scale.screenToValue(x);
	    }
	    /**
	     * Create a label for the axis at position x
	     *
	     * @param {number} y
	     * @param {string} text
	     * @param {'top'|'right'|'bottom'|'left'} orientation
	     * @param {string} className
	     * @param {number} characterHeight
	     * @private
	     */

	  }, {
	    key: "_redrawLabel",
	    value: function _redrawLabel(y, text, orientation, className, characterHeight) {
	      // reuse redundant label
	      var label = getDOMElement('div', this.DOMelements.labels, this.dom.frame); //this.dom.redundant.labels.shift();

	      label.className = className;
	      label.innerHTML = text;

	      if (orientation === 'left') {
	        label.style.left = "-".concat(this.options.labelOffsetX, "px");
	        label.style.textAlign = "right";
	      } else {
	        label.style.right = "-".concat(this.options.labelOffsetX, "px");
	        label.style.textAlign = "left";
	      }

	      label.style.top = "".concat(y - 0.5 * characterHeight + this.options.labelOffsetY, "px");
	      text += '';
	      var largestWidth = Math.max(this.props.majorCharWidth, this.props.minorCharWidth);

	      if (this.maxLabelSize < text.length * largestWidth) {
	        this.maxLabelSize = text.length * largestWidth;
	      }
	    }
	    /**
	     * Create a minor line for the axis at position y
	     * @param {number} y
	     * @param {'top'|'right'|'bottom'|'left'} orientation
	     * @param {string} className
	     * @param {number} offset
	     * @param {number} width
	     */

	  }, {
	    key: "_redrawLine",
	    value: function _redrawLine(y, orientation, className, offset, width) {
	      if (this.master === true) {
	        var line = getDOMElement('div', this.DOMelements.lines, this.dom.lineContainer); //this.dom.redundant.lines.shift();

	        line.className = className;
	        line.innerHTML = '';

	        if (orientation === 'left') {
	          line.style.left = "".concat(this.width - offset, "px");
	        } else {
	          line.style.right = "".concat(this.width - offset, "px");
	        }

	        line.style.width = "".concat(width, "px");
	        line.style.top = "".concat(y, "px");
	      }
	    }
	    /**
	     * Create a title for the axis
	     * @private
	     * @param {'top'|'right'|'bottom'|'left'} orientation
	     */

	  }, {
	    key: "_redrawTitle",
	    value: function _redrawTitle(orientation) {
	      prepareElements(this.DOMelements.title); // Check if the title is defined for this axes

	      if (this.options[orientation].title !== undefined && this.options[orientation].title.text !== undefined) {
	        var title = getDOMElement('div', this.DOMelements.title, this.dom.frame);
	        title.className = "vis-y-axis vis-title vis-".concat(orientation);
	        title.innerHTML = this.options[orientation].title.text; // Add style - if provided

	        if (this.options[orientation].title.style !== undefined) {
	          util$1.addCssText(title, this.options[orientation].title.style);
	        }

	        if (orientation === 'left') {
	          title.style.left = "".concat(this.props.titleCharHeight, "px");
	        } else {
	          title.style.right = "".concat(this.props.titleCharHeight, "px");
	        }

	        title.style.width = "".concat(this.height, "px");
	      } // we need to clean up in case we did not use all elements.


	      cleanupElements(this.DOMelements.title);
	    }
	    /**
	     * Determine the size of text on the axis (both major and minor axis).
	     * The size is calculated only once and then cached in this.props.
	     * @private
	     */

	  }, {
	    key: "_calculateCharSize",
	    value: function _calculateCharSize() {
	      // determine the char width and height on the minor axis
	      if (!('minorCharHeight' in this.props)) {
	        var textMinor = document.createTextNode('0');
	        var measureCharMinor = document.createElement('div');
	        measureCharMinor.className = 'vis-y-axis vis-minor vis-measure';
	        measureCharMinor.appendChild(textMinor);
	        this.dom.frame.appendChild(measureCharMinor);
	        this.props.minorCharHeight = measureCharMinor.clientHeight;
	        this.props.minorCharWidth = measureCharMinor.clientWidth;
	        this.dom.frame.removeChild(measureCharMinor);
	      }

	      if (!('majorCharHeight' in this.props)) {
	        var textMajor = document.createTextNode('0');
	        var measureCharMajor = document.createElement('div');
	        measureCharMajor.className = 'vis-y-axis vis-major vis-measure';
	        measureCharMajor.appendChild(textMajor);
	        this.dom.frame.appendChild(measureCharMajor);
	        this.props.majorCharHeight = measureCharMajor.clientHeight;
	        this.props.majorCharWidth = measureCharMajor.clientWidth;
	        this.dom.frame.removeChild(measureCharMajor);
	      }

	      if (!('titleCharHeight' in this.props)) {
	        var textTitle = document.createTextNode('0');
	        var measureCharTitle = document.createElement('div');
	        measureCharTitle.className = 'vis-y-axis vis-title vis-measure';
	        measureCharTitle.appendChild(textTitle);
	        this.dom.frame.appendChild(measureCharTitle);
	        this.props.titleCharHeight = measureCharTitle.clientHeight;
	        this.props.titleCharWidth = measureCharTitle.clientWidth;
	        this.dom.frame.removeChild(measureCharTitle);
	      }
	    }
	  }]);

	  return DataAxis;
	}(Component);

	/**
	 *
	 * @param {number | string} groupId
	 * @param {Object} options   // TODO: Describe options
	 *
	 * @constructor Points
	 */

	function Points(groupId, options) {// eslint-disable-line no-unused-vars
	}
	/**
	 * draw the data points
	 *
	 * @param {Array} dataset
	 * @param {GraphGroup} group
	 * @param {Object} framework            | SVG DOM element
	 * @param {number} [offset]
	 */


	Points.draw = function (dataset, group, framework, offset) {
	  offset = offset || 0;
	  var callback = getCallback(framework, group);

	  for (var i = 0; i < dataset.length; i++) {
	    if (!callback) {
	      // draw the point the simple way.
	      drawPoint(dataset[i].screen_x + offset, dataset[i].screen_y, getGroupTemplate(group), framework.svgElements, framework.svg, dataset[i].label);
	    } else {
	      var callbackResult = callback(dataset[i], group); // result might be true, false or an object

	      if (callbackResult === true || _typeof_1(callbackResult) === 'object') {
	        drawPoint(dataset[i].screen_x + offset, dataset[i].screen_y, getGroupTemplate(group, callbackResult), framework.svgElements, framework.svg, dataset[i].label);
	      }
	    }
	  }
	};

	Points.drawIcon = function (group, x, y, iconWidth, iconHeight, framework) {
	  var fillHeight = iconHeight * 0.5;
	  var outline = getSVGElement("rect", framework.svgElements, framework.svg);
	  outline.setAttributeNS(null, "x", x);
	  outline.setAttributeNS(null, "y", y - fillHeight);
	  outline.setAttributeNS(null, "width", iconWidth);
	  outline.setAttributeNS(null, "height", 2 * fillHeight);
	  outline.setAttributeNS(null, "class", "vis-outline"); //Don't call callback on icon

	  drawPoint(x + 0.5 * iconWidth, y, getGroupTemplate(group), framework.svgElements, framework.svg);
	};
	/**
	 *
	 * @param {vis.Group} group
	 * @param {any} callbackResult
	 * @returns {{style: *, styles: (*|string), size: *, className: *}}
	 */


	function getGroupTemplate(group, callbackResult) {
	  callbackResult = typeof callbackResult === 'undefined' ? {} : callbackResult;
	  return {
	    style: callbackResult.style || group.options.drawPoints.style,
	    styles: callbackResult.styles || group.options.drawPoints.styles,
	    size: callbackResult.size || group.options.drawPoints.size,
	    className: callbackResult.className || group.className
	  };
	}
	/**
	 *
	 * @param {Object} framework            | SVG DOM element
	 * @param {vis.Group} group
	 * @returns {function}
	 */


	function getCallback(framework, group) {
	  var callback = undefined; // check for the graph2d onRender

	  if (framework.options && framework.options.drawPoints && framework.options.drawPoints.onRender && typeof framework.options.drawPoints.onRender == 'function') {
	    callback = framework.options.drawPoints.onRender;
	  } // override it with the group onRender if defined


	  if (group.group.options && group.group.options.drawPoints && group.group.options.drawPoints.onRender && typeof group.group.options.drawPoints.onRender == 'function') {
	    callback = group.group.options.drawPoints.onRender;
	  }

	  return callback;
	}

	/**
	 *
	 * @param {vis.GraphGroup.id} groupId
	 * @param {Object} options   // TODO: Describe options
	 * @constructor Bargraph
	 */

	function Bargraph(groupId, options) {// eslint-disable-line no-unused-vars
	}

	Bargraph.drawIcon = function (group, x, y, iconWidth, iconHeight, framework) {
	  var fillHeight = iconHeight * 0.5;
	  var outline = getSVGElement("rect", framework.svgElements, framework.svg);
	  outline.setAttributeNS(null, "x", x);
	  outline.setAttributeNS(null, "y", y - fillHeight);
	  outline.setAttributeNS(null, "width", iconWidth);
	  outline.setAttributeNS(null, "height", 2 * fillHeight);
	  outline.setAttributeNS(null, "class", "vis-outline");
	  var barWidth = Math.round(0.3 * iconWidth);
	  var originalWidth = group.options.barChart.width;
	  var scale = originalWidth / barWidth;
	  var bar1Height = Math.round(0.4 * iconHeight);
	  var bar2Height = Math.round(0.75 * iconHeight);
	  var offset = Math.round((iconWidth - 2 * barWidth) / 3);
	  drawBar(x + 0.5 * barWidth + offset, y + fillHeight - bar1Height - 1, barWidth, bar1Height, group.className + ' vis-bar', framework.svgElements, framework.svg, group.style);
	  drawBar(x + 1.5 * barWidth + offset + 2, y + fillHeight - bar2Height - 1, barWidth, bar2Height, group.className + ' vis-bar', framework.svgElements, framework.svg, group.style);

	  if (group.options.drawPoints.enabled == true) {
	    var groupTemplate = {
	      style: group.options.drawPoints.style,
	      styles: group.options.drawPoints.styles,
	      size: group.options.drawPoints.size / scale,
	      className: group.className
	    };
	    drawPoint(x + 0.5 * barWidth + offset, y + fillHeight - bar1Height - 1, groupTemplate, framework.svgElements, framework.svg);
	    drawPoint(x + 1.5 * barWidth + offset + 2, y + fillHeight - bar2Height - 1, groupTemplate, framework.svgElements, framework.svg);
	  }
	};
	/**
	 * draw a bar graph
	 *
	 * @param {Array.<vis.GraphGroup.id>} groupIds
	 * @param {Object} processedGroupData
	 * @param {{svg: Object, svgElements: Array.<Object>, options: Object, groups: Array.<vis.Group>}} framework
	 */


	Bargraph.draw = function (groupIds, processedGroupData, framework) {
	  var combinedData = [];
	  var intersections = {};
	  var coreDistance;
	  var key, drawData;
	  var group;
	  var i, j;
	  var barPoints = 0; // combine all barchart data

	  for (i = 0; i < groupIds.length; i++) {
	    group = framework.groups[groupIds[i]];

	    if (group.options.style === 'bar') {
	      if (group.visible === true && (framework.options.groups.visibility[groupIds[i]] === undefined || framework.options.groups.visibility[groupIds[i]] === true)) {
	        for (j = 0; j < processedGroupData[groupIds[i]].length; j++) {
	          combinedData.push({
	            screen_x: processedGroupData[groupIds[i]][j].screen_x,
	            screen_end: processedGroupData[groupIds[i]][j].screen_end,
	            screen_y: processedGroupData[groupIds[i]][j].screen_y,
	            x: processedGroupData[groupIds[i]][j].x,
	            end: processedGroupData[groupIds[i]][j].end,
	            y: processedGroupData[groupIds[i]][j].y,
	            groupId: groupIds[i],
	            label: processedGroupData[groupIds[i]][j].label
	          });
	          barPoints += 1;
	        }
	      }
	    }
	  }

	  if (barPoints === 0) {
	    return;
	  } // sort by time and by group


	  sort$2(combinedData).call(combinedData, function (a, b) {
	    if (a.screen_x === b.screen_x) {
	      return a.groupId < b.groupId ? -1 : 1;
	    } else {
	      return a.screen_x - b.screen_x;
	    }
	  }); // get intersections


	  Bargraph._getDataIntersections(intersections, combinedData); // plot barchart


	  for (i = 0; i < combinedData.length; i++) {
	    group = framework.groups[combinedData[i].groupId];
	    var minWidth = group.options.barChart.minWidth != undefined ? group.options.barChart.minWidth : 0.1 * group.options.barChart.width;
	    key = combinedData[i].screen_x;
	    var heightOffset = 0;

	    if (intersections[key] === undefined) {
	      if (i + 1 < combinedData.length) {
	        coreDistance = Math.abs(combinedData[i + 1].screen_x - key);
	      }

	      drawData = Bargraph._getSafeDrawData(coreDistance, group, minWidth);
	    } else {
	      var nextKey = i + (intersections[key].amount - intersections[key].resolved);

	      if (nextKey < combinedData.length) {
	        coreDistance = Math.abs(combinedData[nextKey].screen_x - key);
	      }

	      drawData = Bargraph._getSafeDrawData(coreDistance, group, minWidth);
	      intersections[key].resolved += 1;

	      if (group.options.stack === true && group.options.excludeFromStacking !== true) {
	        if (combinedData[i].screen_y < group.zeroPosition) {
	          heightOffset = intersections[key].accumulatedNegative;
	          intersections[key].accumulatedNegative += group.zeroPosition - combinedData[i].screen_y;
	        } else {
	          heightOffset = intersections[key].accumulatedPositive;
	          intersections[key].accumulatedPositive += group.zeroPosition - combinedData[i].screen_y;
	        }
	      } else if (group.options.barChart.sideBySide === true) {
	        drawData.width = drawData.width / intersections[key].amount;
	        drawData.offset += intersections[key].resolved * drawData.width - 0.5 * drawData.width * (intersections[key].amount + 1);
	      }
	    }

	    var dataWidth = drawData.width;
	    var start = combinedData[i].screen_x; // are we drawing explicit boxes? (we supplied an end value)

	    if (combinedData[i].screen_end != undefined) {
	      dataWidth = combinedData[i].screen_end - combinedData[i].screen_x;
	      start += dataWidth * 0.5;
	    } else {
	      start += drawData.offset;
	    }

	    drawBar(start, combinedData[i].screen_y - heightOffset, dataWidth, group.zeroPosition - combinedData[i].screen_y, group.className + ' vis-bar', framework.svgElements, framework.svg, group.style); // draw points

	    if (group.options.drawPoints.enabled === true) {
	      var pointData = {
	        screen_x: combinedData[i].screen_x,
	        screen_y: combinedData[i].screen_y - heightOffset,
	        x: combinedData[i].x,
	        y: combinedData[i].y,
	        groupId: combinedData[i].groupId,
	        label: combinedData[i].label
	      };
	      Points.draw([pointData], group, framework, drawData.offset); //DOMutil.drawPoint(combinedData[i].x + drawData.offset, combinedData[i].y, group, framework.svgElements, framework.svg);
	    }
	  }
	};
	/**
	 * Fill the intersections object with counters of how many datapoints share the same x coordinates
	 * @param {Object} intersections
	 * @param {Array.<Object>} combinedData
	 * @private
	 */


	Bargraph._getDataIntersections = function (intersections, combinedData) {
	  // get intersections
	  var coreDistance;

	  for (var i = 0; i < combinedData.length; i++) {
	    if (i + 1 < combinedData.length) {
	      coreDistance = Math.abs(combinedData[i + 1].screen_x - combinedData[i].screen_x);
	    }

	    if (i > 0) {
	      coreDistance = Math.min(coreDistance, Math.abs(combinedData[i - 1].screen_x - combinedData[i].screen_x));
	    }

	    if (coreDistance === 0) {
	      if (intersections[combinedData[i].screen_x] === undefined) {
	        intersections[combinedData[i].screen_x] = {
	          amount: 0,
	          resolved: 0,
	          accumulatedPositive: 0,
	          accumulatedNegative: 0
	        };
	      }

	      intersections[combinedData[i].screen_x].amount += 1;
	    }
	  }
	};
	/**
	 * Get the width and offset for bargraphs based on the coredistance between datapoints
	 *
	 * @param {number} coreDistance
	 * @param {vis.Group} group
	 * @param {number} minWidth
	 * @returns {{width: number, offset: number}}
	 * @private
	 */


	Bargraph._getSafeDrawData = function (coreDistance, group, minWidth) {
	  var width, offset;

	  if (coreDistance < group.options.barChart.width && coreDistance > 0) {
	    width = coreDistance < minWidth ? minWidth : coreDistance;
	    offset = 0; // recalculate offset with the new width;

	    if (group.options.barChart.align === 'left') {
	      offset -= 0.5 * coreDistance;
	    } else if (group.options.barChart.align === 'right') {
	      offset += 0.5 * coreDistance;
	    }
	  } else {
	    // default settings
	    width = group.options.barChart.width;
	    offset = 0;

	    if (group.options.barChart.align === 'left') {
	      offset -= 0.5 * group.options.barChart.width;
	    } else if (group.options.barChart.align === 'right') {
	      offset += 0.5 * group.options.barChart.width;
	    }
	  }

	  return {
	    width: width,
	    offset: offset
	  };
	};

	Bargraph.getStackedYRange = function (combinedData, groupRanges, groupIds, groupLabel, orientation) {
	  if (combinedData.length > 0) {
	    // sort by time and by group
	    sort$2(combinedData).call(combinedData, function (a, b) {
	      if (a.screen_x === b.screen_x) {
	        return a.groupId < b.groupId ? -1 : 1;
	      } else {
	        return a.screen_x - b.screen_x;
	      }
	    });

	    var intersections = {};

	    Bargraph._getDataIntersections(intersections, combinedData);

	    groupRanges[groupLabel] = Bargraph._getStackedYRange(intersections, combinedData);
	    groupRanges[groupLabel].yAxisOrientation = orientation;
	    groupIds.push(groupLabel);
	  }
	};

	Bargraph._getStackedYRange = function (intersections, combinedData) {
	  var key;
	  var yMin = combinedData[0].screen_y;
	  var yMax = combinedData[0].screen_y;

	  for (var i = 0; i < combinedData.length; i++) {
	    key = combinedData[i].screen_x;

	    if (intersections[key] === undefined) {
	      yMin = yMin > combinedData[i].screen_y ? combinedData[i].screen_y : yMin;
	      yMax = yMax < combinedData[i].screen_y ? combinedData[i].screen_y : yMax;
	    } else {
	      if (combinedData[i].screen_y < 0) {
	        intersections[key].accumulatedNegative += combinedData[i].screen_y;
	      } else {
	        intersections[key].accumulatedPositive += combinedData[i].screen_y;
	      }
	    }
	  }

	  for (var xpos in intersections) {
	    if (intersections.hasOwnProperty(xpos)) {
	      yMin = yMin > intersections[xpos].accumulatedNegative ? intersections[xpos].accumulatedNegative : yMin;
	      yMin = yMin > intersections[xpos].accumulatedPositive ? intersections[xpos].accumulatedPositive : yMin;
	      yMax = yMax < intersections[xpos].accumulatedNegative ? intersections[xpos].accumulatedNegative : yMax;
	      yMax = yMax < intersections[xpos].accumulatedPositive ? intersections[xpos].accumulatedPositive : yMax;
	    }
	  }

	  return {
	    min: yMin,
	    max: yMax
	  };
	};

	/**
	 *
	 * @param {vis.GraphGroup.id} groupId
	 * @param {Object} options   // TODO: Describe options
	 * @constructor Line
	 */

	function Line(groupId, options) {// eslint-disable-line no-unused-vars
	}

	Line.calcPath = function (dataset, group) {
	  if (dataset != null) {
	    if (dataset.length > 0) {
	      var d = []; // construct path from dataset

	      if (group.options.interpolation.enabled == true) {
	        d = Line._catmullRom(dataset, group);
	      } else {
	        d = Line._linear(dataset);
	      }

	      return d;
	    }
	  }
	};

	Line.drawIcon = function (group, x, y, iconWidth, iconHeight, framework) {
	  var fillHeight = iconHeight * 0.5;
	  var path, fillPath;
	  var outline = getSVGElement("rect", framework.svgElements, framework.svg);
	  outline.setAttributeNS(null, "x", x);
	  outline.setAttributeNS(null, "y", y - fillHeight);
	  outline.setAttributeNS(null, "width", iconWidth);
	  outline.setAttributeNS(null, "height", 2 * fillHeight);
	  outline.setAttributeNS(null, "class", "vis-outline");
	  path = getSVGElement("path", framework.svgElements, framework.svg);
	  path.setAttributeNS(null, "class", group.className);

	  if (group.style !== undefined) {
	    path.setAttributeNS(null, "style", group.style);
	  }

	  path.setAttributeNS(null, "d", "M" + x + "," + y + " L" + (x + iconWidth) + "," + y + "");

	  if (group.options.shaded.enabled == true) {
	    fillPath = getSVGElement("path", framework.svgElements, framework.svg);

	    if (group.options.shaded.orientation == 'top') {
	      fillPath.setAttributeNS(null, "d", "M" + x + ", " + (y - fillHeight) + "L" + x + "," + y + " L" + (x + iconWidth) + "," + y + " L" + (x + iconWidth) + "," + (y - fillHeight));
	    } else {
	      fillPath.setAttributeNS(null, "d", "M" + x + "," + y + " " + "L" + x + "," + (y + fillHeight) + " " + "L" + (x + iconWidth) + "," + (y + fillHeight) + "L" + (x + iconWidth) + "," + y);
	    }

	    fillPath.setAttributeNS(null, "class", group.className + " vis-icon-fill");

	    if (group.options.shaded.style !== undefined && group.options.shaded.style !== "") {
	      fillPath.setAttributeNS(null, "style", group.options.shaded.style);
	    }
	  }

	  if (group.options.drawPoints.enabled == true) {
	    var groupTemplate = {
	      style: group.options.drawPoints.style,
	      styles: group.options.drawPoints.styles,
	      size: group.options.drawPoints.size,
	      className: group.className
	    };
	    drawPoint(x + 0.5 * iconWidth, y, groupTemplate, framework.svgElements, framework.svg);
	  }
	};

	Line.drawShading = function (pathArray, group, subPathArray, framework) {
	  // append shading to the path
	  if (group.options.shaded.enabled == true) {
	    var svgHeight = Number(framework.svg.style.height.replace('px', ''));
	    var fillPath = getSVGElement('path', framework.svgElements, framework.svg);
	    var type = "L";

	    if (group.options.interpolation.enabled == true) {
	      type = "C";
	    }

	    var dFill;
	    var zero = 0;

	    if (group.options.shaded.orientation == 'top') {
	      zero = 0;
	    } else if (group.options.shaded.orientation == 'bottom') {
	      zero = svgHeight;
	    } else {
	      zero = Math.min(Math.max(0, group.zeroPosition), svgHeight);
	    }

	    if (group.options.shaded.orientation == 'group' && subPathArray != null && subPathArray != undefined) {
	      dFill = 'M' + pathArray[0][0] + "," + pathArray[0][1] + " " + this.serializePath(pathArray, type, false) + ' L' + subPathArray[subPathArray.length - 1][0] + "," + subPathArray[subPathArray.length - 1][1] + " " + this.serializePath(subPathArray, type, true) + subPathArray[0][0] + "," + subPathArray[0][1] + " Z";
	    } else {
	      dFill = 'M' + pathArray[0][0] + "," + pathArray[0][1] + " " + this.serializePath(pathArray, type, false) + ' V' + zero + ' H' + pathArray[0][0] + " Z";
	    }

	    fillPath.setAttributeNS(null, 'class', group.className + ' vis-fill');

	    if (group.options.shaded.style !== undefined) {
	      fillPath.setAttributeNS(null, 'style', group.options.shaded.style);
	    }

	    fillPath.setAttributeNS(null, 'd', dFill);
	  }
	};
	/**
	 * draw a line graph
	 *
	 * @param {Array.<Object>} pathArray
	 * @param {vis.Group} group
	 * @param {{svg: Object, svgElements: Array.<Object>, options: Object, groups: Array.<vis.Group>}} framework
	 */


	Line.draw = function (pathArray, group, framework) {
	  if (pathArray != null && pathArray != undefined) {
	    var path = getSVGElement('path', framework.svgElements, framework.svg);
	    path.setAttributeNS(null, "class", group.className);

	    if (group.style !== undefined) {
	      path.setAttributeNS(null, "style", group.style);
	    }

	    var type = "L";

	    if (group.options.interpolation.enabled == true) {
	      type = "C";
	    } // copy properties to path for drawing.


	    path.setAttributeNS(null, 'd', 'M' + pathArray[0][0] + "," + pathArray[0][1] + " " + this.serializePath(pathArray, type, false));
	  }
	};

	Line.serializePath = function (pathArray, type, inverse) {
	  if (pathArray.length < 2) {
	    //Too little data to create a path.
	    return "";
	  }

	  var d = type;
	  var i;

	  if (inverse) {
	    for (i = pathArray.length - 2; i > 0; i--) {
	      d += pathArray[i][0] + "," + pathArray[i][1] + " ";
	    }
	  } else {
	    for (i = 1; i < pathArray.length; i++) {
	      d += pathArray[i][0] + "," + pathArray[i][1] + " ";
	    }
	  }

	  return d;
	};
	/**
	 * This uses an uniform parametrization of the interpolation algorithm:
	 * 'On the Parameterization of Catmull-Rom Curves' by Cem Yuksel et al.
	 * @param {Array.<Object>} data
	 * @returns {string}
	 * @private
	 */


	Line._catmullRomUniform = function (data) {
	  // catmull rom
	  var p0, p1, p2, p3, bp1, bp2;
	  var d = [];
	  d.push([Math.round(data[0].screen_x), Math.round(data[0].screen_y)]);
	  var normalization = 1 / 6;
	  var length = data.length;

	  for (var i = 0; i < length - 1; i++) {
	    p0 = i == 0 ? data[0] : data[i - 1];
	    p1 = data[i];
	    p2 = data[i + 1];
	    p3 = i + 2 < length ? data[i + 2] : p2; // Catmull-Rom to Cubic Bezier conversion matrix
	    //    0       1       0       0
	    //  -1/6      1      1/6      0
	    //    0      1/6      1     -1/6
	    //    0       0       1       0
	    //    bp0 = { x: p1.x,                               y: p1.y };

	    bp1 = {
	      screen_x: (-p0.screen_x + 6 * p1.screen_x + p2.screen_x) * normalization,
	      screen_y: (-p0.screen_y + 6 * p1.screen_y + p2.screen_y) * normalization
	    };
	    bp2 = {
	      screen_x: (p1.screen_x + 6 * p2.screen_x - p3.screen_x) * normalization,
	      screen_y: (p1.screen_y + 6 * p2.screen_y - p3.screen_y) * normalization
	    }; //    bp0 = { x: p2.x,                               y: p2.y };

	    d.push([bp1.screen_x, bp1.screen_y]);
	    d.push([bp2.screen_x, bp2.screen_y]);
	    d.push([p2.screen_x, p2.screen_y]);
	  }

	  return d;
	};
	/**
	 * This uses either the chordal or centripetal parameterization of the catmull-rom algorithm.
	 * By default, the centripetal parameterization is used because this gives the nicest results.
	 * These parameterizations are relatively heavy because the distance between 4 points have to be calculated.
	 *
	 * One optimization can be used to reuse distances since this is a sliding window approach.
	 * @param {Array.<Object>} data
	 * @param {vis.GraphGroup} group
	 * @returns {string}
	 * @private
	 */


	Line._catmullRom = function (data, group) {
	  var alpha = group.options.interpolation.alpha;

	  if (alpha == 0 || alpha === undefined) {
	    return this._catmullRomUniform(data);
	  } else {
	    var p0, p1, p2, p3, bp1, bp2, d1, d2, d3, A, B, N, M;
	    var d3powA, d2powA, d3pow2A, d2pow2A, d1pow2A, d1powA;
	    var d = [];
	    d.push([Math.round(data[0].screen_x), Math.round(data[0].screen_y)]);
	    var length = data.length;

	    for (var i = 0; i < length - 1; i++) {
	      p0 = i == 0 ? data[0] : data[i - 1];
	      p1 = data[i];
	      p2 = data[i + 1];
	      p3 = i + 2 < length ? data[i + 2] : p2;
	      d1 = Math.sqrt(Math.pow(p0.screen_x - p1.screen_x, 2) + Math.pow(p0.screen_y - p1.screen_y, 2));
	      d2 = Math.sqrt(Math.pow(p1.screen_x - p2.screen_x, 2) + Math.pow(p1.screen_y - p2.screen_y, 2));
	      d3 = Math.sqrt(Math.pow(p2.screen_x - p3.screen_x, 2) + Math.pow(p2.screen_y - p3.screen_y, 2)); // Catmull-Rom to Cubic Bezier conversion matrix
	      // A = 2d1^2a + 3d1^a * d2^a + d3^2a
	      // B = 2d3^2a + 3d3^a * d2^a + d2^2a
	      // [   0             1            0          0          ]
	      // [   -d2^2a /N     A/N          d1^2a /N   0          ]
	      // [   0             d3^2a /M     B/M        -d2^2a /M  ]
	      // [   0             0            1          0          ]

	      d3powA = Math.pow(d3, alpha);
	      d3pow2A = Math.pow(d3, 2 * alpha);
	      d2powA = Math.pow(d2, alpha);
	      d2pow2A = Math.pow(d2, 2 * alpha);
	      d1powA = Math.pow(d1, alpha);
	      d1pow2A = Math.pow(d1, 2 * alpha);
	      A = 2 * d1pow2A + 3 * d1powA * d2powA + d2pow2A;
	      B = 2 * d3pow2A + 3 * d3powA * d2powA + d2pow2A;
	      N = 3 * d1powA * (d1powA + d2powA);

	      if (N > 0) {
	        N = 1 / N;
	      }

	      M = 3 * d3powA * (d3powA + d2powA);

	      if (M > 0) {
	        M = 1 / M;
	      }

	      bp1 = {
	        screen_x: (-d2pow2A * p0.screen_x + A * p1.screen_x + d1pow2A * p2.screen_x) * N,
	        screen_y: (-d2pow2A * p0.screen_y + A * p1.screen_y + d1pow2A * p2.screen_y) * N
	      };
	      bp2 = {
	        screen_x: (d3pow2A * p1.screen_x + B * p2.screen_x - d2pow2A * p3.screen_x) * M,
	        screen_y: (d3pow2A * p1.screen_y + B * p2.screen_y - d2pow2A * p3.screen_y) * M
	      };

	      if (bp1.screen_x == 0 && bp1.screen_y == 0) {
	        bp1 = p1;
	      }

	      if (bp2.screen_x == 0 && bp2.screen_y == 0) {
	        bp2 = p2;
	      }

	      d.push([bp1.screen_x, bp1.screen_y]);
	      d.push([bp2.screen_x, bp2.screen_y]);
	      d.push([p2.screen_x, p2.screen_y]);
	    }

	    return d;
	  }
	};
	/**
	 * this generates the SVG path for a linear drawing between datapoints.
	 * @param {Array.<Object>} data
	 * @returns {string}
	 * @private
	 */


	Line._linear = function (data) {
	  // linear
	  var d = [];

	  for (var i = 0; i < data.length; i++) {
	    d.push([data[i].screen_x, data[i].screen_y]);
	  }

	  return d;
	};

	/**
	 * /**
	 * @param {object} group            | the object of the group from the dataset
	 * @param {string} groupId          | ID of the group
	 * @param {object} options          | the default options
	 * @param {array} groupsUsingDefaultStyles  | this array has one entree.
	 *                                            It is passed as an array so it is passed by reference.
	 *                                            It enumerates through the default styles
	 * @constructor GraphGroup
	 */

	function GraphGroup(group, groupId, options, groupsUsingDefaultStyles) {
	  this.id = groupId;
	  var fields = ['sampling', 'style', 'sort', 'yAxisOrientation', 'barChart', 'drawPoints', 'shaded', 'interpolation', 'zIndex', 'excludeFromStacking', 'excludeFromLegend'];
	  this.options = util$1.selectiveBridgeObject(fields, options);
	  this.usingDefaultStyle = group.className === undefined;
	  this.groupsUsingDefaultStyles = groupsUsingDefaultStyles;
	  this.zeroPosition = 0;
	  this.update(group);

	  if (this.usingDefaultStyle == true) {
	    this.groupsUsingDefaultStyles[0] += 1;
	  }

	  this.itemsData = [];
	  this.visible = group.visible === undefined ? true : group.visible;
	}
	/**
	 * this loads a reference to all items in this group into this group.
	 * @param {array} items
	 */


	GraphGroup.prototype.setItems = function (items) {
	  if (items != null) {
	    this.itemsData = items;

	    if (sort$2(this.options) == true) {
	      util$1.insertSort(this.itemsData, function (a, b) {
	        return a.x > b.x ? 1 : -1;
	      });
	    }
	  } else {
	    this.itemsData = [];
	  }
	};

	GraphGroup.prototype.getItems = function () {
	  return this.itemsData;
	};
	/**
	 * this is used for barcharts and shading, this way, we only have to calculate it once.
	 * @param {number} pos
	 */


	GraphGroup.prototype.setZeroPosition = function (pos) {
	  this.zeroPosition = pos;
	};
	/**
	 * set the options of the graph group over the default options.
	 * @param {Object} options
	 */


	GraphGroup.prototype.setOptions = function (options) {
	  if (options !== undefined) {
	    var fields = ['sampling', 'style', 'sort', 'yAxisOrientation', 'barChart', 'zIndex', 'excludeFromStacking', 'excludeFromLegend'];
	    util$1.selectiveDeepExtend(fields, this.options, options); // if the group's drawPoints is a function delegate the callback to the onRender property

	    if (typeof options.drawPoints == 'function') {
	      options.drawPoints = {
	        onRender: options.drawPoints
	      };
	    }

	    util$1.mergeOptions(this.options, options, 'interpolation');
	    util$1.mergeOptions(this.options, options, 'drawPoints');
	    util$1.mergeOptions(this.options, options, 'shaded');

	    if (options.interpolation) {
	      if (_typeof_1(options.interpolation) == 'object') {
	        if (options.interpolation.parametrization) {
	          if (options.interpolation.parametrization == 'uniform') {
	            this.options.interpolation.alpha = 0;
	          } else if (options.interpolation.parametrization == 'chordal') {
	            this.options.interpolation.alpha = 1.0;
	          } else {
	            this.options.interpolation.parametrization = 'centripetal';
	            this.options.interpolation.alpha = 0.5;
	          }
	        }
	      }
	    }
	  }
	};
	/**
	 * this updates the current group class with the latest group dataset entree, used in _updateGroup in linegraph
	 * @param {vis.Group} group
	 */


	GraphGroup.prototype.update = function (group) {
	  this.group = group;
	  this.content = group.content || 'graph';
	  this.className = group.className || this.className || 'vis-graph-group' + this.groupsUsingDefaultStyles[0] % 10;
	  this.visible = group.visible === undefined ? true : group.visible;
	  this.style = group.style;
	  this.setOptions(group.options);
	};
	/**
	 * return the legend entree for this group.
	 *
	 * @param {number} iconWidth
	 * @param {number} iconHeight
	 * @param {{svg: (*|Element), svgElements: Object, options: Object, groups: Array.<Object>}} framework
	 * @param {number} x
	 * @param {number} y
	 * @returns {{icon: (*|Element), label: (*|string), orientation: *}}
	 */


	GraphGroup.prototype.getLegend = function (iconWidth, iconHeight, framework, x, y) {
	  if (framework == undefined || framework == null) {
	    var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
	    framework = {
	      svg: svg,
	      svgElements: {},
	      options: this.options,
	      groups: [this]
	    };
	  }

	  if (x == undefined || x == null) {
	    x = 0;
	  }

	  if (y == undefined || y == null) {
	    y = 0.5 * iconHeight;
	  }

	  switch (this.options.style) {
	    case "line":
	      Line.drawIcon(this, x, y, iconWidth, iconHeight, framework);
	      break;

	    case "points": //explicit no break

	    case "point":
	      Points.drawIcon(this, x, y, iconWidth, iconHeight, framework);
	      break;

	    case "bar":
	      Bargraph.drawIcon(this, x, y, iconWidth, iconHeight, framework);
	      break;
	  }

	  return {
	    icon: framework.svg,
	    label: this.content,
	    orientation: this.options.yAxisOrientation
	  };
	};

	GraphGroup.prototype.getYRange = function (groupData) {
	  var yMin = groupData[0].y;
	  var yMax = groupData[0].y;

	  for (var j = 0; j < groupData.length; j++) {
	    yMin = yMin > groupData[j].y ? groupData[j].y : yMin;
	    yMax = yMax < groupData[j].y ? groupData[j].y : yMax;
	  }

	  return {
	    min: yMin,
	    max: yMax,
	    yAxisOrientation: this.options.yAxisOrientation
	  };
	};

	/**
	 * Legend for Graph2d
	 *
	 * @param {vis.Graph2d.body} body
	 * @param {vis.Graph2d.options} options
	 * @param {number} side
	 * @param {vis.LineGraph.options} linegraphOptions
	 * @constructor Legend
	 * @extends Component
	 */

	function Legend(body, options, side, linegraphOptions) {
	  this.body = body;
	  this.defaultOptions = {
	    enabled: false,
	    icons: true,
	    iconSize: 20,
	    iconSpacing: 6,
	    left: {
	      visible: true,
	      position: 'top-left' // top/bottom - left,center,right

	    },
	    right: {
	      visible: true,
	      position: 'top-right' // top/bottom - left,center,right

	    }
	  };
	  this.side = side;
	  this.options = util$1.extend({}, this.defaultOptions);
	  this.linegraphOptions = linegraphOptions;
	  this.svgElements = {};
	  this.dom = {};
	  this.groups = {};
	  this.amountOfGroups = 0;

	  this._create();

	  this.framework = {
	    svg: this.svg,
	    svgElements: this.svgElements,
	    options: this.options,
	    groups: this.groups
	  };
	  this.setOptions(options);
	}

	Legend.prototype = new Component();

	Legend.prototype.clear = function () {
	  this.groups = {};
	  this.amountOfGroups = 0;
	};

	Legend.prototype.addGroup = function (label, graphOptions) {
	  // Include a group only if the group option 'excludeFromLegend: false' is not set.
	  if (graphOptions.options.excludeFromLegend != true) {
	    if (!this.groups.hasOwnProperty(label)) {
	      this.groups[label] = graphOptions;
	    }

	    this.amountOfGroups += 1;
	  }
	};

	Legend.prototype.updateGroup = function (label, graphOptions) {
	  this.groups[label] = graphOptions;
	};

	Legend.prototype.removeGroup = function (label) {
	  if (this.groups.hasOwnProperty(label)) {
	    delete this.groups[label];
	    this.amountOfGroups -= 1;
	  }
	};

	Legend.prototype._create = function () {
	  this.dom.frame = document.createElement('div');
	  this.dom.frame.className = 'vis-legend';
	  this.dom.frame.style.position = "absolute";
	  this.dom.frame.style.top = "10px";
	  this.dom.frame.style.display = "block";
	  this.dom.textArea = document.createElement('div');
	  this.dom.textArea.className = 'vis-legend-text';
	  this.dom.textArea.style.position = "relative";
	  this.dom.textArea.style.top = "0px";
	  this.svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
	  this.svg.style.position = 'absolute';
	  this.svg.style.top = 0 + 'px';
	  this.svg.style.width = this.options.iconSize + 5 + 'px';
	  this.svg.style.height = '100%';
	  this.dom.frame.appendChild(this.svg);
	  this.dom.frame.appendChild(this.dom.textArea);
	};
	/**
	 * Hide the component from the DOM
	 */


	Legend.prototype.hide = function () {
	  // remove the frame containing the items
	  if (this.dom.frame.parentNode) {
	    this.dom.frame.parentNode.removeChild(this.dom.frame);
	  }
	};
	/**
	 * Show the component in the DOM (when not already visible).
	 */


	Legend.prototype.show = function () {
	  // show frame containing the items
	  if (!this.dom.frame.parentNode) {
	    this.body.dom.center.appendChild(this.dom.frame);
	  }
	};

	Legend.prototype.setOptions = function (options) {
	  var fields = ['enabled', 'orientation', 'icons', 'left', 'right'];
	  util$1.selectiveDeepExtend(fields, this.options, options);
	};

	Legend.prototype.redraw = function () {
	  var activeGroups = 0;

	  var groupArray = keys$3(this.groups);

	  sort$2(groupArray).call(groupArray, function (a, b) {
	    return a < b ? -1 : 1;
	  });

	  for (var i = 0; i < groupArray.length; i++) {
	    var groupId = groupArray[i];

	    if (this.groups[groupId].visible == true && (this.linegraphOptions.visibility[groupId] === undefined || this.linegraphOptions.visibility[groupId] == true)) {
	      activeGroups++;
	    }
	  }

	  if (this.options[this.side].visible == false || this.amountOfGroups == 0 || this.options.enabled == false || activeGroups == 0) {
	    this.hide();
	  } else {
	    this.show();

	    if (this.options[this.side].position == 'top-left' || this.options[this.side].position == 'bottom-left') {
	      this.dom.frame.style.left = '4px';
	      this.dom.frame.style.textAlign = "left";
	      this.dom.textArea.style.textAlign = "left";
	      this.dom.textArea.style.left = this.options.iconSize + 15 + 'px';
	      this.dom.textArea.style.right = '';
	      this.svg.style.left = 0 + 'px';
	      this.svg.style.right = '';
	    } else {
	      this.dom.frame.style.right = '4px';
	      this.dom.frame.style.textAlign = "right";
	      this.dom.textArea.style.textAlign = "right";
	      this.dom.textArea.style.right = this.options.iconSize + 15 + 'px';
	      this.dom.textArea.style.left = '';
	      this.svg.style.right = 0 + 'px';
	      this.svg.style.left = '';
	    }

	    if (this.options[this.side].position == 'top-left' || this.options[this.side].position == 'top-right') {
	      this.dom.frame.style.top = 4 - Number(this.body.dom.center.style.top.replace("px", "")) + 'px';
	      this.dom.frame.style.bottom = '';
	    } else {
	      var scrollableHeight = this.body.domProps.center.height - this.body.domProps.centerContainer.height;
	      this.dom.frame.style.bottom = 4 + scrollableHeight + Number(this.body.dom.center.style.top.replace("px", "")) + 'px';
	      this.dom.frame.style.top = '';
	    }

	    if (this.options.icons == false) {
	      this.dom.frame.style.width = this.dom.textArea.offsetWidth + 10 + 'px';
	      this.dom.textArea.style.right = '';
	      this.dom.textArea.style.left = '';
	      this.svg.style.width = '0px';
	    } else {
	      this.dom.frame.style.width = this.options.iconSize + 15 + this.dom.textArea.offsetWidth + 10 + 'px';
	      this.drawLegendIcons();
	    }

	    var content = '';

	    for (i = 0; i < groupArray.length; i++) {
	      groupId = groupArray[i];

	      if (this.groups[groupId].visible == true && (this.linegraphOptions.visibility[groupId] === undefined || this.linegraphOptions.visibility[groupId] == true)) {
	        content += this.groups[groupId].content + '<br />';
	      }
	    }

	    this.dom.textArea.innerHTML = content;
	    this.dom.textArea.style.lineHeight = 0.75 * this.options.iconSize + this.options.iconSpacing + 'px';
	  }
	};

	Legend.prototype.drawLegendIcons = function () {
	  if (this.dom.frame.parentNode) {
	    var groupArray = keys$3(this.groups);

	    sort$2(groupArray).call(groupArray, function (a, b) {
	      return a < b ? -1 : 1;
	    }); // this resets the elements so the order is maintained


	    resetElements(this.svgElements);
	    var padding = window.getComputedStyle(this.dom.frame).paddingTop;
	    var iconOffset = Number(padding.replace('px', ''));
	    var x = iconOffset;
	    var iconWidth = this.options.iconSize;
	    var iconHeight = 0.75 * this.options.iconSize;
	    var y = iconOffset + 0.5 * iconHeight + 3;
	    this.svg.style.width = iconWidth + 5 + iconOffset + 'px';

	    for (var i = 0; i < groupArray.length; i++) {
	      var groupId = groupArray[i];

	      if (this.groups[groupId].visible == true && (this.linegraphOptions.visibility[groupId] === undefined || this.linegraphOptions.visibility[groupId] == true)) {
	        this.groups[groupId].getLegend(iconWidth, iconHeight, this.framework, x, y);
	        y += iconHeight + this.options.iconSpacing;
	      }
	    }
	  }
	};

	var UNGROUPED$3 = '__ungrouped__'; // reserved group id for ungrouped items

	/**
	 * This is the constructor of the LineGraph. It requires a Timeline body and options.
	 *
	 * @param {vis.Timeline.body} body
	 * @param {Object} options
	 * @constructor LineGraph
	 * @extends Component
	 */

	function LineGraph(body, options) {
	  this.id = v4();
	  this.body = body;
	  this.defaultOptions = {
	    yAxisOrientation: 'left',
	    defaultGroup: 'default',
	    sort: true,
	    sampling: true,
	    stack: false,
	    graphHeight: '400px',
	    shaded: {
	      enabled: false,
	      orientation: 'bottom' // top, bottom, zero

	    },
	    style: 'line',
	    // line, bar
	    barChart: {
	      width: 50,
	      sideBySide: false,
	      align: 'center' // left, center, right

	    },
	    interpolation: {
	      enabled: true,
	      parametrization: 'centripetal',
	      // uniform (alpha = 0.0), chordal (alpha = 1.0), centripetal (alpha = 0.5)
	      alpha: 0.5
	    },
	    drawPoints: {
	      enabled: true,
	      size: 6,
	      style: 'square' // square, circle

	    },
	    dataAxis: {},
	    //Defaults are done on DataAxis level
	    legend: {},
	    //Defaults are done on Legend level
	    groups: {
	      visibility: {}
	    }
	  }; // options is shared by this lineGraph and all its items

	  this.options = util$1.extend({}, this.defaultOptions);
	  this.dom = {};
	  this.props = {};
	  this.hammer = null;
	  this.groups = {};
	  this.abortedGraphUpdate = false;
	  this.updateSVGheight = false;
	  this.updateSVGheightOnResize = false;
	  this.forceGraphUpdate = true;
	  var me = this;
	  this.itemsData = null; // DataSet

	  this.groupsData = null; // DataSet
	  // listeners for the DataSet of the items

	  this.itemListeners = {
	    'add': function add(event, params, senderId) {
	      // eslint-disable-line no-unused-vars
	      me._onAdd(params.items);
	    },
	    'update': function update(event, params, senderId) {
	      // eslint-disable-line no-unused-vars
	      me._onUpdate(params.items);
	    },
	    'remove': function remove(event, params, senderId) {
	      // eslint-disable-line no-unused-vars
	      me._onRemove(params.items);
	    }
	  }; // listeners for the DataSet of the groups

	  this.groupListeners = {
	    'add': function add(event, params, senderId) {
	      // eslint-disable-line no-unused-vars
	      me._onAddGroups(params.items);
	    },
	    'update': function update(event, params, senderId) {
	      // eslint-disable-line no-unused-vars
	      me._onUpdateGroups(params.items);
	    },
	    'remove': function remove(event, params, senderId) {
	      // eslint-disable-line no-unused-vars
	      me._onRemoveGroups(params.items);
	    }
	  };
	  this.items = {}; // object with an Item for every data item

	  this.selection = []; // list with the ids of all selected nodes

	  this.lastStart = this.body.range.start;
	  this.touchParams = {}; // stores properties while dragging

	  this.svgElements = {};
	  this.setOptions(options);
	  this.groupsUsingDefaultStyles = [0];
	  this.body.emitter.on('rangechanged', function () {
	    me.svg.style.left = util$1.option.asSize(-me.props.width);
	    me.forceGraphUpdate = true; //Is this local redraw necessary? (Core also does a change event!)

	    me.redraw.call(me);
	  }); // create the HTML DOM

	  this._create();

	  this.framework = {
	    svg: this.svg,
	    svgElements: this.svgElements,
	    options: this.options,
	    groups: this.groups
	  };
	}

	LineGraph.prototype = new Component();
	/**
	 * Create the HTML DOM for the ItemSet
	 */

	LineGraph.prototype._create = function () {
	  var frame = document.createElement('div');
	  frame.className = 'vis-line-graph';
	  this.dom.frame = frame; // create svg element for graph drawing.

	  this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	  this.svg.style.position = 'relative';
	  this.svg.style.height = ('' + this.options.graphHeight).replace('px', '') + 'px';
	  this.svg.style.display = 'block';
	  frame.appendChild(this.svg); // data axis

	  this.options.dataAxis.orientation = 'left';
	  this.yAxisLeft = new DataAxis(this.body, this.options.dataAxis, this.svg, this.options.groups);
	  this.options.dataAxis.orientation = 'right';
	  this.yAxisRight = new DataAxis(this.body, this.options.dataAxis, this.svg, this.options.groups);
	  delete this.options.dataAxis.orientation; // legends

	  this.legendLeft = new Legend(this.body, this.options.legend, 'left', this.options.groups);
	  this.legendRight = new Legend(this.body, this.options.legend, 'right', this.options.groups);
	  this.show();
	};
	/**
	 * set the options of the LineGraph. the mergeOptions is used for subObjects that have an enabled element.
	 * @param {object} options
	 */


	LineGraph.prototype.setOptions = function (options) {
	  if (options) {
	    var fields = ['sampling', 'defaultGroup', 'stack', 'height', 'graphHeight', 'yAxisOrientation', 'style', 'barChart', 'dataAxis', 'sort', 'groups'];

	    if (options.graphHeight === undefined && options.height !== undefined) {
	      this.updateSVGheight = true;
	      this.updateSVGheightOnResize = true;
	    } else if (this.body.domProps.centerContainer.height !== undefined && options.graphHeight !== undefined) {
	      if (_parseInt$2((options.graphHeight + '').replace("px", '')) < this.body.domProps.centerContainer.height) {
	        this.updateSVGheight = true;
	      }
	    }

	    util$1.selectiveDeepExtend(fields, this.options, options);
	    util$1.mergeOptions(this.options, options, 'interpolation');
	    util$1.mergeOptions(this.options, options, 'drawPoints');
	    util$1.mergeOptions(this.options, options, 'shaded');
	    util$1.mergeOptions(this.options, options, 'legend');

	    if (options.interpolation) {
	      if (_typeof_1(options.interpolation) == 'object') {
	        if (options.interpolation.parametrization) {
	          if (options.interpolation.parametrization == 'uniform') {
	            this.options.interpolation.alpha = 0;
	          } else if (options.interpolation.parametrization == 'chordal') {
	            this.options.interpolation.alpha = 1.0;
	          } else {
	            this.options.interpolation.parametrization = 'centripetal';
	            this.options.interpolation.alpha = 0.5;
	          }
	        }
	      }
	    }

	    if (this.yAxisLeft) {
	      if (options.dataAxis !== undefined) {
	        this.yAxisLeft.setOptions(this.options.dataAxis);
	        this.yAxisRight.setOptions(this.options.dataAxis);
	      }
	    }

	    if (this.legendLeft) {
	      if (options.legend !== undefined) {
	        this.legendLeft.setOptions(this.options.legend);
	        this.legendRight.setOptions(this.options.legend);
	      }
	    }

	    if (this.groups.hasOwnProperty(UNGROUPED$3)) {
	      this.groups[UNGROUPED$3].setOptions(options);
	    }
	  } // this is used to redraw the graph if the visibility of the groups is changed.


	  if (this.dom.frame) {
	    //not on initial run?
	    this.forceGraphUpdate = true;
	    this.body.emitter.emit("_change", {
	      queue: true
	    });
	  }
	};
	/**
	 * Hide the component from the DOM
	 */


	LineGraph.prototype.hide = function () {
	  // remove the frame containing the items
	  if (this.dom.frame.parentNode) {
	    this.dom.frame.parentNode.removeChild(this.dom.frame);
	  }
	};
	/**
	 * Show the component in the DOM (when not already visible).
	 */


	LineGraph.prototype.show = function () {
	  // show frame containing the items
	  if (!this.dom.frame.parentNode) {
	    this.body.dom.center.appendChild(this.dom.frame);
	  }
	};
	/**
	 * Set items
	 * @param {vis.DataSet | null} items
	 */


	LineGraph.prototype.setItems = function (items) {
	  var me = this,
	      ids,
	      oldItemsData = this.itemsData; // replace the dataset

	  if (!items) {
	    this.itemsData = null;
	  } else if (esnext.isDataViewLike("id", items)) {
	    this.itemsData = typeCoerceDataSet(items);
	  } else {
	    throw new TypeError('Data must implement the interface of DataSet or DataView');
	  }

	  if (oldItemsData) {
	    // unsubscribe from old dataset
	    forEach$2(util$1).call(util$1, this.itemListeners, function (callback, event) {
	      oldItemsData.off(event, callback);
	    }); // stop maintaining a coerced version of the old data set


	    oldItemsData.dispose(); // remove all drawn items

	    ids = oldItemsData.getIds();

	    this._onRemove(ids);
	  }

	  if (this.itemsData) {
	    // subscribe to new dataset
	    var id = this.id;

	    forEach$2(util$1).call(util$1, this.itemListeners, function (callback, event) {
	      me.itemsData.on(event, callback, id);
	    }); // add all new items


	    ids = this.itemsData.getIds();

	    this._onAdd(ids);
	  }
	};
	/**
	 * Set groups
	 * @param {vis.DataSet} groups
	 */


	LineGraph.prototype.setGroups = function (groups) {
	  var me = this;
	  var ids; // unsubscribe from current dataset

	  if (this.groupsData) {
	    forEach$2(util$1).call(util$1, this.groupListeners, function (callback, event) {
	      me.groupsData.off(event, callback);
	    }); // remove all drawn groups


	    ids = this.groupsData.getIds();
	    this.groupsData = null;

	    for (var i = 0; i < ids.length; i++) {
	      this._removeGroup(ids[i]);
	    }
	  } // replace the dataset


	  if (!groups) {
	    this.groupsData = null;
	  } else if (esnext.isDataViewLike("id", groups)) {
	    this.groupsData = groups;
	  } else {
	    throw new TypeError('Data must implement the interface of DataSet or DataView');
	  }

	  if (this.groupsData) {
	    // subscribe to new dataset
	    var id = this.id;

	    forEach$2(util$1).call(util$1, this.groupListeners, function (callback, event) {
	      me.groupsData.on(event, callback, id);
	    }); // draw all ms


	    ids = this.groupsData.getIds();

	    this._onAddGroups(ids);
	  }
	};

	LineGraph.prototype._onUpdate = function (ids) {
	  this._updateAllGroupData(ids);
	};

	LineGraph.prototype._onAdd = function (ids) {
	  this._onUpdate(ids);
	};

	LineGraph.prototype._onRemove = function (ids) {
	  this._onUpdate(ids);
	};

	LineGraph.prototype._onUpdateGroups = function (groupIds) {
	  this._updateAllGroupData(null, groupIds);
	};

	LineGraph.prototype._onAddGroups = function (groupIds) {
	  this._onUpdateGroups(groupIds);
	};
	/**
	 * this cleans the group out off the legends and the dataaxis, updates the ungrouped and updates the graph
	 * @param {Array} groupIds
	 * @private
	 */


	LineGraph.prototype._onRemoveGroups = function (groupIds) {
	  for (var i = 0; i < groupIds.length; i++) {
	    this._removeGroup(groupIds[i]);
	  }

	  this.forceGraphUpdate = true;
	  this.body.emitter.emit("_change", {
	    queue: true
	  });
	};
	/**
	 * this cleans the group out off the legends and the dataaxis
	 * @param {vis.GraphGroup.id} groupId
	 * @private
	 */


	LineGraph.prototype._removeGroup = function (groupId) {
	  if (this.groups.hasOwnProperty(groupId)) {
	    if (this.groups[groupId].options.yAxisOrientation == 'right') {
	      this.yAxisRight.removeGroup(groupId);
	      this.legendRight.removeGroup(groupId);
	      this.legendRight.redraw();
	    } else {
	      this.yAxisLeft.removeGroup(groupId);
	      this.legendLeft.removeGroup(groupId);
	      this.legendLeft.redraw();
	    }

	    delete this.groups[groupId];
	  }
	};
	/**
	 * update a group object with the group dataset entree
	 *
	 * @param {vis.GraphGroup} group
	 * @param {vis.GraphGroup.id} groupId
	 * @private
	 */


	LineGraph.prototype._updateGroup = function (group, groupId) {
	  if (!this.groups.hasOwnProperty(groupId)) {
	    this.groups[groupId] = new GraphGroup(group, groupId, this.options, this.groupsUsingDefaultStyles);

	    if (this.groups[groupId].options.yAxisOrientation == 'right') {
	      this.yAxisRight.addGroup(groupId, this.groups[groupId]);
	      this.legendRight.addGroup(groupId, this.groups[groupId]);
	    } else {
	      this.yAxisLeft.addGroup(groupId, this.groups[groupId]);
	      this.legendLeft.addGroup(groupId, this.groups[groupId]);
	    }
	  } else {
	    this.groups[groupId].update(group);

	    if (this.groups[groupId].options.yAxisOrientation == 'right') {
	      this.yAxisRight.updateGroup(groupId, this.groups[groupId]);
	      this.legendRight.updateGroup(groupId, this.groups[groupId]); //If yAxisOrientation changed, clean out the group from the other axis.

	      this.yAxisLeft.removeGroup(groupId);
	      this.legendLeft.removeGroup(groupId);
	    } else {
	      this.yAxisLeft.updateGroup(groupId, this.groups[groupId]);
	      this.legendLeft.updateGroup(groupId, this.groups[groupId]); //If yAxisOrientation changed, clean out the group from the other axis.

	      this.yAxisRight.removeGroup(groupId);
	      this.legendRight.removeGroup(groupId);
	    }
	  }

	  this.legendLeft.redraw();
	  this.legendRight.redraw();
	};
	/**
	 * this updates all groups, it is used when there is an update the the itemset.
	 *
	 * @param  {Array} ids
	 * @param  {Array} groupIds
	 * @private
	 */


	LineGraph.prototype._updateAllGroupData = function (ids, groupIds) {
	  if (this.itemsData != null) {
	    var groupsContent = {};
	    var items = this.itemsData.get();
	    var fieldId = this.itemsData.idProp;
	    var idMap = {};

	    if (ids) {
	      map$2(ids).call(ids, function (id) {
	        idMap[id] = id;
	      });
	    } //pre-Determine array sizes, for more efficient memory claim


	    var groupCounts = {};

	    for (var i = 0; i < items.length; i++) {
	      var item = items[i];
	      var groupId = item.group;

	      if (groupId === null || groupId === undefined) {
	        groupId = UNGROUPED$3;
	      }

	      groupCounts.hasOwnProperty(groupId) ? groupCounts[groupId]++ : groupCounts[groupId] = 1;
	    } //Pre-load arrays from existing groups if items are not changed (not in ids)


	    var existingItemsMap = {};

	    if (!groupIds && ids) {
	      for (groupId in this.groups) {
	        if (this.groups.hasOwnProperty(groupId)) {
	          group = this.groups[groupId];
	          var existing_items = group.getItems();
	          groupsContent[groupId] = filter$2(existing_items).call(existing_items, function (item) {
	            existingItemsMap[item[fieldId]] = item[fieldId];
	            return item[fieldId] !== idMap[item[fieldId]];
	          });
	          var newLength = groupCounts[groupId];
	          groupCounts[groupId] -= groupsContent[groupId].length;

	          if (groupsContent[groupId].length < newLength) {
	            groupsContent[groupId][newLength - 1] = {};
	          }
	        }
	      }
	    } //Now insert data into the arrays.


	    for (i = 0; i < items.length; i++) {
	      item = items[i];
	      groupId = item.group;

	      if (groupId === null || groupId === undefined) {
	        groupId = UNGROUPED$3;
	      }

	      if (!groupIds && ids && item[fieldId] !== idMap[item[fieldId]] && existingItemsMap.hasOwnProperty(item[fieldId])) {
	        continue;
	      }

	      if (!groupsContent.hasOwnProperty(groupId)) {
	        groupsContent[groupId] = new Array(groupCounts[groupId]);
	      } //Copy data (because of unmodifiable DataView input.


	      var extended = util$1.bridgeObject(item);
	      extended.x = util$1.convert(item.x, 'Date');
	      extended.end = util$1.convert(item.end, 'Date');
	      extended.orginalY = item.y; //real Y

	      extended.y = Number(item.y);
	      extended[fieldId] = item[fieldId];
	      var index = groupsContent[groupId].length - groupCounts[groupId]--;
	      groupsContent[groupId][index] = extended;
	    } //Make sure all groups are present, to allow removal of old groups


	    for (groupId in this.groups) {
	      if (this.groups.hasOwnProperty(groupId)) {
	        if (!groupsContent.hasOwnProperty(groupId)) {
	          groupsContent[groupId] = new Array(0);
	        }
	      }
	    } //Update legendas, style and axis


	    for (groupId in groupsContent) {
	      if (groupsContent.hasOwnProperty(groupId)) {
	        if (groupsContent[groupId].length == 0) {
	          if (this.groups.hasOwnProperty(groupId)) {
	            this._removeGroup(groupId);
	          }
	        } else {
	          var group = undefined;

	          if (this.groupsData != undefined) {
	            group = this.groupsData.get(groupId);
	          }

	          if (group == undefined) {
	            group = {
	              id: groupId,
	              content: this.options.defaultGroup + groupId
	            };
	          }

	          this._updateGroup(group, groupId);

	          this.groups[groupId].setItems(groupsContent[groupId]);
	        }
	      }
	    }

	    this.forceGraphUpdate = true;
	    this.body.emitter.emit("_change", {
	      queue: true
	    });
	  }
	};
	/**
	 * Redraw the component, mandatory function
	 * @return {boolean} Returns true if the component is resized
	 */


	LineGraph.prototype.redraw = function () {
	  var resized = false; // calculate actual size and position

	  this.props.width = this.dom.frame.offsetWidth;
	  this.props.height = this.body.domProps.centerContainer.height - this.body.domProps.border.top - this.body.domProps.border.bottom; // check if this component is resized

	  resized = this._isResized() || resized; // check whether zoomed (in that case we need to re-stack everything)

	  var visibleInterval = this.body.range.end - this.body.range.start;
	  var zoomed = visibleInterval != this.lastVisibleInterval;
	  this.lastVisibleInterval = visibleInterval; // the svg element is three times as big as the width, this allows for fully dragging left and right
	  // without reloading the graph. the controls for this are bound to events in the constructor

	  if (resized == true) {
	    var _context;

	    this.svg.style.width = util$1.option.asSize(3 * this.props.width);
	    this.svg.style.left = util$1.option.asSize(-this.props.width); // if the height of the graph is set as proportional, change the height of the svg

	    if (indexOf$3(_context = this.options.height + '').call(_context, "%") != -1 || this.updateSVGheightOnResize == true) {
	      this.updateSVGheight = true;
	    }
	  } // update the height of the graph on each redraw of the graph.


	  if (this.updateSVGheight == true) {
	    if (this.options.graphHeight != this.props.height + 'px') {
	      this.options.graphHeight = this.props.height + 'px';
	      this.svg.style.height = this.props.height + 'px';
	    }

	    this.updateSVGheight = false;
	  } else {
	    this.svg.style.height = ('' + this.options.graphHeight).replace('px', '') + 'px';
	  } // zoomed is here to ensure that animations are shown correctly.


	  if (resized == true || zoomed == true || this.abortedGraphUpdate == true || this.forceGraphUpdate == true) {
	    resized = this._updateGraph() || resized;
	    this.forceGraphUpdate = false;
	    this.lastStart = this.body.range.start;
	    this.svg.style.left = -this.props.width + 'px';
	  } else {
	    // move the whole svg while dragging
	    if (this.lastStart != 0) {
	      var offset = this.body.range.start - this.lastStart;
	      var range = this.body.range.end - this.body.range.start;

	      if (this.props.width != 0) {
	        var rangePerPixelInv = this.props.width / range;
	        var xOffset = offset * rangePerPixelInv;
	        this.svg.style.left = -this.props.width - xOffset + 'px';
	      }
	    }
	  }

	  this.legendLeft.redraw();
	  this.legendRight.redraw();
	  return resized;
	};

	LineGraph.prototype._getSortedGroupIds = function () {
	  // getting group Ids
	  var grouplist = [];

	  for (var groupId in this.groups) {
	    if (this.groups.hasOwnProperty(groupId)) {
	      var group = this.groups[groupId];

	      if (group.visible == true && (this.options.groups.visibility[groupId] === undefined || this.options.groups.visibility[groupId] == true)) {
	        grouplist.push({
	          id: groupId,
	          zIndex: group.options.zIndex
	        });
	      }
	    }
	  }

	  util$1.insertSort(grouplist, function (a, b) {
	    var az = a.zIndex;
	    var bz = b.zIndex;
	    if (az === undefined) az = 0;
	    if (bz === undefined) bz = 0;
	    return az == bz ? 0 : az < bz ? -1 : 1;
	  });
	  var groupIds = new Array(grouplist.length);

	  for (var i = 0; i < grouplist.length; i++) {
	    groupIds[i] = grouplist[i].id;
	  }

	  return groupIds;
	};
	/**
	 * Update and redraw the graph.
	 *
	 * @returns {boolean}
	 * @private
	 */


	LineGraph.prototype._updateGraph = function () {
	  // reset the svg elements
	  prepareElements(this.svgElements);

	  if (this.props.width != 0 && this.itemsData != null) {
	    var group, i;
	    var groupRanges = {};
	    var changeCalled = false; // this is the range of the SVG canvas

	    var minDate = this.body.util.toGlobalTime(-this.body.domProps.root.width);
	    var maxDate = this.body.util.toGlobalTime(2 * this.body.domProps.root.width); // getting group Ids

	    var groupIds = this._getSortedGroupIds();

	    if (groupIds.length > 0) {
	      var groupsData = {}; // fill groups data, this only loads the data we require based on the timewindow

	      this._getRelevantData(groupIds, groupsData, minDate, maxDate); // apply sampling, if disabled, it will pass through this function.


	      this._applySampling(groupIds, groupsData); // we transform the X coordinates to detect collisions


	      for (i = 0; i < groupIds.length; i++) {
	        this._convertXcoordinates(groupsData[groupIds[i]]);
	      } // now all needed data has been collected we start the processing.


	      this._getYRanges(groupIds, groupsData, groupRanges); // update the Y axis first, we use this data to draw at the correct Y points


	      changeCalled = this._updateYAxis(groupIds, groupRanges); //  at changeCalled, abort this update cycle as the graph needs another update with new Width input from the Redraw container.
	      //  Cleanup SVG elements on abort.

	      if (changeCalled == true) {
	        cleanupElements(this.svgElements);
	        this.abortedGraphUpdate = true;
	        return true;
	      }

	      this.abortedGraphUpdate = false; // With the yAxis scaled correctly, use this to get the Y values of the points.

	      var below = undefined;

	      for (i = 0; i < groupIds.length; i++) {
	        group = this.groups[groupIds[i]];

	        if (this.options.stack === true && this.options.style === 'line') {
	          if (group.options.excludeFromStacking == undefined || !group.options.excludeFromStacking) {
	            if (below != undefined) {
	              this._stack(groupsData[group.id], groupsData[below.id]);

	              if (group.options.shaded.enabled == true && group.options.shaded.orientation !== "group") {
	                if (group.options.shaded.orientation == "top" && below.options.shaded.orientation !== "group") {
	                  below.options.shaded.orientation = "group";
	                  below.options.shaded.groupId = group.id;
	                } else {
	                  group.options.shaded.orientation = "group";
	                  group.options.shaded.groupId = below.id;
	                }
	              }
	            }

	            below = group;
	          }
	        }

	        this._convertYcoordinates(groupsData[groupIds[i]], group);
	      } //Precalculate paths and draw shading if appropriate. This will make sure the shading is always behind any lines.


	      var paths = {};

	      for (i = 0; i < groupIds.length; i++) {
	        group = this.groups[groupIds[i]];

	        if (group.options.style === 'line' && group.options.shaded.enabled == true) {
	          var dataset = groupsData[groupIds[i]];

	          if (dataset == null || dataset.length == 0) {
	            continue;
	          }

	          if (!paths.hasOwnProperty(groupIds[i])) {
	            paths[groupIds[i]] = Line.calcPath(dataset, group);
	          }

	          if (group.options.shaded.orientation === "group") {
	            var subGroupId = group.options.shaded.groupId;

	            if (indexOf$3(groupIds).call(groupIds, subGroupId) === -1) {
	              console.log(group.id + ": Unknown shading group target given:" + subGroupId);
	              continue;
	            }

	            if (!paths.hasOwnProperty(subGroupId)) {
	              paths[subGroupId] = Line.calcPath(groupsData[subGroupId], this.groups[subGroupId]);
	            }

	            Line.drawShading(paths[groupIds[i]], group, paths[subGroupId], this.framework);
	          } else {
	            Line.drawShading(paths[groupIds[i]], group, undefined, this.framework);
	          }
	        }
	      } // draw the groups, calculating paths if still necessary.


	      Bargraph.draw(groupIds, groupsData, this.framework);

	      for (i = 0; i < groupIds.length; i++) {
	        group = this.groups[groupIds[i]];

	        if (groupsData[groupIds[i]].length > 0) {
	          switch (group.options.style) {
	            case "line":
	              if (!paths.hasOwnProperty(groupIds[i])) {
	                paths[groupIds[i]] = Line.calcPath(groupsData[groupIds[i]], group);
	              }

	              Line.draw(paths[groupIds[i]], group, this.framework);
	            // eslint-disable-line no-fallthrough

	            case "point": // eslint-disable-line no-fallthrough

	            case "points":
	              if (group.options.style == "point" || group.options.style == "points" || group.options.drawPoints.enabled == true) {
	                Points.draw(groupsData[groupIds[i]], group, this.framework);
	              }

	              break;

	          }
	        }
	      }
	    }
	  } // cleanup unused svg elements


	  cleanupElements(this.svgElements);
	  return false;
	};

	LineGraph.prototype._stack = function (data, subData) {
	  var index, dx, dy, subPrevPoint, subNextPoint;
	  index = 0; // for each data point we look for a matching on in the set below

	  for (var j = 0; j < data.length; j++) {
	    subPrevPoint = undefined;
	    subNextPoint = undefined; // we look for time matches or a before-after point

	    for (var k = index; k < subData.length; k++) {
	      // if times match exactly
	      if (subData[k].x === data[j].x) {
	        subPrevPoint = subData[k];
	        subNextPoint = subData[k];
	        index = k;
	        break;
	      } else if (subData[k].x > data[j].x) {
	        // overshoot
	        subNextPoint = subData[k];

	        if (k == 0) {
	          subPrevPoint = subNextPoint;
	        } else {
	          subPrevPoint = subData[k - 1];
	        }

	        index = k;
	        break;
	      }
	    } // in case the last data point has been used, we assume it stays like this.


	    if (subNextPoint === undefined) {
	      subPrevPoint = subData[subData.length - 1];
	      subNextPoint = subData[subData.length - 1];
	    } // linear interpolation


	    dx = subNextPoint.x - subPrevPoint.x;
	    dy = subNextPoint.y - subPrevPoint.y;

	    if (dx == 0) {
	      data[j].y = data[j].orginalY + subNextPoint.y;
	    } else {
	      data[j].y = data[j].orginalY + dy / dx * (data[j].x - subPrevPoint.x) + subPrevPoint.y; // ax + b where b is data[j].y
	    }
	  }
	};
	/**
	 * first select and preprocess the data from the datasets.
	 * the groups have their preselection of data, we now loop over this data to see
	 * what data we need to draw. Sorted data is much faster.
	 * more optimization is possible by doing the sampling before and using the binary search
	 * to find the end date to determine the increment.
	 *
	 * @param {array}  groupIds
	 * @param {object} groupsData
	 * @param {date}   minDate
	 * @param {date}   maxDate
	 * @private
	 */


	LineGraph.prototype._getRelevantData = function (groupIds, groupsData, minDate, maxDate) {
	  var group, i, j, item;

	  if (groupIds.length > 0) {
	    for (i = 0; i < groupIds.length; i++) {
	      group = this.groups[groupIds[i]];
	      var itemsData = group.getItems(); // optimization for sorted data

	      if (sort$2(group.options) == true) {
	        var dateComparator = function dateComparator(a, b) {
	          return a.getTime() == b.getTime() ? 0 : a < b ? -1 : 1;
	        };

	        var first = Math.max(0, util$1.binarySearchValue(itemsData, minDate, 'x', 'before', dateComparator));
	        var last = Math.min(itemsData.length, util$1.binarySearchValue(itemsData, maxDate, 'x', 'after', dateComparator) + 1);

	        if (last <= 0) {
	          last = itemsData.length;
	        }

	        var dataContainer = new Array(last - first);

	        for (j = first; j < last; j++) {
	          item = group.itemsData[j];
	          dataContainer[j - first] = item;
	        }

	        groupsData[groupIds[i]] = dataContainer;
	      } else {
	        // If unsorted data, all data is relevant, just returning entire structure
	        groupsData[groupIds[i]] = group.itemsData;
	      }
	    }
	  }
	};
	/**
	 *
	 * @param {Array.<vis.GraphGroup.id>} groupIds
	 * @param {vis.DataSet} groupsData
	 * @private
	 */


	LineGraph.prototype._applySampling = function (groupIds, groupsData) {
	  var group;

	  if (groupIds.length > 0) {
	    for (var i = 0; i < groupIds.length; i++) {
	      group = this.groups[groupIds[i]];

	      if (group.options.sampling == true) {
	        var dataContainer = groupsData[groupIds[i]];

	        if (dataContainer.length > 0) {
	          var increment = 1;
	          var amountOfPoints = dataContainer.length; // the global screen is used because changing the width of the yAxis may affect the increment, resulting in an endless loop
	          // of width changing of the yAxis.
	          //TODO: This assumes sorted data, but that's not guaranteed!

	          var xDistance = this.body.util.toGlobalScreen(dataContainer[dataContainer.length - 1].x) - this.body.util.toGlobalScreen(dataContainer[0].x);
	          var pointsPerPixel = amountOfPoints / xDistance;
	          increment = Math.min(Math.ceil(0.2 * amountOfPoints), Math.max(1, Math.round(pointsPerPixel)));
	          var sampledData = new Array(amountOfPoints);

	          for (var j = 0; j < amountOfPoints; j += increment) {
	            var idx = Math.round(j / increment);
	            sampledData[idx] = dataContainer[j];
	          }

	          groupsData[groupIds[i]] = splice$2(sampledData).call(sampledData, 0, Math.round(amountOfPoints / increment));
	        }
	      }
	    }
	  }
	};
	/**
	 *
	 * @param {Array.<vis.GraphGroup.id>} groupIds
	 * @param {vis.DataSet} groupsData
	 * @param {object} groupRanges  | this is being filled here
	 * @private
	 */


	LineGraph.prototype._getYRanges = function (groupIds, groupsData, groupRanges) {
	  var groupData, group, i;
	  var combinedDataLeft = [];
	  var combinedDataRight = [];
	  var options;

	  if (groupIds.length > 0) {
	    for (i = 0; i < groupIds.length; i++) {
	      groupData = groupsData[groupIds[i]];
	      options = this.groups[groupIds[i]].options;

	      if (groupData.length > 0) {
	        group = this.groups[groupIds[i]]; // if bar graphs are stacked, their range need to be handled differently and accumulated over all groups.

	        if (options.stack === true && options.style === 'bar') {
	          if (options.yAxisOrientation === 'left') {
	            combinedDataLeft = concat$2(combinedDataLeft).call(combinedDataLeft, groupData);
	          } else {
	            combinedDataRight = concat$2(combinedDataRight).call(combinedDataRight, groupData);
	          }
	        } else {
	          groupRanges[groupIds[i]] = group.getYRange(groupData, groupIds[i]);
	        }
	      }
	    } // if bar graphs are stacked, their range need to be handled differently and accumulated over all groups.


	    Bargraph.getStackedYRange(combinedDataLeft, groupRanges, groupIds, '__barStackLeft', 'left');
	    Bargraph.getStackedYRange(combinedDataRight, groupRanges, groupIds, '__barStackRight', 'right');
	  }
	};
	/**
	 * this sets the Y ranges for the Y axis. It also determines which of the axis should be shown or hidden.
	 * @param {Array.<vis.GraphGroup.id>} groupIds
	 * @param {Object} groupRanges
	 * @returns {boolean} resized
	 * @private
	 */


	LineGraph.prototype._updateYAxis = function (groupIds, groupRanges) {
	  var resized = false;
	  var yAxisLeftUsed = false;
	  var yAxisRightUsed = false;
	  var minLeft = 1e9,
	      minRight = 1e9,
	      maxLeft = -1e9,
	      maxRight = -1e9,
	      minVal,
	      maxVal; // if groups are present

	  if (groupIds.length > 0) {
	    // this is here to make sure that if there are no items in the axis but there are groups, that there is no infinite draw/redraw loop.
	    for (var i = 0; i < groupIds.length; i++) {
	      var group = this.groups[groupIds[i]];

	      if (group && group.options.yAxisOrientation != 'right') {
	        yAxisLeftUsed = true;
	        minLeft = 1e9;
	        maxLeft = -1e9;
	      } else if (group && group.options.yAxisOrientation) {
	        yAxisRightUsed = true;
	        minRight = 1e9;
	        maxRight = -1e9;
	      }
	    } // if there are items:


	    for (i = 0; i < groupIds.length; i++) {
	      if (groupRanges.hasOwnProperty(groupIds[i])) {
	        if (groupRanges[groupIds[i]].ignore !== true) {
	          minVal = groupRanges[groupIds[i]].min;
	          maxVal = groupRanges[groupIds[i]].max;

	          if (groupRanges[groupIds[i]].yAxisOrientation != 'right') {
	            yAxisLeftUsed = true;
	            minLeft = minLeft > minVal ? minVal : minLeft;
	            maxLeft = maxLeft < maxVal ? maxVal : maxLeft;
	          } else {
	            yAxisRightUsed = true;
	            minRight = minRight > minVal ? minVal : minRight;
	            maxRight = maxRight < maxVal ? maxVal : maxRight;
	          }
	        }
	      }
	    }

	    if (yAxisLeftUsed == true) {
	      this.yAxisLeft.setRange(minLeft, maxLeft);
	    }

	    if (yAxisRightUsed == true) {
	      this.yAxisRight.setRange(minRight, maxRight);
	    }
	  }

	  resized = this._toggleAxisVisiblity(yAxisLeftUsed, this.yAxisLeft) || resized;
	  resized = this._toggleAxisVisiblity(yAxisRightUsed, this.yAxisRight) || resized;

	  if (yAxisRightUsed == true && yAxisLeftUsed == true) {
	    this.yAxisLeft.drawIcons = true;
	    this.yAxisRight.drawIcons = true;
	  } else {
	    this.yAxisLeft.drawIcons = false;
	    this.yAxisRight.drawIcons = false;
	  }

	  this.yAxisRight.master = !yAxisLeftUsed;
	  this.yAxisRight.masterAxis = this.yAxisLeft;

	  if (this.yAxisRight.master == false) {
	    if (yAxisRightUsed == true) {
	      this.yAxisLeft.lineOffset = this.yAxisRight.width;
	    } else {
	      this.yAxisLeft.lineOffset = 0;
	    }

	    resized = this.yAxisLeft.redraw() || resized;
	    resized = this.yAxisRight.redraw() || resized;
	  } else {
	    resized = this.yAxisRight.redraw() || resized;
	  } // clean the accumulated lists


	  var tempGroups = ['__barStackLeft', '__barStackRight', '__lineStackLeft', '__lineStackRight'];

	  for (i = 0; i < tempGroups.length; i++) {
	    if (indexOf$3(groupIds).call(groupIds, tempGroups[i]) != -1) {
	      splice$2(groupIds).call(groupIds, indexOf$3(groupIds).call(groupIds, tempGroups[i]), 1);
	    }
	  }

	  return resized;
	};
	/**
	 * This shows or hides the Y axis if needed. If there is a change, the changed event is emitted by the updateYAxis function
	 *
	 * @param {boolean} axisUsed
	 * @param {vis.DataAxis}  axis
	 * @returns {boolean}
	 * @private
	 */


	LineGraph.prototype._toggleAxisVisiblity = function (axisUsed, axis) {
	  var changed = false;

	  if (axisUsed == false) {
	    if (axis.dom.frame.parentNode && axis.hidden == false) {
	      axis.hide();
	      changed = true;
	    }
	  } else {
	    if (!axis.dom.frame.parentNode && axis.hidden == true) {
	      axis.show();
	      changed = true;
	    }
	  }

	  return changed;
	};
	/**
	 * This uses the DataAxis object to generate the correct X coordinate on the SVG window. It uses the
	 * util function toScreen to get the x coordinate from the timestamp. It also pre-filters the data and get the minMax ranges for
	 * the yAxis.
	 *
	 * @param {Array.<Object>} datapoints
	 * @private
	 */


	LineGraph.prototype._convertXcoordinates = function (datapoints) {
	  var toScreen = this.body.util.toScreen;

	  for (var i = 0; i < datapoints.length; i++) {
	    datapoints[i].screen_x = toScreen(datapoints[i].x) + this.props.width;
	    datapoints[i].screen_y = datapoints[i].y; //starting point for range calculations

	    if (datapoints[i].end != undefined) {
	      datapoints[i].screen_end = toScreen(datapoints[i].end) + this.props.width;
	    } else {
	      datapoints[i].screen_end = undefined;
	    }
	  }
	};
	/**
	 * This uses the DataAxis object to generate the correct X coordinate on the SVG window. It uses the
	 * util function toScreen to get the x coordinate from the timestamp. It also pre-filters the data and get the minMax ranges for
	 * the yAxis.
	 *
	 * @param {Array.<Object>} datapoints
	 * @param {vis.GraphGroup} group
	 * @private
	 */


	LineGraph.prototype._convertYcoordinates = function (datapoints, group) {
	  var axis = this.yAxisLeft;
	  var svgHeight = Number(this.svg.style.height.replace('px', ''));

	  if (group.options.yAxisOrientation == 'right') {
	    axis = this.yAxisRight;
	  }

	  for (var i = 0; i < datapoints.length; i++) {
	    datapoints[i].screen_y = Math.round(axis.convertValue(datapoints[i].y));
	  }

	  group.setZeroPosition(Math.min(svgHeight, axis.convertValue(0)));
	};

	/**
	 * This object contains all possible options. It will check if the types are correct, if required if the option is one
	 * of the allowed values.
	 *
	 * __any__ means that the name of the property does not matter.
	 * __type__ is a required field for all objects and contains the allowed types of all objects
	 */
	var string$1 = 'string';
	var bool$1 = 'boolean';
	var number$1 = 'number';
	var array$1 = 'array';
	var date$1 = 'date';
	var object$1 = 'object'; // should only be in a __type__ property

	var dom$1 = 'dom';
	var moment$2 = 'moment';
	var any$1 = 'any';
	var allOptions$2 = {
	  configure: {
	    enabled: {
	      'boolean': bool$1
	    },
	    filter: {
	      'boolean': bool$1,
	      'function': 'function'
	    },
	    container: {
	      dom: dom$1
	    },
	    __type__: {
	      object: object$1,
	      'boolean': bool$1,
	      'function': 'function'
	    }
	  },
	  //globals :
	  alignCurrentTime: {
	    string: string$1,
	    'undefined': 'undefined'
	  },
	  yAxisOrientation: {
	    string: ['left', 'right']
	  },
	  defaultGroup: {
	    string: string$1
	  },
	  sort: {
	    'boolean': bool$1
	  },
	  sampling: {
	    'boolean': bool$1
	  },
	  stack: {
	    'boolean': bool$1
	  },
	  graphHeight: {
	    string: string$1,
	    number: number$1
	  },
	  shaded: {
	    enabled: {
	      'boolean': bool$1
	    },
	    orientation: {
	      string: ['bottom', 'top', 'zero', 'group']
	    },
	    // top, bottom, zero, group
	    groupId: {
	      object: object$1
	    },
	    __type__: {
	      'boolean': bool$1,
	      object: object$1
	    }
	  },
	  style: {
	    string: ['line', 'bar', 'points']
	  },
	  // line, bar
	  barChart: {
	    width: {
	      number: number$1
	    },
	    minWidth: {
	      number: number$1
	    },
	    sideBySide: {
	      'boolean': bool$1
	    },
	    align: {
	      string: ['left', 'center', 'right']
	    },
	    __type__: {
	      object: object$1
	    }
	  },
	  interpolation: {
	    enabled: {
	      'boolean': bool$1
	    },
	    parametrization: {
	      string: ['centripetal', 'chordal', 'uniform']
	    },
	    // uniform (alpha = 0.0), chordal (alpha = 1.0), centripetal (alpha = 0.5)
	    alpha: {
	      number: number$1
	    },
	    __type__: {
	      object: object$1,
	      'boolean': bool$1
	    }
	  },
	  drawPoints: {
	    enabled: {
	      'boolean': bool$1
	    },
	    onRender: {
	      'function': 'function'
	    },
	    size: {
	      number: number$1
	    },
	    style: {
	      string: ['square', 'circle']
	    },
	    // square, circle
	    __type__: {
	      object: object$1,
	      'boolean': bool$1,
	      'function': 'function'
	    }
	  },
	  dataAxis: {
	    showMinorLabels: {
	      'boolean': bool$1
	    },
	    showMajorLabels: {
	      'boolean': bool$1
	    },
	    showWeekScale: {
	      'boolean': bool$1
	    },
	    icons: {
	      'boolean': bool$1
	    },
	    width: {
	      string: string$1,
	      number: number$1
	    },
	    visible: {
	      'boolean': bool$1
	    },
	    alignZeros: {
	      'boolean': bool$1
	    },
	    left: {
	      range: {
	        min: {
	          number: number$1,
	          'undefined': 'undefined'
	        },
	        max: {
	          number: number$1,
	          'undefined': 'undefined'
	        },
	        __type__: {
	          object: object$1
	        }
	      },
	      format: {
	        'function': 'function'
	      },
	      title: {
	        text: {
	          string: string$1,
	          number: number$1,
	          'undefined': 'undefined'
	        },
	        style: {
	          string: string$1,
	          'undefined': 'undefined'
	        },
	        __type__: {
	          object: object$1
	        }
	      },
	      __type__: {
	        object: object$1
	      }
	    },
	    right: {
	      range: {
	        min: {
	          number: number$1,
	          'undefined': 'undefined'
	        },
	        max: {
	          number: number$1,
	          'undefined': 'undefined'
	        },
	        __type__: {
	          object: object$1
	        }
	      },
	      format: {
	        'function': 'function'
	      },
	      title: {
	        text: {
	          string: string$1,
	          number: number$1,
	          'undefined': 'undefined'
	        },
	        style: {
	          string: string$1,
	          'undefined': 'undefined'
	        },
	        __type__: {
	          object: object$1
	        }
	      },
	      __type__: {
	        object: object$1
	      }
	    },
	    __type__: {
	      object: object$1
	    }
	  },
	  legend: {
	    enabled: {
	      'boolean': bool$1
	    },
	    icons: {
	      'boolean': bool$1
	    },
	    left: {
	      visible: {
	        'boolean': bool$1
	      },
	      position: {
	        string: ['top-right', 'bottom-right', 'top-left', 'bottom-left']
	      },
	      __type__: {
	        object: object$1
	      }
	    },
	    right: {
	      visible: {
	        'boolean': bool$1
	      },
	      position: {
	        string: ['top-right', 'bottom-right', 'top-left', 'bottom-left']
	      },
	      __type__: {
	        object: object$1
	      }
	    },
	    __type__: {
	      object: object$1,
	      'boolean': bool$1
	    }
	  },
	  groups: {
	    visibility: {
	      any: any$1
	    },
	    __type__: {
	      object: object$1
	    }
	  },
	  autoResize: {
	    'boolean': bool$1
	  },
	  throttleRedraw: {
	    number: number$1
	  },
	  // TODO: DEPRICATED see https://github.com/almende/vis/issues/2511
	  clickToUse: {
	    'boolean': bool$1
	  },
	  end: {
	    number: number$1,
	    date: date$1,
	    string: string$1,
	    moment: moment$2
	  },
	  format: {
	    minorLabels: {
	      millisecond: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      second: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      minute: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      hour: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      weekday: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      day: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      week: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      month: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      quarter: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      year: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      __type__: {
	        object: object$1
	      }
	    },
	    majorLabels: {
	      millisecond: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      second: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      minute: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      hour: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      weekday: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      day: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      week: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      month: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      quarter: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      year: {
	        string: string$1,
	        'undefined': 'undefined'
	      },
	      __type__: {
	        object: object$1
	      }
	    },
	    __type__: {
	      object: object$1
	    }
	  },
	  moment: {
	    'function': 'function'
	  },
	  height: {
	    string: string$1,
	    number: number$1
	  },
	  hiddenDates: {
	    start: {
	      date: date$1,
	      number: number$1,
	      string: string$1,
	      moment: moment$2
	    },
	    end: {
	      date: date$1,
	      number: number$1,
	      string: string$1,
	      moment: moment$2
	    },
	    repeat: {
	      string: string$1
	    },
	    __type__: {
	      object: object$1,
	      array: array$1
	    }
	  },
	  locale: {
	    string: string$1
	  },
	  locales: {
	    __any__: {
	      any: any$1
	    },
	    __type__: {
	      object: object$1
	    }
	  },
	  max: {
	    date: date$1,
	    number: number$1,
	    string: string$1,
	    moment: moment$2
	  },
	  maxHeight: {
	    number: number$1,
	    string: string$1
	  },
	  maxMinorChars: {
	    number: number$1
	  },
	  min: {
	    date: date$1,
	    number: number$1,
	    string: string$1,
	    moment: moment$2
	  },
	  minHeight: {
	    number: number$1,
	    string: string$1
	  },
	  moveable: {
	    'boolean': bool$1
	  },
	  multiselect: {
	    'boolean': bool$1
	  },
	  orientation: {
	    string: string$1
	  },
	  showCurrentTime: {
	    'boolean': bool$1
	  },
	  showMajorLabels: {
	    'boolean': bool$1
	  },
	  showMinorLabels: {
	    'boolean': bool$1
	  },
	  showWeekScale: {
	    'boolean': bool$1
	  },
	  snap: {
	    'function': 'function',
	    'null': 'null'
	  },
	  start: {
	    date: date$1,
	    number: number$1,
	    string: string$1,
	    moment: moment$2
	  },
	  timeAxis: {
	    scale: {
	      string: string$1,
	      'undefined': 'undefined'
	    },
	    step: {
	      number: number$1,
	      'undefined': 'undefined'
	    },
	    __type__: {
	      object: object$1
	    }
	  },
	  width: {
	    string: string$1,
	    number: number$1
	  },
	  zoomable: {
	    'boolean': bool$1
	  },
	  zoomKey: {
	    string: ['ctrlKey', 'altKey', 'metaKey', '']
	  },
	  zoomMax: {
	    number: number$1
	  },
	  zoomMin: {
	    number: number$1
	  },
	  zIndex: {
	    number: number$1
	  },
	  __type__: {
	    object: object$1
	  }
	};
	var configureOptions$1 = {
	  global: {
	    alignCurrentTime: ['none', 'year', 'month', 'quarter', 'week', 'isoWeek', 'day', 'date', 'hour', 'minute', 'second'],
	    //yAxisOrientation: ['left','right'], // TDOO: enable as soon as Grahp2d doesn't crash when changing this on the fly
	    sort: true,
	    sampling: true,
	    stack: false,
	    shaded: {
	      enabled: false,
	      orientation: ['zero', 'top', 'bottom', 'group'] // zero, top, bottom

	    },
	    style: ['line', 'bar', 'points'],
	    // line, bar
	    barChart: {
	      width: [50, 5, 100, 5],
	      minWidth: [50, 5, 100, 5],
	      sideBySide: false,
	      align: ['left', 'center', 'right'] // left, center, right

	    },
	    interpolation: {
	      enabled: true,
	      parametrization: ['centripetal', 'chordal', 'uniform'] // uniform (alpha = 0.0), chordal (alpha = 1.0), centripetal (alpha = 0.5)

	    },
	    drawPoints: {
	      enabled: true,
	      size: [6, 2, 30, 1],
	      style: ['square', 'circle'] // square, circle

	    },
	    dataAxis: {
	      showMinorLabels: true,
	      showMajorLabels: true,
	      showWeekScale: false,
	      icons: false,
	      width: [40, 0, 200, 1],
	      visible: true,
	      alignZeros: true,
	      left: {
	        //range: {min:'undefined': 'undefined'ined,max:'undefined': 'undefined'ined},
	        //format: function (value) {return value;},
	        title: {
	          text: '',
	          style: ''
	        }
	      },
	      right: {
	        //range: {min:'undefined': 'undefined'ined,max:'undefined': 'undefined'ined},
	        //format: function (value) {return value;},
	        title: {
	          text: '',
	          style: ''
	        }
	      }
	    },
	    legend: {
	      enabled: false,
	      icons: true,
	      left: {
	        visible: true,
	        position: ['top-right', 'bottom-right', 'top-left', 'bottom-left'] // top/bottom - left,right

	      },
	      right: {
	        visible: true,
	        position: ['top-right', 'bottom-right', 'top-left', 'bottom-left'] // top/bottom - left,right

	      }
	    },
	    autoResize: true,
	    clickToUse: false,
	    end: '',
	    format: {
	      minorLabels: {
	        millisecond: 'SSS',
	        second: 's',
	        minute: 'HH:mm',
	        hour: 'HH:mm',
	        weekday: 'ddd D',
	        day: 'D',
	        week: 'w',
	        month: 'MMM',
	        quarter: '[Q]Q',
	        year: 'YYYY'
	      },
	      majorLabels: {
	        millisecond: 'HH:mm:ss',
	        second: 'D MMMM HH:mm',
	        minute: 'ddd D MMMM',
	        hour: 'ddd D MMMM',
	        weekday: 'MMMM YYYY',
	        day: 'MMMM YYYY',
	        week: 'MMMM YYYY',
	        month: 'YYYY',
	        quarter: 'YYYY',
	        year: ''
	      }
	    },
	    height: '',
	    locale: '',
	    max: '',
	    maxHeight: '',
	    maxMinorChars: [7, 0, 20, 1],
	    min: '',
	    minHeight: '',
	    moveable: true,
	    orientation: ['both', 'bottom', 'top'],
	    showCurrentTime: false,
	    showMajorLabels: true,
	    showMinorLabels: true,
	    showWeekScale: false,
	    start: '',
	    width: '100%',
	    zoomable: true,
	    zoomKey: ['ctrlKey', 'altKey', 'metaKey', ''],
	    zoomMax: [315360000000000, 10, 315360000000000, 1],
	    zoomMin: [10, 10, 315360000000000, 1],
	    zIndex: 0
	  }
	};

	/**
	 * Create a timeline visualization
	 * @param {HTMLElement} container
	 * @param {vis.DataSet | Array} [items]
	 * @param {vis.DataSet | Array | vis.DataView | Object} [groups]
	 * @param {Object} [options]  See Graph2d.setOptions for the available options.
	 * @constructor Graph2d
	 * @extends Core
	 */

	function Graph2d(container, items, groups, options) {
	  var _context, _context2, _context3, _context4, _context5, _context6, _context7;

	  // if the third element is options, the forth is groups (optionally);
	  if (!(isArray$3(groups) || esnext.isDataViewLike("id", groups)) && groups instanceof Object) {
	    var forthArgument = options;
	    options = groups;
	    groups = forthArgument;
	  } // TODO: REMOVE THIS in the next MAJOR release
	  // see https://github.com/almende/vis/issues/2511


	  if (options && options.throttleRedraw) {
	    console.warn("Graph2d option \"throttleRedraw\" is DEPRICATED and no longer supported. It will be removed in the next MAJOR release.");
	  }

	  var me = this;
	  this.defaultOptions = {
	    start: null,
	    end: null,
	    autoResize: true,
	    orientation: {
	      axis: 'bottom',
	      // axis orientation: 'bottom', 'top', or 'both'
	      item: 'bottom' // not relevant for Graph2d

	    },
	    moment: moment,
	    width: null,
	    height: null,
	    maxHeight: null,
	    minHeight: null
	  };
	  this.options = util$1.deepExtend({}, this.defaultOptions); // Create the DOM, props, and emitter

	  this._create(container); // all components listed here will be repainted automatically


	  this.components = [];
	  this.body = {
	    dom: this.dom,
	    domProps: this.props,
	    emitter: {
	      on: bind$2(_context = this.on).call(_context, this),
	      off: bind$2(_context2 = this.off).call(_context2, this),
	      emit: bind$2(_context3 = this.emit).call(_context3, this)
	    },
	    hiddenDates: [],
	    util: {
	      getScale: function getScale() {
	        return me.timeAxis.step.scale;
	      },
	      getStep: function getStep() {
	        return me.timeAxis.step.step;
	      },
	      toScreen: bind$2(_context4 = me._toScreen).call(_context4, me),
	      toGlobalScreen: bind$2(_context5 = me._toGlobalScreen).call(_context5, me),
	      // this refers to the root.width
	      toTime: bind$2(_context6 = me._toTime).call(_context6, me),
	      toGlobalTime: bind$2(_context7 = me._toGlobalTime).call(_context7, me)
	    }
	  }; // range

	  this.range = new Range(this.body);
	  this.components.push(this.range);
	  this.body.range = this.range; // time axis

	  this.timeAxis = new TimeAxis(this.body);
	  this.components.push(this.timeAxis); //this.body.util.snap = this.timeAxis.snap.bind(this.timeAxis);
	  // current time bar

	  this.currentTime = new CurrentTime(this.body);
	  this.components.push(this.currentTime); // item set

	  this.linegraph = new LineGraph(this.body);
	  this.components.push(this.linegraph);
	  this.itemsData = null; // DataSet

	  this.groupsData = null; // DataSet

	  this.on('tap', function (event) {
	    me.emit('click', me.getEventProperties(event));
	  });
	  this.on('doubletap', function (event) {
	    me.emit('doubleClick', me.getEventProperties(event));
	  });

	  this.dom.root.oncontextmenu = function (event) {
	    me.emit('contextmenu', me.getEventProperties(event));
	  }; //Single time autoscale/fit


	  this.initialFitDone = false;
	  this.on('changed', function () {
	    if (me.itemsData == null) return;

	    if (!me.initialFitDone && !me.options.rollingMode) {
	      me.initialFitDone = true;

	      if (me.options.start != undefined || me.options.end != undefined) {
	        if (me.options.start == undefined || me.options.end == undefined) {
	          var range = me.getItemRange();
	        }

	        var start = me.options.start != undefined ? me.options.start : range.min;
	        var end = me.options.end != undefined ? me.options.end : range.max;
	        me.setWindow(start, end, {
	          animation: false
	        });
	      } else {
	        me.fit({
	          animation: false
	        });
	      }
	    }

	    if (!me.initialDrawDone && (me.initialRangeChangeDone || !me.options.start && !me.options.end || me.options.rollingMode)) {
	      me.initialDrawDone = true;
	      me.dom.root.style.visibility = 'visible';
	      me.dom.loadingScreen.parentNode.removeChild(me.dom.loadingScreen);

	      if (me.options.onInitialDrawComplete) {
	        setTimeout$2(function () {
	          return me.options.onInitialDrawComplete();
	        }, 0);
	      }
	    }
	  }); // apply options

	  if (options) {
	    this.setOptions(options);
	  } // IMPORTANT: THIS HAPPENS BEFORE SET ITEMS!


	  if (groups) {
	    this.setGroups(groups);
	  } // create itemset


	  if (items) {
	    this.setItems(items);
	  } // draw for the first time


	  this._redraw();
	} // Extend the functionality from Core


	Graph2d.prototype = new Core();

	Graph2d.prototype.setOptions = function (options) {
	  // validate options
	  var errorFound = Validator.validate(options, allOptions$2);

	  if (errorFound === true) {
	    console.log('%cErrors have been found in the supplied options object.', printStyle);
	  }

	  Core.prototype.setOptions.call(this, options);
	};
	/**
	 * Set items
	 * @param {vis.DataSet | Array | null} items
	 */


	Graph2d.prototype.setItems = function (items) {
	  var initialLoad = this.itemsData == null; // convert to type DataSet when needed

	  var newDataSet;

	  if (!items) {
	    newDataSet = null;
	  } else if (esnext.isDataViewLike("id", newDataSet)) {
	    newDataSet = typeCoerceDataSet(items);
	  } else {
	    // turn an array into a dataset
	    newDataSet = typeCoerceDataSet(new esnext.DataSet(items));
	  } // set items


	  if (this.itemsData) {
	    // stop maintaining a coerced version of the old data set
	    this.itemsData.dispose();
	  }

	  this.itemsData = newDataSet;
	  this.linegraph && this.linegraph.setItems(newDataSet != null ? newDataSet.rawDS : null);

	  if (initialLoad) {
	    if (this.options.start != undefined || this.options.end != undefined) {
	      var start = this.options.start != undefined ? this.options.start : null;
	      var end = this.options.end != undefined ? this.options.end : null;
	      this.setWindow(start, end, {
	        animation: false
	      });
	    } else {
	      this.fit({
	        animation: false
	      });
	    }
	  }
	};
	/**
	 * Set groups
	 * @param {vis.DataSet | Array} groups
	 */


	Graph2d.prototype.setGroups = function (groups) {
	  // convert to type DataSet when needed
	  var newDataSet;

	  if (!groups) {
	    newDataSet = null;
	  } else if (esnext.isDataViewLike("id", groups)) {
	    newDataSet = groups;
	  } else {
	    // turn an array into a dataset
	    newDataSet = new esnext.DataSet(groups);
	  }

	  this.groupsData = newDataSet;
	  this.linegraph.setGroups(newDataSet);
	};
	/**
	 * Returns an object containing an SVG element with the icon of the group (size determined by iconWidth and iconHeight), the label of the group (content) and the yAxisOrientation of the group (left or right).
	 * @param {vis.GraphGroup.id} groupId
	 * @param {number} width
	 * @param {number} height
	 * @returns {{icon: SVGElement, label: string, orientation: string}|string}
	 */


	Graph2d.prototype.getLegend = function (groupId, width, height) {
	  if (width === undefined) {
	    width = 15;
	  }

	  if (height === undefined) {
	    height = 15;
	  }

	  if (this.linegraph.groups[groupId] !== undefined) {
	    return this.linegraph.groups[groupId].getLegend(width, height);
	  } else {
	    return "cannot find group:'" + groupId + "'";
	  }
	};
	/**
	 * This checks if the visible option of the supplied group (by ID) is true or false.
	 * @param {vis.GraphGroup.id} groupId
	 * @returns {boolean}
	 */


	Graph2d.prototype.isGroupVisible = function (groupId) {
	  if (this.linegraph.groups[groupId] !== undefined) {
	    return this.linegraph.groups[groupId].visible && (this.linegraph.options.groups.visibility[groupId] === undefined || this.linegraph.options.groups.visibility[groupId] == true);
	  } else {
	    return false;
	  }
	};
	/**
	 * Get the data range of the item set.
	 * @returns {{min: Date, max: Date}} range  A range with a start and end Date.
	 *                                          When no minimum is found, min==null
	 *                                          When no maximum is found, max==null
	 */


	Graph2d.prototype.getDataRange = function () {
	  var min = null;
	  var max = null; // calculate min from start filed

	  for (var groupId in this.linegraph.groups) {
	    if (this.linegraph.groups.hasOwnProperty(groupId)) {
	      if (this.linegraph.groups[groupId].visible == true) {
	        for (var i = 0; i < this.linegraph.groups[groupId].itemsData.length; i++) {
	          var item = this.linegraph.groups[groupId].itemsData[i];
	          var value = util$1.convert(item.x, 'Date').valueOf();
	          min = min == null ? value : min > value ? value : min;
	          max = max == null ? value : max < value ? value : max;
	        }
	      }
	    }
	  }

	  return {
	    min: min != null ? new Date(min) : null,
	    max: max != null ? new Date(max) : null
	  };
	};
	/**
	 * Generate Timeline related information from an event
	 * @param {Event} event
	 * @return {Object} An object with related information, like on which area
	 *                  The event happened, whether clicked on an item, etc.
	 */


	Graph2d.prototype.getEventProperties = function (event) {
	  var clientX = event.center ? event.center.x : event.clientX;
	  var clientY = event.center ? event.center.y : event.clientY;
	  var x = clientX - util$1.getAbsoluteLeft(this.dom.centerContainer);
	  var y = clientY - util$1.getAbsoluteTop(this.dom.centerContainer);

	  var time = this._toTime(x);

	  var customTime = CustomTime.customTimeFromTarget(event);
	  var element = util$1.getTarget(event);
	  var what = null;

	  if (util$1.hasParent(element, this.timeAxis.dom.foreground)) {
	    what = 'axis';
	  } else if (this.timeAxis2 && util$1.hasParent(element, this.timeAxis2.dom.foreground)) {
	    what = 'axis';
	  } else if (util$1.hasParent(element, this.linegraph.yAxisLeft.dom.frame)) {
	    what = 'data-axis';
	  } else if (util$1.hasParent(element, this.linegraph.yAxisRight.dom.frame)) {
	    what = 'data-axis';
	  } else if (util$1.hasParent(element, this.linegraph.legendLeft.dom.frame)) {
	    what = 'legend';
	  } else if (util$1.hasParent(element, this.linegraph.legendRight.dom.frame)) {
	    what = 'legend';
	  } else if (customTime != null) {
	    what = 'custom-time';
	  } else if (util$1.hasParent(element, this.currentTime.bar)) {
	    what = 'current-time';
	  } else if (util$1.hasParent(element, this.dom.center)) {
	    what = 'background';
	  }

	  var value = [];
	  var yAxisLeft = this.linegraph.yAxisLeft;
	  var yAxisRight = this.linegraph.yAxisRight;

	  if (!yAxisLeft.hidden && this.itemsData.length > 0) {
	    value.push(yAxisLeft.screenToValue(y));
	  }

	  if (!yAxisRight.hidden && this.itemsData.length > 0) {
	    value.push(yAxisRight.screenToValue(y));
	  }

	  return {
	    event: event,
	    customTime: customTime ? customTime.options.id : null,
	    what: what,
	    pageX: event.srcEvent ? event.srcEvent.pageX : event.pageX,
	    pageY: event.srcEvent ? event.srcEvent.pageY : event.pageY,
	    x: x,
	    y: y,
	    time: time,
	    value: value
	  };
	};
	/**
	 * Load a configurator
	 * @return {Object}
	 * @private
	 */


	Graph2d.prototype._createConfigurator = function () {
	  return new Configurator(this, this.dom.container, configureOptions$1);
	};

	// Locales have to be supplied by the user.
	var defaultLanguage = getNavigatorLanguage();
	moment__default['default'].locale(defaultLanguage);
	var timeline = {
	  Core: Core,
	  DateUtil: DateUtil,
	  Range: Range,
	  stack: stack$1,
	  TimeStep: TimeStep,
	  components: {
	    items: {
	      Item: Item,
	      BackgroundItem: BackgroundItem,
	      BoxItem: BoxItem,
	      ClusterItem: ClusterItem,
	      PointItem: PointItem,
	      RangeItem: RangeItem
	    },
	    BackgroundGroup: BackgroundGroup,
	    Component: Component,
	    CurrentTime: CurrentTime,
	    CustomTime: CustomTime,
	    DataAxis: DataAxis,
	    DataScale: DataScale,
	    GraphGroup: GraphGroup,
	    Group: Group,
	    ItemSet: ItemSet,
	    Legend: Legend,
	    LineGraph: LineGraph,
	    TimeAxis: TimeAxis
	  }
	};

	exports.Graph2d = Graph2d;
	exports.Timeline = Timeline;
	exports.timeline = timeline;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vis-timeline-graph2d.js.map
