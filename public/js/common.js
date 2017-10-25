
// 模板函数

(function ($){

	function TemplateToData(template, data,$targetDom,options ){
		
		this.template = template;
		this.data=data;
		this.$targetDom=$targetDom;
	
		this.options = $.extend({},TemplateToData.DEFAULTS,options);
		
		this._inner();

	}

	TemplateToData.DEFAULTS={
		type:"append" ,//默认追加方式 添加 而不是覆盖
		each:null,// 每一个模板  特殊操作
	} ;

	TemplateToData.prototype._inner=function(){ //全部替换
		let template = this.template,
			data = this.data,
			options =this.options,
			$targetDom = this.$targetDom,
			fragment='';
		
			
		for(let i=0,len=data.length;i<len;i++){

			let objFlag=true;//作为判断 每一条数据只用走一次
			
			let t='';
			for(let n in data[i]){
				
				// objFlag && options.each && options.each(data[i],template);
				if(objFlag && options.each){ 

					let returnTemp = options.each(data[i],template);
					if(returnTemp ){
						 template =returnTemp
					}
				}
				

				if(objFlag){ objFlag=false; } 

				t=(t||template)
							.replace('{{'+n+'}}',data[i][n]);
			}
			fragment+=t;
			
		}
			if(options.type === "append" ){
				//console.log("追加")
				$targetDom.append(fragment);
				
			}else{
				//console.log("覆盖")
				$targetDom[0].innerHTML=fragment;
				
			}
		
	}


	

	// $.extend({
	// 	TemplateToData:function(template, data ,$targetDom ,options ){
	// 		 new TemplateToData(template, data ,$targetDom,options )
	// 	}
	// });

	$.fn.extend({
		TemplateToData:function(template, data ,options ){
			 let $targetDom = $(this);
			 new TemplateToData(template, data ,$targetDom,options )
		}
	});

})(jQuery);


//创造弹出框
function creatDialog(option){
	let hasCancel='',
	opts={
		title:'标题',
		content:'内容',
		hasCancel:1, // 是否 需要取消按钮 1 默认有 
		Fun:null //按确定时的 另外 操作
	};

	opts = Object.assign(opts, option);

	if(opts.hasCancel){
		hasCancel = '<span class="dialog__btn" id="btnCancel">取消</span>';
	} 

	let template = `<div class="js_dialog" style="display:block;">
		<div class="mask"></div>
		<div class="dialog">
			<div class="dialog__hd"> ${opts.title} </div>
			<div class="dialog__bd"> ${opts.content}</div>
			<div class="dialog__ft">
				${hasCancel}
				<span class="dialog__btn dialog__btn_primary"  id="btnSure">确定</span>
			</div>
		</div>
	</div>`
	
	$("body").append(template)
		.on('click', '#btnCancel', function(){
	       unbindAndRrmove(this);
	    })
	    .on('click', '#btnSure', function(){
	        opts.Fun && opts.Fun();
	        unbindAndRrmove(this);
	    });

    function unbindAndRrmove(target){
    	$(target).unbind("click")
    	.parents('.js_dialog').remove();
    }
}
