require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){

module.exports = exports = Change;

/*!
 * Change object constructor
 *
 * The `change` object passed to Object.observe callbacks
 * is immutable so we create a new one to modify.
 */

function Change (path, change) {
  this.path = path;
  this.name = change.name;
  this.type = change.type;
  this.object = change.object;
  this.value = change.object[change.name];
  this.oldValue = change.oldValue;
}


},{}],3:[function(require,module,exports){

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}

},{}],"observed":[function(require,module,exports){
// http://wiki.ecmascript.org/doku.php?id=harmony:observe

var Change = require('./change');
var Emitter = require('events').EventEmitter;
var debug = require('debug')('observed');

module.exports = exports = Observable;

/**
 * Observable constructor.
 *
 * The passed `subject` will be observed for changes to
 * all properties, included nested objects and arrays.
 *
 * An `EventEmitter` will be returned. This emitter will
 * emit the following events:
 *
 * - add
 * - update
 * - delete
 * - reconfigure
 *
 * // - setPrototype?
 *
 * @param {Object} subject
 * @param {Observable} [parent] (internal use)
 * @param {String} [prefix] (internal use)
 * @return {EventEmitter}
 */

function Observable (subject, parent, prefix) {
  if ('object' != typeof subject)
    throw new TypeError('object expected. got: ' + typeof subject);

  if (!(this instanceof Observable))
    return new Observable(subject, parent, prefix);

  debug('new', subject, !!parent, prefix);

  Emitter.call(this);
  this._bind(subject, parent, prefix);
};

// add emitter capabilities
for (var i in Emitter.prototype) {
  Observable.prototype[i] = Emitter.prototype[i];
}

Observable.prototype.observers = undefined;
Observable.prototype.onchange = undefined;
Observable.prototype.subject = undefined;

/**
 * Binds this Observable to `subject`.
 *
 * @param {Object} subject
 * @param {Observable} [parent]
 * @param {String} [prefix]
 * @api private
 */

Observable.prototype._bind = function (subject, parent, prefix) {
  if (this.subject) throw new Error('already bound!');
  if (null == subject) throw new TypeError('subject cannot be null');

  debug('_bind', subject);

  this.subject = subject;

  if (parent) {
    parent.observers.push(this);
  } else {
    this.observers = [this];
  }

  this.onchange = onchange(parent || this, prefix);
  Object.observe(this.subject, this.onchange);

  this._walk(parent || this, prefix);
}

/**
 * Pending change events are not emitted until after the next
 * turn of the event loop. This method forces the engines hand
 * and triggers all events now.
 *
 * @api public
 */

Observable.prototype.deliverChanges = function () {
  debug('deliverChanges')
  this.observers.forEach(function(o) {
    Object.deliverChangeRecords(o.onchange);
  });
}

/**
 * Walk down through the tree of our `subject`, observing
 * objects along the way.
 *
 * @param {Observable} [parent]
 * @param {String} [prefix]
 * @api private
 */

Observable.prototype._walk = function (parent, prefix) {
  debug('_walk');

  var object = this.subject;

  // keys?
  Object.keys(object).forEach(function (name) {
    var value = object[name];

    if ('object' != typeof value) return;
    if (null == value) return;

    var path = prefix
      ? prefix + '.' + name
      : name;

    new Observable(value, parent, path);
  });
}

/**
 * Stop listening to all bound objects
 */

Observable.prototype.stop = function () {
  debug('stop');

  this.observers.forEach(function (observer) {
    Object.unobserve(observer.subject, observer.onchange);
  });
}

/**
 * Stop listening to changes on `subject`
 *
 * @param {Object} subject
 * @api private
 */

Observable.prototype._remove = function (subject) {
  debug('_remove', subject);

  this.observers = this.observers.filter(function (observer) {
    if (subject == observer.subject) {
      Object.unobserve(observer.subject, observer.onchange);
      return false;
    }

    return true;
  });
}

/*!
 * Creates an Object.observe `onchange` listener
 */

function onchange (parent, prefix) {
  return function (ary) {
    debug('onchange', prefix);

    ary.forEach(function (change) {
      var object = change.object;
      var type = change.type;
      var name = change.name;
      var value = object[name];

      var path = prefix
        ? prefix + '.' + name
        : name

      if ('add' == type && null != value && 'object' == typeof value) {
        new Observable(value, parent, path);
      } else if ('delete' == type && 'object' == typeof change.oldValue) {
        parent._remove(change.oldValue);
      }

      change = new Change(path, change);
      parent.emit(type, change);
      parent.emit(type + ' ' + path, change);
      parent.emit('change', change);
      parent.emit('change' + ' ' + path, change);
    })
  }
}


},{"./change":2,"debug":3,"events":1}]},{},[]);

(function (window){
  window.gapiMockData = {};
})(window);

(function (gapiMockData){
  gapiMockData.users = [{
      "id": "c173f77e-7069-45bb-9d08-99bd2db7faf8",
      "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
      "username": "michael.sanchez@awesome.io",
      "creationDate": "2014-05-12T15:45:20.289Z",
      "firstName": "Michael",
      "lastName": "Sanchez",
      "email": "michael.sanchez@awesome.io",
      "telephone": "+1123-456-7890",
      "lastLogin": "2014-08-18T12:03:40.000Z",
      "status": 1,
      "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu"
      ],
      "termsAcceptanceDate": "2014-06-19T18:01:33.000Z",
      "showTutorial": false,
      "mailSyncEnabled": false,
      "changedBy": "bloosbrock@gmail.com",
      "changeDate": "2014-07-18T11:38:24.668Z"
    },
    {
     "id": "3ba4cafc-a1ed-42ac-aaea-28529f56ebf5",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "alex.deaconu@gmail.com",
     "creationDate": "2012-03-12T15:11:34.000Z",
     "firstName": "Alex",
     "lastName": "Deaconu",
     "email": "alex.deaconu@gmail.com",
     "lastLogin": "2014-09-04T21:40:39.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "sa"
     ],
     "termsAcceptanceDate": "2010-10-25T20:50:48.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "alex.deaconu@gmail.com",
     "changeDate": "2014-06-02T15:19:14.229Z",
     "kind": "core#userItem"
    },
    {
     "id": "6818ccfe-8fb6-47b5-8d1f-8f158bd17346",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "alex.kolenoff@risedisplay.com",
     "creationDate": "2014-05-20T20:13:29.942Z",
     "firstName": "Alex",
     "lastName": "Kolenoff",
     "email": "alex.kolenoff@risedisplay.com",
     "lastLogin": "2014-08-28T19:11:06.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-05-20T20:16:46.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "alex.kolenoff@risedisplay.com",
     "changeDate": "2014-05-20T20:17:14.286Z",
     "kind": "core#userItem"
    },
    {
     "id": "48a1381e-d7b0-456e-a660-08faf0b0c953",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "alexey.konovalov@risevision.com",
     "creationDate": "2012-09-27T21:38:52.778Z",
     "firstName": "Alexey",
     "lastName": "Konovalov",
     "email": "alexey.konovalov@risevision.com",
     "lastLogin": "2014-08-28T18:59:43.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-04-08T18:48:57.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "alexey.konovalov@risevision.com",
     "changeDate": "2014-04-08T18:52:07.423Z",
     "kind": "core#userItem"
    },
    {
     "id": "a05a9a0c-9cd8-4cce-986d-a733646e8503",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "asc@risedisplay.com",
     "creationDate": "2012-07-23T14:58:02.900Z",
     "firstName": "Alan",
     "lastName": "Clayton",
     "email": "asc@risedisplay.com",
     "lastLogin": "2014-05-20T23:04:39.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "sa"
     ],
     "termsAcceptanceDate": "2012-07-23T19:07:22.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2014-01-02T22:18:09.007Z",
     "kind": "core#userItem"
    },
    {
     "id": "4deaed13-376c-456d-802c-63809efa8de0",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "asc@risevision.com",
     "creationDate": "2014-04-16T21:55:18.491Z",
     "email": "asc@risevision.com",
     "lastLogin": "2014-09-05T13:38:12.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-04-16T21:55:38.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "asc@risevision.com",
     "changeDate": "2014-05-16T17:12:58.761Z",
     "kind": "core#userItem"
    },
    {
     "id": "bcd83e2d-49c8-4675-a94b-7da0698785f0",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "bld@riseholdings.com",
     "creationDate": "2012-04-26T17:39:36.000Z",
     "firstName": "Byron",
     "lastName": "Darlison",
     "telephone": "416-602-2229",
     "email": "bld@riseholdings.com",
     "lastLogin": "2014-09-05T13:27:59.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2012-04-26T17:43:57.000Z",
     "showTutorial": true,
     "mailSyncEnabled": true,
     "changedBy": "bloosbrock@gmail.com",
     "changeDate": "2014-06-16T12:55:30.143Z",
     "kind": "core#userItem"
    },
    {
     "id": "843f5780-624d-46de-abbf-0c26475f45a8",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "bloosbrock@gmail.com",
     "creationDate": "2012-03-21T21:21:34.000Z",
     "firstName": "Brian",
     "lastName": "Loosbrock",
     "email": "bloosbrock@gmail.com",
     "lastLogin": "2014-09-02T13:32:36.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2012-03-21T21:21:59.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "bloosbrock@gmail.com",
     "changeDate": "2014-07-18T11:36:45.875Z",
     "kind": "core#userItem"
    },
    {
     "id": "7dfe567a-3e04-4e6c-8263-730ea12e7db4",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "byron.darlison@gmail.com",
     "creationDate": "2011-07-23T10:34:49.000Z",
     "firstName": "Byron",
     "lastName": "Darlison",
     "telephone": "416-602-2229",
     "email": "byron.darlison@gmail.com",
     "lastLogin": "2012-09-08T09:58:50.000Z",
     "status": 1,
     "roles": [
      "da",
      "ua",
      "sa",
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "2010-09-28T17:02:20.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2012-09-15T10:02:52.889Z",
     "kind": "core#userItem"
    },
    {
     "id": "b598ad16-9d5f-43db-b72f-6f7b7c8a9c5b",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "del@risedisplay.com",
     "creationDate": "2013-01-14T22:51:01.396Z",
     "firstName": "David",
     "lastName": "Lugo",
     "email": "del@risedisplay.com",
     "lastLogin": "2014-08-28T22:31:02.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2013-01-15T14:24:46.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "bloosbrock@gmail.com",
     "changeDate": "2014-06-23T16:04:36.169Z",
     "kind": "core#userItem"
    },
    {
     "id": "8967ccb0-b721-4cef-a6bb-6d970bee3406",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "dlichtenauer82@gmail.com",
     "creationDate": "2011-04-22T16:27:27.000Z",
     "firstName": "Derek",
     "lastName": "Lichtenauer",
     "email": "dlichtenauer82@gmail.com",
     "lastLogin": "2012-08-02T13:49:31.000Z",
     "status": 1,
     "roles": [
      "da",
      "ua",
      "sa",
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "2011-04-22T16:27:27.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2012-08-09T13:51:53.444Z",
     "kind": "core#userItem"
    },
    {
     "id": "55d556ba-7e3e-454b-890b-151ee8299638",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "donnapep@gmail.com",
     "creationDate": "2011-07-19T02:20:57.000Z",
     "firstName": "Donna",
     "lastName": "Peplinskie",
     "email": "donnapep@gmail.com",
     "lastLogin": "2014-09-08T20:40:56.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2010-12-10T14:39:29.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "donnapep@gmail.com",
     "changeDate": "2014-05-13T17:10:14.519Z",
     "kind": "core#userItem"
    },
    {
     "id": "ea2c683c-d9f1-4b26-a5d5-04129397acbc",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "grant.matabaran@risedisplay.com",
     "creationDate": "2014-03-03T20:52:59.593Z",
     "email": "grant.matabaran@risedisplay.com",
     "lastLogin": "2014-03-04T13:19:54.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-03-05T03:09:18.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "grant.matabaran@risedisplay.com",
     "changeDate": "2014-03-04T10:56:37.448Z",
     "kind": "core#userItem"
    },
    {
     "id": "c093cb5b-b9a2-412d-a54e-bd392f06ea6d",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "joncoedisko@gmail.com",
     "creationDate": "2013-11-20T22:08:28.951Z",
     "firstName": "Jon",
     "lastName": "Coe",
     "email": "joncoedisko@gmail.com",
     "lastLogin": "2013-11-27T16:29:39.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua"
     ],
     "termsAcceptanceDate": "2013-11-27T16:31:04.000Z",
     "showTutorial": true,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2013-12-04T16:32:29.607Z",
     "kind": "core#userItem"
    },
    {
     "id": "8a3d4cba-5f96-46a0-88bf-6f3621b755c2",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "jrs@risevision.com",
     "creationDate": "2014-05-14T19:12:09.775Z",
     "firstName": "Justin",
     "lastName": "Smith",
     "email": "jrs@risevision.com",
     "lastLogin": "2014-08-28T19:17:29.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "sa"
     ],
     "termsAcceptanceDate": "2014-05-14T19:12:16.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "jrs@risevision.com",
     "changeDate": "2014-05-14T19:12:46.051Z",
     "kind": "core#userItem"
    },
    {
     "id": "8127afe4-2c43-46fc-959d-3add2d959b7e",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "m.farooq2000@gmail.com",
     "creationDate": "2014-03-12T19:16:13.843Z",
     "email": "m.farooq2000@gmail.com",
     "lastLogin": "2014-08-30T23:32:41.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-03-12T19:17:36.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "m.farooq2000@gmail.com",
     "changeDate": "2014-04-17T01:30:56.272Z",
     "kind": "core#userItem"
    },
    {
     "id": "2b4711f9-c200-4513-9162-299737453c7a",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "mlm@risedisplay.com",
     "creationDate": "2011-04-26T21:19:56.000Z",
     "firstName": "Mat",
     "lastName": "Meiers",
     "email": "mlm@risedisplay.com",
     "lastLogin": "2014-08-20T13:23:50.000Z",
     "status": 1,
     "roles": [
      "da",
      "ua",
      "sa",
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "2011-04-26T21:20:06.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2014-01-22T20:39:30.403Z",
     "kind": "core#userItem"
    },
    {
     "id": "e2521f10-4bd5-4a88-a9fd-5e785428e32c",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "mona.hotnsweet@gmail.com",
     "creationDate": "2011-07-14T00:21:34.000Z",
     "firstName": "Moneka",
     "email": "Mona.hotnsweet@gmail.com",
     "lastLogin": "2011-09-12T05:58:12.000Z",
     "status": 1,
     "roles": [
      "da",
      "ua",
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "2011-06-19T15:46:45.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "mona.hotnsweet@gmail.com",
     "changeDate": "2012-04-03T20:52:52.000Z",
     "kind": "core#userItem"
    },
    {
     "id": "0b9fcaa9-aa34-4062-add4-c59ba55cd07c",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "neal.godbeer@risevision.com",
     "creationDate": "2011-07-21T19:22:03.000Z",
     "firstName": "Neal",
     "lastName": "Godbeer",
     "email": "neal.godbeer@risevision.com",
     "lastLogin": "2014-09-08T14:44:31.000Z",
     "status": 1,
     "roles": [
      "da",
      "ua",
      "sa",
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "2010-11-22T14:42:32.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2014-01-24T21:56:01.730Z",
     "kind": "core#userItem"
    },
    {
     "id": "86494257-ce0d-4ec2-acfc-f5e07999b9d0",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "oleg.khasimkhanov@gmail.com",
     "creationDate": "2010-11-26T21:27:09.000Z",
     "firstName": "Oleg",
     "lastName": "K",
     "email": "oleg.khasimkhanov@risevision.com",
     "lastLogin": "2014-06-09T20:13:48.000Z",
     "status": 1,
     "roles": [
      "da",
      "ua",
      "sa",
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "2014-06-09T20:10:58.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "oleg.khasimkhanov@gmail.com",
     "changeDate": "2014-06-09T20:10:58.347Z",
     "kind": "core#userItem"
    },
    {
     "id": "5b830b65-dd83-4e03-9005-53e630897f54",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "oleg.khasimkhanov@risevision.com",
     "creationDate": "2010-09-24T14:33:45.000Z",
     "firstName": "Oleg",
     "lastName": "K",
     "email": "oleg.khasimkhanov@risevision.com",
     "lastLogin": "2014-08-18T14:48:00.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2010-09-24T14:33:35.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "oleg.khasimkhanov@risevision.com",
     "changeDate": "2014-03-26T19:32:19.623Z",
     "kind": "core#userItem"
    },
    {
     "id": "17167611-4598-42fb-847a-0b8ce1434ce3",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "riseqa1@gmail.com",
     "creationDate": "2013-11-19T16:45:54.453Z",
     "firstName": "Rise",
     "lastName": "QA",
     "email": "riseqa1@gmail.com",
     "lastLogin": "2013-11-20T16:28:58.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua"
     ],
     "termsAcceptanceDate": "1970-01-01T00:00:00.000Z",
     "showTutorial": true,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2013-11-27T16:29:21.270Z",
     "kind": "core#userItem"
    },
    {
     "id": "33a8c657-3fc5-4549-89bc-27b44ae656b2",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "rjcahoy@gmail.com",
     "creationDate": "2012-02-01T13:36:32.000Z",
     "email": "rjcahoy@gmail.com",
     "lastLogin": "2013-10-24T19:52:39.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "sa"
     ],
     "termsAcceptanceDate": "2012-02-01T13:37:05.000Z",
     "showTutorial": true,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2013-10-31T19:55:20.069Z",
     "kind": "core#userItem"
    },
    {
     "id": "cb6c1ba7-8b74-45ae-bfb1-4d7ee4acdf92",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "robb.price@risevision.com",
     "creationDate": "2011-08-04T20:20:09.000Z",
     "firstName": "Robb",
     "lastName": "Price",
     "email": "robb.price@risevision.com",
     "lastLogin": "2014-09-08T15:35:21.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2010-10-28T14:03:39.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "robb.price@risevision.com",
     "changeDate": "2014-06-11T20:47:45.586Z",
     "kind": "core#userItem"
    },
    {
     "id": "4c4f5d13-90fe-4cba-948e-20fae8ff5d1a",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "sethspencerbalugo@gmail.com",
     "creationDate": "2013-07-16T16:39:58.480Z",
     "firstName": "Seth",
     "email": "sethspencerbalugo@gmail.com",
     "lastLogin": "2013-08-20T03:12:50.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "1970-01-01T00:00:00.000Z",
     "showTutorial": true,
     "mailSyncEnabled": true,
     "changedBy": "System",
     "changeDate": "2013-08-27T03:15:44.471Z",
     "kind": "core#userItem"
    },
    {
     "id": "113f7770-bcf9-49cd-8e35-6eb23354247f",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "steve.sherrie@risevision.com",
     "creationDate": "2014-04-30T13:46:53.268Z",
     "firstName": "Steve",
     "lastName": "Sherrie",
     "email": "steve.sherrie@risevision.com",
     "lastLogin": "2014-08-28T18:39:36.000Z",
     "status": 1,
     "roles": [
      "ce",
      "ua",
      "ba"
     ],
     "termsAcceptanceDate": "2014-05-06T14:19:57.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "steve.sherrie@risevision.com",
     "changeDate": "2014-08-28T18:39:30.513Z",
     "kind": "core#userItem"
    },
    {
     "id": "58eb416d-7eb2-44d3-8cde-c3d71db56171",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "stuart.lees@risevision.com",
     "creationDate": "2014-04-24T13:08:06.944Z",
     "firstName": "Stu",
     "lastName": "Lees",
     "email": "stuart.lees@risevision.com",
     "lastLogin": "2014-09-05T19:54:17.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-04-28T16:48:36.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "stuart.lees@risevision.com",
     "changeDate": "2014-04-28T16:48:36.831Z",
     "kind": "core#userItem"
    },
    {
     "id": "efdb88d5-40d7-4bd1-b1bb-48d4735b0ec8",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "todd.hemme@gmail.com",
     "creationDate": "2012-02-07T20:54:46.000Z",
     "firstName": "Todd",
     "lastName": "Hemme",
     "email": "todd.hemme@gmail.com",
     "lastLogin": "2013-07-31T21:46:00.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "sa"
     ],
     "termsAcceptanceDate": "2012-03-06T00:23:07.000Z",
     "showTutorial": true,
     "mailSyncEnabled": true,
     "changedBy": "bloosbrock@gmail.com",
     "changeDate": "2014-02-18T15:02:24.669Z",
     "kind": "core#userItem"
    },
    {
     "id": "906e7fe1-32a2-46d6-93d9-649bc2fffc55",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "todd.hemme@risevision.com",
     "creationDate": "2011-05-18T15:40:15.000Z",
     "firstName": "Todd",
     "lastName": "Hemme",
     "email": "todd.hemme@risevision.com",
     "lastLogin": "2013-04-18T18:45:38.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "sa"
     ],
     "termsAcceptanceDate": "2011-05-18T15:40:14.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "bloosbrock@gmail.com",
     "changeDate": "2014-02-18T15:02:03.809Z",
     "kind": "core#userItem"
    },
    {
     "id": "700da7cd-2a35-484b-ab0b-cb41c44dfcf2",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "tyler.johnson@risevision.com",
     "creationDate": "2014-05-01T14:21:29.978Z",
     "firstName": "Tyler",
     "email": "tyler.johnson@risevision.com",
     "lastLogin": "2014-09-08T21:07:35.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-05-06T13:35:55.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "tyler.johnson@risevision.com",
     "changeDate": "2014-07-30T21:43:39.598Z",
     "kind": "core#userItem"
    },
    {
     "id": "fc599d9b-4688-456e-a318-1df36cd9df54",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "ufomurphy@gmail.com",
     "creationDate": "2011-02-06T07:06:39.000Z",
     "firstName": "Bill",
     "lastName": "Murphy",
     "email": "ufomurphy@gmail.com",
     "lastLogin": "2011-04-28T03:57:35.000Z",
     "status": 1,
     "roles": [
      "da",
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "2011-02-06T07:06:39.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "ufomurphy@gmail.com",
     "changeDate": "2012-04-03T20:52:49.000Z",
     "kind": "core#userItem"
    },
    {
     "id": "23a7465c-08d9-4a14-9fa4-2a12fc039927",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "varun@rangle.io",
     "creationDate": "2014-07-18T11:37:39.910Z",
     "firstName": "Varun",
     "lastName": "Vachhar",
     "email": "varun@rangle.io",
     "lastLogin": "2014-09-03T23:33:29.000Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-07-30T21:10:26.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "varun@rangle.io",
     "changeDate": "2014-07-30T21:10:26.768Z",
     "kind": "core#userItem"
    },
    {
     "id": "99656071-b827-4e39-8f65-8831c698dae1",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "web.worker.82@gmail.com",
     "creationDate": "2011-03-11T22:25:49.000Z",
     "firstName": "Alex",
     "lastName": "Babut",
     "email": "web.worker.82@gmail.com",
     "lastLogin": "2011-03-13T21:10:24.000Z",
     "status": 1,
     "roles": [
      "da",
      "ua",
      "sa",
      "ce",
      "cp"
     ],
     "termsAcceptanceDate": "2011-03-11T22:25:50.000Z",
     "showTutorial": false,
     "mailSyncEnabled": true,
     "changedBy": "web.worker.82@gmail.com",
     "changeDate": "2012-04-03T20:52:50.000Z",
     "kind": "core#userItem"
    },
    {
     "id": "c173f77e-7069-45bb-9d08-99bd2db7faf8",
     "companyId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
     "username": "xiyang@rangle.io",
     "creationDate": "2014-05-12T15:45:20.289Z",
     "firstName": "Xiyang",
     "lastName": "Chen",
     "email": "xiyang@rangle.io",
     "lastLogin": "2014-09-08T21:11:37.424Z",
     "status": 1,
     "roles": [
      "ce",
      "cp",
      "da",
      "ua",
      "pu",
      "ba",
      "sa"
     ],
     "termsAcceptanceDate": "2014-06-19T18:01:33.000Z",
     "showTutorial": false,
     "mailSyncEnabled": false,
     "changedBy": "bloosbrock@gmail.com",
     "changeDate": "2014-07-18T11:38:24.668Z",
     "kind": "core#userItem"
    }
   ];
})(window.gapiMockData);

(function (gapiMockData) {
  "use strict";

gapiMockData.companies = [
  {
    "id": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "name": "Rise Vision Test Co.",
    "street": "302 The East Mall",
    "unit": "Suite 301",
    "city": "Etobicoke",
    "province": "ON",
    "country": "CA",
    "postalCode": "M9B 6C7",
    "telephone": "416-538-1291",
    "latitude": 43.6371538,
    "longitude": -79.5570762,
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2010-05-13T20:15:01.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2010-05-13T20:15:01.000Z",
    "changedBy": "steve.sherrie@risevision.com",
    "changeDate": "2014-05-23T20:03:01.635Z",
    "kind": "core#userItem",
    "authKey": "b428b4e8-c8b9-41d5-8a10-b4193c789443"
  },
  {
    "id": "5129927f-44dc-44ea-9f1e-83f6e86d8aa4",
    "authKey": "5129927f-44dc-44ea-9f1e-83f6e86d8aa4",
    "name": "0ThrasherBeer0@gmail.com's Company",
    "street": "15 Toronto St",
    "unit": "#208",
    "city": "Toronto",
    "province": "ON",
    "country": "CA",
    "postalCode": "M5A 4P7",
    "address": "15 Toronto St, #208, Toronto, ON, CA, M5A 4P7",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-10-07T15:37:25.858Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-10-07T15:37:25.858Z",
    "changedBy": "steve.sherrie@risevision.com",
    "changeDate": "2014-05-23T16:36:14.523Z",
    "kind": "core#companyItem"
  },
  {
    "id": "87717b9a-9dcc-4ea7-948c-028f03f62d01",
    "name": "2nd Child Company",
    "street": "15 Toronto St",
    "unit": "1101",
    "city": "Toronto",
    "province": "ON",
    "country": "CA",
    "postalCode": "M5A 2N7",
    "address": "15 Toronto St, 1101, Toronto, ON, CA, M5A 2N7",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "06fcbf8f-c1a2-4e3e-b4ad-48372650d74b",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-27T15:01:36.541Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-27T15:01:36.540Z",
    "changedBy": "System",
    "changeDate": "2014-05-28T19:28:03.263Z",
    "kind": "core#companyItem",
    "authKey": "87717b9a-9dcc-4ea7-948c-028f03f62d01"
  },
  {
    "id": "029f2040-1126-4a30-9ca3-af33911ec753",
    "name": "32k Studios",
    "street": "760 Market St #733",
    "unit": "sdfsdfsdf",
    "city": "San",
    "province": "CA",
    "country": "US",
    "postalCode": "94102",
    "address": "760 Market St #733, sdfsdfsdf, San, CA, US, 94102",
    "timeZone": "(GMT -08:00) Pacific Time (US & Canada); Tijuana",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-09-17T20:34:13.184Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-09-17T20:34:13.184Z",
    "changedBy": "steve.sherrie@risevision.com",
    "changeDate": "2014-05-08T18:36:38.977Z",
    "kind": "core#companyItem",
    "authKey": "029f2040-1126-4a30-9ca3-af33911ec753"
  },
  {
    "id": "818e8218-1337-4077-823b-476238992bf1",
    "name": "360sd1@gmail.com's Company",
    "street": "15 Toronto St",
    "unit": "1101",
    "city": "Toronto",
    "province": "ON",
    "country": "CA",
    "postalCode": "M5a 2n7",
    "address": "15 Toronto St, 1101, Toronto, ON, CA, M5a 2n7",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-10-07T19:09:50.769Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-10-07T19:09:50.769Z",
    "changedBy": "steve.sherrie@risevision.com",
    "changeDate": "2014-05-28T16:16:48.162Z",
    "kind": "core#companyItem",
    "authKey": "818e8218-1337-4077-823b-476238992bf1"
  },
  {
    "id": "ed4461f5-f689-4e78-a97a-4b58deeb3694",
    "name": "930test company",
    "street": "15 Toronto St",
    "unit": "1101",
    "city": "Toronto",
    "province": "ON",
    "country": "CA",
    "postalCode": "M5a 2n7",
    "address": "15 Toronto St, 1101, Toronto, ON, CA, M5a 2n7",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "02b4d323-58cd-408f-a7d3-b7fa57ddce07",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-11-14T20:24:20.666Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-11-14T20:24:20.660Z",
    "changedBy": "steve.sherrie@risevision.com",
    "changeDate": "2014-05-30T17:55:07.547Z",
    "kind": "core#companyItem",
    "authKey": "ed4461f5-f689-4e78-a97a-4b58deeb3694"
  },
  {
    "id": "3be0ee48-6e94-4d68-be4e-23e4e99a1b9e",
    "name": "AB Pro Video",
    "province": "NY",
    "country": "US",
    "address": "NY, US",
    "timeZone": "(GMT -06:00) Central Time (US & Canada)",
    "parentId": "984ec29b-c284-477e-b674-fea446559234",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-08-09T20:14:06.239Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-08-09T20:14:06.239Z",
    "changedBy": "DSallander@gmail.com",
    "changeDate": "2013-08-09T20:24:02.559Z",
    "kind": "core#companyItem",
    "authKey": "3be0ee48-6e94-4d68-be4e-23e4e99a1b9e"
  },
  {
    "id": "27d5fa3d-a66a-47a9-9a6d-10041751ce09",
    "authKey": "27d5fa3d-a66a-47a9-9a6d-10041751ce09",
    "name": "ABBA Company",
    "street": "14 Hughes Court",
    "city": "Brampton",
    "province": "ON",
    "country": "CA",
    "postalCode": "L6S2C6",
    "address": "14 Hughes Court, Brampton, ON, CA, L6S2C6",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "1ee87dab-449c-4022-87b2-3daa3c027303",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-06-10T17:35:17.781Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-06-10T17:35:17.779Z",
    "changedBy": "rvacomp.m@gmail.com",
    "changeDate": "2014-06-10T17:41:46.592Z",
    "kind": "core#companyItem"
  },
  {
    "id": "752fdcc2-8a28-4567-b111-e7ed825bf341",
    "name": "AC DC Company",
    "street": "1600 Pennsylvania Avenue",
    "city": "Washington, DC",
    "province": "WA",
    "country": "US",
    "postalCode": "20500",
    "address": "1600 Pennsylvania Avenue, Washington, DC, WA, US, 20500",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "34843567-9413-4e3c-babc-f0d47adced57",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-23T13:32:33.185Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-23T13:32:33.184Z",
    "changedBy": "rvacomp.h@gmail.com",
    "changeDate": "2014-06-10T13:25:21.841Z",
    "kind": "core#companyItem",
    "authKey": "752fdcc2-8a28-4567-b111-e7ed825bf341"
  },
  {
    "id": "984ec29b-c284-477e-b674-fea446559234",
    "name": "AVAD",
    "province": "NY",
    "country": "US",
    "address": "NY, US",
    "timeZone": "(GMT -06:00) Central Time (US & Canada)",
    "parentId": "0d0f9bb6-8ca2-41ff-b201-71863b13dbdc",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-08-09T20:12:16.430Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-08-09T20:12:16.430Z",
    "changedBy": "DSallander@gmail.com",
    "changeDate": "2013-08-09T20:12:43.881Z",
    "kind": "core#companyItem",
    "authKey": "984ec29b-c284-477e-b674-fea446559234"
  },
  {
    "id": "f059a036-9967-4811-b9a0-9bcc89ceabae",
    "name": "AbeUlibarri@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-06-25T20:34:44.513Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-06-25T20:34:44.513Z",
    "changedBy": "AbeUlibarri@gmail.com",
    "changeDate": "2013-06-25T20:34:44.516Z",
    "kind": "core#companyItem",
    "authKey": "f059a036-9967-4811-b9a0-9bcc89ceabae"
  },
  {
    "id": "ea6656be-dc19-49d2-85da-ea88be5a6693",
    "name": "Actionforblindpeople@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-10-01T14:33:28.786Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-10-01T14:33:28.785Z",
    "changedBy": "System",
    "changeDate": "2012-10-02T15:25:28.205Z",
    "kind": "core#companyItem",
    "authKey": "ea6656be-dc19-49d2-85da-ea88be5a6693"
  },
  {
    "id": "397defb6-1611-45bc-a693-52f2416da194",
    "name": "AdMe",
    "province": "NY",
    "country": "SI",
    "address": "NY, SI",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-02-10T11:37:45.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-02-10T11:37:45.000Z",
    "changedBy": "System",
    "changeDate": "2013-09-23T18:09:40.907Z",
    "kind": "core#companyItem",
    "authKey": "397defb6-1611-45bc-a693-52f2416da194"
  },
  {
    "id": "ea0477ff-0293-43e1-92f6-3f5f80d7b993",
    "name": "AdammeLeBaron@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-11-05T10:07:22.450Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-11-05T10:07:22.449Z",
    "changedBy": "AdammeLeBaron@gmail.com",
    "changeDate": "2012-11-05T10:07:22.455Z",
    "kind": "core#companyItem",
    "authKey": "ea0477ff-0293-43e1-92f6-3f5f80d7b993"
  },
  {
    "id": "e21875a0-c80b-409e-a6a0-cc7d3a05ac9c",
    "name": "Agosto, Inc.",
    "street": "420 5th Street North ",
    "unit": "Suite 400",
    "city": "Minneapolis",
    "province": "MN",
    "country": "US",
    "postalCode": "55401",
    "address": "420 5th Street North , Suite 400, Minneapolis, MN, US, 55401",
    "timeZone": "(GMT -06:00) Central Time (US & Canada)",
    "telephone": "612-605-3520",
    "fax": "612-605-3511",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-13T14:13:17.317Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-13T14:13:17.315Z",
    "notificationEmails": [
      "chris.bartling@agosto.com",
      "levi.tomes@agosto.com",
      "paul.lundberg@agosto.com"
    ],
    "changedBy": "System",
    "changeDate": "2014-05-13T14:24:41.691Z",
    "kind": "core#companyItem",
    "authKey": "e21875a0-c80b-409e-a6a0-cc7d3a05ac9c"
  },
  {
    "id": "6a438085-09dc-4bdc-953e-ed0317d3bdae",
    "name": "Alan Clayton",
    "street": "22109 West 83rd",
    "city": "Shawnee",
    "province": "KS",
    "country": "US",
    "postalCode": "66227",
    "address": "22109 West 83rd, Shawnee, KS, US, 66227",
    "timeZone": "(GMT -06:00) Central Time (US & Canada)",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-09-26T14:04:23.439Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-09-26T14:04:23.439Z",
    "changedBy": "System",
    "changeDate": "2014-02-17T20:22:16.601Z",
    "kind": "core#companyItem",
    "authKey": "6a438085-09dc-4bdc-953e-ed0317d3bdae"
  },
  {
    "id": "22c303cd-d3c4-4e11-9c5f-56282e5429ac",
    "name": "Alex Company",
    "city": "King City",
    "province": "ON",
    "country": "CA",
    "postalCode": "L7B 1A3",
    "address": "King City, ON, CA, L7B 1A3",
    "timeZone": "(GMT -05:00) Eastern Time (US & Canada)",
    "parentId": "b0002bf9-d7b3-4eab-a4fe-5bf56604d724",
    "networkOperatorStatus": 0,
    "networkOperatorStatusChangeDate": "2012-05-30T14:55:00.227Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-05-30T14:55:00.227Z",
    "changedBy": "System",
    "changeDate": "2013-05-17T15:26:30.626Z",
    "kind": "core#companyItem",
    "authKey": "22c303cd-d3c4-4e11-9c5f-56282e5429ac"
  },
  {
    "id": "17899fe3-db05-4ecd-ade4-a7106fe53784",
    "name": "Alex's QA",
    "city": "Toronto",
    "province": "ON",
    "country": "CA",
    "address": "Toronto, ON, CA",
    "timeZone": "(GMT -05:00) Eastern Time (US & Canada)",
    "parentId": "fb788f1f-7730-44fd-8e00-20066409f51f",
    "networkOperatorStatus": 0,
    "networkOperatorStatusChangeDate": "2012-04-03T21:24:01.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2011-06-30T20:08:57.000Z",
    "changedBy": "alex.deaconu@gmail.com",
    "changeDate": "2014-02-06T17:55:21.654Z",
    "kind": "core#companyItem",
    "authKey": "17899fe3-db05-4ecd-ade4-a7106fe53784"
  },
  {
    "id": "b8287203-13e1-4eba-99e6-ec21f37ed65a",
    "name": "Alex's QA PNO",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-03-07T18:28:42.836Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-03-07T18:28:42.834Z",
    "changedBy": "alex.deaconu@gmail.com",
    "changeDate": "2014-03-27T17:13:47.080Z",
    "kind": "core#companyItem",
    "authKey": "b8287203-13e1-4eba-99e6-ec21f37ed65a"
  },
  {
    "id": "6cff2085-ee68-48cc-901c-14128e8f04ca",
    "name": "AlexK Company",
    "province": "ON",
    "country": "CA",
    "address": "ON, CA",
    "timeZone": "(GMT -05:00) Eastern Time (US & Canada)",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-01-29T18:12:15.671Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-01-29T18:12:15.619Z",
    "changedBy": "System",
    "changeDate": "2014-03-07T19:30:32.513Z",
    "kind": "core#companyItem",
    "authKey": "6cff2085-ee68-48cc-901c-14128e8f04ca"
  },
  {
    "id": "0aac9657-bfcc-4554-a94e-5ea6e55e5dcf",
    "name": "Alexey's Test Sub-company #1",
    "street": "582 King Edward St. TEST",
    "city": "Winnipeg",
    "province": "MB",
    "country": "CA",
    "postalCode": "R3H0P1",
    "address": "582 King Edward St. TEST, Winnipeg, MB, CA, R3H0P1",
    "timeZone": "(GMT -06:00) Central Time (US & Canada)",
    "parentId": "d3373042-d125-4f24-9608-9f0d04fc5c62",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-16T19:42:03.808Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-16T19:42:03.807Z",
    "changedBy": "steve.sherrie@risevision.com",
    "changeDate": "2014-05-26T19:42:38.440Z",
    "kind": "core#companyItem",
    "authKey": "0aac9657-bfcc-4554-a94e-5ea6e55e5dcf"
  },
  {
    "id": "ca1daa40-22dc-47d9-b03a-73c7037dfb1b",
    "name": "Alpha",
    "street": "5 Mulcaster",
    "city": "Barrie",
    "province": "ON",
    "country": "CA",
    "postalCode": "L4M3L9",
    "address": "5 Mulcaster, Barrie, ON, CA, L4M3L9",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "53f061cd-fd94-4c1f-b65f-0ff080b6cce7",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-21T19:44:07.679Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-21T19:44:07.678Z",
    "changedBy": "rvacomp.j@gmail.com",
    "changeDate": "2014-05-29T14:28:05.388Z",
    "kind": "core#companyItem",
    "authKey": "ca1daa40-22dc-47d9-b03a-73c7037dfb1b"
  },
  {
    "id": "78a3ec26-115d-4822-915f-8b220b6df274",
    "name": "Amanzy",
    "province": "NY",
    "address": "NY",
    "timeZone": "(GMT +01:00) Amsterdam, Berlin, Bern, Rome, Paris, Stockholm, Vienna",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-01-05T20:25:38.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-01-05T20:25:38.000Z",
    "changedBy": "System",
    "changeDate": "2014-05-21T18:53:49.085Z",
    "kind": "core#companyItem",
    "authKey": "78a3ec26-115d-4822-915f-8b220b6df274"
  },
  {
    "id": "1260d334-f081-4d6b-81d1-11e52d2243a0",
    "name": "Aminashamnath92@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-04-04T02:31:51.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-04-04T02:31:51.000Z",
    "changedBy": "Aminashamnath92@gmail.com",
    "changeDate": "2012-04-04T02:31:51.000Z",
    "kind": "core#companyItem",
    "authKey": "1260d334-f081-4d6b-81d1-11e52d2243a0"
  },
  {
    "id": "2b6034c0-8030-4caa-b39a-920b7b324e87",
    "name": "Anderson Passive - embedded presentations",
    "province": "NY",
    "address": "NY",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2011-01-25T16:35:25.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2011-01-25T16:35:25.000Z",
    "changedBy": "neal.godbeer@risevision.com",
    "changeDate": "2012-04-03T20:52:13.000Z",
    "kind": "core#companyItem",
    "authKey": "2b6034c0-8030-4caa-b39a-920b7b324e87"
  },
  {
    "id": "857784b9-39d9-4cb3-bee4-a96036e66ced",
    "name": "Android Limited",
    "country": "UK",
    "address": "UK",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "8f393283-7f97-4bdd-9f94-28e40e8dbf0f",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-07-28T15:39:01.392Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-07-28T15:39:01.390Z",
    "changedBy": "System",
    "changeDate": "2014-07-28T15:47:14.990Z",
    "kind": "core#companyItem",
    "authKey": "857784b9-39d9-4cb3-bee4-a96036e66ced"
  },
  {
    "id": "fe3f1dd1-ccc2-4343-a796-c2a0a6a092ec",
    "name": "Applied Information Test Company",
    "province": "NY",
    "address": "NY",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2011-12-14T14:47:52.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2011-12-14T14:47:52.000Z",
    "changedBy": "System",
    "changeDate": "2012-06-19T23:48:31.082Z",
    "kind": "core#companyItem",
    "authKey": "fe3f1dd1-ccc2-4343-a796-c2a0a6a092ec"
  },
  {
    "id": "3509cd9b-e9ba-47d2-84bb-f954db4641b1",
    "name": "Aragorn Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-22T20:48:21.651Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-22T20:48:21.650Z",
    "changedBy": "System",
    "changeDate": "2014-05-27T14:50:30.695Z",
    "kind": "core#companyItem",
    "authKey": "3509cd9b-e9ba-47d2-84bb-f954db4641b1"
  },
  {
    "id": "d6119f4b-09de-4aba-8c56-2a334a32e492",
    "name": "Automated Testing Sub Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-01-17T16:42:13.188Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-01-17T16:42:13.188Z",
    "changedBy": "riseautomatedtesting4@gmail.com",
    "changeDate": "2013-05-07T17:41:09.876Z",
    "kind": "core#companyItem",
    "authKey": "d6119f4b-09de-4aba-8c56-2a334a32e492"
  },
  {
    "id": "4283485e-5b40-4c34-a7aa-e6fb1ad7bcf8",
    "name": "Automated Testing Sub company  (DO NOT DELETE)",
    "province": "NY",
    "address": "NY",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-06-27T20:47:52.772Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-04-12T15:50:09.000Z",
    "notificationEmails": [
      "robb.price@risevision.com"
    ],
    "changedBy": "System",
    "changeDate": "2014-01-30T21:12:26.659Z",
    "kind": "core#companyItem",
    "authKey": "4283485e-5b40-4c34-a7aa-e6fb1ad7bcf8"
  },
  {
    "id": "bfaf9b18-fd5b-475b-afe1-a511cd73662f",
    "name": "BOHEMEN2013@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-11-29T00:42:24.735Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-11-29T00:42:24.735Z",
    "changedBy": "BOHEMEN2013@gmail.com",
    "changeDate": "2012-11-29T00:42:24.781Z",
    "kind": "core#companyItem",
    "authKey": "bfaf9b18-fd5b-475b-afe1-a511cd73662f"
  },
  {
    "id": "38dbc98d-9f98-4fb3-8c1f-86a2b5a38733",
    "name": "Batman's badass company",
    "province": "NY",
    "address": "NY",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 0,
    "networkOperatorStatusChangeDate": "2012-05-25T20:01:10.694Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-05-25T20:01:10.694Z",
    "changedBy": "System",
    "changeDate": "2013-12-13T17:00:35.199Z",
    "kind": "core#companyItem",
    "authKey": "38dbc98d-9f98-4fb3-8c1f-86a2b5a38733"
  },
  {
    "id": "fd07c488-3266-4d71-a5b1-6e7a82e642cd",
    "name": "Bernard.Bermejo@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-07-11T00:31:48.815Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-07-11T00:31:48.789Z",
    "changedBy": "Bernard.Bermejo@gmail.com",
    "changeDate": "2014-07-11T00:31:48.822Z",
    "kind": "core#companyItem",
    "authKey": "fd07c488-3266-4d71-a5b1-6e7a82e642cd"
  },
  {
    "id": "808bc4af-7b53-4637-af8a-51264406a64a",
    "name": "Beta",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "53f061cd-fd94-4c1f-b65f-0ff080b6cce7",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-21T19:44:23.614Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-21T19:44:23.609Z",
    "changedBy": "rvacomp.g@gmail.com",
    "changeDate": "2014-05-21T19:45:59.140Z",
    "kind": "core#companyItem",
    "authKey": "808bc4af-7b53-4637-af8a-51264406a64a"
  },
  {
    "id": "0f25159f-97bf-4197-afdb-b664fa77f155",
    "name": "Beta Platform Test Company",
    "street": "22109 W. 83rd St",
    "city": "Shawnee",
    "province": "KS",
    "country": "US",
    "postalCode": "66227",
    "address": "22109 W. 83rd St, Shawnee, KS, US, 66227",
    "timeZone": "(GMT -06:00) Central Time (US & Canada)",
    "parentId": "b0002bf9-d7b3-4eab-a4fe-5bf56604d724",
    "networkOperatorStatus": 0,
    "networkOperatorStatusChangeDate": "2010-12-15T21:39:10.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2010-12-15T21:39:10.000Z",
    "changedBy": "System",
    "changeDate": "2013-05-17T15:16:38.248Z",
    "kind": "core#companyItem",
    "authKey": "0f25159f-97bf-4197-afdb-b664fa77f155"
  },
  {
    "id": "c7f3a27e-9760-44ff-b91d-5573ff128bc5",
    "name": "Bethel Community",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-12-21T20:50:25.676Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-12-21T20:50:25.676Z",
    "changedBy": "mark@bethelrussianchurch.org",
    "changeDate": "2012-12-21T21:00:51.768Z",
    "kind": "core#companyItem",
    "authKey": "c7f3a27e-9760-44ff-b91d-5573ff128bc5"
  },
  {
    "id": "97c9c100-5388-4205-b5cc-c75e8e2edf01",
    "name": "Bilbo Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-22T20:48:32.192Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-22T20:48:32.191Z",
    "changedBy": "System",
    "changeDate": "2014-05-27T14:50:30.799Z",
    "kind": "core#companyItem",
    "authKey": "97c9c100-5388-4205-b5cc-c75e8e2edf01"
  },
  {
    "id": "3cd32297-1e65-4271-9068-ee1d5f44afbf",
    "name": "Bilodeau.FA@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-08-19T19:03:02.588Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-08-19T19:03:02.587Z",
    "changedBy": "Bilodeau.FA@gmail.com",
    "changeDate": "2013-08-19T19:03:02.591Z",
    "kind": "core#companyItem",
    "authKey": "3cd32297-1e65-4271-9068-ee1d5f44afbf"
  },
  {
    "id": "3483aa5f-bb86-4751-b552-26297be824ad",
    "name": "BlueEbony@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-03-28T21:22:47.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-03-28T21:22:47.000Z",
    "changedBy": "BlueEbony@gmail.com",
    "changeDate": "2012-04-03T20:52:05.000Z",
    "kind": "core#companyItem",
    "authKey": "3483aa5f-bb86-4751-b552-26297be824ad"
  },
  {
    "id": "0d813505-5fb4-4326-b03e-1d3197e82cc0",
    "name": "Bob.Bermel@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-09-02T12:05:46.341Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-09-02T12:05:46.340Z",
    "changedBy": "Bob.Bermel@gmail.com",
    "changeDate": "2013-09-02T12:05:46.344Z",
    "kind": "core#companyItem",
    "authKey": "0d813505-5fb4-4326-b03e-1d3197e82cc0"
  },
  {
    "id": "d8637d2d-7ac6-4da4-8947-4430d1ac169c",
    "name": "Brian Test Company",
    "province": "NY",
    "address": "NY",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b0002bf9-d7b3-4eab-a4fe-5bf56604d724",
    "networkOperatorStatus": 0,
    "networkOperatorStatusChangeDate": "2012-04-03T22:43:23.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-04-03T22:43:23.000Z",
    "changedBy": "System",
    "changeDate": "2013-05-17T15:16:48.912Z",
    "kind": "core#companyItem",
    "authKey": "d8637d2d-7ac6-4da4-8947-4430d1ac169c"
  },
  {
    "id": "c18e1b29-2392-4c99-a4ef-79685fb40399",
    "name": "Bryant.Nielson@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2012-05-01T16:31:13.102Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2012-05-01T16:31:13.102Z",
    "changedBy": "Bryant.Nielson@gmail.com",
    "changeDate": "2012-05-01T16:31:13.105Z",
    "kind": "core#companyItem",
    "authKey": "c18e1b29-2392-4c99-a4ef-79685fb40399"
  },
  {
    "id": "f9b6c2e9-d850-4a1f-b685-cea62a6563b4",
    "name": "Bug Testing Company",
    "province": "ON",
    "address": "ON",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "fb788f1f-7730-44fd-8e00-20066409f51f",
    "networkOperatorStatus": 0,
    "networkOperatorStatusChangeDate": "2011-06-07T16:18:59.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2011-06-07T16:18:59.000Z",
    "changedBy": "System",
    "changeDate": "2014-03-13T15:19:25.205Z",
    "kind": "core#companyItem",
    "authKey": "f9b6c2e9-d850-4a1f-b685-cea62a6563b4"
  },
  {
    "id": "9174c45d-69c6-474a-b9c1-a6367677895c",
    "name": "Bullet1337@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-10-04T13:26:38.756Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-10-04T13:26:38.756Z",
    "changedBy": "Bullet1337@gmail.com",
    "changeDate": "2013-10-04T13:26:38.763Z",
    "kind": "core#companyItem",
    "authKey": "9174c45d-69c6-474a-b9c1-a6367677895c"
  },
  {
    "id": "85eb3648-c3c5-40e3-a93a-39b50d114cba",
    "name": "Buttner Company",
    "province": "NY",
    "address": "NY",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 0,
    "networkOperatorStatusChangeDate": "2011-07-22T17:59:51.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2011-07-22T17:59:51.000Z",
    "changedBy": "riseqa8@gmail.com",
    "changeDate": "2012-04-03T20:52:11.000Z",
    "kind": "core#companyItem",
    "authKey": "85eb3648-c3c5-40e3-a93a-39b50d114cba"
  },
  {
    "id": "24c243ab-3fa8-4a74-9e00-bbcb570c0a42",
    "name": "CJ@prodical.us's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-07-02T19:23:14.337Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-07-02T19:23:14.332Z",
    "changedBy": "CJ@prodical.us",
    "changeDate": "2014-07-02T19:23:14.344Z",
    "kind": "core#companyItem",
    "authKey": "24c243ab-3fa8-4a74-9e00-bbcb570c0a42"
  },
  {
    "id": "301ba3aa-8d19-4344-b743-607c1af7d517",
    "name": "Can I reset after this",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-02-08T21:11:21.304Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-02-08T21:11:21.304Z",
    "changedBy": "riseqa2@gmail.com",
    "changeDate": "2013-06-13T17:48:49.418Z",
    "kind": "core#companyItem",
    "authKey": "301ba3aa-8d19-4344-b743-607c1af7d517"
  },
  {
    "id": "2d3ddce9-09a6-4137-9fdb-8d9b866c42d1",
    "name": "Carman660@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2011-05-01T05:08:32.000Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2011-05-01T05:08:32.000Z",
    "changedBy": "Carman660@gmail.com",
    "changeDate": "2012-04-03T20:52:12.000Z",
    "kind": "core#companyItem",
    "authKey": "2d3ddce9-09a6-4137-9fdb-8d9b866c42d1"
  },
  {
    "id": "c6ef4ad7-f294-4cb9-b861-339b277ea3ef",
    "name": "Celeborn Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-22T20:49:35.396Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-22T20:49:35.395Z",
    "changedBy": "System",
    "changeDate": "2014-05-27T14:50:30.941Z",
    "kind": "core#companyItem",
    "authKey": "c6ef4ad7-f294-4cb9-b861-339b277ea3ef"
  },
  {
    "id": "1e67e795-4df9-4aea-b9f2-6d2d76329b40",
    "name": "Charlie",
    "street": "56 Crawford Drive",
    "city": "Brampton",
    "province": "ON",
    "country": "CA",
    "postalCode": "L6V2C7",
    "address": "56 Crawford Drive, Brampton, ON, CA, L6V2C7",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "53f061cd-fd94-4c1f-b65f-0ff080b6cce7",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2014-05-21T19:46:52.208Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2014-05-21T19:46:52.206Z",
    "changedBy": "rvacomp.g@gmail.com",
    "changeDate": "2014-06-09T18:30:27.706Z",
    "kind": "core#companyItem",
    "authKey": "1e67e795-4df9-4aea-b9f2-6d2d76329b40"
  },
  {
    "id": "f21deea7-2394-46b3-86db-d0b860073d8b",
    "name": "ChristopherDeck@gmail.com's Company",
    "timeZone": "(GMT  00:00) Dublin, Edinburgh, Lisbon, London",
    "parentId": "b428b4e8-c8b9-41d5-8a10-b4193c789443",
    "networkOperatorStatus": 1,
    "networkOperatorStatusChangeDate": "2013-03-14T18:40:53.229Z",
    "companyStatus": 1,
    "companyStatusChangeDate": "2013-03-14T18:40:53.229Z",
    "changedBy": "ChristopherDeck@gmail.com",
    "changeDate": "2013-03-14T18:40:53.233Z",
    "kind": "core#companyItem",
    "authKey": "f21deea7-2394-46b3-86db-d0b860073d8b"
  }
];

  gapiMockData.companyRespSkeleton = {
    "creationDate": "2012-04-03T20:52:05.000Z",
    "timeZoneOffset": -300,
    "authKey": "testKey",
    "settings": {
      "supportEmail": "http://community.risevision.com/rise_vision_inc",
      "mailSyncApiKey": "",
      "tutorialURL": "http://www.youtube.com/embed/XqGyHiKlJHA?list=PLfWX1mfZa-4QuNaKuW7k8bVCKTFmhzF_o",
      "adsenseServiceId": "",
      "allowCompanyRegistrations": "false",
      "analyticsID": "UA-11548828-1",
      "userStartPresentation": "6f19b1bd-c85a-45aa-be26-77cd5cd56ba7",
      "bannerTargetURL": "",
      "newsURL": "http://www.risevision.com/blog/",
      "mailSyncEnabled": "false",
      "mailSyncService": "MailChimp",
      "bannerBackgroundColor": "rgb(238, 238, 238)",
      "helpURL": "http://www.risevision.com/help/",
      "mailSyncListId": "",
      "logoURL": "http://c558385.r85.cf2.rackcdn.com/rise-logo.png",
      "adsenseServiceSlot": "",
      "salesEmail": "http://community.risevision.com/rise_vision_inc",
      "operatorStartPresentation": "6f19b1bd-c85a-45aa-be26-77cd5cd56ba7",
      "logoutURL": "",
      "bannerURL": "",
      "logoTargetURL": "http://www.risevision.com",
      "mailSyncApiUrl": ""
    },
    "mailSyncEnabled": false,
    "alertKey": "b0ed8df4-b49f-431b-a52e-e53ac2635c74",
    "alertSettings": {
      "enabled": true,
      "allowedStatuses": [
      "Actual",
      "Exercise",
      "System",
      "Test",
      "Draft"
      ],
      "allowedCategories": [
      "Geo",
      "Met",
      "Safety",
      "Security",
      "Rescue",
      "Fire",
      "Health",
      "Env",
      "Transport",
      "Infra",
      "CBRNE",
      "Other"
      ],
      "allowedUrgencies": [
      "Immediate",
      "Expected",
      "Future",
      "Past",
      "Unknown"
      ],
      "allowedSeverities": [
      "Extreme",
      "Severe",
      "Moderate",
      "Minor",
      "Unknown"
      ],
      "allowedCertainties": [
      "Observed",
      "Likely",
      "Possible",
      "Unlikely",
      "Unknown"
      ],
      "textFields": [
      "headline"
      ],
      "presentationId": "932a85ed-ddb4-4ac0-bd3c-431804c659a0",
      "defaultExpiry": 60
    },
    "claimId": "ZAK8JYTSAFZ5",
    "companyType": "serviceProvider",
    "servicesProvided": [
    "support",
    "Digital Signage"
    ],
    "marketSegments": [
    "education",
    "financial",
    "healthCare",
    "hospitality",
    "manufacturing",
    "technology",
    "nonprofit",
    "religious",
    "quickServe",
    "retail",
    "service"
    ],
    "viewsPerDisplay": "20",
    "adsEarn": false,
    "adsInterested": false,
  };


})(window.gapiMockData);

(function (gapiMockData){
  gapiMockData.accounts = [{
    "username": "michael.sanchez@awesome.io",
    "changedBy": "bloosbrock@gmail.com",
    "changeDate": "2014-07-18T11:38:24.668Z"
  }];

  gapiMockData.oauthAccounts = [{
    "id":"1",
    "name":"Michael Sanchez",
    "email" :"michael.sanchez@awesome.io",
    "picture" : "data:image/jpeg;base64,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",
    "given_name":"Michael",
    "family_name":"Sanchez",
    "link":"https://plus.google.com/1",
    "gender":"male",
    "locale":"en",
    "result":{
      "id":"1",
      "name":"Michael Sanchez",
      "given_name":"Michael",
      "family_name":"Sanchez",
      "link":"https://plus.google.com/1",
      "picture":"",
      "gender":"male",
      "locale":"en"
    }
  },
  {
    "id":"2",
    "name":"John Doe",
    "email" :"john.doe@awesome.io",
    "picture" : "data:image/jpeg;base64,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",
    "given_name":"John",
    "family_name":"Doe",
    "link":"https://plus.google.com/2",
    "gender":"male",
    "locale":"en",
    "result":{
      "id":"1",
      "name":"John Doe",
      "given_name":"John",
      "family_name":"Doe",
      "link":"https://plus.google.com/2",
      "picture":"",
      "gender":"male",
      "locale":"en"
    }
  }];
})(window.gapiMockData);

(function (gapiMockData){
  gapiMockData.systemMessages = [
     {
      "text": "We have updated our <a href=\"http://www.risevision." +
        "com/terms-service-privacy/\" target=_blank>Service Agreement" +
        "</a> with you. Please <a href=\"http://www.risevision.com/" +
        "terms-service-privacy/\" target=_blank>CLICK HERE</a> here to" +
        " review. Thank You.",
      "startDate": "2001-01-01T00:00:00.000Z",
      "kind": "core#systemmessageItem"
    },
    {
     "text": "Everything 10% Off in the next 10 seconds",
     "startDate": "2001-01-01T00:00:00.000Z",
     "kind": "core#systemmessageItem"
     },
     {
       "text": "Aenean auctor felis id viverra luctus.",
       "startDate": "2001-01-02T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "In et ipsum pretium lacus vulputate cursus",
       "startDate": "2001-01-03T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Ut at ipsum maximus, volutpat magna eu, vestibulum leo.",
       "startDate": "2001-01-04T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Vestibulum enim nisi, euismod in finibus at, volutpat tempus quam. ",
       "startDate": "2001-01-05T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Aenean sagittis egestas sem et fermentum. ",
       "startDate": "2001-01-06T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Ut vehicula interdum odio, a porttitor enim eleifend vel.",
       "startDate": "2001-01-07T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": " Integer id sapien varius sem vulputate eleifend. ",
       "startDate": "2001-01-08T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Donec a placerat leo.",
       "startDate": "2001-01-02T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Nulla quis mi mi.",
       "startDate": "2001-01-09T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Aenean a lacus nisi. ",
       "startDate": "2001-01-10T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Quisque tincidunt risus vitae leo elementum dapibus.",
       "startDate": "2001-02-02T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
       "text": "Proin tincidunt turpis nisi. ",
       "startDate": "2001-03-02T00:00:00.000Z",
       "kind": "core#systemmessageItem"
     },
     {
      "text": "Thou shall not pass",
      "startDate": "1600-01-01T00:00:00.000Z",
      "endDate": "1610-01-01T00:00:00.000Z",
      "kind": "core#systemmessageItem"
    },
     {
      "text": "0101010101011111011001010101010101011",
      "startDate": "2100-01-01T00:00:00.000Z",
      "endDate": "2101-01-01T00:00:00.000Z",
      "kind": "core#systemmessageItem"
     }
  ];
})(window.gapiMockData);

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || '';

    if (typeof tags === 'string') {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tagRes = escapeTags(tags = value.split(spaceRe));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) {
      tokens = cache[template] = parseTemplate(template, tags);
    }

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);
        if (!value) continue;

        if (isArray(value)) {
          for (var j = 0, jlen = value.length; j < jlen; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string') {
            throw new Error('Cannot use higher-order sections without the original template');
          }

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null) buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '>':
        if (!partials) continue;
        value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) buffer += this.renderTokens(this.parse(value), context, partials, value);
        break;
      case '&':
        value = context.lookup(token[1]);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(token[1]);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.1";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));

(function (_, $, window, gapiMockData, Mustache, document, O, localStorage) {
  "use strict";

  /*global _,gapi,Mustache: false */

  var kvp = document.location.search.substr(1).split("&");
  var real = false;
  var i=kvp.length; var x; while(i--)
  {
      x = kvp[i].split("=");
      if (x[0]==="realGapi" && x[1])
      {
        real = true;
      }
  }

  if(real) {

    //mark as real GAPI (actual GAPI is loaded by common header)

    window.realGapiLoaded = true;
  }
  else {

    window.gapiLoadingStatus = "loaded"; //surpress the loading of real gapi
    window.gapi = {};

    var delayed = function () {
      if(arguments) {
        var cb = arguments[0];
        var restArgs = Array.prototype.slice.call(arguments, 1);
        if(!window.gapi._fakeDb.serverDelay) {
          cb.apply(null, restArgs);
        }
        else {
          setTimeout(function (){
            cb.apply(null, restArgs);
          }, window.gapi._fakeDb.serverDelay);
        }
      }
    };

    var guid = (function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      }
      return function() {
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
               s4() + "-" + s4() + s4() + s4();
      };
    })();

    var getCurrentUsername = function () {
      if(gapi.auth.getToken()) {
        return fakeDb.tokenMap[gapi.auth.getToken().access_token];
      }
      else {
        return null;
      }
    };

    var getCurrentUser = function () {
      var currentUsername = getCurrentUsername();

      if(currentUsername) {
        return _.find(fakeDb.users, function (user) {
          return currentUsername === user.username;
        });
      }
      else {
        return null;
      }

    };

    var fakeDb = window.gapi._fakeDb = {serverDelay: 0};

    var _clearObj = function (obj) {
      for (var member in obj) {
        delete obj[member];
      }
    };
    window.gapi.resetDb = function () {
      if(!window.gapi._fakeDb) {
        _clearObj(fakeDb);
      }
      fakeDb.companies = _.cloneDeep(gapiMockData.companies);
      fakeDb.accounts = _.cloneDeep(gapiMockData.accounts);
      fakeDb.oauthAccounts = _.cloneDeep(gapiMockData.oauthAccounts);

      fakeDb.users = _.cloneDeep(gapiMockData.users);
      fakeDb.systemMessages = _.cloneDeep(systemMessages);
      fakeDb.tokenMap = {};
    };

    window.gapi.resetUsers = function () {
      window.gapi._fakeDb.users = _.cloneDeep(gapiMockData.users);
    };

    window.gapi.resetAccounts = function () {
      fakeDb.accounts = _.cloneDeep(gapiMockData.accounts);
    };

    window.gapi.clearAccounts = function () {
      fakeDb.accounts = [];
    };

    window.gapi.resetCompanies = function () {
      window.gapi._fakeDb.companies = _.cloneDeep(gapiMockData.companies);
    };

    window.gapi.clearCompanies = function () {
      while(fakeDb.companies.length > 0) {
        fakeDb.companies.pop();
      }
    };

    window.gapi.clearUsers = function () {
      window.gapi._fakeDb.users = [];
    };

    window.gapi.resetSystemMessages = function () {
      window.gapi._fakeDb.systemMessages = _.cloneDeep(systemMessages);
    };

    window.gapi.clearSystemMessages = function () {
      window.gapi._fakeDb.systemMessages = [];
    };

    window.gapi.setPendingSignInUser = function (username) {
      localStorage.setItem("risevision.gapi-mock.pendingUser", username);
    };

    var resp = function (item) {
      var copyOfitem = _.cloneDeep(item);
      return {
        "result": {item: copyOfitem},
        "code": 200,
        "message": "OK",
        "item": copyOfitem,
        "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/-QiBW2KeCQy_zrNjQ2_iN6pdhkg\""
      };
    };

    var respList = function (items) {
      var copyOfItems = _.cloneDeep(items);
      return {
        "result": {items: copyOfItems},
        "code": 200,
        "message": "OK",
        "items": copyOfItems,
        "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/-QiBW2KeCQy_zrNjQ2_iN6pdhkg\""
      };
    };

    var systemMessages = gapiMockData.systemMessages;

   if(localStorage.getItem("fakeGoogleDb")) {
     _clearObj(fakeDb);
     _.extend(fakeDb, JSON.parse(localStorage.getItem("fakeGoogleDb")));
   }
   else {
     window.gapi.resetDb();
   }

   var oDb = O(fakeDb);
   var _saving = false;
   oDb.on("change", function () {
     //prevent multiple saving events
     // save only at the end of the execution cycle and if a save event is not already
     //scheduled
     if(!_saving) {
       _saving = true;
       setTimeout(function () {
         localStorage.setItem("fakeGoogleDb", JSON.stringify(fakeDb || {}));
         console.log("fakeGoogleDb persisted to localStorage.");
         _saving = false;
       });
     }

   });

    gapi.client = {
      load: function(path, version, cb) {
        delayed(cb);
      },
      rise: {
        account: {
          add: function () {
            return {
              execute: function (cb) {
                var username = getCurrentUsername();
                var existingAccount = _.findWhere(fakeDb.accounts, {username: username});
                if(!existingAccount) {
                  //200 success
                  fakeDb.accounts.push({
                    username: username,
                    changeDate: new Date().toISOString(),
                    changedBy: "bloosbrock@gmail.com"
                  });

                  var companyId = guid();
                  fakeDb.companies.push({
                    name: username + "'s Company'",
                    id: companyId,
                    changeDate: new Date().toISOString(),
                    changedBy: "bloosbrock@gmail.com"
                  });

                  var existingUser = _.findWhere(fakeDb.users, {username: username});
                  if(!existingUser) {
                    fakeDb.users.push({
                      username: username,
                      changeDate: new Date().toISOString(),
                      changedBy: "bloosbrock@gmail.com",
                      companyId: companyId
                    });
                  }

                  //200 success
                  delayed(cb, resp({}));
                }
                else {
                  delayed(cb, {
                   "error": {
                    "errors": [
                     {
                      "domain": "global",
                      "reason": "conflict",
                      "message": "User already has an account"
                     }
                    ],
                    "code": 409,
                    "message": "User already has an account"
                   }
                  });
                }
              }
            };
          },
          agreeToTerms: function () {
            return {
              execute: function (cb) {
                var username = getCurrentUsername();
                var user = _.findWhere(fakeDb.users, {username: username});
                if(!user.termsAcceptanceDate) {
                  user.termsAcceptanceDate = new Date().toISOString();
                  delayed(cb, resp({}));
                }
                else {
                  delayed(cb, {
                   "error": {
                    "errors": [
                     {
                      "domain": "global",
                      "reason": "conflict",
                      "message": "User has already accepted the terms"
                     }
                    ],
                    "code": 409,
                    "message": "User has already accepted the terms"
                   }
                 });
                }
              }
            };
          }
        },
        company: {
          get: function (obj) {
            return {
              execute: function (cb) {
                var company;
                obj = obj || {};
                if(gapi.auth.getToken()) {
                  if(obj.id) {
                    company = _.findWhere(fakeDb.companies, obj);
                  }
                  else if (getCurrentUser().companyId){
                    company =
                    _.findWhere(fakeDb.companies, {id: getCurrentUser().companyId});
                  }
                  if(!company){
                    delayed(cb, {
                      "result": false,
                      "code": 404,
                      "message": "NOT FOUND"
                    });
                  } else {
                    delayed(cb, {
                      "result": true,
                      "code": 200,
                      "message": "OK",
                      "item": _.extend(_.cloneDeep(gapiMockData.companyRespSkeleton), company),
                    "kind": "core#companyItem",
                    "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/B1RYG_QUBrbTcuW6r700m7wrgBU\""
                    });
                  }
                }
                else {
                  delayed(cb, {
                    "result": false,
                    "code": 401,
                    "message": "NOT LOGGED IN"
                  });
                }
              }
            };
          }
        }
      },
      core: {
        systemmessage: {
          list: function (obj) {
            obj = obj || {};
            return {
              execute : function (cb) {
                if(obj.companyId) {
                  delayed(cb, _.cloneDeep(window.gapi._fakeDb.systemMessages));
                }
              }
            };
          }
        },
        company: {
          get: function (obj) {
            return {
              execute: function (cb) {
                var company;
                obj = obj || {};
                if(gapi.auth.getToken()) {
                  if(obj.id) {
                    company = _.findWhere(fakeDb.companies, obj);
                  }
                  else if (getCurrentUser().companyId){
                    company =
                    _.findWhere(fakeDb.companies, {id: getCurrentUser().companyId});
                  }
                  if(!company){
                    delayed(cb, {
                      "result": false,
                      "code": 404,
                      "message": "NOT FOUND"
                    });
                  } else {
                    delayed(cb, {
                      "result": true,
                      "code": 200,
                      "message": "OK",
                      "item": _.extend(_.cloneDeep(gapiMockData.companyRespSkeleton), company),
                    "kind": "core#companyItem",
                    "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/B1RYG_QUBrbTcuW6r700m7wrgBU\""
                    });
                  }
                }
                else {
                  delayed(cb, {
                    "result": false,
                    "code": 401,
                    "message": "NOT LOGGED IN"
                  });
                }
            }
          };
        },
         lookup: function (obj) {
           return {
             execute: function (cb) {
               var company;
               obj = obj || {};
               if(gapi.auth.getToken()) {
                 if(obj.authKey) {
                   company = _.findWhere(fakeDb.companies, obj);
                 }
                 else if (getCurrentUser().companyId){
                   company =
                   _.findWhere(fakeDb.companies, {id: getCurrentUser().companyId});
                 }
                 if(!company){
                   delayed(cb, {
                     "result": false,
                     "code": 404,
                     "message": "NOT FOUND"
                   });
                 } else {
                   delayed(cb, {
                     "result": true,
                     "code": 200,
                     "message": "OK",
                     "item": _.extend(_.cloneDeep(gapiMockData.companyRespSkeleton), company),
                   "kind": "core#companyItem",
                   "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/B1RYG_QUBrbTcuW6r700m7wrgBU\""
                   });
                 }
               }
               else {
                 delayed(cb, {
                   "result": false,
                   "code": 401,
                   "message": "NOT LOGGED IN"
                 });
               }
           }
         };
       },
        move: function (obj) {
          return {
            execute: function (cb) {
              var company;
              obj = obj || {};
              if(gapi.auth.getToken()) {
                if(obj.authKey) {
                  if(obj.id || obj.authKey) {
                    company = _.findWhere(window.gapi._fakeDb.companies, {authKey: obj.authKey});
                    company.parentId = getCurrentUser().companyId;
                  }
                  if(!company){
                    delayed(cb, {
                      "result": false,
                      "code": 404,
                      "message": "NOT FOUND"
                    });
                  } else {
                    delayed(cb, {
                      "result": true,
                      "code": 200,
                      "message": "OK",
                      "item": _.extend(_.cloneDeep(gapiMockData.companyRespSkeleton), company),
                    "kind": "core#companyItem",
                    "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/B1RYG_QUBrbTcuW6r700m7wrgBU\""
                    });
                  }
                }
                else {
                  delayed(cb, {
                   "error": {
                    "errors": [
                     {
                      "domain": "global",
                      "reason": "required",
                      "message": "Required parameter: authKey",
                      "locationType": "parameter",
                      "location": "authKey"
                     }
                    ],
                    "code": 400,
                    "message": "Required parameter: authKey"
                   }
                 });
                }
              }
              else {
                delayed(cb, {
                  "result": false,
                  "code": 401,
                  "message": "NOT LOGGED IN"
                });
              }
          }
        };
      },
        add: function (fields) {
          return {
            execute: function (cb) {
              var company;
              company = _.cloneDeep(fields);
              company.id = guid();
              window.gapi._fakeDb.companies.push(company);
              console.log("company created", company);
              delayed(cb, {
                "result": true,
                "code": 200,
                "message": "OK",
                "item": company,
              "kind": "core#companyItem",
              "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/B1RYG_QUBrbTcuW6r700m7wrgBU\""
            });
            }
          };
        },
        patch: function (obj) {
          return {
            execute: function (cb) {
              var company;
              if(obj.id) {
                company = _.find(window.gapi._fakeDb.companies, function (company) {
                  return company.id === obj.id;
                });
                _.extend(company, obj.data);
              }
              else {
                company = _.cloneDeep(obj.data);
                company.id = guid();
                window.gapi._fakeDb.companies.push(company);
              }
              console.log("company created", company);
              delayed(cb, {
                "result": true,
                "code": 200,
                "message": "OK",
                "item": company,
              "kind": "core#companyItem",
              "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/B1RYG_QUBrbTcuW6r700m7wrgBU\""
            });
            }
          };
        },
        list: function (opt) {
          opt = _.extend({count: 20, cursor: 0}, opt);
          return {
            execute: function (cb) {
              var currentUser = getCurrentUser();
              var parentCompany = _.findWhere(window.gapi._fakeDb.companies, {id: currentUser.companyId});
              var subcompanies = _.where(window.gapi._fakeDb.companies, {parentId: currentUser.companyId});
              var companies = [parentCompany].concat(subcompanies);
              if(opt.search) {
                companies = _.filter(window.gapi._fakeDb.companies,
                  function (company) {
                    return company.name.toLowerCase().indexOf(opt.search.toLowerCase()) >= 0;
                  });
              }

              if(opt.cursor) {
                companies = companies.slice(opt.cursor);
              }
              if(opt.count) {
                companies = companies.slice(0, opt.count);
              }

              return delayed(cb, {
               "result": true,
               "code": 200,
               "message": "OK",
               "cursor": 0,
               "items": companies,
               "kind": "core#company",
               "etag": "\"MH7KOPL7ADNdruowVC6-7YuLjZw/aU3KWpXBGvssoqWVjsHR5ngSZlU\""
              });
            }
          };
        },
        delete: function (obj) {
          return {
            execute: function (cb) {
              if(!obj || !obj.id) {
                delayed(cb, {
                 "error": {
                  "errors": [
                   {
                    "domain": "global",
                    "reason": "required",
                    "message": "Required parameter: id",
                    "locationType": "parameter",
                    "location": "id"
                   }
                  ],
                  "code": 400,
                  "message": "Required parameter: id"
                 }
                });
              }
              else{
                var company = _.findWhere(fakeDb.companies, {id: obj.id});
                if(!company) {
                  delayed(cb, {
                   "error": {
                    "errors": [
                     {
                      "domain": "global",
                      "reason": "notFound",
                      "message": "Company not found."
                     }
                    ],
                    "code": 404,
                    "message": "Company not found."
                   }
                 });
                }
                else {
                  fakeDb.companies = _.without(fakeDb.companies, company);
                  delayed(cb, resp({}));
                }
              }
            }
          };
        }
      },
      user: {
        get: function (obj) {
          return {
            execute: function (cb) {
              obj = obj || {};
              if(gapi.auth.getToken()){
                var user;
                if(obj.username) {
                  user = _.findWhere(fakeDb.users, {username: obj.username});
                }
                else {
                  user =  getCurrentUser();
                }
                if(user) {
                  delayed(cb, resp(user));
                }
                else {
                  delayed(cb, {
                    "result": false,
                    "code": 404,
                    "message": "NOT FOUND"
                  });
                }
              }
              else {
                delayed(cb, {
                  "result": false,
                  "code": 401,
                  "message": "NOT LOGGED IN"
                });
              }
            }
          };
        },
        patch: function (obj) {
          return {
            execute: function (cb) {
              if (!obj) {obj = {}; }
              var user;
              if (obj.username) {
                user = _.find(fakeDb.users,
                  function (u) {return obj.username === u.username; });
              }
              else {
                user = getCurrentUser();
              }
              if (user) {
                _.extend(user, obj.data);
                delayed(cb, resp(user));
              }
              else {
                delayed(cb, {
                  "result": false,
                  "code": 404,
                  "message": "NOT FOUND"
                });
              }
            }
          };
        },
        delete: function (obj) {
          return {
            execute: function (cb) {
              if(!obj || !obj.username) {
                delayed(cb, {
                 "error": {
                  "errors": [
                   {
                    "domain": "global",
                    "reason": "required",
                    "message": "Required parameter: username",
                    "locationType": "parameter",
                    "location": "username"
                   }
                  ],
                  "code": 400,
                  "message": "Required parameter: username"
                 }
                });
              }
              else{
                var user = _.findWhere(fakeDb.users, {username: obj.username});
                if(!user) {
                  delayed(cb, {
                   "error": {
                    "errors": [
                     {
                      "domain": "global",
                      "reason": "notFound",
                      "message": "User not found."
                     }
                    ],
                    "code": 404,
                    "message": "User not found."
                   }
                 });
                }
                else {
                  fakeDb.users = _.without(fakeDb.users, user);
                  delayed(cb, resp({}));
                }
              }
            }
          };
        },
        add: function (obj) {
          return {
            execute: function (cb) {
              if(obj && obj.username || obj.companyId) {
                var existingUser = _.findWhere(fakeDb.users, {username: obj.username});
                if(existingUser) {
                  delayed(cb, {
                    "result": false,
                    "code": 400,
                    "message": "USER ALREADY EXISTS"
                  });
                }
                else {
                  var user = _.extend({
                    username: obj.username,
                    companyId: obj.companyId
                  }, obj.data);
                  fakeDb.users.push(user);
                  delayed(cb, resp(user));
                }
              }
              else {
                delayed(cb, {
                  "result": false,
                  "code": 400,
                  "message": "USERNAME OR COMPANY ID MISSING"
                });
              }
            }
          };
        },
        list: function (obj) {
          return {
            execute: function (cb) {
              if(!obj) {obj = {}; }
              var users = fakeDb.users;
              if(obj.companyId) {
                users = _.where(users, {companyId: obj.companyId});
              }
              if(obj.search) {
                users = _.filter(users,
                  function (user) {
                    return (user.firstName || "").toLowerCase().indexOf(obj.search.toLowerCase()) >= 0 ||
                    (user.lastName || "").toLowerCase().indexOf(obj.search.toLowerCase()) >= 0 ||
                    user.email.toLowerCase().indexOf(obj.search.toLowerCase()) >= 0;
                  });
              }
              if(obj.count) {
                users = users.slice(0, obj.count);
              }
              delayed(cb, respList(users));
            }
          };
        }
      }
    },
    oauth2: {
      userinfo: {
        get: function() {
          return {
            execute: function(cb) {
              if(gapi.auth.getToken()) {
                var username = getCurrentUsername();
                var oauthAccount = _.findWhere(fakeDb.oauthAccounts, {email: username});
                delayed(cb, oauthAccount);
              }
              else {
                delayed(cb, {
                  "code": 401,
                  "message": "Invalid Credentials",
                  "data": [
                    {
                      "domain": "global",
                      "reason": "authError",
                      "message": "Invalid Credentials",
                      "locationType": "header",
                      "location": "Authorization"
                    }
                  ],
                  "error": {
                    "code": 401,
                    "message": "Invalid Credentials",
                    "data": [
                      {
                        "domain": "global",
                        "reason": "authError",
                        "message": "Invalid Credentials",
                        "locationType": "header",
                        "location": "Authorization"
                      }
                    ]
                  }
                });
              }
            }
          };
        }
      }
    },
    //store API - BEGIN
    store: {
        cards: {
          get: function () {
            return {
              execute: function (cb) {
                  delayed(cb, resp({items:[]}));
              }
            };
          }
        }
      }
    //store API - END
  };

  var googleAuthDialogTemplate = "<div class=\"modal\">" +
    "<div class=\"modal-dialog\">" +
    "  <div class=\"modal-content\">" +
    "    <div class=\"modal-header\">" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\">" +
    "<span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>" +
    "      <h4 class=\"modal-title\">Fake Google Cloud Login</h4>" +
    "    </div>" +
    "    <div class=\"modal-body\">" + "<p>Click one to Sign In, or cancel.</p>" +
    "<ul>{{#accounts}}" + "<li><img src=\"{{picture}}\" style=\"width: 30px; height: 30px; \" />" +
    "<button class=\"login-account-button\" data-username=\"{{email}}\">{{email}}</button></li>" + "{{/accounts}}</ul>" +
    "    </div>" +
    "    <div class=\"modal-footer\">" +
    "      <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>" +
    "    </div>" +
    "  </div>" +
    "</div>" +
    "</div>";

  gapi.auth = {
    authorize: function(options, cb) {
      options = options || {};

      var generateToken = function (username) {
        var accessToken = guid();

        //clear existing token from db
        var existingToken;
        _.each(fakeDb.tokenMap, function (v, k) {if (v === username) {existingToken = k; }});
        if(existingToken) {
          delete fakeDb.tokenMap[existingToken];
        }

        fakeDb.tokenMap[accessToken] = username;
        fakeDb.tokenMap = _.clone(fakeDb.tokenMap); // need this to get watch to work
        return {
          "state": "",
          "access_token": accessToken,
          "token_type": "Bearer",
          "expires_in": "3600",
          "scope": "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          "client_id": "614513768474.apps.googleusercontent.com",
          "g_user_cookie_policy": "http://localhost:8099",
          "cookie_policy": "http://localhost:8099",
          "response_type": "token",
          "issued_at": "1408530459",
          "expires_at": "1408534059",
          "g-oauth-window": {},
          "status": {
            "google_logged_in": true,
            "signed_in": true,
            "method": "PROMPT"
          }
        };
      };

      if(!options.immediate) {
        var modalStr = Mustache.render(googleAuthDialogTemplate, {accounts: fakeDb.oauthAccounts});

        var tokenResult;
          var signInAs = function (username, next) {
            tokenResult = generateToken(username);
            next(function () {
              if(!tokenResult) {
                delayed(cb, {error: "User cancelled login."});
              }
              else {
                gapi.auth.setToken(tokenResult);
                delayed(cb, tokenResult);
              }
            });
          };
          if(localStorage.getItem("risevision.gapi-mock.pendingUser")) {
            signInAs(localStorage.getItem("risevision.gapi-mock.pendingUser"), function(cb1) {
              cb1();
            });
            localStorage.removeItem("risevision.gapi-mock.pendingUser");
          }
          else {
            var modal = $(modalStr).modal({
              show: false, backdrop: "static"});
            var returnResultCb;
            modal.find(".login-account-button").on("click", function (e) {
              var username = $(e.target).data("username");
              signInAs(username, function (fn) {
                returnResultCb = fn;
              });

              modal.modal("hide");
            });
            modal.on("hidden.bs.modal", function () {
              //destroy modal
              $(this).data("bs.modal", null);
              modal.remove();
              returnResultCb();
            });
            modal.modal("show");
          }


      }
      else {
        delayed(cb, gapi.auth.getToken());
      }
    },
    signOut: function (cb) {
      this.setToken(null);
      if(cb) {
        delayed(cb);
      }
    },
    setToken: function (token) {
      if(token) {
        localStorage.setItem("gapi-mock-auth-token", JSON.stringify(token));
      }
    },
    getToken: function () {
      var tokenStr = localStorage.getItem("gapi-mock-auth-token");
      if(tokenStr) {
        return JSON.parse(tokenStr);
      }
      else {
        return null;
      }
    }
  };

  if(window.handleClientJSLoad) {
    window.handleClientJSLoad();
  }
  }


})(_, $, window, window.gapiMockData, Mustache, document, require("observed"), localStorage);
