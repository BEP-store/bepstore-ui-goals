import layout from 'bepstore-goals/templates/components/goal/goal-menu';
import FbfNavItem from 'feedbackfruits-styles/components/fbf-nav-item';
import Ember from 'ember';
import ClickOutside from 'bepstore-goals/mixins/click-outside';

const { inject: { service } } = Ember;

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
      this.set('_showGoTo', false);
    },
    showGoTo(){
      this.toggleProperty('_showGoTo');
      this.set('_showContributors', false);
      this.set('_showRepos', false);
      this.set('_showCore', false);
    },
    showRepo(){
      this.toggleProperty('_showRepos');
      this.set('_showCore', false);
    },
    showCore(){
      this.toggleProperty('_showCore');
      this.set('_showRepos', false);
    }
  },

  _isExpanded: false,
  _showContributors: false,
  _showGoTo: false,
  _showRepos: false,
  _showCore: false,

  clickOutside() {
    this.set('_isExpanded', false);
    this.set('_showContributors', false);
    this.set('_showGoTo', false);
    this.set('_showRepos', false);
    this.set('_showCore', false);
  }
});
