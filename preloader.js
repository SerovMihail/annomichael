var hellopreloader = document.getElementsByClassName("loader-container")[0];
var preloader = document.getElementsByClassName("loader")[0];

function fadeOutnojquery(el) {
    el.style.opacity = 1;
    var interhellopreloader = setInterval(
        function () {
            el.style.opacity = el.style.opacity - 0.05;
            if (el.style.opacity <= 0.05) {
                clearInterval(interhellopreloader);
                preloader.style.display = "none";
            }
        }, 16);
}
window.onload = function () {
    setTimeout(function () {
        fadeOutnojquery(hellopreloader);
    }, 1000);

    
};
