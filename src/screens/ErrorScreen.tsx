import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/Button/Button";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Headline } from "../components/Typography/Headline";
import { TextEmphasized } from "../components/Typography/TextEmphasized";
import { Dimens } from "../constants/Dimens";

interface Route {
	params: {
		title?: string;
		message?: string;
		actionText?: string;
		callback?: () => void;
	};
}

interface Props {
	navigation: any;
	route: Route;
}

const DEFAULT_TITLE = "Κάτι πήγε λάθος";
const DEFAULT_ACTION_TEXT = "Προσπάθησε ξανά";

const errorScreen: React.FunctionComponent<Props> = (props) => {
	const themeStyle = useContext(ThemeContext).themeStyle;

	const params = props.route.params;
	return (
		<View style={[styles.container, themeStyle.styles.backgroundColor]}>
			<Headline
				style={[
					styles.headline,
					themeStyle.styles.text.textOnBackground,
				]}
			>
				{params.title ?? DEFAULT_TITLE}
			</Headline>
			<TextEmphasized
				style={[
					styles.message,
					themeStyle.styles.text.textOnBackground,
				]}
			>
				{params.message}
			</TextEmphasized>
			<Button
				title={params.actionText ?? DEFAULT_ACTION_TEXT}
				onPress={params.callback}
				style={[styles.button]}
			/>
		</View>
	);
};

export const ErrorScreen = React.memo(errorScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: Dimens.spaces.screen,
	},
	headline: {
		textAlign: "center",
	},
	message: {
		marginTop: Dimens.spaces.medium,
		textAlign: "center",
	},
	button: {
		marginTop: Dimens.spaces.medium,
	},
});
