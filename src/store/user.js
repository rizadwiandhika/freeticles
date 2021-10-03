import { createSlice } from '@reduxjs/toolkit'

const regex = {
  fullname: /^[a-zA-Z][a-zA-Z\s]{6,50}/,
  email:
    /^[a-zA-Z0-9](([a-zA-Z0-9]+\.)|([a-zA-Z0-9])*)[a-zA-Z0-9]+@([a-zA-Z]+\.)+([a-zA-Z]+)$/,
  phone: /^(08)([0-9]{8,11})$/
}

const OldInitialState = {
  name: {
    value: '',
    touched: false,
    required: true,
    err: false,
    errMessage: 'Hanya karakter alphabet dengan panjang 6 - 50 karakter'
  },
  username: {
    value: '',
    touched: false,
    required: true,
    err: false,
    errMessage:
      'Email tidak valid. Pastikan penulisan sudah benar seperti: example@mail.com'
  },
  password: {
    value: '',
    touched: false,
    required: true,
    err: false,
    errMessage:
      'Email tidak valid. Pastikan penulisan sudah benar seperti: example@mail.com'
  }
}

const initialState = { name: '', username: '', password: '' }

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // ! password bukan yg bcrypt, tapi yang asli
    saveUser: function (state, action) {
      const { name, username, password } = action.payload
      state.name = name
      state.username = username
      state.password = password
    },
    changed: function (state, action) {
      const { name, value } = action.payload

      if (!state[name]) return
      state[name].value = value

      /* Checking if field name has regex for validating value */
      if (regex[name]) {
        const isValid = regex[name].test(value)
        state[name].err = !isValid
      }
    },
    touched: function (state, action) {
      const { name } = action.payload

      if (!state[name].hasOwnProperty('touched') || state[name].touched) return
      state[name].touched = true
    },
    reset: function () {
      return initialState
    },
    findAllInvalid: function (state) {
      for (const field in state) {
        const input = state[field]

        if (input.err || (input.required && !input.value)) {
          state[field].err = true
          state[field].touched = true
        }
      }
    }
  }
})

export default slice.reducer
export const { saveUser } = slice.actions

export function insertUsers({ name, password }) {
  return async function (dispatch) {}
}
