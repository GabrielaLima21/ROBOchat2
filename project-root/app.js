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
                Idade: 42 anos
                Profissão: Autônomo (pintor)
                Renda Mensal: R$ 2.500
                Endereço: Bairro de periferia, São Paulo - SP
                Score de Crédito: 350 (baixo)
                Histórico Financeiro: 3 financiamentos atrasados nos últimos 2 anos, 2 cartões de crédito cancelados por falta de pagamento, Restrição no nome devido a um empréstimo pessoal não pago há mais de 6 meses.
                Perfil de Risco: Altamente arriscado para novas concessões de crédito.
            `
        });
    } else {
        res.json({
            response: `
                Nome: Marina Santos
                Idade: 34 anos
                Profissão: Analista de Sistemas em uma multinacional
                Renda Mensal: R$ 10.000
                Endereço: Bairro nobre, Rio de Janeiro - RJ
                Score de Crédito: 850 (excelente)
                Histórico Financeiro: Financiamento de imóvel quitado, 2 cartões de crédito com limite alto e fatura sempre paga antes do vencimento, Empréstimo de carro quitado dentro do prazo.
                Perfil de Risco: Baixo risco, excelente histórico financeiro.
            `
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
