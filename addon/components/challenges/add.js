import layout from 'bepstore-goals/templates/components/challenges/add';
import Ember from 'ember';
import ClickOutside from '../../mixins/click-outside';

const { computed: { equal } } = Ember;

export default Ember.Component.extend(ClickOutside, {
  layout,

  isRepo: equal('type', 'Repository'),
  isMilestone: equal('type', 'Milestone'),
  isIssue: equal('type', 'Issue'),

  actions: {
    dismiss(){
      this.get('close')();
    }
  },

  clickOutside() {
    this.get('close')();
  }
});
