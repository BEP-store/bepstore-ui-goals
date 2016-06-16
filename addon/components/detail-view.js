import ActivitiesBaseDetailView from 'feedbackfruits-activities/components/detail-view';
import layout from '../templates/components/detail-view';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default ActivitiesBaseDetailView.extend({
  layout,
  session: service(),

  show: Ember.observer('model', 'session.user', function(){
    if(!this.get('session.user.id')) {
      this.set('showChallenges', false);
    } else {
      this.set('showChallenges',this.get('model.challenges') && this.get('model.contributors').isAny('id', this.get('session.user.id')));
    }
  })
});
