import layout from 'bepstore-goals/templates/components/goal/goal-menu';
import FbfNavItem from 'feedbackfruits-styles/components/fbf-nav-item';
import Ember from 'ember';
import ClickOutside from 'bepstore-goals/mixins/click-outside';

const { inject: { service } } = Ember;

export default FbfNavItem.extend(ClickOutside, {
  layout,
  classNames: 'right',
  hasIcon: true,
  session: service(),
  account: service(),

  _isExpanded: false,
  _showContributors: false,
  _showGoTo: false,
  _showRepos: false,
  _showCore: false,

  isLoggedIn: Ember.computed('session.user', function(){
    if(this.get('session.user.id')) {
      return true;
    }
    return false;
  }),

  hasGithub: Ember.computed('account.me.identities.[]', function(){
    return this.get('account').isAuthorized('github');
  }),

  isContributor: Ember.computed('model', function(){
    return this.get('model.contributors').isAny('id', this.get('session.user.id'));
  }),

  mayContribute: Ember.computed('hasGithub', 'isLoggedIn', 'isContributor', function(){
    if(this.get('isLoggedIn') && this.get('hasGithub')){
      return !this.get('isContributor') ||
             !(this.get('model.head_design.id') &&
               this.get('model.head_frontend.id') &&
               this.get('model.head_backend.id'));

    }
    return false;
  }),

  missesGithub: Ember.computed('hasGithub', 'isLoggedIn', function(){
    return this.get('isLoggedIn') && !this.get('hasGithub');
  }),

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

  clickOutside() {
    this.set('_isExpanded', false);
    this.set('_showContributors', false);
    this.set('_showGoTo', false);
    this.set('_showRepos', false);
    this.set('_showCore', false);
  }
});
