"use strict";

/* Notify v0.2.0 */

var Notify = (

  /**
   * @constructor
   * @this {Steerer}
   * @param  {string} selector element selector
   * @param  {Object} options  options
   */
  function Notify(selector, options) {
    var _this = this;
    if (options === undefined) options = {};
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

    this.notifyTypes = {
      error: "notify__error",
      warning: "notify__warning",
      success: "notify__success",
      "default": "notify__default"
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
  }
);




/**
 * get element
 * @param  {string|object} arg get element selector
 * @return {object}
 */
Notify.prototype.getEl = function (arg) {
  if (typeof arg == "string") {
    return document.querySelector(arg);
  } else {
    return arg;
  }
};




/**
 * set delay for closing notification
 * @param {string} item         selector of notification
 * @param {number} closingDelay delay
 */
Notify.prototype.setClosingDelay = function (item, closingDelay) {
  var _this2 = this;
  if (closingDelay === undefined) closingDelay = this.closingDelay;
  if (this.closingDelay) {
    var timeout = setTimeout(function () {
      _this2.close(item);
    }, this.closingDelay);

    return timeout;
  }
};




/**
 * add notification
 * @param {string} text    notification text
 * @param {Object} options options
 */
Notify.prototype.add = function (text, options) {
  if (options === undefined) options = {};
  var timeout = undefined;
  var i = ++this.itemsCounter;
  var link = this.el.querySelector("#notify_" + i);
  var itemClasses = "notify__item";

  if (options.type) {
    itemClasses += " " + this.notifyTypes[options.type];
  } else {
    itemClasses += " " + this.notifyTypes["default"];
  }

  this.el.insertAdjacentHTML(this.orderConfig[this.order], "<div class=\"" + itemClasses + "\" id=\"notify_" + i + "\">\n          <div class=\"notify__close\">×</div>\n          <div class=\"notify__content\">" + text + "</div>\n      </div>");
  timeout = this.setClosingDelay("#notify_" + i, options.closingDelay || this.closingDelay);
  this.notifyList["#notify_" + i] = { timeout: timeout, link: link };

  return this;
};




/**
 * close notification
 * @param {string} sel selector
 */
Notify.prototype.close = function (sel) {
  var _this3 = this;
  var el = this.getEl(sel);

  el.classList.add("notify--closing");

  setTimeout(function () {
    if (_this3.notifyList[sel]) {
      _this3.el.removeChild(el);

      if (_this3.notifyList[sel].timeout) {
        clearTimeout(_this3.notifyList[sel].timeout);
      }

      delete _this3.notifyList[sel];

      if (Object.keys(_this3.notifyList).length == 0) {
        _this3.itemsCounter = 0;
      }
    }
  }, this.removingDelay);

  return this;
};




/**
 * close all notification
 */
Notify.prototype.closeAll = function () {
  var self = this;
  var items = this.el.querySelectorAll(".notify__item");

  Array.prototype.forEach.call(items, function (item) {
    self.close("#" + item.id);
  });
};




/**
 * close first notification
 */
Notify.prototype.closeFirst = function () {
  var item = this.el.querySelector(":first-child");

  if (item) {
    this.close("#" + item.id);
  }
};




/**
 * close last notofication
 */
Notify.prototype.closeLast = function () {
  var item = this.el.querySelector(".notify__item:last-child");

  if (item) {
    this.close("#" + item.id);
  }
};
//# sourceMappingURL=data:application/json;base64,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QUEsWUFBRztBQUNYLE1BQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUVqRCxNQUFJLElBQUksRUFBRTtBQUNSLFFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUMzQjtDQUNGOzs7Ozs7OztBQWpLRyxNQUFNLFdBdUtWLFNBQVMsR0FBQSxZQUFHO0FBQ1YsTUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7QUFFN0QsTUFBSSxJQUFJLEVBQUU7QUFDUixRQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDM0I7Q0FDRiIsImZpbGUiOiJub3RpZnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBOb3RpZnkgdjAuMi4wICovXHJcblxyXG5jbGFzcyBOb3RpZnkge1xyXG5cclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAdGhpcyB7U3RlZXJlcn1cclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHNlbGVjdG9yIGVsZW1lbnQgc2VsZWN0b3JcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgIG9wdGlvbnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLmVsID0gdGhpcy5nZXRFbChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCAnZGVmYXVsdCc7XHJcbiAgICB0aGlzLmNsb3NpbmdEZWxheSA9IHBhcnNlSW50KG9wdGlvbnMuY2xvc2luZ0RlbGF5KSB8fCAwO1xyXG4gICAgdGhpcy5yZW1vdmluZ0RlbGF5ID0gcGFyc2VJbnQob3B0aW9ucy5yZW1vdmluZ0RlbGF5KSB8fCAzMDAwO1xyXG5cclxuICAgIHRoaXMuaXRlbXNDb3VudGVyID0gMDtcclxuICAgIHRoaXMubm90aWZ5TGlzdCA9IHt9O1xyXG5cclxuICAgIHRoaXMub3JkZXJDb25maWcgPSB7XHJcbiAgICAgIGRlZmF1bHQ6ICdiZWZvcmVFbmQnLFxyXG4gICAgICByZXZlcnNlOiAnYWZ0ZXJCZWdpbidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5ub3RpZnlUeXBlcyA9IHtcclxuICAgICAgZXJyb3I6ICdub3RpZnlfX2Vycm9yJyxcclxuICAgICAgd2FybmluZzogJ25vdGlmeV9fd2FybmluZycsXHJcbiAgICAgIHN1Y2Nlc3M6ICdub3RpZnlfX3N1Y2Nlc3MnLFxyXG4gICAgICBkZWZhdWx0OiAnbm90aWZ5X19kZWZhdWx0J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgbGV0IGNsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XHJcblxyXG4gICAgICBpZiAoY2xhc3Nlcy5jb250YWlucygnbm90aWZ5X19jbG9zZScpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgnIycgKyBlLnRhcmdldC5wYXJlbnROb2RlLmlkKTtcclxuICAgICAgfVxyXG4gICAgfSwgZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubm90aWZ5TGlzdFtlXS50aW1lb3V0KTtcclxuICAgICAgfSk7XHJcbiAgICB9LCB0cnVlKTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlMaXN0W2l0ZW1dLnRpbWVvdXQgPSB0aGlzLnNldENsb3NpbmdEZWxheShpdGVtKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCB0cnVlKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBnZXQgZWxlbWVudFxyXG4gICAqIEBwYXJhbSAge3N0cmluZ3xvYmplY3R9IGFyZyBnZXQgZWxlbWVudCBzZWxlY3RvclxyXG4gICAqIEByZXR1cm4ge29iamVjdH1cclxuICAgKi9cclxuICBnZXRFbChhcmcpIHtcclxuICAgIGlmICh0eXBlb2YgYXJnID09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFyZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXJnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCBkZWxheSBmb3IgY2xvc2luZyBub3RpZmljYXRpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAgICAgICAgIHNlbGVjdG9yIG9mIG5vdGlmaWNhdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjbG9zaW5nRGVsYXkgZGVsYXlcclxuICAgKi9cclxuICBzZXRDbG9zaW5nRGVsYXkoaXRlbSwgY2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zaW5nRGVsYXkpIHtcclxuICAgIGlmICh0aGlzLmNsb3NpbmdEZWxheSkge1xyXG4gICAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoaXRlbSk7XHJcbiAgICAgIH0sIHRoaXMuY2xvc2luZ0RlbGF5KTtcclxuXHJcbiAgICAgIHJldHVybiB0aW1lb3V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGFkZCBub3RpZmljYXRpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAgICBub3RpZmljYXRpb24gdGV4dFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnNcclxuICAgKi9cclxuICBhZGQodGV4dCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBsZXQgdGltZW91dDtcclxuICAgIGxldCBpID0gKyt0aGlzLml0ZW1zQ291bnRlcjtcclxuICAgIGxldCBsaW5rID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGAjbm90aWZ5XyR7aX1gKTtcclxuICAgIGxldCBpdGVtQ2xhc3NlcyA9ICdub3RpZnlfX2l0ZW0nO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnR5cGUpIHtcclxuICAgICAgaXRlbUNsYXNzZXMgKz0gXCIgXCIgKyB0aGlzLm5vdGlmeVR5cGVzW29wdGlvbnMudHlwZV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtQ2xhc3NlcyArPSBcIiBcIiArIHRoaXMubm90aWZ5VHlwZXNbJ2RlZmF1bHQnXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsLmluc2VydEFkamFjZW50SFRNTCh0aGlzLm9yZGVyQ29uZmlnW3RoaXMub3JkZXJdLFxyXG4gICAgICBgPGRpdiBjbGFzcz1cIiR7aXRlbUNsYXNzZXN9XCIgaWQ9XCJub3RpZnlfJHtpfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY2xvc2VcIj7DlzwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY29udGVudFwiPiR7dGV4dH08L2Rpdj5cclxuICAgICAgPC9kaXY+YCk7XHJcbiAgICB0aW1lb3V0ID0gdGhpcy5zZXRDbG9zaW5nRGVsYXkoYCNub3RpZnlfJHtpfWAsIG9wdGlvbnMuY2xvc2luZ0RlbGF5IHx8IHRoaXMuY2xvc2luZ0RlbGF5KTtcclxuICAgIHRoaXMubm90aWZ5TGlzdFtgI25vdGlmeV8ke2l9YF0gPSB7dGltZW91dCwgbGlua307XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogY2xvc2Ugbm90aWZpY2F0aW9uXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbCBzZWxlY3RvclxyXG4gICAqL1xyXG4gIGNsb3NlKHNlbCkge1xyXG4gICAgbGV0IGVsID0gdGhpcy5nZXRFbChzZWwpO1xyXG5cclxuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdGlmeS0tY2xvc2luZycpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5ub3RpZnlMaXN0W3NlbF0pIHtcclxuICAgICAgICB0aGlzLmVsLnJlbW92ZUNoaWxkKGVsKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm90aWZ5TGlzdFtzZWxdLnRpbWVvdXQpIHsgXHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ub3RpZnlMaXN0W3NlbF0udGltZW91dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgdGhpcy5ub3RpZnlMaXN0W3NlbF07XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLml0ZW1zQ291bnRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzLnJlbW92aW5nRGVsYXkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGNsb3NlIGFsbCBub3RpZmljYXRpb25cclxuICAgKi9cclxuICBjbG9zZUFsbCgpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGxldCBpdGVtcyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnLm5vdGlmeV9faXRlbScpO1xyXG5cclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaXRlbXMsIChpdGVtKSA9PiB7XHJcbiAgICAgIHNlbGYuY2xvc2UoJyMnICsgaXRlbS5pZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBjbG9zZSBmaXJzdCBub3RpZmljYXRpb25cclxuICAgKi9cclxuICBjbG9zZUZpcnN0KCkge1xyXG4gICAgbGV0IGl0ZW0gPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJzpmaXJzdC1jaGlsZCcpO1xyXG5cclxuICAgIGlmIChpdGVtKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoJyMnICsgaXRlbS5pZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogY2xvc2UgbGFzdCBub3RvZmljYXRpb25cclxuICAgKi9cclxuICBjbG9zZUxhc3QoKSB7XHJcbiAgICBsZXQgaXRlbSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm5vdGlmeV9faXRlbTpsYXN0LWNoaWxkJyk7XHJcblxyXG4gICAgaWYgKGl0ZW0pIHtcclxuICAgICAgdGhpcy5jbG9zZSgnIycgKyBpdGVtLmlkKTtcclxuICAgIH1cclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=