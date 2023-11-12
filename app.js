const express = require('express');
const app = express();
const CustomerRoute = require(__dirname+'/routes/CustomerRoute.js');
const ItemRoute = require(__dirname+'/routes/ItemRoute.js');
const OrderRoute = require(__dirname+'/routes/OrderRoute.js');
const IndexRoute = require(__dirname+'/routes/IndexRoute.js');


app.use(express.static('public'));

//CustomerRoute
app.use(CustomerRoute);
//ItemRoute
app.use(ItemRoute);
//OrderRoute
app.use(OrderRoute);
//IndexRoute
app.use(IndexRoute);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html');
})
app.listen(8080, () => {
    console.log(`Server Started At http://localhost:${8080}`);
})