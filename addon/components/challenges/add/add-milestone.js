import Ember from 'ember';
import layout from '../../../templates/components/challenges/add/add-milestone';

export default Ember.Component.extend({
  layout,

  actions: {
    selectMajor(){
      if(this.get('model.minor')){
        this.actions.switchBump.bind(this)();
      }
    },
    selectMinor(){
      if(this.get('model.major')){
        this.actions.switchBump.bind(this)();
      }
    },
    switchBump(){
      this.toggleProperty('model.minor');
      this.toggleProperty('model.major');
    }
  }

});
