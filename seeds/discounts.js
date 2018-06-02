const random = require('random-id');

module.exports = [{
    "code": random(5).toLowerCase(),
    "value": '10',
    "created": Date.now()
  },
  {
    "code": random(5).toLowerCase(),
    "value": '15',
    "created": Date.now()
  }, {
    "code": random(5).toLowerCase(),
    "value": '20',
    "created": Date.now()
  }
];
