import 'dart:ffi';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

const defaultMessage = "there's no message here hahahahah lobster";

class WebsocketController {
  var wsChannel;
  String url = "";
  String receivedMessage = defaultMessage;

  //if you don't care about return value just make it happy
  Future<Void?> pair(String pairingCode) async {
    // Treat this like a pairing code
    url =
        "wss://this-is-wendys-socket-service-dkc8eyd7bzc9hndh.canadacentral-01.azurewebsites.net/ws?group=$pairingCode";

    wsChannel = WebSocketChannel.connect(Uri.parse(url));
    await wsChannel.ready;
    print(pairingCode);

    wsChannel.stream.listen(
      (message) {
        print("method being called");
        print("message received!! \"$message\"");
        receivedMessage = message;
      },
      onError: (error) {
        print("there was an error");
      },
    );
  }

  void sendData(String s) {
    wsChannel.sink.add(s);
  }

  void changePairingKey(String key) {
    pair(key);
  }
}
