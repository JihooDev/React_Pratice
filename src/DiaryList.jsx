import React from 'react';
import DiaryItem from './DiaryItem';

export default function DiaryList({ onEdit, onRemove, diaryList }) {
	return (
		<div className="DiaryList">
			<h2>DiaryList</h2>
			<h4>{diaryList.length} 개의 일기가 있습니다.</h4>
			<div>
				{diaryList.map(it => (
					<DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
				))}
			</div>
		</div>
	);
}
