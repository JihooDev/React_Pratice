import React, { useState, useEffect } from 'react';

const CounterA = React.memo(({ count }) => {
	useEffect(() => {
		console.log(`counterA update = ${count}`);
	});
	return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }) => {
	useEffect(() => {
		console.log(`counterB update = ${obj.count}`);
	});
	return <div>{obj.count}</div>;
});

export default function OptimizeTest() {
	const [count, setCount] = useState(1);
	const [obj, setObj] = useState({
		count: 1,
	});

	const areEqual = (prevProps, nextProps) => {
		if (prevProps.obj.count === nextProps.obj.count) {
			return true; // 이전과 현재의 Props 가 일치하다 -> 리렌더링을 일으키지 않음
		}
		return false; // 이전과 현재의 Props 이 다르다 -> 리렌더링을 일으킴
	};

	const MemoizedCounterB = React.memo(CounterB, areEqual);

	return (
		<div style={{ padding: 50 }}>
			<div>
				<h2>Count A</h2>
				<CounterA count={count} />
				<button
					onClick={() => {
						setCount(count);
					}}
				>
					A button
				</button>
			</div>
			<div>
				<h2>Count B</h2>
				<MemoizedCounterB obj={obj} />
				<button
					onClick={() => {
						setObj({
							count: obj.count,
						});
					}}
				>
					Count B
				</button>
			</div>
		</div>
	);
}
