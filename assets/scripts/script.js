const shopContent = document.querySelector('.content');
const cartBody = document.querySelector('.cart');
const cartContent = document.querySelector('.cart__content');
const cartOpenBtn = document.querySelectorAll('.header__icon')[1];
const cartCloseBtn = document.querySelector('.cart__close');

const shopItems = [
	{
		title: 'Headphones1',
		price: 50,
		img: 'assets/images/head1.png',
		category: 'headphones',
		quantity: 0,
		id: 0,
	},
	{
		title: 'Headphones2',
		price: 50,
		img: 'assets/images/head2.png',
		category: 'headphones',
		quantity: 0,
		id: 1,
	},
	{
		title: 'Headphones3',
		price: 50,
		img: 'assets/images/head3.png',
		category: 'headphones',
		quantity: 0,
		id: 2,
	},
	{
		title: 'Headphones4',
		price: 50,
		img: 'assets/images/head4.png',
		category: 'headphones',
		quantity: 0,
		id: 3,
	},
	{
		title: 'Earbuds1',
		price: 50,
		img: 'assets/images/buds1.png',
		category: 'earbuds',
		quantity: 0,
		id: 4,
	},
	{
		title: 'Earbuds2',
		price: 50,
		img: 'assets/images/buds2.png',
		category: 'earbuds',
		quantity: 0,
		id: 5,
	},
	{
		title: 'Microphone1',
		price: 50,
		img: 'assets/images/mic1.png',
		category: 'microphone',
		quantity: 0,
		id: 6,
	},
	{
		title: 'Microphone2',
		price: 50,
		img: 'assets/images/mic2.png',
		category: 'microphone',
		quantity: 0,
		id: 7,
	},
	{
		title: 'Microphone3',
		price: 50,
		img: 'assets/images/mic3.png',
		category: 'microphone',
		quantity: 0,
		id: 8,
	},
];

const cartItems = [];

// SHOP CONTENT RENDER HANDLER

const shopContentHandler = () => {
	shopItems.forEach((item, itemIndex) => {
		shopContent.innerHTML += `
            <div class="card" id="${itemIndex}">
				<img src="${item.img}" alt="" class="card__img" />
				<h2 class="card__title">${item.title}</h2>
				<p class="card__price">$${item.price}</p>
				<span class="material-symbols-outlined card__icon">
					shopping_cart
				</span>
			</div>
        
        `;
	});

	// SHOP CONTENT ADD TO CART HANDLER

	shopContent.addEventListener('click', (event) => {
		if (event.target.tagName === 'SPAN') {
			const shopItemId = parseInt(event.target.closest('div').id);
			const isContain = cartItems.some((item) => item.id == shopItemId);
			// fix, not shopitemid as identifier, wrong one
			if (isContain) {
				cartItems[shopItemId].quantity++;
			} else {
				cartItems.push(shopItems[shopItemId]);
				cartItems[shopItemId].quantity++;
			}
			console.log(cartItems);
		}
	});
};
shopContentHandler();

// CART OPEN AND CLOSE HANDLERS

cartOpenBtn.addEventListener('click', () => {
	cartBody.classList.add('cart--visible');
});
// cartCloseBtn.addEventListener('click', () => {
// 	cartBody.classList.remove('cart--visible');
// });
document.body.addEventListener('click', (event) => {
	if (
		(!event.target.closest('.cart') &&
			!event.target.matches('.header__icon')) ||
		event.target.matches('.cart__close')
	) {
		cartBody.classList.remove('cart--visible');
	}
});
