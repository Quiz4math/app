import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Headline } from "../components/Typography/Headline";
import { Dimens } from "../constants/Dimens";

const splashScreen: React.FunctionComponent = () => {
	return (
		<View style={styles.container}>
			<Headline style={styles.headline}>Loading...</Headline>
			<ActivityIndicator
				style={styles.spinner}
				size="large"
			></ActivityIndicator>
		</View>
	);
};

export const SplashScreen = React.memo(splashScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: Dimens.spaces.screen,
		justifyContent: "center",
		alignItems: "center",
	},
	headline: {
		textAlign: "center",
	},
	spinner: {
		marginTop: Dimens.spaces.large,
	},
});
