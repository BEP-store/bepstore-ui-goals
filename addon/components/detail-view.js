import ActivitiesBaseDetailView from 'feedbackfruits-activities/components/detail-view';
import layout from '../templates/components/detail-view';
import Ember from 'ember';

export default ActivitiesBaseDetailView.extend({
  layout,
  media: Ember.inject.service(),

  actions: {
    uploadDesign(){
      this.get('media').requestFiles().then((files) => {
        this.get('media').createFromFile(files[0], false).then((media) => {
          this.get('model.design', media);
          this.get('model').save();
        });
      });
    }
  }
});
