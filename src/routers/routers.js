const { Router } = require('express');
const { verifyToken } = require('../helper/validate-token');
const { getClients, createClient, signIn } = require('../client/clientController');
const { getAccounts, createAccount } = require('../account/accountController');
const { getTransactions, createTransaction } = require('../transaction/transactionController');
const { getLoans, createLoan } = require('../loan/loanController');
const { getClientLoans, createClientLoan } = require('../clientLoan/clientLoanController');
const { getCards, createCard } = require('../card/cardController');

const router = new Router();

router.get('/clients', verifyToken, getClients.getClients);
router.get('/clients/current', verifyToken, getClients.getClientCurrent);
router.get('/clients/current/accounts', verifyToken, getClients.getClientCurrentAccounts);
router.get('/clients/:id', verifyToken, getClients.getClient);
router.post('/clients', createClient.createClient);
router.post('/clients/current/cards', verifyToken, createCard.createCardCurrentClient);
router.post('/clients/current/accounts', verifyToken, createAccount.createAccountCurrentClient);
router.post('/clients/current/loans', verifyToken, createClientLoan.createLoanCurrentClient);

router.get('/accounts', verifyToken, getAccounts.getAccounts);
router.get('/accounts/:id', verifyToken, getAccounts.getAccount);
router.post('/accounts', verifyToken, createAccount.createAccount);

router.get('/transactions', verifyToken, getTransactions.getTransactions);
router.get('/transactions/:id', verifyToken, getTransactions.getTransaction);
router.post('/transactions', verifyToken, createTransaction.createTransaction);
router.post('/transactions/transfer', verifyToken, createTransaction.createTransfer);

router.get('/loans', verifyToken, getLoans.getLoans);
router.get('/loans/:id', verifyToken, getLoans.getLoan);
router.post('/loans', verifyToken, createLoan.createLoan);

router.get('/clientLoans', verifyToken, getClientLoans.getClientLoans);
router.get('/clientLoans/:id', verifyToken, getClientLoans.getClientLoan);
router.post('/clientLoans', verifyToken, createClientLoan.createClientLoan);

router.get('/cards', verifyToken, getCards.getCards);
router.get('/cards/:id', verifyToken, getCards.getCard);
router.post('/cards', verifyToken, createCard.createCard);

router.post('/signin', signIn.signIn);
router.post('/logout', verifyToken, signIn.signOut);

module.exports = router;