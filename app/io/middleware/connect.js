module.exports = app => {
  return async (ctx, next) => {
      console.log('connect:', ctx.socket.id);
      if(app.sockets) {
        app.sockets.set(ctx.socket.id, ctx.socket);
      }else{
        app.sockets = new Map()
        app.sockets.set(ctx.socket.id, ctx.socket);
      }
      console.log(app.sockets.keys())
      await next();
      console.log('disconnect', ctx.socket.id)
      if(app.sockets) {
        app.sockets.delete(ctx.socket.id)
      }
  };
};