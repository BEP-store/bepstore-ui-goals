import layout from 'bepstore-goals/templates/components/challenges/container';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  classNames: 'challenges_item',
  openMilestone: null,
  actions: {
    showMilestone(title){
      this.set('openMilestone', title);
    }
  }
});
