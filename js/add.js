
const form = document.querySelector('.add-product-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const nome = document.getElementById('product-name').value;
  const preco = document.getElementById('product-price').value;
  const imagem = document.getElementById('product-image').files[0];

  if (imagem) {
    const imagemBytes = await imagem.arrayBuffer();

    const imagemBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(imagemBytes)));

    const novoProduto = await adicionarProduto(nome, imagemBase64, preco);

    if (novoProduto) {
      renderizarProdutos([novoProduto, ...produtos]);
    }
  } else {
    alert('Selecione uma imagem para o produto.');
  }
});
