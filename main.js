'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Antoniel",
    email: 'antoniel@gmail.com',
    celular: '63991246060',
    cidade: 'Colinas - To'
}

//creat
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient));

//event
const createClient = (client) =>  {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
    
}

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)