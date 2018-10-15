$(function () {
    genQueueList();
     $('.product-in-q').click(function(){
        console.log($(this).attr('product-id'));
        $.ajax({
            method: "POST",
            url: "https://nonsenseworkshop.com:2053/pos/completeOrder/",
            data: {
                'id': $(this).attr('product-id')
            },
            success: function (d) {
                console.log(d);
            },
            async: true,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            timeout: 3000
        });
        responsiveVoice.speak("完成了" + $(this).attr('product-name'), "Chinese Female");
        $(this).remove();
    });


});


function genQueueList() {
    var queue;
    $.ajax({
        url: "https://nonsenseworkshop.com:2053/pos/queue/",
        timeout: 1000,
        success: function (d) {
            queue = d.queue;
            console.log(d);
            if (queue) {
                for (var i = 0; i < queue.length; ++i) {
                    $('#queue-list').append(' <li class="list-group-item product-in-q" product-id="' + queue[i].id + '" product-name = "'+ queue[i].name +'">' + queue[i].name + ' ' + queue[i].number + '</li>');
                }
                $('#queue-list').append(' <li class="list-group-item  list-group-item-danger" onclick = "clearQueue()"> 清除佇列</li>');
                $('#queue-list').append(' <li class="list-group-item  list-group-item-warning" onclick = "window.history.back();"> 上一頁</li>');
                // @voice
                responsiveVoice.speak("佇列如下", "Chinese Female");
                for (var i = 0; i < queue.length; ++i) {
                    responsiveVoice.speak(queue[i].number.toString() + "個" + queue[i].name, "Chinese Female");
                }
            }
            else {
                responsiveVoice.speak("目前沒有東西在佇列中", "Chinese Female");
                $('#queue-list').append(' <li class="list-group-item"> 目前沒有東西在佇列中</li>');
                $('#queue-list').append(' <li class="list-group-item  list-group-item-warning" onclick = "window.history.back();"> 上一頁</li>');
            }
        },
        async: true,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    });
}




function clearQueue() {
    var queue;
    $.ajax({
        url: "https://nonsenseworkshop.com:2053/pos/queue/",
        success: function (d) {
            queue = d.queue;
        },
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    });
    for (var i = 0; i < queue.length; ++i) {
        $.ajax({
            method: "POST",
            url: "https://nonsenseworkshop.com:2053/pos/completeOrder/",
            data: {
                'id': queue[i].id
            },
            success: function (d) {
                console.log(d);
            },
            async: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        });
    }

    responsiveVoice.speak("佇列清除", "Chinese Female");
    localStorage.clear();
    window.history.back();
}