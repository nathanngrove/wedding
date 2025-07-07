"use client";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

type FaqAccordionProps = {
	summary: string;
	details: string;
};

function FaqAccordion({ summary, details }: FaqAccordionProps) {
	return (
		<Accordion
			slotProps={{ heading: { component: "h4" } }}
			sx={{ bgcolor: "#557c70", color: "white" }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header">
				{summary}
			</AccordionSummary>
			<AccordionDetails>{details}</AccordionDetails>
		</Accordion>
	);
}

export default FaqAccordion;
