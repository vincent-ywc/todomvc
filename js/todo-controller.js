(function(angular) {
	
angular.module('todo.Ctrl', ["ngRoute"])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when("/:status?", {
			templateUrl: "todoId",
			controller: "todoController"
		});
	}])
	.controller('todoController', ['$scope', '$location', '$routeParams','Todo',
		function($scope, $location, $routeParams, Todo){

			$scope.todo = {};
			var todo = $scope.todo;

			// 1 数据
			todo.taskList = Todo.get();

			// 2 添加
			// 说明：利用form表单的提交事件，按回车键会触发submit事件
			todo.newTask = "";
			todo.add = function() {
				if(!todo.newTask) {
					return;
				}

				Todo.add( todo.newTask );
				todo.newTask = "";
			};

			// 3 删除
			todo.remove = Todo.remove;

			// 4 修改
			// 说明：利用样式控制文本框的展示和隐藏
			// 	     利用 编辑id与当前元素id 设置为相同进行样式设置
			todo.editId = -1;
			todo.edit = function(id) {
				todo.editId = id;
			};
			todo.save = function() {
				todo.editId = -1;
			};

			// 5 切换当前任务状态
			// 说明：利用双向绑定特性完成
			$scope.$watch('todo.taskList', function(newValue, oldValue, scope) {
				Todo.save();
			}, true);

			// 6 批量切换任务完成状态
			todo.selectedAll = false;
			todo.toggleAll = function() {
				Todo.toggleAll(todo.selectedAll);
			};

			$scope.$watch('todo.taskList', function(newValue, oldValue) {
				if(newValue === oldValue) return;

				// 记录已完成任务数
				var count = 0;
				todo.taskList.forEach(function(item) {
					if(item.completed) {
						count += 1;
					}
				});

				if(count === todo.taskList.length) {
					todo.selectedAll = true;
				} else {
					todo.selectedAll = false;
				}
				
			}, true);

			// 7 清除已完成任务
			// 说明：注意删除数组的“陷阱”
			todo.clearAll = function() {
				Todo.clearAll();
				todo.taskList = Todo.get();
			};

			// 7.1 控制 “Clear completed” 按钮展示与否
			todo.isShow = Todo.hasCompleted;

			// 8 显示未完成任务数
			todo.unCompleted = Todo.unCompleted;

			// 9 切换不同任务的显示与否
			// 9.1 切换样式
			todo.isCompeleted = {};
			console.log($routeParams.status)
			switch($routeParams.status) {
				case "active":
					todo.isCompeleted = {completed: false};
					break;
				case "completed":
					todo.isCompeleted = {completed: true};
					break;
				default:
					todo.isCompeleted = {};
					break;
			}
		}]);


})(angular);