var list = $("nav>ul li > a"); //Liste de tout les liens
//Gestion du clique sur le boutton des trois bars afin d'afficher le menu dans les support avec un width <769
$("nav > a").click(function(event){
    $("nav>ul").slideToggle();
});
//Gestion des cliques sur les liens avec élimination du comportement par défaut du a dans le cas où il existe un sous menu
list.click(function (event) {
    var submenu = this.parentNode.getElementsByTagName("ul").item(0);
    //S'il existe un sous menu sinon c'est un lien terminal
    if(submenu!=null){
        event.preventDefault();
        $(submenu).slideToggle();
    }
});
//Gestion du resize de la fenetre pour eliminer le style ajouté par la méthode .slideToggle()
$(window).resize(function () {
    if ($(window).width() > 1024) {
        $("nav > ul, nav > ul  li  ul").removeAttr("style");
    }
});