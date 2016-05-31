import Ember from 'ember';
import ActivitiesBaseNewView from 'feedbackfruits-activities/components/new-view';
import layout from '../templates/components/new-view';

const { inject: { service } } = Ember;

export default ActivitiesBaseNewView.extend({
  layout,
  session: service(),

  groups: null,
  parents: null,

  init(){
   this._super(...arguments);

   this.set('groups', []);
   this.set('parents', []);
 },

 actions: {
   save() {
     /* jshint ignore:start */
     let save = this._super.bind(this, ...arguments);

      let attrs = {
        title: this.get('model.title'),
        description: this.get('model.description'),
        groups: this.get('model.groups'),
        parents: this.get('model.parents'),
      };

      let model = this.get('store').createRecord('goal', {
         ...attrs,
         product_owner: this.get('session.user')
      });

      this.get('model').deleteRecord();
      this.set('model', model);
      save();
      /* jshint ignore:end */
   }
 }
});
