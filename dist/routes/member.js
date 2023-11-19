"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoutes = void 0;
const member_1 = require("../services/member");
const validate_1 = require("../middleware/validate");
const express_validator_1 = require("express-validator");
const generateQRcode_1 = __importStar(require("../utils/generateQRcode"));
const Member_1 = require("../models/Member");
const express = require('express');
const router = express.Router();
exports.memberRoutes = router;
router.post('/createMember', (0, validate_1.validate)([
    (0, express_validator_1.body)('email').isEmail().withMessage('must be email'),
    (0, express_validator_1.body)('head_member')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('name must be between 4 and 20 characters'),
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { head_member, email, family_members, paid, registered } = req.body;
    try {
        const createdMember = yield (0, member_1.createMember)({
            head_member,
            email,
            family_members,
            paid,
            registered,
        });
        res.status(201).json({
            status: 201,
            data: createdMember,
            message: 'Memeber created successfully.',
            error: null,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message,
            },
        });
    }
}));
router.get('/one/:member_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { member_id } = req.params;
    try {
        const member = yield (0, member_1.getOne)(member_id);
        if (!member) {
            res.status(400).json({
                status: 400,
                data: null,
                message: 'no member found for the provided id',
                error: {
                    code: 'INVALID_INPUT',
                    details: 'no member found for the provided id',
                },
            });
        }
        res.status(200).json({
            status: 200,
            data: member,
            message: 'get Member successfully.',
            error: null,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message,
            },
        });
    }
}));
router.get('/allMembers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield (0, member_1.getAllMembers)();
        if (!members) {
            res.status(400).json({
                status: 400,
                data: null,
                message: 'no member found for the provided id',
                error: {
                    code: 'INVALID_INPUT',
                    details: 'no member found for the provided id',
                },
            });
        }
        res.status(200).json({
            status: 200,
            data: members,
            message: 'get Member successfully.',
            error: null,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message,
            },
        });
    }
}));
router.put('/checkin/:member_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { member_id } = req.params;
    const { updates } = req.body;
    // console.log('member_id', member_id, 'updates', updates);
    try {
        const checked_in = yield (0, member_1.updateCheckin)(member_id, updates);
        if (!checked_in) {
            res.status(400).json({
                status: 400,
                data: null,
                message: 'no member found for the provided id',
                error: {
                    code: 'INVALID_INPUT',
                    details: 'no member found for the provided id',
                },
            });
        }
        res.status(200).json({
            status: 200,
            data: checked_in,
            message: 'update Member successful.',
            error: null,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message,
            },
        });
    }
}));
router.get('/generateQR/:member_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { member_id } = req.params;
    try {
        const member = yield Member_1.Member.findById(member_id);
        if (member) {
            yield (0, generateQRcode_1.default)(member_id);
            yield (0, generateQRcode_1.sendEmailWithQRCode)(member.email, member_id);
            res.status(200).json({ bro: 'yes bro' });
        }
        else {
            throw new Error('member not found');
        }
    }
    catch (err) {
        throw new Error(err);
    }
}));
