import QRcode from 'qrcode';
import nodemailer from 'nodemailer';

export default function generateQRCode(member_id: string) {
  QRcode.toFile(
    `./images/qrcodes/${member_id}.png`,
    `http://localhost:3000/member/one/${member_id}`,
    {
      color: {
        dark: '#000',
        light: '#FFF',
      },
    },
    function (err: any) {
      if (err) throw err;
      console.log('done');
    }
  );
}

export const sendEmailWithQRCode = async (email: string, member_id: string) => {
  try {
    const transporter = nodemailer.createTransport({
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

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
