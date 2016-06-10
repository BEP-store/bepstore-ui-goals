import layout from 'bepstore-goals/templates/components/badge/priority-badge';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,

  classNames: 'priority issue_badge',
  classNameBindings: ['prio'],
});
