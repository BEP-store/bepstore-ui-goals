import Activity from 'bepstore/models/activity';
import attr from 'ember-data/attr';


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
  product_owner: attr('number'),
  head_design: attr('number'),
  head_frontend: attr('number'),
  head_backend: attr('number')
});