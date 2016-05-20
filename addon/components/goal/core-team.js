import layout from 'bepstore-goals/templates/components/goal/core-team';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  _getPO: Ember.computed('team', function() {
    let po = this.get('team').po;
    if(po){
      return po;
    }
      return "?";
    }),

  _getHD: Ember.computed('team', function() {
    let hd = this.get('team').hd;
    if(hd){
      return hd;
    }
      return "?";
    }),

  _getHFE: Ember.computed('team', function() {
    let hfe = this.get('team').hfe;
    if(hfe){
      return hfe;
    }
      return "?";
    }),

  _getHBE: Ember.computed('team', function() {
    let hbe = this.get('team').hbe;
    if(hbe){
      return hbe;
    }
      return "?";
    })
});
