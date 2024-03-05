#!/bin/python3
import asyncio
import tornado

from lib import otherTools


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
        print(otherTools.getWeather().encode())
        self.write(otherTools.getWeather().encode())



def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "../static"}),
        (r"/set", SetHandler),
        (r"/get", GetHandler),
    ])


async def main():
    app = make_app()
    app.listen(19433)
    await asyncio.Event().wait()


if __name__ == "__main__":
    asyncio.run(main())
