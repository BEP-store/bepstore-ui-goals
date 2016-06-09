import Activity from 'feedbackfruits-activities/models/activity';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import Ember from 'ember';

import semver from 'bepstore-goals/utils/semver';
import issuePrio from 'bepstore-goals/utils/issuePrio';

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
        // Get all titles from milestones
       .map(milestone => milestone.get('title'))
       // Filter non-SEMVER titles
       .filter(title => {
         let version = semver.parse(title);
         return version != null;
       })
       // Get all unique titles
       .uniq()
       // Sort by SEMVER
       .sort((a, b) => {
         let versionA = semver.parse(a);
         let versionB = semver.parse(b);

         return semver.compare(versionA, versionB);
       })
       // Map title to milestones
       .map(title => {
         return {
           title,
           milestones: milestones.filter(other => other.get('title') === title)
         };
       })
       .map(({ title, milestones }) => {
         // Concatenate the issues of every milestone with the same name
         let issues = milestones
           .map(milestone => milestone.get('issues'))
           .reduce((memo, issues) => memo.concat(issues), [])
           .sort((a, b) => {
             issuePrio.parse(a);
             issuePrio.parse(b);

             return issuePrio.compare(a, b);
           });

        // Summarize the statistics
         let statistics = milestones.reduce((memo, milestone) => {
            memo.openIssues += milestone.get('openIssues');
            memo.closedIssues += milestone.get('closedIssues');
            memo.state = (memo.state === 'open' || milestone.get('state') === 'open') ? 'open' : 'closed';
            return memo;
          }, { openIssues: 0, closedIssues: 0, state: 'closed' });

        return Object.assign({}, { title, issues }, statistics);
       });

     return challenges;
   })

});
