/* SidebarMenu()
 * 树形导航菜单
 * 数据格式: { id, text, parentId?, href?, hrefTarget?, icon, iconCls, cls, expanded, children }
 */
+function ($) {
	'use strict';

	var DataKey = {
		url: 'url',
		idField: 'idField',
		textField: 'textField',
		iconClsField: 'iconClsField',
		childrenField: 'childrenField',
		data: 'lte.sidebarmenu'
	};

	var Default = {
		data: null,
		idField: 'id',
		textField: 'text',
		iconClsField: 'iconCls',
		childrenField: 'children',
		itemclick: null
	};

	var Selector = {
		tree        : '.tree',
		treeview    : '.treeview',
		treeviewMenu: '.treeview-menu',
		open        : '.menu-open, .active',
		li          : 'li',
		data        : '[data-widget="sidebarmenu"]',
		active      : '.active'
	};

	var ClassName = {
		treeviewMenu  : 'treeview-menu',
		open: 'menu-open',
		tree: 'tree'
	};

	var Event = {
		itemclick: 'click.item.sidebarMenu'
	};

	// SidebarMenu Class Definition
	// =========================
	var SidebarMenu = function (element, options) {
		this.element = element;
		this.options = options;
		this.init();
	}

	SidebarMenu.prototype = {

		loadData: function (data) {
			this.options.data = data || [];
			this.refresh();
		},

		refresh: function () {
			this._render();
		},

		init: function () {
			var me = this,
				url = $(me).data(DataKey.url) || (site && site.url && site.url.menu),
				el = me.element;

			wdutil.request({
				type: 'get',
                url: site.path.buildUrl(url) || site.path.data + '/admin/auth/menu',
				dataType: 'json',
				success: function (data) {
					if (typeof data === "string") data = mini.decode(data);
					if (data && data.data) data = data.data;
					me.loadData(data);
					$(el).tree();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log('request error!', XMLHttpRequest, textStatus, errorThrown);
				}
			})

			el.on('click', '.treeview-menu a', function (event) {
				var el = $(event.currentTarget);

				var li = el.parent();

				var item = me.getItemByEvent(event);

				//var itemclickEvent = $.Event(Event.itemclick);

				//$(me.element).trigger(itemclickEvent, [item]);

				$(me.element).trigger(Event.itemclick, [item]);

			});
		},

		_render: function () {
			var data = this.options.data || [];
			var html = this._renderItems(data, null);

			this.element.append(html);
		},

		_renderItems: function (items, parent) {
			var s = '';
			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];
				s += this._renderItem(item);
			}
			if (parent) {
				return '<ul class="treeview-menu">' + s + '</ul>';
			} else {
				return s;
			}
		},

		_renderItem: function (item) {

			var me = this;
			var hasChildren = item[me.options[DataKey.childrenField]] && item[me.options[DataKey.childrenField]].length > 0;

			var s = '';

			if (hasChildren) {
				s += '<li class="treeview">';
				s += '<a data-id="' + item[me.options[DataKey.idField]] + '" href="#">';
				s += '<i class="' + item[me.options[DataKey.iconClsField]] + '"></i>';
				s += '<span>' + item[me.options[DataKey.textField]] + '</span>';
				s += '<span class="pull-right-container">';
				s += '<i class="fa fa-angle-left pull-right"></i>';
				s += '</span>';
				s += '</a>';

				s += me._renderItems(item[me.options[DataKey.childrenField]], item);

				s += '</li>';
			} else {
				s += '<li>';
				s += '<a data-id="' + item[me.options[DataKey.idField]] + '"';
				//TODO 菜单链接暂时忽略，
				if (false && item.url) {
					var href = item.url;
					if (href && href.indexOf('//')===-1) href = site.path.base + href;
					s += ' href="' + href + '" target="' + (item.hrefTarget || '') + '"';
				} else {
					s += ' href="javascript:void(0)"';
					//s += ' href="#"';
				}
				s += '>';
				s += '<i class="' + item[me.options[DataKey.iconClsField]] + '"></i> ';
				s += '' + item[me.options[DataKey.textField]] + '';
				s += '</a>';
				s += '</li>';
			}

			return s;
		},

		getItemByEvent: function (event) {
			var el = $(event.target).closest('a');
			var id = el.attr("data-id");
			return this.getItemById(id);
		},

		getItemById: function (id) {
			var me = this,
				idHash = me._idHash;

			if (!idHash) {
				idHash = me._idHash = {};
				function each(items) {
					for (var i = 0, l = items.length; i < l; i++) {
						var item = items[i];
						if (item.children) each(item.children);
						idHash[item.id] = item;
					}
				}
				each(me.options.data);
			}

			return me._idHash[id];
		}

	};

	// SidebarMenu Plugin Definition
	// ==========================
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data  = $this.data(DataKey.data);

			if (!data) {
				var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
				$this.data(DataKey.data, new SidebarMenu($this, options));
			}
		});
	}

	var old = $.fn.sidebarMenu;

	$.fn.sidebarMenu             = Plugin;
	$.fn.sidebarMenu.Constructor = SidebarMenu;

	// No Conflict Mode
	// ================
	$.fn.sidebarMenu.noConflict = function () {
		$.fn.sidebarMenu = old;
		return this;
	};

	// Data API
	// ========
	$(window).on('load', function () {
		$(Selector.data).each(function () {
			Plugin.call($(this));
		});
	});
}(jQuery);
