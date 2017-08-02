module.exports = {
  path: 'getstack',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/GetStack'));
    });
  }
};
