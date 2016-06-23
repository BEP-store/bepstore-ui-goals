import ActivitiesBaseDetailView from 'feedbackfruits-activities/components/detail-view';
import layout from '../templates/components/detail-view';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default ActivitiesBaseDetailView.extend({
  layout,
  session: service(),

  isContributor: Ember.computed('model', function(){
      return this.get('model.contributors').isAny('id', this.get('session.user.id'));
  }),

  showChallenges: Ember.computed('session.user','model.challenges', function(){
    if(this.get('session.user.id') && this.get('model.challenges.length') > 0 ) {
      return this.get('model.contributors').isAny('id', this.get('session.user.id'));
    }
    return false;
  }),

  hasRepos: Ember.computed('model.repos', function() {
    return this.get('model.repos.length') > 0;
  })
});
