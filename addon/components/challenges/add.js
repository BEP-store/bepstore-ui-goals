import layout from 'bepstore-goals/templates/components/challenges/add';
import semver from 'bepstore-goals/utils/semver';
import Ember from 'ember';

const { computed: { equal }, inject: { service } } = Ember;

export default Ember.Component.extend({
  layout,

  store: service(),

  isRepo: equal('type', 'Repository'),
  isMilestone: equal('type', 'Milestone'),
  isIssue: equal('type', 'Issue'),
  isUpdate: equal('type', 'Update'),

  setStuff: Ember.on('init', function(){
    this.actions.cleanUp.bind(this)();
    this.set('new.minor',true);
  }),

  actions: {
    save(){
      if(this.get('isRepo')){
        this.actions.repoCreate.bind(this)();
      }
      else if(this.get('isMilestone')){
        this.actions.milestoneCreate.bind(this)();
      }
      else if(this.get('isIssue')){
        this.actions.issueCreate.bind(this)();
      }
      else if(this.get('isUpdate')){
        this.actions.giveUpdate.bind(this)();
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
    repoCreate(){
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
            this.actions.cleanUp.bind(this)();
          });
        });
      }
      else{
        return null;
      }
    },
    milestoneCreate(){
      if(!this.get('new.description')){
        return null;
      }
      let version = semver.parse(this.get('model.challenges.lastObject.title'));
      if(this.get('new.major')) {
        version[0]++;
      }
      else if(this.get('new.minor')) {
        version[1]++;
      }
      this.get('model.repos').forEach((repo) =>{
        let milestone = this.get('store').createRecord('milestone',{
          title: `${version[0]}.${version[1]}.0`,
          description: this.get('new.description'),
          state: 'open',
          repo: repo
        });
        milestone.save().then(() => {
          this.actions.cleanUp.bind(this)();
        });
      });
    },
    issueCreate(){
      if( this.get('new.title') && this.get('new.description') && this.get('new.Milestone') && this.get('new.Repository') && this.get('new.Priority') && this.get('new.Type')){
        let route = this.get('new.Repository');
        this.get('store').findRecord('label',  route + '/labels/prio:' + this.get('new.Priority')).then((prioLabel) => {
          this.get('store').findRecord('label',  route + '/labels/type:' + this.get('new.Type')).then((typeLabel) => {
            let labels = [prioLabel, typeLabel];
            let milestoneNr = this.get('model.challenges')
            .findBy('title',this.get('new.Milestone'))
            .milestones.findBy('repo.fullName', route)
            .get('number');
            let issue = this.get('store').createRecord('issue', {
              title: this.get('new.title'),
              body: this.get('new.description'),
              milestone: milestoneNr,
              labels: labels
            });

            issue.save().then(() => {
              this.actions.cleanUp.bind(this)();
            });
          });
        });
      }
      else {
        return null;
      }
    },
    giveUpdate(){
      if(!this.get('new.update')){
        return null;
      }
      switch (this.get('new.Status')) {
        case 'specifying (sub-)challenges':
          this.set('model.status','spec-design');
          break;
        case 'building the Goal':
          this.set('model.status','building');
          break;
        case 'testing the Goal':
          this.set('model.status','testing');
          break;
        case 'finished the Goal':
          this.set('model.status','finished');
          break;
        default:
          return null;
      }
      this.set('model.updateText', this.get('new.update'));
      this.get('model').save().then(() =>{
        this.actions.dismiss.bind(this)();
      });
    },
    cleanUp(){
      this.set('new',[]);
      this.set('new.minor',true);
    }
  }
});
