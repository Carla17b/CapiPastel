# CapiPastel

O **CapiPastel** é uma aplicação web interativa desenvolvida para simular a experiência de um cardápio digital e sistema de pedidos de uma lanchonete/pastelaria. O projeto permite visualizar produtos, filtrar categorias, adicionar itens a um carrinho de compras dinâmico e simular a finalização de um pedido.

---

### Tecnologias Utilizadas

* **HTML5:** Estrutura semântica das páginas web.
* **CSS3:** Estilização visual, layout responsivo e transições.
* **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM e gerenciamento do estado do carrinho.

---

### Estrutura do Projeto

```text
CapiPastel/
├── Código Fonte/
│   ├── index.html        # Página inicial (Hero, destaques e diferenciais)
│   ├── cardapio.html     # Página do cardápio interativo com filtros e carrinho
│   ├── pedido.html       # Página de confirmação/resumo do pedido
│   ├── css/
│   │   └── style.css     # Estilização global do projeto
│   ├── js/
│   │   └── script.js    # Lógica do carrinho, filtros e interatividade
│   └── ativos/           # Imagens dos produtos e elementos visuais
└── README.md             # Documentação do projeto
```

### Explicação Técnica do Código (script.js)
O comportamento dinâmico do site é gerenciado pelo arquivo JavaScript principal. Abaixo está a explicação por módulos do que cada parte do código executa:

1. Estrutura de Dados dos Produtos (produtos)
O que faz: Mantém uma lista de objetos contendo as informações essenciais de cada item (ID, nome, categoria, preço e imagem).

Função no sistema: Serve como a "base de dados" local da aplicação para renderizar o cardápio dinamicamente sem precisar duplicar código HTML.

2. Gerenciamento do Carrinho de Compras (carrinho)
O que faz: Armazena os itens selecionados pelo usuário, controlando a quantidade de cada produto.

Mecanismo: Utiliza métodos de array para adicionar, remover e atualizar quantidades conforme o usuário interage com os botões de adicionar ao carrinho.

3. Renderização Dinâmica do Cardápio (renderizarProdutos())
O que faz: Percorre a lista de produtos e injeta os cards de HTML diretamente no contêiner da página.

Filtros por Categoria: Ao clicar em botões de categoria (como Todos, Pastéis, Bebidas), a função filtra o array de produtos e atualiza a exibição na tela em tempo real.

4. Atualização da Interface e Cálculos (atualizarCarrinho())
Cálculo de Subtotal e Total: Multiplica a quantidade de cada item pelo seu preço unitário e calcula o valor final do pedido.

Contador do Menu: Atualiza a bolha numérica no cabeçalho indicando a quantidade total de itens adicionados.

Renderização da Drawer/Modal do Carrinho: Desenha os itens dentro do painel lateral do carrinho com botões para alterar a quantidade (+ e -) ou remover o item.

5. Persistência de Dados (localStorage)
O que faz: Salva o estado atual do carrinho no navegador do usuário.

Importância: Garante que os itens selecionados não sejam perdidos caso o usuário navegue entre a página do cardápio e a tela de finalização de pedido (pedido.html)
