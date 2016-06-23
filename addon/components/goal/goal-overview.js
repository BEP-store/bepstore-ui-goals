import layout from 'bepstore-goals/templates/components/goal/goal-overview';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  layout,
  session: service(),
  router: service(),

  favStatus: Ember.computed('model', function(){
      if(!this.get('model.contributors').isAny('id', this.get('session.user.id'))) {
          return 'favorite border';
      }
      return 'favorite';
  }),

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
}
});
