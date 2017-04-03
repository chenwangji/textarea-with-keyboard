onload = function() {

	var oTextarea = document.getElementsByTagName("textarea")[0];
	var oInput = document.getElementsByTagName("input")[0];
	var oKeyboardBox = document.getElementById("kebordbox");
	var oKeyboard = document.getElementById("keybord");
	var oHeader = oKeyboardBox.getElementsByTagName("h4")[0];
	var liArr = oKeyboardBox.getElementsByTagName("li");
	var contentNode = document.getElementById("content");
	var contentLiArr = contentNode.getElementsByTagName("li");

	//获取cookie
	var cookieStr = decodeURIComponent(document.cookie);
	if(cookieStr.length > 0){
		cookieArr1 = cookieStr.split("; ");
		for(var i = 0; i < cookieArr1.length; i++) {
			var cookieArr2 = cookieArr1[i].split("=");
			var newLi = document.createElement("li");
			newLi.innerHTML = cookieArr2[1];
			contentNode.appendChild(newLi);
		}
	}
	//拖拽键盘
	oHeader.onmousedown = function(evt) {
		var oEvent = evt || event;
		
		//清除拖动的系统默认行为
		oEvent.preventDefault();
		
		disX = oEvent.offsetX;
		onmousemove = function(evt) {
			var oEvent = evt || event;
			var distanceX = oEvent.clientX - disX;
			if(distanceX < 0) {
				oKeyboardBox.style.left = "250px";
			} else if(distanceX > document.body.offsetWidth - oKeyboardBox.offsetWidth) {
				oKeyboardBox.style.left = document.body.offsetWidth - 250 + "px";
			} else {
				oKeyboardBox.style.left = distanceX + 250 + "px";
			}

		};
		onmouseup = function() {
			onmousemove = null;
			onmouseup = null;
		};
	};

	//切换大小写
	var flag = 0; //记录大小写
	document.onkeydown = function(evt) {
		var oEvent = evt || event;
		if(oEvent.keyCode == 20 && flag == 0) {
			flag = 1;
			for(var i = 0; i < liArr.length; i++) {
				liArr[i].innerHTML = liArr[i].innerHTML.toUpperCase();
			}
		} else if(oEvent.keyCode == 20 && flag == 1) {
			for(var i = 0; i < liArr.length; i++) {
				liArr[i].innerHTML = liArr[i].innerHTML.toLowerCase();
				flag = 0;
			}
		}
		//敲击变色  
		if(flag == 0) { //小写
			console.log("lowercase");
			for(var i = 0; i < liArr.length; i++) {
				if(String.fromCharCode(oEvent.keyCode + 32) == liArr[i].innerHTML) {
					console.log("lowercase1");
					liArr[i].style.backgroundColor = "#f00";
				}
			}
		}
		if(flag == 1) {
			console.log("uppercase");
			for(var i = 0; i < liArr.length; i++) {
				if(String.fromCharCode(oEvent.keyCode) == liArr[i].innerHTML) {
					liArr[i].style.backgroundColor = "#0f0";
				}
			}
		}

	};
	

	//恢复原色
	document.onkeyup = function(evt) {
		var oEvent = evt || event;
		for(var i = 0; i < liArr.length; i++) {
			liArr[i].style.backgroundColor = "#666";
		}
	};

	//双击切换隐藏/显示
	var mark = 1;
	var showKeyBoard = function() {

		if(mark == 0) {
			oKeyboardBox.style.display = "none";
			mark = 1;
		} else {
			oKeyboardBox.style.display = "block";
			mark = 0;
		}
	};
	
	ondblclick = showKeyBoard;
	
	//输入框获取焦点键盘显示。否则隐藏
//	oTextarea.onfocus = function () {
//		oKeyboardBox.style.display = "block";
//	};
//	oTextarea.onblur = function () {
//		oKeyboardBox.style.display = "none";
//	};

	//阻止双击冒泡
	oTextarea.ondblclick = function(evt) {
		var oEvent = evt || event;
		oEvent.cancelBubble = true;
	};
	oInput.ondblclick = function(evt) {
		var oEvent = evt || event;
		oEvent.cancelBubble = true;
	};
	oKeyboardBox.ondblclick = function(evt) {
		var oEvent = evt || event;
		oEvent.cancelBubble = true;
	};


	//阻止系统右键菜单
	document.body.oncontextmenu = function() {
		return false;
	};
	
	//点击右键显示自定义右键菜单
	var oDiv = document.getElementById("container");
	var oUl = oDiv.getElementsByTagName("ul")[0];
	var oLiArr = oUl.getElementsByClassName("li-1");
	
	onmousedown = function(evt) { 
		var oEvent = evt || event;
		if(oEvent.button == 2) {
			oUl.style.display = "block";
			oUl.style.left = oEvent.clientX + "px";
			oUl.style.top = oEvent.clientY + "px";
		}
		//左键点击DIV隐藏右键菜单
		else if(oEvent.button == 0) {
			oUl.style.display = "none";
		}
	};

	//执行选中功能--换颜色
	var color = ["#6F00D2","lightgoldenrodyellow","lightblue"];
	for(var i = 0; i < oLiArr.length; i++) {
		oLiArr[i].index = i;
		oLiArr[i].onmousedown = function() {
			document.body.style.backgroundColor = color[this.index];
		};
	}

	//阻止事件冒泡，以免点击自定义内容ul时会移动和消失  -----------> 这个不用阻止吧？一般来说选中后菜单都会消失
//	oUl.onmousedown = function(evt) {
//		var oEvent = evt || event;
//		oEvent.cancelBubble = true;
//	};
	
	//添加留言
	var cookieMark = 0;
	oInput.onclick = function() {
		cookieMark = 1;
		if(oTextarea.value == "") {
			alert("文本不能为空");
			return;
		}
//		oKeyboardBox.style.display = "none";
		var newLi = document.createElement("li");
		var tempStr = oTextarea.value.replace(/(ugly)|(blue)|(rubbish)/gi,"*");
		newLi.innerHTML = tempStr;
		contentNode.appendChild(newLi);
		oTextarea.value = ""; //留言发送后输入框内容清空
		

		//点击能删除增加的留言 --------------------> 为什么放外面不行
		for(var j = 0; j < contentLiArr.length; j++) {
			//添加cookie
			document.cookie = "li" + j + "=" + encodeURIComponent(contentLiArr[j].innerHTML) + ";expires=" + new Date("2018/1/1");
			
			contentLiArr[j].index = j;
			contentLiArr[j].onclick = function () {
				contentNode.removeChild(this);
				//移除删除的li的cookie
				document.cookie = "li" + this.index + "=" + encodeURIComponent(this.innerHTML) + ";expires=" + new Date();
			};
		}
	
	};
	 
	
	//cookie
//	for(var j = 0; j < contentNode.children.length; j++) {
//		document.cookie = "li" + j + "=" + encodeURIComponent(this.innerHTML) + ";expires=" + new Date("2018/1/1");
//	}

	//点击删除原来的留言及cookie
	if(!cookieMark) {
		for(var j = 0; j < contentLiArr.length; j++) {
//			//添加cookie
//			document.cookie = "li" + j + "=" + encodeURIComponent(contentLiArr[j].innerHTML) + ";expires=" + new Date("2018/1/1");
			contentLiArr[j].onclick = function () {
				contentNode.removeChild(this);
				//移除删除的li的cookie
				document.cookie = "li" + this.index + "=" + encodeURIComponent(this.innerHTML) + ";expires=" + new Date();
			};
		}	
	}	
};