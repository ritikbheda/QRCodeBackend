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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCheckin = exports.getAllMembers = exports.getOne = exports.updateMember = exports.createMember = void 0;
const Member_1 = require("../models/Member");
function createMember(memberData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const member = yield Member_1.Member.build(memberData);
            return member.save();
        }
        catch (error) {
            throw new Error('Error creating company: ' + error.message);
        }
    });
}
exports.createMember = createMember;
function updateMember(member_id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaign = yield Member_1.Member.findByIdAndUpdate(member_id, updateData, {
                new: true,
            });
            return campaign;
        }
        catch (error) {
            throw new Error(`Error updating campaign: ${error.message}`);
        }
    });
}
exports.updateMember = updateMember;
function getOne(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const member = yield Member_1.Member.findById(member_id);
            if (!member) {
                throw new Error('Caanot find Member');
            }
            return member;
        }
        catch (error) {
            throw new Error('Failed to get member: ' + error.message);
        }
    });
}
exports.getOne = getOne;
function getAllMembers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const members = yield Member_1.Member.find({}, '_id head_member');
            // console.log('members', members);
            if (!members) {
                return null;
            }
            return members;
        }
        catch (error) {
            throw new Error('Error getting users of a company: ' + error.message);
        }
    });
}
exports.getAllMembers = getAllMembers;
function updateCheckin(memberId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const member = yield Member_1.Member.findById(memberId);
            if (!member) {
                return null;
            }
            // Update the check-in status for multiple family members using INDEX
            // updates.forEach(
            //   (update: { familyMemberIndex: any; checkedInStatus: any }) => {
            //     const { familyMemberIndex, checkedInStatus } = update;
            //     member.family_members[familyMemberIndex].checked_in = checkedInStatus;
            //   }
            // );
            // Update the check-in status for multiple family members using id
            updates.forEach((update) => {
                const membertoupdate = member.family_members.find((mem) => mem._id == update.familyMemberId);
                membertoupdate.checked_in = update.checkedInStatus;
            });
            // Save the updated member data
            yield member.save();
            // Respond with the updated member data
            return member;
        }
        catch (error) {
            throw new Error('Error getting users of a company: ' + error.message);
        }
    });
}
exports.updateCheckin = updateCheckin;
