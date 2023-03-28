import asyncio
import random
import websockets

current_value = 1

async def value_generator():
    global current_value
    while True:
        current_value = 1
        await asyncio.sleep(1)
        current_value = 2
        await asyncio.sleep(1)

async def websocket_handler(websocket, path):
    global current_value
    while True:
        await websocket.send(str(current_value))
        await asyncio.sleep(1)

async def main():
    generator_task = asyncio.create_task(value_generator())
    server = await websockets.serve(websocket_handler, "localhost", 5000)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())

