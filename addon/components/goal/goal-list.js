import layout from 'bepstore-goals/templates/components/goal/goal-list';
import Ember from 'ember';

const { computed, inject: { service } } = Ember;

export default Ember.Component.extend({
  layout,
  session: service(),

  isLoggedIn: Ember.computed('session.user', function(){
    return !!this.get('session.user.id');
  }),

  sortedReviews: computed.sort('model', 'sortDefinition').property('model.@each'),
  sortBy: 'created_at', // default sort by date
  reverseSort: true, // default sort in ascending order
  sortDefinition: computed('sortBy', 'reverseSort', function() {
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  })
});
