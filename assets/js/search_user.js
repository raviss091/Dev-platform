
$(".search-bar").focus(function(){
  $(".search-icon").css({"border-left": "0", "border-bottom": "0px solid #42bcf4", "border-top": "0px solid #42bcf4", "border-right": "0px solid #42bcf4"}).animate({borderWidth: 4}, 200);
  $(this).css("border", "0px solid #42bcf4").animate({borderWidth: 4}, 200);
  $(".search-icon").mouseover(function(){
    $(this).css("background", "#42bcf4")
  })
  $(".search-icon").mouseleave(function(){
    $(this).css("background", "transparent")
  })
  
});

$(".search-bar").focusout(function(){
  $(".search-icon").css({"border": "0"});
  $(this).css({"border": "0", "border-bottom": "4px solid silver"});
  
  $(".search-icon").mouseover(function(){
    $(this).css("background", "transparent")
  })
});