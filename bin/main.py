#!/bin/python3
import asyncio
import tornado


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        content = tornado.template.Loader("../static/").load("index.html").generate()
        self.write(content)
        # winTools.winBrightnessAdjust(30)


class SetHandler(tornado.web.RequestHandler):
    def get(self):
        pass


class GetHandler(tornado.web.RequestHandler):
    def get(self):
        pass


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "../static"}),
        (r"/set", SetHandler),
        (r"/get", GetHandler),
    ])


async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()


if __name__ == "__main__":
    asyncio.run(main())
