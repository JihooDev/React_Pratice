import React, { useRef, useState } from 'react';

export default function DiaryItem({ author, content, emotion, created_date, id, onRemove, onEdit }) {
	const [isEdit, setIsEdit] = useState(false);
	// 수정하기에 활용되는 state

	const [localContent, setLocalContent] = useState(content);
	// 수정하기 버튼을 눌렀을 때 원래의 content 가 나오게 하는 state

	const localContentInput = useRef();

	const toggleIsEdit = () => {
		setIsEdit(!isEdit);
	}; // 함수가 호출 될 때 마다 isEdit을 반전 시키는 함수

	const handelEdit = () => {
		if (localContent.length < 5) {
			localContentInput.current.focus();
			return;
		} // 5 글자 이하는 ref를 통해 다시 focus 전달

		if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
			onEdit(id, localContent); // 매개변수 id와 localContent를 전달
			toggleIsEdit(); // 수정 textarea가 닫히는 함수 호출
		} // confirm이 true 일 시 수정 실행
	};

	const deleteBtn = () => {
		if (window.confirm(`${id} 번째 일기를 정말 삭제하시겠습니까?`)) {
			onRemove(id);
		}
	}; // 삭제하는 함수 (onClick 이벤트)

	const handleQuitEdit = () => {
		setIsEdit(false);
		setLocalContent(content);
	}; // 작성하다가 수정취소버튼을 눌렀다 다시 눌러도 원래의 값만 출력된다

	return (
		<div className="DiaryItem">
			<div className="info">
				<span>
					작성자 : {author} | 감정점수 : {emotion}
				</span>
				<br />
				<span className="date">{new Date(created_date).toLocaleString()}</span>
			</div>
			<div className="content">
				{isEdit ? (
					<>
						<textarea
							ref={localContentInput}
							value={localContent}
							onChange={e => {
								setLocalContent(e.target.value);
							}}
						/>
					</>
				) : (
					<>{content}</>
				)}
			</div>
			{isEdit ? (
				<>
					<button onClick={handleQuitEdit}>수정 취소하기</button>
					<button onClick={handelEdit}>수정완료</button>
				</>
			) : (
				<>
					<button onClick={toggleIsEdit}>수정하기</button>
					<button onClick={deleteBtn}>삭제하기</button>
				</>
			)}
		</div>
	);
}
