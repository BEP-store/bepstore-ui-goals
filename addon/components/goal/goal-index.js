import layout from 'bepstore-goals/templates/components/goal/goal-index';
import Ember from 'ember';

export default Ember.Component.extend({
	layout,

	addType:null,

	actions: {
		dismiss() {
			history.back();
		},

		openAdd(type){
			this.set('addType',type);
		},

		closeAdd(){
			this.set('addType',null);
		}
	}
});
