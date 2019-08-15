import { SAVE_ARTICLES_LIST } from '../../types';

const initState = {
  list: [],
  total: 0,
}

export function articles(state = initState, action) {
  switch (action.type) {
    case SAVE_ARTICLES_LIST:
      return {
        ...state,
        list: state.list.length ? [...state.list, ...action.payload.list] : action.payload.list,
        total: action.payload.count,
      };
      default:
        return state;
  }
}