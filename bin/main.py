#!/bin/python3
import asyncio
import tornado
from lib import winTools

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        content=tornado.template.Loader("../static/").load("index.html").generate()
        self.write(content)
        winTools.winBrightnessAdjust(100)

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
