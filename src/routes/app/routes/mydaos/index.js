module.exports = {
  path: 'mydaos',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MyDaos'));
    });
  }
};
