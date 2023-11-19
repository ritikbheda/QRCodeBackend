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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const member_1 = require("./routes/member");
const app = (0, express_1.default)();
exports.app = app;
app.set('trust proxy', true);
app.use((0, body_parser_1.json)());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        // Check if the request origin is in the allowed origins list
        if (allowedOrigins.includes(origin || '') || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies)
};
app.use((0, cors_1.default)(corsOptions));
app.use('/member', member_1.memberRoutes);
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('all');
}));
