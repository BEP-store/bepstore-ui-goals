import layout from 'bepstore-goals/templates/components/goal/goal-overview';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  actions: {
    showDescr() {
      this.toggleProperty('showAll');
    }
  }
});
