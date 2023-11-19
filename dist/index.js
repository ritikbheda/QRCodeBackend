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
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const app_1 = require("./app");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requiredVariables = ['MONGODB_PASSWORD'];
            const missingVariables = [];
            for (const variable of requiredVariables) {
                if (!process.env[variable]) {
                    missingVariables.push(variable);
                }
            }
            if (missingVariables.length > 0) {
                console.warn(`Warning: The following required environment variables are missing or undefined: ${missingVariables.join(', ')}`);
            }
            try {
                yield mongoose_1.default.connect(`mongodb+srv://ritikbheda:${process.env.MONGODB_PASSWORD}@cluster0.xts4n4t.mongodb.net/database?retryWrites=true&w=majority`);
                console.log('connected to mongoDB');
            }
            catch (err) {
                console.error(err);
            }
            app_1.app.listen(3001, () => {
                console.log('app listening to 3001');
            });
        }
        catch (_a) { }
    });
}
start().catch(console.dir);
