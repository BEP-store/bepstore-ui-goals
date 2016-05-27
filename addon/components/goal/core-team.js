import layout from 'bepstore-goals/templates/components/goal/core-team';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  poFlag: false,
  hdFlag: false,
  hfeFlag: false,
  hbeFlag: false,
  _po: "?",
  _hd: "?",
  _hfe: "?",
  _hbe: "?",

  init() {
   this._super(...arguments);
    this.get('team.product_owner').then((po) => {
        if(po){
          this.set('_po', po.get('name'));
          this.toggleProperty('poFlag');
        }
      });
    this.get('team.head_design').then((hd) => {
        if(hd){
          this.set('_hd', po.get('name'));
          this.toggleProperty('hdFlag');
        }
      });
    this.get('team.head_frontend').then((hbe) => {
        if(hbe){
          this.set('_hbe', po.get('name'));
          this.toggleProperty('hfeFlag');
        }
      });
    this.get('team.head_backend').then((hbe) => {
        if(hbe){
          this.set('_hbe', po.get('name'));
          this.toggleProperty('hbeFlag');
        }
      });
  }
});
