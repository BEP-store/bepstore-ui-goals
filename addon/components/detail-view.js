import ActivitiesBaseDetailView from 'feedbackfruits-activities/components/detail-view';
import layout from '../templates/components/detail-view';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default ActivitiesBaseDetailView.extend({
  layout,
  mediaService: service('media'),

  actions: {
    uploadDesign(){
      this.get('mediaService').requestFiles().then((files) => {
        this.get('mediaService').createFromFile(files[0], false).then((media) => {
          this.get('model.design', media);
          this.get('model').save();
        });
      });
    }
  }
});
