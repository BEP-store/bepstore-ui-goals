import Ember from 'ember';
import layout from 'bepstore-goals/templates/components/goal/add-button';
import ClickOutside from '../../mixins/click-outside';

export default Ember.Component.extend(ClickOutside, {
  layout,

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

  clickOutside() {
    this.set('_isBottomSheetShown', false);
  }
});
