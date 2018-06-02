
const random = require('random-id');
const qr = require('qr-image');
const QRCode = require('qrcode');

module.exports = {
    jsonResponse: function (status, statusText, data, res, message, meta) {
        var response = {
            message: message
        };
        if (typeof data !== 'undefined') {
            response.data = data;
        }
        if (typeof meta !== 'undefined') {
            response.meta = meta;
        }
        if (typeof statusText !== 'undefined') {
            response.status = statusText;
        }

        return res.status(status).json(response);
    },
    random: random,
    qr:qr,
    QRCode
}