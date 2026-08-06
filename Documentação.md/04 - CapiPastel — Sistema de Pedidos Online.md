# CapiPastel — Documentação Técnica do Projeto

O **CapiPastel** é um sistema web interativo para cardápio digital e pedidos online de uma pastelaria/lanchonete.

Esta documentação detalha a arquitetura do código nas três principais camadas do front-end:

- **HTML5** — Estrutura
- **CSS3** — Estilização
- **JavaScript** — Comportamento e lógica

---

## Estrutura de Arquivos

```text
CapiPastel/
├── Código Fonte/
│   ├── index.html        # Página inicial (apresentação e diferenciais)
│   ├── cardapio.html     # Página do cardápio dinâmico com carrinho
│   ├── pedido.html       # Página de confirmação e resumo do pedido
│   ├── css/
│   │   └── style.css     # Estilização global e layout responsivo
│   ├── js/
│   │   └── script.js     # Lógica do carrinho, filtros e interação com DOM
│   └── ativos/            # Imagens dos produtos e elementos visuais
└── README.md              # Documentação do projeto
````

---

##  1. Estrutura HTML5

Arquivos:

* `index.html`
* `cardapio.html`
* `pedido.html`

A estrutura do projeto utiliza **HTML5 semântico** para facilitar a acessibilidade, a organização e a manutenção das páginas.

### `<header>` e `<nav>`

Presentes no topo das páginas.

Contêm:

* A marca **CapiPastel**;
* O menu de navegação entre as páginas;
* O ícone do carrinho de compras;
* A bolha de contagem dos itens adicionados ao carrinho.

### `<main>`

Delimita o conteúdo principal de cada página.

#### `index.html`

Apresenta:

* Seção **Hero** (chamada principal);
* Destaques da loja;
* Diferenciais;
* Informações sobre a pastelaria.

#### `cardapio.html`

Contém:

* Barra de filtros por categoria (`.filtros-categoria`);
* Grid de produtos (`.grid-produtos`);
* Cards de produtos inseridos dinamicamente pelo JavaScript;
* Sistema de carrinho de compras.

#### `pedido.html`

Contém:

* Formulário com os dados de entrega;
* Informações do cliente;
* Resumo dos itens comprados;
* Valor total do pedido.

### `<aside id="carrinho-drawer">`

Painel lateral deslizante presente na página do cardápio.

Funciona como uma **gaveta do carrinho de compras**, permitindo visualizar os produtos selecionados, alterar quantidades e conferir o valor total.

### `<footer>`

Rodapé padrão das páginas contendo:

* Informações de direitos autorais;
* Links rápidos;
* Redes sociais;
* Informações adicionais da loja.

---

## 2. Estilização CSS3

Arquivo:

```text
css/style.css
```

O CSS é responsável pelo design visual, esquema de cores, organização dos elementos e responsividade da aplicação.

### Variáveis CSS (`:root`)

As variáveis CSS são utilizadas para padronizar:

* Cores da marca;
* Tons de marrom;
* Tons amarelos/dourados;
* Fundos claros;
* Fontes;
* Espaçamentos.

Essa organização facilita futuras alterações no design do projeto.

### Layout com Flexbox e CSS Grid

#### CSS Grid — `.grid-produtos`

Organiza os cards de pastéis, bebidas e outros produtos em colunas adaptáveis.

O número de colunas se ajusta de acordo com o tamanho da tela.

#### Flexbox

Utilizado para alinhar elementos como:

* Itens do menu;
* Botões de quantidade (`+` / `-`);
* Barra de navegação;
* Elementos dos cards;
* Componentes do carrinho.

### Animações e Transições

O projeto utiliza animações e transições para melhorar a experiência do usuário.

Entre elas:

* Efeito de `hover` nos botões;
* Efeito de `hover` nos cards de produtos;
* Transições suaves;
* Animação de abertura e fechamento do carrinho lateral.

O painel do carrinho utiliza:

```css
transform: translateX();
```

para realizar o movimento de deslizamento.

### Responsividade

O projeto utiliza **Media Queries (`@media`)** para adaptar a interface a diferentes tamanhos de tela.

Em dispositivos móveis:

* Os tamanhos das fontes são ajustados;
* As margens e espaçamentos são reduzidos;
* Os elementos são reorganizados;
* O grid de produtos pode ser transformado em uma única coluna.

---

## 3. Lógica JavaScript

Arquivo:

```text
js/script.js
```

O JavaScript controla a interatividade e as principais regras de negócio da aplicação, permitindo que as ações sejam realizadas sem a necessidade de recarregar a página.

---

### A. Base de Dados dos Produtos

Os produtos são armazenados em um array de objetos chamado `produtos`.

Cada produto possui propriedades como:

* `id`
* `nome`
* `categoria`
* `preco`
* `descricao`
* `imagem`

Exemplo:

```javascript
const produtos = [
  {
    id: 1,
    nome: "Pastel de Carne",
    categoria: "pasteis",
    preco: 12.00,
    descricao: "Pastel recheado com carne.",
    imagem: "..."
  }
];
```

---

### B. Renderização do Cardápio — `renderizarProdutos()`

A função `renderizarProdutos()` é responsável por exibir os produtos na página.

Suas principais funções são:

1. Limpar o contêiner HTML `.grid-produtos`;
2. Percorrer a lista de produtos utilizando `.forEach()`;
3. Criar dinamicamente os elementos HTML dos cards;
4. Exibir informações como nome, descrição, preço e imagem;
5. Inserir o botão **"Adicionar ao Carrinho"**.

---

### C. Sistema de Filtros — `filtrarProdutos()`

A função `filtrarProdutos()` controla os filtros de categorias do cardápio.

O sistema permite selecionar categorias como:

* **Todos**
* **Pastéis**
* **Bebidas**
* Outras categorias disponíveis

Ao clicar em uma categoria, o JavaScript utiliza o método:

```javascript
.filter()
```

para selecionar somente os produtos pertencentes à categoria escolhida.

Em seguida, a função `renderizarProdutos()` é executada novamente para atualizar o cardápio.

---

### D. Gerenciamento do Carrinho

Principais funções:

```javascript
adicionarAoCarrinho()
atualizarCarrinho()
```

O sistema de carrinho permite adicionar, remover e alterar a quantidade dos produtos selecionados.

#### Adicionar produtos

O array `carrinho` armazena os itens selecionados.

Quando um produto já está no carrinho, sua quantidade é incrementada.

Caso ainda não exista, o produto é inserido no array.

#### Cálculo do total

O valor total do pedido é calculado utilizando o método:

```javascript
.reduce()
```

O cálculo considera:

```text
preço × quantidade
```

de cada item presente no carrinho.

#### Atualização da interface

Sempre que o carrinho é alterado, a interface é atualizada para mostrar:

* Produtos adicionados;
* Quantidade de cada item;
* Valor individual;
* Valor total;
* Contador de itens no cabeçalho.

---

## E. Persistência de Dados — `localStorage`

O projeto utiliza o **Local Storage do navegador** para manter os dados do carrinho mesmo quando o usuário navega entre as páginas.

Sempre que o carrinho é modificado, seus dados são armazenados utilizando:

```javascript
localStorage.setItem("carrinho", ...);
```

Ao acessar a página de finalização do pedido (`pedido.html`), o sistema recupera os dados armazenados através de:

```javascript
localStorage.getItem("carrinho");
```

Dessa forma, os produtos selecionados anteriormente podem ser exibidos no resumo do pedido.

---

## Como Visualizar a Aplicação

O projeto está publicado e pode ser acessado diretamente pelo link oficial:

 **[CapiPastel — Aplicação Web](https://capi-pastel.vercel.app)**

---

## Tecnologias Utilizadas

| Tecnologia   | Utilização                           |
| ------------ | ------------------------------------ |
| HTML5        | Estrutura das páginas                |
| CSS3         | Estilização e responsividade         |
| JavaScript   | Interatividade e lógica da aplicação |
| LocalStorage | Persistência dos dados do carrinho   |
| Vercel       | Hospedagem da aplicação              |

---

## Funcionalidades Principais

*  Cardápio digital;
*  Filtros por categoria;
*  Carrinho de compras;
*  Aumento da quantidade de produtos;
*  Redução da quantidade de produtos;
*  Remoção de produtos;
*  Cálculo automático do total;
*  Persistência do carrinho com `localStorage`;
*  Resumo do pedido;
*  Design responsivo;
*  Interface interativa.

---

## Projeto

**CapiPastel**

Sistema web desenvolvido como projeto acadêmico utilizando tecnologias de desenvolvimento front-end.

---

```

Essa versão já está adequada para ser colocada diretamente no **`README.md` do GitHub**, sem aqueles problemas de crases e formatação que estavam no texto original.
```
