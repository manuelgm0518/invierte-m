const { Schema, model } = require('mongoose');

var UserSchema = new Schema({
    email: { type: String, unique: true, required: [true, 'Ingrese su correo'] },
    firstName: { type: String, required: [true, 'Ingrese su nombre'] },
    lastName: { type: String, required: [true, 'Ingrese sus apellidos'] },
    password: { type: String, required: true, minlength: [8, 'La contraseña debe tener al menos 8 carácteres'] },
    avatarURL: { type: String, default: 'https://image.flaticon.com/icons/svg/483/483361.svg' },
    joinDate: { type: Date, default: Date.now },
    biography: String,
    location: String,
    addresses: [String],
    shoppingCart: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
});

module.exports = model('User', UserSchema);