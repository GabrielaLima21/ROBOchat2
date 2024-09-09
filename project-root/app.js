const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

let firstInteraction = true;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forgot-password.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Tentativa de login: ${email} - ${password}`);
    res.redirect('/chat');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Novo cadastro: ${name}, ${email}, ${password}`);
    res.redirect('/login');
});

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    console.log(`Recuperação de senha solicitada para: ${email}`);
    res.redirect('/login');
});


app.post('/upload', upload.single('file'), (req, res) => {
    if (firstInteraction) {
        firstInteraction = false;
        res.json({
            response: `
                Nome: João da Silva
                Score de Crédito: 350 (baixo)
                CPF: 987.654.321-00 (fictício)
                Propriedades declaradas: 
                Imóvel residencial? Não, declara que não possui casa própria, porém investigações indicam que possui um apartamento não registrado.
                Veículo automotor? Sim, possui uma HB20 modelo 2020, cor preta, registrado em seu nome.
                Outros bens? Não há informações adicionais declaradas, mas existem indícios de outros bens ocultos.

            `
        });
    } else {
        res.json({
            response: `
                Nome: Marina Santos
                Score de Crédito: 850 (excelente)
                CPF: 123.456.789-00
                Propriedades declaradas: 
                Imóvel residencial? Sim, possui casa própria localizada em São Paulo, SP.
                Veículo automotor? Não, declara que não possui veículo, entretanto, há evidências de que possui um corsa modelo 2018, cor prata, registrado em nome de outra pessoa.
                Outros bens? Não possui outros bens declarados.
            `
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
