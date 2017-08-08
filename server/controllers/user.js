const User = require('mongoose').model('User');

module.exports = {
  login(request, response) {
    User.findOne({ name: request.body.name })
      .then(user => {
        if (!user) {
          console.log('we did not find the user so we are creating one')
          User.create(request.body)
            .then(user => {
              completeLogin(request, response, user);
              console.log('created new user and logging in')
            })
            .catch(error => {
              console.log(error);
              response.status(422).json(
              Object.keys(error.errors).map(key => error.errors[key].message)
              );
            });
        }
        else {
          completeLogin(request, response, user);
          console.log('found user and logging in')
        }
      })
      .catch(error => console.log(error));
  },
  logout(request, response) {
    request.session.destroy();

    response.clearCookie('userID');
    response.clearCookie('expiration');

    response.json(true);
  },
  show(request, response) {
    User.find()
      .then(users => response.json(users))
  },
  list(request, response) {
    console.log('attempting to return bucket list')
    User.findOne({_id: request.params.id})
      .populate({path:'bucketItems'})
      .exec(function(err, items) {
        console.log(items)
        response.json({bucketItems:items.bucketItems});
      });
  }
};

function completeLogin(request, response, user) {
  request.session.user = user.toObject();

  delete request.session.user.password;

  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 86400 * 1000);
  response.json(user);
}