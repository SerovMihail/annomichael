var preloader = document.getElementsByClassName("mk-spinner-wrap")[0];
var signature = document.getElementsByClassName("signature")[0];

function fadeOutnojquery(el) {
    el.style.opacity = 1;
    
    var interhellopreloader = setInterval(
        function () {
            el.style.opacity = el.style.opacity - 0.05;
            
            if (el.style.opacity <= 0.05) {
                clearInterval(interhellopreloader);               
                preloader.style.display = "none";
                signature.style.display = "block";               
            }
        }, 30);
}
window.onload = function () {
    setTimeout(function () {
        fadeOutnojquery(preloader);
    }, 1000);
};