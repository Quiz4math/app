import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Card } from "../components/Card/Card";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Text } from "../components/Typography/Text";
import { Dimens } from "../constants/Dimens";

interface Department {
	name: string;
	university: string;
	link: string;
	icon: string;
}

const learnUniversitiesScreen: React.FunctionComponent = () => {
	const { themeStyle } = useContext(ThemeContext);

	const departments: Department[] = [
		{
			name: "Πληροφορικής",
			university: "ΟΠΑ",
			link: "https://youtu.be/FDm_mb9RKp4",
			icon: "youtube",
		},
		{
			name: "Λογιστικής και Χρηματοοικονομικής",
			university: "ΟΠΑ",
			link: "https://youtu.be/WQs6-ec2noM",
			icon: "youtube",
		},
		{
			name: "Οργάνωσης και Διοίκησης Επιχειρήσεων",
			university: "ΟΠΑ",
			link: "https://youtu.be/xsMi8g2Y1A4",
			icon: "youtube",
		},
		{
			name: "Μάρκετινγκ και Επικοινωνίας",
			university: "ΟΠΑ",
			link: "https://youtu.be/5i356LcEVjY",
			icon: "youtube",
		},
		{
			name: "Διοικητικής Επιστήμης και Τεχνολογίας",
			university: "ΟΠΑ",
			link: "https://youtu.be/L7ssgo8oFME",
			icon: "youtube",
		},
		{
			name: "Οικονομικής Επιστήμης",
			university: "ΟΠΑ",
			link: "https://youtu.be/15X-DdReVs0",
			icon: "youtube",
		},
		{
			name: "Στατιστικής",
			university: "ΟΠΑ",
			link: "https://youtu.be/UaTsBXk5LtY",
			icon: "youtube",
		},
		{
			name: "Μηχανολόγων Μηχανικών",
			university: "ΕΜΠ",
			link: "https://youtu.be/EyO_9rV-dlI",
			icon: "youtube",
		},
		{
			name: "Αρχιτεκτόνων Μηχανικών",
			university: "ΕΜΠ",
			link: "https://youtu.be/jdTLyy5fx-w",
			icon: "youtube",
		},
		{
			name: "Αγρονόμων και Τοπογράφων Μηχανικών",
			university: "ΕΜΠ",
			link: "https://youtu.be/3v67SDjW1ow",
			icon: "youtube",
		},
		{
			name: "Πολιτικών Μηχανικών",
			university: "ΕΜΠ",
			link: "https://youtu.be/pRIboD_hozs",
			icon: "youtube",
		},
		{
			name: "Μεταλλειολόγων Μηχανικών και Μεταλλουργών Μηχανικών",
			university: "ΕΜΠ",
			link: "https://youtu.be/pe0ky3G7J80",
			icon: "youtube",
		},
		{
			name: "Χημικών Μηχανικών",
			university: "ΕΜΠ",
			link: "https://youtu.be/Ny6Fl_TigFc",
			icon: "youtube",
		},
		{
			name: "Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών",
			university: "ΕΜΠ",
			link: "https://youtu.be/NUUlwKS5_zM",
			icon: "youtube",
		},
		{
			name: "Εφαρμοσμένων Μαθηματικών και Φυσικών Επιστημών",
			university: "ΕΜΠ",
			link: "https://youtu.be/5P_XUSQcvR8",
			icon: "youtube",
		},
		{
			name: "Ναυπηγών Μηχανολόγων Μηχανικών",
			university: "ΕΜΠ",
			link: "https://youtu.be/2SUo1YxPg_A",
			icon: "youtube",
		},
		{
			name: "Χημικών Μηχανικών",
			university: "ΕΜΠ",
			link: "https://youtu.be/Ny6Fl_TigFc",
			icon: "youtube",
		},
		{
			name: "Μαθηματικών",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/CfAC9aq8uJI",
			icon: "youtube",
		},
		{
			name: "Ψυχολογίας",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/MVgPT1H8RgU",
			icon: "youtube",
		},
		{
			name: "Θεολογίας",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/Sq_e-ukhsg0",
			icon: "youtube",
		},
		{
			name: "Φυσικής",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/ni2Gs3cWcUY",
			icon: "youtube",
		},
		{
			name: "Ιατρικής",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/tlGiCqR3Bvk",
			icon: "youtube",
		},
		{
			name: "Νοσηλευτικής",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/tcAc9X6jBjI",
			icon: "youtube",
		},
		{
			name: "Δημοτικής Εκπαίδευσης",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/i-BDou_13gk",
			icon: "youtube",
		},
		{
			name: "Φυσικής Αγωγής και Αθλητισμού",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/0vGUD6kXHNo",
			icon: "youtube",
		},
		{
			name: "Θεατρικών Σπουδών",
			university: "ΕΚΠΑ",
			link: "https://youtu.be/utt78O2yIS0",
			icon: "youtube",
		},
		{
			name: "Διεθνών και Ευρωπαϊκών Σπουδών",
			university: "ΠΑΠΕΙ",
			link: "https://youtu.be/wAWcckTPR4w",
			icon: "youtube",
		},
	];

	return (
		<View style={[styles.container, themeStyle.styles.backgroundColor]}>
			<ScrollView
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
			>
				<View>
					<Card
						style={[styles.settingOption]}
						containerStyle={[styles.settingOptionsContainer]}
					>
						<Image
							source={require("../../assets/uniqueMindsLogo.png")}
							style={[styles.uniqueMindsLogo]}
						/>
						<Text
							style={[
								themeStyle.styles.text.textOnBackground,
								styles.optionText,
							]}
						>
							Το παρακατω υλικο ανήκει στον μη κερδοσκοπικό
							οργανισμό
							<Text
								onPress={() => {
									WebBrowser.openBrowserAsync(
										"http://uniqueminds.gr/"
									);
								}}
								style={[
									themeStyle.styles.text.textOnBackground,
									styles.optionText,
									styles.underlineTextStyle,
								]}
							>
								{" "}
								Unique Minds
							</Text>
							.
						</Text>
					</Card>

					{departments.map((department, index) => (
						<Card
							key={index}
							style={[styles.settingOption]}
							containerStyle={[styles.settingOptionsContainer]}
							onPress={() => {
								WebBrowser.openBrowserAsync(department.link);
							}}
						>
							<Text
								style={[
									themeStyle.styles.text.textOnBackground,
									styles.optionText,
								]}
							>
								{department.name} {department.university}
							</Text>
							<MaterialCommunityIcons
								name={department.icon}
								size={32}
								color={themeStyle.theme.colors.defaultIconColor}
								style={[styles.icon]}
							/>
						</Card>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export const LearnUniversitiesScreen = React.memo(learnUniversitiesScreen);

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
	contentContainer: {
		paddingHorizontal: 10,
	},
	underlineTextStyle: {
		textDecorationLine: "underline",
	},
	uniqueMindsLogo: {
		width: Dimens.spaces.xxLarge,
		height: Dimens.spaces.xxLarge,
		marginVertical: Dimens.spaces.medium,
	},
});
