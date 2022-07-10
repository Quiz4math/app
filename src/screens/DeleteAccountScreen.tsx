import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../components/AuthProvider/AuthProvider";
import { SecondaryButton } from "../components/Button/SecondaryButton";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { TextInput } from "../components/TextInput/TextInput";
import {
  ThemeContext,
  useThemeStyle
} from "../components/ThemeProvider/ThemeProvider";
import { Text } from "../components/Typography/Text";
import { Dimens } from "../constants/Dimens";

const deleteAccountScreen: React.FunctionComponent = () => {
	const themeStyle = useContext(ThemeContext).themeStyle;
	const engine = useContext(EngineContext);
	const [passwordValue, setPasswordValue] = useState<string>("");
	const deleteAccountRepo = engine.changeAccountInformationRepository;
	const [text, setText] = useState<string>();
	const textStyle = useThemeStyle().styles.text;
	const logout = useContext(AuthContext).loggedOut;

	const submit = () => {
		deleteAccountRepo
			.deleteAccount({ current_password: passwordValue })
			.subscribe(
				(response) => {
					if (response.type == "Success") {
						setText(
							"Έγινε διαγραφή με επιτυχία, θα αποσυνδεθείς αυτόματα."
						);
						setTimeout(function () {
							logout;
						}, 5000);
					} else if (response.type == "Error") {
						setText("Λάθος κωδικός ή άλλο πρόβλημα");
					} else {
						setText("Περίμενε...");
					}
				},
				(error) => {
					console.log(error.message);
				}
			);
	};
	return (
		<View style={[styles.container, themeStyle.styles.backgroundColor]}>
			<TextInput
				placeholder="Κωδικός"
				viewStyle={[
					styles.textInput,
					{ marginTop: Dimens.spaces.medium },
				]}
				onChangeText={(text) => {
					setPasswordValue(text);
				}}
				secureTextEntry={true}
			/>

			<Text style={[textStyle.textOnSurface]}>{text}</Text>
			<SecondaryButton
				onPress={submit}
				title="Διαγραφή λογαριασμού"
				style={[styles.settingOption]}
			/>
		</View>
	);
};

export const DeleteAccountScreen = React.memo(deleteAccountScreen);

const styles = StyleSheet.create({
	textInput: {
		marginTop: Dimens.spaces.medium,
	},
	settingOptionsContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: Dimens.spaces.small,
	},
	settingOption: {
		marginVertical: Dimens.spaces.medium,
		backgroundColor: "red",
	},
	container: {
		flex: 1,
		padding: Dimens.spaces.screen,
	},
});
