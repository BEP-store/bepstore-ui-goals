import layout from 'bepstore-goals/templates/components/badge/status-badge';
import Ember from 'ember';
import statuses from 'bepstore-goals/utils/statuses';

export default Ember.Component.extend({
  layout,
  _statusStyle: Ember.computed('status', 'size', function() {
    let size = this.get('size');
    let color = this.get('status');
    return `${size}_badge status_${color}`.htmlSafe();
  }),

  _statusText: Ember.computed('status', function() {
    return statuses()[this.get('status')];
  })
});
