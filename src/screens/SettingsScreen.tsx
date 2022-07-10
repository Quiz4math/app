import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import React, { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  View
} from "react-native";
import { AuthContext } from "../components/AuthProvider/AuthProvider";
import { LinkButton } from "../components/Button/LinkButton";
import { SecondaryButton } from "../components/Button/SecondaryButton";
import { Card } from "../components/Card/Card";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Text } from "../components/Typography/Text";
import { UserPreferencesContext } from "../components/UserPreferencesProvider/UserPreferencesProvider";
import { Dimens } from "../constants/Dimens";
import { DarkThemeStyle, ThemeKey, WhiteThemeStyle } from "../constants/Theme";

import { useCallback } from "react";
import {
  useChangeCurriculumNavigator,
  useChangeNameNavigator,
  useChangePasswordNavigator,
  useDeleteAccountNavigator
} from "../../Navigators";

const settingsScreen: React.FunctionComponent = () => {
	const { themeStyle, setThemeStyle } = useContext(ThemeContext);
	const logout = useContext(AuthContext).loggedOut;
	const engine = useContext(EngineContext);
	const storage = engine.localStorage;
	const preferencesAccessor = useContext(UserPreferencesContext);
	const userPreferences = preferencesAccessor.userPreferences;

	const navigatorChangeCurriculum = useChangeCurriculumNavigator();
	const onChangeCurriculum = useCallback(() => {
		navigatorChangeCurriculum.navigateToChangeCurriculum();
	}, [navigatorChangeCurriculum]);

	const navigatorChangePassword = useChangePasswordNavigator();
	const onChangePassword = useCallback(() => {
		navigatorChangePassword.navigateToChangePassword();
	}, [navigatorChangePassword]);

	const navigatorChangeName = useChangeNameNavigator();
	const onChangeName = useCallback(() => {
		navigatorChangeName.navigateToChangeName();
	}, [navigatorChangeName]);

	const navigatorDeleteAccount = useDeleteAccountNavigator();
	const onDeleteAccount = useCallback(() => {
		navigatorDeleteAccount.navigateToDeleteAccount();
	}, [navigatorDeleteAccount]);

	const themeValue = themeStyle == DarkThemeStyle;
	const vibrationValue = Boolean(userPreferences.vibrateOnIncorrect);
	const _openWebsiteWithWebBrowser = () => {
		WebBrowser.openBrowserAsync("https://quiz4math.gr/");
	};

	function onThemeValueChange(newValue: boolean) {
		if (newValue) {
			storage.setUserPreferences({ activeTheme: ThemeKey.DARK });
			setThemeStyle(DarkThemeStyle);
		} else {
			storage.setUserPreferences({ activeTheme: ThemeKey.WHITE });
			setThemeStyle(WhiteThemeStyle);
		}
	}

	function onVibrationValueChange(newValue: boolean) {
		preferencesAccessor.update({
			...userPreferences,
			vibrateOnIncorrect: newValue,
		});
	}

	const _inviteViber = () => {
		WebBrowser.openBrowserAsync(
			"https://invite.viber.com/?g2=AQBhBu2Ut1pKTUygLvsG0QwbTIY8pyRJrzlzm%2FWGwVBPI82jPb%2BITO1odPi%2F0uk6&lang=en"
		);
	};

	const _instagramProfile = () => {
		WebBrowser.openBrowserAsync("https://www.instagram.com/quiz4math/");
	};

	const _facebookPage = () => {
		WebBrowser.openBrowserAsync("https://www.facebook.com/quiz4math");
	};

	const _googlePlay = () => {
		WebBrowser.openBrowserAsync(
			"https://play.google.com/store/apps/details?id=gr.quiz4math"
		);
	};

	return (
		<View style={[styles.container, themeStyle.styles.backgroundColor]}>
			<SafeAreaView>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.settingOptionsContainer]}
					>
						<MaterialCommunityIcons
							name="theme-light-dark"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text
							style={[
								themeStyle.styles.text.textOnBackground,
								styles.optionText,
							]}
						>
							Dark mode
						</Text>
						<Switch
							value={themeValue}
							onValueChange={onThemeValueChange}
						/>
					</Card>
					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.settingOptionsContainer]}
					>
						<MaterialCommunityIcons
							name="vibrate"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text
							style={[
								themeStyle.styles.text.textOnBackground,
								styles.optionText,
							]}
						>
							Δόνηση οταν απαντάς λάθος
						</Text>
						<Switch
							value={vibrationValue}
							onValueChange={onVibrationValueChange}
						/>
					</Card>

					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.settingOptionsContainer]}
						onPress={onChangeCurriculum}
					>
						<MaterialCommunityIcons
							name="book"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text
							style={[
								themeStyle.styles.text.textOnBackground,
								styles.optionText,
							]}
						>
							Αλλαγή πεδίου
						</Text>
					</Card>

					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.socialMediaOptionsContainer]}
						onPress={_facebookPage}
					>
						<MaterialCommunityIcons
							name="facebook"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text style={[themeStyle.styles.text.textOnBackground]}>
							Κάνε μας like ή στείλε μήνυμα
						</Text>
					</Card>

					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.socialMediaOptionsContainer]}
						onPress={_instagramProfile}
					>
						<MaterialCommunityIcons
							name="instagram"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text style={[themeStyle.styles.text.textOnBackground]}>
							Κάνε μας follow
						</Text>
					</Card>

					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.socialMediaOptionsContainer]}
						onPress={_inviteViber}
					>
						<MaterialCommunityIcons
							name="account-group"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text style={[themeStyle.styles.text.textOnBackground]}>
							Μπες στο viber community
						</Text>
					</Card>

					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.socialMediaOptionsContainer]}
						onPress={_googlePlay}
					>
						<MaterialCommunityIcons
							name="google-play"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text style={[themeStyle.styles.text.textOnBackground]}>
							Κάνε μας 5στερο
						</Text>
					</Card>

					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.settingOptionsContainer]}
						onPress={onChangePassword}
					>
						<MaterialCommunityIcons
							name="key"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text
							style={[
								themeStyle.styles.text.textOnBackground,
								styles.optionText,
							]}
						>
							Αλλαγή κωδικού
						</Text>
					</Card>

					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.settingOptionsContainer]}
						onPress={onChangeName}
					>
						<MaterialCommunityIcons
							name="account"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text
							style={[
								themeStyle.styles.text.textOnBackground,
								styles.optionText,
							]}
						>
							Αλλαγή ονόματος
						</Text>
					</Card>

					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.settingOptionsContainer]}
						onPress={onDeleteAccount}
					>
						<MaterialCommunityIcons
							name="delete"
							size={32}
							color={themeStyle.theme.colors.defaultIconColor}
							style={[styles.icon]}
						/>
						<Text
							style={[
								themeStyle.styles.text.textOnBackground,
								styles.optionText,
							]}
						>
							Διαγραφή λογαριασμού
						</Text>
					</Card>

					<Text style={[themeStyle.styles.text.textOnBackground]}>
						SDK: {Constants.manifest.sdkVersion}
					</Text>
					<Text style={[themeStyle.styles.text.textOnBackground]}>
						App Version: {Constants.manifest.version}
					</Text>
					<LinkButton
						onPress={_openWebsiteWithWebBrowser}
						title="Έχουμε και ιστοσελίδα!"
					></LinkButton>
					<SecondaryButton
						onPress={logout}
						title="Αποσύνδεση"
						style={[styles.settingOption]}
					/>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export const SettingsScreen = React.memo(settingsScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: Dimens.spaces.screen,
	},
	settingOptionsContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: Dimens.spaces.small,
	},
	settingOption: {
		marginVertical: Dimens.spaces.small,
	},
	optionText: {
		flex: 1,
	},
	icon: {
		textAlign: "center",
		padding: Dimens.spaces.small,
		overflow: "hidden",
	},
	socialMediaOptionsContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: Dimens.spaces.small,
	},
});
