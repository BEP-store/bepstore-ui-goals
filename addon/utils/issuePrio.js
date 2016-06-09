/*
  labels.type => array
  $priority => label ~> "prio: $priority"
 */

function parse(issue) {
  let regex = /prio:(.*)?/;
  let label = issue.get('labels').find((item) => item.get('name').match(regex));

  if(!label){
    issue.set('priority','none');
  }
  else{
    issue.set('priority',label.get('name').match(regex)[1]);
  }

}

function compare(a, b) {
  /*jshint curly: false */


  let convertLabel = {
    high: 1,
    medium: 0,
    low: -1,
    none: -2,
  };

  if(a.get('state') === b.get('state')){
    if(convertLabel[a.get('priority')] < convertLabel[b.get('priority')]) return 1;
    if(convertLabel[a.get('priority')] > convertLabel[b.get('priority')]) return -1;
  }
  else if(a.get('state') === 'open') {
    return -1;
  }
  else if(b.get('state') === 'open') {
    return 1;
  }
  /*jshint curly: true */

  return 0;
}

export const issuePrio = {
  parse,
  compare
};

export default issuePrio;
