import {menuArray} from './data.js';
let message= document.getElementById("message-space")
let arrayOrder = []
let pay = false
let orderIsCompleted = false

document.addEventListener('click',function(e){
    if(e.target.dataset.add){
        handleAdd(e.target.dataset.add)
    }
    if (e.target.dataset.complete){
        handleCompleteOrder()
    }
    if (e.target.dataset.pay){
        completePayment()
    }
    if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
    }
    
})

/*add button handle*/
function handleAdd(itemId){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    targetItemObj.isAdded = !targetItemObj.isAdded
    /*add to the order array*/ 
    if (targetItemObj.isAdded){
        arrayOrder.push(targetItemObj)
    }else{
        const index = arrayOrder.indexOf(targetItemObj)
        if(index !== -1){
            arrayOrder.splice(index,1);
        }
        
    }

    renderOrder()
    render()

}

function handleRemoveBtn(itemId){
    const targetItemObj = arrayOrder.filter(function(item){
        return item.id == itemId
    })[0]
    const index = arrayOrder.indexOf(targetItemObj)
        if(index !== -1){
            arrayOrder.splice(index,1);
        }
    
    resetItemIsAdded()
    renderOrder()
    render()
}

function handleCompleteOrder(){
    let readyToPay = document.getElementById("pop-up").style;
    if(!pay){
        readyToPay.display = "flex"
    }else{
        readyToPay.display = "none"
    }
    pay = !pay
}
function resetItemIsAdded(){
    menuArray.forEach(function(item){
        if (item.isAdded){
            item.isAdded = false
        }
    })
}

function completePayment(){
    handleCompleteOrder()
    resetItemIsAdded()
    arrayOrder =[]
    renderOrder()
    render()
    renderConfirmationMessage()
    
}

function orderCompleted(){
    orderIsCompleted = !orderIsCompleted
    
    if(orderIsCompleted){
        message.style.display="flex"
    }else{
        message.style.display="none"
    }
    return `
            <div class="message">
                <h1 class="message-h1">Thank you! , you'r order is on it's way</h1>
            </div>`
}

function getOrderHtml(){
    if(message.style.display == "flex"){
        message.style.display = "none"
    }
    if (orderIsCompleted){
        orderIsCompleted = !orderIsCompleted
    }
    const basketObj = document.getElementById("basket");

    let orderHtml = ''

    if ( arrayOrder.length > 0){
        basketObj.style.display="flex"
    }else{
        basketObj.style.display="none"
    }

    /**render the order items */
    arrayOrder.forEach(function(orderItem){

        orderHtml+=`
            <div class="order-item" >
                <p>${orderItem.name} <span class="remove-item" data-remove="${orderItem.id}">remove</span></p>
                <p>$${orderItem.price}</p>
            </div>`

    })
    /**render the total price  */

    let total = arrayOrder.reduce((sum,item)=> sum + item.price,0)
    orderHtml +=`
        <div class="total-price">
            <p>Total price:</p>
            <p>$${total}</p>
        </div>
    `
    return orderHtml

}



function getFeedHtml(){
    let feedHtml =''

    menuArray.forEach(function(item){

        /*Check if item is added*/
        let addedProperty = ''
        if (item.isAdded){
            addedProperty = 'added'
            
        }


        
        feedHtml+= `               
                <div class="item">
                    <div class="item-inner">
                        <div class="item-image">
                            <p class="item-emoji">${item.emoji}</p>
                        </div>
                        <div class="item-details">
                            <h1 class="item-name">${item.name}</h1>
                            <p class="item-description">${item.ingredients}</p>
                            <p class="item-price">$${item.price}</p>
                        </div>
                        <div class="add-item">
                            <i class="fa-solid fa-circle-plus ${addedProperty}" 
                            data-add="${item.id}"></i> 
                        </div>
                    </div>
                 </div>
                 `
        
    })
    return feedHtml
}


function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}
function renderOrder(){
    document.getElementById("items-to-render").innerHTML = getOrderHtml()
}
function renderConfirmationMessage(){
    message.innerHTML = orderCompleted()
}

render()



