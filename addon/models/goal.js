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
  updateText: attr('string'),

  contributors: hasMany('user'),

  product_owner: belongsTo('user', { inverse: null }),
  head_design: belongsTo('user', { inverse: null }),
  head_frontend: belongsTo('user', { inverse: null }),
  head_backend: belongsTo('user', { inverse: null }),

});
