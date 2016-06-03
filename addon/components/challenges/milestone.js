import layout from 'bepstore-goals/templates/components/challenges/milestone';
import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  show: false,
  openMilestone: null,

  progress: computed('model.openIssues', 'model.closedIssues', function() {
      let openIssues = this.get('model.openIssues');
      let closedIssues = this.get('model.closedIssues');
      let progress = Math.round(closedIssues / (openIssues + closedIssues) * 100) || 0;
      return progress;
  }),

  finished: computed('model.state', function() {
    return this.get('model.state') === 'closed';
  }),

  actions: {
    toggle() {
      this.toggleProperty('show');
    }
    // showAll() {
    //   this.get('showMilestone')(this.get('model.title'));
    //   this.set('show', true);
    // }
  }
});
