import layout from 'bepstore-goals/templates/components/goal/goal-menu/core';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,

  actions: {
    toUser(id){
      this.transitionToRoute('users.show',id);
    }
  }
});
