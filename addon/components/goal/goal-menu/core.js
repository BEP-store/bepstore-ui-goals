import layout from 'bepstore-goals/templates/components/goal/goal-menu/core';
import Ember from 'ember';

const { computed: { notEmpty }} = Ember;

export default Ember.Component.extend({
  layout,

  actions: {
    toUser(id){
      this.transitionToRoute('users.show',id);
    }
  }
});
