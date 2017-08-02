module.exports = {
  path: 'app',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/welcome'),
        require('./routes/getstack'),
        require('./routes/mydaos'),
        require('./routes/browsedaos'),
        require('./routes/promotedao'),
        require('./routes/newdao'),
        require('./routes/newproposal'),
        require('./routes/myproposals'),
        require('./routes/charts'),
        require('./routes/dashboard'),
        require('./routes/ecommerce'),
        require('./routes/forms'),
        require('./routes/pageLayouts'),
        require('./routes/pages'),
        require('./routes/tables'),
        require('./routes/ui'),
      ]);
    });
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
};
