window.__require=function t(e,n,i){function s(r,c){if(!n[r]){if(!e[r]){var h=r.split("/");if(h=h[h.length-1],!e[h]){var a="function"==typeof __require&&__require;if(!c&&a)return a(h,!0);if(o)return o(h,!0);throw new Error("Cannot find module '"+r+"'")}}var u=n[r]={exports:{}};e[r][0].call(u.exports,function(t){return s(e[r][1][t]||t)},u,u.exports,t,e,n,i)}return n[r].exports}for(var o="function"==typeof __require&&__require,r=0;r<i.length;r++)s(i[r]);return s}({1:[function(t,e,n){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function s(t){return"function"==typeof t}function o(t){return"number"==typeof t}function r(t){return"object"==typeof t&&null!==t}function c(t){return void 0===t}e.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(t){if(!o(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},i.prototype.emit=function(t){var e,n,i,o,h,a;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var u=new Error('Uncaught, unspecified "error" event. ('+e+")");throw u.context=e,u}if(c(n=this._events[t]))return!1;if(s(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:o=Array.prototype.slice.call(arguments,1),n.apply(this,o)}else if(r(n))for(o=Array.prototype.slice.call(arguments,1),i=(a=n.slice()).length,h=0;h<i;h++)a[h].apply(this,o);return!0},i.prototype.addListener=function(t,e){var n;if(!s(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,s(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(n=c(this._maxListeners)?i.defaultMaxListeners:this._maxListeners)&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(t,e){if(!s(e))throw TypeError("listener must be a function");var n=!1;function i(){this.removeListener(t,i),n||(n=!0,e.apply(this,arguments))}return i.listener=e,this.on(t,i),this},i.prototype.removeListener=function(t,e){var n,i,o,c;if(!s(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(o=(n=this._events[t]).length,i=-1,n===e||s(n.listener)&&n.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(n)){for(c=o;c-- >0;)if(n[c]===e||n[c].listener&&n[c].listener===e){i=c;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[t]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},i.prototype.removeAllListeners=function(t){var e,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(s(n=this._events[t]))this.removeListener(t,n);else if(n)for(;n.length;)this.removeListener(t,n[n.length-1]);return delete this._events[t],this},i.prototype.listeners=function(t){return this._events&&this._events[t]?s(this._events[t])?[this._events[t]]:this._events[t].slice():[]},i.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(s(e))return 1;if(e)return e.length}return 0},i.listenerCount=function(t,e){return t.listenerCount(e)}},{}],controller:[function(t,e,n){"use strict";cc._RF.push(e,"7bbf6tMg21NV6vyCZsoJooD","controller");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{_keys:null,_isAction:!1,_isDone:!1},onKeyDown:function(t){this._keys.has(t.keyCode)||1!=this._isDone||(this._isAction=!1),this._keys.set(t.keyCode,t),1!=this._isAction&&(this._isAction=!0,this._isDone=!1,this.catchEvent(t.keyCode))},catchEvent:function(t){switch(t){case cc.macro.KEY.up:this._keys.has(cc.macro.KEY.right)?i.instance.emit("jumpRight","right"):this._keys.has(cc.macro.KEY.left)?i.instance.emit("jumpRight","left"):i.instance.emit("jump");break;case cc.macro.KEY.right:i.instance.emit("goRight","right");break;case cc.macro.KEY.space:this._keys.has(cc.macro.KEY.right)?i.instance.emit("runRight","right"):this._keys.has(cc.macro.KEY.left)&&i.instance.emit("runRight","left");break;case cc.macro.KEY.left:i.instance.emit("goRight","left");break;case cc.macro.KEY.q:i.instance.emit("shoot")}},onKeyUp:function(t){i.instance.emit("keyUp"),this._keys.delete(t.keyCode);var e=!0,n=!1,s=void 0;try{for(var o,r=this._keys.values()[Symbol.iterator]();!(e=(o=r.next()).done);e=!0){var c=o.value;if(this._keys.size>1)return;return void this.onKeyDown(c)}}catch(t){n=!0,s=t}finally{try{!e&&r.return&&r.return()}finally{if(n)throw s}}},onLoad:function(){this._keys=new Map,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),i.instance.registerEvent("doneEvent",this.dontEvent.bind(this))},dontEvent:function(){this._isAction=!1,this._isDone=!0},start:function(){},update:function(t){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],emitterName:[function(t,e,n){"use strict";cc._RF.push(e,"f0ce2kdJ8dFyJks2jC6R2MM","emitterName");e.exports={},cc._RF.pop()},{}],mEmitter:[function(t,e,n){"use strict";cc._RF.push(e,"bedcakEfB9GfZhnUoXsMTDN","mEmitter");var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=t("events"),r=function(){function t(){s(this,t),this._emiter=new o,this._emiter.setMaxListeners(100)}return i(t,[{key:"emit",value:function(){var t;(t=this._emiter).emit.apply(t,arguments)}},{key:"registerEvent",value:function(t,e){this._emiter.on(t,e)}},{key:"registerOnce",value:function(t,e){this._emiter.once(t,e)}},{key:"removeEvent",value:function(t,e){this._emiter.removeListener(t,e)}},{key:"destroy",value:function(){this._emiter.removeAllListeners(),this._emiter=null,t.instance=null}}]),t}();r.instance=null==r.instance?new r:r.instance,e.exports=r,cc._RF.pop()},{events:1}],monter:[function(t,e,n){"use strict";cc._RF.push(e,"884b3Lb2mVAcYhmWlkCCjAD","monter");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{hpMonter:cc.Component,winner:cc.Component},onLoad:function(){cc.log(this.winner),i.instance.registerEvent("bingo",this.binGo.bind(this))},binGo:function(){cc.log(this.hpMonter.node.getComponent(cc.ProgressBar).progress),this.hpMonter.node.getComponent(cc.ProgressBar).progress-=.1,this.hpMonter.node.getComponent(cc.ProgressBar).progress<=0&&(this.winner.node.active=!0,this.node.destroy())},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],sShoot:[function(t,e,n){"use strict";cc._RF.push(e,"5998ay9UT9M7LzEMlvP0hVw","sShoot");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{_x:0,_y:0},onLoad:function(){this._x=this.node.x,this._y=this.node.y,i.instance.registerOnce("bulletMove",this.bulletMove.bind(this))},bulletMove:function(){var t=this,e=new cc.CallFunc(function(){t.node.destroy()}),n=cc.moveBy(.8,cc.v2(this._x+1e3,this._y+100));this.node.runAction(new cc.sequence(n,e))},onCollisionEnter:function(t,e){i.instance.emit("bingo")},start:function(){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],sSpinBoy:[function(t,e,n){"use strict";cc._RF.push(e,"50a1fj6ra5ILbbAZ/A/L7Db","sSpinBoy");var i=t("mEmitter");cc.Class({extends:cc.Component,properties:{spinBoy:sp.Skeleton,_scaleX:0,_directed:"right",_action:null,_y:0,_x:0,hp:cc.Component,prefabBullet:cc.Prefab,_progress:0},onCollisionStay:function(){var t=this;this._progress.progress-=.01,this._progress.progress<=0&&this.spinBoy.setCompleteListener(function(){t.spinBoy.clearTracks(),t.spinBoy.setToSetupPose(),t.spinBoy.setAnimation(0,"death",!1)})},gameOver:function(){},onLoad:function(){this._progress=this.hp.node.getComponent(cc.ProgressBar),this._y=this.node.y,this._x=this.node.x,this._scaleX=this.node.scaleX,i.instance.registerEvent("jump",this.spinBoyJump.bind(this)),i.instance.registerEvent("jumpRight",this.spinBoyJumpRight.bind(this)),i.instance.registerEvent("runRight",this.spinBoyRunRight.bind(this)),i.instance.registerEvent("goRight",this.spinBoyGoRight.bind(this)),i.instance.registerEvent("keyUp",this.keyUp.bind(this)),i.instance.registerEvent("shoot",this.shoot.bind(this))},shoot:function(){this.spinBoy.setAnimation(0,"shoot",!1),cc.log(this.spinBoy),this.spinBoy.setCompleteListener(function(){i.instance.emit("doneEvent")}),this.createBullet(),i.instance.emit("bulletMove")},createBullet:function(){var t=cc.instantiate(this.prefabBullet);t.parent=this.node,t.x=this.node.x+823,t.y=this.node.y+319},keyUp:function(){this.node.stopAction(this._action),i.instance.emit("doneEvent"),this.spinBoy.clearTracks(),this.spinBoy.setToSetupPose(),this.spinBoy.setAnimation(0,"idle",!0)},spinBoyJumpRight:function(t){var e=this;cc.log(this.node.y);var n=this.spinBoyTurn(t);cc.tween(this.node).to(.2,{position:cc.v2(this.node.x+25*n,this.node.y+50)}).call(function(){cc.log(e.node.x,e.node.y)}).to(.2,{position:cc.v2(this.node.x+50*n,this.node.y+80)}).call(function(){cc.log(e.node.x,e.node.y)}).to(.2,{position:cc.v2(this.node.x+100*n,this.node.y+50)}).call(function(){cc.log(e.node.x,e.node.y)}).to(.2,{position:cc.v2(this.node.x+125*n,this.node.y)}).call(function(){cc.log(e.node.x,e.node.y)}).start(),this.spinBoy.setAnimation(0,"run",!1),this.spinBoy.setAnimation(0,"hoverboard",!1),this.spinBoy.setCompleteListener(function(){i.instance.emit("doneEvent")}),cc.log(this.node.y)},spinBoyJump:function(){cc.log(this.node.y),cc.tween(this.node).to(.4,{position:cc.v2(this.node.x,this.node.y+70)}).to(.4,{position:cc.v2(this.node.x,this._y)}).start(),this.spinBoy.setAnimation(0,"hoverboard",!1),this.spinBoy.setCompleteListener(function(){i.instance.emit("doneEvent")})},spinBoyRunRight:function(t){var e=this.spinBoyTurn(t),n=cc.moveBy(.8,cc.v2(100*e,0));this._action=this.node.runAction(n),this.spinBoy.setAnimation(0,"run",!1),this.spinBoy.setCompleteListener(function(){i.instance.emit("doneEvent")})},spinBoyGoRight:function(t){var e=this.spinBoyTurn(t),n=cc.moveBy(.9,cc.v2(50*e,0));this._action=this.node.runAction(n),this.spinBoy.setAnimation(0,"walk",!1),this.spinBoy.setCompleteListener(function(){i.instance.emit("doneEvent")})},spinBoyTurn:function(t){var e=1;return"right"==t?this.node.scaleX=this._scaleX:(this.node.scaleX=-this._scaleX,e=-1),e},start:function(){var t=this;this.spinBoy.setAnimation(0,"portal",!1),this.spinBoy.setCompleteListener(function(){t.keyUp()})},update:function(t){}}),cc._RF.pop()},{mEmitter:"mEmitter"}],sThorn:[function(t,e,n){"use strict";cc._RF.push(e,"945c3UzdO9D6L+cf4HYxGHt","sThorn"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){var t=cc.director.getCollisionManager();t.enabled=!0,t.enabledDebugDraw=!0,t.enabledDrawBoundingBox=!0},start:function(){}}),cc._RF.pop()},{}]},{},["controller","emitterName","mEmitter","monter","sShoot","sSpinBoy","sThorn"]);