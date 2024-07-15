// api.js

async function getProdutos() {
    try {
      const response = await fetch('http://localhost:3000/produtos');
      const produtos = await response.json();
      return produtos;
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      return []; 
    }
  }
  
  async function adicionarProduto(nome, imagem, preco) {
    try {
      const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          imagem: imagem,
          preco: preco
        })
      });
  
      if (!response.ok) {
        throw new Error('Erro ao adicionar produto');
      }
  
      const produto = await response.json();
      return produto;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      return null;
    }
  }

  async function excluirProduto(id) {
    try {
      const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir produto');
      }
  
      return true; 
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      return false; 
    }
  }