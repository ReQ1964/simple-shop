const cartOpenBtn = document.querySelectorAll('.header__icon')[1];
const sortFilter = document.querySelector('#navbar__select');
const filterInput = document.querySelector('#navbar__input');
const filterBtns = [...document.querySelectorAll('.btn--filter')];
const shopContent = document.querySelector('.content');
const cartBody = document.querySelector('.cart');
const cartContent = document.querySelector('.cart__content');
const cartCloseBtn = document.querySelector('.cart__close');
const cartPrice = document.querySelector('.cart__price');
const buyBtn = document.querySelector('.cart__buy');

let filterCategory;
const shopItems = [
	{
		title: 'Headphones1',
		price: 220,
		img: 'assets/images/head1.png',
		category: 'headphones',
		quantity: 0,
	},
	{
		title: 'Headphones2',
		price: 100,
		img: 'assets/images/head2.png',
		category: 'headphones',
		quantity: 0,
	},
	{
		title: 'Headphones3',
		price: 150,
		img: 'assets/images/head3.png',
		category: 'headphones',
		quantity: 0,
	},
	{
		title: 'Headphones4',
		price: 350,
		img: 'assets/images/head4.png',
		category: 'headphones',
		quantity: 0,
	},
	{
		title: 'Earbuds1',
		price: 50,
		img: 'assets/images/buds1.png',
		category: 'earbuds',
		quantity: 0,
	},
	{
		title: 'Earbuds2',
		price: 100,
		img: 'assets/images/buds2.png',
		category: 'earbuds',
		quantity: 0,
	},
	{
		title: 'Microphone1',
		price: 350,
		img: 'assets/images/mic1.png',
		category: 'microphones',
		quantity: 0,
	},
	{
		title: 'Microphone2',
		price: 300,
		img: 'assets/images/mic2.png',
		category: 'microphones',
		quantity: 0,
	},
	{
		title: 'Microphone3',
		price: 225,
		img: 'assets/images/mic3.png',
		category: 'microphones',
		quantity: 0,
	},
];

const cartItems = [];

const sortHandler = (items) => {
	const selected = sortFilter.value;
	if (selected == 'A-Z') {
		items.sort((a, b) => a.title.localeCompare(b.title));
	} else if (selected == 'Z-A') {
		items.sort((a, b) => -1 * a.title.localeCompare(b.title));
	} else if (selected == 'lth') {
		items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
	} else if (selected == 'htl') {
		items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
	}
};

const cartQuantityHandler = (title) => {
	cartItems.forEach((cartItem) =>
		cartItem.title === title ? cartItem.quantity++ : ''
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
	cartPrice.textContent = 'Total price: $0';
	shopItems.forEach((shopItem) => (shopItem.quantity = 0));
	cartContentHandler();
};

const filterInputCategoryHandler = () => {
	filterCategory = filterInput.value;
	shopContentHandler(filterCategory.trim());
	btnHighlightHandler(0);
};
const filterBtnCategoryHandler = (term) => {
	filterCategory = term;
	shopContentHandler(term.trim());
	filterInput.value = '';
};
const btnHighlightHandler = (index) => {
	filterBtns.forEach((btn) => btn.classList.remove('navbar__btn--active'));
	filterBtns[index].classList.add('navbar__btn--active');
};

const cartContentHandler = () => {
	cartContent.innerHTML = '';
	cartItems.forEach((item) => {
		cartContent.innerHTML += `
			<div class="cart-card">
				<img src="${item.img}" alt="" class="cart-card__img" />
				<div class="cart-card__description">
					<h2 class="cart-card__title">${item.title}</h2>
					<p class="cart-card__price">$${item.price}</p>
					<input type="number" class="cart-card__quantity" value="${item.quantity}" max="99" min="1" data-key="0" />
				</div>
				<span class="material-symbols-outlined cart-card__delete" data-key="0">delete</span>
			</div>
		
		`;
	});
};

// CART ITEM QUANTITY AND DELETE HANDLERS

cartContent.addEventListener('click', (event) => {
	const cartItemTitle = event.target
		.closest('div')
		.querySelector('.item__title').textContent;

	if (event.target.tagName === 'INPUT') {
		const cartInputValue = event.target.closest('input').value;
		cartItems.forEach((cartItem) =>
			cartItem.title === cartItemTitle
				? (cartItem.quantity = cartInputValue)
				: ''
		);
	} else if (event.target.tagName === 'SPAN') {
		cartItems.forEach((cartItem) => {
			if (cartItem.title === cartItemTitle) {
				const itemIndex = cartItems.indexOf(cartItem);
				cartItem.quantity = 0;
				cartItems.splice(itemIndex, 1);
			}
		});
	}
	cartContentHandler();
	cartPriceHandler();
});

// SHOP CONTENT RENDER HANDLER

const shopContentHandler = (filter = '') => {
	shopContent.innerHTML = '';
	sortHandler(shopItems);
	filteredShopItems = !filter
		? shopItems
		: shopItems.filter(
				(shopItem) =>
					shopItem.title.toLowerCase().includes(filter.toLowerCase()) ||
					shopItem.category.toLowerCase().includes(filter.toLowerCase())
		  );

	filteredShopItems.forEach((item) => {
		shopContent.innerHTML += `
            <div class="shop-card">
				<img src="${item.img}" alt="" class="shop-card__img" />
				<h2 class="shop-card__title">${item.title}</h2>
				<p class="shop-card__price">$${item.price}</p>
				<span class="material-symbols-outlined shop-card__icon">
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
		const shopItemTitle = event.target
			.closest('div')
			.querySelector('.shop-card__title').textContent;
		const isContain = cartItems.some((item) => item.title == shopItemTitle);

		cartBody.classList.add('cart--visible');

		if (isContain) {
			cartQuantityHandler(shopItemTitle);
		} else {
			shopItems.forEach((shopItem) => {
				if (shopItem.title === shopItemTitle) {
					cartItems.push(shopItem);
					cartQuantityHandler(shopItemTitle);
				}
			});
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
			!event.target.matches('.shop-card__icon')) ||
		event.target.matches('.cart__close')
	) {
		cartBody.classList.remove('cart--visible');
	}
});

// SHOP FILTERS HANDLERS

filterInput.addEventListener('keyup', filterInputCategoryHandler);
filterBtns.forEach((btn, index) => {
	btn.addEventListener('click', (event) => {
		btnHighlightHandler(index);

		if (event.target.tagName === 'H1') {
			shopContentHandler();
			filterCategory = '';
		} else {
			filterBtnCategoryHandler(btn.textContent);
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

sortFilter.addEventListener('change', () => {
	shopContentHandler(filterCategory);
});

// 3. Sprawdzić cały kod czy brakuje funkcji.
// 4. Refaktoryzacja.
// COS JEST NIE TAK Z QUANTITY, POWIAZANIE SHOP ITEMS Z CART ITEMS, PO USUNIECIU ZOSTAJE QUANTITY

// ^^^^^^^^^^^^^^^^^ 	shopItems.forEach((shopItem) => (shopItem.quantity = 0)); TYMCZASOWY FIX
