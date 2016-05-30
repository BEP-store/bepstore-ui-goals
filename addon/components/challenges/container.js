import layout from 'bepstore-goals/templates/components/challenges/container';
import Ember from 'ember';
import milestoneMockMaker from 'bepstore-goals/utils/milestoneMockMaker';

export default Ember.Component.extend({
  layout,
  classNames: 'challenges_item',
  openMilestone: 'v1.0',

  _mockMilestones: Ember.on('init', function() {
    this.set('mockModel', milestoneMockMaker().mock());
    this.set('mockModel.lastObject.last', true);
  }),
/*
  _setLast: Ember.on('init', function() {
  this.set('model.lastObject.last', true);
  }),
*/
  actions: {
    showMilestone(title){
      this.set('openMilestone', title);
    }
  }
});
