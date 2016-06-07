import layout from 'bepstore-goals/templates/components/challenges/issue';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  getTitle: Ember.computed('model', function() {
    let title = this.get('model.title');
    if(title.length > 50){
      return title.substr(0,42) + '...';
    }
    else
    {
      return title;
    }
  }),

  idSize: Ember.computed('model', function() {
    let id = this.get('model.repo.id');
    if(id.length > 28){
      return 'small '.htmlSafe();
    }
    else
    {
      return '';
    }
  })
});
