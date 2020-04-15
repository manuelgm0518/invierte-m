const { Schema, model } = require('mongoose');

var VacantSchema = new Schema({
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: [true, 'Ingrese la empresa de la vacante'] },
    name: { type: String, required: [true, 'Ingrese el nombre de la vacante' ]},
    description: String,
    categories: [String],
}, {collection:'vacancies'});

module.exports = model('Vacant', VacantSchema);