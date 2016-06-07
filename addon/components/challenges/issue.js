import layout from 'bepstore-goals/templates/components/challenges/issue';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  getTitle: Ember.computed('model', function() {
    let title = this.get('model.title');
    console.log(title.length)
    if(title.length > 50){
      return title.substr(0,42) + '...';
    }
    else
    {
      return title;
    }
  })
});
