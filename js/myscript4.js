var mydata;

function loadData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var jsObject = JSON.parse(xhttp.responseText);
            valueCallBack(jsObject);
        }
    };

    xhttp.open("GET", "../json/foods.json");
    xhttp.send();
}
//----------------------------------------------------------------
function valueCallBack(jsObject) {
    mydata = jsObject;
}

//----------------------------------------------------------------
function getFoodsFromLocalStorage() {
    let foods;
    let josnStrFoods = localStorage.getItem('foods');
    if (josnStrFoods === null) {
        foods = []
    } else {
        foods = JSON.parse(josnStrFoods)
    }
    return foods;
}
//----------------------------------------------------------------
function getCurrentProduct(index = -1) {
    var product;
    if (index == -1) {
        const urlParams = new URLSearchParams(window.location.search);
        const group_id = urlParams.get('group');
        const product_id = urlParams.get('product');
        product = mydata.product_groups[group_id].group_products[product_id];
        return product;
    } else {
        const foods = getFoodsFromLocalStorage();
        product = foods[index];
    }
    return product;
}
//----------------------------------------------------------------
function plusNumber(i) {
    var number = Number(document.getElementById("number_" + i).value);
    number++;
    document.getElementById("number_" + i).value = number;

    select_food = getCurrentProduct(i)
    addToMemory(select_food, 1);
    create_shopcart_table();
}

//----------------------------------------------------------------
function minusNumber(i) {
    var number = Number(document.getElementById("number_" + i).value);
    if (number > 1) {
        number--;
        document.getElementById("number_" + i).value = number;

        select_food = getCurrentProduct(i)
        addToMemory(select_food, -1);
        create_shopcart_table();
    }
}

//----------------------------------------------------------------
var shopCart = []

function addToShopCart(type_index) {
    var product = getCurrentProduct(-1);
    var select_food = {
        id: product.product_id,
        name: product.product_name,
        image: product.product_image[0],
        type: product.product_type[type_index],
        price: product.product_price[type_index],
        qty: 1
    }
    addToMemory(select_food, 1);
}

//----------------------------------------------------------------
function addToMemory(select_food, count) {
    const foods = getFoodsFromLocalStorage();
    var index = -1;
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        if (food.id === select_food.id && food.price === select_food.price) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        foods.push(select_food);
    } else {
        foods[index].qty += count;
    }

    josnStrFoods = JSON.stringify(foods);
    localStorage.setItem('foods', josnStrFoods);
    update_shopcart_number();
    update_shopcart_Total()
}

//----------------------------------------------------------------
function removeFromMemory(index) {
    const foods = getFoodsFromLocalStorage();
    for (let i = 0; i < foods.length; i++) {
        if (i === index) {
            foods.splice(i, 1);
        }
    }
    josnStrFoods = JSON.stringify(foods);
    localStorage.setItem('foods', josnStrFoods);
    update_shopcart_number();
    create_shopcart_table();
    update_shopcart_Total()
}

//----------------------------------------------------------------
function update_shopcart_number() {
    let josnStrFoods = localStorage.getItem('foods');
    foods = JSON.parse(josnStrFoods);
    var len = 0;
    if (foods !== null) {
        len = foods.length;
    }
    document.getElementById("shopcart-count").innerText = '(' + len + ')';
    document.getElementById("shopcart-count2").innerText = '(' + len + ')';
}

//----------------------------------------------------------------
function update_shopcart_Total() {
    let josnStrFoods = localStorage.getItem('foods');
    foods = JSON.parse(josnStrFoods);

    var sum = 0;
    for (let i = 0; i < foods.length; i++) {
        const element = foods[i];
        sum += element.price * element.qty;
    }
    document.getElementById("total-price").innerText = sum;
}

//----------------------------------------------------------------
function update_shopcart_table(index) {

}
//----------------------------------------------------------------
/* 

<td class="td-2">
    <img src="images/shop-cart-1-130x130.png" alt="" width="130" height="130">
</td>
<td class="td-3">سبد مخلوط میوه</td>
<td class="td-4">34,000 تومان</td>
<td class="td-5">3 عدد</td>
<td class="td-6">
<a onclick="removeFromMemory(1)"><i class="fa fa-times"></i></a>
</td> */




function create_shopcart_row(rowIndex, id, name, image, type, price, qty) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.classList.add('td-1');
    var div1 = document.createElement('div');
    div1.classList.add('number');
    var span1 = document.createElement('span');
    span1.setAttribute('id', 'plus_' + rowIndex);
    span1.setAttribute('onclick', 'plusNumber(' + rowIndex + ')');
    var input1 = document.createElement('input');
    input1.setAttribute('type', 'number');
    input1.setAttribute('id', 'number_' + rowIndex);
    input1.setAttribute('readonly', '');
    input1.setAttribute('value', qty);
    var span2 = document.createElement('span');
    span2.setAttribute('id', 'minus_' + rowIndex);
    span2.setAttribute('onclick', 'minusNumber(' + rowIndex + ')');
    div1.appendChild(span1)
    div1.appendChild(input1)
    div1.appendChild(span2)
    td1.appendChild(div1);
    tr.appendChild(td1);


    var td2 = document.createElement('td');
    td2.classList.add('td-2');
    var img1 = document.createElement('img');
    img1.setAttribute('src', image);
    img1.setAttribute('width', '130');
    img1.setAttribute('height', '110');
    td2.appendChild(img1);
    tr.appendChild(td2);

    var td3 = document.createElement('td');
    td3.classList.add('td-3');
    td3.appendChild(document.createTextNode(name + '(' + type + ')'))
    tr.appendChild(td3);

    var td4 = document.createElement('td');
    td4.classList.add('td-4');
    td4.appendChild(document.createTextNode(price + " تومان"))
    tr.appendChild(td4);

    var td5 = document.createElement('td');
    td5.classList.add('td-5');
    td5.appendChild(document.createTextNode(qty + " عدد"))
    tr.appendChild(td5);

    var td6 = document.createElement('td');
    td6.classList.add('td-6');
    td6.appendChild(document.createTextNode(qty * price))
    tr.appendChild(td6);

    var td7 = document.createElement('td');
    var a1 = document.createElement('a');
    var i1 = document.createElement('i');
    i1.classList.add('fa');
    i1.classList.add('fa-times');
    a1.setAttribute('onclick', 'removeFromMemory(' + rowIndex + ')');
    a1.appendChild(i1);
    td7.appendChild(a1)
    tr.appendChild(td7);
    return tr;
}
//----------------------------------------------------------------
function create_shopcart_table() {
    var shopcartTable = document.getElementById("shopcart-table");
    shopcartTable.innerHTML = '';
    const foods = getFoodsFromLocalStorage();
    for (let i = 0; i < foods.length; i++) {
        const element = foods[i];

        var tr = create_shopcart_row(i, element.id, element.name, element.image, element.type, element.price, element.qty)
        shopcartTable.appendChild(tr);

    }
}

//----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    loadData();
    //localStorage.clear();
    update_shopcart_number();
    update_shopcart_Total();

    create_shopcart_table();
});
//----------------------------------------------------------------