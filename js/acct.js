$(function(){
	 $.ajax({
            method: "POST",
            url: "https://nonsenseworkshop.com:2053/pos/signin/",
            data: {
                username: 'adminis',
                password: 'abaaababbbbaab',
            }, // serializes the form's elements.
            xhrFields:{
                withCredentials : true
            },
            crossDomain : true,
            success: function(data)
            {
                console.log(data); // show response from the php script.
            }
    });
    genAcctList();
 
});



const reports = [
	{
		uid: 'r1',
		category: '本日報表'
	},
	{
		uid: 'r2',
		category: '本周報表'
	},
	{
		uid: 'r3',
		category: '本月報表'
	},
	{	
		uid: 'r4',
		category: '其他'
	}	
];

function genAcctList(){
    for(var i = 0; i < reports.length; ++i){
        $('#acct-list').append(' <li class="list-group-item" onclick = "genReport(\''+ i + '\')">' + reports[i].category + '</li>');
    }
       
    $('#acct-list').append(' <li class="list-group-item  list-group-item-warning" onclick = "window.history.back();"> 上一頁</li>');

    
}


function genReport(idx){
	if(idx == 1){
		var data;
		$.ajax( {
			url: "https://nonsenseworkshop.com:2053/pos/report/month/",
			success:  function(d){
				data = d;
				console.log(data);		
			},
			xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
			async: false,
		});
		
	}
	console.log(idx);
}
