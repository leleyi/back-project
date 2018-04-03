<template>
  <el-container>
    <el-aside width="30%">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
          </div>

          <img src="/static/images/person.jpg"/>
          <div class="text item">用户名：{{cardData.username}}
          </div>
          <div class="text item">邮箱账号：{{cardData.email}}
          </div>
          <div class="text item">年龄：{{cardData.age}}
          </div>
          <div class="text item">真实姓名：{{cardData.realname}}
          </div>
          <div class="text item">性别：{{cardData.sex}}
          </div>
          <div class="text item">QQ：{{cardData.qq}}
        </div>
          <div class="text item">注册时间：{{cardData.registdate}}
          </div>
          <div class="text item">年级：{{cardData.registdate}}
          </div>

          <div><img src="/static/images/logo.png"/></div>
        </el-card>
      </div>
    </el-aside>
    <el-main>
      <el-container>
        <el-header>相关数据</el-header>
        <el-main>
          <div id="myChart" style="height: 300px;width: 1000px">  </div>
            <div id="myChart2" style="height: 300px;width: 1000px">  </div>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
<script>
  export default {
    data() {
      return {
        cardData: {
          signature: "",
          realname: "",
          username: "",
          sex: "",
          age: "",
          email: "",
          qq: "",
          phone: "",
          studentid: "",
          academo: "",
          registdate: ""
        }
      }
    },
    mounted() {
      this.drawLine();
      this.loadUserDetail();
    },
    computed: {
      user(){
        return this.$store.state.user;
      },
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        var option1 = {
          title: {text: '个人物品条形图'},
          tooltip: {},
          xAxis: {
            data: ["生活日用", "信息技术", "图书资料", "手机电脑", "其他物品"]
          },
          yAxis: {},
          series: [{
            type: 'bar',
            data: [5, 20, 36, 10, 10]
          }]
        }
        var option2 = {
          title: {text: '个人物品比例图'},
          tooltip: {},
          series: [{
            type: 'pie',
            data:[
              {value:5, name:'生活日用'},
              {value:20, name:'信息技术'},
              {value:36, name:'图书资料'},
              {value:10, name:'手机电脑'},
              {value:20, name:'其他物品'}
            ],
          }]
        }
        myChart.setOption(option1);
        myChart2.setOption(option2);
      },
      loadUserDetail(){
        var _this = this;
        this.tableLoading = true;
        this.getRequest("http://localhost:8080/user/getUserDetail?id="+this.$store.state.user.id).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.cardData = data.data;
            _this.totalCount = 10;
          }
        })
      },
      }
  }
</script>
