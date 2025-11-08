import 'dart:ffi';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class WebsocketController {
  var wsChannel;
  //if you don't care about return value just make it happy
  Future<Void?> pair() async {
    // Treat this like a pairing code
    const pairingCode = "dn";
    const url =
        "wss://this-is-wendys-socket-service-dkc8eyd7bzc9hndh.canadacentral-01.azurewebsites.net/ws?group=$pairingCode";

    wsChannel = WebSocketChannel.connect(Uri.parse(url));
    await wsChannel.ready;
    print("connected??");

    wsChannel.stream.listen(
      (message) {
        print("method being called");
        print("message received!! $message");
      },
      onError: (error) {
        print("fuckwit");
      },
    );
  }

  void sendData() {
    print("data sent!");
    wsChannel.sink.add('ping');
  }

  void ready() async {}
}
