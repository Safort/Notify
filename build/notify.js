"use strict";

/* Notify v0.1.1 */

var Notify = function Notify(selector, options) {
  var _this = this;
  this.el = this.getEl(selector);
  this.order = options.order || "default";
  this.closingDelay = parseInt(options.closingDelay) || 0;
  this.removingDelay = parseInt(options.removingDelay) || 3000;

  this.itemsCounter = 0;
  this.notifyList = {};

  this.orderConfig = {
    "default": "beforeEnd",
    reverse: "afterBegin"
  };

  this.el.addEventListener("click", function (e) {
    var classes = e.target.classList;
    if (classes.contains("notify__close")) {
      _this.close("#" + e.target.parentNode.id);
    }
  }, false);

  this.el.addEventListener("mouseover", function (e) {
    Object.keys(_this.notifyList).forEach(function (e) {
      clearTimeout(_this.notifyList[e].timeout);
    });
  }, true);

  this.el.addEventListener("mouseout", function (e) {
    Object.keys(_this.notifyList).forEach(function (item) {
      _this.notifyList[item].timeout = _this.setClosingDelay(item);
    });
  }, true);
};

Notify.prototype.getEl = function (arg) {
  if (typeof arg == "string") {
    return document.querySelector(arg);
  } else {
    return arg;
  }
};

Notify.prototype.setClosingDelay = function (item) {
  var _this2 = this;
  if (this.closingDelay) {
    var timeout = setTimeout(function () {
      _this2.close(item);
    }, this.closingDelay);

    return timeout;
  }
};

Notify.prototype.add = function (text) {
  var that = this;
  var timeout;
  var i = ++this.itemsCounter;
  var link = this.el.querySelector("#notify_" + i);
  this.el.insertAdjacentHTML(this.orderConfig[this.order], "<div class=\"notify__item\" id=\"notify_" + i + "\">\n          <div class=\"notify__close\">×</div>\n          <div class=\"notify__content\">" + text + "</div>\n      </div>");
  timeout = this.setClosingDelay("#notify_" + i);
  that.notifyList["#notify_" + i] = { timeout: timeout, link: link };

  return this;
};

Notify.prototype.close = function (sel) {
  var _this3 = this;
  var el = this.getEl(sel);
  el.classList.add("notify--closing");

  setTimeout(function () {
    _this3.el.removeChild(el);
    if (_this3.notifyList[sel].timeout) {
      clearTimeout(_this3.notifyList[sel].timeout);
    }
    delete _this3.notifyList[sel];
    if (Object.keys(_this3.notifyList).length == 0) {
      _this3.itemsCounter = 0;
    }
  }, this.removingDelay);

  return this;
};
//# sourceMappingURL=data:application/json;base64,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bGUiOiJub3RpZnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBOb3RpZnkgdjAuMS4xICovXHJcblxyXG5jbGFzcyBOb3RpZnkge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLmVsID0gdGhpcy5nZXRFbChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCAnZGVmYXVsdCc7XHJcbiAgICB0aGlzLmNsb3NpbmdEZWxheSA9IHBhcnNlSW50KG9wdGlvbnMuY2xvc2luZ0RlbGF5KSB8fCAwO1xyXG4gICAgdGhpcy5yZW1vdmluZ0RlbGF5ID0gcGFyc2VJbnQob3B0aW9ucy5yZW1vdmluZ0RlbGF5KSB8fCAzMDAwO1xyXG5cclxuICAgIHRoaXMuaXRlbXNDb3VudGVyID0gMDtcclxuICAgIHRoaXMubm90aWZ5TGlzdCA9IHt9O1xyXG5cclxuICAgIHRoaXMub3JkZXJDb25maWcgPSB7XHJcbiAgICAgICdkZWZhdWx0JzogJ2JlZm9yZUVuZCcsXHJcbiAgICAgICdyZXZlcnNlJzogJ2FmdGVyQmVnaW4nXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICB2YXIgY2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcclxuICAgICAgaWYgKGNsYXNzZXMuY29udGFpbnMoJ25vdGlmeV9fY2xvc2UnKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoJyMnICsgZS50YXJnZXQucGFyZW50Tm9kZS5pZCk7XHJcbiAgICAgIH1cclxuICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubm90aWZ5TGlzdCkuZm9yRWFjaCgoZSkgPT4ge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5vdGlmeUxpc3RbZV0udGltZW91dCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubm90aWZ5TGlzdCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHRoaXMubm90aWZ5TGlzdFtpdGVtXS50aW1lb3V0ID0gdGhpcy5zZXRDbG9zaW5nRGVsYXkoaXRlbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0RWwoYXJnKSB7XHJcbiAgICBpZiAodHlwZW9mIGFyZyA9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhcmcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGFyZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldENsb3NpbmdEZWxheShpdGVtKSB7XHJcbiAgICBpZiAodGhpcy5jbG9zaW5nRGVsYXkpIHtcclxuICAgICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmNsb3NlKGl0ZW0pO1xyXG4gICAgICB9LCB0aGlzLmNsb3NpbmdEZWxheSk7XHJcblxyXG4gICAgICByZXR1cm4gdGltZW91dDtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBhZGQodGV4dCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgdmFyIHRpbWVvdXQ7XHJcbiAgICB2YXIgaSA9ICsrdGhpcy5pdGVtc0NvdW50ZXI7XHJcbiAgICB2YXIgbGluayA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihgI25vdGlmeV8ke2l9YCk7XHJcbiAgICB0aGlzLmVsLmluc2VydEFkamFjZW50SFRNTCh0aGlzLm9yZGVyQ29uZmlnW3RoaXMub3JkZXJdLFxyXG4gICAgICBgPGRpdiBjbGFzcz1cIm5vdGlmeV9faXRlbVwiIGlkPVwibm90aWZ5XyR7aX1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZnlfX2Nsb3NlXCI+w5c8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZnlfX2NvbnRlbnRcIj4ke3RleHR9PC9kaXY+XHJcbiAgICAgIDwvZGl2PmApO1xyXG4gICAgdGltZW91dCA9IHRoaXMuc2V0Q2xvc2luZ0RlbGF5KGAjbm90aWZ5XyR7aX1gKTtcclxuICAgIHRoYXQubm90aWZ5TGlzdFtgI25vdGlmeV8ke2l9YF0gPSB7dGltZW91dCwgbGlua307XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2xvc2Uoc2VsKSB7XHJcbiAgICB2YXIgZWwgPSB0aGlzLmdldEVsKHNlbCk7XHJcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdub3RpZnktLWNsb3NpbmcnKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVDaGlsZChlbCk7XHJcbiAgICAgIGlmICh0aGlzLm5vdGlmeUxpc3Rbc2VsXS50aW1lb3V0KSB7IFxyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5vdGlmeUxpc3Rbc2VsXS50aW1lb3V0KTtcclxuICAgICAgfVxyXG4gICAgICBkZWxldGUgdGhpcy5ub3RpZnlMaXN0W3NlbF07XHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtc0NvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzLnJlbW92aW5nRGVsYXkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=