import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './ReactMemo/OptimizeTest2';

export default function App() {
	const [data, setData] = useState([]);

	const dataId = useRef(0);

	// API 호출 함수
	const getData = async () => {
		// 비동기 처리를 하는 함수 생성
		const res = await fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json());

		const initData = res.slice(0, 20).map(it => {
			return {
				author: it.email,
				content: it.body,
				emotion: Math.floor(Math.random() * 5) + 1, // Math.floor (소수점을 정수로 바꿔줌)
				created_date: new Date().getTime(),
				id: dataId.current++,
			};
		});

		setData(initData);
	};

	useEffect(() => {
		getData();
		// Mount 시점에 getData 함수를 실행
	}, []);

	const onCreate = useCallback((author, content, emotion) => {
		// 반환할 콜백함수

		const created_date = new Date().getTime();
		const newItem = {
			author,
			content,
			emotion,
			created_date,
			id: dataId.current,
		};
		// 새로 들어갈 데이터

		dataId.current += 1;
		// id값을 useRef 값을 증가

		setData(data => [newItem, ...data]);
		// setState(상태변화 함수)에 함수를 전달 하는 것 ** 함수형 업데이트 **
	}, []);

	const onEdit = (targetId, newContent) => {
		setData(
			data.map(it => (it.id === targetId ? { ...it, content: newContent } : it))
			// 각각 모든 요소들이 매개변수로 전달 된 targetId 와 일치한지 검사
			// 수정 대상이라면 새 콘텐츠로 교체 해주고 아니라면 원래의 데이터를 출력
			// map 함수로 모든 배열의 모든 요소를 순회해서 변경된 값을 setData에 저장
		);
	}; // 매개변수는 어떤 아이디에 어떤 새로운 콘텐츠를 추가할 것인지 해서 2개를 작성

	const onRemove = targetId => {
		const newDiaryList = data.filter(it => it.id !== targetId);
		// targetId를 포함하지 않은 배열들로 바꾼다
		setData(newDiaryList);
	};

	const getDiaryAnalysis = useMemo(() => {
		// 감정점수가 3,4,5 이면 기분이 좋은 것으로 판단
		const goodCount = data.filter(it => it.emotion >= 3).length; //(기분좋음) filter 로 3 이하인 데이터들은 걸러줌
		const badCount = data.length - goodCount; // (기분나쁨) 전체의 데이터에 3이하를 걸러준 데이터를 빼줌
		const goodRatio = (goodCount / data.length) * 100; // (기분좋음 비율) 기분좋음 에서 전체 데이터를 나눠주고 100을 곱합
		return { goodCount, badCount, goodRatio };
	}, [data.length]);
	// useMemo => 함수의 연산을 최적화 하는 기능
	// 1 ) useMemo 의 첫번째 인자에는 콜백함수가 들어간다.
	// 2 ) 두번째 인자에는 [] (Array)가 들어간다. Array 안에의 값이 변경되야 useMemo 함수를 실행한다
	// 3 ) useMemo 는 함수가 아니라 값으로 평가 받는다.
	// ==> return 까지의 연산을 최적화 하고 싶을 때 사용 한다.

	const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
	//getDiaryAnalysis 함수가 객체를 return 하니까 객체로 비구조화 할당을 통해 받아줌

	return (
		<div className="App">
			<DiaryEditor onCreate={onCreate} />
			<div>전체일기 : {data.length}</div>
			<div>기분 좋은 일기 갯수 : {goodCount}</div>
			<div>기분 나쁨 일기 갯수 : {badCount}</div>
			<div>기분 좋은 일기 비율 : {goodRatio}%</div>
			<DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
		</div>
	);
}
