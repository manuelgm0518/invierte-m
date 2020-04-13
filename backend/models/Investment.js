const { Schema, model } = require('mongoose');

var InvestmentSchema = new Schema({
    investor: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Ingrese al inversor'] },
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: [true, 'Ingrese a la empresa'] },
    investmentDate: { type: Date, default: Date.now },
    amount: { type: Number, min: [10, 'Debes invertir un mínimo de $10'] },
    paybackDate: { Type: Date, required: [true, 'Ingresa cuándo quires recuperar tu inversión'] },
    interest: { type: Number, default: 0.1 }
});

module.expors = model('Investment', InvestmentSchema);