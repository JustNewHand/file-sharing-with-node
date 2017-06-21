window.onload = function(){

	// 主机名
	var hostname = window.location.hostname;

	// 端口号
	var port = window.location.port;

	// 要访问的文件夹的路径
	var pathname =  decodeURI(window.location.pathname);

	// 页面上的文件列表容器
	var file_list = $('#filelist');

	// 路径显示区域
	var path_area = $('#patharea')[0];

	// 获取当前用户
	var user_area = $('#currentuser')[0];

	$.ajax({
		type: 'GET',
		url: 'http://' + hostname + ':' + port + '/currentuser/',
		dataType: 'text',
		success: function(data){
			user_area.innerHTML = "当前用户： " + data;
		}
	})
	
	// 更新文件列表
	// 拿到path下的所有文件（夹）的列表，并更新显示区域
	var upd_fl = function(path){
		var path_arr = path.split('/');
		var new_path = '/';
		var show_path = "<a href='/'>/</a>";
		for(var k=1; k<path_arr.length-1; k++){
			new_path += path_arr[k] + '/';
			show_path = show_path + "<a href='" + new_path + "'>" + path_arr[k] + "</a>/";
		}
		path_area.innerHTML = "当前路径： " + show_path;

		// 清空原先的列表
		for(var j=0; j<file_list.children('li').length; j++){
			// console.log(file_list.children)
			file_list.children('li').remove(0);
		}

		// 请求path下的文件（夹）列表，并更新文件列表容器
		$.ajax({
			type: 'GET',
			// async: false, 
			url: 'http://' + hostname + ':' + port + '/list/' + path,
			dataType: 'json',
			success: function(data){
				// 将得到的文件（夹）列表展示出来
				for (var i=0; i<data.length; i++){
					var fn = data[i][0];
					var tp = data[i][1];
					var new_fn = fn + (tp=='dir'?'/':'');
					var li_item = document.createElement('li');
					li_item.className += i%2==0?"bg-info":"";
					li_item.innerHTML = "<a href='"+ path + new_fn +"'>"+ new_fn +"</a>";
					file_list.append(li_item);
				}
			}
		})
	}

	upd_fl(pathname);
	
}

var logout = function(){
		window.location.href = "http://" + window.location.hostname + ":8080/logout/";
	}

