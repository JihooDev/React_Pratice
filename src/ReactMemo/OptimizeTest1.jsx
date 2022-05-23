import React, { useState, useEffect } from 'react';

const TextView = React.memo(({ text }) => {
	useEffect(() => {
		console.log(`update text = ${text}`);
	});
	return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
	useEffect(() => {
		console.log(`update count = ${count}`);
	});
	return <div>{count}</div>;
});

export default function OptimizeTest() {
	const [count, setCount] = useState(1);
	const [text, setText] = useState('');

	return (
		<div style={{ padding: 50 }}>
			<h2>count</h2>
			<CountView count={count} />
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				+
			</button>
			<h2>Text</h2>
			<TextView text={text} />
			<input value={text} onChange={e => setText(e.target.value)}></input>
		</div>
	);
}