"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const memberSchema = new mongoose_1.default.Schema({
    head_member: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    family_members: [
        {
            member: {
                type: String,
                required: true,
            },
            checked_in: {
                type: Boolean,
                default: false,
            },
        },
    ],
    paid: {
        type: Boolean,
        default: true,
    },
    registered: {
        type: Boolean,
        default: true,
    },
});
memberSchema.statics.build = (attrs) => {
    return new Member(attrs);
};
const Member = mongoose_1.default.model('Member', memberSchema);
exports.Member = Member;
