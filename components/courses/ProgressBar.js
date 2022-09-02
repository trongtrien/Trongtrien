import React from 'react'

const ProgressBar = ({bgcolor,progress,height}) => {
	
	const Parentdiv = {
		height: height,
		padding: 1,
		width: '100%',
		backgroundColor: 'rgba(255, 140, 0, 0.25)',
		borderRadius: 10,
	}
	
	const Childdiv = {
        height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
	    borderRadius:10,
		textAlign: 'right',
	}
	
	const progresstext = {
		color: 'white',
		fontWeight: 400,
        fontSize: 12,
        paddingTop: 1,
        lineHeight: 1
	}
		
	return (
	<div style={Parentdiv}>
        <div style={Childdiv}>
            <p className='pe-2' style={progresstext}>{`${progress}%`}</p>
        </div>
	</div>
	)
}

export default ProgressBar;
