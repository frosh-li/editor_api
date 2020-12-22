// exports.execCmd = async function() {
//   const message = this.args[0];
//   await this.socket.emit('res', `Hi! I've got your message: ${message}`);
// }

// exports.getCmd = async function() {
//   const message = this.args[0];
//   await this.socket.emit('res', `Hi! I've got your message: ${message}`);
// }

module.exports = app => {
  class Controller extends app.Controller {
    async execCmd() {
      const message = this.ctx.args[0];
      const jsonMsg = JSON.parse(message);
      // 将数据先存在redis中
      await this.app.redis.lpush(`editor:${jsonMsg.filename}`, message)
      app.sockets.forEach((socket => {
        if(socket.id !== this.ctx.socket.id) {
          try {
            // const jsonMsg = JSON.parse(message);
            socket.emit("sync", message)
          }catch(e) {
            console.log(e);
          }
        }
      }))
    }
    async getCmd() {
      const message = this.ctx.args[0];
      await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    }
    async chat() {
      // const message = this.ctx.args[0];
      console.log(this.ctx.args[0])
      // await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    }
  }
  return Controller
};

