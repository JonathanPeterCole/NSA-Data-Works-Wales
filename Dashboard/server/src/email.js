const nodemailer = require('nodemailer');
class email {
    static setup(){
        this.transporter = null;
        this.loginAccount().then((err, suc) => {
            if(err){
                console.log(err)
            }
        })
    }
    static loginAccount(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'batutestmailer@gmail.com',
                pass: 'thisislepasswordlol'
            }
        })
        return this.transporter.verify()
    }
    static sendMail(from, to, subject, text, html=null){
        if(!this.transporter){
            return console.log("Account not signed or invalid details!")
        }
        let message = {
            from, to, subject, text
        }
        this.transporter.sendMail(message);
    }
}
module.exports = email

//batutestmailer@gmail.com
//thisislepasswordlol