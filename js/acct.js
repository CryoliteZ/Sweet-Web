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
            timeout: 3000,
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
		category: '本周報表 - 簡略'
	},
	{
		uid: 'r3',
		category: '本周報表 - 詳細'
	},
	{
		uid: 'r4',
		category: '本月報表 - 簡略'
	},
	{
		uid: 'r5',
		category: '本月報表 - 詳細'
	},
	{	
		uid: 'r6',
		category: '其他'
	}	
];

function genAcctList(){
    for(var i = 0; i < reports.length; ++i){
        $('#acct-list').append(' <li class="list-group-item" onclick = "genReport(\''+ (i+1) + '\')">' + reports[i].category + '</li>');
    }
       
    $('#acct-list').append(' <li class="list-group-item  list-group-item-warning" onclick = "window.history.back();"> 上一頁</li>');

    
}


function genReport(idx){
	var data;
	if(idx == 1){
		var unit_string = '日';	
		$.ajax( {
			url: "https://nonsenseworkshop.com:2053/pos/report/day/",
			success:  function(d){
				data = d;
				console.log(data);		
			},
			xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
			timeout: 3000,
			async: false,
		});
		
	}
	else if(idx == 2 || idx == 3){
		var unit_string = '週';	
		$.ajax( {
			url: "https://nonsenseworkshop.com:2053/pos/report/week/",
			success:  function(d){
				data = d;
				console.log(data);		
			},
			xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
			async: false,
			timeout: 3000,
		});
		if(idx == 2){
			for (var property in data.categoryCount) {
				if (data.categoryCount.hasOwnProperty(property)) {
					console.log( property + ' '+ data.categoryCount[property]);
				}
			}
			


		}
		else{

		}

	}
	else if(idx == 4 || idx == 5){
		var unit_string = '月';
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
		if(idx == 4){
			var categoryCount = data.categoryCount;
			var maxKey = Object.keys(categoryCount).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
			responsiveVoice.speak( '本' + unit_string + '最受歡迎的品項欄位為' + maxKey + ' ，共有' + categoryCount[maxKey] + '比訂單', "Chinese Female");
			var categorySubtotal = data.categorySubtotal;
			var maxKey = Object.keys(categorySubtotal).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
			responsiveVoice.speak( '本' + unit_string + '收益最高的品項欄位為' + maxKey + ' ，共收益' + categorySubtotal[maxKey] + '元', "Chinese Female");
		}
		else{

		}

	
	}
	console.log(idx);
}
