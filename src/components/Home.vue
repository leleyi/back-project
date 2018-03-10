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
          <!--<div style="display: flex;justify-content: flex-start;width: 180px;text-align: left;">-->
            <!--<el-menu style="background: #ececec;width: 180px;" unique-opened router>-->
              <!--<template v-for="(item,index) in this.routes" v-if="!item.hidden">-->
                <!--<el-submenu :key="index" :index="index+''">-->
                  <!--<template slot="title">-->
                    <!--<i :class="item.iconCls" style="color: #20a0ff;width: 14px;"></i>-->
                    <!--<span slot="title">{{item.name}}</span>-->
                  <!--</template>-->
                  <!--<el-menu-item width="180px"-->
                                <!--style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"-->
                                <!--v-for="child in item.children"-->
                                <!--:index="child.path"-->
                                <!--:key="child.path">{{child.name}}-->
                  <!--</el-menu-item>-->
                <!--</el-submenu>-->
              <!--</template>-->
            <!--</el-menu>-->
          <!--</div>-->
          <el-row class="tac" style="height: 100%">
            <el-col :span="24">  <!--@open="handleOpen"-->
              <!--@close="handleClose"-->
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="darkgoldenrod"
                text-color="#fff"
                active-text-color="#ffd04b">
                <!--<el-submenu index="1">   </el-submenu>-->
                <el-menu-item index="1">
                    <i class="el-icon-setting" ></i>
                    <span slot="title"><router-link to="/GoodsList" tag="span" >基本信息</router-link></span>
                </el-menu-item>
                  <!--<el-menu-item-group>-->
                    <!--<template slot="title">分组一</template>-->
                    <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
                    <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
                  <!--</el-menu-item-group>-->
                  <!--<el-menu-item-group title="分组2">-->
                    <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
                  <!--</el-menu-item-group>-->
                  <!--<el-submenu index="1-4">-->
                    <!--<template slot="title">选项4</template>-->
                    <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
                  <!--</el-submenu>-->

                <el-menu-item index="2">
                  <i class="el-icon-goods"></i>
                  <span slot="title"><router-link to="/GoodsList" tag="span" >个人物品</router-link></span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-message"></i>
                  <span slot="title"><router-link to="/GoodsList" tag="span"  >我的消息</router-link></span>
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
            <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
              <!--<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
              <!--<el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
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
//      this.devMsg();
    },
    methods: {
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      goChat() {
        this.$router.push({path: '/chat'});
      },
      devMsg() {
        this.$alert('为了确保所有的小伙伴都能看到完整的数据演示，数据库只开放了查询权限和部分字段的更新权限，其他权限都不具备，完整权限的演示需要大家在自己本地部署后，换一个正常的数据库用户后即可查看，这点请大家悉知!', '友情提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$notify({
              title: '重要重要!',
              type: 'warning',
              message: '小伙伴们需要注意的是，目前只有权限管理模块完工了，因此这个项目中你无法看到所有的功能，除了权限管理相关的模块。权限管理相关的模块主要有两个，分别是 [系统管理->基础信息设置->权限组] 可以管理角色和资源的关系， [系统管理->操作员管理] 可以管理用户和角色的关系。',
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
    // computed: {
    //   user(){
    //     return this.$store.state.user;
    //   },
    //   routes(){
    //     return this.$store.state.routes
    //   }
    // }
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
