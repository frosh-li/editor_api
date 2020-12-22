'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/list', controller.home.index);
  router.get('/api/file', controller.home.getFile);
  router.post('/api/savefile', controller.home.saveFile);
  // router.post('/api/execCmd', controller.home.execCmd)
  // router.get('/api/getCmd', controller.home.getCmd)

  app.io.route("execCmd", app.io.controller.sync.execCmd)
  app.io.route("getCmd", app.io.controller.sync.getCmd)
  app.io.route("chat", app.io.controller.sync.chat)
};
