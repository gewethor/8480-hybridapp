import Ember from 'ember';

export default Ember.Component.extend({
  lvl: 0,
  on: true,
  startLogging: function(){
      var component = this;
      this.onBatteryStatus(component);
  }.on('init'),
  onBatteryStatus: function (component) {
     navigator.getBattery().then(function(battery){
     component.set('lvl', battery.level * 100);
     });
	}
});
