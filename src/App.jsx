import React, { useEffect, useRef, useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

//https://jsonplaceholder.typicode.com/comments

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

	const onCreate = (author, content, emotion) => {
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

		setData([newItem, ...data]);
	};

	const onEdit = (targetId, newContent) => {
		setData(
			data.map(it => (it.id === targetId ? { ...it, content: newContent } : it))
			// 각각 모든 요소들이 매개변수로 전달 된 targetId 와 일치한지 검사
			// 수정 대상이라면 새 콘텐츠로 교체 해주고 아니라면 원래의 데이터를 출력
			// map 함수로 모든 배열의 모든 요소를 순회해서 변경된 값을 setData에 저장
		);
	}; // 매개변수는 어떤 아이디에 어떤 새로운 콘텐츠를 추가할 것인지 해서 2개를 작성

	const onRemove = targetId => {
		console.log(`${targetId} 가 삭제되었습니다`);
		const newDiaryList = data.filter(it => it.id !== targetId);
		// targetId를 포함하지 않은 배열들로 바꾼다
		setData(newDiaryList);
	};

	return (
		<div className="App">
			<DiaryEditor onCreate={onCreate} />
			<DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
		</div>
	);
}
