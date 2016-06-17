import layout from 'bepstore-goals/templates/components/goal/goal-list';
import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,


  sortedReviews: computed.sort('model', 'sortDefinition').property('model.@each'),
  sortBy: 'created_at', // default sort by date
  reverseSort: true, // default sort in ascending order
  sortDefinition: computed('sortBy', 'reverseSort', function() {
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  })
});
