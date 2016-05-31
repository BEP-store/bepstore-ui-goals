import layout from 'bepstore-goals/templates/components/challenges/issue';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  isPending: false,
  isFailure: false,
  isSucces: false
});
