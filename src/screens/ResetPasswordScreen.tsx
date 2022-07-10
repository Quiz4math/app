import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { object, string } from "yup";
import { Button } from "../components/Button/Button";
import { useUserRepo } from "../components/EngineProvider/EngineProvider";
import { TextInput } from "../components/TextInput/TextInput";
import {
  useTextStyles,
  useThemeStyle
} from "../components/ThemeProvider/ThemeProvider";
import { ErrorText } from "../components/Typography/ErrorText";
import { Paragraph } from "../components/Typography/Paragraph";
import { Dimens } from "../constants/Dimens";
import {
  NewDefaultState,
  RequestState,
  StateType
} from "../services/API/ApiService";
import { useEffectCleanSubs } from "../utils/hooks";

interface FormData {
	email: string;
}

const schema = object().shape({
	email: string()
		.required("Το email είναι υποχρεωτικό")
		.email("Ελέγξτε την μορφή του email")
		.max(255),
});

type State = RequestState<void>;
type ResetFn = (data: FormData) => void;

function useResetPassword(): [State, ResetFn] {
	const [state, setState] = useState<State>(NewDefaultState());
	const repo = useUserRepo();
	const subs = useEffectCleanSubs();

	const reset = useCallback((data: FormData) => {
		const sub = repo.resetPassword(data.email).subscribe(setState);

		subs.push(sub);
	}, []);

	return [state, reset];
}

const resetPasswordScreen: React.FunctionComponent = () => {
	const themeStyle = useThemeStyle();
	const [state, resetPassword] = useResetPassword();
	const textStyles = useTextStyles();

	const form = useForm<FormData>({
		resolver: yupResolver(schema),
		mode: "onBlur",
	});

	const onSubmit = useMemo(() => form.handleSubmit(resetPassword), []);

	const noticeView = useMemo(() => {
		switch (state.type) {
			case StateType.Success:
				return (
					<Paragraph style={[textStyles.textOnBackground]}>
						Το email στάλθηκε με επιτυχία (εαν υπάρχει λογαριασμός
						με αυτό το email)
					</Paragraph>
				);
			case StateType.Error:
				return <ErrorText>Παρουσιάστηκε κάποιο πρόβλημα</ErrorText>;
			default:
				return null;
		}
	}, [state]);

	return (
		<View style={[styles.container, themeStyle.styles.backgroundColor]}>
			<Controller
				control={form.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder="Email"
						value={value}
						onBlur={onBlur}
						onChangeText={onChange}
						viewStyle={[styles.textInput]}
						textContentType="emailAddress"
						error={form.formState.errors.email?.message}
					/>
				)}
				name="email"
				defaultValue=""
			/>
			<View style={[styles.noticeViewContainer]}>{noticeView}</View>
			<Button
				title="Επαναφορά κωδικού"
				onPress={onSubmit}
				loading={state.isLoading}
				style={[styles.button]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: Dimens.spaces.screen,
	},
	textInput: {
		marginTop: Dimens.spaces.medium,
	},
	noticeViewContainer: {
		marginTop: Dimens.spaces.small,
	},
	button: {
		marginTop: Dimens.spaces.medium,
	},
});

export const ResetPasswordScreen = React.memo(resetPasswordScreen);
