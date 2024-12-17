
export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart = [
        {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionsId: '1'
        }
    ]
}

export function saveToLcalstorage(){
    localStorage.setItem('cart' , JSON.stringify(cart))
}

export function addToCat(productId){
    let matchingItem;

    cart.forEach(cartItem => {
        if(productId === cartItem.id){
            matchingItem = cartItem
        }
    })

    if(matchingItem){
        matchingItem.quantity ++
    }else {
        cart.push({
            id: productId,
            quantity: 1,
            deliveryOptionsId: '1'
        })
    }
    saveToLcalstorage()
}


export function removeItemFromCart(productId){

    let newCart = []

    cart.forEach((item) => {
        if(productId !== item.id){
            newCart.push(item)
        }
    })
    cart = newCart;
    saveToLcalstorage()
}