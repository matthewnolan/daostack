module.exports = {
  path: 'promotedao',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/PromoteDao'));
    });
  }
};
