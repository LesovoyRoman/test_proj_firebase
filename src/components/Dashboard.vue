<template>
    <div id="dash">
        <section>
            <div class="col1">
                <div class="profile">
                    <h5>{{ userProfile.name }}</h5>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapState } from 'vuex'
    const fb = require('./../firebase.config.js')
    let vm = {};

    export default {
        name: 'Dashboard',
        data(){
            return {
                msg: 'Dashboard',
            }
        },
        computed: {
            ...mapState(['userProfile', 'currentUser', 'posts', 'hiddenPosts']),
        },
        created(){
            vm = this;
        }
    }
</script>

