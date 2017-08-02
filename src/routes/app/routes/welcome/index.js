module.exports = {
  path: 'welcome',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Welcome'));
    });
  }
};
