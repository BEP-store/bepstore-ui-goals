import layout from 'bepstore-goals/templates/components/goal/goal-menu';
import FbfNavItem from 'feedbackfruits-styles/components/fbf-nav-item';
import Ember from 'ember';
import ClickOutside from '../../mixins/click-outside';

const { Component, computed, inject: { service } } = Ember;

/**
 * Add button within a group page
 * @public
 */
export default FbfNavItem.extend(ClickOutside, {
  layout,
  hasIcon: true,
  session: service(),

  actions: {
    clickButton() {
      this.toggleProperty('_isExpanded');
    },
    showContributors(){
      this.toggleProperty('_showContributors');
    },
    addContributor(role) {
      this.get('model.contributors').pushObject(this.get('session.user'));
      if(role){
        let r = `head_${role}`;
        this.get('model').set(r , this.get('session.user'));
      }
      this.get('model').save().then(() => {
          alert("you have been refruited!!! ");
      });
    }
  },

  _isExpanded: false,
  _showContributors: false,

  clickOutside() {
    this.set('_isExpanded', false);
  }
});
