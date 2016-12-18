/**
 * Created by wencheng on 2016/12/10.
 */
(function (angular) {
	var app=angular.module('todoApp.todoCtr',['ngRoute']);
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:status?',{
			templateUrl:'todoView.html',
			controller:'todoController'
		});
	}])
	app.controller('todoController',['$scope','$location','$routeParams','todoSrv', function ($scope, $location,$routeParams, todoSrv) {

		$scope.liList=todoSrv.getData();

		//添加一条新任务
		$scope.newTask='';
		$scope.add= function () {
			if(!$scope.newTask){
				return
			}
			todoSrv.addData($scope.newTask);
			$scope.newTask='';
		};

		//删除一条任务
		$scope.remove= function (id) {
			todoSrv.removeData(id);
		};

		//修改功能
		$scope.updateId=-1;
		$scope.update= function (id) {
			$scope.updateId=id;
		};
		//修改后保存
		$scope.save= function () {
			$scope.updateId=-1;
			// 保存数据
			todoSrv.saveData();
		};

		//添加选择全部的功能
		$scope.isCheckAll=false;
		$scope.selectAll= function () {
			todoSrv.selectAll($scope.isCheckAll);
		};
		$scope.$watch('liList', function (newValue,oldValue) {
			if(newValue===oldValue) return ;
			todoSrv.saveData();
		},true);

		// 添加清空全部已完成任务功能
		$scope.clearCompleted= function () {
			todoSrv.clearCompleted();
			$scope.liList=todoSrv.getData();

		};
		// 添加清空已完成按钮的显示与隐藏
		$scope.isShow= function () {
			for(var i=0;i<$scope.liList.length;i++){
				if($scope.liList[i].isCompleted){
					return true;
				}
			}
			return false;
		}

		// 添加未完成任务个数的功能
		$scope.getCount= function () {
			$scope.count=0;
			$scope.liList.forEach(function (value) {
				if(!value.isCompleted){
					$scope.count+=1
				}
			});
			return $scope.count;
		};

		switch ($routeParams.status){
			case '':
				$scope.status={};
						break;
			case 'active':
				$scope.status={'isCompleted':false};
						break;
			case 'completed':
				$scope.status={'isCompleted':true};
						break;
			default :
				$scope.status={};
						break;
		}

		// 实现筛选不同状态的功能
		//$scope.status={};
		/*$scope.checkAll= function () {
		 $scope.status={}
		 };
		 $scope.checkActive= function () {
		 $scope.status={'isCompleted':false}
		 };
		 $scope.checkCompleted= function () {
		 $scope.status={'isCompleted':true};
		 }*/

		// 根据url锚点值得变化显示不同的任务状态
		//$scope.location=$location;
		//$scope.$watch('location.url()', function (newValue) {
		//	switch (newValue){
		//		case '/' :
		//			$scope.status={};
		//			break;
		//		case '/active' :
		//			$scope.status={'isCompleted':false};
		//			break;
		//		case '/completed' :
		//			$scope.status={'isCompleted':true};
		//			break;
		//		default :
		//			$scope.status={};
		//			break;
		//	}
		//})
	}])
})(angular)
