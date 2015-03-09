
class Notify {

  /**
   * @constructor
   * @this {Steerer}
   * @param  {string} selector element selector
   * @param  {Object} options  options
   */
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

    this.el.addEventListener('click', e => {
      let classes = e.target.classList;

      if (classes.contains('notify__close')) {
        // console.log(e.target.parentNode.parentNode);
        this.close('#' + e.target.parentNode.id);
      }
    }, false);

    this.el.addEventListener('mouseover', e => {
      Object.keys(this.notifyList).forEach(e => {
        clearTimeout(this.notifyList[e].timeout);
      });
    }, false);

    this.el.addEventListener('mouseout', e => {
      Object.keys(this.notifyList).forEach(item => {
        this.notifyList[item].timeout = this.setClosingDelay(item, this.notifyList[item].closingDelay);
      });
    }, false);
  }


  /**
   * get element
   * @param  {string|object} arg get element selector
   * @return {object}
   */
  getEl(arg) {
    if (typeof arg == 'string') {
      return document.querySelector(arg);
    } else {
      return arg;
    }
  }


  /**
   * set delay for closing notification
   * @param {string} item         selector of notification
   * @param {number} closingDelay delay
   */
  setClosingDelay(item, closingDelay = this.closingDelay) {
    if (closingDelay) {
      let timeout = setTimeout(() => {
        this.close(item);
      }, closingDelay);

      return timeout;
    }
  }


  /**
   * add notification
   * @param {string} text    notification text
   * @param {Object} options options
   */
  add(options = {}) {
    let timeout;
    let i = ++this.itemsCounter;
    let {title, content, closingDelay = this.closingDelay, type = 'default'} = options;

    title = !title ? '' : `<div class="notify__title">${title}</div>`;
    content = !content || 
              typeof content == 'object' ? '' : `<div class="notify__content">${content}</div>`;

    this.el.insertAdjacentHTML(this.orderConfig[this.order],
      `<div class="notify__item ${this.notifyTypes[type]}" id="notify_${i}">
          <div class="notify__close">×</div>
          ${title}
          ${content}
      </div>`);
    timeout = this.setClosingDelay(`#notify_${i}`, closingDelay);
    this.notifyList[`#notify_${i}`] = {timeout, closingDelay};

    return this;
  }


  /**
   * close notification
   * @param {string} sel selector
   */
  close(sel) {
    let el = this.getEl(sel);

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


  /**
   * close all notification
   */
  closeAll() {
    let self = this;
    let items = this.el.querySelectorAll('.notify__item');

    Array.from(items).forEach( item => self.close('#' + item.id) );
  }


  /**
   * close first notification
   */
  closeFirst() {
    let item = this.el.querySelector(':first-child');

    if (item) {
      this.close('#' + item.id);
    }
  }


  /**
   * close last notofication
   */
  closeLast() {
    let item = this.el.querySelector('.notify__item:last-child');

    if (item) {
      this.close('#' + item.id);
    }
  }
}