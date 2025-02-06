import React, { useEffect, useRef } from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Chip,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { stateCoordinates } from '../constants';

const RecallsAccordion = ({ recalls, expandedState, setExpandedState }) => {
	const expandedAccordionRef = useRef(null);
	const groupedRecalls = recalls?.stateGroups || {};

	useEffect(() => {
		if (expandedState) {
			const element = document.getElementById(
				`${expandedState.replace(/\s+/g, '-')}-header`
			);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}, [expandedState]);

	const getRecallCount = (classifications) => {
		return Object.values(classifications).flat().length;
	};

	const getFullStateName = (stateAbbr) => {
		return stateCoordinates[stateAbbr]?.name || stateAbbr;
	};

	const handleChange = (state) => (event, isExpanded) => {
		setExpandedState(isExpanded ? getFullStateName(state) : false);
	};

	return Object.entries(groupedRecalls)
		.sort(([stateA], [stateB]) =>
			getFullStateName(stateA).localeCompare(
				getFullStateName(stateB),
				'en-US',
				{
					sensitivity: 'base',
				}
			)
		)
		.map(([state, classifications]) => (
			<Accordion
				key={state}
				expanded={expandedState === getFullStateName(state)}
				onChange={handleChange(state)}
			>
				<AccordionSummary
					ref={
						expandedState === getFullStateName(state)
							? expandedAccordionRef
							: null
					}
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`${state}-content`}
					id={`${getFullStateName(state).replace(/\s+/g, '-')}-header`}
				>
					<Typography sx={{ flex: 1 }}>{getFullStateName(state)}</Typography>
					<Chip
						label={getRecallCount(classifications)}
						size='small'
						sx={{
							marginRight: 2,
							backgroundColor: '#e0e0e0',
						}}
					/>
				</AccordionSummary>
				<AccordionDetails>
					{Object.entries(classifications)
						.filter(([_, recalls]) => recalls && recalls.length > 0)
						.map(([classification, recalls]) => (
							<div key={`${state}-${classification}`}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography variant='subtitle1'>{classification}</Typography>
									<Chip
										label={
											recalls.filter(
												(recall) => recall.classification === classification
											).length
										}
										size='small'
										color='primary'
									/>
								</Box>
								<div>
									{recalls.slice(0, 5).map((recall, idx) => (
										<div key={idx}>
											<h5>{recall.recalling_firm}</h5>
											<p>{recall.product_description}</p>
											<p>
												<strong>Reason:</strong> {recall.reason_for_recall}
											</p>
										</div>
									))}
								</div>
							</div>
						))}
				</AccordionDetails>
			</Accordion>
		));
};

export default RecallsAccordion;
