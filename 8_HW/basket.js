"use strict"

const basketCounter = document.querySelector('.cartIconWrap span');
const totalValue = document.querySelector('.totalAmountValue');
const basketEl = document.querySelector('.basket');
const table = document.querySelector('tbody');
document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {};
function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
  return Object.values(basket).reduce((acc, product) => acc + product.count * product.itemPrice, 0);
}

function renderBasketInfo(id) {
  const basketRow = basketEl.querySelector(`.basketRow[data-productId="${id}"]`);
  if (!basketRow) {
    return renderBasketMarkUP(id);
  }
  basketRow.querySelector('.productCount').textContent = basket[id].count;
  basketRow.querySelector('.productTotalPrice').textContent = basket[id].count * basket[id].itemPrice;
}

function renderBasketMarkUP(productId) {
const productTr = ` 
 <tr class="basketRow" data-productId="${productId}">
    <td class="productName">${basket[productId].itemName}</td>
    <td class="productCount">${basket[productId].count}</td>
    <td class="productPrice">${basket[productId].itemPrice}</td>
    <td class="productTotalPrice">${basket[productId].itemPrice * basket[productId].count}</td>
  </tr>
`;
  table.insertAdjacentHTML('afterbegin', productTr);
}

function addToCart(itemId,itemPrice,itemName) {
  if (!(itemId in basket)) {
    basket[itemId] = {itemId, itemName, itemPrice, count: 0};
  }
  basket[itemId].count++;
  basketCounter.textContent = getTotalBasketCount().toString();
  totalValue.textContent = getTotalBasketPrice().toFixed(2);
  console.log(totalValue.textContent);
  renderBasketInfo(itemId);
}

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!event.target.classList.contains('addToCartBtn')) {
    return;
  }
  const featuredItem = event.target.closest('.featuredItem');
  const itemId = +featuredItem.dataset.id;
  const itemPrice = +featuredItem.dataset.price;
  const itemName = featuredItem.dataset.name;
  addToCart(itemId,itemPrice,itemName);
});

