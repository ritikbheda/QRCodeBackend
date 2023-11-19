import {
  createMember,
  getAllMembers,
  getOne,
  updateCheckin,
} from '../services/member';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';
import { Request } from 'express';
import generateQRCode, { sendEmailWithQRCode } from '../utils/generateQRcode';
import { Member } from '../models/Member';

const express = require('express');
const router = express.Router();

router.post(
  '/createMember',
  validate([
    body('email').isEmail().withMessage('must be email'),
    body('head_member')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('name must be between 4 and 20 characters'),
  ]),
  async (req: any, res: any) => {
    const { head_member, email, family_members, paid, registered } = req.body;

    try {
      const createdMember = await createMember({
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
    } catch (error: any) {
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
  }
);

router.get('/one/:member_id', async (req: Request, res: any) => {
  const { member_id } = req.params;
  try {
    const member = await getOne(member_id);
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
  } catch (error: any) {
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
});

router.get('/allMembers', async (req: Request, res: any) => {
  try {
    const members = await getAllMembers();
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
  } catch (error: any) {
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
});

router.put('/checkin/:member_id', async (req: any, res: any) => {
  const { member_id } = req.params;
  const { updates } = req.body;

  // console.log('member_id', member_id, 'updates', updates);

  try {
    const checked_in = await updateCheckin(member_id, updates);

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
  } catch (error: any) {
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
});

router.get('/generateQR/:member_id', async (req: any, res: any) => {
  const { member_id } = req.params;

  try {
    const member = await Member.findById(member_id);

    if (member) {
      await generateQRCode(member_id);

      await sendEmailWithQRCode(member!.email, member_id);
      res.status(200).json({ bro: 'yes bro' });
    } else {
      throw new Error('member not found');
    }
  } catch (err: any) {
    throw new Error(err);
  }
});

export { router as memberRoutes };
