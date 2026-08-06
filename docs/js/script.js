// CapiPastel - Script Principal

// Base de Dados de Produtos conforme Cardápio
const produtos = [
    { id: 1, nome: "Pastel de Carne", categoria: "pasteis", preco: 8.50, img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80", desc: "Pastel crocante recheado com carne moída temperada." },
    { id: 2, nome: "Pastel de Queijo", categoria: "pasteis", preco: 8.00, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80", desc: "Muito queijo muçarela derretido e saboroso." },
    { id: 3, nome: "Pastel de Pizza", categoria: "pasteis", preco: 8.50, img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80", desc: "Queijo, presunto, tomate e orégano especial." },
    { id: 4, nome: "Coxinha de Frango", categoria: "coxinhas", preco: 7.00, img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80", desc: "Massa tradicional e recheio suculento de frango." },
    { id: 5, nome: "Coxinha Frango c/ Catupiry", categoria: "coxinhas", preco: 8.00, img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80", desc: "Clássica coxinha de frango com requeijão cremoso." },
    { id: 6, nome: "Coxinha Frango c/ Bacon", categoria: "coxinhas", preco: 8.50, img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80", desc: "Frango desfiado com pedaços crocantes de bacon." },
    { id: 7, nome: "Kibe de Carne Moída", categoria: "kibe", preco: 7.50, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80", desc: "Kibe frito na hora com hortelã e especiarias." },
    { id: 8, nome: "Empada de Frango", categoria: "empadas", preco: 7.00, img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80", desc: "Massa podre que derrete na boca com recheio de frango." },
    { id: 9, nome: "Empada Frango c/ Requeijão", categoria: "empadas", preco: 7.50, img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80", desc: "Massa leve e recheio bem cremoso." },
    { id: 10, nome: "Enroladinho de Salsicha", categoria: "enroladinho", preco: 6.50, img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400&q=80", desc: "Salsicha envolta em massa fofinha e dourada." }
];

let carrinho = JSON.parse(localStorage.getItem('capiCarrinho')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    atualizarContadorCarrinho();
    if (document.getElementById('grid-produtos')) {
        renderizarProdutos(produtos);
    }
    if (document.getElementById('itens-carrinho')) {
        renderizarCarrinho();
    }
});

// Renderização dos Produtos no Cardápio
function renderizarProdutos(lista) {
    const container = document.getElementById('grid-produtos');
    container.innerHTML = '';
    
    lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.nome}" class="card-img">
            <div class="card-body">
                <h3 class="card-title">${item.nome}</h3>
                <p class="card-text">${item.desc}</p>
                <div class="card-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                <button class="btn btn-block" onclick="adicionarAoCarrinho(${item.id})">Adicionar ao Pedido</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filtro de Categorias
function filtrarCategoria(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (cat === 'todos') {
        renderizarProdutos(produtos);
    } else {
        const filtrados = produtos.filter(p => p.categoria === cat);
        renderizarProdutos(filtrados);
    }
}

// Lógica do Carrinho
function adicionarAoCarrinho(id) {
    const prod = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.qtd += 1;
    } else {
        carrinho.push({ ...prod, qtd: 1 });
    }
    
    salvarCarrinho();
    alert(`${prod.nome} adicionado com sucesso!`);
}

function salvarCarrinho() {
    localStorage.setItem('capiCarrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
    const totalQtd = carrinho.reduce((sum, item) => sum + item.qtd, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => b.textContent = totalQtd);
}

function renderizarCarrinho() {
    const container = document.getElementById('itens-carrinho');
    const totalElement = document.getElementById('total-valor');
    container.innerHTML = '';
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">Seu carrinho está vazio.</p>';
        totalElement.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;
    carrinho.forEach(item => {
        const subtotal = item.preco * item.qtd;
        total += subtotal;
        
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                <small>R$ ${item.preco.toFixed(2)} x ${item.qtd}</small>
            </div>
            <div>
                <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                <button onclick="removerDoCarrinho(${item.id})" style="background:none; border:none; color:red; cursor:pointer; margin-left:10px;">✕</button>
            </div>
        `;
        container.appendChild(div);
    });

    totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    renderizarCarrinho();
}

// Consumo de API Externa: ViaCEP
function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                } else {
                    alert('CEP não encontrado!');
                }
            })
            .catch(() => alert('Erro ao buscar CEP. Verifique sua conexão.'));
    }
}

// Simulação de Pedido (Fluxograma)
function finalizarPedido(e) {
    e.preventDefault();
    if (carrinho.length === 0) {
        alert('Adicione ao menos um produto no carrinho!');
        return;
    }

    // Ocultar formulário e mostrar tracker de status
    document.getElementById('checkout-area').style.display = 'none';
    document.getElementById('status-area').style.display = 'block';

    // Limpar carrinho
    carrinho = [];
    salvarCarrinho();

    // Atualização simulada conforme fluxograma
    setTimeout(() => {
        document.getElementById('step-pagamento').classList.add('completed');
        document.getElementById('step-preparo').classList.add('active');
    }, 2500);

    setTimeout(() => {
        document.getElementById('step-preparo').classList.add('completed');
        document.getElementById('step-entrega').classList.add('active');
    }, 5500);
}