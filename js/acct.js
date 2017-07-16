$(function(){
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
        $('#acct-list').append(' <li class="list-group-item">' + reports[i].category + '</li>');
    }
       
    $('#acct-list').append(' <li class="list-group-item  list-group-item-warning" onclick = "window.history.back();"> 上一頁</li>');

    
}

