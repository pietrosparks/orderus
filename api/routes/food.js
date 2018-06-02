module.exports = (api, Foods, functions, _) => {
  api.get('/food', (req, res) => {

    Foods.find({}).exec((err, food) => {
      if (_.isEmpty(food)) {
        return functions.jsonResponse(404, "error", null, res, "No Foods Available", err);
      }
      return functions.jsonResponse(200, "success", food, res, "Food Retrieved Successfully");
    })
  })

  api.post('/food', (req, res) => {
    if (req.body && req.body.name && req.body.type && req.body.price !== null) {
      const newFood = new Foods(req.body);
      newFood.save((err) => {
        if (err) {
          return functions.jsonResponse(500, "error", null, res, "There was an error", err);
        } else return functions.jsonResponse(200, "success", null, res, "Food Added Successfully", err);
      });
    } else return functions.jsonResponse(400, "error", null, res, "Invalid enteries", err);
  })
}
