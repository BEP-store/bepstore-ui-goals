import ActivitiesBaseDetailView from 'feedbackfruits-activities/components/detail-view';
import layout from '../templates/components/detail-view';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default ActivitiesBaseDetailView.extend({
  layout,
  session: service(),

  isContributor: Ember.computed('model.contributors.[]', 'session.user', function(){
      return this.get('model.contributors').isAny('id', this.get('session.user.id'));
  }),

  hasRepos: Ember.computed('model.repos.[]', function() {
    return this.get('model.repos.length') > 0;
  }),

  hasChallenges: Ember.computed('model.challenges.[]', function() {
    return this.get('model.challenges.length') > 0;
  })
});
