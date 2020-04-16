const { Schema, model } = require('mongoose');

var VacantSchema = new Schema({
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: [true, 'Ingrese la empresa de la vacante'] },
    name: { type: String, required: [true, 'Ingrese el nombre de la vacante' ]},
    description: String,
    monthlyPayment: { type: Number, default: 0.00 },
    categories: [String],
    requests:[{
        user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Ingrese al usuario']},
        fileURL:String
    }]
}, {collection:'vacancies'});

module.exports = model('Vacant', VacantSchema);