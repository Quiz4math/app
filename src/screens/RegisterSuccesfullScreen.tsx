import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSuccessfullyRegisterNavigator } from "../../Navigators";
import { Button } from "../components/Button/Button";
import { SecondaryButton } from "../components/Button/SecondaryButton";
import { useUserRepo } from "../components/EngineProvider/EngineProvider";
import { ScreenAvoidingView } from "../components/ScreenAvoidingView/ScreenAvoidingView";
import { useThemeStyle } from "../components/ThemeProvider/ThemeProvider";
import { ErrorText } from "../components/Typography/ErrorText";
import { Headline } from "../components/Typography/Headline";
import { Paragraph } from "../components/Typography/Paragraph";
import { TextEmphasized } from "../components/Typography/TextEmphasized";
import { Dimens } from "../constants/Dimens";
import {
  NewDefaultState,
  RequestState,
  StateType
} from "../services/API/ApiService";
import { useEffectCleanSubs } from "../utils/hooks";

interface Route {
	params: { email: string };
}

interface Props {
	route: Route;
}

type State = RequestState<void>;
type ResendFn = (email: string) => void;

function useResendEmail(): [State, ResendFn] {
	const [state, setState] = useState<State>(NewDefaultState());
	const userRepo = useUserRepo();
	const subs = useEffectCleanSubs();

	const resend = useCallback((email: string) => {
		const sub = userRepo.resendEmailConfirmation(email).subscribe(setState);

		subs.push(sub);
	}, []);

	return [state, resend];
}

const registerSuccessfull: React.FunctionComponent<Props> = (props) => {
	const themeStyle = useThemeStyle();
	const textStyles = themeStyle.styles.text;
	const navigator = useSuccessfullyRegisterNavigator();

	const [state, resend] = useResendEmail();

	let noticeView: JSX.Element | undefined;

	switch (state.type) {
		case StateType.Success:
			noticeView = (
				<Paragraph style={[styles.noticeView]}>
					Το email ξανά στάλθηκε
				</Paragraph>
			);
			break;
		case StateType.Error:
			noticeView = (
				<ErrorText style={[styles.noticeView]}>
					Κάτι πήγε λάθος
				</ErrorText>
			);
			break;
	}

	return (
		<ScreenAvoidingView>
			<ScrollView
				contentContainerStyle={[
					styles.container,
					themeStyle.styles.backgroundColor,
				]}
			>
				<Headline
					style={[textStyles.textOnBackground, styles.headline]}
				>
					Η εγγραφή σας ολοκληρώθηκε!
				</Headline>
				<TextEmphasized
					style={[textStyles.textOnBackground, styles.description]}
				>
					{`Πήγαινε στο email σου ${props.route.params.email}, εκεί θα σου έχει έρθει ένα μήνυμα από εμάς για να ενεργοποιήσεις τον λογαριασμό σου.\n\nΕάν δεν το βλέπεις πως έχει έρθει, κοίτα στα Ανεπιθύμητα (spam) ή σε κάποια άλλη κατηγορία (πχ Ενημερώσεις).`}
				</TextEmphasized>

				{noticeView}

				<SecondaryButton
					style={[styles.emailButton]}
					title="Επαναστολή email"
					loading={state.isLoading}
					onPress={() => resend(props.route.params.email)}
				/>

				<Button
					style={[styles.backToLogin]}
					title="Πίσω στην Σύνδεση"
					onPress={() => navigator.backToLogin()}
				/>
			</ScrollView>
		</ScreenAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: Dimens.spaces.screen,
		flexGrow: 1,
	},
	headline: {
		marginTop: Dimens.spaces.xLarge,
		textAlign: "center",
	},
	description: {
		marginTop: Dimens.spaces.large,
	},
	emailButton: {
		marginTop: Dimens.spaces.large,
	},
	backToLogin: {
		marginTop: Dimens.spaces.small,
	},
	noticeView: {
		textAlign: "center",
		marginTop: Dimens.spaces.large,
	},
});

export const RegisterSuccessfullScreen = React.memo(registerSuccessfull);
