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



async function addCustomer(body, src, alt) {
    let customer = document.createElement('div');
    let CustomersContainer = document.querySelector('.clients');
    let CustomersContent = `
    <div class="comments">
        <img src="${src}" alt="${alt}">
        <p> "${body}" - ${alt} </p>
    </div>`;
    customer.innerHTML = CustomersContent;
    CustomersContainer.append(customer);
}

let response = fetch('https://dummyjson.com/posts?skip=24&limit=5').then(res => res.json()).then(json => parse(json.posts))
console.log(response);
async function parse(data) {
    for (let element = 0; element < data.length; element++) {
        let body = await data[element].body;
        console.log(body)
        let src = `./images/clients${element}.jpg`;
        let alt = `Client${element + 1}`;
        await addCustomer(body, src, alt)
    };
}





var WeatherForecastDisplay=(function() {

    var MONTHS=["Січ","Лют","Берез","Квіт","Трав","Черв","Лип","Серп","Верес","Жовт","Листоп","Груд"];
 
    function WeatherForecastWidget(selector) {

        this.config={
            "location":selector.attr("data-location"),
            "unitGroup":selector.attr("data-unitGroup") || "us",
            "key": selector.attr("data-key") 
        }

        this.selector=selector;

        this.data=null;

        var me=this;
        this.loadForecastData=function() {
            me.refresh();
            var uri="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?";
            uri+="unitGroup="+me.config.unitGroup+"&locationMode=single&aggregateHours=24&contentType=json&iconSet=icons1&location="+me.config.location+"&key="+me.config.key;
            $.get(uri, function( rawResult ) {
                me.data=rawResult;
                me.refresh();
            });
        }

        this.refresh=function() {
            var root=$(me.selector);

            if (!me.data) {
                $(me.selector).html("No data available for "+me.config.location);
                return;
            }
            var locationData=me.data.location;

            var forecastValues=locationData.values;

            root.toggleClass("forecastwidget", true);
            root.html("<div class='location'></div>"+
                        "<div class='days'></div>");

            root.children(".location").html(me.config.location);
            forecastValues.forEach(function(d) {
                var dayElement=$("<div class='day'>"+
                        "<div class='date'></div>"+
                        "<div class='icon'></div>"+
                        "<div class='maxt'></div>"+
                        "<div class='mint'></div>"+
                        "<div class='precip'><span class='value'></span></div>"+
                        "<div class='conditions'></div>"+
                        "</div>");
                
                root.find(".days").append(dayElement);
                
                dayElement.find(".maxt").html(Math.round(d.maxt));
                dayElement.find(".mint").html(Math.round(d.mint));
                dayElement.find(".conditions").html(d.conditions);
                

                var date= new Date(d.datetimeStr);
                
                dayElement.find(".date").html(MONTHS[date.getMonth()]+" "+date.getDate());

                var precip=dayElement.find(".precip");
                precip.toggleClass("hidden",  !d.precip);
                precip.find(".value").html(d.precip);
                
                var icon=dayElement.find(".icon");
                icon.toggleClass(d.icon,true);                 
            });
        }      
    }

    var attach=function(selector) {

        var instance=new WeatherForecastWidget($(selector) );
        instance.loadForecastData();
        return instance;
    }
    return {
        "attach":attach
    }
    
})();