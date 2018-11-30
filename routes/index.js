module.exports = (app) => {
  app.use('/', require('./home'));
  app.use('/login', require('./login'));
  app.use('/posts', require('./posts'));
};