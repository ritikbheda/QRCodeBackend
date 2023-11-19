import { Member, MemberAttrs } from '../models/Member';

async function createMember(memberData: MemberAttrs) {
  try {
    const member = await Member.build(memberData);
    return member.save();
  } catch (error: any) {
    throw new Error('Error creating company: ' + error.message);
  }
}

async function updateMember(member_id: string, updateData: any) {
  try {
    const campaign = await Member.findByIdAndUpdate(member_id, updateData, {
      new: true,
    });
    return campaign;
  } catch (error: any) {
    throw new Error(`Error updating campaign: ${error.message}`);
  }
}

async function getOne(member_id: string) {
  try {
    const member = await Member.findById(member_id);
    if (!member) {
      throw new Error('Caanot find Member');
    }
    return member;
  } catch (error: any) {
    throw new Error('Failed to get member: ' + error.message);
  }
}

async function getAllMembers() {
  try {
    const members = await Member.find({}, '_id head_member');
    // console.log('members', members);
    if (!members) {
      return null;
    }
    return members;
  } catch (error: any) {
    throw new Error('Error getting users of a company: ' + error.message);
  }
}

async function updateCheckin(memberId: string, updates: any) {
  try {
    const member = await Member.findById(memberId);

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

    updates.forEach((update: { familyMemberId: any; checkedInStatus: any }) => {
      const membertoupdate = member.family_members.find(
        (mem) => mem._id == update.familyMemberId
      );

      membertoupdate!.checked_in = update.checkedInStatus;
    });

    // Save the updated member data
    await member.save();

    // Respond with the updated member data
    return member;
  } catch (error: any) {
    throw new Error('Error getting users of a company: ' + error.message);
  }
}

export { createMember, updateMember, getOne, getAllMembers, updateCheckin };
