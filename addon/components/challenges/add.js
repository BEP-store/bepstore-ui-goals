import layout from 'bepstore-goals/templates/components/challenges/add';
import semver from 'bepstore-goals/utils/semver';
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
        let version = semver.parse(this.get('model.challenges.lastObject.title'));
        if(this.get('new.major')) {
          version[0]++;
        }
        else if(this.get('new.minor')) {
          version[1]++;
        } else {
          return null;
        }
        this.get('model.repos').forEach((repo) =>{
          let milestone = this.get('store').createRecord('milestone',{
            title: `${version[0]}.${version[1]}.0`,
            description: this.get('new.description'),
            state: 'open',
            repo: repo
          });
          milestone.save().then(() => alert(milestone.get('title')) );
        });
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
    },
    selectMajor(){
      this.set('new.major', true);
      this.set('new.minor', false);
    },
    selectMinor(){
      this.set('new.major', false);
      this.set('new.minor', true);
    }
  },

  clickOutside() {
    this.sendAction('close');
  }
});
