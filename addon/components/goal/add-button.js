import Ember from 'ember';
import layout from 'bepstore-goals/templates/components/goal/add-button';
import ClickOutside from '../../mixins/click-outside';

const { Component, computed, inject: { service } } = Ember;

/**
 * Add button within a group page
 * @public
 */
export default Component.extend(ClickOutside, {
  layout,
  media: service(),
  session: service(),
  router: service(),

  activitiesNewRoute: computed('session.baseRoute', function() {
    return `goal.new`;
  }),

  actions: {
    clickButton() {
      this.toggleProperty('_isBottomSheetShown');
    },
    addContributor(role) {
      console.log(role);
      this.get('model').get('contributors').pushObject(this.get('session.user'));
      if(role){
        let r = `head_${role}`;
        this.get('model').set(r , this.get('session.user'));
      }
      this.get('model').save().then(() => {
          alert("you have been refruited!!! ");
      });
    }
  },

  _isBottomSheetShown: false,

  clickOutside() {
    this.set('_isBottomSheetShown', false);
  }
});
