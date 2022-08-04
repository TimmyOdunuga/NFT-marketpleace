const { Schema } = require('mongoose')

const UserSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Guest User',
    },
    url: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    facebook: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    background: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    permission: {
      type: String,
      default: 'basic',
    },
    sold: {
      type: Number,
      default: 0,
    },
    following: {
      type: Array,
      default: [],
    },
    cookies: {
      type: Array,
      default: [],
    },
    hearted: {
      type: Array,
      default: [],
    },
    lastLoggedIn: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

UserSchema.methods.addFollowing = function (userId) {
  this.following = [...this.following, userId]
  this.markModified('following')
}

UserSchema.methods.removeFollowing = function (userId) {
  this.following = this.following.filter((id) => id !== userId)
  this.markModified('following')
}

module.exports = UserSchema
