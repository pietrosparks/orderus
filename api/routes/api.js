// const functions = require('../utils');
// const _ = require('lodash');
// const JWT = require('jsonwebtoken');
const secret= require ('../dbconfig/secrets');
const Foods = require('../models/foods');
const Orders = require('../models/orders');
const Discounts = require('../models/discounts');
const functions = require('../utils');
const _ = require('lodash');
const Promise = require('bluebird');

module.exports = (express)=>{

    const api = express.Router();

    require('./food')(api, Foods, functions, _);
    require('./order').default(api, Orders, Discounts,  functions, _);

    return api;
}