/*****  main  *****/
appUser.controller('userCtrl',function($scope,$cookieStore){
	$scope.test="main";
	$scope.username=$cookieStore.get('username');
	$scope.auth=$cookieStore.get('auth');
	if(typeof($cookieStore.get('auth'))=='undefined'){
		window.location.href='/';
	}
	$scope.logOff=function(){
		$cookieStore.remove('username');
		$cookieStore.remove('auth');
		window.location.href='/';
	}
});
appUser.controller('userMain',function($scope){
	$scope.test="userMain";

	var weight = echarts.init(document.getElementById('weight'));
	var base = +new Date(2015, 1, 1);
	var oneDay = 24 * 3600 * 1000;
	var date = [];

	var data = [Math.random() * 65];

	for (var i = 1; i < 500; i++) {
		var now = new Date(base += oneDay);
		date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
		data.push(Math.round(Math.random()*8+65));
	}
	console.log(data);

	option = {
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '10%'];
			}
		},
		title: {
			left: 'center',
			text: '体重',
		},
		legend: {
			top: 'bottom',
			data:['意向']
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: date
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%']
		},
		dataZoom: [{
			type: 'inside',
			start: 0,
			end: 10
		}, {
			start: 0,
			end: 10,
			handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			handleSize: '80%',
			handleStyle: {
				color: '#fff',
				shadowBlur: 3,
				shadowColor: 'rgba(0, 0, 0, 0.6)',
				shadowOffsetX: 2,
				shadowOffsetY: 2
			}
		}],
		series: [
		{
			name:'当天数据',
			type:'line',
			smooth:true,
			symbol: 'none',
			sampling: 'average',
			itemStyle: {
				normal: {
					color: 'rgb(255, 70, 131)'
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgb(255, 158, 68)'
					}, {
						offset: 1,
						color: 'rgb(255, 70, 131)'
					}])
				}
			},
			data: data
		}
		]
	};

	weight.setOption(option);

	var pressure = echarts.init(document.getElementById('pressure'));
	option = {
		title: {
			left: 'center',
			text: '血压'
		},
		tooltip : {
			trigger: 'axis'
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis : [
		{
			type : 'category',
			boundaryGap : false,
			data : ['周一','周二','周三','周四','周五','周六','周日']
		}
		],
		yAxis : [
		{
			type : 'value'
		}
		],
		series : [
		{
			name:'高压',
			type:'line',
			stack: '总量',
			areaStyle: {normal: {}},
			data:[80, 78, 84, 84, 80, 79, 81]
		},
		{
			name:'低压',
			type:'line',
			stack: '总量',
			areaStyle: {normal: {}},
			data:[38, 37, 36, 39, 40, 37, 36]
		}
		]
	};
	pressure.setOption(option);

});