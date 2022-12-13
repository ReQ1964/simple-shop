const shopContent = document.querySelector('.content');
const cartBody = document.querySelector('.cart');
const cartContent = document.querySelector('.cart__content');
const cartOpenBtn = document.querySelectorAll('.header__icon')[1];
const cartCloseBtn = document.querySelector('.cart__close');
const filterInput = document.querySelector('#filters__input');
const filterBtns = [...document.querySelectorAll('.btn--filter')];
const buyBtn = document.querySelector('.cart__buy');
const cartPrice = document.querySelector('.cart__price');
const sortFilter = document.querySelector('#filters__select');

const shopItems = [
	{
		title: 'Headphones1',
		price: 220,
		img: 'assets/images/head1.png',
		category: 'headphones',
		quantity: 0,
		id: 0,
	},
	{
		title: 'Headphones2',
		price: 100,
		img: 'assets/images/head2.png',
		category: 'headphones',
		quantity: 0,
		id: 1,
	},
	{
		title: 'Headphones3',
		price: 150,
		img: 'assets/images/head3.png',
		category: 'headphones',
		quantity: 0,
		id: 2,
	},
	{
		title: 'Headphones4',
		price: 350,
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
		price: 100,
		img: 'assets/images/buds2.png',
		category: 'earbuds',
		quantity: 0,
		id: 5,
	},
	{
		title: 'Microphone1',
		price: 350,
		img: 'assets/images/mic1.png',
		category: 'microphones',
		quantity: 0,
		id: 6,
	},
	{
		title: 'Microphone2',
		price: 300,
		img: 'assets/images/mic2.png',
		category: 'microphones',
		quantity: 0,
		id: 7,
	},
	{
		title: 'Microphone3',
		price: 225,
		img: 'assets/images/mic3.png',
		category: 'microphones',
		quantity: 0,
		id: 8,
	},
];

const cartItems = [];

console.log(sortFilter.options[0].value);

const sortHandler = (event) => {
	const selected = (sortFilter.value = event.target.value);
	if (selected == 'A-Z') {
		shopItems.sort((a, b) => a.title.localeCompare(b.title));
	} else if (selected == 'Z-A') {
		shopItems.sort((a, b) => -1 * a.title.localeCompare(b.title));
	} else if (selected == 'lth') {
		shopItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
	} else if (selected == 'htl') {
		shopItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
	}
	shopContentHandler();
};

const cartQuantityHandler = (id) => {
	cartItems.forEach((cartItem) =>
		cartItem.id === id ? cartItem.quantity++ : ''
	);
};

const cartPriceHandler = () => {
	cartPrice.textContent = `Total price: $${cartItems.reduce((total, item) => {
		return total + item.quantity * item.price;
	}, 0)}
	`;
};

const buyHandler = () => {
	cartItems.length = 0;
	cartContentHandler();
	cartPrice.textContent = 'Total price: $0';
};

const filterInputTermHandler = () => {
	const filterTerm = filterInput.value;
	shopContentHandler(filterTerm.trim());
	btnHighlightHandler(0);
};
const filterBtnTermHandler = (term) => {
	shopContentHandler(term.trim());
	filterInput.value = '';
};
const btnHighlightHandler = (index) => {
	filterBtns.forEach((btn) => btn.classList.remove('navbar__btn--active'));
	filterBtns[index].classList.add('navbar__btn--active');
};

const cartContentHandler = () => {
	cartContent.innerHTML = '';
	cartItems.forEach((item, itemIndex) => {
		cartContent.innerHTML += `
			<div class="cart__item" id="${itemIndex}">
				<img src="${item.img}" alt="" class="item__img" />
				<div class="item__description">
					<h2 class="item__title">${item.title}</h2>
					<p class="item__price">$${item.price}</p>
					<input type="number" class="item__quantity" value="${item.quantity}" max="99" min="1" data-key="0" />
				</div>
				<span class="material-symbols-outlined item__delete" data-key="0">delete</span>
			</div>
		
		`;
	});
};

// CART ITEM QUANTITY AND DELETE HANDLERS

cartContent.addEventListener('click', (event) => {
	const cartItemTitle = event.target
		.closest('div')
		.querySelector('.item__title').textContent;
	const cartItemId = parseInt(event.target.closest('div').id);

	if (event.target.tagName === 'INPUT') {
		const cartInputValue = event.target.closest('input').value;
		cartItems.forEach((cartItem) =>
			cartItem.title === cartItemTitle
				? (cartItem.quantity = cartInputValue)
				: ''
		);
	} else if (event.target.tagName === 'SPAN') {
		cartItems.forEach((cartItem) => {
			cartItem.title === cartItemTitle ? cartItems.splice(cartItemId, 1) : '';
		});
	}

	cartContentHandler();
	cartPriceHandler();
});

// SHOP CONTENT RENDER HANDLER

const shopContentHandler = (filter = '') => {
	shopContent.innerHTML = '';
	filteredShopItems = !filter
		? shopItems
		: shopItems.filter(
				(shopItem) =>
					shopItem.title.toLowerCase().includes(filter.toLowerCase()) ||
					shopItem.category.toLowerCase().includes(filter.toLowerCase())
		  );
	filteredShopItems.forEach((item) => {
		shopContent.innerHTML += `
            <div class="card" id="${item.id}">
				<img src="${item.img}" alt="" class="card__img" />
				<h2 class="card__title">${item.title}</h2>
				<p class="card__price">$${item.price}</p>
				<span class="material-symbols-outlined card__icon">
					shopping_cart
				</span>
			</div>
        
        `;
	});
};
shopContentHandler();

// SHOP CONTENT ADD TO CART HANDLER

shopContent.addEventListener('click', (event) => {
	if (event.target.tagName === 'SPAN') {
		const shopItemId = parseInt(event.target.closest('div').id);
		const shopItemTitle = event.target
			.closest('div')
			.querySelector('.card__title').textContent;
		const isContain = cartItems.some((item) => item.title == shopItemTitle);

		cartBody.classList.add('cart--visible');
		if (isContain) {
			cartQuantityHandler(shopItemId);
		} else {
			if (shopItems[shopItemId].title === shopItemTitle) {
				cartItems.push(shopItems[shopItemId]);
				cartQuantityHandler(shopItemId);
			}
		}
		cartContentHandler();
		cartPriceHandler();
	}
});

// CART OPEN AND CLOSE HANDLERS

cartOpenBtn.addEventListener('click', () => {
	cartBody.classList.add('cart--visible');
});

// CHECK CLOSE MODAL

document.body.addEventListener('click', (event) => {
	if (
		(!event.target.closest('.cart') &&
			!event.target.closest('.cart__item') &&
			!event.target.closest('.page-heading') &&
			!event.target.matches('.header__icon') &&
			!event.target.matches('.card__icon')) ||
		event.target.matches('.cart__close')
	) {
		cartBody.classList.remove('cart--visible');
	}
});

// SHOP FILTERS HANDLERS

filterInput.addEventListener('keyup', filterInputTermHandler);
filterBtns.forEach((btn, index) => {
	btn.addEventListener('click', (event) => {
		btnHighlightHandler(index);

		if (event.target.tagName === 'H1') {
			shopContentHandler();
		} else {
			filterBtnTermHandler(btn.textContent);
		}
	});
});

// CART CONTENT QUANTITY
cartContent.addEventListener('click', (event) => {
	if (event.target.tagName === 'INPUT') {
	}
});

// CART BUY HANDLER

buyBtn.addEventListener('click', buyHandler);

sortFilter.addEventListener('change', sortHandler);
