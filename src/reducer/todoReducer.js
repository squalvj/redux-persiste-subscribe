const ADD_TODO = 'ADD_TODO'
const DONE = 'DONE'


const handleAddTodo = (state, action) => ({
   ...state,
   todoList: [...state.todoList, action.payload]
})

const handleMark = (state, action) => {
   const arr = state.todoList.map(e => {
      if (e.text === action.payload.text) {
         e.done = !e.done
      }
      return e
   })
   
   return {
      ...state,
      todoList: arr
   }
}

export const addTodo = (payload) => {
   return {
      type: ADD_TODO,
      payload
   }
}

export const markTodo = (payload) => {
   return {
      type: DONE,
      payload
   }
}

const ACTION_HANDLERS = {
   [ADD_TODO]: handleAddTodo,
   [DONE]: handleMark,
 };
 

const initialState = {
   todoList: []
}

export default function todoReducertodoReducer(state = initialState, action) {
   const handler = ACTION_HANDLERS[action.type];
   return handler ? handler(state, action) : state;
 }