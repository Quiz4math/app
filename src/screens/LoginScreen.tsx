import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AuthContext } from "../components/AuthProvider/AuthProvider";
import { Button } from "../components/Button/Button";
import { SecondaryButton } from "../components/Button/SecondaryButton";
import { TextButton } from "../components/Button/TextButton";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { ScreenAvoidingView } from "../components/ScreenAvoidingView/ScreenAvoidingView";
import { TextInput } from "../components/TextInput/TextInput";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Headline } from "../components/Typography/Headline";
import { Text } from "../components/Typography/Text";
import { Dimens } from "../constants/Dimens";
import { Spaces } from "../constants/Spaces";
import { Strings } from "../constants/Strings";

enum NavigationRoutes {
	REGISTER = "Register",
	HOME = "Home",
	ResetPassword = "ResetPassword",
}

interface Props {
	navigation: any;
}

const loginScreen: React.FunctionComponent<Props> = (props) => {
	const themeStyle = useContext(ThemeContext).themeStyle;
	const theme = themeStyle.theme;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const engine = useContext(EngineContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const authState = useContext(AuthContext);

	async function tryLogin() {
		setIsLoading(true);
		setError(undefined);
		try {
			await engine.userRepository.login(email, password);
			authState.loggedIn();
		} catch (error: any) {
			setError(error.response.data.errors[0]);
			setIsLoading(false);
		}
	}

	return (
		<ScreenAvoidingView style={styles.container}>
			<ScrollView>
				<Headline
					style={[
						themeStyle.styles.text.textOnBackground,
						styles.headline,
					]}
				>
					{Strings.loginScreen.login}
				</Headline>

				<TextInput
					placeholder={Strings.loginScreen.email}
					value={email}
					onChangeText={setEmail}
					viewStyle={styles.textInput}
					textContentType="emailAddress"
				/>

				<TextInput
					placeholder={Strings.loginScreen.password}
					value={password}
					onChangeText={setPassword}
					viewStyle={styles.textInput}
					secureTextEntry={true}
				/>

				{error && (
					<Text
						style={[
							styles.error,
							{ color: theme.colors.errorColor },
						]}
					>
						{error}
					</Text>
				)}
				<Button
					title={Strings.loginScreen.login}
					onPress={tryLogin}
					style={styles.button}
					loading={isLoading}
					disabled={isLoading}
				/>
				<SecondaryButton
					title={Strings.loginScreen.register}
					onPress={() =>
						props.navigation.navigate(NavigationRoutes.REGISTER)
					}
					style={styles.registerButton}
					loading={false}
				/>
				<TextButton
					title="Ξέχασες τον κωδικό σου;"
					style={[styles.forgotPassword]}
					onPress={() =>
						props.navigation.navigate(
							NavigationRoutes.ResetPassword
						)
					}
				/>
			</ScrollView>
		</ScreenAvoidingView>
	);
};

export const LoginScreen = React.memo(loginScreen);

const styles = StyleSheet.create({
	container: {
		padding: Dimens.spaces.screen,
	},
	headline: {
		marginTop: Dimens.spaces.xLarge,
		textAlign: "center",
	},
	error: {
		marginTop: Spaces.medium,
		textAlign: "center",
	},
	textInput: {
		marginTop: Spaces.medium,
	},
	button: {
		marginTop: Spaces.medium,
	},
	registerButton: {
		marginTop: Dimens.spaces.small,
	},
	forgotPassword: {},
});
