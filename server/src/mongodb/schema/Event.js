const { Schema } = require('mongoose')

const EventSchema = new Schema(
  {
    eventId: {
        type: String,
        required: true,
    },
    date: {
      type: String,
      required: true,
    },
    permissions: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reservations: {
      type: Array,
      default: [],
    },
    requirement: {
      type: Array,
      default: [],
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

module.exports = EventSchema
