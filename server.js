const exp = require('express');
const app = exp();
const bp = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mong = require('mongoose');
const dirname = process.cwd();

//global middleware
app.use(bp.urlencoded({ extended: false }));

app.use('/', exp.static(path.join(dirname + '/view/public')))
dotenv.config({ path: './controller/config/.env' });

app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;


//DB Connection
mong.set('strictQuery', true);
mong.connect(process.env.dbconnection).then(() => console.log("Db Connected"))
    .catch((error) => console.log(error.message));

//router
app.use('/', require('./route/route'));

app.listen(port, () => {
    console.log("Listening to the port");
});