import Vue from 'vue'
import Vuex from 'vuex'

const fb = require('./firebase.config')

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        posts: [],
        hiddenPosts: [],
    },
    actions: {
        fetchUserProfile({ commit, state }){
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data());
            }).catch(err => {
                alert.log('Oops, ' + err.message)
            })
        },
        clearData({commit}){
            commit('setCurrentUser', null);
            commit('setUserProfile', {});
            commit('setPosts', null);
            commit('setHiddenPosts', null);
        }
    },
    mutations: {
        setCurrentUser(state, val){
            state.currentUser = val;
        },
        setUserProfile(state, val){
            state.userProfile = val;
        },
        setPosts(state, val){
            if(val){
                state.posts = val
            } else {
                state.posts = []
            }
        },
        setHiddenPosts(state, val){
            if(val){
                state.hiddenPosts = val
            } else {
                state.hiddenPosts = []
            }
        }
    }
});

fb.auth.onAuthStateChanged(user => {
    if(user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')


        fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {

            // @todo remake this (it should shows our posts before other's) !!!


                let posts = [];
                let hiddenPosts = [];

                querySnapshot.forEach(elem => {
                    let post = elem.data();
                    post.id = elem.id;
                    if(store.state.currentUser.uid !== post.userId) {
                        hiddenPosts.push(post)
                    } else {
                        posts.push(post)
                    }
                })

                store.commit('setHiddenPosts', hiddenPosts);
                store.commit('setPosts', posts)

        })
    }
})


