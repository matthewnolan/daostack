module.exports = {
  path: 'browsedaos',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/BrowseDaos'));
    });
  }
};
