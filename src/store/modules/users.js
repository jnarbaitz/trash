import axios from 'axios'

const state = {
  user: null,
  loading: false,
  error: null
}

const getters = {
  user (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
    this.dispatch('loadLinks')
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}

const actions = {
  registerUser ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    console.log(JSON.stringify(payload))
    axios.post(`http://localhost:3000/api/auth/register/`, payload)
      .then(response => {
        console.log(JSON.stringify(response))
        commit('setLoading', false)
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
  },
  loginUser ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    console.log(JSON.stringify(payload))
    axios.post(`http://localhost:3000/api/auth/login/`, payload)
      .then(response => {
        localStorage.setItem('jwtToken', response.data.token)
        console.log(JSON.stringify(response))
        commit('setUser', response.data.user)
        commit('setLoading', false)
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        });
  },
  updateUser ({commit, state}, payload) {
    commit('setLoading', true)
    commit('clearError')
    //var user = state.user;
    //user.username = payload.username;
    axios.put('http://localhost:3000/api/auth/' + payload.id, payload)
      .then(response => {
        var updatedUser = {
          id: response.data._id,
          email: response.data.email,
          username: response.data.username
        }
        commit('setUser', updatedUser)
        commit('setLoading', false)
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
  },
  updatePassword ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    var user = firebase.auth().currentUser
    user.updatePassword(payload.password)
      .then(
        data => {
          console.log('Password updated.')
        })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
  },
  updatePhoto ({commit, state}, payload) {
    commit('setLoading', true)
    commit('clearError')
    var user = firebase.auth().currentUser
    var key = user.uid

    let imageUrl
    const filename = payload.image.name
    const ext = filename.slice(filename.lastIndexOf('.'))
    return firebase.storage().ref('users/' + key + '.' + ext).put(payload.image)
      .then(
        fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          commit('setLoading', false)
          return firebase.database().ref('users/' + user.uid).update({imageUrl: imageUrl})
            .then(
              data => {
                state.user.imageUrl = imageUrl
              })
            .catch(
              error => {
                console.log(error)
                commit('setError', error)
              })
        })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
  },
  autoLogin ({commit}, payload) {
    firebase.database().ref('users/').once('value', function (snapshot) {
      var currUser = snapshot.child(payload.uid).val()
      commit('setUser', currUser)
      commit('setLoading', false)
    })
  },
  logout ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
  setError ({commit}, error) {
    commit('setError', error)
  },
  clearError ({commit}) {
    commit('clearError')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}