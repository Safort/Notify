/* Notify v0.2.0 */

class Notify {
  constructor(selector, options = {}) {
    this.el = this.getEl(selector);
    this.order = options.order || 'default';
    this.closingDelay = parseInt(options.closingDelay) || 0;
    this.removingDelay = parseInt(options.removingDelay) || 3000;

    this.itemsCounter = 0;
    this.notifyList = {};

    this.orderConfig = {
      default: 'beforeEnd',
      reverse: 'afterBegin'
    };

    this.notifyTypes = {
      error: 'notify__error',
      warning: 'notify__warning',
      success: 'notify__success',
      default: 'notify__default'
    };

    this.el.addEventListener('click', (e) => {
      var classes = e.target.classList;
      if (classes.contains('notify__close')) {
        this.close('#' + e.target.parentNode.id);
      }
    }, false);

    this.el.addEventListener('mouseover', (e) => {
      Object.keys(this.notifyList).forEach((e) => {
        clearTimeout(this.notifyList[e].timeout);
      });
    }, true);

    this.el.addEventListener('mouseout', (e) => {
      Object.keys(this.notifyList).forEach((item) => {
        this.notifyList[item].timeout = this.setClosingDelay(item);
      });
    }, true);
  }


  getEl(arg) {
    if (typeof arg == 'string') {
      return document.querySelector(arg);
    } else {
      return arg;
    }
  }

  setClosingDelay(item, closingDelay = this.closingDelay) {
    if (this.closingDelay) {
      var timeout = setTimeout(() => {
        this.close(item);
      }, this.closingDelay);

      return timeout;
    }
  }


  add(text, options = {}) {
    var that = this;
    var timeout;
    var i = ++this.itemsCounter;
    var link = this.el.querySelector(`#notify_${i}`);
    var itemClasses = 'notify__item';

    if (options.type) {
      itemClasses += " " + this.notifyTypes[options.type];
    } else {
      itemClasses += " " + this.notifyTypes['default'];
    }

    this.el.insertAdjacentHTML(this.orderConfig[this.order],
      `<div class="${itemClasses}" id="notify_${i}">
          <div class="notify__close">×</div>
          <div class="notify__content">${text}</div>
      </div>`);
    timeout = this.setClosingDelay(`#notify_${i}`, options.closingDelay || this.closingDelay);
    that.notifyList[`#notify_${i}`] = {timeout, link};

    return this;
  }


  close(sel) {
    var el = this.getEl(sel);

    el.classList.add('notify--closing');

    setTimeout(() => {
      if (this.notifyList[sel]) {
        this.el.removeChild(el);

        if (this.notifyList[sel].timeout) { 
          clearTimeout(this.notifyList[sel].timeout);
        }

        delete this.notifyList[sel];

        if (Object.keys(this.notifyList).length == 0) {
          this.itemsCounter = 0;
        }
      }
    }, this.removingDelay);

    return this;
  }


  closeAll() {
    var self = this;
    var items = this.el.querySelectorAll('.notify__item');

    Array.prototype.forEach.call(items, (item) => {
      self.close('#' + item.id);
    });
  }
}