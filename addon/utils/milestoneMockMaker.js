export default function milestoneMockMaker(){
  return {
    mock: function() {
      return [{
        title: "V0.1",
        state: "closed",
        issues: [{
          title: "Issue1",
          state: 'closed',
          prio: 9
        },{
          title: "Issue2",
          state: 'closed',
          prio: 3
        },{
          title: "Verrrry verrrry long issue title",
          state: 'closed',
          prio: 5
        }]
      },{
        title: "V0.2",
        state: "open",
        issues: [{
          title: "Issue1",
          state: 'open',
          prio: 9
        },{
          title: "Issue2",
          state: 'open',
          prio: 3
        },{
          title: "Issue3",
          state: 'closed',
          prio: 5
        }]
      },{
        title: "V1.0",
        state: "open",
        issues: [{
          title: "Issue1",
          state: 'open',
          prio: 9
        },{
          title: "Issue2",
          state: 'open',
          prio: 3
        },{
          title: "Issue3",
          state: 'open',
          prio: 5
        },{
          title: "Issue1",
          state: 'open',
          prio: 9
        },{
          title: "Issue2",
          state: 'open',
          prio: 3
        },{
          title: "Issue3",
          state: 'open',
          prio: 5
        }]
      }];
    }
  };
}
// structure: milestone:{title, {issue: {title, prio}}*}
