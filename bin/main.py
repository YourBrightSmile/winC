#!/bin/python3
import asyncio
import json
import os
import sys
import tornado
from tornado.escape import json_decode, json_encode
import json
import aiofiles

pathS = [os.path.dirname(__file__) + '/../', os.path.dirname(__file__) + '/../lib']
print("libs", pathS)
sys.path.extend(pathS)
from commonvar import *
from tornado.log import enable_pretty_logging


# enable_pretty_logging()


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        genParamsName = ['domain', 'user', 'computername', 'uptime', 'ip', 'mac', 'cpu', 'gpu', 'memory', 'disk',
                         'os', 'swap']
        osInfo = getOsInfo()
        params = {i: (" N/A" if osInfo is None else osInfo[i]) for i in genParamsName}
        content = tornado.template.Loader("../static/").load("index.html").generate(**params)
        self.write(content)
        # winTools.winBrightnessAdjust(30)


class SetHandler(tornado.web.RequestHandler):
    def get(self):
        pass

    def post(self):
        postBody = json_decode(self.request.body)
        try:
            if len(postBody) > 0:
                funcName = postBody['setType']
                params = postBody['setParams']
                infoMethodDict[funcName](params)
            else:
                print("Post SetHandler testparams error")
        except Exception as e:
            print("Post SetHandler  Exception:", e)
        print('Post SetHandler  End......')


class GetInfoHandler(tornado.web.RequestHandler):
    def get(self):
        pass

    def post(self):
        postBody = json_decode(self.request.body)
        postResp = {}
        try:
            if postBody:
                for key, value in postBody.items():
                    if key == 'getTypes':
                        for infoType in postBody[key]:
                            postResp[infoType] = infoMethodDict[infoType]()
                            print("PPP", postResp[infoType])
        except Exception as e:
            print("Post GetInfoHandler  Exception:", e)
        self.set_header('Content-Type', 'application/json')
        print(json_encode(postResp))
        self.write(json_encode(postResp))
        print('Post GetInfoHandler  End......')


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "../static"}),
        (r"/setWin", SetHandler),
        (r"/getInfo", GetInfoHandler),
        (r'/(favicon.ico)', tornado.web.StaticFileHandler, {"path": "../static/icon"}),
    ])


async def main():
    try:
        app = make_app()
        app.listen(19433)
        await asyncio.Event().wait()
    except Exception as e:
        print("main exception", e)


if __name__ == "__main__":
    asyncio.run(main())
