import { getProdutos, adicionarProduto, excluirProduto } from './api.js';

let produtos = []; 

async function renderizarProdutos() {
  produtos = await getProdutos(); 
  const produtosContainer = document.querySelector('.cards-container');
  produtosContainer.innerHTML = ''; 

  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" data-id="${produto.id}">
      <div class="card-info">
        <p>${produto.nome}</p>
      </div>
      <div class="card-value">
        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
        <i class="bi bi-trash" data-id="${produto.id}"></i>
      </div>
      <button class="buy-button" data-id="${produto.id}">Comprar</button>
    `;
    produtosContainer.appendChild(card);


    const iconeExclusao = card.querySelector('.bi-trash');
    iconeExclusao.addEventListener('click', async () => {
      const idProduto = iconeExclusao.dataset.id;
      const sucesso = await excluirProduto(idProduto);
      if (sucesso) {
        await renderizarProdutos(); 
      } else {
        alert('Erro ao excluir produto');
      }
    });
  });
}

const form = document.querySelector('.add-product-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar produto');
    }

    const novoProduto = await response.json();

    
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    
  }
});

