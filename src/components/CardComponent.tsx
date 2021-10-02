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

const StyledCard = styled(CardContent)`
	height: 11rem;
`

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

export function CardComponent({title, textContent, showCardActions, icon}: CardComponentType) {

	const CardIcon = icon;

	return (
		<Card>
			{/*<CardMedia*/}
			{/*	component="img"*/}
			{/*	height="140"*/}
			{/*	image="/static/images/cards/contemplative-reptile.jpg"*/}
			{/*	alt={`card-icon-${title}`}*/}
			{/*/>*/}
			<StyledCard>
				<Grid
					container
					direction={"column"}
					alignItems={"center"}
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
						<Typography variant="body2" color="secondary">
							{textContent}
						</Typography>
					</Grid>
				</Grid>
			</StyledCard>
			{
				showCardActions && (
					<CardActions>
						<Button size="small">Share</Button>
						<Button size="small">Learn More</Button>
					</CardActions>
				)
			}
		</Card>
	)

}