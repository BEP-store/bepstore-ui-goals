import Ember from 'ember';
import layout from 'bepstore-goals/templates/components/goal/add-button';
import ClickOutside from '../../mixins/click-outside';

const { Component, inject: { service }, computed: { equal } } = Ember;

export default Component.extend(ClickOutside, {
  layout,
  session: service(),

  actions: {
    clickButton() {
      this.toggleProperty('_isBottomSheetShown');
    },
    addRepo(){
      this.get('add')("Repository");
      this.toggleProperty('_isBottomSheetShown');
    },
    addMilestone(){
      this.get('add')("Milestone");
      this.toggleProperty('_isBottomSheetShown');
    },
    addIssue(){
      this.get('add')("Issue");
      this.toggleProperty('_isBottomSheetShown');
    }
  },

  _isBottomSheetShown: false,
  _isPO: equal('model.product_owner', 'session.user.id'),

  clickOutside() {
    this.set('_isBottomSheetShown', false);
  }
});
