$(document).ready(function() {
    var $slider=$("#slider-img");
    var slideLength = $("#slider-img > .slide-img").length -1 ;
    var ctrl=false;
    $(document).keydown(function (e) {
        if(e.keyCode==17) {
            ctrl=true;
            $("#slider-img").removeClass("_3D");
            $(".key.ctrl").addClass("active");
        }
    }).keyup(function (e) {
        if(e.which == 17){
            ctrl=false;
            $("#slider-img").addClass("_3D");
            $(".key.ctrl").removeClass("active");
        }
        if(e.which==39 || e.which==40){
            nextSlide();
            return;
        }
        if(e.which==37 || e.which==38){
            prevSlide();
            return;
        }
    });

    var is3D=false;
    $(".key").mousedown(function(){
        if($(this).hasClass("ctrl")){
            if($(this).hasClass("active")) is3D = true;
            $("#slider-img").removeClass("_3D");
        }
        $(this).addClass("active");
    }).mouseup(function(){
        if($(this).hasClass("down") || $(this).hasClass("right")) nextSlide();
        if($(this).hasClass("up") || $(this).hasClass("left")) prevSlide();
        console.log(is3D);
        if($(this).hasClass("ctrl active")){
            if(is3D){
                $(this).removeClass("active");
                $("#slider-img").addClass("_3D");
                is3D=false;
            } 
        }else{
            $(this).removeClass("active");
        }
    });

    function nextSlide() {
        lastElem().addClass("active");
        $slider.addClass("transfomer");
        setTimeout(function(){
            var $slicedSlide = $('.slide-img').slice(slideLength);
            $slider.prepend($slicedSlide);
            $(document).find(".slide-img.active").removeClass("active");
            $slider.removeClass("transfomer");
        },300);
    }

    function prevSlide(){
        var $slicedSlide = $('.slide-img').slice(0,1).addClass("active");
        $slider.append($slicedSlide);
        setTimeout(function(){
            lastElem().removeClass("active");
        },50);
    }

    function lastElem(){
        return $("#slider-img > .slide-img").last();
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  });





  
(function($) { "use strict";

//Switch dark/light

$(".switch").on('click', function () {
    if ($("body").hasClass("light")) {
        $("body").removeClass("light");
        $(".switch").removeClass("switched");
    }
    else {
        $("body").addClass("light");
        $(".switch").addClass("switched");
    }
});
    
$(document).ready(function(){"use strict";

    //Scroll back to top
    
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);	
    var offset = 50;
    var duration = 50;
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });				
    jQuery('.progress-wrap').on('click', function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
    
    
});

})(jQuery); 


