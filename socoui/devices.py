from . import app

from flask import jsonify

import soco


def get_devices():
    devs = list(soco.discover())
    return devs


def get_device_by_uid(device_uid):
    for dev in get_devices():
        if dev.uid == device_uid:
            return dev

    return None


@app.route('/devices')
def devices():
    result = []

    for dev in get_devices():
        result.append({
            'uid': dev.uid,
            'ip': dev.ip_address,
            'player_name': dev.player_name,
            'queue_size': dev.queue_size
        })
    
    return jsonify({'devices': result})

    
