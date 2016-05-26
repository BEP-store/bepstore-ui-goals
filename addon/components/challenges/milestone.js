import layout from 'bepstore-goals/templates/components/challenges/milestone';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  show: false,
  openMilestone: null,

  hideIssue: function() {
    if(this.get('show') && (this.get('openMilestone') !== this.get('title')))
    {
      this.set('show', false);
    }
  }.observes('openMilestone'),

  actions: {
    showAll() {
      this.get('showMilestone')(this.get('title'));
      this.set('show', true);
    }
  }
});
