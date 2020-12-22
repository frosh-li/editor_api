/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608384730165_8222';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    security: {
      csrf: false,
    },
    dir: "/opt/servers", // 可编辑文件目录
    
    // myAppName: 'egg',
  };

  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: ['connect'],
        packetMiddleware: ['filter'],
      },
    },
    redis: {
      host: '10.114.30.220',
      port: 6379
    }
  }

  config.redis = {
    client: {
      port: 6379,
      host: '10.114.30.220',
      password: '',
      db:0
    }
  }
  

  return {
    ...config,
    ...userConfig,
  };
};
