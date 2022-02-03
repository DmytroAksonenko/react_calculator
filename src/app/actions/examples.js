import {
  SAVE_EXAMPLES,
  GET_EXAMPLES,
} from '../constants/actionTypes'

export let internalValue;

export function saveExamples(value) {
  internalValue = value;
  return {
    type: SAVE_EXAMPLES, internalValue
  }
}

