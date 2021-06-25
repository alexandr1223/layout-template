$(function () {

    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
        }, 'xml');
    }); 

    function menu(menuBtn, block, close) {
        if (document.querySelector(menuBtn)) {
            document.querySelector(menuBtn).addEventListener('click', () => {
                document.querySelector(block).style.cssText = 'top: 0';
                document.body.style.overflow = "hidden"
            })
            document.querySelector(close).addEventListener('click', () => {
                document.body.style.overflow = "auto"
                document.querySelector(block).style.cssText = 'top: -150%';
            })
        }
    } 
    // menu('', '', '');

    // Аккордеон
    $(document).ready(function () {
		if (document.querySelector('.accordeon')) {
            $('.accordeon__open').click(function () {
                $(this).toggleClass('ins').prev().slideToggle();
                if ($(this).find('.accordeon__text').text().trim() == 'развернуть ответ') {
                    $(this).find('.accordeon__text').text('cвернуть ответ')
                } else {
                    $(this).find('.accordeon__text').text('развернуть ответ')
                }
            });
        }
    });

    // Кастомные селекты
    // $('.calc__currency select').ddslick({
    //     imagePosition: "left",
    //     onSelected: function (data) {
    //         console.log(data);
    //     }
    // });
    // $('.calc__plan select').ddslick({
    //     imagePosition: "left",
    //     onSelected: function (data) {
    //         console.log(data);
    //     }
    // });
});