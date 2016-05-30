import layout from 'bepstore-goals/templates/components/challenges/milestone';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  show: false,
  openMilestone: null,
  needScroll: false,

  _Scroll: Ember.on('init', function() {
    this.set('needScroll', this.get('model.issues').length > 3);
  }),

  prioIssues: Ember.computed('model', function (){
    return this.get('model.issues').sortBy('state','prio').toArray().reverse();
  }),

  _progress: Ember.on('init', function(){
    let issues = this.get('model.issues');
    this.set('progress', Math.round(issues.filterBy('state','closed').length / issues.length * 1000)/10);
    this.set('finished', this.get('model.state') === "closed");
  }),

  hideIssue: function() {
    if(this.get('show') && (this.get('openMilestone') !== this.get('model.title')))
    {
      this.set('show', false);
    }
  }.observes('openMilestone'),

  actions: {
    showAll() {
      this.get('showMilestone')(this.get('model.title'));
      this.set('show', true);
    }
  }
});
