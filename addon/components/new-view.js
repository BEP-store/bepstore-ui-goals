import ActivitiesBaseNewView from 'feedbackfruits-activities/components/new-view';
import layout from '../templates/components/new-view';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default ActivitiesBaseNewView.extend({
  layout,
  account: service(),
  groups: null,
  parents: null,

  init(){
   this._super(...arguments);

   this.set('groups', []);
   this.set('parents', []);
 }
});
