const searchBtn = document.querySelector(".search-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const searchBox = document.querySelector(".search-box");
const q = document.querySelector("#q");
//----------------------------------------------------------------
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

//------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    loadData();
});
//------------------------------------------------------------------

function createProductPox(product) {
    let div1 = document.createElement("div");
    div1.classList.add("search-box-product");

    let div2 = document.createElement("div");
    div2.classList.add("search-box-img-title");

    let img = document.createElement("img");
    img.classList.add("search-box-img");
    img.setAttribute("src", product.product_image[0])

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(product.product_name))
    div2.appendChild(img);
    div2.appendChild(h3);



    let strong1 = document.createElement("strong");
    strong1.appendChild(document.createTextNode(product.product_type[0]));

    let strong2 = document.createElement("strong");
    strong2.appendChild(document.createTextNode(product.product_price[0] + " تومان"));

    div1.appendChild(div2);
    div1.appendChild(strong1);
    div1.appendChild(strong2);
    return div1;
}


function search(x) {
    var searchResultBox = document.getElementById("search-result-box");
    searchResultBox.innerHTML = "";
    searchResult = []
    mydata.product_groups.forEach(group => {
        group.group_products.forEach(product => {
            if (product.product_name === x || product.product_name.includes(x)) {
                searchResult.push(product);
            }
        });
    });
    if (searchResult.length > 0) {
        let h1 = document.createElement("h1");
        h1.appendChild(document.createTextNode("نتیجه جستجوی شما :"));
        h1.classList.add("search-box-title");
        searchResultBox.appendChild(h1);
        searchResult.forEach(product => {
            searchResultBox.appendChild(createProductPox(product));
        });
    } else {
        let h1 = document.createElement("h1");
        h1.appendChild(document.createTextNode("غذایی یافت نشد"));
        h1.classList.add("search-box-title");
        searchResultBox.appendChild(h1);
    }
}




//----------------------------------------------------------------
searchBtn.onclick = () => {
    searchBox.classList.add("active");
    searchBox.style.transition = "all 0.5s cubic-bezier(0.7, -0.5, 0.3, 1.5)";
    searchBtn.style.transition = "all 0.5s cubic-bezier(0.7, -0.5, 0.3, 1.5)";
    searchBtn.style.transition = "all 0.5s cubic-bezier(0.7, -0.5, 0.3, 1.5)";
    cancelBtn.style.transition = "all 0.5s cubic-bezier(0.7, -0.5, 0.3, 1.5)";
}

cancelBtn.onclick = () => {
    searchBox.classList.remove("active");
    q.value = "";
}

q.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        var x = event.target.value
        search(x);
        q.value = "";
    }
});