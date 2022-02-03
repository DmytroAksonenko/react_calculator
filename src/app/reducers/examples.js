import { SAVE_EXAMPLES } from '../constants/actionTypes'
import { internalValue } from '../actions/examples'

export function createStore(rootReducer) {
	let state = {};
	const examples = [];

	return {
		dispatch(action) {
			state = rootReducer(state, action);
			examples.forEach(sub => sub())
		},

		getState() {
			return state
		}

	}

}

export function rootReducer(state, action) {
	if (action.type === SAVE_EXAMPLES, internalValue) {
		state = internalValue;
		return state
	}
	return state
}

