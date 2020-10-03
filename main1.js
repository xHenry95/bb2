let carts = document.querySelectorAll('.add-cart');

let products = [
	{
		name: 'Product 1',
		tag: 'product1',
		price: 8.99,
		inCart: 0
	},


	{
		name: 'Product2',
		tag: 'product2',
		price: 20.00,
		inCart: 0
	},

	{
		name: 'product3',
		tag: 'product3',
		price: 15.00,
		inCart: 0
	},


	{
		name: 'product4',
		tag: 'product4',
		price: 17.50,
		inCart: 0
	}
];

for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i])
	})
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	
	if(productNumbers) {
		document.querySelector('.cart-label span').textContent = productNumbers;
	}
}

function cartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	/* console.log(productNumbers);
	console.log(typeof productNumbers); */
	
	productNumbers = parseInt(productNumbers);
	
	if ( productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart-label span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart-label span').textContent = 1;
	}
	
	setItems(product);
	
	/* console.log(typeof productNumbers); */

}

function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	
	if(cartItems != null) {
		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify
	(cartItems));
}

function totalCost(product) {
	// console.log("The product price is", product.price);
	let cartCost = localStorage.getItem('totalCost');
	
	console.log("My cartCost is", cartCost);
	console.log(typeof cartCost );

	if(cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector (".products-container");

	if( cartItems && productContainer ) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="product">
				<ion-icon name="close-circle"></ion-icon>
				<img src="./images.${item.tag}.jpg">
				<span>${item.name}</span>
			</div>
			`
		})
	}
}

onLoadCartNumbers();
displayCart();