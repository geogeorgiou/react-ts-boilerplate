import * as React from "react";
import { FC, ReactNode } from "react";
import styled, { ThemeConsumer } from "styled-components/macro";
import { withTheme } from "@material-ui/styles";
import { GoalSectionContent } from "../components/section/goals/GoalSectionContent";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";
import ContactForm from "../components/section/contact/ContactForm";
import { LocalesNsOption } from "../context/LangContextProvider";

/**
 * background - optional css color to use
 */
type SectionGridItemType = {
	background?: string
	[key: string]: any;
}

const SectionItem = styled.section<SectionGridItemType>`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 400px;
	padding: 100px 20vw;
	background: ${props => props.background || props.theme.palette.regularCommon.white};
`;

// const SectionGridItem = styled(Grid)<SectionGridItemType>`
// 	position: relative;
// 	//display: flex;
// 	min-height: 400px;
// 	padding: 9rem 20vw;
// 	background: ${props => props.background || "white"};
// `;

type AnyType = {
	[key: string]: any
}

const GeneratedCurveStyles = styled.div<AnyType>`
	
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: ${props => props.inverted ? `rotate(0deg)` : `rotate(180deg)`};
	//transform: rotate(-180deg);
	
	& svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 150px;
	}
	
	& .shape-fill {
		//fill: #1D1D1D;
		fill: ${props => props.backgroundColor || "red"};
	};
	

`;

type HaikeCurveProps = {
	svg: any
	flip?: boolean
}
const HaikeiCurve = styled.div<HaikeCurveProps>`
	aspect-ratio: 960/300;
	width: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	
	background-image: url(${props => props.svg});
	
	transform: ${props => props.flip && `rotate(180)`};		

	//
	//& svg {
	//	fill: red;
	//}
`;

const GeneratedCurve = (props: any) => (
	<GeneratedCurveStyles {...props}>
		<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
			<path
				d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
				className="shape-fill" />
		</svg>
	</GeneratedCurveStyles>
);

//Implemented only w CSS
// const ComplexCurve = styled.div`
// 	position: absolute;
// 	height: 225px;
// 	width: 100%;
// 	bottom: 0;
//
// 	&::before,
// 	&::after{
// 		content: '';
// 		display: block;
// 		position: absolute;
// 		border-radius: 100% 50%; //vertical horizontal radius
// 		width: 55%;
// 		height: 100%;
// 	}
//
// 	&::before {
// 		background-color: #202731;
// 		transform: translate(85%,60%); //translate(-40%,40%);
// 	}
//
// 	&::after{
// 		background-color: #3c31dd;
// 		transform: translate(-4%, 40%); //translate(-40%,40%);
// 		z-index: -1;
// 	}
//
// 	.bubble::after {
// 		content: '';
// 		border-top-left-radius: 50% 100%;
// 		border-top-right-radius: 50% 100%;
// 		position: absolute;
// 		bottom: 0;
// 		height: 85%;
// 		width: 100%;
// 		background-color: #0f0f10;
// 		z-index: -1;
// 	}
// `;

type SectionPropsType = {
	theme: any,
	// routeId: number;
	title?: string;
	text?: string;
}

const SectionTitle = (props) => <Typography variant={"h3"} style={{marginBottom: "3rem"}}>{props.title}</Typography>


const BannerSection: FC<SectionPropsType> = ({ theme, title, text }) => (
	// <SectionItem background={theme.palette.regularCommon.blue}>
	<SectionItem id={"home"} background={theme.palette.primary.main}>
		{title && <SectionTitle title={title}/>}
		{text && <p>{text}</p>}

		{/*<ComplexCurve />*/}
		<GeneratedCurve backgroundColor={theme.palette.regularCommon.white}/>
	</SectionItem>
);

const GoalSection: FC<SectionPropsType> = ({ theme, title }) => (
	<SectionItem id={"goals"}>
		{title && <SectionTitle title={title}/>}
		<GoalSectionContent />


	</SectionItem>
);

const BlankSection: FC<SectionPropsType> = ({ theme, title, text }) => (
	<GeneratedCurve backgroundColor={theme.palette.regularCommon.white}  />
)

const ServicesSection: FC<SectionPropsType> = ({ theme, title, text }) => (
	<SectionItem id={"services"} background={theme.palette.regularCommon.red}>
		{/*<GeneratedCurve backgroundColor={theme.palette.regularCommon.white} inverted={true} />*/}
		{title && <SectionTitle title={title}/>}
		{text && <p>{text}</p>}
	</SectionItem>
);

const WaveSection: FC<SectionPropsType> = () => (
	<section>
		<HaikeiCurve svg={"/svg/LayeredWaves.svg"} />
	</section>
);

// const ServiceWaveSection: FC<SectionPropsType> = () => (
// 	<section>
// 		<HaikeiCurve svg={"/svg/ServiceWavesTop.svg"} />
// 	</section>
// );

// const ContactFormWaveSection: FC<SectionPropsType> = () => (
// 	<section>
// 		<HaikeiCurve svg={"/svg/ContactFormWave.svg"} />
// 	</section>
// );


const ContactSection: FC<SectionPropsType> = ({ theme, title, text }) => (
	<SectionItem id={"contact"} background={"#202731"}>
		{title && <SectionTitle title={title}/>}
		<ContactForm/>

		{/*<ContactFormWaveSection theme={theme}/>*/}

	</SectionItem>
);



const sectionComponentMap: ReactNode[] = [
	BannerSection,
	GoalSection,
	// ServiceWaveSection,
	ServicesSection,
	WaveSection,
	ContactSection,
	// ContactFormWaveSection
];

//primary btn
// background: #00D8FF;
// border: 1px solid #00D8FF;
// color: white;

const Main = () => {

		const { t } = useTranslation([LocalesNsOption.Translation, LocalesNsOption.Common]);

		return (
			<ThemeConsumer>
				{(theme) => (
					<>
						{
							sectionComponentMap.map((JsxItem: any, index) => {

								const i18Accessor = `sectionContent.${index}`;

								return (
									<JsxItem
										key={i18Accessor}
										theme={theme}
										title={t(`${i18Accessor}.title`)}
										text={t(`${i18Accessor}.text`)}
									/>
								);
							})
						}

					</>
				)}
			</ThemeConsumer>


		);
	}
;

export default withTheme(Main);