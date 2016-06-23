import layout from 'bepstore-goals/templates/components/goal/core-team';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  layout,
  session: service(),
  notify: service(),
  store: service(),
  product_owner: "",
  head_design: "",
  head_frontend: "",
  head_backend: "",

  setFunction: function(fullName){
    this.get(`team.${fullName}`).then((user) => {
      if(user){
        this.set(fullName, user.get('name'));
      } else {
        this.set(fullName, "");
      }
    });
  },

  setFunctions: function() {
    this.setFunction('product_owner');
    this.setFunction('head_design');
    this.setFunction('head_frontend');
    this.setFunction('head_backend');
  }.on('init'),

  actions: {
    addContributor(role) {
      this.get('team.contributors').pushObject(this.get('session.user'));
      if(role){
        let r = `head_${role}`;
        this.get('team').set(r , this.get('session.user'));
      }
      this.get('team').save().then(() => {
        this.setFunctions();
        this.get('notify').info('Hello there!');
      });
    }
  }
});
