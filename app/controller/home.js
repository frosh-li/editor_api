'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const dir = "/Users/frosh/server/nginx/1.8.0/conf";
class HomeController extends Controller {
  /**
   * 获取一个目录的文件列表
   */
  async index() {
    const datas = fs.readdirSync(dir);
    this.ctx.body = datas;
  }

  /**
   * 获取文件内容
   */
  async getFile() {
    const {filename} = this.ctx.query;
    const content = fs.readFileSync(path.resolve(dir, filename)).toString("utf-8");
    this.ctx.body = content;
  }

  async saveFile() {
    const {
      filename,
      content
    } = this.ctx.request.body;
    fs.writeFileSync(path.resolve(dir, filename), content);
    this.ctx.body = {
      status: 200
    }
  }
}

module.exports = HomeController;
