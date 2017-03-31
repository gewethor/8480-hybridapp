import Ember from 'ember';

export default Ember.Component.extend({
	metawearConnected: false,
	macAddressOfBoard: 'F3:30:D9:88:01:7E',
	actions: {
		connect: function(){
			var component = this;
			Ember.run.later(function(){
				//wrapper to preserve binding satistfaction
				try {
				//invoke metawear connection
					console.log('attempting to connect to: ' + component.get('macAddressOfBoard'));
					metawear.mwdevice.connect(component.get('macAddressOfBoard'),
						function(){//success
							console.log('connected');
							component.set('metawearConnected', true);
						}, function(error){//failure
							console.log('connection failed' +error);
							alert('error: '+error);
					});
				}
				catch(err){
					console.log('error: '+err);
					alert('error: '+err);
					}
				
					}, 100);//run after 100ms
				},
				disconnect: function(){
					var component = this;
					Ember.run.later(function(){
						//wrapper to preserve binding satistfaction
						try {
						//invoke metawear connection
							console.log('Disconnecting from: ' + component.get('macAddressOfBoard'));
							metawear.mwdevice.disconnect();
							component.set('metawearConnected', false);
						}
						catch(err){
							console.log('error: '+err);
							alert('error: '+err);
						}
				
					}, 100);//run after 100ms
				},
				playLED: function(){
					var component = this;
					Ember.run.later(function(){
						//wrapper to preserve binding satistfaction
						try {
						//invoke metawear connection
							console.log('Turning on Blue Light: ' + component.get('macAddressOfBoard'));
							metawear.mwdevice.playLED({channel:"BLUE",
								riseTime: 0, pulseDuration: 1000,
								repeatCount: 5, highTime: 500,
								fallTime: 750, lowIntensity: 16,
								highIntensity: 31});
						}
						catch(err){
							console.log('error: '+err);
							alert('error: '+err);
						}
				
					}, 100);//run after 100ms 
				},
				stopLED: function(){
					var component = this;
					Ember.run.later(function(){
						//wrapper
						try {
						//invoke metawear connection
							console.log('Shutting off Blue Light: ' + component.get('macAddressOfBoard'));
							metawear.mwdevice.stopLED();
						}
						catch(err){
							console.log('error: '+err);
							alert('error: '+err);
						}
					}, 100);//run after 100ms
				}
	}
});
