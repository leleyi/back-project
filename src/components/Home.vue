<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header" style="background-color: darkgoldenrod">
        <span class="home_title"><img src="images/logo.png" alt=" "></span>
        <div style="display: flex;align-items: center;margin-right: 7px">
          <el-badge style="margin-right: 30px" :is-dot="isDot">
            <i class="fa fa-bell-o" @click="goChat" style="cursor: pointer"></i>
          </el-badge>
          <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
    <!--{{user.name}}--> 小兔子
    <!--<i><images v-if="user.userface!=''" :src="user.userface"-->
    <!--style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>-->
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!--content-->
      <el-container>
        <el-aside width="150px" class="home-aside" style="background-color:darkgoldenrod">
          <el-row class="tac" style="height: 100%">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="darkgoldenrod"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <i class="el-icon-setting" ></i>
                    <span slot="title"><router-link to="/GoodsList" tag="span" >基本信息</router-link></span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-goods"></i>
                  <span slot="title"><router-link to="/GoodsList" tag="span" >个人物品</router-link></span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-message"></i>
                  <span slot="title"><router-link to="/Chat" tag="span"  >我的消息</router-link></span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-date"></i>
                  <span slot="title"><router-link to="/GoodsList" tag="span"  >购买记录</router-link></span>
                </el-menu-item>
                <el-menu-item index="5" >
                  <i class="el-icon-document"></i>
                  <span slot="title"><router-link to="/GoodsList" tag="span" >我的心愿单</router-link></span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <!--<el-container>-->
          <el-main>
            <keep-alive>
              <router-view ></router-view><!--v-if="this.$route.meta.keepAlive"-->
            </keep-alive>
           <!-- <router-view ></router-view>--><!--v-if="!this.$route.meta.keepAlive"--><!---->
          </el-main>
        <!--</el-container>-->
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    mounted: function () {
    },
    methods: {
      goChat() {
        this.$router.push({path: '/chat'});
      },
      devMsg() {
        this.$alert('!', '友情提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$notify({
              title: '重要重要!',
              type: 'warning',
              message: ' 。',
              duration: 0
            });
          }
        });
      },
      handleCommand(cmd) {
        var _this = this;
        // if (cmd == 'logout') {
        //   this.$confirm('注销登录, 是否继续?', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     _this.getRequest("/logout");
        //     _this.$store.commit('logout');
        //     _this.$router.replace({path: '/'});
        //   }).catch(() => {
        //     _this.$message({
        //       type: 'info',
        //       message: '取消'
        //     });
        //   });
        // }
      }
    },
    data() {
      return {
        isDot: false
      }
    },
    computed: {
      user(){
        return this.$store.state.user;
      },
      routes(){
        return this.$store.state.routes
      }
    }
  }
</script>
<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-aside {
    background-color: #ECECEC;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>
