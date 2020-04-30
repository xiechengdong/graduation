; (function (Mock) {

	wssip.mock.object('user', 'post', function (options) {
		var id = options.params['id'] || 1;
		if (id == 1) {
			return {
				"id": 1,
				"loginname": "system",
				"name": "超级管理员",
				"mailFlag": false,
				"phoneFlag": false,
				"realPersonFlag": false,
				"realNameFlag": false,
				"status": 1,
				"enabled": true,
				"removed": false,
				"authorities": [
					{
						"authority": "MENU:APPLICATION"
					},
					{
						"authority": "MENU:APP_CRUD"
					},
					{
						"authority": "MENU:AUTHORIZEENTIC"
					},
					{
						"authority": "MENU:AUTH_ADMIN"
					},
					{
						"authority": "MENU:AUTH_ORGAN"
					},
					{
						"authority": "MENU:CODE_ITEM"
					},
					{
						"authority": "MENU:CODE_TYPE"
					},
					{
						"authority": "MENU:ORGAN"
					},
					{
						"authority": "MENU:ORGAN_AUTH"
					},
					{
						"authority": "MENU:ORGAN_NODE"
					},
					{
						"authority": "MENU:ORGAN_NODE_TYPE"
					},
					{
						"authority": "MENU:PLATEFORM"
					},
					{
						"authority": "MENU:RESOURCE"
					},
					{
						"authority": "MENU:RESOURCE_CRUD"
					},
					{
						"authority": "MENU:ROLE"
					},
					{
						"authority": "MENU:ROLE_ASSIFN"
					},
					{
						"authority": "MENU:ROLE_AUTHORITY"
					},
					{
						"authority": "MENU:SYSTEM"
					},
					{
						"authority": "MENU:TEST"
					},
					{
						"authority": "MENU:USER"
					},
					{
						"authority": "MENU:USERORGANIZE"
					},
					{
						"authority": "MENU:USER_"
					},
					{
						"authority": "MENU:USER_ACTIVATE"
					},
					{
						"authority": "MENU:USER_ASSIGN"
					},
					{
						"authority": "MENU:USER_AUTHORITY"
					},
					{
						"authority": "MENU:USER_LOCK"
					},
					{
						"authority": "MENU:USER_REMOVE"
					},
					{
						"authority": "MENU:USER_UNLOCK"
					},
					{
						"authority": "MENU:test"
					},
					{
						"authority": "MENU:BASE_OPERATION"
					},
					{
						"authority": "MENU:BBBF"
					},
					{
						"authority": "MENU:100000010"
					},
					{
						"authority": "MENU:100000011"
					},
					{
						"authority": "MENU:100000020"
					},
					{
						"authority": "MENU:100000021"
					},
					{
						"authority": "MENU:100000030"
					},
					{
						"authority": "MENU:100000031"
					},
					{
						"authority": "MENU:100000032"
					},
					{
						"authority": "MENU:100000033"
					},
					{
						"authority": "MENU:100000040"
					},
					{
						"authority": "MENU:100000041"
					},
					{
						"authority": "MENU:100000042"
					},
					{
						"authority": "MENU:QHJH"
					},
					{
						"authority": "MENU:DEMO"
					},
					{
						"authority": "MENU:INDEX"
					},
					{
						"authority": "MENU:INDEX2"
					},
					{
						"authority": "MENU:INDEX_LONE"
					},
					{
						"authority": "MENU:INDEX_LONE2"
					},
					{
						"authority": "MENU:MENU_DEMO"
					},
					{
						"authority": "MENU:SELECTOR_AND_QUERY"
					},
					{
						"authority": "MENU:SIMPLE"
					},
					{
						"authority": "MENU:TREE"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "CODE_ITEM_DELETE"
					},
					{
						"authority": "CODE_ITEM_SAVE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ROLE_SELECTUSER"
					},
					{
						"authority": "ADMIN_ROLE_SELECTROLE"
					},
					{
						"authority": "ADMIN_ROLE_REMOVEROLE"
					},
					{
						"authority": "CODE_ITEM_UPDATE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ROLE_DELETEROLE"
					},
					{
						"authority": "ADMIN_AUTHORITY_SAVEROLEINFOAUTH"
					},
					{
						"authority": "ADMIN_ROLE_ADDROLE"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_PASSWORDRESET"
					},
					{
						"authority": "ADMIN_USER_ADDORREMOVEROLES"
					},
					{
						"authority": "ADMIN_USER_UPDATEUSERPERSON"
					},
					{
						"authority": "ADMIN_USER_SAVEUSERPERSON"
					},
					{
						"authority": "ADMIN_USER_ACTIVEUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_LOCKUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_DEBLOCKUSER"
					},
					{
						"authority": "ADMIN_USER_CANCELUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_UPDATENODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_QUERYUSERSINNODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_QUERYMANAGERSINNODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETENODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_SAVENODE"
					},
					{
						"authority": "ADMIN_ROLE_REMOVEUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_DELETE"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_SAVEORUPDATEORGANNODETYPE"
					},
					{
						"authority": "ADMIN_APPLICATION_ADDROOTMENU"
					},
					{
						"authority": "CODE_ITEM_QUERY"
					},
					{
						"authority": "CODE_ITEM_UPDATE"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_SAVEORUPDATEORGANNODETYPE"
					},
					{
						"authority": "ADMIN_APPLICATION_SAVEORUPDATEAPPLICATION"
					},
					{
						"authority": "CODE_ITEM_SAVE"
					},
					{
						"authority": "CODE_ITEM_DELETE"
					},
					{
						"authority": "MENU_UPDATEMENUNODE"
					},
					{
						"authority": "MENU_ADDMENUNODE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_ADDMANAGERSINNODE"
					},
					{
						"authority": "ADMIN_APPLICATION_SAVEORUPDATEAPPLICATION"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_APPLICATION_DELETE"
					},
					{
						"authority": "MENU_REMOVEMENU"
					},
					{
						"authority": "ADMIN_ORGANNODE_ADDUSERSINNODE"
					},
					{
						"authority": "CODE_TYPE_QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETEUSERSINNODE"
					},
					{
						"authority": "CODE_TYPE_UPDATE"
					},
					{
						"authority": "CODE_TYPE_SAVE"
					},
					{
						"authority": "TEST_ONE"
					},
					{
						"authority": "TEST_TWO"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETEMANAGERSINNODE"
					},
					{
						"authority": "ROLE_SYSTEM"
					},
					{
						"authority": "ROLE_CFO"
					},
					{
						"authority": "ROLE_R01"
					},
					{
						"authority": "ROLE_Test"
					},
					{
						"authority": "ROLE_liuliangR"
					}
				],
				"roles": [
					{
						"name": "超级管理员",
						"code": "SYSTEM"
					}
				],
				"accountNonExpired": true,
				"accountNonLocked": true,
				"credentialsNonExpired": true,
				"admin": true,
				"username": "system"
			};
		}
		else if (id == 2) {
			return {
				"id": 2,
				"loginname": "admin",
				"name": "管理员",
				"mailFlag": false,
				"phoneFlag": false,
				"realPersonFlag": false,
				"realNameFlag": false,
				"status": 1,
				"enabled": true,
				"removed": false,
				"authorities": [
					{
						"authority": "MENU:APPLICATION"
					},
					{
						"authority": "MENU:APP_CRUD"
					},
					{
						"authority": "MENU:AUTHORIZEENTIC"
					},
					{
						"authority": "MENU:AUTH_ADMIN"
					},
					{
						"authority": "MENU:AUTH_ORGAN"
					},
					{
						"authority": "MENU:CODE_ITEM"
					},
					{
						"authority": "MENU:CODE_TYPE"
					},
					{
						"authority": "MENU:ORGAN"
					},
					{
						"authority": "MENU:ORGAN_AUTH"
					},
					{
						"authority": "MENU:ORGAN_NODE"
					},
					{
						"authority": "MENU:ORGAN_NODE_TYPE"
					},
					{
						"authority": "MENU:PLATEFORM"
					},
					{
						"authority": "MENU:RESOURCE"
					},
					{
						"authority": "MENU:RESOURCE_CRUD"
					},
					{
						"authority": "MENU:ROLE"
					},
					{
						"authority": "MENU:ROLE_ASSIFN"
					},
					{
						"authority": "MENU:ROLE_AUTHORITY"
					},
					{
						"authority": "MENU:SYSTEM"
					},
					{
						"authority": "MENU:TEST"
					},
					{
						"authority": "MENU:USER"
					},
					{
						"authority": "MENU:USERORGANIZE"
					},
					{
						"authority": "MENU:USER_"
					},
					{
						"authority": "MENU:USER_ACTIVATE"
					},
					{
						"authority": "MENU:USER_ASSIGN"
					},
					{
						"authority": "MENU:USER_AUTHORITY"
					},
					{
						"authority": "MENU:USER_LOCK"
					},
					{
						"authority": "MENU:USER_REMOVE"
					},
					{
						"authority": "MENU:USER_UNLOCK"
					},
					{
						"authority": "MENU:test"
					},
					{
						"authority": "MENU:BASE_OPERATION"
					},
					{
						"authority": "MENU:BBBF"
					},
					{
						"authority": "MENU:100000010"
					},
					{
						"authority": "MENU:100000011"
					},
					{
						"authority": "MENU:100000020"
					},
					{
						"authority": "MENU:100000021"
					},
					{
						"authority": "MENU:100000030"
					},
					{
						"authority": "MENU:100000031"
					},
					{
						"authority": "MENU:100000032"
					},
					{
						"authority": "MENU:100000033"
					},
					{
						"authority": "MENU:100000040"
					},
					{
						"authority": "MENU:100000041"
					},
					{
						"authority": "MENU:100000042"
					},
					{
						"authority": "MENU:QHJH"
					},
					{
						"authority": "MENU:DEMO"
					},
					{
						"authority": "MENU:INDEX"
					},
					{
						"authority": "MENU:INDEX2"
					},
					{
						"authority": "MENU:INDEX_LONE"
					},
					{
						"authority": "MENU:INDEX_LONE2"
					},
					{
						"authority": "MENU:MENU_DEMO"
					},
					{
						"authority": "MENU:SELECTOR_AND_QUERY"
					},
					{
						"authority": "MENU:SIMPLE"
					},
					{
						"authority": "MENU:TREE"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "CODE_ITEM_DELETE"
					},
					{
						"authority": "CODE_ITEM_SAVE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ROLE_SELECTUSER"
					},
					{
						"authority": "ADMIN_ROLE_SELECTROLE"
					},
					{
						"authority": "ADMIN_ROLE_REMOVEROLE"
					},
					{
						"authority": "CODE_ITEM_UPDATE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ROLE_DELETEROLE"
					},
					{
						"authority": "ADMIN_AUTHORITY_SAVEROLEINFOAUTH"
					},
					{
						"authority": "ADMIN_ROLE_ADDROLE"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_PASSWORDRESET"
					},
					{
						"authority": "ADMIN_USER_ADDORREMOVEROLES"
					},
					{
						"authority": "ADMIN_USER_UPDATEUSERPERSON"
					},
					{
						"authority": "ADMIN_USER_SAVEUSERPERSON"
					},
					{
						"authority": "ADMIN_USER_ACTIVEUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_LOCKUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_DEBLOCKUSER"
					},
					{
						"authority": "ADMIN_USER_CANCELUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_UPDATENODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_QUERYUSERSINNODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_QUERYMANAGERSINNODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETENODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_SAVENODE"
					},
					{
						"authority": "ADMIN_ROLE_REMOVEUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_DELETE"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_SAVEORUPDATEORGANNODETYPE"
					},
					{
						"authority": "ADMIN_APPLICATION_ADDROOTMENU"
					},
					{
						"authority": "CODE_ITEM_QUERY"
					},
					{
						"authority": "CODE_ITEM_UPDATE"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_SAVEORUPDATEORGANNODETYPE"
					},
					{
						"authority": "ADMIN_APPLICATION_SAVEORUPDATEAPPLICATION"
					},
					{
						"authority": "CODE_ITEM_SAVE"
					},
					{
						"authority": "CODE_ITEM_DELETE"
					},
					{
						"authority": "MENU_UPDATEMENUNODE"
					},
					{
						"authority": "MENU_ADDMENUNODE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_ADDMANAGERSINNODE"
					},
					{
						"authority": "ADMIN_APPLICATION_SAVEORUPDATEAPPLICATION"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_APPLICATION_DELETE"
					},
					{
						"authority": "MENU_REMOVEMENU"
					},
					{
						"authority": "ADMIN_ORGANNODE_ADDUSERSINNODE"
					},
					{
						"authority": "CODE_TYPE_QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETEUSERSINNODE"
					},
					{
						"authority": "CODE_TYPE_UPDATE"
					},
					{
						"authority": "CODE_TYPE_SAVE"
					},
					{
						"authority": "TEST_ONE"
					},
					{
						"authority": "TEST_TWO"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETEMANAGERSINNODE"
					},
					{
						"authority": "ROLE_SYSTEM"
					},
					{
						"authority": "ROLE_CFO"
					},
					{
						"authority": "ROLE_R01"
					},
					{
						"authority": "ROLE_Test"
					},
					{
						"authority": "ROLE_liuliangR"
					}
				],
				"roles": [
					{
						"name": "超级管理员",
						"code": "SYSTEM"
					}
				],
				"accountNonExpired": true,
				"accountNonLocked": true,
				"credentialsNonExpired": true,
				"admin": true,
				"username": "system"
			};
		}
	});


})(Mock)

