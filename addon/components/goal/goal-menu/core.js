import layout from 'bepstore-goals/templates/components/goal/goal-menu/core';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  hasHD: notEmpty('model.head_design.id'),
  hasHFE: notEmpty('model.head_frontend.id'),
  hasHBE: notEmpty('model.head_backend.id')
});
