import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { SecondaryButton } from "../components/Button/SecondaryButton";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { Select } from "../components/Select/Select";
import { TextInput } from "../components/TextInput/TextInput";
import {
  ThemeContext,
  useThemeStyle
} from "../components/ThemeProvider/ThemeProvider";
import { Text } from "../components/Typography/Text";
import { Dimens } from "../constants/Dimens";
import { Curriculum } from "../models/Curriculum";
import { RequestState } from "../services/API/ApiService";

interface Props {
	style?: StyleProp<ViewStyle>;
	curriculums: Curriculum[];
}

interface FormData {
	password: string;
	curriculumId: number;
}

const changeCurriculmScreen: React.FunctionComponent<Props> = (props) => {
	const [pedio, setPedio] = useState<string>("");
	const [pedioId, setPedioId] = useState<string>("");
	const [selectValue, setSelectValue] = useState<string>("Πεδίο");
	const [curriculumViews, setCurriculumViews] = useState<Picker<any>>();
	const [text, setText] = useState<string>();
	const [passwordValue, setPasswordValue] = useState<string>("");
	const engine = useContext(EngineContext);
	const userRepo = engine.userRepository;
	const themeStyle = useContext(ThemeContext).themeStyle;
	const changeCurriculumRepo = engine.changeAccountInformationRepository;

	const textStyle = useThemeStyle().styles.text;
	useEffect(() => {
		userRepo.getAuthData().then((data) => {
			setPedio(data.curriculumName ?? "Δεν βρέθηκε το πεδίο σου");
			setPedioId(data.curriculumId ?? "4");
		});
		engine.curriculumRepo
			.getCurriculums()
			.subscribe((curriculums: RequestState<Curriculum[]>) => {
				if (curriculums.data != undefined) {
					setCurriculumViews(
						curriculums.data.map((c: Curriculum) => (
							<Picker.Item
								label={c.name}
								value={c.id}
								key={String(c.id)}
							/>
						))
					);
				}
			});
	}, []);

	const onChangeSelect = (itemValue: string, id: string) => {
		setSelectValue(itemValue);
		setPedioId(id);
	};

	const submit = () => {
		changeCurriculumRepo
			.changeStudentData({
				current_password: passwordValue,
				curriculum_id: pedioId,
			})
			.subscribe(
				(response) => {
					if (response.type == "Success") {
						changeCurriculumRepo.updateCurriculum(pedioId);
						setText("Άλλαξε με επιτυχία");
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
			<SafeAreaView>
				<ScrollView
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
				>
					<Select
						mode="dropdown"
						containerStyle={styles.select}
						style={[themeStyle.styles.text.textOnSurface]}
						selectedValue={selectValue}
						onValueChange={(itemValue, itemPosition) =>
							onChangeSelect(
								itemValue,
								curriculumViews[itemPosition].key
							)
						}
					>
						{curriculumViews}
					</Select>

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
						title="Αλλαγή πεδίου"
						onPress={submit}
						style={[styles.settingOption]}
					/>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export const ChangeCurriculmScreen = React.memo(changeCurriculmScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: Dimens.spaces.screen,
	},
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
	optionText: {
		flex: 1,
	},
	icon: {
		textAlign: "center",
		padding: Dimens.spaces.small,
		overflow: "hidden",
	},
	select: {
		marginTop: Dimens.spaces.medium,
	},
	contentContainer: {
		paddingHorizontal: 10,
	},
});
