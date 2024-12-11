export let cart = [
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1
    }
]

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
            quantity: 1
        })
    }
}