import layout from 'bepstore-goals/templates/components/goal/goal-overview';
import Ember from 'ember';

const { computed, inject: { service } } = Ember;

export default Ember.Component.extend({
  layout,
  router: service(),

  actions: {
    showDescr() {
      this.toggleProperty('showAll');
    },
    open() {
      if(this.get('activitiesShowRoute')){
          this.get('router').transitionTo(this.get(this.get('activitiesShowRoute')), this.get('model.id'));

      }
      else
      {
          this.get('router').transitionTo(`${this.get('route')}.goal.show`, this.get('model.id'));
      }
    }
  },
  sortedReviews: computed.sort('model', 'sortDefinition'),
  sortBy: 'contributors.length', // default sort by date
  reverseSort: true, // default sort in ascending order
  sortDefinition: computed('sortBy', 'reverseSort', function() {
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  })
});
