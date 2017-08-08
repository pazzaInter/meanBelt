const BucketItem = require('mongoose').model('BucketItem')
const User = require('mongoose').model('User')

module.exports = {
  index(request, response) {
    console.log('retrieving bucketItems');
    BucketItem.find({})
      .then(function (bucketItems){
        console.log(bucketItems);
        response.json(bucketItems);
      })
      .catch(function (errors){
        console.log(errors);
      })
  },
  create(request, response) {
    User.findById({_id: request.body.owner._id}, function (err, user){
      console.log(request.body.owner)
      const item = new BucketItem(request.body);
      console.log(`created new item: ${item}`);
      console.log(user)
      item.owner = user._id
      item.save()
        .then(function (item){
          user.bucketItems.push(item);
          user.save(function(err) {
            if (err) {
              console.log(err)
            }
            else {
              console.log(`saved ${item} and pushed into ${user}`);
              response.json(item);
            }
          })
        })
        .catch(function (errors){
          console.log(errors)
        })
    })
  },
  list(request, response) {
    console.log('did i make it here')
    BucketItem.find({taggedUser:request.params.id})
      .then(function (bucketItems){
        console.log('list of tagged',bucketItems);
        response.json(bucketItems);
      })
      .catch(function (errors){
        console.log(errors);
      })
  }

}
