$(function(){

    // var url = "path/to/your/script.php"; // the script where you handle the form input.
    console.log('hi there');
   
        
    $('#function-group').append(' <li class="list-group-item  list-group-item-info" onclick = "submitPassword()"> 送出</li>');
    $('#function-group').append(' <li class="list-group-item  list-group-item-warning" onclick = "window.history.back();"> 上一頁</li>');
});

var password = "";

function insertPass(pass){
    password += pass;
    console.log(password);
}

function submitPassword(){
    var response;
    $.ajax({
            method: "POST",
            url: "https://nonsenseworkshop.com:2053/pos/signin/",
            data: {
                username: 'guest',
                password: password,
            }, // serializes the form's elements.
            xhrFields:{
                withCredentials : true
            },
            crossDomain : true,
            success: function(data)
            {
                response = data;
              
               
            },
            async: false,
    })
    if(response.success == "true"){
        responsiveVoice.speak("登入成功", "Chinese Female");
        window.history.back();
        return;

    }
    else{
        responsiveVoice.speak("登入失敗", "Chinese Female");
    }
    
}

//  username: 'guest',
// password: 'aabbaabbaabb',