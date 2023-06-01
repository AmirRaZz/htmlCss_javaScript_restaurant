function ChangeScrollY() {
    if (window.scrollY >= 100) {
        document.getElementById("navbar-box").style.background = "#f16121";
    } else if (window.scrollY < 100) {
        document.getElementById("navbar-box").style.background = "transparent";
    }
}

// ------------------------------------------------------------------------------------
var myFunction1 = function() {
    let caption_element = this.querySelector('.caption');
    caption_element.style.transform = "rotate(0deg) scale(1.1)";
    let title_element = caption_element.querySelector('.title');
    title_element.style.transform = "rotate(0deg) scale(1.1)";
    title_element.style.transform = "translate(-120px, 0px)";
};

// ------------------------------------------------------------------------------------
var myFunction2 = function() {
    let caption_element = this.querySelector('.caption');
    caption_element.style.transform = "rotate(-5deg) scale(1.1)";
    let title_element = caption_element.querySelector('.title');
    title_element.style.transform = "rotate(5deg) scale(1.1)";
};

// ------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByClassName("food-box");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mouseenter', myFunction1, false);
        elements[i].addEventListener('mouseleave', myFunction2, false);
    }
});