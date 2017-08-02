module.exports = {
  path: 'newdao',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/NewDao'));
    });
  }
};
