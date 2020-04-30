; (function ($, window, name) {
	if ((name in window) && window[name]['debug']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			showError : function(text) {
				if (!text)
					return;
				var errWin = window
					.open(
						"",
						"错误信息",
						"height=500,width=600,top=0,scrollbars=yes,resizable=yes,location=no,status=no,toolbar=no");
				errWin.document.write(text);
				errWin.document.close();
				var winW = 600;
				if (winW > screen.availWidth) {
					winW = screen.availWidth;
				}
				var winH = 500;
				if (winH > screen.availHeight) {
					winH = screen.availHeight;
				}

				errWin.moveTo((screen.availWidth - winW) / 2,
					(screen.availHeight - winH) / 2);
				errWin.resizeTo(winW, winH);
			},
			debug : {
				_openwin : function(obj, msg, winname) {
					var windowsname = "对象信息";
					if (winname)
						windowsname = winname.replace(".", "_");
					var newWindow = window
						.open(
							"",
							"win" + windowsname,
							"height=600,width=800,top=0,scrollbars=yes,resizable=yes,location=no,status=no,toolbar=no");
					var scriptstr = "<script>var objM;var printFunc={};function setObj(obj){objM = obj;};function setFunc(func){printFunc=func;};";
					scriptstr += "function showTable(keystr,divstr){var showdiv = document.getElementById(\"div_\"+divstr);"
						+ "if(showdiv.isShow){showdiv.isShow = false;showdiv.style.display=\"none\";}"
						+ "else if (typeof(showdiv.isShow)==\"undefined\"){var keys = keystr.split(\"#\");obj = objM;"
						+ "for(i=0;i<keys.length;i++){obj = obj[keys[i]];}showdiv.innerHTML=printFunc(obj,1,keystr,divstr);showdiv.style.display=\"\";showdiv.isShow=true;}"
						+ "else{showdiv.style.display=\"\";showdiv.isShow=true;};}"
						+ "</script>";
					newWindow.document
						.write("<html><head><TITLE>"
							+ windowsname
							+ "</TITLE><style>table{border-collapse: collapse;}td{border: 1px solid black;}</style>\n"
							+ scriptstr + "\n</head><body>\n" + msg
							+ "\n</body></html>");
					newWindow.document.close();
					newWindow.setObj(obj);
					newWindow.setFunc(wdutil.debug._print);
					var newWidth = 800;
					if (newWidth > screen.availWidth)
						newWidth = screen.availWidth;
					var newHeight = 600;
					if (newHeight > screen.availHeight)
						newHeight = screen.availHeight;
					newWindow.moveTo((screen.availWidth - newWidth) / 2,
						(screen.availHeight - newHeight) / 2);
					newWindow.resizeTo(newWidth, newHeight);
				},
				__PrintCreateTD : function(index, key, str) {
					return "<tr><td width='5%'>" + index + "</td><td>" + key
						+ "</td><td>" + str + "</td></tr>\n";
				},
				__PrintCreateTD2 : function(index, key, str) {
					return "<tr><td width='5%'>" + index + "</td><td>" + key
						+ "</td><td><textarea cols='30' rows='10'>" + str
						+ "</textarea></td></tr>\n";
				},
				_print : function(obj, lvl, keystr, divstr) {
					var props = "<table border='0' width='100%''>";
					if (typeof (obj) != "object") {
						props = obj;
					} else {
						var index = 1;
						for ( var key in obj) {
							if (typeof (obj[key]) == "function") {
								props += wdutil.debug.__PrintCreateTD2(index++, key,
									obj[key]);
							} else if (typeof (obj[key]) == "object") {
								if (obj[key] == null || wdutil.isDate(obj[key])) {
									props += wdutil.debug.__PrintCreateTD(index++, key,
										obj[key]);
								} else {
									var div_id = key;
									var key_id = key;
									if (keystr) {
										key_id = keystr + "#" + key;
										div_id = divstr + "." + key;
									}
									var vtype = "(object)";
									if (wdutil.isArray(obj[key]))
										vtype = "(array)";
									var clickDiv = clickDiv = "<a href='javascript:void(0);' onclick=\"showTable('"+key_id+"','"+div_id+"');\">"+vtype+"</a><div id='div_"+div_id+"'></div>\n";
									props += wdutil.debug.__PrintCreateTD( index++, key, clickDiv );
								}
							} else {
								try {
									var str = obj[key].toString();
									var regS = new RegExp("<", "gi");
									str = str.replace(regS, "<font><</font>");
									props += wdutil.debug.__PrintCreateTD( index++, key, str );
								} catch (e) {
									try {
										props += wdutil.debug.__PrintCreateTD( index++, key, obj[key] );
									} catch (e) {

									}
								}
							}
						}
					}
					props = props + "</table>";
					return props;
				},
				print : function(obj, winname) {
					if (!site.debug)
						return;
					this._openwin(obj, this._print(obj, 0), winname);
				},
				check : function(el) {
					if (!el)
						el = document;
					if (typeof el == "string") {
						el = wdutil.get(el);
					}
					var tags = el.getElementsByTagName("*");
					var count = tags.length;
					var idArr = {};
					var idRetArr = {};
					var nameArr = {};
					var nameRetArr = {};
					var retId = true;
					var retName = true;
					for (var i = 0; i < count; i++) {
						var id = tags[i].id;
						var name = tags[i].name;
						if (id) {
							if (idArr[id]) {
								idArr[id] += 1;
								idRetArr[id] = idArr[id];
								retId = false;
							} else {
								idArr[id] = 1;
							}
						}

						if (name) {
							if (nameArr[name]) {
								nameArr[name] += 1;
								nameRetArr[name] = nameArr[name];
								retName = false;
							} else {
								nameArr[name] = 1;
							}
						}
					}
					if (!retId) {
						this.print(idRetArr, "重复ID");
					}
					if (!retName) {
						this.print(nameRetArr, "重复NAME");
					}
					return retId && retName;
				}
			}
		}
	);
	window[name] = wdutil;

})(jQuery, window, 'wdutil')
