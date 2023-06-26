const mailer = require('nodemailer');

const sendMail = async (to,subject,message)=>{
    
    const transporter = mailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user:"pmmnode@gmail.com",
            pass:"kileodefqtessawa"
        }
    })

    const options = {
        from: 'pmmnode@gmail.com',
        to: to,
        subject: subject,
        text: message
    }

    var res  = await transporter.sendMail(options)
    return res

}
// sendMail("samir.vithlani83955@gmail.com","hi","hello").then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// })
module.exports = {sendMail}