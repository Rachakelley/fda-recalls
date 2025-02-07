import React, { useState } from 'react';
import {
	AccordionDetails,
	Box,
	Button,
	Divider,
	Typography,
} from '@mui/material';

const AccordionContent = ({ recalls, recallsDisplayCount, state }) => {
	const [visibleRecalls, setVisibleRecalls] = useState(
		recalls.reduce((acc, [classification]) => {
			acc[classification] = recallsDisplayCount; // Initially show 5 recalls per classification
			return acc;
		}, {})
	);

	const handleShowMore = (classification) => {
		setVisibleRecalls((prev) => {
			const updatedVisibleRecalls = {
				...prev,
				[classification]: prev[classification] + 5,
			};
			return updatedVisibleRecalls;
		});
	};

	const getClassificationColorBox = (classification) => {
		if (classification === 'Class I') {
			return <div className='color-box class-i'></div>;
		} else if (classification === 'Class II') {
			return <div className='color-box class-ii'></div>;
		} else if (classification === 'Class III') {
			return <div className='color-box class-iii'></div>;
		}
	};

	return (
		<AccordionDetails>
			{recalls.map(([classification, recalls]) => (
				<div key={`${state}-${classification}`}>
					<Divider
						component='div'
						sx={{ margin: '12px 0' }}
					/>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						{getClassificationColorBox(classification)}
						<Typography variant='subtitle1'>
							{classification} Recalls
						</Typography>
					</Box>

					<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
						{[...recalls]
							.sort((a, b) => a.recalling_firm.localeCompare(b.recalling_firm))
							.slice(0, visibleRecalls[classification])
							.map((recall, index) => (
								<li key={`${state}-${recall.product_description}`}>
									<Divider
										component='div'
										sx={{ margin: '12px 0' }}
									/>
									<Typography
										variant='subtitle2'
										className='recalling-firm'
									>
										{recall.recalling_firm}
									</Typography>
									<ul>
										<li key={`${state}-${recall.recall_number}-${index}`}>
											<Typography variant='body2'>
												<strong>Recall Number:</strong> {recall.recall_number}
											</Typography>
										</li>
										<li key={`${state}-${recall.status}-${index}`}>
											<Typography variant='body2'>
												<strong>Status:</strong> {recall.status}
											</Typography>
										</li>
										<li key={`${state}-${recall.product_description}-${index}`}>
											<Typography variant='body2'>
												<strong>Product:</strong> {recall.product_description}
											</Typography>
										</li>
										<li key={`${state}-${recall.reason_for_recall}-${index}`}>
											<Typography variant='body2'>
												<strong>Reason:</strong> {recall.reason_for_recall}
											</Typography>
										</li>
									</ul>
								</li>
							))}
						{recalls.length > visibleRecalls[classification] && (
							<Button
								onClick={() => handleShowMore(classification)}
								variant='text'
								sx={{ mt: 2 }}
							>
								Show More
							</Button>
						)}
					</ul>
				</div>
			))}
		</AccordionDetails>
	);
};

export default AccordionContent;
