$(document).ready(function(){
		   		var tab_menu_li=$('.tab_menu li');
				$('.tab_box div:gt(0)').hide();
				$('.tab_menu li:gt(0)').addClass('unslected ');
				
				tab_menu_li.mouseover(function(){
					$(this).removeClass('unslected');
					$(this).addClass('slected');
					$(this).siblings().removeClass('slected');
					$(this).siblings().addClass('unslected');
					
					var index=tab_menu_li.index(this);
					$('.tab_box div').eq(index).show()
									.siblings().hide();
				});
		   });