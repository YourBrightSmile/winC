#!/bin/bash
while read -r line; do
    if echo $line | grep -q 'bootComputer?' ; then
	mac=`echo $line|awk -F '?' '{print $2}' |awk '{print $1}'`
    	echo "Received mac: $mac" >> /tmp/aa.txt
    	# 将数据作为参数传递给脚本逻辑
    	wakeonlan $mac
    fi
done
# 动态生成 HTTP 响应
echo "HTTP/1.1 200 OK\nContent-Type: text/plain\nConnection: close\n\nRequest received at $(date)\nYour IP: $(echo $SOCAT_PEERADDR)"
