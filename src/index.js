const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()
const app = express()

app.use(express.json())

app.post('/', async (req, res) => {
    const transporter = nodemailer.createTransport({
        name: 'dekorachile',
        host: "mail.dekorachile.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'noreply@dekorachile.com',
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        let info = await transporter.sendMail({
            from: '"Dekora Chile" <noreply@dekorachile.com>', // sender address
            to: "enmanuelr7@gmail.com", // list of receivers
            subject: "prueba 3",
            text: `hola ${req.body.name}, gracias por tu compra`,
            html: `<h1>hola ${req.body.name}, gracias por tu compra</h1>`
        });
        res.send("Message sent: %s " + info.messageId);
    } catch (error) {
        res.status(400).send(error);
    }

})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})