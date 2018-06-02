module.exports = (api, Orders, Discounts, functions, _) => {
  api.post('/order/new', (req, res) => {
    if (req.body.discountCode) {
      Discounts.findOne({
        code: req.body.discountCode
      }).exec((err, discount) => {
        if (!discount) {
          return functions.jsonResponse(404, 'error', null, res, "Discount Code is Invalid", err);
        }
        const order = {
          status: 'open',
          order: req.body.food,
          orderId: functions.random(9),
          customer: req.body.customer,
          discount: discount,
          total: req.body.total,
        };

        functions.QRCode.toDataURL(`https://order-us.herokuapp.com/order/process/${order.orderId}`, function (err, url) {
          order.qr = url;
          new Orders(order).save();
          return functions.jsonResponse(200, 'success', order, res, `Order Placed Successfully with ${discount.value}% off`, err);
        })

      });
    } else {
      const order = {
        status: 'open',
        order: req.body.food,
        orderId: functions.random(9),
        customer: req.body.customer,
        total: req.body.total
      };
      functions.QRCode.toDataURL(`https://order-us.herokuapp.com/order/process/${order.orderId}`, function (err, url) {
        order.qr = url;
        new Orders(order).save();
        return functions.jsonResponse(200, 'success', order, res, `Order Placed Successfully`, err);
      })
    }
  });

  api.get('/order/all', (req, res) => {

    Orders.find({isDeleted:false}).exec((err, order) => {
      if (_.isEmpty(order)) {
        return functions.jsonResponse(404, 'error', null, res, "No Orders Placed Yet", err);
      }
      return functions.jsonResponse(200, 'success', order, res, `Order Retrieved Successfully`, err);
    })
  });

  api.get('/order/:id', (req, res) => {
    Orders.findOne({
      orderId: req.params.id
    }).exec((err, order) => {
      if (!order) {
        return functions.jsonResponse(404, 'error', null, res, "Order doesnt exist", err);
      }
      return functions.jsonResponse(200, 'success', order, res, `Order Retrieved Successfully`, err);
    })
  });


  api.put('/order/process/:id', (req, res) => {

    Orders.findOne({
      orderId: req.params.id
    }).exec((err, order) => {

      if (!order) {
        return functions.jsonResponse(404, 'error', null, res, "Order doesnt exist", err);
      } else {
        order.tableNo = req.body.tableNo;
        order.status = req.body.status
        Orders(order).save();
        return functions.jsonResponse(200, 'success', order, res, `Order Processed with Table No Successfully`);
      }
    })
  })

  api.put('/order/done/:id', (req, res) => {
    Orders.findOne({
      orderId: req.params.id
    }).exec((err, order) => {
      if (!order) {
        return functions.jsonResponse(404, 'error', null, res, "Order doesnt exist", err);
      } else {
        order.isDeleted = true
        Orders(order).save();
        return functions.jsonResponse(200, 'success', order, res, `Order Has Been Completed Successfully`);
      }
    })
  })


  api.get('/order/customer/:token', (req, res) => {
    Orders.find({
      'customer.token': req.params.token
    }).exec((err, orders) => {
      if (_.isEmpty(orders)) {
        return functions.jsonResponse(404, 'error', null, res, `No Orders placed yet`, err);
      }
      const pickedOrder = orders.map(order => {
        return _.pick(order, ['order', 'status', 'orderId', 'customer', 'discount', 'total', 'createdAt']);
      })
      return functions.jsonResponse(200, 'success', pickedOrder, res, 'Customer Orders Retrieved Successfully', err);
    })
  })

}
