const filterSort = document.querySelector('#navbar__select');
const filterInput = document.querySelector('#navbar__input');
const filterBtns = [...document.querySelectorAll('.btn--filter')];
const shopContent = document.querySelector('.content');
const cartBody = document.querySelector('.cart');
const cartContent = document.querySelector('.cart__content');
const cartOpenBtn = document.querySelectorAll('.header__icon')[1];
const cartCloseBtn = document.querySelector('.cart__close');
const cartPrice = document.querySelector('.cart__price');
const cartBuyBtn = document.querySelector('.cart__buy');

let filterCategory;

const shopItems = [
	{
		title: 'HeadsPro',
		price: 99.99,
		img: 'assets/images/head1.png',
		category: 'headphones',
		quantity: 0,
		id: 1,
	},
	{
		title: 'HeadsMax',
		price: 159.99,
		img: 'assets/images/head2.png',
		category: 'headphones',
		quantity: 0,
		id: 2,
	},
	{
		title: 'NovHeads',
		price: 399.99,
		img: 'assets/images/head3.png',
		category: 'headphones',
		quantity: 0,
		id: 3,
	},
	{
		title: 'HeadsBuds',
		price: 299.99,
		img: 'assets/images/head4.png',
		category: 'headphones',
		quantity: 0,
		id: 4,
	},
	{
		title: 'StudHead',
		price: 350.99,
		img: 'assets/images/head5.png',
		category: 'headphones',
		quantity: 0,
		id: 5,
	},
	{
		title: 'BudsLite',
		price: 49.99,
		img: 'assets/images/buds1.png',
		category: 'earbuds',
		quantity: 0,
		id: 6,
	},
	{
		title: 'BudsPro',
		price: 249.99,
		img: 'assets/images/buds2.png',
		category: 'earbuds',
		quantity: 0,
		id: 7,
	},
	{
		title: 'BudsGo',
		price: 120.99,
		img: 'assets/images/buds3.png',
		category: 'earbuds',
		quantity: 0,
		id: 8,
	},
	{
		title: 'SonMic',
		price: 125.99,
		img: 'assets/images/mic1.png',
		category: 'microphones',
		quantity: 0,
		id: 9,
	},
	{
		title: 'StudMic',
		price: 599.99,
		img: 'assets/images/mic2.png',
		category: 'microphones',
		quantity: 0,
		id: 10,
	},
	{
		title: 'SonMic Pro',
		price: 399.99,
		img: 'assets/images/mic3.png',
		category: 'microphones',
		quantity: 0,
		id: 11,
	},
	{
		title: 'StudMic Pro',
		price: 899.99,
		img: 'assets/images/mic4.png',
		category: 'microphones',
		quantity: 0,
		id: 12,
	},
];

const cartItems = [];

// Handlers to manage shopContent filtering and sorting [NAVBAR]
const inputFilterHandler = () => {
	filterCategory = filterInput.value;
	shopContentRenderer(filterCategory.trim());
	btnHighlightHandler(0);
};
const btnFilterHandler = (term) => {
	filterCategory = term;
	shopContentRenderer(term.trim());
	filterInput.value = '';
};
const btnHighlightHandler = (index) => {
	filterBtns.forEach((btn) => btn.classList.remove('navbar__btn--active'));
	filterBtns[index].classList.add('navbar__btn--active');
};
const sortHandler = (items) => {
	const selectedSort = filterSort.value;
	if (selectedSort === 'A-Z') {
		items.sort((a, b) => a.title.localeCompare(b.title));
	} else if (selectedSort === 'Z-A') {
		items.sort((a, b) => -1 * a.title.localeCompare(b.title));
	} else if (selectedSort === 'lth') {
		items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
	} else if (selectedSort === 'htl') {
		items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
	} else if (selectedSort === 'featured') {
		items.sort((a, b) => a.id - b.id);
	}
};

// Handlers to manage cart quantity, price and buying [CART]
const cartQuantityHandler = (title) =>
	cartItems.forEach((item) => (item.title === title ? item.quantity++ : ''));

const cartPriceHandler = () => {
	cartPrice.textContent = `Total price: $${cartItems.reduce((total, item) => {
		return Math.round(total + item.quantity * item.price);
	}, 0)}
	`;
};
const cartBuyHandler = () => {
	cartItems.length = 0;
	cartPrice.textContent = 'Total price: $0';
	shopItems.forEach((item) => (item.quantity = 0));
	cartContentRenderer();
};

// Shop and cart content renderers
const shopContentRenderer = (filter = '') => {
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
const cartContentRenderer = () => {
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

// Eventlistener to manage shop item add to cart
shopContent.addEventListener('click', (event) => {
	if (event.target.tagName === 'SPAN') {
		const shopItemTitle = event.target
			.closest('div')
			.querySelector('.shop-card__title').textContent;
		const isContain = cartItems.some((item) => item.title === shopItemTitle);

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
		cartPriceHandler();
		cartContentRenderer();
	}
});

// Eventlisteners to manage shopContent filtering and sorting
filterInput.addEventListener('keyup', inputFilterHandler);
filterBtns.forEach((btn, index) => {
	btn.addEventListener('click', (event) => {
		btnHighlightHandler(index);

		if (event.target.tagName === 'H1') {
			shopContentRenderer();
			filterCategory = '';
		} else {
			btnFilterHandler(btn.textContent);
		}
	});
});
filterSort.addEventListener('change', () => {
	shopContentRenderer(filterCategory);
});

// EventListeners to manage cart item quantity and cart item cart removal
cartContent.addEventListener('click', (event) => {
	const cartItemTitle = event.target
		.closest('div')
		.querySelector('.cart-card__title').textContent;

	if (event.target.tagName === 'INPUT') {
		const cartQuantityValue = event.target.closest('input').value;
		cartItems.forEach((item) =>
			item.title === cartItemTitle ? (item.quantity = cartQuantityValue) : ''
		);
	} else if (event.target.tagName === 'SPAN') {
		cartItems.forEach((item) => {
			if (item.title === cartItemTitle) {
				const itemIndex = cartItems.indexOf(item);
				item.quantity = 0;
				cartItems.splice(itemIndex, 1);
			}
		});
	}
	cartPriceHandler();
	cartContentRenderer();
});

// Eventlisteners to manage cart open and close
cartOpenBtn.addEventListener('click', () => {
	cartBody.classList.add('cart--visible');
});
document.body.addEventListener('click', (event) => {
	if (
		(!event.target.closest('.cart') &&
			!event.target.closest('.cart-card') &&
			!event.target.closest('.page-heading') &&
			!event.target.closest('.shop-card') &&
			!event.target.matches('.header__icon') &&
			!event.target.matches('.shop-card__icon')) ||
		event.target.matches('.cart__close')
	) {
		cartBody.classList.remove('cart--visible');
	}
});

// EventListener to manage cart buy
cartBuyBtn.addEventListener('click', cartBuyHandler);

shopContentRenderer();
