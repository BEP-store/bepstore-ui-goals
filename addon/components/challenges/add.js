import layout from 'bepstore-goals/templates/components/challenges/add';
import Ember from 'ember';
import ClickOutside from 'bepstore-goals/mixins/click-outside';

const { computed: { equal }, inject: { service } } = Ember;

export default Ember.Component.extend(ClickOutside, {
  layout,

  store: service(),

  isRepo: equal('type', 'Repository'),
  isMilestone: equal('type', 'Milestone'),
  isIssue: equal('type', 'Issue'),

  setStuff: Ember.on('init', function(){
    this.set('new',[]);
  }),

  actions: {
    save(){
      if(this.get('isRepo')){
        let regex = /https:\/\/github.com\/(\w+?\/[\w|-]+)\/?.*/;
        let link = this.get('new.link').match(regex);

        if(link){
          let id = link[1];
          this.get('store').findRecord('repo', id).then(repo => {
            this.get('model.repos').addObject(repo);
            this.get('model.resources').addObject({
              route: repo.get('id'),
              type: 'repo'
            });
            this.get('model').save().then(() => {
              this.set('new.link', '');
            });
          });
        }
        else{
          alert('non-valid link');
        }
      }
      else if(this.get('isMilestone')){
        alert('not implemented');
      }
      else if(this.get('isIssue')){
        alert('not implemented');
      }
    },
    dismiss(){
      this.sendAction('close');
      this.set('new',null);
    },
    saveDismiss(){
      this.actions.save.bind(this)();
      this.actions.dismiss.bind(this)();
    }
  },

  clickOutside() {
    this.sendAction('close');
  }
});
