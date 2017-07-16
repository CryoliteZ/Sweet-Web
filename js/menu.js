
$(function(){
    genProductTypeList();
 
});

var cart = {
	products : []
};

var curState = {
    product_type_list: true,
    product_list: false,
    cart_list: false

};

const menuObj = {
		uid: 'm0',
		category: "menu",
		path: "/menu/category",
		product: ["初戀滋味","特調歐雷","加倍甜蜜","暖到心頭", "回甘現泡","咖啡美好"]
};

const tree = [
	{
		uid: '1',
		category: "初戀滋味",
		path: "/menu/category1/",
		product: ["鳳梨蘋果汁", "番茄鳳梨蘋果汁", "健胃整腸蔬果汁", "養眼美白蔬菜汁",  "養氣補血蔬果汁", "葡萄奇異果汁", "由不得你特調"]
	},
	{
		uid: '2',
		category: "特調歐雷",
		path: "/menu/category2/",
		product: ["二鳳梨蘋果汁", "番茄鳳梨蘋果汁", "健胃整腸蔬果汁", "養眼美白蔬菜汁",  "養氣補血蔬果汁", "葡萄奇異果汁", "由不得你特調"]
	},
	{
		uid: '3',
		category: "加倍甜蜜",
		path: "/menu/category3/",
		product: ["三鳳梨蘋果汁", "番茄鳳梨蘋果汁", "健胃整腸蔬果汁", "養眼美白蔬菜汁",  "養氣補血蔬果汁", "葡萄奇異果汁", "由不得你特調"]
	},
	{
		uid: '4',
		category: "暖到心頭",
		path: "/menu/category4/",
		product: ["四鳳梨蘋果汁", "番茄鳳梨蘋果汁", "健胃整腸蔬果汁", "養眼美白蔬菜汁",  "養氣補血蔬果汁", "葡萄奇異果汁", "由不得你特調"]
	},
	{
		uid: '5',
		category: "回甘現泡",
		path: "/menu/category5/",
		product: ["五鳳梨蘋果汁", "番茄鳳梨蘋果汁", "健胃整腸蔬果汁", "養眼美白蔬菜汁",  "養氣補血蔬果汁", "葡萄奇異果汁", "由不得你特調"]
	},
	{
		uid: '6',
		category: "咖啡美好",
		path: "/menu/category6/",
		product: ["六鳳梨蘋果汁", "番茄鳳梨蘋果汁", "健胃整腸蔬果汁", "養眼美白蔬菜汁",  "養氣補血蔬果汁", "葡萄奇異果汁", "由不得你特調"]
	}
]



function genProductTypeList(){
    $('#product-list-table').empty();
    for(var i = 0; i < tree.length; ++i){
        $('#product-list-table').append(' <li class="list-group-item" onclick = "genProductList(\'' + tree[i].uid  +'\')">' + tree[i].category+'</li>');
    }
    $('#product-list-table').append(' <li class="list-group-item  list-group-item-success" onclick = "submit2cart()"> 確認訂單</li>');
    $('#product-list-table').append(' <li class="list-group-item  list-group-item-warning" onclick = "backPage()"> 上一頁</li>');
    updateState(1);

    
}

function genProductList(c){
    var idx = parseInt(c)-1;
     $('#product-list-table').empty();
     for(var i = 0; i < tree[ idx].product.length; ++i){
        $('#product-list-table').append(' <li class="list-group-item" data-type="'+ tree[idx].category+'" data-product="' + tree[idx].product[i]+'"onclick = "add2cart(\'' + tree[idx].uid + '/' + tree[idx].product[i] + '\');">' + tree[idx].product[i]+'</li>');
        // $('#product-list-table').append(' <li class="list-。group-item" onclick = "add2cart(\'' + tree[idx].category + '\)">' + tree[idx].product[i]+'</li>');
     }
    $('#product-list-table').append(' <li class="list-group-item  list-group-item-success" onclick = "submit2cart(\''+ c +'\')"> 確認訂單</li>');
    $('#product-list-table').append(' <li class="list-group-item  list-group-item-warning" onclick = "backPage()"> 上一頁</li>');
    updateState(2);
}


function add2cart(paras){
   var paras = paras.split('/');
   var curProduct = {		
		name: paras[1],
		count: 1
	};
	var flag = true;
	for(var i = 0; i < cart.products.length; ++i){
		if(cart.products[i].name == curProduct.name){
			cart.products[i].count += 1;			
			flag = false;
			break;
		}
	}
	if(flag){
		cart.products.push(curProduct);
    }

    // @voice
    var string = "已新增";
	responsiveVoice.speak(string + curProduct.name, "Chinese Female");
    
    // console.log(cart.products);

}
function submit2cart(c){
    $('#product-list-table').empty();
    for(var i = 0; i < cart.products.length; ++i){
        $('#product-list-table').append(' <li class="list-group-item">' + cart.products[i].name + cart.products[i].count+'</li>');
    }
    $('#product-list-table').append(' <li class="list-group-item  list-group-item-info" onclick = "submit2queue();"> 結帳<li>');  
    $('#product-list-table').append(' <li class="list-group-item  list-group-item-warning" onclick = "backPage(\''+ c +'\');"> 上一頁</li>');
    // @voice
    responsiveVoice.speak("訂單如下", "Chinese Female");
	for(var i = 0; i < cart.products.length; ++i){		
		responsiveVoice.speak(cart.products[i].count.toString() + "個" +  cart.products[i].name , "Chinese Female");
	}
    updateState(3);  
}

function updateState(page){
    if(page == 1){
        curState.product_type_list = true;
        curState.product_list = false;
        curState.cart_list = false;
    }
    else if(page == 2){
        curState.product_type_list = false;
        curState.product_list = true;
        curState.cart_list = false;
    }
    else if(page == 3){
        curState.product_type_list = false;
        curState.product_list = false;
        curState.cart_list = true;
    }
        

}

function submit2queue(){
    localStorage.setItem( 'cart', JSON.stringify(cart) );
    console.log( JSON.parse( localStorage.getItem( 'cart' ) ) );
    // @voice
    responsiveVoice.speak("結帳完成", "Chinese Female");
    window.history.back();
}

function backPage(c){
    if(curState.product_type_list){ 
        window.history.back();
        return;
    }
    if(curState.product_list){
        genProductTypeList();
    }
    if(curState.cart_list){
        genProductList(c);

    }
   
}