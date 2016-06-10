 function parse(issue, regex, setter, nolabel) {
   let label = issue.get('labels').find((item) => item.get('name').match(regex));

   if(!label){
     issue.set(setter,nolabel);
   }
   else{
     issue.set(setter,label.get('name').match(regex)[1]);
   }
 }

function setPrio(issue) {
  if(!issue.get('priority')){
    let regex = /prio:(.*)?/;
    parse(issue, regex, 'priority', 'none');
  }
}
function setType(issue) {
  let regex = /type:(.*)?/;
  parse(issue, regex, 'type', 'no type');
}
function compare(a, b) {
  let convertLabel = {
    high: 1,
    medium: 0,
    low: -1,
    none: -2,
  };

  if(a.get('state') === b.get('state')){
    if(convertLabel[a.get('priority')] < convertLabel[b.get('priority')]){ return 1; }
    if(convertLabel[a.get('priority')] > convertLabel[b.get('priority')]){ return -1; }
  }
  else if(a.get('state') === 'open') {
    return -1;
  }
  else if(b.get('state') === 'open') {
    return 1;
  }

  return 0;
}

export const issueFun = {
  setPrio,
  setType,
  compare
};

export default issueFun;
