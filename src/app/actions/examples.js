export let internalValue

export const SAVE_EXAMPLES = 'SAVE_EXAMPLES'
export const GET_EXAMPLES = 'GET_EXAMPLES'

export function saveExamples(value){	
	internalValue = value
	return{
		type: SAVE_EXAMPLES, internalValue
	}
}

