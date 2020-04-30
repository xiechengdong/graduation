; (function ($, window, name) {
	if ((name in window) && window[name]['mock']) {
		return;
	}

	var STATUS_OK = 200;
	var STATUS_FAILURE = 300;
	var STATUS_ERROR = 400;
	var STATUS_UNLOGIN = 401;
	var STATUS_NOAUTHORITY = 403;
	var STATUS_BADREQUEST = 500;

	var defaultPageResult  = {
		"pageSize": 20,
		"pageIndex": 0,
		"total": 1000/*,
		"pageCount": 50*/
	};

	var defaultResult  = {
		"statusCode": 200,
		//"errorCode": "",
		"message": ""
	};

	var methods = $.extend(
		window[name] || {}, {
			"mock": {
				/*
				* mock.page( template )
				* mock.page( function() )
				* mock.page( rurl, template )
				* mock.page( rurl, function(options) )
				* mock.page( rurl, rtype, template )
				* mock.page( rurl, rtype, function(options) )

				根据数据模板生成[分页]模拟数据。
				 */
				"page" : function (rurl, rtype, template) {
					var args = Array.prototype.slice.apply(arguments);
					args.push('page');
					return this._mock.apply(this, args);
				},
				/*
				* mock.list( template )
				* mock.list( function() )
				* mock.list( rurl, template )
				* mock.list( rurl, function(options) )
				* mock.list( rurl, rtype, template )
				* mock.list( rurl, rtype, function(options) )

				根据数据模板生成[列表]模拟数据。
				 */
				"list" : function (rurl, rtype, template) {
					var args = Array.prototype.slice.apply(arguments);
					args.push('list');
					return this._mock.apply(this, args);
				},
				/*
				* mock.object( template )
				* mock.object( function() )
				* mock.object( rurl, template )
				* mock.object( rurl, function(options) )
				* mock.object( rurl, rtype, template )
				* mock.object( rurl, rtype, function(options) )

				根据数据模板生成模拟数据。
				 */
				"object" : function (rurl, rtype, template) {
					var args = Array.prototype.slice.apply(arguments);
					args.push('object');
					return this._mock.apply(this, args);
				},
				/*
				* mock.message( )
				* mock.message( message )
				* mock.message( message, statusCode )
				* mock.message( message, statusCode, result )
				* mock.message( rurl, message, statusCode, result )
				* mock.message( rurl, rtype, message, statusCode, result )
				 */
				"message": function (rurl, rtype, message, statusCode, result) {
					//mock.message()
					if (arguments.length === 0) {
						return this._mock({
							"message": "OK",
							"statusCode": STATUS_OK,
							"result": {}
						});
					}
					//mock.message( message )
					if (arguments.length === 1) {
						if (typeof rurl === 'object') {
							return this._mock({
								"message": "OK",
								"statusCode": STATUS_OK,
								"result": rurl
							});
						} else {
							return this._mock({
								"message": rurl,
								"statusCode": STATUS_OK,
								"result": {}
							});
						}
					}
					//mock.message( message, statusCode )
					if (arguments.length === 2) {
						return this._mock({
							"message": rurl,
							"statusCode": rtype,
							"result": {}
						});
					}
					//mock.message( message, statusCode, result )
					if (arguments.length === 3) {
						return this._mock({
							"message": rurl,
							"statusCode": rtype,
							"result": message
						});
					}
					//mock.message( rurl, message, statusCode, result )
					if (arguments.length === 4) {
						return this._mock(rurl, {
							"message": rtype,
							"statusCode": message,
							"result": statusCode
						}, undefined);
					}
					//mock.message( rurl, rtype, message, statusCode, result )
					return this._mock(rurl, rtype, {
						"message": message,
						"statusCode": statusCode,
						"result": result
					}, undefined);
				},
				/*
				* mock.success( )
				* mock.success( rurl )
				* mock.success( rurl, message )
				* mock.success( rurl, rtype, message )
				 */
				"success": function (rurl, rtype, message) {
					var args = Array.prototype.slice.apply(arguments);
					//mock.success( )
					if (arguments.length === 0) {
						return this.message();
					}
					//mock.success( rurl )
					if (arguments.length === 1) {
						args.push('OK');
					}
					//mock.success( rurl, message )
					//mock.success( rurl, rtype, message )
					args.push(STATUS_OK, {});
					return this.message.apply(this, args);
				},
				/*
				* mock.error( message )
				* mock.error( rurl, message )
				* mock.error( rurl, rtype, message )
				 */
				"error": function (rurl, rtype, message) {
					var args = Array.prototype.slice.apply(arguments);
					//mock.error( message )
					if (arguments.length === 1) {
						args.unshift(undefined);
					}
					//mock.error( rurl, message )
					//mock.error( rurl, rtype, message )
					args.push(STATUS_ERROR, {});
					return this.message.apply(this, args);
				},
				/*
				* mock.failed( message )
				* mock.failed( rurl, message )
				* mock.failed( rurl, rtype, message )
				 */
				"failed": function (rurl, message) {
					var args = Array.prototype.slice.apply(arguments);
					//mock.failed( message )
					if (arguments.length === 1) {
						args.unshift(undefined);
					}
					//mock.failed( rurl, message )
					//mock.failed( rurl, rtype, message )
					args.push(STATUS_FAILURE, {});
					return this.message.apply(this, args);
				},
				/*
				* mock.mock( template )
				* mock.mock( function() )
				* mock.mock( rurl, template )
				* mock.mock( rurl, function(options) )
				* mock.mock( rurl, rtype, template )
				* mock.mock( rurl, rtype, function(options) )
				 */
				"mock" : function (rurl, rtype, template) {
					var args = Array.prototype.slice.apply(arguments);
					args.push(undefined);
					return this._mock.apply(this, args);
				},
				/*
				* mock._mock( template )
				* mock._mock( function() )
				* mock._mock( template, resultType )
				* mock._mock( function(), resultType )
				* mock._mock( rurl, template )
				* mock._mock( rurl, function(options) )
				* mock._mock( rurl, template, resultType )
				* mock._mock( rurl, function(options), resultType )
				* mock._mock( rurl, rtype, template, resultType )
				* mock._mock( rurl, rtype, function(options), resultType )
				 */
				"_mock" : function (rurl, rtype, template, resultType) {
					// mock._mock(template)
					// mock._mock(function())
					if (arguments.length === 1) {
						return Mock.mock(rurl);
					}
					if (arguments.length === 2) {
						if (rurl && typeof rurl==="object" || typeof rurl==="function") {
							// mock._mock(template, resultType)
							// mock._mock(function(), resultType)
							return Mock.mock(this._getResultTemplate(rurl, rtype));
						} else {
							// mock._mock(rurl, template)
							// mock._mock(rurl, function(options))
							if (rurl) {
								return Mock.mock(this._getUrlPattern(rurl), rtype);
							} else {
								return Mock.mock(rtype);
							}
						}
					}
					// mock._mock(rurl, template, resultType)
					// mock._mock(rurl, function(options), resultType)
					if (arguments.length === 3) {
						resultType = template
						template = rtype
						rtype = undefined
					}
					if (rurl) {
						return Mock.mock(this._getUrlPattern(rurl), rtype, this._getResultTemplate(template, resultType));
					} else {
						return Mock.mock(this._getResultTemplate(template, resultType));
					}
				},
				"_resultFactory": {
					"page" : function (template, options) {
						var params = options && options.params || {};
						var pageQuery = {
							"pageSize": params['pageSize'] || defaultPageResult.pageSize,
							"pageIndex": params['pageIndex'] || defaultPageResult.pageIndex
						};
						var pageResult =  $.extend(defaultPageResult, pageQuery);

						if (typeof template === 'function') {
							template = template.call(this, options);
						}

						pageResult["data|" + pageResult.pageSize] =  [template];

						return $.extend(defaultResult, {
							"result": {
								"pageresult": pageResult
							}
						});
					},
					"list" : function (template) {
						return $.extend(defaultResult, {
							"result": {
								"data|0-20": [template]
							}
						});
					},
					"object" : function (template) {
						return $.extend(defaultResult, {
							"result": {
								"data": template
							}
						});
					}
				},
				"_getResultTemplate" : function (template, resultType) {
					var me = this;
					return function (options) {

						var t = template;

						if (options && options.url && typeof options.params === "undefined") {
							options.params = (new Url(options.url)).params;
							if (options.body) {
								options.params = $.extend(options.params || {}, Url.parseSearch(options.body));
							}
						}

						if (typeof t === 'function') {
							t = t.call(this, options);
						}

						var result =  (resultType && me._resultFactory[resultType]) ?
							me._resultFactory[resultType](t, options) :
							t;

						return Mock.mock(result);

					};
				},
				"_getUrlPattern" : function (url) {
					return new RegExp(wssip.url.getUrl(url) + '.*');
				}
			}
		});

	window[name] = methods;

})(jQuery, window, 'wssip')
