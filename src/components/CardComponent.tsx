import React from "react";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

export type CardComponentType = {
	title: string;
	textContent: string;
	showCardActions?: boolean;
	icon: any;
}

const GridIconWrapper = styled(Grid)`
    && {
    	> svg {
    		font-size: 2.5rem;
    	}
    }
`

const GridContentWrapper = styled(Grid)`
	margin-bottom: 1rem;
`

const StyledCard = styled(Card)`
	//width: 18rem;
	
    font-weight: bold;
    .MuiTypography-h5 {
    	font-weight: bold;
    	//color: ${props => props.theme.palette.primary.main};
  	};
  	
  	// svg {
  	// 	fill: ${props => props.theme.palette.primary.main};
  	// }
  	//
  	// .MuiTypography-body2{
    	// color: ${props => props.theme.palette.primary.main};
  	// };
  	
  	
  	//.MuiTypography-subtitle1 {
  	//	line-height: 1.4rem;
  	//}
      //
  
    &:hover {
		background: ${props => props.theme.palette.primary.main};
		box-shadow: 0 4px 9px 2px rgb(0 0 0 / 27%);
		
		svg {
			fill: #FFFFFF;
		}
		
		.MuiTypography-h5,
		.MuiTypography-body2{
    		color: #FFFFFF;
  		};
		
	}
	
	transition: background .25s ease-in-out,color .05s ease-in-out;
`

const StyledCardText = styled(Typography)`
	line-height: 1.7;
`

const GridContainer = styled(Grid)`
	height: 16rem;
	text-align: center;
`

export function CardComponent({title, textContent, showCardActions, icon}: CardComponentType) {

	const CardIcon = icon;

	return (
		<StyledCard>
			{/*<CardMedia*/}
			{/*	component="img"*/}
			{/*	height="140"*/}
			{/*	image="/static/images/cards/contemplative-reptile.jpg"*/}
			{/*	alt={`card-icon-${title}`}*/}
			{/*/>*/}
			<CardContent>
				<GridContainer
					container
					direction={"column"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<GridIconWrapper item>
						<CardIcon />
					</GridIconWrapper>
					<GridContentWrapper>
						<Typography gutterBottom variant="h5" component="div">
							{title}
						</Typography>
					</GridContentWrapper>
					<Grid item>
						<StyledCardText variant="body2">
							{textContent}
						</StyledCardText>
					</Grid>
				</GridContainer>
			</CardContent>
			{
				showCardActions && (
					<CardActions>
						<Button size="small">Share</Button>
						<Button size="small">Learn More</Button>
					</CardActions>
				)
			}
		</StyledCard>
	)

}