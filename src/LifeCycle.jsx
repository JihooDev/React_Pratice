import React, { useEffect, useState } from 'react';

const UnmountTest = () => {
	useEffect(() => {
		console.log('Mount!');

		return () => {
			// unMount 시점에 실행
			console.log('UnMount');
		};
	}, []);

	return <div>UnmountTest</div>;
};

export default function LifeCycle() {
	const [isVisible, setIsVisible] = useState(false);
	const toggle = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div style={{ padding: 20 }}>
			<button onClick={toggle}>ON/OFF</button>
			{isVisible && <UnmountTest />}
		</div>
	);
}
