'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearfields();
    document.getElementById('modal').classList.remove('active')
}

const tempClient = {
    nome: "Nami",
    email: 'nami@gmail.com',
    celular: '6300000000',
    cidade: 'Vila Cocoyasi'
}

//creat
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient));

//read
const readClient =  () => getLocalStorage();


//update
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}

//delete
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}

//interação com usuario
const clearfields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = '');
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

const saveClient = () => {
    if(isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value

        }
        createClient(client);        
        closeModal();
    }
}

//event
const createClient = (client) =>  {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
    
}

document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient);