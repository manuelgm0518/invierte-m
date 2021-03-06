const { Schema, model } = require('mongoose');

var BusinessSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: [true, 'Ingrese al dueño de la empresa'] },
    name: { type: String, required: [true, 'Ingrese el nombre de la empresa'] },
    location: { type: String, required: [true, 'Ingrese la ubicación de la empresa'] },
    imagesURL: [String],
    categories: [String],
    description: String,
    content: String,
    updates: [{
        date: { type: Date, default: Date },
        content: String
    }],
    lookingFor: [{ 
        name: String,
        description: String
    }],
    fundRaising: {
        type: {
            goal: { type: Number, default: 0.00 },
            collected: { type: Number, default: 0.00 },
            startDate: { type: Date, default: Date },
            finishDate: { type: Date, default: Date },
            investors: { type: Number, default: 0 }
        },
        required: false
    },
    registrationDate: { type: Date, default: Date.now }
}, { collection:'business' });

module.exports = model('Business', BusinessSchema);