"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithQRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const nodemailer_1 = __importDefault(require("nodemailer"));
function generateQRCode(member_id) {
    qrcode_1.default.toFile(`./images/qrcodes/${member_id}.png`, `http://localhost:3000/member/one/${member_id}`, {
        color: {
            dark: '#000',
            light: '#FFF',
        },
    }, function (err) {
        if (err)
            throw err;
        console.log('done');
    });
}
exports.default = generateQRCode;
const sendEmailWithQRCode = (email, member_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.titan.email',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'QR Code Email',
            html: `<p>Please find your QR code below:</p><br/><img src="cid:unique@ritikbheda.com" alt="QR Code"/>`,
            attachments: [
                {
                    filename: `${member_id}.png`,
                    path: `./images/qrcodes/${member_id}.png`,
                    cid: 'unique@ritikbheda.com',
                },
            ],
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
});
exports.sendEmailWithQRCode = sendEmailWithQRCode;
