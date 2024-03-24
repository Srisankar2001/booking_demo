const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    seatNumber: {
        type: Number,
        required: true
    },
    seatOwner: {
        type: String,
        required: true
    },
}
)

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket