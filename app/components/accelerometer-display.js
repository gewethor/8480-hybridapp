import Ember from 'ember';

export default Ember.Component.extend({
	x: 0,
	y: 0,
	z: 0,
	accelHistory: [],
	on: true,
	startLogging: function(){

		var component = this;
		this.updateAccelData(component);

	}.on('init'),
	updateAccelData: function(component){
		Ember.run.later(function(){
			try {
				navigator.accelerometer.getCurrentAcceleration(function (acceleration) {
					//console.log('acceleration setvars called');
					component.set('x', acceleration.x);
					component.set('y', acceleration.y);
					component.set('z', acceleration.z);

					var history=component.get('accelHistory');
					if(history.length === 150) {
						history.shiftObject();
						history.shiftObject();
						history.shiftObject();
					}
					var t = Date.now();
					var newXPoint = {time: t, label: 'x', value: acceleration.x};
					var newYPoint = {time: t, label: 'y', value: acceleration.y};
					var newZPoint = {time: t, label: 'z', value: acceleration.z};
					history.addObjects([newXPoint, newYPoint, newZPoint]);
					//console.log("accel cals: x: "+ acceleration.x+ " y: "+acceleration.y+" z: "+acceleration.z+" t: "+ Date.now());
				}, function (error) {
					console.log('error: ' + error);
				});
			}
			catch(err){
				console.log('error: '+err);
			}
			if(component.get('on')){
				component.updateAccelData(component);
			}
		}, 100);
	}
});
