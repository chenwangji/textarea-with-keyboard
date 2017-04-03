//设置cookie
function setCookie(name,value,expires) {
	var cName = encodeURIComponent(name);
	var cValue = encodeURIComponent(value);
	var cookieText = cName + "=" + cValue;
	if(expires instanceof Date){
		cookieText += ";expires=" + expires;
	}
	//保存到cookie当中
	document.cookie = cookieText;
	
	//测试查看
	return decodeURIComponent(document.cookie);
}

//获取cookie
function getCookie(name) {
	var cookieText = decodeURIComponent(document.cookie);
	var cArr = cookieText.split("; ");
	for(var i = 0; i < cArr.length; i++) {
		var cArr2 = cArr[i];
		cArr2 = cArr[i].split("=");
		if(cArr2[0] == name){
			return cArr2[1];
		}
	}
	return ""; //没找到，返回空串
}

//删除cookie

function deleteCookie(name) {
	document.cookie = encodeURIComponent(name) + "=;expires=" + new Date();
	return decodeURIComponent(document.cookie);
}
