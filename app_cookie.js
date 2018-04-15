var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('dkssudgktpdy'));
app.get('/count', (req, res) => {
  var count = req.signedCookies.count ? parseInt(req.signedCookies.count) + 1 : 1;
  res.cookie('count', count, {signed: true});
  res.send('Count : ' + count);
});

var products = {
  1:{title:'The history of web1'},
  2:{title:'the next web'}
};
app.get('/products', (req, res) => {
  var output = `<h1>Products</h1><ul>`;
  for (var name in products) {
    output += `
      <li>
        <a href="/cart/${name}">${products[name].title}</a>
      </li>
    `;
  }
  output += `</ul><a href="/cart">Cart list</a>`;
  res.send(output);
});

app.get('/cart', (req, res) => {
  var cart = req.signedCookies.cart ? req.signedCookies.cart : {};
  var output = `<h1>Cart</h1><ul>`;
  for (var id in cart) {
    output += `
      <li>
        ${products[id].title} (${cart[id]})
      </li>
    `;
  }
  output += `</ul><a href="/products">Products list</a>`;
  res.send(output);
});

app.get('/cart/:id', (req, res) => {
  var id = req.params.id;
  var cart = req.signedCookies.cart ? req.signedCookies.cart : {};
  cart[id] = cart[id] ? parseInt(cart[id]) + 1 : 1;
  res.cookie('cart', cart, {signed: true});
  console.log(cart);
  res.send('Hi '+id);
});

app.listen(3003, () => {
  console.log('Connected 3003 port!!!');
});
