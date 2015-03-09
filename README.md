#Notify

Notify is a litle notification library.


###API

```js
var elem = document.querySelector('#notify'); //or only element selector '#notify'
var notify = new Notify(elem, {
  order: 'reverse',
  closingDelay: 5000, //delay before notification start closing
});

notify.add({
  title: 'title', // title text
  content: '', // content after title
  type: 'success' // notification type. You can choise default, success, warning or error
});
```


###TODO

  - Write tests
  - Add code comments
  - Add to NPM