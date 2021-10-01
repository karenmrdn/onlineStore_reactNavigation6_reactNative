import { Platform } from "react-native";
import { colors } from "./colors";

const isAndroid = Platform.OS === "android";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: isAndroid ? colors.primary : "#fff",
  },
  headerTintColor: isAndroid ? "#fff" : colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans", // style of the text next to the BACK button on iOS
  },
};

export default defaultNavOptions;
