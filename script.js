let products = [
    {id: 1, name: 'Curso 1', price: 10.99, amount: 1, image: 'img/product1.jpg'},
    {id: 2, name: 'Curso 2', price: 20.99, amount: 1, image: 'img/product1.jpg'},
    {id: 3, name: 'Curso 3', price: 30.99, amount: 1, image: 'img/product1.jpg'},
    {id: 4, name: 'Curso 4', price: 40.99, amount: 1, image: 'img/product1.jpg'},
    {id: 5, name: 'Curso 5', price: 50.99, amount: 1, image: 'img/product1.jpg'},
    {id: 6, name: 'Curso 6', price: 60.99, amount: 1, image: 'img/product1.jpg'},
    {id: 7, name: 'Curso 7', price: 70.99, amount: 1, image: 'img/product1.jpg'},
    {id: 8, name: 'Curso 8', price: 80.99, amount: 1, image: 'img/product1.jpg'},
    {id: 9, name: 'Curso 9', price: 90.99, amount: 1, image: 'img/product1.jpg'}
];

let cart = [];

function renderProducts(){
    let productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    products.forEach((product) => {
        let initialPrice = product.price;
        let productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button>Adicionar ao carrinho</button>
        `;
        productGrid.appendChild(productDiv);
        productDiv.querySelector('button').addEventListener('click', () => {
            addTocart(product, initialPrice);
        })
    })
}

function addTocart(currentProduct, initialPrice) {
    let product = products.find((product) => product.id === currentProduct.id);

    if (cart.length === 0) {
        product.amount = 1;
        product.price = initialPrice;
        cart.push(product);
    }else{
        let equalProduct = cart.find((product) => {
            return product.id === currentProduct.id
        });
        if(equalProduct){
            equalProduct.amount += 1;
            equalProduct.price += equalProduct.price;
            cart.push(equalProduct);
        }else{
            cart.push(product);
        }
    }

    renderCart(initialPrice);
}

function renderCart(initialPrice) {
    let cartTable = document.querySelector('.cart table tbody');
    cartTable.innerHTML = '';

    let cartFiltered = cart.filter((current, i) => cart.indexOf(current) === i );

    cartFiltered.forEach((product) => {
        let cartRow = document.createElement('tr');
        cartRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.amount}</td>
            <td>${initialPrice}</td>
            <td>${product.price}</td>
        `;
        cartTable.appendChild(cartRow);
    });

    updateTotal(cartFiltered);
}

function updateTotal(cartFiltered){
    let total = cartFiltered.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

document.getElementById('checkout').addEventListener('click', () => {
    if(cart.length === 0)
    {
        alert('Seu carrinho está vazio');
    }else{
        cart = [];
        renderCart();
        alert('Pedido realizado com sucesso');
    }
})

renderProducts();