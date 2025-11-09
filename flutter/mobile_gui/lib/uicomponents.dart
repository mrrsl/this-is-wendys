import 'package:flutter/material.dart';

Widget longButton(
  BuildContext context,
  String buttonText,
  Function()? onPress,
) {
  var size = MediaQuery.of(context).size;
  double width = size.width;
  double height = size.height;

  //creates a sizedbox that drives the minimum size of the button.
  return SizedBox(
    width: width * 0.8,
    height: height / 13,
    child: OutlinedButton(
      onPressed: onPress,
      style: ButtonStyle(
        backgroundColor: WidgetStateProperty.all<Color>(
          Color.fromRGBO(243, 219, 227, 1),
        ),
        side: WidgetStateProperty.all(
          BorderSide(color: Color.fromRGBO(209, 109, 122, 1), width: 2.5),
        ),
        shape: WidgetStateProperty.all(
          RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        ),
      ),
      child: Text(
        buttonText,
        style: TextStyle(
          letterSpacing: 2.0,
          color: Colors.black,
          fontSize: 24,
          fontFamily: 'SUSEMono',
        ),
      ),
    ),
  );
}
