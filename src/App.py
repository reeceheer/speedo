import asyncio
import random
import websockets

oil = None

async def oil_generator():
    global oil
    while True:
        oil = random.randint(10, 99)
        await asyncio.sleep(0)

async def websocket_handler(websocket, path):
    global oil
    while True:
        if oil is not None:
            await websocket.send(str(oil))
        await asyncio.sleep(1)

async def main():
    generator_task = asyncio.create_task(oil_generator())
    server = await websockets.serve(websocket_handler, "localhost", 5000)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
