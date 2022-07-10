import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SecondaryButton } from "../components/Button/SecondaryButton";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { TextInput } from "../components/TextInput/TextInput";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Dimens } from "../constants/Dimens";

import { useThemeStyle } from "../components/ThemeProvider/ThemeProvider";
import { Text } from "../components/Typography/Text";

const changeNameScreen: React.FunctionComponent = () => {
	const engine = useContext(EngineContext);
	const userRepo = engine.userRepository;
	const themeStyle = useContext(ThemeContext).themeStyle;
	const [name, setName] = useState<string>("");
	const [passwordValue, setPasswordValue] = useState<string>("");
	const changeCurriculumRepo = engine.changeAccountInformationRepository;
	const [text, setText] = useState<string>();
	const textStyle = useThemeStyle().styles.text;
	useEffect(() => {
		userRepo.getAuthData().then((data) => {
			setName(data.firstName ?? "");
		});
	}, []);

	const submit = () => {
		changeCurriculumRepo
			.changeStudentData({
				current_password: passwordValue,
				first_name: name,
			})
			.subscribe(
				(response) => {
					if (response.type == "Success") {
						changeCurriculumRepo.updateName(name);
						setText("Άλλαξε με επιτυχία");
					} else if (response.type == "Error") {
						setText("Λάθος κωδικός ή άλλο πρόβλημα");
					} else {
						setText("Περίμενε...");
					}
				},
				(error) => {
					console.log("error");
				}
			);
	};

	return (
		<View style={[styles.container, themeStyle.styles.backgroundColor]}>
			<TextInput
				placeholder="Όνομα"
				viewStyle={[
					styles.textInput,
					{ marginTop: Dimens.spaces.medium },
				]}
				textContentType="name"
				secureTextEntry={false}
				value={name}
				onChangeText={(text) => {
					setName(text);
				}}
			/>
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
				title="Αλλαγή Ονόματος"
				style={[styles.settingOption]}
				onPress={submit}
			/>
		</View>
	);
};

export const ChangeNameScreen = React.memo(changeNameScreen);

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
