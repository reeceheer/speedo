import asyncio
import websockets
import json
from itertools import cycle

async def rpm_handler(websocket, path):
    rpm_values = cycle([2000, 2500, 1000, 1500])
    while True:
        rpm = next(rpm_values)
        await websocket.send(json.dumps(rpm))
        await asyncio.sleep(1)

async def speed_handler(websocket, path):
    speed_values = cycle([70])
    while True:
        speed = next(speed_values)
        await websocket.send(json.dumps(speed))
        await asyncio.sleep(1)

start_server_rpm = websockets.serve(rpm_handler, "localhost", 5000)
start_server_speed = websockets.serve(speed_handler, "localhost", 5001)

asyncio.get_event_loop().run_until_complete(start_server_rpm)
asyncio.get_event_loop().run_until_complete(start_server_speed)
asyncio.get_event_loop().run_forever()
