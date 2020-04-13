const { Schema, model } = require('mongoose');

var ChatSchema = Schema({
    user1: {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Ingrese al usuario 1']},
        messages: {
            sent: { type: Date, default: Date.now },
            content: String
        }
    },
    user2: {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Ingrese al usuario 2']},
        messages: {
            sent: { type: Date, default: Date.now },
            content: String
        }
    }
});

module.exports = model('Message', ChatSchema);