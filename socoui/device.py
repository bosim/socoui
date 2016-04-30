from . import app
from .devices import get_device_by_uid

from flask import jsonify, request

import soco

@app.route('/device/<device>')
def device(device):
    dev = get_device_by_uid(device)
    result = {
        'uid': dev.uid,
        'ip': dev.ip_address,
        'player_name': dev.player_name,
        'current_track': dev.get_current_track_info()
    }
    return jsonify({'result': result})

@app.route('/device/<device>/stop')
def stop(device):
    dev = get_device_by_uid(device)
    dev.stop()
    return jsonify({
        'result': 'ok',
        'current_track': dev.get_current_track_info()
    })


@app.route('/device/<device>/play')
def play(device):
    dev = get_device_by_uid(device)
    dev.play()
    return jsonify({
        'result': 'ok',
        'current_track': dev.get_current_track_info()
    })


@app.route('/device/<device>/play_from_queue')
def play_from_queue(device):
    index = int(request.args.get('index'))
    dev = get_device_by_uid(device)
    dev.play_from_queue(index)
    return jsonify({
        'result': 'ok',
        'current_track': dev.get_current_track_info()
    })


@app.route('/device/<device>/pause')
def pause(device):
    dev = get_device_by_uid(device)
    dev.pause()
    return jsonify({
        'result': 'ok',
        'current_track': dev.get_current_track_info()
    })


@app.route('/device/<device>/next')
def next(device):
    dev = get_device_by_uid(device)
    dev.next()
    return jsonify({
        'result': 'ok',
        'current_track': dev.get_current_track_info()
    })


@app.route('/device/<device>/previous')
def previous(device):
    dev = get_device_by_uid(device)
    dev.previous()
    return jsonify({
        'result': 'ok',
        'current_track': dev.get_current_track_info()
    })

@app.route('/device/<device>/queue')
def queue(device):
    result = []

    offset = request.args.get('offset')
    dev = get_device_by_uid(device)
    for (index, element) in enumerate(dev.get_queue(start=int(offset), max_items=10)):
        d = element.to_dict()
        d.pop('resources')
        d['index'] = int(offset) + index
        result.append(d)

    return jsonify({
        'result': result
    })
