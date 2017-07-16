$(function(){
    genQueueList();
 
});


function genQueueList(){
    var mCart = JSON.parse( localStorage.getItem( 'cart' ) );
    if(mCart){
        for(var i = 0; i < mCart.products.length; ++i){
            $('#queue-list').append(' <li class="list-group-item">' + mCart.products[i].name + ' ' + mCart.products[i].count+'</li>');
        }
        $('#queue-list').append(' <li class="list-group-item  list-group-item-danger" onclick = "clearQueue()"> 清除佇列</li>');
        $('#queue-list').append(' <li class="list-group-item  list-group-item-warning" onclick = "window.history.back();"> 上一頁</li>');
        // @voice
        responsiveVoice.speak("佇列如下", "Chinese Female");
		for(var i = 0; i < mCart.products.length; ++i){			
			responsiveVoice.speak(mCart.products[i].count.toString() + "個" +  mCart.products[i].name , "Chinese Female");
		}
    }
    else{
        $('#queue-list').append(' <li class="list-group-item"> 目前沒有東西在佇列中</li>');        
        $('#queue-list').append(' <li class="list-group-item  list-group-item-warning" onclick = "window.history.back();"> 上一頁</li>');
    }
    
}

function clearQueue(){
    responsiveVoice.speak("佇列清除", "Chinese Female");
    localStorage.clear();
    window.history.back();
}