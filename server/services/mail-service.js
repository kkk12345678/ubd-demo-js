const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to: 'kostiantyn.korolkov@gmail.com',
            subject: "Account activation at " + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <h1>To activate your account, please,  click on the link below.</h1>
                    <a href="${link}">${link}</a>
                </div>
                `
        })
    }
}

module.exports = new MailService();