var box = document.getElementById("item-box");
var priceBox = document.getElementById("total-price")
var caloryBox = document.getElementById("total-calorie")
//================================================
function loadData() {
    var address ="../json/food-items.json"
    fetch(address)
    .then(result=>result.json())
        .then(result =>result.items)
        .then(result=>result.forEach(obj => {
            var img=obj.image
            var id= obj.id
            var itemName= obj.name
            var itemPrice= obj.price
            var calory= obj.calorie
            var quantity= obj.qty
            createItemBox(img, id, itemName, itemPrice,calory,quantity)
        }))
}
//============================================================================
document.addEventListener("DOMContentLoaded", function () {
    loadData();
});
//============================================================================
function createItemBox (image,id,itemName,itemPrice,calory,quantity) {
    var div= document.createElement("div")
    div.style.overflow="hidden"
    div.style.width="80px"
    div.style.height="88px"
    div.style.marginBottom = "10px"
    div.style.border = "1px solid #cbd1d1"
    div.style.borderRadius = "10px"
    div.style.backgroundColor = "white"

    box.appendChild(div);

    for (var i = 0; i < quantity; i++) {
        var img = document.createElement("img");
        img.classList.add("img-item");
        img.src = image;
        img.style.position = "absolute";
        img.setAttribute("data-name", itemName);
        img.setAttribute("data-price", itemPrice);
        img.setAttribute("data-calorie", calory);
        img.setAttribute("id", id + i);

        img.setAttribute("draggable","true")
        img.setAttribute("ondragstart","dragStart(event)")

        div.appendChild(img);
    }
}
//================================================================
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function onDrop(event) {
    var itemId = event.dataTransfer.getData('text/plain');
    var item = document.getElementById(itemId);

    var x = event.pageX - event.currentTarget.offsetLeft - 40;
    var y = event.pageY - event.currentTarget.offsetTop - 40; 
    
    // var rect = event.target.getBoundingClientRect();
    // var x = event.clientX - rect.left ; //x position within the element.
    // var y = event.clientY - rect.top ;  //y position within the element.
    // console.log("Left? : " + x   + " ; Top? : " + y  + ".");
    
    item.style.left = x+"px"
    item.style.top =y+"px"
    var dropzone = document.getElementById('pizza-dough');
    dropzone.appendChild(item);

    var targets = dropzone.getElementsByClassName("img-item")
    var priceSum=0
    var calorieSum = 0
    for (let i = 0; i < targets.length; i++) {
        const targetPrice = Number(targets[i].dataset.price)
        const targetCalory = Number(targets[i].dataset.calorie)
        priceSum += targetPrice
        calorieSum += targetCalory
    }
    
    updatePrice(priceSum);
    updateCalorie(calorieSum)
}
//================================================================================================
function updatePrice(newPrice){
    priceBox.innerText=newPrice
}

function updateCalorie(newCalorie){
    caloryBox.innerText = newCalorie;
}