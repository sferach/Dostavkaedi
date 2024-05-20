const food = [
    {
        name: 'Гамбургер простой',
        price: 10000,
        amount: 0,
        kcall: 500,
        id: 'plainBurger',
    },
    {
        name: 'Гамбургер Fresh',
        price: 20500,
        amount: 0,
        kcall: 630,
        id: 'freshBurger'
    },
    {
        name: 'Fresh Combo',
        price: 31900,
        amount: 0,
        kcall: 800,
        id: 'freshCombo'
    },
];

const dataExtra = [
    {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 50,
        extraId: 'doubleMayonnaise'
    },
    {
        name: 'Салатный лист',
        price: 1000,
        kcall: 20,
        extraId: 'lettuce'
    },
    {
        name: 'Сыр',
        price: 3000,
        kcall: 35,
        extraId: 'cheese'
    },
];
const calc = (amount, something) => amount * something;
// document.querySelector('.main__product').addEventListener('click', function(e){
//     console.log(this); //всегда будет отдавать сам элемент
//     console.log(e.target);//будет отдавать конкретный элемент над которым идет действие
// });
const btns = document.querySelectorAll('.main__product-btn');
for (const it of btns) {
   it.addEventListener('click', function(e){
       e.preventDefault();
       countBurgers(this); 
   })
}
function countBurgers(btn){
    const parent = btn.closest('.main__product'),//ищет ближайший элемент с таким классом
        parentId = parent.getAttribute('id'),
        count = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        symbol = btn.getAttribute('data-symbol');
    let index = food.findIndex(item => item.id == parentId);

   if(symbol == '+' && food[index].amount < 10){
       food[index].amount++;
   }
   else if(symbol == '-' && food[index].amount > 0){
       food[index].amount--;
   }
   count.textContent = food[index].amount;
   price.textContent = calc(food[index].amount, food[index].price);
   kcall.textContent = calc(food[index].amount, food[index].kcall);
};

const extraBtns = document.querySelectorAll('.main__product-checkbox');
extraBtns.forEach(item => {
    item.addEventListener('click', function(){
        countExtraProducts(this);
    });
});
function countExtraProducts(btn){
    const parent = btn.closest('.main__product'),//ищет ближайший элемент с таким классом
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        symbol = btn.getAttribute('data-extra');
    let extraId = dataExtra.findIndex(item => item.extraId == symbol);
    let index = food.findIndex(item => item.id == parentId);
    food[index][symbol] = btn.checked;
    if(food[index][symbol]){
        food[index].price += dataExtra[extraId].price;
        food[index].kcall += dataExtra[extraId].kcall;
    }
    else {
        food[index].price -= dataExtra[extraId].price;
        food[index].kcall -= dataExtra[extraId].kcall;
    }
    price.textContent = calc(food[index].amount, food[index].price);
    kcall.textContent = calc(food[index].amount, food[index].kcall);
}

//подсчет до 100lvl
const headerTimer = document.querySelector('.header__timer-extra');
function timer(){
    if(headerTimer.textContent < 100){
        headerTimer.textContent++;
        setTimeout(timer, 50);
    }
}
timer();


const orderBtn = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window-out'),
    payBtn = document.querySelector('.receipt__window-btn');

orderBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(food.some(item => item.amount > 0 ? item : false)){
        receipt.classList.add('active');
        let totalName = '';
        let totalPrice = 0;
        let totalKcall = 0;
        for (let i = 0; i < food.length; i++) {
           if(food[i].amount > 0){
               totalName += `${food[i].name} - ${food[i].amount}шт\n`;
               totalPrice += calc(food[i].amount, food[i].price);
               totalKcall += calc(food[i].amount, food[i].kcall);
               console.log(food[i]);
               for (const key in food[i]) {
                    if(food[i][key] === true){
                        let data = dataExtra.findIndex(item => item.extraId == key);
                        totalName += `\t${dataExtra[data].name}\n`;
                    }
               } 
           } 
        }
        receiptWindow.innerHTML = `Ваш заказ:\n${totalName}<p>Общая стоимость: ${totalPrice}</p><p>Общая калорийность: ${totalKcall}</p>`; 
    }
    else alert('Вы ничего не заказали! лол');
});


payBtn.addEventListener('click', function(){
    window.location.reload();
});

const mainProductInfo = document.querySelectorAll('.main__product-info'),
    view = document.querySelector('.view'),
    viewImg = view.querySelector('img');

mainProductInfo.forEach(item => {
    item.addEventListener('click', function(){
       let curImg = this.querySelector('img');
       view.classList.add('active');
       viewImg.src = curImg.src;
    });
});

// view.addEventListener('click', function(e){
//     if(!e.target.closest('img')){
//         view.classList.remove('active');
//     }
// })
view.addEventListener('click', function(e){
    view.classList.remove('active');
})
viewImg.addEventListener('click', function(e){
    e.stopPropagation();
})