; (function ($, window, name) {
	if ((name in window) && window[name]['ajax']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			ajax : {
				getBasicHeader: function() {
					var header = {};
					if (site && site.clientId) {
						headers = {
									'authorization': 'Basic ' + window.btoa(site.clientId + ":" + site.clientSecret)
								};
					}
					return header;
				},
				getBasicHeader: function() {
					var header = {};
					if (site && site.clientId) {
						headers = {
									'authorization': 'Basic ' + window.btoa(site.clientId + ":" + site.clientSecret)
								};
					}
					return header;
				},
				_ajax : function(params) {
					if (wdutil.win._logoutflag)
						return;
					if (params.mask) {
						wdutil.win.mask(params.mask);
					}
					var pm = wdutil.encode(params.data);
					if (site && site._mid) {
						pm._mid = site._mid;
					}
					if (site && site._murl) {
						pm._murl = site._murl;
					}
					var headers = params.headers;
					setTimeout(
						function() {
							$.ajax({
								url : params.url,
								type : params.type,
								data : pm,
								headers: headers,
								global : false,
								dataType : "text",
								success : function(text) {
									if (params.mask) {
										wdutil.win.unmask();
									}
									if (!text) {
										if (typeof (params.success) == "function") {
											params.success(null);
										}
										return;
									}
									var jr = wdutil.decode(text);
									if (jr == null)
										return;

									if (jr.success) {
										if (typeof (params.success) == "function") {
											params.success(jr.result);
										}
									} else {
										var errflag = false;
										if (typeof (params.error) == "function") {
											errflag = params
												.error(jr.message, jr.result);
										}
										if (!errflag) {
											if (jr.message) {
												if (jr.type == 2) {
													wdutil.win.error(jr.message);
												} else {
													wdutil.win.warn(jr.message);
												}
											}
										}
									}
									wdutil.win.doSomethingAfterAjax();
								},
								error : function(jqXHR, textStatus,
												 errorThrown) {
									if (params.mask) {
										wdutil.win.unmask();
									}
									var errmsg = jqXHR.responseText;
									if (jqXHR.status == 200) {
										// ie7即使服务器返回200，可能会回调error事件
										// 走一遍正常json流程
										var jr = wdutil.decode(errmsg);
										if (jr == null)
											return;

										if (jr.success) {
											if (typeof (params.success) == "function") {
												params.success(jr.result);
											}
										} else {
											var errflag = false;
											if (typeof (params.error) == "function") {
												errflag = params
													.error(jr.message, jr.result);
											}
											if (!errflag) {
												if (jr.message) {
													if (jr.type == 2) {
														wdutil.win
															.error(jr.message);
													} else {
														wdutil.win
															.warn(jr.message);
													}
												}
											}
										}
										wdutil.win.doSomethingAfterAjax();
									} else if (jqXHR.status == 404) {
										try {
											var msg = eval("(" + errmsg	+ ")");
											errmsg = msg.message;
										} catch (e) {
											errmsg = "您访问的资源不存在";
										}
									} else if (jqXHR.status == 500) {
										errmsg = "服务端异常[500]";
										try {
											var json = eval("("+jqXHR.responseText+")");
											if (json.statusCode == 300) {
												errmsg = json.message;
											}
										} catch (e) {
										}
									}
									var ret = false;
									//TODO 验证, 这个地方有疑问？error回调被二次执行
									if (typeof (params.error) == "function") {
										console.log('call error function')
										ret = params.error(errmsg);
									}
									if (!ret)
										wdutil.win.error(errmsg);
								}
							});
						}, 1);

				},
				post : function(params) {
					if (!params.url)
						return;
					params.type = "post";
					this._ajax(params);
				},
				get : function(params) {
					if (!params.url)
						return;
					params.type = "get";
					this._ajax(params);
				}
			},
			/**
			 * 参数编码
			 * @param text
			 */
			encode : function(data) {
				if (!data) return data;
				for ( var key in data) {
					var v = data[key];
					if (typeof (v) == "object") {
						if (v.getFullYear && DateFormat) {
							//日期型处理
							data[key] = DateFormat.format(v, 'yyyy-MM-dd hh:mm:ss.S');;
						} else {
							data[key] = JSON.stringify(v);
						}
					}
				}
				return data;
			},
			/**
			 * 结果解码
			 * @param text
			 */
			decode : function(text) {
				var jr = {
					"message": "",
					"success": false,
					"type": 0
				};
				var temp = null;
				try {
					if (typeof (text) == "string") {
						temp = eval("("+text+")");//wdutil.json.parse(text);
					} else {
						temp = text;
					}
				} catch (e) {
					jr.message = "返回数据格式有误，请检查系统是否异常";
					console.log(e);
					return jr;
				}

				switch (temp.statusCode) {
					case 200:// 成功
						var result = temp.result;
						if (result && result.pageresult) {
							result = result.pageresult;
						}
						jr.result = result;
						jr.success = true;
						break;
					case 300:// 业务错误提示
					case 500:// 请求错误
					case 403:// 无权限
						jr.message = temp.message;
						jr.result = temp.result;
						jr.type = 1;
						break;
					case 400:// 异常错误
						var errmsg = "服务端异常";
						if (temp.errtime)
							errmsg += "[" + temp.errtime + "]";
						jr.message = errmsg;
						jr.type = 2;
						break;
					case 401:// 登录超时
						wdutil.win.relogin();
						break;
					default:
						//标准格式json数据
						jr.result = temp;
						jr.success = true;
				}
				return jr;
			},
			request : function(params) {
				if (!params.url)
					return;
				if (!params.type)
					params.type = "post";
				this.ajax._ajax(params);
			},
			_submiting_ : false,
			_token : 0,
			submit : function(params) {
				if (!params.url)
					return;
				if (wdutil._submiting_) {
					wdutil.win.alert("请求处理中，请不要重复提交");
					return;
				}
				if (!wdutil._token) {
					wdutil._token = new Date().getTime();
				}
				if (params.mask)
					delete params.mask;
				wdutil._submiting_ = true;
				var messageid = wdutil.win.mask("执行中，请耐心等待 ...", "提示信息");
				var newparams = {};
				newparams.data = params.data;
				newparams.data._token = wdutil._token;
				newparams.url = params.url;
				newparams.success = function(result) {
					wdutil.win.unmask(messageid);
					var retcode = false;
					if (typeof (params.success) == "function") {
						retcode = params.success(result);
					}
					if (!retcode) {
						wdutil.win.info("操作成功");
					}
					wdutil._submiting_ = false;
					wdutil._token = new Date().getTime();
					return true;
				};
				newparams.error = function(errmsg, result) {
					wdutil.win.unmask(messageid);
					wdutil._submiting_ = false;
					wdutil._token = new Date().getTime();
					if (typeof (params.error) == "function") {
						return params.error.apply(this, arguments);
					} else {
						return false;
					}
				};
				this.ajax.post(newparams);
			},
			uploadone : function(obj, param) {
				if (!param)
					param = {};
				wdutil.win.mask("上传中......");
				$.ajaxFileUpload({
					url : obj.getAttribute("url"),// 用于文件上传的服务器端请求地址
					secureuri : false,// 一般设置为false
					fileElementId : obj.getAttribute("id"),// 文件上传控件的id属性
					dataType : 'text',// 返回值类型 一般设置为json
					data : param,
					success : function(data, status) {
						wdutil.win.unmask();
						if (data == "") {
							if (typeof (param.success) == "function") {
								param.success("");
							}
							return;
						}
						var jr = wdutil.decode(data);
						if (jr.success) {
							if (typeof (param.success) == "function") {
								param.success.call(this, jr.result);
							}
						} else {
							if (typeof (param.error) == "function") {
								param.error.call(this, jr.message, jr.result);
							}
							try {
								if (jr.type)
									wdutil.win.warn(jr.message);
							} catch (e) {

							}
						}
					},
					error : function(jqXHR, textStatus, errorThrown) {
						wdutil.win.unmask();
					}
				});
			}
		}
	);
	wdutil._token = new Date().getTime();
	window[name] = wdutil;

})(jQuery, window, 'wdutil')
