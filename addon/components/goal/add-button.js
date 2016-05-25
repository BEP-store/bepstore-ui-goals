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
    return `activities.new`;
  }),

  actions: {
    clickButton() {
      // this.get('router').transitionTo(this.get('activitiesNewRoute'));
      this.toggleProperty('_isBottomSheetShown');
    },
    addContributor(role) { // jshint ignore: line
      alert("you have been refruited!!!");
    }
  },

  _isBottomSheetShown: false,

  clickOutside() {
    this.set('_isBottomSheetShown', false);
  }
});
