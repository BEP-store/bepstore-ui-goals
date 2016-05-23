import Activity from 'bepstore/models/activity';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed: { filterBy } } = Ember;

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

  contributers: hasMany('user'),

  product_owner: belongsTo('user', { inverse: null }),
  head_design: belongsTo('user', { inverse: null }),
  head_frontend: belongsTo('user', { inverse: null }),
  head_backend: belongsTo('user', { inverse: null }),

  nr_volunteers: filterBy('user').length
});
