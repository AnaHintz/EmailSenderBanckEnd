require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Hello World!');
})

const port = 5000;
app.listen(port, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}`);
});

//confirmacao
app.get('/send-email-confirmacao', async (req,res) => {
    //mandar um número aleatório de 6 digitos
    const randomN = parseInt(Math.random() * 100000 );
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "ana@email.com",
        subject: "Confirmação de conta",
        text: `Digite esse número para confirmar sua conta ${randomN}`,
        html: `Digite esse número para confirmar sua conta 
        <label><textarea> ${randomN}</textarea></label>`
        
    };
    try {
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) { return console.log(error); }
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

//contato
app.post('/send-email-contato', async (req, res) => {
    const { nome, email, mensagem } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: "ana@gmail.com",
        to: email,
        subject: 'Confirmação de conta',
        text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
        html: `<b>Nome</b> ${nome} <br>Email</br>: ${email} <b>Mensagem</b>: ${mensagem}`
    };

    try {
         await transporter.sendMail(mailOptions, (error, info) => {
             if (error) { return console.error(error); }
         });
         res.json({ sucess: true });
        
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
});

//boasvindas
app.post('/send-email-boasvindas', async (req, res) => {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: "ana@gmail.com",
        to: email,
        subject: 'Bem-vinde!',
        text: `Seja Bem-vinde ao nosso aplicativo 😊`,
        html: `<p>Seja Bem-vinde ao nosso aplicativo 😊 </p>`
    };

    try {
     await transporter.sendMail(mailOptions, (error, info) => {
            if (error) { return console.error(error); }
        });
         res.json({ sucess: true });
        
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
});

//recuperar senha
app.post('/send-email-recuperarsenha', async (req, res) => {
    const senhaAle =  Math.random().toString(36).slice(2);
    const  { email } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: "ana@gmail.com",
        to: email,
        subject: 'Recuperação de senha!',
        text: `Para alterar sua senha digite essa abaixo ${senhaAle}`,
        html: `<p>Para alterar sua senha digite essa abaixo</p> <div style="border: 2px solid #484848; padding: 10px">${senhaAle}</div>`
    };

    try {
         await transporter.sendMail(mailOptions, (error, info) => {
             if (error) { return console.error(error); }
         });
        res.json({ sucess: true });
       
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
});

//notificacao recuperacao de senha
app.post('/send-email-senha-modificada', async (req, res) => {
    const {  email } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: "ana@gmail.com",
        to: email,
        subject: 'Senha alterada com sucesso',
        text: `Sua senha foi alterada com sucesso !🥳`,
        html: `<p>Sua senha foi alterada com sucesso !🥳</p>`
    };

    try {
     await transporter.sendMail(mailOptions, (error, info) => {
            if (error) { return console.error(error); }
        });
         res.json({ sucess: true });
        
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
});
