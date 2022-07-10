import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { CenteredLoadingSpinner } from "../components/CenteredLoadingSpinner/CenteredLoadingSpinner";
import { useCurriculumRepo } from "../components/EngineProvider/EngineProvider";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { useThemeStyle } from "../components/ThemeProvider/ThemeProvider";
import { Dimens } from "../constants/Dimens";
import { Curriculum } from "../models/Curriculum";
import {
  NewDefaultState,
  RequestState,
  StateType
} from "../services/API/ApiService";

function useCurriculum(): [RequestState<Curriculum[]>, () => void] {
	const [curriculumsState, setCurriculumsState] = useState<
		RequestState<Curriculum[]>
	>(NewDefaultState());

	const [retryCount, setRetryCount] = useState(0);
	const repo = useCurriculumRepo();

	useEffect(() => {
		const sub = repo.getCurriculums().subscribe(setCurriculumsState);

		return () => sub.unsubscribe();
	}, [retryCount]);

	const retry = useCallback(() => {
		setRetryCount(retryCount + 1);
	}, [retryCount]);

	return [curriculumsState, retry];
}

const registerScreen: React.FunctionComponent = () => {
	const themeStyle = useThemeStyle();

	const [state, retry] = useCurriculum();

	let innerView: JSX.Element | undefined;

	switch (state.type) {
		case StateType.Success: {
			innerView = <RegisterForm curriculums={state.data} />;
			break;
		}
		case StateType.Loading: {
			innerView = <CenteredLoadingSpinner />;
			break;
		}
		case StateType.Error: {
			innerView = <ErrorView onPress={retry} />;
		}
	}

	return (
		<ScrollView
			style={[themeStyle.styles.backgroundColor]}
			contentContainerStyle={styles.container}
		>
			{innerView}
		</ScrollView>
	);
};

export const RegisterScreen = React.memo(registerScreen);

const styles = StyleSheet.create({
	container: {
		padding: Dimens.spaces.screen,
		flexGrow: 1,
	},
});
