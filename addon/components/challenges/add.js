import layout from 'bepstore-goals/templates/components/challenges/add';
import semver from 'bepstore-goals/utils/semver';
import Ember from 'ember';

const { computed: { equal }, inject: { service } } = Ember;

export default Ember.Component.extend({
  layout,

  store: service(),
  session: service(),
  account: service(),
  ajax: service(),

  isRepo: equal('type', 'Repository'),
  isMilestone: equal('type', 'Milestone'),
  isIssue: equal('type', 'Issue'),
  isUpdate: equal('type', 'Update'),

  allLabels: [
    {name:"prio:high", color:"FF0000"},
    {name:"prio:medium", color:"D3D3D3"},
    {name:"prio:low", color:"B0E0E6"},
    {name:"type:enhancement", color:"87CEEB"},
    {name:"type:feature", color:"0000FF"},
    {name:"type:fix", color:"FFA500"},
    {name:"type:refactor", color:"FFEBCD"},
    {name:"type:style", color:"C0C0C0"}
  ],

  setStuff: Ember.on('init', function(){
    this.actions.cleanUp.bind(this)();
    this.set('new.minor',true);
  }),

  actions: {
    save(){
      if(this.get('isRepo')){
        return this.actions.repoCreate.bind(this)();
      }
      else if(this.get('isMilestone')){
        return this.actions.milestoneCreate.bind(this)();
      }
      else if(this.get('isIssue')){
        return this.actions.issueCreate.bind(this)();
      }
      else if(this.get('isUpdate')){
        return this.actions.giveUpdate.bind(this)();
      }
    },
    dismiss(){
      this.sendAction('close');
      this.set('new',null);
    },
    saveDismiss(){
      return this.actions.save.bind(this)().then(() => {
        return this.actions.dismiss.bind(this)();
      });
    },
    repoCreate(){
      let regex = /https:\/\/github.com\/(\w+?\/[\w|-]+)\/?.*/;
      let link = this.get('new.link').match(regex);

      if(link){
        let id = link[1];
        return this.get('store').findRecord('repo', id).then(repo => {
          this.get('model.repos').addObject(repo);
          this.actions.setLabels.bind(this)(repo);
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
      let last = this.get('model.challenges.lastObject.title');
      let version = [0,0,0];
      if(last){
        version = semver.parse(this.get('model.challenges.lastObject.title'));
      }
      if(this.get('new.major')) {
        version[0]++;
        version[1] = 0;
      }
      else if(this.get('new.minor')) {
        version[1]++;
      }

      return this.get('model.repos').forEach((repo) =>{
        let milestone = {
          title: `V${version[0]}.${version[1]}.0`,
          description: this.get('new.description'),
        };

        return this.actions.sendRequest.bind(this)(JSON.stringify(milestone), repo.id, 'milestones')
          .then((response) => {
            let m = this.get('store').push(this.get('store').normalize( 'milestone', response) );
            return this.get('model.milestones').addObject(m);
          }).then( () => {
            return this.actions.cleanUp.bind(this)();
          });
      });
    },
    issueCreate(){
      if( this.get('new.title') && this.get('new.Milestone') && this.get('new.Repository') && this.get('new.Priority') && this.get('new.Type')){
        let route = this.get('new.Repository');
        let labels = ['prio:' + this.get('new.Priority'), 'type:' + this.get('new.Type')];
        let milestone = this.get('model.challenges')
        .findBy('title',this.get('new.Milestone'))
        .milestones.findBy('repo.fullName', route);

        let issue = {
          title: this.get('new.title'),
          body: this.get('new.description'),
          milestone: milestone.get('number'),
          labels: labels
        };

        return this.actions.sendRequest.bind(this)(JSON.stringify(issue), route, 'issues')
        .then((response) => {
          let i = this.get('store').push(this.get('store').normalize( 'issue', response) );
          // i.get('labels').map((label) => label.substr(label.lastIndexOf("/")+1));
          // debugger;
          this.get('model.challenges')
                .findBy('title', milestone.get('title'))
                .issues.addObject(i);
          this.actions.cleanUp.bind(this)();
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
      return this.get('model').save().then(() =>{
        return this.actions.dismiss.bind(this)();
      });
    },
    cleanUp(){
      this.set('new',[]);
      this.set('new.minor',true);
    },
    sendRequest(data,id,type){
      let accessToken = this.get('session.data.authenticated.access_token');
      let host = this.get('account.host');
      let url = `${host}/provide/github/repos/${id}/${type}`;

      return this.get('ajax').request(url, {
        type: 'POST',
        data: data,
        dataType: 'json',
        headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
       }
     }).then((response) => {
        return response;
      });
    },
    setLabels(repo){
      let labels = this.get('allLabels');
      //TODO: check if repo already has labels, cause this errors when label already exists
      labels.forEach((label) => {
        this.actions.sendRequest.bind(this)(JSON.stringify(label), repo.get('id'), 'labels');
      });
    }
  }
});
