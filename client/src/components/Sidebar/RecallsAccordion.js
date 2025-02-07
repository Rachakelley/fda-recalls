import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
	Accordion,
	AccordionSummary,
	Box,
	Chip,
	CircularProgress,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { stateCoordinates } from '../constants';
import AccordionContent from './AccordionContent';
import './RecallsAccordion.css';

const RecallsAccordion = ({
	recalls,
	isStateAccordionExpanded,
	setIsStateAccordionExpanded,
	isSidebarExpanded,
}) => {
	const [recallsDisplayCount, setRecallsDisplayCount] = useState(5);
	const expandedAccordionRef = useRef(null);
	const groupedRecalls = recalls?.stateGroups || {};

	useEffect(() => {
		if (isStateAccordionExpanded) {
			const element = document.getElementById(
				`${isStateAccordionExpanded.replace(/\s+/g, '-')}-header`
			);
			if (element && isSidebarExpanded) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}, [isStateAccordionExpanded]);

	const getRecallCount = (classifications) => {
		return Object.values(classifications).flat().length;
	};

	const getFullStateName = (stateAbbr) => {
		return stateCoordinates[stateAbbr]?.name || stateAbbr;
	};

	const handleChange = (state) => (event, isExpanded) => {
		setIsStateAccordionExpanded(isExpanded ? getFullStateName(state) : false);
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
			<div
				className='state-accordion-wrapper'
				key={state}
			>
				<Accordion
					expanded={isStateAccordionExpanded === getFullStateName(state)}
					onChange={handleChange(state)}
				>
					<AccordionSummary
						className='state-accordion'
						key={`${state}-summary`}
						ref={
							isStateAccordionExpanded === getFullStateName(state)
								? expandedAccordionRef
								: null
						}
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`${state}-content`}
						id={`${getFullStateName(state).replace(/\s+/g, '-')}-header`}
					>
						<Typography
							variant='subtitle1'
							sx={{ flex: 1 }}
						>
							{getFullStateName(state)}
						</Typography>
						<Chip
							label={getRecallCount(classifications)}
							size='small'
							sx={{
								marginRight: 2,
								backgroundColor: '#e0e0e0',
							}}
						/>
					</AccordionSummary>
					{isStateAccordionExpanded === getFullStateName(state) && (
						<Suspense
							fallback={
								<Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
									<CircularProgress />
								</Box>
							}
						>
							<AccordionContent
								recalls={Object.entries(classifications).filter(
									([_, recalls]) => recalls && recalls.length > 0
								)}
								recallsDisplayCount={recallsDisplayCount}
								state={state}
							/>
						</Suspense>
					)}
				</Accordion>
			</div>
		));
};

export default RecallsAccordion;
