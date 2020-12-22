'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class HomeController extends Controller {
  /**
   * 获取一个目录的文件列表
   */
  async index() {
    const dir = this.app.config.dir;
    const datas = fs.readdirSync(dir);
    this.ctx.body = datas.map(data => {
      const stat = fs.statSync(path.resolve(dir, data));
      return {
        data,
        isDirectory: stat.isDirectory(),
      }
    });
  }

  /**
   * 获取文件内容
   */
  async getFile() {
    const dir = this.app.config.dir;
    const {filename} = this.ctx.query;
    const content = fs.readFileSync(path.resolve(dir, filename)).toString("utf-8");
    const cmds = await this.app.redis.lrange(`editor:${filename}`, 0, -1);
    console.log(cmds);
    this.ctx.body = {
      content,
      changes: cmds.reverse()
    }
  }

  async saveFile() {
    const dir = this.app.config.dir;
    const {
      filename,
      content
    } = this.ctx.request.body;
    await this.app.redis.del(`editor:${filename}`)
    fs.writeFileSync(path.resolve(dir, filename), content);
    this.ctx.body = {
      status: 200
    }
  }

}

module.exports = HomeController;
