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

        var cb = arguments[1] === undefined ? null : arguments[1];

        var el = this.getEl(sel);

        el.classList.add("notify--closing");

        setTimeout(function () {
          if (_this.notifyList[sel]) {
            _this.el.removeChild(el);

            if (_this.notifyList[sel].timeout) {
              clearTimeout(_this.notifyList[sel].timeout);
            }

            delete _this.notifyList[sel];

            _this.itemsCounter = Object.keys(_this.notifyList).length;

            if (cb) {
              cb();
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

      value: function closeAll(cb) {
        var self = this;
        var items = this.el.querySelectorAll(".notify__item");

        Array.from(items).forEach(function (item, i, arr) {
          if (arr.length - i == 1) {
            self.close("#" + item.id, cb);
          } else {
            self.close("#" + item.id);
          }
        });
      },
      writable: true,
      configurable: true
    },
    closeFirst: {

      /**
       * close first notification
       */

      value: function closeFirst(cb) {
        var item = this.el.querySelector(":first-child");

        if (item) {
          this.close("#" + item.id, cb);
        }
      },
      writable: true,
      configurable: true
    },
    closeLast: {

      /**
       * close last notofication
       */

      value: function closeLast(cb) {
        var item = this.el.querySelector(".notify__item:last-child");

        if (item) {
          this.close("#" + item.id, cb);
        }
      },
      writable: true,
      configurable: true
    }
  });

  return Notify;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFDTSxNQUFNOzs7Ozs7Ozs7QUFRQyxXQVJQLE1BQU0sQ0FRRSxRQUFROzs7UUFBRSxPQUFPLGdDQUFHLEVBQUU7OzBCQVI5QixNQUFNOztBQVNSLFFBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixRQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsUUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQzs7QUFFN0QsUUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDdEIsUUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLFFBQUksQ0FBQyxXQUFXLEdBQUc7QUFDakIsaUJBQVMsV0FBVztBQUNwQixhQUFPLEVBQUUsWUFBWTtLQUN0QixDQUFDOztBQUVGLFFBQUksQ0FBQyxXQUFXLEdBQUc7QUFDakIsV0FBSyxFQUFFLGVBQWU7QUFDdEIsYUFBTyxFQUFFLGlCQUFpQjtBQUMxQixhQUFPLEVBQUUsaUJBQWlCO0FBQzFCLGlCQUFTLGlCQUFpQjtLQUMzQixDQUFDOztBQUVGLFFBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3JDLFVBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDOztBQUVqQyxVQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7O0FBRXJDLGNBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUMxQztLQUNGLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRVYsUUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQSxDQUFDLEVBQUk7QUFDekMsWUFBTSxDQUFDLElBQUksQ0FBQyxNQUFLLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUN4QyxvQkFBWSxDQUFDLE1BQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQzFDLENBQUMsQ0FBQztLQUNKLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRVYsUUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLEVBQUk7QUFDeEMsWUFBTSxDQUFDLElBQUksQ0FBQyxNQUFLLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUMzQyxjQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsTUFBSyxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQUssVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO09BQ2hHLENBQUMsQ0FBQztLQUNKLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDWDs7dUJBakRHLE1BQU07QUF5RFYsU0FBSzs7Ozs7Ozs7YUFBQSxlQUFDLEdBQUcsRUFBRTtBQUNULFlBQUksT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFO0FBQzFCLGlCQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEMsTUFBTTtBQUNMLGlCQUFPLEdBQUcsQ0FBQztTQUNaO09BQ0Y7Ozs7QUFRRCxtQkFBZTs7Ozs7Ozs7YUFBQSx5QkFBQyxJQUFJLEVBQW9DOzs7WUFBbEMsWUFBWSxnQ0FBRyxJQUFJLENBQUMsWUFBWTs7QUFDcEQsWUFBSSxZQUFZLEVBQUU7QUFDaEIsY0FBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQU07QUFDN0Isa0JBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQ2xCLEVBQUUsWUFBWSxDQUFDLENBQUM7O0FBRWpCLGlCQUFPLE9BQU8sQ0FBQztTQUNoQjtPQUNGOzs7O0FBUUQsT0FBRzs7Ozs7Ozs7YUFBQSxlQUFlO1lBQWQsT0FBTyxnQ0FBRyxFQUFFOztBQUNkLFlBQUksT0FBTyxZQUFBLENBQUM7QUFDWixZQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDdkIsS0FBSyxHQUFpRSxPQUFPLENBQTdFLEtBQUs7WUFBRSxPQUFPLEdBQXdELE9BQU8sQ0FBdEUsT0FBTztvQ0FBd0QsT0FBTyxDQUE3RCxZQUFZO1lBQVosWUFBWSx5Q0FBRyxJQUFJLENBQUMsWUFBWTs0QkFBc0IsT0FBTyxDQUEzQixJQUFJO1lBQUosSUFBSSxpQ0FBRyxTQUFTOztBQUV2RSxhQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxxQ0FBaUMsS0FBSyxXQUFRLENBQUM7QUFDbEUsZUFBTyxHQUFHLENBQUMsT0FBTyxJQUNSLE9BQU8sT0FBTyxJQUFJLFFBQVEsR0FBRyxFQUFFLHVDQUFtQyxPQUFPLFdBQVEsQ0FBQzs7QUFFNUYsWUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUNBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUFnQixDQUFDLHVFQUU3RCxLQUFLLG9CQUNMLE9BQU8sb0JBQ0wsQ0FBQztBQUNYLGVBQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxjQUFZLENBQUMsRUFBSSxZQUFZLENBQUMsQ0FBQztBQUM3RCxZQUFJLENBQUMsVUFBVSxjQUFZLENBQUMsQ0FBRyxHQUFHLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBRSxZQUFZLEVBQVosWUFBWSxFQUFDLENBQUM7O0FBRTFELGVBQU8sSUFBSSxDQUFDO09BQ2I7Ozs7QUFPRCxTQUFLOzs7Ozs7O2FBQUEsZUFBQyxHQUFHLEVBQWE7OztZQUFYLEVBQUUsZ0NBQUcsSUFBSTs7QUFDbEIsWUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFekIsVUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7QUFFcEMsa0JBQVUsQ0FBQyxZQUFNO0FBQ2YsY0FBSSxNQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN4QixrQkFBSyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUV4QixnQkFBSSxNQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUU7QUFDaEMsMEJBQVksQ0FBQyxNQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1Qzs7QUFFRCxtQkFBTyxNQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFNUIsa0JBQUssWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBSyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUM7O0FBRXhELGdCQUFJLEVBQUUsRUFBRTtBQUNOLGdCQUFFLEVBQUUsQ0FBQzthQUNOO1dBQ0Y7U0FDRixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFdkIsZUFBTyxJQUFJLENBQUM7T0FDYjs7OztBQU1ELFlBQVE7Ozs7OzthQUFBLGtCQUFDLEVBQUUsRUFBRTtBQUNYLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixZQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUV0RCxhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFLO0FBQzFDLGNBQUksQUFBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSyxDQUFDLEVBQUU7QUFDekIsZ0JBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7V0FDL0IsTUFBTTtBQUNMLGdCQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7V0FDM0I7U0FDRixDQUFDLENBQUM7T0FDSjs7OztBQU1ELGNBQVU7Ozs7OzthQUFBLG9CQUFDLEVBQUUsRUFBRTtBQUNiLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUVqRCxZQUFJLElBQUksRUFBRTtBQUNSLGNBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDL0I7T0FDRjs7OztBQU1ELGFBQVM7Ozs7OzthQUFBLG1CQUFDLEVBQUUsRUFBRTtBQUNaLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7O0FBRTdELFlBQUksSUFBSSxFQUFFO0FBQ1IsY0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMvQjtPQUNGOzs7Ozs7U0FsTEcsTUFBTSIsImZpbGUiOiJub3RpZnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNsYXNzIE5vdGlmeSB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAdGhpcyB7U3RlZXJlcn1cbiAgICogQHBhcmFtICB7c3RyaW5nfSBzZWxlY3RvciBlbGVtZW50IHNlbGVjdG9yXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyAgb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZWwgPSB0aGlzLmdldEVsKHNlbGVjdG9yKTtcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCAnZGVmYXVsdCc7XG4gICAgdGhpcy5jbG9zaW5nRGVsYXkgPSBwYXJzZUludChvcHRpb25zLmNsb3NpbmdEZWxheSkgfHwgMDtcbiAgICB0aGlzLnJlbW92aW5nRGVsYXkgPSBwYXJzZUludChvcHRpb25zLnJlbW92aW5nRGVsYXkpIHx8IDMwMDA7XG5cbiAgICB0aGlzLml0ZW1zQ291bnRlciA9IDA7XG4gICAgdGhpcy5ub3RpZnlMaXN0ID0ge307XG5cbiAgICB0aGlzLm9yZGVyQ29uZmlnID0ge1xuICAgICAgZGVmYXVsdDogJ2JlZm9yZUVuZCcsXG4gICAgICByZXZlcnNlOiAnYWZ0ZXJCZWdpbidcbiAgICB9O1xuXG4gICAgdGhpcy5ub3RpZnlUeXBlcyA9IHtcbiAgICAgIGVycm9yOiAnbm90aWZ5X19lcnJvcicsXG4gICAgICB3YXJuaW5nOiAnbm90aWZ5X193YXJuaW5nJyxcbiAgICAgIHN1Y2Nlc3M6ICdub3RpZnlfX3N1Y2Nlc3MnLFxuICAgICAgZGVmYXVsdDogJ25vdGlmeV9fZGVmYXVsdCdcbiAgICB9O1xuXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgbGV0IGNsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XG5cbiAgICAgIGlmIChjbGFzc2VzLmNvbnRhaW5zKCdub3RpZnlfX2Nsb3NlJykpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlKTtcbiAgICAgICAgdGhpcy5jbG9zZSgnIycgKyBlLnRhcmdldC5wYXJlbnROb2RlLmlkKTtcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGUgPT4ge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5mb3JFYWNoKGUgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ub3RpZnlMaXN0W2VdLnRpbWVvdXQpO1xuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGUgPT4ge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5ub3RpZnlMaXN0KS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICB0aGlzLm5vdGlmeUxpc3RbaXRlbV0udGltZW91dCA9IHRoaXMuc2V0Q2xvc2luZ0RlbGF5KGl0ZW0sIHRoaXMubm90aWZ5TGlzdFtpdGVtXS5jbG9zaW5nRGVsYXkpO1xuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IGVsZW1lbnRcbiAgICogQHBhcmFtICB7c3RyaW5nfG9iamVjdH0gYXJnIGdldCBlbGVtZW50IHNlbGVjdG9yXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIGdldEVsKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnID09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIHNldCBkZWxheSBmb3IgY2xvc2luZyBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gICAgICAgICBzZWxlY3RvciBvZiBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IGNsb3NpbmdEZWxheSBkZWxheVxuICAgKi9cbiAgc2V0Q2xvc2luZ0RlbGF5KGl0ZW0sIGNsb3NpbmdEZWxheSA9IHRoaXMuY2xvc2luZ0RlbGF5KSB7XG4gICAgaWYgKGNsb3NpbmdEZWxheSkge1xuICAgICAgbGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZShpdGVtKTtcbiAgICAgIH0sIGNsb3NpbmdEZWxheSk7XG5cbiAgICAgIHJldHVybiB0aW1lb3V0O1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIGFkZCBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgICAgbm90aWZpY2F0aW9uIHRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9uc1xuICAgKi9cbiAgYWRkKG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIGxldCBpID0gKyt0aGlzLml0ZW1zQ291bnRlcjtcbiAgICBsZXQge3RpdGxlLCBjb250ZW50LCBjbG9zaW5nRGVsYXkgPSB0aGlzLmNsb3NpbmdEZWxheSwgdHlwZSA9ICdkZWZhdWx0J30gPSBvcHRpb25zO1xuXG4gICAgdGl0bGUgPSAhdGl0bGUgPyAnJyA6IGA8ZGl2IGNsYXNzPVwibm90aWZ5X190aXRsZVwiPiR7dGl0bGV9PC9kaXY+YDtcbiAgICBjb250ZW50ID0gIWNvbnRlbnQgfHwgXG4gICAgICAgICAgICAgIHR5cGVvZiBjb250ZW50ID09ICdvYmplY3QnID8gJycgOiBgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY29udGVudFwiPiR7Y29udGVudH08L2Rpdj5gO1xuXG4gICAgdGhpcy5lbC5pbnNlcnRBZGphY2VudEhUTUwodGhpcy5vcmRlckNvbmZpZ1t0aGlzLm9yZGVyXSxcbiAgICAgIGA8ZGl2IGNsYXNzPVwibm90aWZ5X19pdGVtICR7dGhpcy5ub3RpZnlUeXBlc1t0eXBlXX1cIiBpZD1cIm5vdGlmeV8ke2l9XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY2xvc2VcIj7DlzwvZGl2PlxuICAgICAgICAgICR7dGl0bGV9XG4gICAgICAgICAgJHtjb250ZW50fVxuICAgICAgPC9kaXY+YCk7XG4gICAgdGltZW91dCA9IHRoaXMuc2V0Q2xvc2luZ0RlbGF5KGAjbm90aWZ5XyR7aX1gLCBjbG9zaW5nRGVsYXkpO1xuICAgIHRoaXMubm90aWZ5TGlzdFtgI25vdGlmeV8ke2l9YF0gPSB7dGltZW91dCwgY2xvc2luZ0RlbGF5fTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICAvKipcbiAgICogY2xvc2Ugbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWwgc2VsZWN0b3JcbiAgICovXG4gIGNsb3NlKHNlbCwgY2IgPSBudWxsKSB7XG4gICAgbGV0IGVsID0gdGhpcy5nZXRFbChzZWwpO1xuXG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnbm90aWZ5LS1jbG9zaW5nJyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLm5vdGlmeUxpc3Rbc2VsXSkge1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUNoaWxkKGVsKTtcblxuICAgICAgICBpZiAodGhpcy5ub3RpZnlMaXN0W3NlbF0udGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5vdGlmeUxpc3Rbc2VsXS50aW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSB0aGlzLm5vdGlmeUxpc3Rbc2VsXTtcblxuICAgICAgICB0aGlzLml0ZW1zQ291bnRlciA9IE9iamVjdC5rZXlzKHRoaXMubm90aWZ5TGlzdCkubGVuZ3RoO1xuXG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB0aGlzLnJlbW92aW5nRGVsYXkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBjbG9zZSBhbGwgbm90aWZpY2F0aW9uXG4gICAqL1xuICBjbG9zZUFsbChjYikge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBsZXQgaXRlbXMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RpZnlfX2l0ZW0nKTtcblxuICAgIEFycmF5LmZyb20oaXRlbXMpLmZvckVhY2goKGl0ZW0sIGksIGFycikgPT4ge1xuICAgICAgaWYgKChhcnIubGVuZ3RoIC0gaSkgPT0gMSkge1xuICAgICAgICBzZWxmLmNsb3NlKCcjJyArIGl0ZW0uaWQsIGNiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuY2xvc2UoJyMnICsgaXRlbS5pZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBjbG9zZSBmaXJzdCBub3RpZmljYXRpb25cbiAgICovXG4gIGNsb3NlRmlyc3QoY2IpIHtcbiAgICBsZXQgaXRlbSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignOmZpcnN0LWNoaWxkJyk7XG5cbiAgICBpZiAoaXRlbSkge1xuICAgICAgdGhpcy5jbG9zZSgnIycgKyBpdGVtLmlkLCBjYik7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogY2xvc2UgbGFzdCBub3RvZmljYXRpb25cbiAgICovXG4gIGNsb3NlTGFzdChjYikge1xuICAgIGxldCBpdGVtID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubm90aWZ5X19pdGVtOmxhc3QtY2hpbGQnKTtcblxuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLmNsb3NlKCcjJyArIGl0ZW0uaWQsIGNiKTtcbiAgICB9XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=