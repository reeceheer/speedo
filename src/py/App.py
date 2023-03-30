#!/usr/bin/env python
import asyncio
import obd
import websockets

# Set up the OBD2 adapter port and baud rate
port = "/dev/ttyACM0"  # Use the appropriate port for your OBD2 adapter
baud_rate = 38400  # Replace with the correct baud rate for your OBD2 adapter

# Create a custom OBDConnection object with the specified baud rate
connection = obd.OBD(port, baudrate=baud_rate, fast=False)

# Initialize global variables for RPM and speed
rpm = None
speed = None

# Define an asynchronous function to generate OBD2 data
async def obd_data_generator():
    global rpm, speed
    while True:
        # Query the RPM command and get the response
        rpm_cmd = obd.commands.RPM
        rpm_response = connection.query(rpm_cmd)

        # If the response is not null, update the global RPM variable with the new value
        if not rpm_response.is_null():
            rpm = int(rpm_response.value.magnitude)

        # Query the speed command and get the response
        speed_cmd = obd.commands.SPEED
        speed_response = connection.query(speed_cmd)

        # If the response is not null, convert the speed to mph and update the global speed variable with the new value
        if not speed_response.is_null():
            speed = int(speed_response.value.to("mph").magnitude)

        # Wait for 0.5 second before querying again
        await asyncio.sleep(0.5)

# Define an asynchronous function to handle the RPM websocket

async def websocket_handler_rpm(websocket, path):
    global rpm
    try:
        while True:
            # If the RPM value is not None, send it to the client over the websocket
            if rpm is not None:
                await websocket.send(f"{rpm}")
            # Wait for 0.5 second before checking again
            await asyncio.sleep(0.5)
    # If the websocket connection is closed unexpectedly, print an error message
    except websockets.exceptions.ConnectionClosed:
        print("WebSocket connection closed unexpectedly")

# Define an asynchronous function to handle the speed websocket
async def websocket_handler_speed(websocket, path):
    global speed
    try:
        while True:
            # If the speed value is not None, send it to the client over the websocket
            if speed is not None:
                await websocket.send(f"{speed}")
            # Wait for 0.5 second before checking again
            await asyncio.sleep(0.5)
    # If the websocket connection is closed unexpectedly, print an error message
    except websockets.exceptions.ConnectionClosed:
        print("WebSocket connection closed unexpectedly")

# Define the main function to run the event loop and start the websocket servers
async def main():
    # Create a task to generate OBD2 data
    generator_task = asyncio.create_task(obd_data_generator())

    # Create the RPM websocket server on port 5000
    rpm_server = await websockets.serve(websocket_handler_rpm, 
"localhost", 5000)

    # Create the speed websocket server on port 5001
    speed_server = await websockets.serve(websocket_handler_speed, 
"localhost", 5001)

    # Wait for all tasks to complete
    await asyncio.gather(generator_task, rpm_server.wait_closed(), 
speed_server.wait_closed())

# Run the main function when the script is executed
if __name__ == "__main__":
    asyncio.run(main())

