(function(angular) {

angular.module('todo.service', [])
	.service('Todo', ['$window', function($window){
		// this.test = "服务到永远";
		var storage = $window.localStorage;
		var taskList = JSON.parse(storage.getItem("todo")) || [];

		this.save = function() {
			storage.setItem("todo", JSON.stringify(taskList));
		};

		// 1 获取数据
		this.get = function() {
			return taskList;
		};

		// 2 添加数据
		this.add = function(task) {
			var id;
			if(!task) {
				return;
			}

			// 根据当前数据生成id值
			if(taskList.length === 0) {
				id = 1;
			} else {
				id = taskList[ taskList.length - 1 ].id + 1;
			}

			taskList.push({id: id, name: task, completed: false  });

			this.save();
		};

		// 3 删除数据
		this.remove = function(id) {
			var length = taskList.length,
				i;
			for(i = 0; i < length; i++) {
				if(taskList[i].id === id) {
					taskList.splice(i, 1);
					break;
				}
			}
			this.save();
		};

		// 6 切换状态
		this.toggleAll = function(selectedAll) {
			taskList.forEach(function(item) {
				item.completed = selectedAll;
			});
			this.save();
		};

		// 7 清除已完成任务
		this.clearAll = function() {
			var tempList = [];
			taskList.forEach(function(value) {
				if(!value.completed) {
					tempList.push(value);
				}
			});

			taskList = tempList;
		};

		// 7.1 判断是否有已完成任务
		this.hasCompleted = function() {
			var length = taskList.length,
				i;
			for(i = 0; i < length; i++) {
				if(taskList[i].completed) {
					return true;
				}
			}

			return false;
		};

		// 8 获取未完成任务数
		this.unCompleted = function() {
			var count = 0;
			taskList.forEach(function(value) {
				if(!value.completed) {
					count += 1;
				}
			});

			return count;
		};
	}]);

})(angular);