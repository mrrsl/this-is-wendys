import 'package:mobile_gui/main.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

const defaultMessage = "there's no message here hahahahah lobster";

class WebsocketController {
  var wsChannel;
  String url = "";
  String receivedMessage = defaultMessage;

  //if you don't care about return value just make it happy
  Future<bool> pair(String pairingCode) async {
    // Treat this like a pairing code
    url =
        "wss://this-is-wendys-socket-service-dkc8eyd7bzc9hndh.canadacentral-01.azurewebsites.net/ws?group=$pairingCode";

    wsChannel = WebSocketChannel.connect(Uri.parse(url));
    await wsChannel.ready;

    wsChannel.stream.listen(
      (message) {
        receivedMessage = message;
        mainReceivedMessage.value = message;
      },
      onError: (error) {
        return false;
      },
    );
    return true;
  }

  void sendData(String s) {
    wsChannel.sink.add(s);
  }

  void changePairingKey(String key) {
    pair(key);
  }
}
