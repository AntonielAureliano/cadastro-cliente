'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearfields();
    document.getElementById('modal').classList.remove('active')
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
        updateTable();
        closeModal();
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
          <button type="button" class="button green" id="edit-${index}">Editar</button>
           <button type="button" class="button red" id="delete-${index}">Excluir</button>
         </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () =>{
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}

const fillfields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
}

const editClient = (index) => {
    const client = readClient()[index];
    fillfields(client);
    openModal();
}

const editDelet = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-');
        if(action == 'edit') {
            editClient(index);
        } else {
            console.log(`Deletando o cliente ${index}`)
        }
    }
}

updateTable()

//event
const createClient = (client) =>  {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
    
}

document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody').addEventListener('click', editDelet);



