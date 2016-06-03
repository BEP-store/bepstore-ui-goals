import layout from 'bepstore-goals/templates/components/goal/goal-index';
import Ember from 'ember';


const { Component, inject: { service } } = Ember;

export default Component.extend({
	layout,
  session: service(),

	addType:null,

	isCoreMember: Ember.computed('session.user', function(){
		let id = this.get('session.user.id');
		return (id === this.get('model.product_owner.id'))
		 		|| (id === this.get('model.head_design.id'))
				|| (id === this.get('model.head_frontend.id'))
				|| (id === this.get('model.head_backend.id'));
	}),

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
