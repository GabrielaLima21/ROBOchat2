const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

let firstInteraction = true;

// Configuração para processar dados de formulário
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); // Serve arquivos estáticos como HTML e CSS

// Rota para tela de login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Rota para tela de cadastro
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

// Rota para tela de recuperação de senha
app.get('/forgot-password', (req, res) => {
    res.sendFile(__dirname + '/public/forgot-password.html');
});

// Processamento do login (simulação)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Tentativa de login: ${email} - ${password}`);
    // Adicione a lógica de autenticação aqui
    res.redirect('/');
});

// Processamento do cadastro (simulação)
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Novo cadastro: ${name}, ${email}, ${password}`);
    // Adicione a lógica de armazenamento de usuário aqui
    res.redirect('/login');
});

// Processamento de recuperação de senha (simulação)
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    console.log(`Recuperação de senha solicitada para: ${email}`);
    // Adicione a lógica de recuperação de senha aqui
    res.redirect('/login');
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (firstInteraction) {
    firstInteraction = false;
    res.json({ response: `
      Nome: João da Silva
      Idade: 42 anos
      Profissão: Autônomo (pintor)
      Renda Mensal: R$ 2.500
      Endereço: Bairro de periferia, São Paulo - SP
      Score de Crédito: 350 (baixo)
      Histórico Financeiro: 3 financiamentos atrasados nos últimos 2 anos, 2 cartões de crédito cancelados por falta de pagamento, Restrição no nome devido a um empréstimo pessoal não pago há mais de 6 meses.
      Perfil de Risco: Altamente arriscado para novas concessões de crédito.
    ` });
  } else {
    res.json({ response: `
      Nome: Marina Santos
      Idade: 34 anos
      Profissão: Analista de Sistemas em uma multinacional
      Renda Mensal: R$ 10.000
      Endereço: Bairro nobre, Rio de Janeiro - RJ
      Score de Crédito: 850 (excelente)
      Histórico Financeiro: Financiamento de imóvel quitado, 2 cartões de crédito com limite alto e fatura sempre paga antes do vencimento, Empréstimo de carro quitado dentro do prazo.
      Perfil de Risco: Baixo risco, excelente histórico financeiro.
    ` });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
