"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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
        // console.log(e.target.parentNode.parentNode);
        _this.close("#" + e.target.parentNode.id);
      }
    }, false);

    this.el.addEventListener("mouseover", function (e) {
      Object.keys(_this.notifyList).forEach(function (e) {
        clearTimeout(_this.notifyList[e].timeout);
      });
    }, false);

    this.el.addEventListener("mouseout", function (e) {
      Object.keys(_this.notifyList).forEach(function (item) {
        _this.notifyList[item].timeout = _this.setClosingDelay(item, _this.notifyList[item].closingDelay);
      });
    }, false);
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

        if (closingDelay) {
          var timeout = setTimeout(function () {
            _this.close(item);
          }, closingDelay);

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

      value: function add() {
        var options = arguments[0] === undefined ? {} : arguments[0];

        var timeout = undefined;
        var i = ++this.itemsCounter;
        var title = options.title;
        var content = options.content;
        var _options$closingDelay = options.closingDelay;
        var closingDelay = _options$closingDelay === undefined ? this.closingDelay : _options$closingDelay;
        var _options$type = options.type;
        var type = _options$type === undefined ? "default" : _options$type;

        title = !title ? "" : "<div class=\"notify__title\">" + title + "</div>";
        content = !content || typeof content == "object" ? "" : "<div class=\"notify__content\">" + content + "</div>";

        this.el.insertAdjacentHTML(this.orderConfig[this.order], "<div class=\"notify__item " + this.notifyTypes[type] + "\" id=\"notify_" + i + "\">\n          <div class=\"notify__close\">×</div>\n          " + title + "\n          " + content + "\n      </div>");
        timeout = this.setClosingDelay("#notify_" + i, closingDelay);
        this.notifyList["#notify_" + i] = { timeout: timeout, closingDelay: closingDelay };

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

        Array.from(items).forEach(function (item) {
          return self.close("#" + item.id);
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
//# sourceMappingURL=data:application/json;base64,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QWMsQ0FBQyxDQUFDOztBQUVqRCxZQUFJLElBQUksRUFBRTtBQUNSLGNBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjtPQUNGOzs7O0FBTUQsYUFBUzs7Ozs7O2FBQUEscUJBQUc7QUFDVixZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOztBQUU3RCxZQUFJLElBQUksRUFBRTtBQUNSLGNBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjtPQUNGOzs7Ozs7U0ExS0csTUFBTSIsImZpbGUiOiJub3RpZnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNsYXNzIE5vdGlmeSB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAdGhpcyB7U3RlZXJlcn1cbiAgICogQHBhcmFtICB7c3RyaW5nfSBzZWxlY3RvciBlbGVtZW50IHNlbGVjdG9yXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyAgb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZWwgPSB0aGlzLmdldEVsKHNlbGVjdG9yKTtcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCAnZGVmYXVsdCc7XG4gICAgdGhpcy5jbG9zaW5nRGVsYXkgPSBwYXJzZUludChvcHRpb25zLmNsb3NpbmdEZWxheSkgfHwgMDtcbiAgICB0aGlzLnJlbW92aW5nRGVsYXkgPSBwYXJzZUludChvcHRpb25zLnJlbW92aW5nRGVsYXkpIHx8IDMwMDA7XG5cbiAgICB0aGlzLml0ZW1zQ291bnRlciA9IDA7XG4gICAgdGhpcy5ub3RpZnlMaXN0ID0ge307XG5cbiAgICB0aGlzLm9yZGVyQ29uZmlnID0ge1xuICAgICAgZGVmYXVsdDogJ2JlZm9yZUVuZCcsXG4gICAgICByZXZlcnNlOiAnYWZ0ZXJCZWdpbidcbiAgICB9O1xuXG4gICAgdGhpcy5ub3RpZnlUeXBlcyA9IHtcbiAgICAgIGVycm9yOiAnbm90aWZ5X19lcnJvcicsXG4gICAgICB3YXJuaW5nOiAnbm90aWZ5X193YXJuaW5nJyxcbiAgICAgIHN1Y2Nlc3M6ICdub3RpZnlfX3N1Y2Nlc3MnLFxuICAgICAgZGVmYXVsdDogJ25vdGlmeV9fZGVmYXVsdCdcbiAgICB9O1xuXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBsZXQgY2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcblxuICAgICAgaWYgKGNsYXNzZXMuY29udGFpbnMoJ25vdGlmeV9fY2xvc2UnKSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xuICAgICAgICB0aGlzLmNsb3NlKCcjJyArIGUudGFyZ2V0LnBhcmVudE5vZGUuaWQpO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubm90aWZ5TGlzdCkuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ub3RpZnlMaXN0W2VdLnRpbWVvdXQpO1xuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZnlMaXN0W2l0ZW1dLnRpbWVvdXQgPSB0aGlzLnNldENsb3NpbmdEZWxheShpdGVtLCB0aGlzLm5vdGlmeUxpc3RbaXRlbV0uY2xvc2luZ0RlbGF5KTtcbiAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCBlbGVtZW50XG4gICAqIEBwYXJhbSAge3N0cmluZ3xvYmplY3R9IGFyZyBnZXQgZWxlbWVudCBzZWxlY3RvclxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqL1xuICBnZXRFbChhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyA9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBzZXQgZGVsYXkgZm9yIGNsb3Npbmcgbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtICAgICAgICAgc2VsZWN0b3Igb2Ygbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjbG9zaW5nRGVsYXkgZGVsYXlcbiAgICovXG4gIHNldENsb3NpbmdEZWxheShpdGVtLCBjbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NpbmdEZWxheSkge1xuICAgIGlmIChjbG9zaW5nRGVsYXkpIHtcbiAgICAgIGxldCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoaXRlbSk7XG4gICAgICB9LCBjbG9zaW5nRGVsYXkpO1xuXG4gICAgICByZXR1cm4gdGltZW91dDtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBhZGQgbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0ICAgIG5vdGlmaWNhdGlvbiB0ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnNcbiAgICovXG4gIGFkZChvcHRpb25zID0ge30pIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICBsZXQgaSA9ICsrdGhpcy5pdGVtc0NvdW50ZXI7XG4gICAgbGV0IHt0aXRsZSwgY29udGVudCwgY2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zaW5nRGVsYXksIHR5cGUgPSAnZGVmYXVsdCd9ID0gb3B0aW9ucztcblxuICAgIHRpdGxlID0gIXRpdGxlID8gJycgOiBgPGRpdiBjbGFzcz1cIm5vdGlmeV9fdGl0bGVcIj4ke3RpdGxlfTwvZGl2PmA7XG4gICAgY29udGVudCA9ICFjb250ZW50IHx8IFxuICAgICAgICAgICAgICB0eXBlb2YgY29udGVudCA9PSAnb2JqZWN0JyA/ICcnIDogYDxkaXYgY2xhc3M9XCJub3RpZnlfX2NvbnRlbnRcIj4ke2NvbnRlbnR9PC9kaXY+YDtcblxuICAgIHRoaXMuZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKHRoaXMub3JkZXJDb25maWdbdGhpcy5vcmRlcl0sXG4gICAgICBgPGRpdiBjbGFzcz1cIm5vdGlmeV9faXRlbSAke3RoaXMubm90aWZ5VHlwZXNbdHlwZV19XCIgaWQ9XCJub3RpZnlfJHtpfVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZnlfX2Nsb3NlXCI+w5c8L2Rpdj5cbiAgICAgICAgICAke3RpdGxlfVxuICAgICAgICAgICR7Y29udGVudH1cbiAgICAgIDwvZGl2PmApO1xuICAgIHRpbWVvdXQgPSB0aGlzLnNldENsb3NpbmdEZWxheShgI25vdGlmeV8ke2l9YCwgY2xvc2luZ0RlbGF5KTtcbiAgICB0aGlzLm5vdGlmeUxpc3RbYCNub3RpZnlfJHtpfWBdID0ge3RpbWVvdXQsIGNsb3NpbmdEZWxheX07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGNsb3NlIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsIHNlbGVjdG9yXG4gICAqL1xuICBjbG9zZShzZWwpIHtcbiAgICBsZXQgZWwgPSB0aGlzLmdldEVsKHNlbCk7XG5cbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdub3RpZnktLWNsb3NpbmcnKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubm90aWZ5TGlzdFtzZWxdKSB7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlQ2hpbGQoZWwpO1xuXG4gICAgICAgIGlmICh0aGlzLm5vdGlmeUxpc3Rbc2VsXS50aW1lb3V0KSB7IFxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5vdGlmeUxpc3Rbc2VsXS50aW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSB0aGlzLm5vdGlmeUxpc3Rbc2VsXTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXRlbXNDb3VudGVyID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRoaXMucmVtb3ZpbmdEZWxheSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGNsb3NlIGFsbCBub3RpZmljYXRpb25cbiAgICovXG4gIGNsb3NlQWxsKCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBsZXQgaXRlbXMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RpZnlfX2l0ZW0nKTtcblxuICAgIEFycmF5LmZyb20oaXRlbXMpLmZvckVhY2goIGl0ZW0gPT4gc2VsZi5jbG9zZSgnIycgKyBpdGVtLmlkKSApO1xuICB9XG5cblxuICAvKipcbiAgICogY2xvc2UgZmlyc3Qgbm90aWZpY2F0aW9uXG4gICAqL1xuICBjbG9zZUZpcnN0KCkge1xuICAgIGxldCBpdGVtID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCc6Zmlyc3QtY2hpbGQnKTtcblxuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLmNsb3NlKCcjJyArIGl0ZW0uaWQpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIGNsb3NlIGxhc3Qgbm90b2ZpY2F0aW9uXG4gICAqL1xuICBjbG9zZUxhc3QoKSB7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5ub3RpZnlfX2l0ZW06bGFzdC1jaGlsZCcpO1xuXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHRoaXMuY2xvc2UoJyMnICsgaXRlbS5pZCk7XG4gICAgfVxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9