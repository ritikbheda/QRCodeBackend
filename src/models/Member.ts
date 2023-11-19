import mongoose from 'mongoose';

interface FamilyMembers {
  _id: any;
  member: string;
  checked_in: boolean;
}

interface MemberAttrs {
  head_member: string;
  email: string;
  family_members: FamilyMembers[];
  paid: boolean;
  registered: boolean;
}

interface MemberModel extends mongoose.Model<MemberDoc> {
  build(attrs: MemberAttrs): MemberDoc;
}

interface MemberDoc extends mongoose.Document {
  head_member: string;
  email: string;
  family_members: FamilyMembers[];
  paid: boolean;
  registered: boolean;
}

const memberSchema = new mongoose.Schema({
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

memberSchema.statics.build = (attrs: MemberAttrs) => {
  return new Member(attrs);
};

const Member = mongoose.model<MemberDoc, MemberModel>('Member', memberSchema);

export { Member, MemberAttrs };
