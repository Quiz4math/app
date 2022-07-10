import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SecondaryButton } from "../components/Button/SecondaryButton";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { TextInput } from "../components/TextInput/TextInput";
import {
  ThemeContext,
  useThemeStyle
} from "../components/ThemeProvider/ThemeProvider";
import { Text } from "../components/Typography/Text";
import { Dimens } from "../constants/Dimens";

const changePasswordScreen: React.FunctionComponent = () => {
	const themeStyle = useContext(ThemeContext).themeStyle;
	const engine = useContext(EngineContext);
	const [currentPassword, setCurrentPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
	const changePasswordRepo = engine.changeAccountInformationRepository;
	const [text, setText] = useState<string>();
	const textStyle = useThemeStyle().styles.text;
	const submit = () => {
		changePasswordRepo
			.updatePassword({
				current_password: currentPassword,
				password: newPassword,
				password_confirmation: confirmNewPassword,
			})
			.subscribe(
				(response) => {
					if (response.type == "Success") {
						setText("Άλλαξε με επιτυχία");
					} else if (response.type == "Error") {
						setText(
							"Λάθος κωδικός ή άλλο πρόβλημα. Ο κωδικός πρέπει να είναι τουλάχιστον 8 χαρακτήρες"
						);
					} else {
						console.log("Περίμενε...");
					}
				},
				(error) => {
					console.log(error);
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
					setCurrentPassword(text);
				}}
				secureTextEntry={true}
			/>
			<TextInput
				placeholder="Νέος Κωδικός"
				viewStyle={[
					styles.textInput,
					{ marginTop: Dimens.spaces.medium },
				]}
				onChangeText={(text) => {
					setNewPassword(text);
				}}
				secureTextEntry={true}
			/>
			<TextInput
				placeholder="Επιβεβαίωση νέου Κωδικός"
				viewStyle={[
					styles.textInput,
					{ marginTop: Dimens.spaces.medium },
				]}
				onChangeText={(text) => {
					setConfirmNewPassword(text);
				}}
				secureTextEntry={true}
			/>
			<Text style={[textStyle.textOnSurface]}>{text}</Text>

			<SecondaryButton
				onPress={submit}
				title="Αλλαγή κωδικού"
				style={[styles.settingOption]}
			/>
		</View>
	);
};

export const ChangePasswordScreen = React.memo(changePasswordScreen);

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
	},
	container: {
		flex: 1,
		padding: Dimens.spaces.screen,
	},
});
