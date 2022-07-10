export interface Colors {
  readonly backgroundColor: string;
  readonly surfaceColor: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly textColorOnBackground: string;
  readonly textColorOnSurface: string;
  readonly textColorOnPrimary: string;
  readonly textColorOnSecondary: string;
  readonly secondaryTextColorOnBackground: string;
  readonly secondaryTextColorOnSurface: string;
  readonly errorColor: string;
  readonly components: ComponentsColors;
  readonly defaultIconColor: string;
  readonly linkColor: string;
}

export interface ComponentsColors {
  readonly textInput: TextInputColors;
  readonly button: ButtonColors;
  readonly bottomNavigation: BottomNavigationColors;
  readonly questionAnswers: QuestionAnswersColors;
  readonly lineChart: LineChartColors;
  readonly correctnessByCourse: CorrectnessByCoursePieChartColor;
  readonly pagination: PaginationColors;
  readonly placeholder: PlaceHolderColors;
  readonly chipButton: ChipButtonColors;
  readonly secondaryButton: SecondaryButtonColors;
}

export interface ChipButtonColors {
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  loadingIndicatorColor: string;
}

export interface SecondaryButtonColors {
  backgroundColor: string;
  textColor: string;
  loadingIndicatorColor: string;
}

export interface PlaceHolderColors {
  mediaBackground: string;
  lineBackground: string;
}

export interface PaginationColors {
  innactiveDot: string;
  activeDot: string;
}

export interface LineChartColors {
  color: (opacity: number) => string;
  labelColor: (opacity: number) => string;
}

export interface CorrectnessByCoursePieChartColor {
  correctColor: string;
  incorrectColor: string;
  legendColor: string;
}

export interface QuestionAnswersColors {
  readonly normal: string;
  readonly selected: string;
  readonly correct: string;
  readonly incorrect: string;
}

export interface BottomNavigationColors {
  readonly background: string;
  readonly activeTab: string;
  readonly inactiveTab: string;
}

export interface TextInputColors {
  background: string;
  placeholder: string;
  text: string;
  border: string;
  tint: string;
}

export interface ButtonColors {
  text: string;
  background: string;
  activityIndicator: string;
  textButtonText: string;
  ripple: string;
}
