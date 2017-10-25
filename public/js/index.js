
$(function(){

	{
		//设置高度
		let height=$(window).height(), //窗口的高度
		$pagebox=$('#pagebox');
		$pagebox[0].style.height = height + 'px';

	}

	
	let $room_id=$("#room_id"),
	roomId= $room_id.val();
	$room_id.remove();
	
	
// -------------------------------------------用户列表 数据渲染 
	
	
	let $userlist = $('#userlist'),
	userTemplate = $userlist[0]
					.innerHTML
					.replace(/[\r\t\n]/g, "");
	
	getUserList();
	function getUserList(){
	 	$.ajax({
	 		url:"/public/json/userlist.json",
	 		type:'get',
	 		data:{
	 			
	 		},
	 		dataType:'JSON',
	 		success:function(data){
	 			
	 			// 没有数据 直接返回
	 			if(!data)  return;

 				$userlist.TemplateToData(userTemplate,data,{
 					type:"inner",
 					each:function(obj){
 						obj.sex = 1 === obj.sex ? "gl": "by";
 					}
 				});

	 		},
	 		fail:function(res){
	 			console.log(res)
	 		}
	 	})
	 }
	 
	
	
	

// ---------------------------------------------聊天列表
	let $chatlist = $('#chatlist');
	getTalkData(true);
	
	
	  // 聊天数据渲染     
	 function addchatList(obj,template){
		// 确定模板类型
		let chatlistTempTypeArr=['<span class="text">{{content}}</span>','<img class="sendimg" src="{{sendimg}}" alt="">','<span class="voice"></span>'],//话语 声音

		chatType =  obj.type,//读取数据 是什么类型 
		chatlistTempType = chatlistTempTypeArr[chatType];//选定 html 语句

		let isMe = obj.self==1? " chatlist-rt":"";

		return template = `<li class="chatlist-time">
		<span class="chatlist-time-text">{{add_time}}</span>
		</li>
		<li class="chatlist-item${isMe}">
		<img class="userimg" src="{{headimg}}" alt="">
		${chatlistTempType}
		</li>`;
	}

	function getTalkData(scrollTop=false){
      $.ajax({
            url:"/public/json/datachat.json",
            type:'get',
            data:{
                 
            },
            dataType:'JSON',
            success:function(data){
               
               	if(!data)  return;
                  
               	$chatlist.TemplateToData("",data ,{
               		type:"inner",
               		each: addchatList,
               	});
              	
              	// 直接到底(用于第一次进入页面) 
              	//    或者 
              	//  判断滚动条是否到底
              	if(scrollTop || $chatlist.scrollTop()+$chatlist.height() == $chatlist[0].scrollHeight){
              		// 滚动条到底
              		$chatlist.scrollTop($chatlist[0].scrollHeight)
              	}	
                 
                  

            },
            fail:function(res){
                  console.log(res)
            }
      })
	}
	
	
	
	/*setInterval(function(){
		getUserList();
		getTalkData();
	},3000)*/
	

	
	
	

// --------------------------------------------操作
	let $chatOperate = $('#chat-operate'),
		$messageInput =$chatOperate.find('input'),//输入框
		$moreEmoji =$("#moreEmoji"),//更多选择的表情按钮
		$sendMessagebtn = $chatOperate.find('#sendMessagebtn');//发送按钮
	
	//发送按钮出现
	function sendBtnShow(){
		$sendMessagebtn.show();
		$moreEmoji.hide();	
	}
	// 发送按钮消失
	function sendBtnHide(){
		$sendMessagebtn.hide();
		$moreEmoji.show();	
	}
	// 输入框输信息
	$messageInput
		.on('input',function(){
			
			let value = $(this).val();
			
			value?sendBtnShow():sendBtnHide();	
			
		});
	// 表情添加 和 发表情
	function addEmoji() {
        let arr=[],arrE=[];
        for(let i= 0x1F600;i<= 0x1F64F;i++){
            arr.push(i);
        }
        for(var i=0;i<arr.length;i++){
            arrE[i]='<li class="choose-item choose-item-emoji">&#'+arr[i]+';</li>';
        }
        $("#emoji-box").html(arrE.join(""))
            .on("click","li",function () {
                var str=$messageInput.val()+ $(this).text();
                $messageInput.val(str);
                sendBtnShow();
            });
    }
    addEmoji();
    //发消息
	$sendMessagebtn
		.on('click',function(){
			let value =$messageInput.val();
			console.log(value);
			$.ajax({
				url:"/public/json/datachat.json",
				type:'get',
				data:{
					room_id:roomId,
					content:value
				},
				dataType:'JSON',
				success:function(data){
					if(data){
						$chatlist.TemplateToData("",data ,{
							type:"inner",
							each: addchatList,
						});
                  		// 滚动条到底
                  		$chatlist.scrollTop($chatlist[0].scrollHeight);
                  	}
				},
				fail:function(res){
					console.log(res)
				}
			})
			$messageInput.val("");
			sendBtnHide();
		});


	// ---------------------------------------出现框
	
	// 选择
	$chatOperate.find('.icon')
		.on('click',function(){
			
			let target=$(this).data('target');
			target && $("#"+target).toggle()
									.siblings().hide();;
		});

	
	
	//操作选择 
    $("#choose-operate").on("click","ul>li",function () {
        var  target=$(this).data("target");      
    });

	let $inputFile = $("#choose-operate").find("input");//图片
    //图片上传
    $inputFile
	     .on("change",function(){
	     	let file=this.files[0],
	     		fr= new FileReader();	
	     	fr.readAsDataURL(file);
	     	
	     	fr.onload = function(){
	     		console.log(this);
	     	}

	     })
	     .on("click",function(e){
	     	e.stopPropagation();
	     })
    	
	
})