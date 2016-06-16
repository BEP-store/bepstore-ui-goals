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

  setFlags: Ember.on('init', function(){
    let flagFn = function(fullName, shortName){
      this.get(`team.${fullName}`).then((user) => {
          if(user){
            this.set(`_${shortName}`, user.get('name'));
            this.toggleProperty(`${shortName}Flag`);
          }
        });
    };
    flagFn.bind(this)('product_owner','po');
    flagFn.bind(this)('head_design','hd');
    flagFn.bind(this)('head_frontend','hfe');
    flagFn.bind(this)('head_backend','hbe');
  })
});
