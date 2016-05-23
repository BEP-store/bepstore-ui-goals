import ActivitiesBaseNewView from 'feedbackfruits-activities/components/new-view';
import layout from '../templates/components/new-view';

export default ActivitiesBaseNewView.extend({
  layout,
  groups: null,
  parents: null,

  init(){
   this._super(...arguments);

   this.set('groups', []);
   this.set('parents', []);
 }
});
