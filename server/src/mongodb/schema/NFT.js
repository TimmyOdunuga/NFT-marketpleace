const { Schema } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

const CommentSchema = new Schema(
  {
    owner: {
      type: UserSchema,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

const NFTSchema = new Schema(
  {
    owner: {
      type: UserSchema,
      required: true,
    },
    creator: {
      type: UserSchema,
      default: null,
    },
    nftId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    data: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: 1,
    },
    priceType: {
      type: String,
      default: 'ETH',
    },
    price: {
      type: Number,
      default: 0,
    },
    categories: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: 'initialized',
    },
    history: {
      type: Array,
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

NFTSchema.methods.addComment = function (comment) {
  this.comments = [...this.comments, comment]
  this.markModified('comments')
}

NFTSchema.methods.removeComment = function (commentId) {
  this.comments = this.comments.filter((comment) => comment._id !== commentId)
  this.markModified('comments')
}

NFTSchema.plugin(mongoosePaginate)

module.exports = NFTSchema
