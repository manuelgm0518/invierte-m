const { Schema, model } = require('mongoose');

var SaleSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'Business', required: [true, 'Ingrese al vendedor'] },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Ingrese al comprador'] },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Products' },
        quantity: { type: Number, default: 1 }
    }],
    date: { type: Date, default: Date.now },
    paid: { type: Number, default: 0.00 },
    sendAddress: { type: String, required: [true, 'Ingrese la dirección de envío'] },
    trackingCode: String,
    status: {
        type: String,
        enum: ['Recibido', 'Enviado', 'Entregado'],
        default: 'Recibido'
    }
});

module.exports = model('Sale', SaleSchema);