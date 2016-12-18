/**
 * Created by wencheng on 2016/12/10.
 */
(function (angular) {
	angular.module('todoApp.todoSrv',[]).service('todoSrv',['$window',function ($window) {

		var storage=$window.localStorage;
		var dataStr=storage.getItem('todo');
		var liList=JSON.parse(dataStr) || [];

		// 获取数据
		this.getData= function () {
			return liList;
		};

		//保存数据
		this.saveData= function () {
			storage.setItem('todo',JSON.stringify(liList))
		};
		// 添加数据
		this.addData= function (newTask) {
			var id;
			if(liList.length===0){
				id=0;
			}else {
				id=liList[liList.length-1].id+1;
			}
			liList.push({'id': id,'name':newTask,'isCompleted':false});
			this.saveData()
		};
		// 删除数据
		this.removeData= function (id) {
			for(var i=0;i<liList.length;i++){
				if(liList[i].id===id){
					liList.splice(i,1);
					this.saveData();
					return;
				}
			}
		};

		//添加选择全部的功能
		this.selectAll= function (isCheckAll) {
			for(var i=0;i<liList.length;i++){
				liList[i].isCompleted=isCheckAll;
			}
		};

		//添加清空全部已完成任务功能
		this.clearCompleted= function () {
			var temp=[];
			for(var i=0;i<liList.length;i++){
				if(!liList[i].isCompleted){
					temp.push(liList[i]);
				}
			};
			liList=temp;
			this.saveData()
		};
	}])
})(angular)
