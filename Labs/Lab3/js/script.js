if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var addTobasketButtons = document.getElementsByClassName('shop-button')
    for (var i = 0; i < addTobasketButtons.length; i++) {
        var button = addTobasketButtons[i]
        button.addEventListener('click', addTobasketClicked)
    }

    var RemoveFromBasketButtons = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < RemoveFromBasketButtons.length; i++) {
        var button = RemoveFromBasketButtons[i]
        button.addEventListener('click', RemoveFromBasketClicked)
    }

    var quantityInputs = document.getElementsByClassName('basket-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function addTobasketClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var name = shopItem.getElementsByClassName('name')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var image = shopItem.getElementsByClassName('store-image')[0].src
    addItemTobasket(name, price, image)
    updatebasketTotal()
}

function addItemTobasket(name, price, image) {
    var basketRow = document.createElement('div')
    basketRow.classList.add('basket-row')
    var basketItems = document.getElementsByClassName('basket-items')[0]
    var basketItemNames = basketItems.getElementsByClassName('basket-item-title')
    for (var i = 0; i < basketItemNames.length; i++) {
        if (basketItemNames[i].innerText == name) {
            alert('Цей предмет вже є у вашому кошику. Якщо хочете замовити кілька пар, скористайтесь параметром "Кількість" у кошику.')
            return
        }
    }
    var basketRowContents = `
        <div class="basket-item basket-column">
            <img class="basket-item-image" src="${image}" width="100" height="100">
            <span class="basket-item-title">${name}</span>
        </div>
        <span class="basket-price basket-column">${price}</span>
        <div class="basket-quantity basket-column">
            <input class="basket-quantity-input" type="number" value="1">
            <button class="btn btn-remove" type="button">Прибрати з кошика</button>
        </div>`
    basketRow.innerHTML = basketRowContents
    basketItems.append(basketRow)
    basketRow.getElementsByClassName('btn-remove')[0].addEventListener('click', RemoveFromBasketClicked)
    basketRow.getElementsByClassName('basket-quantity-input')[0].addEventListener('change', quantityChanged)
}

function RemoveFromBasketClicked(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updatebasketTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatebasketTotal()
}

function purchaseClicked() {
    alert('Дякуємо за замовлення!')
    var basketItems = document.getElementsByClassName('basket-items')[0]
    while (basketItems.hasChildNodes()) {
        basketItems.removeChild(basketItems.firstChild)
    }
    updatebasketTotal()
}

function updatebasketTotal() {
    var basketItemContainer = document.getElementsByClassName('basket-items')[0]
    var basketRows = basketItemContainer.getElementsByClassName('basket-row')
    var total = 0
    for (var i = 0; i < basketRows.length; i++) {
        var basketRow = basketRows[i]
        var priceElement = basketRow.getElementsByClassName('basket-price')[0]
        var quantityElement = basketRow.getElementsByClassName('basket-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₴', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('basket-total-price')[0].innerText = '₴' + total
}