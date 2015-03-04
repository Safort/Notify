"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/* Notify v0.3.1 */

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
//# sourceMappingURL=data:application/json;base64,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Y0FBYyxDQUFDLENBQUM7O0FBRWpELFlBQUksSUFBSSxFQUFFO0FBQ1IsY0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO09BQ0Y7Ozs7QUFNRCxhQUFTOzs7Ozs7YUFBQSxxQkFBRztBQUNWLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7O0FBRTdELFlBQUksSUFBSSxFQUFFO0FBQ1IsY0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO09BQ0Y7Ozs7OztTQTFLRyxNQUFNIiwiZmlsZSI6Im5vdGlmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIE5vdGlmeSB2MC4zLjEgKi9cblxuY2xhc3MgTm90aWZ5IHtcblxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEB0aGlzIHtTdGVlcmVyfVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHNlbGVjdG9yIGVsZW1lbnQgc2VsZWN0b3JcbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zICBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZ2V0RWwoc2VsZWN0b3IpO1xuICAgIHRoaXMub3JkZXIgPSBvcHRpb25zLm9yZGVyIHx8ICdkZWZhdWx0JztcbiAgICB0aGlzLmNsb3NpbmdEZWxheSA9IHBhcnNlSW50KG9wdGlvbnMuY2xvc2luZ0RlbGF5KSB8fCAwO1xuICAgIHRoaXMucmVtb3ZpbmdEZWxheSA9IHBhcnNlSW50KG9wdGlvbnMucmVtb3ZpbmdEZWxheSkgfHwgMzAwMDtcblxuICAgIHRoaXMuaXRlbXNDb3VudGVyID0gMDtcbiAgICB0aGlzLm5vdGlmeUxpc3QgPSB7fTtcblxuICAgIHRoaXMub3JkZXJDb25maWcgPSB7XG4gICAgICBkZWZhdWx0OiAnYmVmb3JlRW5kJyxcbiAgICAgIHJldmVyc2U6ICdhZnRlckJlZ2luJ1xuICAgIH07XG5cbiAgICB0aGlzLm5vdGlmeVR5cGVzID0ge1xuICAgICAgZXJyb3I6ICdub3RpZnlfX2Vycm9yJyxcbiAgICAgIHdhcm5pbmc6ICdub3RpZnlfX3dhcm5pbmcnLFxuICAgICAgc3VjY2VzczogJ25vdGlmeV9fc3VjY2VzcycsXG4gICAgICBkZWZhdWx0OiAnbm90aWZ5X19kZWZhdWx0J1xuICAgIH07XG5cbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGxldCBjbGFzc2VzID0gZS50YXJnZXQuY2xhc3NMaXN0O1xuXG4gICAgICBpZiAoY2xhc3Nlcy5jb250YWlucygnbm90aWZ5X19jbG9zZScpKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSk7XG4gICAgICAgIHRoaXMuY2xvc2UoJyMnICsgZS50YXJnZXQucGFyZW50Tm9kZS5pZCk7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5vdGlmeUxpc3RbZV0udGltZW91dCk7XG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubm90aWZ5TGlzdCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmeUxpc3RbaXRlbV0udGltZW91dCA9IHRoaXMuc2V0Q2xvc2luZ0RlbGF5KGl0ZW0sIHRoaXMubm90aWZ5TGlzdFtpdGVtXS5jbG9zaW5nRGVsYXkpO1xuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IGVsZW1lbnRcbiAgICogQHBhcmFtICB7c3RyaW5nfG9iamVjdH0gYXJnIGdldCBlbGVtZW50IHNlbGVjdG9yXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIGdldEVsKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnID09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIHNldCBkZWxheSBmb3IgY2xvc2luZyBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gICAgICAgICBzZWxlY3RvciBvZiBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IGNsb3NpbmdEZWxheSBkZWxheVxuICAgKi9cbiAgc2V0Q2xvc2luZ0RlbGF5KGl0ZW0sIGNsb3NpbmdEZWxheSA9IHRoaXMuY2xvc2luZ0RlbGF5KSB7XG4gICAgaWYgKGNsb3NpbmdEZWxheSkge1xuICAgICAgbGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZShpdGVtKTtcbiAgICAgIH0sIGNsb3NpbmdEZWxheSk7XG5cbiAgICAgIHJldHVybiB0aW1lb3V0O1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIGFkZCBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgICAgbm90aWZpY2F0aW9uIHRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9uc1xuICAgKi9cbiAgYWRkKG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIGxldCBpID0gKyt0aGlzLml0ZW1zQ291bnRlcjtcbiAgICBsZXQge3RpdGxlLCBjb250ZW50LCBjbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NpbmdEZWxheSwgdHlwZSA9ICdkZWZhdWx0J30gPSBvcHRpb25zO1xuXG4gICAgdGl0bGUgPSAhdGl0bGUgPyAnJyA6IGA8ZGl2IGNsYXNzPVwibm90aWZ5X190aXRsZVwiPiR7dGl0bGV9PC9kaXY+YDtcbiAgICBjb250ZW50ID0gIWNvbnRlbnQgfHwgXG4gICAgICAgICAgICAgIHR5cGVvZiBjb250ZW50ID09ICdvYmplY3QnID8gJycgOiBgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY29udGVudFwiPiR7Y29udGVudH08L2Rpdj5gO1xuXG4gICAgdGhpcy5lbC5pbnNlcnRBZGphY2VudEhUTUwodGhpcy5vcmRlckNvbmZpZ1t0aGlzLm9yZGVyXSxcbiAgICAgIGA8ZGl2IGNsYXNzPVwibm90aWZ5X19pdGVtICR7dGhpcy5ub3RpZnlUeXBlc1t0eXBlXX1cIiBpZD1cIm5vdGlmeV8ke2l9XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY2xvc2VcIj7DlzwvZGl2PlxuICAgICAgICAgICR7dGl0bGV9XG4gICAgICAgICAgJHtjb250ZW50fVxuICAgICAgPC9kaXY+YCk7XG4gICAgdGltZW91dCA9IHRoaXMuc2V0Q2xvc2luZ0RlbGF5KGAjbm90aWZ5XyR7aX1gLCBjbG9zaW5nRGVsYXkpO1xuICAgIHRoaXMubm90aWZ5TGlzdFtgI25vdGlmeV8ke2l9YF0gPSB7dGltZW91dCwgY2xvc2luZ0RlbGF5fTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICAvKipcbiAgICogY2xvc2Ugbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWwgc2VsZWN0b3JcbiAgICovXG4gIGNsb3NlKHNlbCkge1xuICAgIGxldCBlbCA9IHRoaXMuZ2V0RWwoc2VsKTtcblxuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdGlmeS0tY2xvc2luZycpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ub3RpZnlMaXN0W3NlbF0pIHtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVDaGlsZChlbCk7XG5cbiAgICAgICAgaWYgKHRoaXMubm90aWZ5TGlzdFtzZWxdLnRpbWVvdXQpIHsgXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubm90aWZ5TGlzdFtzZWxdLnRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIHRoaXMubm90aWZ5TGlzdFtzZWxdO1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc0NvdW50ZXIgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgdGhpcy5yZW1vdmluZ0RlbGF5KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICAvKipcbiAgICogY2xvc2UgYWxsIG5vdGlmaWNhdGlvblxuICAgKi9cbiAgY2xvc2VBbGwoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBpdGVtcyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnLm5vdGlmeV9faXRlbScpO1xuXG4gICAgQXJyYXkuZnJvbShpdGVtcykuZm9yRWFjaCggaXRlbSA9PiBzZWxmLmNsb3NlKCcjJyArIGl0ZW0uaWQpICk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBjbG9zZSBmaXJzdCBub3RpZmljYXRpb25cbiAgICovXG4gIGNsb3NlRmlyc3QoKSB7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJzpmaXJzdC1jaGlsZCcpO1xuXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHRoaXMuY2xvc2UoJyMnICsgaXRlbS5pZCk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogY2xvc2UgbGFzdCBub3RvZmljYXRpb25cbiAgICovXG4gIGNsb3NlTGFzdCgpIHtcbiAgICBsZXQgaXRlbSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm5vdGlmeV9faXRlbTpsYXN0LWNoaWxkJyk7XG5cbiAgICBpZiAoaXRlbSkge1xuICAgICAgdGhpcy5jbG9zZSgnIycgKyBpdGVtLmlkKTtcbiAgICB9XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=