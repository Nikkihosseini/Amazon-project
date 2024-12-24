function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
    
        loadFromLocalStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey))
        
             if(!this.cartItems){
                this.cartItems = [
                    {
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        quantity: 2,
                        deliveryOptionsId: '2'
                    },
                    {
                        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                        quantity: 2,
                        deliveryOptionsId: '1'
                    }
                ]
            }
        },
    
        saveToLcalstorage(){
            localStorage.setItem(localStorageKey , JSON.stringify(this.cartItems))
        },
    
        
    
        addToCat(productId, quantity){
            let matchingItem;
    
            this.cartItems.forEach(cartItem => {
                if(productId === cartItem.id){
                    matchingItem = cartItem
                }
            })
    
            if(matchingItem){
                matchingItem.quantity += quantity;
            }else {
                this.cartItems.push({
                    id: productId,
                    quantity,
                    deliveryOptionsId: '1'
                })
            }
            this.saveToLcalstorage()
        },
    
        
        removeItemFromCart(productId){
    
            let newCart = []
    
            this.cartItems.forEach((item) => {
                if(productId !== item.id){
                    newCart.push(item)
                }
            })
            this.cartItems = newCart;
            this.saveToLcalstorage()
        },
    
        
        updateDeliveryOptions(productId, deliveryOptionsId){
            let matchingItem;
    
            this.cartItems.forEach(cartItem => {
                if(productId === cartItem.id){
                    matchingItem = cartItem
                }
            })
    
            matchingItem.deliveryOptionsId = deliveryOptionsId;
    
            this.saveToLcalstorage()
    },

    
    updateQuantity(productId, newQuantity) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.id) {
            matchingItem = cartItem;
        }
        });
    
        matchingItem.quantity = newQuantity;
    
        this.saveToLcalstorage()
    }
    
    }
    
    return cart;
}


const cart = Cart('cart-oop');

const businessCart = Cart('cart-business');



cart.loadFromLocalStorage()
businessCart.loadFromLocalStorage()

console.log(cart)
console.log(businessCart)








