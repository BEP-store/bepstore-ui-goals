import ActivitiesBaseDetailView from 'feedbackfruits-activities/components/detail-view';
import layout from '../templates/components/detail-view';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default ActivitiesBaseDetailView.extend({
  layout,
  session: service(),
  store: service(),

  showChallenges: Ember.computed('session.user','model.challenges', function(){
    if(this.get('session.user.id') && this.get('model.challenges.length') > 0 ) {
      return this.get('model.contributors').isAny('id', this.get('session.user.id'));
    }
    return false;
  }),

  setMessages: Ember.on('init', function() {
    this.set('messages',this.get('store').peekAll('chat-message'));
  })
});
