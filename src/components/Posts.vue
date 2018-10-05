<template>
    <div id="posts">
        <section>
            <b-row>
                <b-col md="4" lg="4">
                    <div class="create-post">
                        <h3>{{ msgCreate }}</h3>
                        <b-row>
                            <b-col class="postCreate">
                                <b-card>
                                    <form @submit.prevent>
                                        <textarea v-model="post.content" placeholder="Start type here..."></textarea>
                                        <button class="button" @click="createPost" :disabled="post.content === ''">add</button>
                                    </form>
                                </b-card>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col md="8" lg="8">
                    <h3 class="header-inline">{{ msg }}</h3>
                    <transition name="fade">
                        <div v-if="hiddenPosts.length" @click="showNewPosts" class="hidden-posts">
                            <p class="showOtherPosts">
                                Click to show <span>{{ hiddenPosts.length }}</span>
                                other <span v-if="hiddenPosts.length > 1">posts</span><span v-else>post</span>
                            </p>
                        </div>
                    </transition>
                    <b-row v-if="posts.length">
                        <b-col md="6" lg="4" v-for="(post, index) in posts" :key="index" class="post">
                            <b-card>
                                <h5>{{ post.userName }}</h5>
                                <span>{{ post.createdOn | formatDate }}</span>
                                <p>{{ post.content | trimLength }}</p>
                                <ul>
                                    <li><a>comments {{ post.comments }}</a></li>
                                    <li><a>likes {{ post.likes }}</a></li>
                                    <!--<li><button class="button">view full post</button></li>-->
                                </ul>
                                <button @click="openCommentModal(post)" class="button">comments</button>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row v-else>
                        <p class="no-results">There are currently no posts</p>
                    </b-row>
                </b-col>
            </b-row>
        </section>

        <b-modal id="modalComments" @hidden="closeCommentModal" hide-footer ref="modalComments" title="Bootstrap-Vue">
            <div class="c-container">
                <h4 class="text-left">Create a comment</h4>
                <form @submit.prevent>
                    <textarea v-model.trim="comment.content" placeholder="Start type here..."></textarea>

                    <b-btn class="mt-3" :disabled="comment.content == ''" variant="outline-success" block @click="addComment">Add comment</b-btn>
                    <b-btn class="mt-3" variant="outline-danger" block @click="closeCommentModal">Close Me</b-btn>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapState } from 'vuex'
    const fb = require('./../firebase.config.js')
    let vm = {};

    export default {
        name: 'Posts',
        data(){
            return {
                msg: 'Posts',
                msgCreate: 'Create a post',
                post: {
                    content: ''
                },

                comment: {
                    postId: '',
                    userId: '',
                    content: '',
                    postComments: '',
                },
                showCommentModal: false,
            }
        },
        filters: {
            formatDate(val){
                if(!val) { return '-' }
                let date = val.toDate();
                return moment(date).fromNow();
            },
            trimLength(val){
                if(val.length < 200) {
                    return val;
                } else {
                    return `${val.substring(0, 200)}...`
                }
            },
        },
        methods: {
            openCommentModal(post){
                this.comment.postId = post.id;
                this.comment.userUd = post.userId;
                this.comment.postComments = post.comments;
                this.$refs.modalComments.show()
            },
            closeCommentModal(){
                this.$refs.modalComments.hide()
                this.comment.postId = '';
                this.comment.userId = '';
                this.comment.content = '';
                this.showCommentModal = false
            },
            addComment(){
                let postId = this.comment.postId;
                let postComments = this.comment.postComments;

                fb.commentsCollection.add({
                    createdOn: new Date(),
                    content: this.comment.content,
                    postId: postId,
                    userId: this.currentUser.uid,
                    userName: this.userProfile.name,
                }).then(doc => {
                    fb.postsCollection.doc(postId).update({
                        comments: postComments + 1
                    }).then(() => {
                        this.closeCommentModal()
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            createPost(){
                fb.postsCollection.add({
                    createdOn: new Date,
                    content: this.post.content,
                    userId: this.currentUser.uid,
                    userName: this.userProfile.name,
                    comments: 0,
                    likes: 0,
                }).then(ref => {
                    this.post.content = ''
                }).catch(err => {
                    console.log(err)
                })
            },
            showNewPosts(){
                let updatedPostsArray = this.hiddenPosts.concat(this.posts)
                console.log(updatedPostsArray);
                // claer hiddenPosts array and update posts array
                this.$store.commit('setHiddenPosts', null)
                this.$store.commit('setPosts', updatedPostsArray)
            }
        },
        computed: {
            ...mapState(['userProfile', 'currentUser', 'posts', 'hiddenPosts']),
        },
        created(){
            console.log(this.hiddenPosts)
            vm = this;
        }
    }
</script>

<style>
    li {
        list-style: none;
    }

    .post, .postCreate {
        margin: 15px auto;
    }
    .post ul {
        padding: 0;
    }

    textarea {
        border: none;
        resize: none;
        display: block;
        width: 100%;
        height: 150px;
    }

    .header-inline {
        display: inline-block;
    }

    .hidden-posts {
        float: right;
        margin-top: 10px;
        cursor: pointer;
    }

    .hidden-posts:hover .showOtherPosts {
        color: #0e8651;
    }

    .showOtherPosts {
        font-size: 12px;
        margin: 0;
    }
    .showOtherPosts span {
        font-size: 12px;
    }
    .text-left {
        text-align: left;
    }
</style>