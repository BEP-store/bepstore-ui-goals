import Ember from 'ember';
import layout from '../../../templates/components/challenges/add/give-update';

export default Ember.Component.extend({
  layout,
  statusOptions: Ember.computed('model', function(){
    return [
          { value: 'specifying (sub-)challenges' },
          { value: 'building the Goal' },
          { value: 'testing the Goal' },
          { value: 'finished the Goal' }
        ];
  })
});
