module.exports = {
  path: 'myproposals',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MyProposals'));
    });
  }
};
