import {products} from "../data/products.js";
import {cart, addToCat, saveToLcalstorage} from "../data/cart.js";
import {formatCurrency} from "./utils/money.js"

const $ = document



let html = '';
products.forEach((product) => {

    html += `
      <div class="product-container"> 
        <div class="product-image-container">
                <img alt="product-img" class="product-image" src="${product.image}"/>
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>
            <div class="product-rating-container">
                <img alt="stars" class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png"/>
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img alt="icon" src="images/icons/checkmark.png"/>
                Added
            </div>

            <button data-id="${product.id}" class="add-to-cart-button button-primary add-to-cart-btn">
                Add to Cart
            </button>
        </div>
    `
})

$.querySelector('.products-grid')
    .innerHTML = html

const addToCartBtn = $.querySelectorAll('.add-to-cart-btn')

function updateCartQuantity(){

    let cartQuantity = 0

    cart.forEach((item) => {
        cartQuantity += item.quantity
    })

    $.querySelector('.cart-quantity')
        .innerHTML = cartQuantity


}
updateCartQuantity()





addToCartBtn.forEach(btn => {
    btn.addEventListener('click' , () => {
        let productId = btn.dataset.id

        addToCat(productId)
        saveToLcalstorage()
        updateCartQuantity()
    })
})




