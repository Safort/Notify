"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/* Notify v0.2.0 */

var Notify = (function () {
  /**
   * @constructor
   * @this {Steerer}
   * @param  {string} selector element selector
   * @param  {Object} options  options
   */
  function Notify(selector) {
    var _this = this;
    var options = arguments[1] === undefined ? {} : arguments[1];
    _classCallCheck(this, Notify);

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

  _prototypeProperties(Notify, null, {
    getEl: {


      /**
       * get element
       * @param  {string|object} arg get element selector
       * @return {object}
       */
      value: function getEl(arg) {
        if (typeof arg == "string") {
          return document.querySelector(arg);
        } else {
          return arg;
        }
      },
      writable: true,
      configurable: true
    },
    setClosingDelay: {


      /**
       * set delay for closing notification
       * @param {string} item         selector of notification
       * @param {number} closingDelay delay
       */
      value: function setClosingDelay(item) {
        var _this = this;
        var closingDelay = arguments[1] === undefined ? this.closingDelay : arguments[1];
        if (this.closingDelay) {
          var timeout = setTimeout(function () {
            _this.close(item);
          }, this.closingDelay);

          return timeout;
        }
      },
      writable: true,
      configurable: true
    },
    add: {


      /**
       * add notification
       * @param {string} text    notification text
       * @param {Object} options options
       */
      value: function add(text) {
        var options = arguments[1] === undefined ? {} : arguments[1];
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
      },
      writable: true,
      configurable: true
    },
    close: {


      /**
       * close notification
       * @param {string} sel selector
       */
      value: function close(sel) {
        var _this = this;
        var el = this.getEl(sel);

        el.classList.add("notify--closing");

        setTimeout(function () {
          if (_this.notifyList[sel]) {
            _this.el.removeChild(el);

            if (_this.notifyList[sel].timeout) {
              clearTimeout(_this.notifyList[sel].timeout);
            }

            delete _this.notifyList[sel];

            if (Object.keys(_this.notifyList).length == 0) {
              _this.itemsCounter = 0;
            }
          }
        }, this.removingDelay);

        return this;
      },
      writable: true,
      configurable: true
    },
    closeAll: {


      /**
       * close all notification
       */
      value: function closeAll() {
        var self = this;
        var items = this.el.querySelectorAll(".notify__item");

        Array.prototype.forEach.call(items, function (item) {
          self.close("#" + item.id);
        });
      },
      writable: true,
      configurable: true
    },
    closeFirst: {


      /**
       * close first notification
       */
      value: function closeFirst() {
        var item = this.el.querySelector(":first-child");

        if (item) {
          this.close("#" + item.id);
        }
      },
      writable: true,
      configurable: true
    },
    closeLast: {


      /**
       * close last notofication
       */
      value: function closeLast() {
        var item = this.el.querySelector(".notify__item:last-child");

        if (item) {
          this.close("#" + item.id);
        }
      },
      writable: true,
      configurable: true
    }
  });

  return Notify;
})();
//# sourceMappingURL=data:application/json;base64,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RTtBQUNSLGNBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjtPQUNGOzs7O0FBTUQsYUFBUzs7Ozs7O2FBQUEscUJBQUc7QUFDVixZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOztBQUU3RCxZQUFJLElBQUksRUFBRTtBQUNSLGNBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjtPQUNGOzs7Ozs7U0E3S0csTUFBTSIsImZpbGUiOiJub3RpZnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBOb3RpZnkgdjAuMi4wICovXHJcblxyXG5jbGFzcyBOb3RpZnkge1xyXG5cclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAdGhpcyB7U3RlZXJlcn1cclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHNlbGVjdG9yIGVsZW1lbnQgc2VsZWN0b3JcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgIG9wdGlvbnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLmVsID0gdGhpcy5nZXRFbChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCAnZGVmYXVsdCc7XHJcbiAgICB0aGlzLmNsb3NpbmdEZWxheSA9IHBhcnNlSW50KG9wdGlvbnMuY2xvc2luZ0RlbGF5KSB8fCAwO1xyXG4gICAgdGhpcy5yZW1vdmluZ0RlbGF5ID0gcGFyc2VJbnQob3B0aW9ucy5yZW1vdmluZ0RlbGF5KSB8fCAzMDAwO1xyXG5cclxuICAgIHRoaXMuaXRlbXNDb3VudGVyID0gMDtcclxuICAgIHRoaXMubm90aWZ5TGlzdCA9IHt9O1xyXG5cclxuICAgIHRoaXMub3JkZXJDb25maWcgPSB7XHJcbiAgICAgIGRlZmF1bHQ6ICdiZWZvcmVFbmQnLFxyXG4gICAgICByZXZlcnNlOiAnYWZ0ZXJCZWdpbidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5ub3RpZnlUeXBlcyA9IHtcclxuICAgICAgZXJyb3I6ICdub3RpZnlfX2Vycm9yJyxcclxuICAgICAgd2FybmluZzogJ25vdGlmeV9fd2FybmluZycsXHJcbiAgICAgIHN1Y2Nlc3M6ICdub3RpZnlfX3N1Y2Nlc3MnLFxyXG4gICAgICBkZWZhdWx0OiAnbm90aWZ5X19kZWZhdWx0J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgbGV0IGNsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XHJcblxyXG4gICAgICBpZiAoY2xhc3Nlcy5jb250YWlucygnbm90aWZ5X19jbG9zZScpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgnIycgKyBlLnRhcmdldC5wYXJlbnROb2RlLmlkKTtcclxuICAgICAgfVxyXG4gICAgfSwgZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubm90aWZ5TGlzdFtlXS50aW1lb3V0KTtcclxuICAgICAgfSk7XHJcbiAgICB9LCB0cnVlKTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlMaXN0W2l0ZW1dLnRpbWVvdXQgPSB0aGlzLnNldENsb3NpbmdEZWxheShpdGVtKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCB0cnVlKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBnZXQgZWxlbWVudFxyXG4gICAqIEBwYXJhbSAge3N0cmluZ3xvYmplY3R9IGFyZyBnZXQgZWxlbWVudCBzZWxlY3RvclxyXG4gICAqIEByZXR1cm4ge29iamVjdH1cclxuICAgKi9cclxuICBnZXRFbChhcmcpIHtcclxuICAgIGlmICh0eXBlb2YgYXJnID09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFyZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXJnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCBkZWxheSBmb3IgY2xvc2luZyBub3RpZmljYXRpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAgICAgICAgIHNlbGVjdG9yIG9mIG5vdGlmaWNhdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjbG9zaW5nRGVsYXkgZGVsYXlcclxuICAgKi9cclxuICBzZXRDbG9zaW5nRGVsYXkoaXRlbSwgY2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zaW5nRGVsYXkpIHtcclxuICAgIGlmICh0aGlzLmNsb3NpbmdEZWxheSkge1xyXG4gICAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoaXRlbSk7XHJcbiAgICAgIH0sIHRoaXMuY2xvc2luZ0RlbGF5KTtcclxuXHJcbiAgICAgIHJldHVybiB0aW1lb3V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGFkZCBub3RpZmljYXRpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAgICBub3RpZmljYXRpb24gdGV4dFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnNcclxuICAgKi9cclxuICBhZGQodGV4dCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBsZXQgdGltZW91dDtcclxuICAgIGxldCBpID0gKyt0aGlzLml0ZW1zQ291bnRlcjtcclxuICAgIGxldCBsaW5rID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGAjbm90aWZ5XyR7aX1gKTtcclxuICAgIGxldCBpdGVtQ2xhc3NlcyA9ICdub3RpZnlfX2l0ZW0nO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnR5cGUpIHtcclxuICAgICAgaXRlbUNsYXNzZXMgKz0gXCIgXCIgKyB0aGlzLm5vdGlmeVR5cGVzW29wdGlvbnMudHlwZV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtQ2xhc3NlcyArPSBcIiBcIiArIHRoaXMubm90aWZ5VHlwZXNbJ2RlZmF1bHQnXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsLmluc2VydEFkamFjZW50SFRNTCh0aGlzLm9yZGVyQ29uZmlnW3RoaXMub3JkZXJdLFxyXG4gICAgICBgPGRpdiBjbGFzcz1cIiR7aXRlbUNsYXNzZXN9XCIgaWQ9XCJub3RpZnlfJHtpfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY2xvc2VcIj7DlzwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY29udGVudFwiPiR7dGV4dH08L2Rpdj5cclxuICAgICAgPC9kaXY+YCk7XHJcbiAgICB0aW1lb3V0ID0gdGhpcy5zZXRDbG9zaW5nRGVsYXkoYCNub3RpZnlfJHtpfWAsIG9wdGlvbnMuY2xvc2luZ0RlbGF5IHx8IHRoaXMuY2xvc2luZ0RlbGF5KTtcclxuICAgIHRoaXMubm90aWZ5TGlzdFtgI25vdGlmeV8ke2l9YF0gPSB7dGltZW91dCwgbGlua307XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogY2xvc2Ugbm90aWZpY2F0aW9uXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbCBzZWxlY3RvclxyXG4gICAqL1xyXG4gIGNsb3NlKHNlbCkge1xyXG4gICAgbGV0IGVsID0gdGhpcy5nZXRFbChzZWwpO1xyXG5cclxuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdGlmeS0tY2xvc2luZycpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5ub3RpZnlMaXN0W3NlbF0pIHtcclxuICAgICAgICB0aGlzLmVsLnJlbW92ZUNoaWxkKGVsKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm90aWZ5TGlzdFtzZWxdLnRpbWVvdXQpIHsgXHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ub3RpZnlMaXN0W3NlbF0udGltZW91dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgdGhpcy5ub3RpZnlMaXN0W3NlbF07XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLml0ZW1zQ291bnRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzLnJlbW92aW5nRGVsYXkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGNsb3NlIGFsbCBub3RpZmljYXRpb25cclxuICAgKi9cclxuICBjbG9zZUFsbCgpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGxldCBpdGVtcyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnLm5vdGlmeV9faXRlbScpO1xyXG5cclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaXRlbXMsIChpdGVtKSA9PiB7XHJcbiAgICAgIHNlbGYuY2xvc2UoJyMnICsgaXRlbS5pZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBjbG9zZSBmaXJzdCBub3RpZmljYXRpb25cclxuICAgKi9cclxuICBjbG9zZUZpcnN0KCkge1xyXG4gICAgbGV0IGl0ZW0gPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJzpmaXJzdC1jaGlsZCcpO1xyXG5cclxuICAgIGlmIChpdGVtKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoJyMnICsgaXRlbS5pZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogY2xvc2UgbGFzdCBub3RvZmljYXRpb25cclxuICAgKi9cclxuICBjbG9zZUxhc3QoKSB7XHJcbiAgICBsZXQgaXRlbSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm5vdGlmeV9faXRlbTpsYXN0LWNoaWxkJyk7XHJcblxyXG4gICAgaWYgKGl0ZW0pIHtcclxuICAgICAgdGhpcy5jbG9zZSgnIycgKyBpdGVtLmlkKTtcclxuICAgIH1cclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=