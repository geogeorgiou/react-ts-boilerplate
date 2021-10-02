import React from "react";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

export type CardComponentType = {
	title: string;
	textContent: string;
	showCardActions?: boolean;
	icon: React.ReactNode;
}

export function CardComponent({title, textContent, showCardActions, icon}: CardComponentType) {

	return (
		<Card>
			<CardMedia
				component="img"
				height="140"
				image="/static/images/cards/contemplative-reptile.jpg"
				alt={`card-icon-${title}`}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="secondary">
					{textContent}
				</Typography>
			</CardContent>
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