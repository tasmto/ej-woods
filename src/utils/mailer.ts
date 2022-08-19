import nodemailer from 'nodemailer'

const sendLoginEmail = async ({
  email,
  url,
  token,
}: {
  email: string
  token: string
  url: string
}) => {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  const info = await transporter.sendMail({
    from: '"Jane Doe" <j.doe@example.com>',
    to: email,
    subject: 'Login to your account',
    html: `Login by <a href='${url}/account/login#token=${token}'>clicking this link.</a>`,
  })

  console.log(`Preview Url: ${nodemailer.getTestMessageUrl(info)}`)
}

export { sendLoginEmail }
