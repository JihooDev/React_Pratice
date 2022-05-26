const reducer = (state, action) => {
	switch (action.type) {
		case 'INIT': {
			return action.data;
		}
		case 'CREATE': {
			const created_date = new Date().getTime();
			const newItem = {
				...action.data,
				created_date,
			};

			return [newItem, ...state];
		}
		case 'REMOVE': {
			return state.filter(it => it.id !== action.targetId);
		}
		case 'EDIT': {
			return state.map(it => (it.id === action.targetId ? { ...it, content: action.newContent } : it));
		}
		default:
			return state;
	}
};

export default reducer;
