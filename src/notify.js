/* Notify v0.1.1 */

class Notify {
  constructor(selector, options) {
    this.el = this.getEl(selector);
    this.order = options.order || 'default';
    this.closingDelay = parseInt(options.closingDelay) || 0;
    this.removingDelay = parseInt(options.removingDelay) || 3000;

    this.itemsCounter = 0;
    this.notifyList = {};

    this.orderConfig = {
      'default': 'beforeEnd',
      'reverse': 'afterBegin'
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

  setClosingDelay(item) {
    if (this.closingDelay) {
      var timeout = setTimeout(() => {
        this.close(item);
      }, this.closingDelay);

      return timeout;
    }
  }


  add(text) {
    var that = this;
    var timeout;
    var i = ++this.itemsCounter;
    var link = this.el.querySelector(`#notify_${i}`);
    this.el.insertAdjacentHTML(this.orderConfig[this.order],
      `<div class="notify__item" id="notify_${i}">
          <div class="notify__close">×</div>
          <div class="notify__content">${text}</div>
      </div>`);
    timeout = this.setClosingDelay(`#notify_${i}`);
    that.notifyList[`#notify_${i}`] = {timeout, link};

    return this;
  }


  close(sel) {
    var el = this.getEl(sel);
    el.classList.add('notify--closing');

    setTimeout(() => {
      this.el.removeChild(el);
      if (this.notifyList[sel].timeout) { 
        clearTimeout(this.notifyList[sel].timeout);
      }
      delete this.notifyList[sel];
      if (Object.keys(this.notifyList).length == 0) {
        this.itemsCounter = 0;
      }
    }, this.removingDelay);

    return this;
  }

}