import Activity from 'bepstore/models/activity';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed } = Ember;

export default Activity.extend({
  engine: attr('string', { defaultValue: 'goals' }),

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
  progress: attr('string'),
  updateText: attr('string'),

  contributors: hasMany('user'),

  product_owner: belongsTo('user', { inverse: null }),
  head_design: belongsTo('user', { inverse: null }),
  head_frontend: belongsTo('user', { inverse: null }),
  head_backend: belongsTo('user', { inverse: null }),

  contributorsCount: computed('contributors', function() {
  return this.get('contributors').length;
  })
});
