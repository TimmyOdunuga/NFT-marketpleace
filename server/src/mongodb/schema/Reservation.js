const { Schema } = require('mongoose')

const ReservationSchema = new Schema(
  {
    eventId: {
        type: String,
        required: true,
    }, 
    reserveId: {
        type: String,
        required: true,
    },
    reservedBy: {
      type: Object,
      default: {},
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

module.exports = ReservationSchema
