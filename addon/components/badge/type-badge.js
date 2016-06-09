import layout from 'bepstore-goals/templates/components/badge/type-badge';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  classNames: 'type issue_badge',
  classNameBindings: ['issueType'],

  issueType: Ember.computed('type', function(){
    if(this.get('type') !== 'no type'){
      return this.get('type');
    } else {
      return 'none';
    }
  })
});
