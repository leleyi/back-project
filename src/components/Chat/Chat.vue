<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 10px">
      <el-tab-pane label="好友聊天" name="chat"><el-card class="box-card" style="width: 950px"><fc></fc></el-card></el-tab-pane>
      <!--<el-tab-pane label="系统通知" name="notification"><nf></nf></el-tab-pane>-->
    </el-tabs>
  </div>
</template>
<script>
  import FriendChat from '@/components/Chat/FriendChat'
  // import Notification from '@/components/Chat/Notification'
  export default {
    data() {
      return {
        activeName: 'chat'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components:{
      'fc':FriendChat,
      // 'nf':Notification
    }
  };
</script>
