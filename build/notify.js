"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/* Notify v0.3.0 */

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
//# sourceMappingURL=data:application/json;base64,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QWEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFakQsWUFBSSxJQUFJLEVBQUU7QUFDUixjQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7T0FDRjs7OztBQU1ELGFBQVM7Ozs7OzthQUFBLHFCQUFHO0FBQ1YsWUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7QUFFN0QsWUFBSSxJQUFJLEVBQUU7QUFDUixjQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7T0FDRjs7Ozs7O1NBNUtHLE1BQU0iLCJmaWxlIjoibm90aWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogTm90aWZ5IHYwLjMuMCAqL1xyXG5cclxuY2xhc3MgTm90aWZ5IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICogQHRoaXMge1N0ZWVyZXJ9XHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzZWxlY3RvciBlbGVtZW50IHNlbGVjdG9yXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zICBvcHRpb25zXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5lbCA9IHRoaXMuZ2V0RWwoc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5vcmRlciA9IG9wdGlvbnMub3JkZXIgfHwgJ2RlZmF1bHQnO1xyXG4gICAgdGhpcy5jbG9zaW5nRGVsYXkgPSBwYXJzZUludChvcHRpb25zLmNsb3NpbmdEZWxheSkgfHwgMDtcclxuICAgIHRoaXMucmVtb3ZpbmdEZWxheSA9IHBhcnNlSW50KG9wdGlvbnMucmVtb3ZpbmdEZWxheSkgfHwgMzAwMDtcclxuXHJcbiAgICB0aGlzLml0ZW1zQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLm5vdGlmeUxpc3QgPSB7fTtcclxuXHJcbiAgICB0aGlzLm9yZGVyQ29uZmlnID0ge1xyXG4gICAgICBkZWZhdWx0OiAnYmVmb3JlRW5kJyxcclxuICAgICAgcmV2ZXJzZTogJ2FmdGVyQmVnaW4nXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubm90aWZ5VHlwZXMgPSB7XHJcbiAgICAgIGVycm9yOiAnbm90aWZ5X19lcnJvcicsXHJcbiAgICAgIHdhcm5pbmc6ICdub3RpZnlfX3dhcm5pbmcnLFxyXG4gICAgICBzdWNjZXNzOiAnbm90aWZ5X19zdWNjZXNzJyxcclxuICAgICAgZGVmYXVsdDogJ25vdGlmeV9fZGVmYXVsdCdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGxldCBjbGFzc2VzID0gZS50YXJnZXQuY2xhc3NMaXN0O1xyXG5cclxuICAgICAgaWYgKGNsYXNzZXMuY29udGFpbnMoJ25vdGlmeV9fY2xvc2UnKSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSk7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgnIycgKyBlLnRhcmdldC5wYXJlbnROb2RlLmlkKTtcclxuICAgICAgfVxyXG4gICAgfSwgZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubm90aWZ5TGlzdFtlXS50aW1lb3V0KTtcclxuICAgICAgfSk7XHJcbiAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubm90aWZ5TGlzdCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHRoaXMubm90aWZ5TGlzdFtpdGVtXS50aW1lb3V0ID0gdGhpcy5zZXRDbG9zaW5nRGVsYXkoaXRlbSwgdGhpcy5ub3RpZnlMaXN0W2l0ZW1dLmNsb3NpbmdEZWxheSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBlbGVtZW50XHJcbiAgICogQHBhcmFtICB7c3RyaW5nfG9iamVjdH0gYXJnIGdldCBlbGVtZW50IHNlbGVjdG9yXHJcbiAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAqL1xyXG4gIGdldEVsKGFyZykge1xyXG4gICAgaWYgKHR5cGVvZiBhcmcgPT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXJnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhcmc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IGRlbGF5IGZvciBjbG9zaW5nIG5vdGlmaWNhdGlvblxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtICAgICAgICAgc2VsZWN0b3Igb2Ygbm90aWZpY2F0aW9uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNsb3NpbmdEZWxheSBkZWxheVxyXG4gICAqL1xyXG4gIHNldENsb3NpbmdEZWxheShpdGVtLCBjbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NpbmdEZWxheSkge1xyXG4gICAgaWYgKGNsb3NpbmdEZWxheSkge1xyXG4gICAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoaXRlbSk7XHJcbiAgICAgIH0sIGNsb3NpbmdEZWxheSk7XHJcblxyXG4gICAgICByZXR1cm4gdGltZW91dDtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBhZGQgbm90aWZpY2F0aW9uXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgICAgbm90aWZpY2F0aW9uIHRleHRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zXHJcbiAgICovXHJcbiAgYWRkKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgbGV0IHRpbWVvdXQ7XHJcbiAgICBsZXQgaSA9ICsrdGhpcy5pdGVtc0NvdW50ZXI7XHJcbiAgICBsZXQge3RpdGxlLCBjb250ZW50LCBjbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NpbmdEZWxheSwgdHlwZSA9ICdkZWZhdWx0J30gPSBvcHRpb25zO1xyXG5cclxuICAgIHRpdGxlID0gIXRpdGxlID8gJycgOiBgPGRpdiBjbGFzcz1cIm5vdGlmeV9fdGl0bGVcIj4ke3RpdGxlfTwvZGl2PmA7XHJcbiAgICBjb250ZW50ID0gIWNvbnRlbnQgfHwgXHJcbiAgICAgICAgICAgICAgdHlwZW9mIGNvbnRlbnQgPT0gJ29iamVjdCcgPyAnJyA6IGA8ZGl2IGNsYXNzPVwibm90aWZ5X19jb250ZW50XCI+JHtjb250ZW50fTwvZGl2PmA7XHJcblxyXG4gICAgdGhpcy5lbC5pbnNlcnRBZGphY2VudEhUTUwodGhpcy5vcmRlckNvbmZpZ1t0aGlzLm9yZGVyXSxcclxuICAgICAgYDxkaXYgY2xhc3M9XCJub3RpZnlfX2l0ZW0gJHt0aGlzLm5vdGlmeVR5cGVzW3R5cGVdfVwiIGlkPVwibm90aWZ5XyR7aX1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZnlfX2Nsb3NlXCI+w5c8L2Rpdj5cclxuICAgICAgICAgICR7dGl0bGV9XHJcbiAgICAgICAgICAke2NvbnRlbnR9XHJcbiAgICAgIDwvZGl2PmApO1xyXG4gICAgdGltZW91dCA9IHRoaXMuc2V0Q2xvc2luZ0RlbGF5KGAjbm90aWZ5XyR7aX1gLCBjbG9zaW5nRGVsYXkpO1xyXG4gICAgdGhpcy5ub3RpZnlMaXN0W2Ajbm90aWZ5XyR7aX1gXSA9IHt0aW1lb3V0LCBjbG9zaW5nRGVsYXl9O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGNsb3NlIG5vdGlmaWNhdGlvblxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWwgc2VsZWN0b3JcclxuICAgKi9cclxuICBjbG9zZShzZWwpIHtcclxuICAgIGxldCBlbCA9IHRoaXMuZ2V0RWwoc2VsKTtcclxuXHJcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdub3RpZnktLWNsb3NpbmcnKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubm90aWZ5TGlzdFtzZWxdKSB7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVDaGlsZChlbCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5vdGlmeUxpc3Rbc2VsXS50aW1lb3V0KSB7IFxyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubm90aWZ5TGlzdFtzZWxdLnRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIHRoaXMubm90aWZ5TGlzdFtzZWxdO1xyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5pdGVtc0NvdW50ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgdGhpcy5yZW1vdmluZ0RlbGF5KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBjbG9zZSBhbGwgbm90aWZpY2F0aW9uXHJcbiAgICovXHJcbiAgY2xvc2VBbGwoKSB7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQgaXRlbXMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RpZnlfX2l0ZW0nKTtcclxuXHJcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGl0ZW1zLCAoaXRlbSkgPT4ge1xyXG4gICAgICBzZWxmLmNsb3NlKCcjJyArIGl0ZW0uaWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogY2xvc2UgZmlyc3Qgbm90aWZpY2F0aW9uXHJcbiAgICovXHJcbiAgY2xvc2VGaXJzdCgpIHtcclxuICAgIGxldCBpdGVtID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCc6Zmlyc3QtY2hpbGQnKTtcclxuXHJcbiAgICBpZiAoaXRlbSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCcjJyArIGl0ZW0uaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGNsb3NlIGxhc3Qgbm90b2ZpY2F0aW9uXHJcbiAgICovXHJcbiAgY2xvc2VMYXN0KCkge1xyXG4gICAgbGV0IGl0ZW0gPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5ub3RpZnlfX2l0ZW06bGFzdC1jaGlsZCcpO1xyXG5cclxuICAgIGlmIChpdGVtKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoJyMnICsgaXRlbS5pZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9