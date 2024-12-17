import {cart, removeItemFromCart, updateDeliveryOptions} from "../../data/cart.js"
import {products} from "../../data/products.js"
import {formatCurrency} from "../utils/money.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../../data/deliveryOptions.js";




const $ = document

export function renderOrderSummary(){

  let cartItemWrapper = ''

  cart.forEach((cartItem) => {
      const productId = cartItem.id

      let matchingProduct ;

      products.forEach((product) => {
          if(product.id === productId){
              matchingProduct = product
          }
      })


      const deliveryOptionsId = cartItem.deliveryOptionsId;

      let deliveryOption;


      deliveryOptions.forEach((option) => {
      
        if(option.id === deliveryOptionsId){
          deliveryOption = option;
        }

      });

      const today = dayjs()
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      )
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      )


      cartItemWrapper += `
          <div class="cart-item-container cart-item-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}" alt="product-img">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                      $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label"> ${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary delete-btn" data-id="${cartItem.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                    ${deliveryOptionsHTML(matchingProduct , cartItem)}
                </div>
              </div>
            </div>
      `
  })

  function deliveryOptionsHTML(matchingProduct , cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs()
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      )
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      )

      const priceString = deliveryOption.priceCents
        === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;


      html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ?'checked' :''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              $${priceString} - Shipping
            </div>
          </div>
      </div>
      `
    })

    return html;
  }


  $.querySelector('.order-summary')
      .innerHTML = cartItemWrapper

  $.querySelectorAll('.delete-btn')
      .forEach((btn) =>{
      btn.addEventListener('click', () => {
          const productId = btn.dataset.id

          removeItemFromCart(productId)


        const container = $.querySelector(`.cart-item-${productId}`)

          container.remove()
      })
  })


  $.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click' , () => {
          const {productId , deliveryOptionsId} = element.dataset
          updateDeliveryOptions(productId, deliveryOptionsId)
          renderOrderSummary()
      })
    })

  }
