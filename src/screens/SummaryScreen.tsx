import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { TextButton } from "../components/Button/TextButton";
import { Card } from "../components/Card/Card";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Headline } from "../components/Typography/Headline";
import { Text } from "../components/Typography/Text";
import { Title } from "../components/Typography/Title";
import { Dimens } from "../constants/Dimens";
import { UserAnswer } from "../models/UserAnswer";
import { useCleanSubscriptions } from "../utils/hooks";

interface Route {
	params: { sessionId: number };
}

interface Props {
	route: Route;
	navigation: any;
}

const loading: React.FunctionComponent = () => {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<ActivityIndicator size="large" />
		</View>
	);
};

const Loading = React.memo(loading);

function getDescription(percentage: number) {
	if (percentage >= 0.8) {
		return "🎉 Τέλεια 🎉";
	} else if (percentage >= 0.5) {
		return "🥳 Καλά 🥳";
	}

	return "Προσπάθησε Ξανά";
}

const summaryScreen: React.FunctionComponent<Props> = (props) => {
	const themeStyle = useContext(ThemeContext).themeStyle;
	const sessionRepo = useContext(EngineContext).quizSessionRepository;
	const sessionId = props.route.params.sessionId;
	const subs = useCleanSubscriptions();
	const [userAnswers, setUserAnswers] = useState<UserAnswer[] | undefined>();

	useEffect(() => {
		const sub = sessionRepo.summary(sessionId).subscribe((userAnswers) => {
			setUserAnswers(userAnswers);
		});

		subs.push(sub);
	}, []);

	const correctCount = useMemo(() => {
		if (userAnswers) {
			return userAnswers.filter((u) => u.correct).length;
		}

		return 0;
	}, [userAnswers]);

	function navigateToReview() {
		props.navigation.push("QuizSessionReviewScreen", { userAnswers });
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

	return (
		<ScrollView
			style={[styles.container, themeStyle.styles.backgroundColor]}
			contentContainerStyle={[styles.contentContainerStyle]}
		>
			<Card containerStyle={[styles.card]}>
				<Headline
					style={[
						styles.description,
						themeStyle.styles.text.textOnBackground,
					]}
				>
					{getDescription(correctCount / (userAnswers?.length ?? 1))}
				</Headline>
				<Title
					style={[
						themeStyle.styles.text.textOnBackground,
						styles.title,
					]}
				>
					{`${correctCount}/${userAnswers?.length ?? 0}`}
				</Title>
				<TextButton
					title="Δες αναλυτικά"
					style={[styles.reviewButton]}
					onPress={navigateToReview}
				/>
			</Card>

			<Card
				style={[styles.socialMediaOption]}
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
					Κάντε like στην σελίδα μας στο Facebook
				</Text>
			</Card>

			<Card
				style={[styles.socialMediaOption]}
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
					Κάντε follow στο Instagram
				</Text>
			</Card>

			<Card
				style={[styles.socialMediaOption]}
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
					Μπείτε στο viber community
				</Text>
			</Card>
		</ScrollView>
	);
};

export const SummaryScreen = React.memo(summaryScreen);

const styles = StyleSheet.create({
	container: {},
	contentContainerStyle: {
		padding: Dimens.spaces.screen,
	},
	card: {
		padding: Dimens.spaces.medium,
		paddingBottom: 0,
	},
	title: {
		textAlign: "center",
		marginTop: Dimens.spaces.small,
	},
	question: {
		marginVertical: Dimens.spaces.medium,
	},
	description: {
		textAlign: "center",
	},
	reviewButton: {
		marginTop: Dimens.spaces.medium,
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
	socialMediaOption: {
		marginVertical: Dimens.spaces.small,
	},
});
