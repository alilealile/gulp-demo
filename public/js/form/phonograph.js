
$(function(){

	//表单提交
	$("#phonographForm").submit(function(e){
		
		let val = $(this).serialize();
		console.log(val)
		creatDialog({
			title:'留声机',
			content:'发送成功',
			hasCancel:0,
		});
		return false;
		
	})

	// 游戏规则输出
	$("#game-text").click(function(){
		console.log(22,$(".dialog"))
		$(".js_dialog").fadeIn(200);
	})

	// 文本输入框 统计字数 和实时高度
	$("textarea").on("input",function(){
		this.style.height=this.scrollHeight + 'px'
		let val = this.value , 
			len=val.length;
		const num = 120;

		if(len>num){
			this.value = val.substring(0,num) ;
			len = num;
		}
		$("#word-count")[0].innerHTML=`${len}/${num}`
	})


	// 弹出框
    $('body').on('click', '.dialog__btn', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
   

})
