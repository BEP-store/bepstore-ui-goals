import Ember from 'ember';
import layout from 'bepstore-goals/templates/components/challenges/dropdown-select';
import ClickOutside from 'bepstore-goals/mixins/click-outside';

export default Ember.Component.extend(ClickOutside, {
  layout,
  type: '',
  classNames: 'dropdown-container',
  isOpen: false,
  selection: null,
  options: [],

  mapValue: Ember.on('init', function(){
    if(this.get('readValue') ){
      let getValue = function(option){
        if ('get' in option) {
          return { value: option.get(readValue) };
        }
        return { value: option[readValue] };
      };
      let readValue = this.get('readValue');
      this.set('options',this.get('options').map(getValue));
    }
  }),

  actions: {
    open() {
      this.toggleProperty('isOpen');
    },
    select(value) {
      this.set('selection', value);
      let type = this.get('type');
      this.set(`model.${type}`, value);
      this.toggleProperty('isOpen');
    }
  },

  clickOutside() {
    this.set('isOpen', false);
  }
});
