import ActivitiesBaseDetailView from 'feedbackfruits-activities/components/detail-view';
import layout from '../templates/components/detail-view';

export default ActivitiesBaseDetailView.extend({
  layout,
  _githubURLUI:null,
  _githubURLAPI:null,

  actions: {
    addContributor(role) { // jshint ignore: line
      alert("you have been refruited!!!");
    }
  }
});
