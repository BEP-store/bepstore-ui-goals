import Ember from 'ember';
import layout from '../../../templates/components/challenges/add/add-issue';

export default Ember.Component.extend({
  layout,

  optionsType: [
    {value: "enhancement"},
    {value: "feature"},
    {value: "fix"},
    {value: "refactor"},
    {value: "style"}
  ],
  optionsPriority: [
    {value: "high"},
    {value: "medium"},
    {value: "low"}
  ]

});
