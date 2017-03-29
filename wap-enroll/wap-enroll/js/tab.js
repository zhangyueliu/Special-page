$(function(){
	var tip1=new tip();
	$('.head-of-list-each').on('tap',function(){		
		if(!$(this).hasClass('active')){
			var index=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('.content-of-list-each').eq(index).show().siblings().hide();
		}
	});
	$('.suspend-div').on('tap',function(){
		$('.shade').show();
		stop();
		$('a,.next,.prev').css({'pointer-events':'none'});	
	});
	$('.close').on('tap',function(){
		$('.shade').hide();
		move();
		setTimeout(function(){$('a,.next,.prev').css({'pointer-events':'auto'});},200);
	});
	$('.import-number .btn-plane').on('tap',function(){		
    	var phone = $('.import-number input').val().trim();
    	if(!phone){
    		tip1.showTip({
    			bottomVal:'50%',
				time: 2000,
				msg: '请填写手机号'
			});
    		return false;
    	}
		if(!checkPhone(phone)){
			tip1.showTip({
				bottomVal:'50%',
				time: 2000,
				msg: '手机号码有误，请重写'
			});
			return false;
		}
		//这里去存手机号，并提示成功
		tip1.showTip({
				bottomVal:'50%',
				time: 2000,
				msg: '手机号输入成功'
			});
		//存完手机号，清空
		$('.import-number input').val('');
		//关闭弹框，开启滑动
		$('.shade').hide();
		move();
	});
	var mySwiper = new Swiper ('.swiper-container', {
	    loop: true,	    	    
	    // 如果需要前进后退按钮
	    nextButton: '.next',
	    prevButton: '.prev',
	  });    
});
//实现滚动条无法滚动
var mo=function(e){e.preventDefault();};

/***禁止滑动***/
function stop(){
        document.body.style.overflow='hidden';        
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
}

/***取消滑动限制***/
function move(){
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);        
}

function checkPhone(phone){ 
    if(!(/^1[34578]\d{9}$/.test(phone))){ 		
        return false; 
    }else{
    	return true;
    }
}

function tip() {
	this.timer=null;
}
tip.prototype.showTip = function(options) {
	var defaults={
		bottomVal:'20%',
		msg:'请填写提示信息',
		time:2000
	}
	if(options){
		if(options.bottomVal){
			defaults.bottomVal=options.bottomVal;
		}
		if(options.msg){
			defaults.msg=options.msg;
		}
		if(options.time){
			defaults.time=options.time;
		}
	}
	//清除之前的提示和计时器
	if(document.getElementById('tip')) {
		document.getElementById('tip').remove();
		clearTimeout(this.timer);
	}
	//创建div
	var div = document.createElement('div');
	div.id = 'tip';
	var style1 = {
		position: 'fixed',
		bottom: defaults.bottomVal,
		backgroundColor: 'rgba(0,0,0,.3)',
		padding: '3px 5px',
		color: '#fff',
		borderRadius: '5px',
		left: '50%',
		transform: 'translate(-50%)',
		fontSize:'1.1rem'
	};
	for(i in style1) {
		div.style[i] = style1[i];
	}
	div.innerHTML = defaults.msg;
	//加到body中
	document.body.appendChild(div);
	//添加计时器来控制提示的消失
	this.timer = setTimeout(function() {
		document.getElementById('tip').remove();
	}, defaults.time);
}