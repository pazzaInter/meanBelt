const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  bucketItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BucketItem'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);