'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/list', controller.home.index);
  router.get('/api/file', controller.home.getFile);
  router.post('/api/savefile', controller.home.saveFile);
};
