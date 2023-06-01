data = `{
    "product_groups": [
        {
            "group_id":1,
            "group_title": "ساندویچ",
            "group_image": "images/burger-7-310x260.png",
            "group_products": 
            [
                {
                    "product_name": "ژامبون مرغ تنوری",
                    "price": 165000,
                    "product_image": "a1.jpg",
                    "product_content": [
                        "ژامبون مرغ",
                        "قارچ",
                        "پنیر",
                        "سس مخصوص"
                    ]
                },
                {
                    "product_name": "هات داگ مخصوص",
                    "price": 145000,
                    "product_image": "a2.jpg",
                    "product_content": [
                        "هات داگ",
                        "قارچ",
                        "پنیر",
                        "کاهو",
                        "خیارشور",
                        "گوجه"
                    ]
                },
                {
                    "product_name": "چیز برگر",
                    "price": 176000,
                    "product_image": "a3.jpg",
                    "product_content": [
                        "همبرگر90 درصد",
                        "پنیر گودا",
                        "سس مخصوص",
                        "گوجه"
                    ]
                },
                {
                    "product_name": "رویال برگر",
                    "price": 193000,
                    "product_image": "a4.jpg",
                    "product_content": [
                        "همبرگر 90 درصد",
                        "ژامبون گوشت",
                        "قارچ",
                        "پنیر"
                    ]
                }
            ]
        },
        {
            "group_id":2,
            "group_title": "پیتزا",
            "group_image": "images/pizza-7-310x260.png",
            "group_products": [{
                "product_name": "پیتزا فیله مرغ",
                "price": 165000,
                "product_image": "b1.jpg",
                "product_content": [
                    "فیله مرغ",
                    "قارچ",
                    "فلفل دلمه",
                    "پنیر",
                    "گوجه",
                    "ذرت"
                ]
            }, {
                "product_name": "پیتزا پنجره ای مخصوص",
                "price": 185000,
                "product_image": "b2.jpg",
                "product_content": [
                    "ژامبون بره",
                    "قارچ",
                    "پنیر",
                    "گوشت چرخ کرده",
                    "فلفل دلمه"
                ]
            }, {
                "product_name": "پیتزا پپرونی",
                "price": 173000,
                "product_image": "b3.jpg",
                "product_content": [
                    "کالباس پپرونی",
                    "قارچ",
                    "پنیر",
                    "فلفل دلمه"
                ]
            }]
        },
        {
            "group_id":3,
            "group_title": "کباب",
            "group_image": "images/barbecue-7-310x260.png",
            "group_products": [{
                "product_name": "کوبیده",
                "price": 110000,
                "product_image": "c1.jpg",
                "product_content": [
                    "گوشت چرخ کرده",
                    "پیاز",
                    "نمک",
                    "جوش شیرین"
                ]
            }, {
                "product_name": "برگ",
                "price": 175,
                "product_image": "c2.jpg",
                "product_content": [
                    "گوشت گوسفندی",
                    "نمک",
                    "آبلیمو"
                ]
            }]
        }
          
    ]
}`;

// ------------------------------------------------------------------------------------
function createGroupBox(group_id, title, img_url) {

    var food_box = document.createElement("div");
    food_box.classList.add("food-box");

    var food_img = document.createElement("img");
    food_img.setAttribute("src", img_url);

    var food_caption = document.createElement("div");
    food_caption.classList.add("caption");

    var food_title = document.createElement("h5");
    food_title.classList.add("title");

    var food_link = document.createElement("a");
    var food_link_text = document.createTextNode(title);
    food_link.appendChild(food_link_text);
    food_link.setAttribute("href", "menu.html?group=" + group_id);

    food_title.appendChild(food_link);

    food_caption.appendChild(food_title);

    food_box.appendChild(food_img);
    food_box.appendChild(food_caption);

    return food_box;
}

// ------------------------------------------------------------------------------------
function createMainFoods(mydata) {
    var main_foods = document.getElementById("main-foods");
    for (const group_index in mydata.product_groups) {
        var food_box_element = createGroupBox(
            mydata.product_groups[group_index].group_id,
            mydata.product_groups[group_index].group_title,
            mydata.product_groups[group_index].group_image);
        main_foods.appendChild(food_box_element);
    }
}

// ------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    mydata = JSON.parse(data);
    createMainFoods(mydata);
});

// ------------------------------------------------------------------------------------

















// function readJsonFileFoods(fileUrl) {
//     var mydata = {};
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("GET", fileUrl);
//     xhttp.onreadystatechange = function() {
//         if (xhttp.readyState == 4 && xhttp.status == 200) {
//             mydata = JSON.parse(xhttp.responseText);
//             createMainFoods(mydata);
//         }
//     };
//     xhttp.send();
// }