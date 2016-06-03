import layout from 'bepstore-goals/templates/components/goal/goal-menu/core';
import Ember from 'ember';

const { computed: { notEmpty }} = Ember;

export default Ember.Component.extend({
  layout,

  hasHD: notEmpty('model.head_design.id'),
  hasHFE: notEmpty('model.head_frontend.id'),
  hasHBE: notEmpty('model.head_backend.id'),

  actions: {
    toUser(id){
      this.transitionToRoute('users.show',id);
    }
  }
});
