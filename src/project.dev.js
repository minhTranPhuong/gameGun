window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  1: [ function(require, module, exports) {
    function EventEmitter() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
      this._maxListeners = n;
      return this;
    };
    EventEmitter.prototype.emit = function(type) {
      var er, handler, len, args, i, listeners;
      this._events || (this._events = {});
      if ("error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) throw er;
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
        err.context = er;
        throw err;
      }
      handler = this._events[type];
      if (isUndefined(handler)) return false;
      if (isFunction(handler)) switch (arguments.length) {
       case 1:
        handler.call(this);
        break;

       case 2:
        handler.call(this, arguments[1]);
        break;

       case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;

       default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i = 0; i < len; i++) listeners[i].apply(this, args);
      }
      return true;
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      var m;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      this._events || (this._events = {});
      this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
      this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [ this._events[type], listener ] : this._events[type] = listener;
      if (isObject(this._events[type]) && !this._events[type].warned) {
        m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners;
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
          "function" === typeof console.trace && console.trace();
        }
      }
      return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
      if (!isFunction(listener)) throw TypeError("listener must be a function");
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
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list, position, length, i;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[type]) return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        this._events.removeListener && this.emit("removeListener", type, listener);
      } else if (isObject(list)) {
        for (i = length; i-- > 0; ) if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
        if (position < 0) return this;
        if (1 === list.length) {
          list.length = 0;
          delete this._events[type];
        } else list.splice(position, 1);
        this._events.removeListener && this.emit("removeListener", type, listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var key, listeners;
      if (!this._events) return this;
      if (!this._events.removeListener) {
        0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type];
        return this;
      }
      if (0 === arguments.length) {
        for (key in this._events) {
          if ("removeListener" === key) continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this;
      }
      listeners = this._events[type];
      if (isFunction(listeners)) this.removeListener(type, listeners); else if (listeners) while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
      delete this._events[type];
      return this;
    };
    EventEmitter.prototype.listeners = function(type) {
      var ret;
      ret = this._events && this._events[type] ? isFunction(this._events[type]) ? [ this._events[type] ] : this._events[type].slice() : [];
      return ret;
    };
    EventEmitter.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener)) return 1;
        if (evlistener) return evlistener.length;
      }
      return 0;
    };
    EventEmitter.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type);
    };
    function isFunction(arg) {
      return "function" === typeof arg;
    }
    function isNumber(arg) {
      return "number" === typeof arg;
    }
    function isObject(arg) {
      return "object" === typeof arg && null !== arg;
    }
    function isUndefined(arg) {
      return void 0 === arg;
    }
  }, {} ],
  controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7bbf6tMg21NV6vyCZsoJooD", "controller");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        _keys: null,
        _isAction: false,
        _isDone: false
      },
      onKeyDown: function onKeyDown(e) {
        this._keys.has(e.keyCode) || true != this._isDone || (this._isAction = false);
        this._keys.set(e.keyCode, e);
        if (true == this._isAction) return;
        this._isAction = true;
        this._isDone = false;
        this.catchEvent(e.keyCode);
      },
      catchEvent: function catchEvent(keyCode) {
        switch (keyCode) {
         case cc.macro.KEY.up:
          this._keys.has(cc.macro.KEY.right) ? Emitter.instance.emit("jumpRight", "right") : this._keys.has(cc.macro.KEY.left) ? Emitter.instance.emit("jumpRight", "left") : Emitter.instance.emit("jump");
          break;

         case cc.macro.KEY.right:
          Emitter.instance.emit("goRight", "right");
          break;

         case cc.macro.KEY.space:
          this._keys.has(cc.macro.KEY.right) ? Emitter.instance.emit("runRight", "right") : this._keys.has(cc.macro.KEY.left) && Emitter.instance.emit("runRight", "left");
          break;

         case cc.macro.KEY.left:
          Emitter.instance.emit("goRight", "left");
          break;

         case cc.macro.KEY.q:
          Emitter.instance.emit("shoot");
        }
      },
      onKeyUp: function onKeyUp(e) {
        Emitter.instance.emit("keyUp");
        this._keys.delete(e.keyCode);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = this._keys.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;
            if (this._keys.size > 1) return;
            this.onKeyDown(value);
            return;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
          } finally {
            if (_didIteratorError) throw _iteratorError;
          }
        }
      },
      onLoad: function onLoad() {
        this._keys = new Map();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        Emitter.instance.registerEvent("doneEvent", this.dontEvent.bind(this));
      },
      dontEvent: function dontEvent() {
        this._isAction = false;
        this._isDone = true;
      },
      start: function start() {},
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  emitterName: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0ce2kdJ8dFyJks2jC6R2MM", "emitterName");
    "use strict";
    var emitterName = {};
    module.exports = emitterName;
    cc._RF.pop();
  }, {} ],
  mEmitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bedcakEfB9GfZhnUoXsMTDN", "mEmitter");
    "use strict";
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var EventEmitter = require("events");
    var mEmitter = function() {
      function mEmitter() {
        _classCallCheck(this, mEmitter);
        this._emiter = new EventEmitter();
        this._emiter.setMaxListeners(100);
      }
      _createClass(mEmitter, [ {
        key: "emit",
        value: function emit() {
          var _emiter;
          (_emiter = this._emiter).emit.apply(_emiter, arguments);
        }
      }, {
        key: "registerEvent",
        value: function registerEvent(event, listener) {
          this._emiter.on(event, listener);
        }
      }, {
        key: "registerOnce",
        value: function registerOnce(event, listener) {
          this._emiter.once(event, listener);
        }
      }, {
        key: "removeEvent",
        value: function removeEvent(event, listener) {
          this._emiter.removeListener(event, listener);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._emiter.removeAllListeners();
          this._emiter = null;
          mEmitter.instance = null;
        }
      } ]);
      return mEmitter;
    }();
    mEmitter.instance = null == mEmitter.instance ? new mEmitter() : mEmitter.instance;
    module.exports = mEmitter;
    cc._RF.pop();
  }, {
    events: 1
  } ],
  monter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "884b3Lb2mVAcYhmWlkCCjAD", "monter");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        hpMonter: cc.Component,
        winner: cc.Component
      },
      onLoad: function onLoad() {
        cc.log(this.winner);
        Emitter.instance.registerEvent("bingo", this.binGo.bind(this));
      },
      binGo: function binGo() {
        cc.log(this.hpMonter.node.getComponent(cc.ProgressBar).progress);
        this.hpMonter.node.getComponent(cc.ProgressBar).progress -= .1;
        if (this.hpMonter.node.getComponent(cc.ProgressBar).progress <= 0) {
          this.winner.node.active = true;
          this.node.destroy();
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  sShoot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5998ay9UT9M7LzEMlvP0hVw", "sShoot");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        _x: 0,
        _y: 0
      },
      onLoad: function onLoad() {
        this._x = this.node.x;
        this._y = this.node.y;
        Emitter.instance.registerOnce("bulletMove", this.bulletMove.bind(this));
      },
      bulletMove: function bulletMove() {
        var _this = this;
        var callBack = new cc.CallFunc(function() {
          _this.node.destroy();
        });
        var action = cc.moveBy(.8, cc.v2(this._x + 1e3, this._y + 100));
        this.node.runAction(new cc.sequence(action, callBack));
      },
      onCollisionEnter: function onCollisionEnter(val1, val2) {
        Emitter.instance.emit("bingo");
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  sSpinBoy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "50a1fj6ra5ILbbAZ/A/L7Db", "sSpinBoy");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        spinBoy: sp.Skeleton,
        _scaleX: 0,
        _directed: "right",
        _action: null,
        _y: 0,
        _x: 0,
        hp: cc.Component,
        prefabBullet: cc.Prefab,
        _progress: 0
      },
      onCollisionStay: function onCollisionStay() {
        var _this = this;
        this._progress.progress -= .01;
        this._progress.progress <= 0 && this.spinBoy.setCompleteListener(function() {
          _this.spinBoy.clearTracks();
          _this.spinBoy.setToSetupPose();
          _this.spinBoy.setAnimation(0, "death", false);
        });
      },
      gameOver: function gameOver() {},
      onLoad: function onLoad() {
        this._progress = this.hp.node.getComponent(cc.ProgressBar);
        this._y = this.node.y;
        this._x = this.node.x;
        this._scaleX = this.node.scaleX;
        Emitter.instance.registerEvent("jump", this.spinBoyJump.bind(this));
        Emitter.instance.registerEvent("jumpRight", this.spinBoyJumpRight.bind(this));
        Emitter.instance.registerEvent("runRight", this.spinBoyRunRight.bind(this));
        Emitter.instance.registerEvent("goRight", this.spinBoyGoRight.bind(this));
        Emitter.instance.registerEvent("keyUp", this.keyUp.bind(this));
        Emitter.instance.registerEvent("shoot", this.shoot.bind(this));
      },
      shoot: function shoot() {
        this.spinBoy.setAnimation(0, "shoot", false);
        cc.log(this.spinBoy);
        this.spinBoy.setCompleteListener(function() {
          Emitter.instance.emit("doneEvent");
        });
        this.createBullet();
        Emitter.instance.emit("bulletMove");
      },
      createBullet: function createBullet() {
        var bullet = cc.instantiate(this.prefabBullet);
        bullet.parent = this.node;
        bullet.x = this.node.x + 823;
        bullet.y = this.node.y + 319;
      },
      keyUp: function keyUp() {
        this.node.stopAction(this._action);
        Emitter.instance.emit("doneEvent");
        this.spinBoy.clearTracks();
        this.spinBoy.setToSetupPose();
        this.spinBoy.setAnimation(0, "idle", true);
      },
      spinBoyJumpRight: function spinBoyJumpRight(act) {
        var _this2 = this;
        cc.log(this.node.y);
        var direction = this.spinBoyTurn(act);
        cc.tween(this.node).to(.2, {
          position: cc.v2(this.node.x + 25 * direction, this.node.y + 50)
        }).call(function() {
          cc.log(_this2.node.x, _this2.node.y);
        }).to(.2, {
          position: cc.v2(this.node.x + 50 * direction, this.node.y + 80)
        }).call(function() {
          cc.log(_this2.node.x, _this2.node.y);
        }).to(.2, {
          position: cc.v2(this.node.x + 100 * direction, this.node.y + 50)
        }).call(function() {
          cc.log(_this2.node.x, _this2.node.y);
        }).to(.2, {
          position: cc.v2(this.node.x + 125 * direction, this.node.y)
        }).call(function() {
          cc.log(_this2.node.x, _this2.node.y);
        }).start();
        this.spinBoy.setAnimation(0, "run", false);
        this.spinBoy.setAnimation(0, "hoverboard", false);
        this.spinBoy.setCompleteListener(function() {
          Emitter.instance.emit("doneEvent");
        });
        cc.log(this.node.y);
      },
      spinBoyJump: function spinBoyJump() {
        cc.log(this.node.y);
        cc.tween(this.node).to(.4, {
          position: cc.v2(this.node.x, this.node.y + 70)
        }).to(.4, {
          position: cc.v2(this.node.x, this._y)
        }).start();
        this.spinBoy.setAnimation(0, "hoverboard", false);
        this.spinBoy.setCompleteListener(function() {
          Emitter.instance.emit("doneEvent");
        });
      },
      spinBoyRunRight: function spinBoyRunRight(act) {
        var direction = this.spinBoyTurn(act);
        var action = cc.moveBy(.8, cc.v2(100 * direction, 0));
        this._action = this.node.runAction(action);
        this.spinBoy.setAnimation(0, "run", false);
        this.spinBoy.setCompleteListener(function() {
          Emitter.instance.emit("doneEvent");
        });
      },
      spinBoyGoRight: function spinBoyGoRight(act) {
        var direction = this.spinBoyTurn(act);
        var action = cc.moveBy(.9, cc.v2(50 * direction, 0));
        this._action = this.node.runAction(action);
        this.spinBoy.setAnimation(0, "walk", false);
        this.spinBoy.setCompleteListener(function() {
          Emitter.instance.emit("doneEvent");
        });
      },
      spinBoyTurn: function spinBoyTurn(act) {
        var direction = 1;
        if ("right" == act) this.node.scaleX = this._scaleX; else {
          this.node.scaleX = -this._scaleX;
          direction = -1;
        }
        return direction;
      },
      start: function start() {
        var _this3 = this;
        this.spinBoy.setAnimation(0, "portal", false);
        this.spinBoy.setCompleteListener(function() {
          _this3.keyUp();
        });
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  sThorn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "945c3UzdO9D6L+cf4HYxGHt", "sThorn");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "controller", "emitterName", "mEmitter", "monter", "sShoot", "sSpinBoy", "sThorn" ]);