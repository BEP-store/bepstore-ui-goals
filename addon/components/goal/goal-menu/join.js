import layout from 'bepstore-goals/templates/components/goal/goal-menu/join';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  layout,
  session: service(),

  actions: {
    addContributor(role) {
      this.get('model.contributors').pushObject(this.get('session.user'));
      if(role){
        let r = `head_${role}`;
        this.get('model').set(r , this.get('session.user'));
      }
      this.get('model').save().then(() => {
        this.get('notify').info('Hello there!');
      });
    }
  }
});
