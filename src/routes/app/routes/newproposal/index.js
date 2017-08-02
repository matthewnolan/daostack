module.exports = {
  path: 'newproposal',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/NewProposal'));
    });
  }
};
