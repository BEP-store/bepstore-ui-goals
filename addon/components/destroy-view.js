import ActivitiesBaseDestroyView from 'feedbackfruits-activities/components/destroy-view';
import layout from '../templates/components/destroy-view';

export default ActivitiesBaseDestroyView.extend({
  layout,
  actions: {
    destroy: function() {
      this.get('model').destroyRecord().then(() => {
        history.back();
        history.back();
      });
    }
  }
});
