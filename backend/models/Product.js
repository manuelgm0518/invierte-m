const { Schema, model } = require('mongoose');

var ProductSchema = new Schema({
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: [true, 'Ingrese la empresa del producto'] },
    name: { type: String, required: [true, 'Ingrese el nombre del producto' ]},
    salePrice: { type: Number, default: 0.00 },
    imageURL: { type: String, default: 'https://image.flaticon.com/icons/svg/2630/2630075.svg' },
    description: String
});

module.exports = model('Product', ProductSchema);