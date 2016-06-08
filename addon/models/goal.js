import Activity from 'feedbackfruits-activities/models/activity';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed } = Ember;

export default Activity.extend({
  engine: attr('string', { defaultValue: 'goals' }),

  created_at: attr('moment'),

  updated_at: attr('moment'),

  /**
 * The title of the doc
 *
 * @type string
 * @public
 */
 title: attr('string'),

   /**
  * The url of the doc
  *
  * @type string
  * @public
  */
  description: attr('string'),
  status: attr('string', {defaultValue: 'init' }),
  updateText: attr('string', {defaultValue: 'This goal is in its starting-phase at the moment. If you want to contribute to this project when there are requirements, add yourself as contributor in the menu on the top-right. If you want to lead this project as part of the Big Four, click on an open spot and confirm you want that role!' }),

  contributors: hasMany('user'),

  product_owner: belongsTo('user', { inverse: null }),
  head_design: belongsTo('user', { inverse: null }),
  head_frontend: belongsTo('user', { inverse: null }),
  head_backend: belongsTo('user', { inverse: null }),

  resources: attr({ defaultValue: [] }),

  repos: hasMany('repos'),

  milestones: computed('repos.@each.milestones', function() {
    return this.get('repos').toArray().reduce((memo, repo) => {
      return [].concat(memo, repo.get('milestones').toArray());
    }, []);
  }),

  issues: computed('repos.@each.issues', function() {
    return this.get('repos').toArray().reduce((memo, repo) => {
      return [].concat(memo, repo.get('issues').toArray());
    }, []);
  }),

  challenges: computed('milestones.@each.issues', function() {
     let milestones = this.get('milestones');
     let challenges = milestones
       .map(milestone => milestone.get('title'))                                 // Get all titles from milestones
       .uniq()                                                                  // Get all unique titles
       .map(title => {                                                           // Map title to milestones
         return {
           title,
           milestones: milestones.filter(other => other.get('title') === title)
         };
       })
       .map(challenge => {
         let { milestones } = challenge;                                        // Get milestones with same title

         let issueData = milestones
          .map(milestone => { return [milestone.get('openIssues'), milestone.get('closedIssues'), milestone.get('state') === "open"];})
          .reduce((memo, data) => {
            memo[0] += data[0];
            memo[1] += data[1];
            memo[2] = memo[2] || data[2];
            return memo;
          }, [0, 0, false]);
         challenge.openIssues = issueData[0];
         challenge.closedIssues = issueData[1];
         challenge.state = issueData[2] ? "open" : "closed";


         challenge.issues = milestones                                          // Map all issues of all arrays to one array
           .map(milestone => milestone.get('issues'))
           .reduce((memo, issues) => memo.concat(issues), []);
         return challenge;
       });
     return challenges;
   })

});
