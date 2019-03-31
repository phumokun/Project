import firebase from 'firebase'
var config = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'fir-auth-12e52.firebaseapp.com',
  databaseURL: 'xxxxxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxxxx'
}
firebase.initializeApp(config)
var provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})
export default {
  name: 'app',
  data () {
    return {
      displayName: '',
      photoURL: ''
    }
  },
  methods: {
    sign () {
      console.log('yes')
      var vm = this
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
        var user = result.user
        console.log(token, user)
        console.log('displayName :: ', user.displayName)
        console.log('photoURL ::', user.photoURL)
        vm.displayName = user.displayName
        vm.photoURL = user.photoURL
      }).catch(function (error) {
        console.log(error)
      })
    },
    signOut () {
      var vm = this
      firebase.auth().signOut().then(function () {
        console.log('logOut')
        vm.displayName = ''
        vm.photoURL = ''
      }, function (error) {
        console.log(error)
      })
    }
  }
}