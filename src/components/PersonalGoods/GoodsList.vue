<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="商品名搜索"
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchGoods"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchGoods">搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
                     @click="showAdvanceSearchView"><i
            class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            style="margin-right: 5px"></i>高级搜索
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddGoodsView">
            添加商品
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible">
              <el-row>
                <!--<el-col :span="5">-->
                <!--政治面貌:-->
                <!--<el-select v-model="Goods.politicId" style="width: 130px" size="mini" placeholder="政治面貌">-->
                <!--<el-option-->
                <!--v-for="item in politics"-->
                <!--:key="item.id"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-col>-->
                <!--<el-col :span="7">-->
                <!--聘用形式:-->
                <!--<el-radio-group v-model="Goods.engageForm">-->
                <!--<el-radio label="劳动合同">劳动合同</el-radio>-->
                <!--<el-radio style="margin-left: 15px" label="劳务合同">劳务合同</el-radio>-->
                <!--</el-radio-group>-->
                <!--</el-col>-->
              </el-row>
              <el-row style="margin-top: 10px">
                <!--<el-col :span="5">-->
                <!--所属部门:-->
                <!--<el-popover-->
                <!--v-model="showOrHidePop2"-->
                <!--placement="right"-->
                <!--title="请选择部门"-->
                <!--trigger="manual">-->
                <!--<el-tree :data="deps" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"-->
                <!--@node-click="handleNodeClick2"></el-tree>-->
                <!--<div slot="reference"-->
                <!--style="width: 130px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer;align-items: center"-->
                <!--@click="showDepTree2" v-bind:style="{color: depTextColor}">{{Goods.departmentName}}-->
                <!--</div>-->
                <!--</el-popover>-->
                <!--</el-col>-->
                <el-col :span="10">
                  上架日期:
                  <el-date-picker
                    v-model="exhibitdate"
                    unlink-panels
                    size="mini"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>
                <el-col :span="5" :offset="4">
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchGoods">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table
            :data="goodsList"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            @row-click="showGoodsImgs"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="selection"
              align="left"
              width="30">
            </el-table-column>
            <el-table-column
              prop="name"
              align="left"
              fixed
              label="商品名字"
              width="100">
            </el-table-column>
            <el-table-column
              prop="id"
              width="100"
              align="left"
              label="商品编号">
            </el-table-column>
            <el-table-column
              prop="categories"
              label="商品分类"
              width="100">
            </el-table-column>
            <el-table-column
              prop="exhibitdate"
              width="120"
              align="left"
              label="上架时间">
              <template slot-scope="scope">{{ scope.row.exhibitdate | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="summary"
              width="200"
              align="left"
              label="商品概述">
            </el-table-column>
            <el-table-column
              width="70"
              prop="originalcost"
              label="商品原价">
            </el-table-column>
            <el-table-column
              prop="price"
              width="70"
              label="商品现价">
            </el-table-column>
            <el-table-column
              prop="usetime"
              width="180"
              align="left"
              label="使用时间">
            </el-table-column>
            <el-table-column
              prop="old"
              width="180"
              align="left"
              label="折旧程度">
            </el-table-column>
            <el-table-column
              prop="isline"
              width="100"
              label="交易方式"
              :formatter="dealMethod">
            </el-table-column>
            <el-table-column
              prop="picture"
              width="220"
              align="left"
              label="图片信息">
            </el-table-column>
            <el-table-column
              prop="adv"
              align="left"
              width="120"
              label="广告信息">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <img :src="'static/'+ scope.row.adv"/>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{scope.row.adv}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditGoodsView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteGoods(scope.row)">删除
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary"
                           size="mini">上架
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="goodsList.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyGoodsList">批量删除
            </el-button>
            <el-pagination
              background
              :page-size="20"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="goods" :rules="rules" ref="addGoodsForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="商品名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="goods.name" size="mini" style="width: 150px"
                            placeholder="请输入商品名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="交易方式:" prop="isline">
                  <el-radio-group v-model="goods.isline">
                    <el-radio label="1">线上</el-radio>
                    <el-radio style="margin-left: 15px" label="2">线下</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="上架日期:" prop="exhibitdate">
                  <el-date-picker
                    v-model="goods.exhibitdate"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    style="width: 150px"
                    type="date"
                    placeholder="上架日期">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="商品类别:" prop="categories">
                  <el-select v-model="goods.categories" size="mini" placeholder="商品类别" style="width: 150px">
                    <el-option
                      v-for="item in categories"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="商品概述:" prop="summary">
                  <el-input prefix-icon="el-icon-edit" v-model="goods.summary" size="mini" style="width: 150px"
                            placeholder="商品概述"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="商品购买时间:" prop="buyday">
                  <el-date-picker
                    v-model="goods.buyday"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    style="width: 150px"
                    type="date"
                    placeholder="上架日期">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="商品原价:" prop="originalcost">
                  <el-input prefix-icon="el-icon-edit" v-model="goods.originalcost" size="mini" style="width: 150px"
                            placeholder="商品原价"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="商品现价:" prop="price">
                  <el-input prefix-icon="el-icon-edit" v-model="goods.price" size="mini" style="width: 150px"
                            placeholder="商品现价"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="商品折旧:" prop="price">
                  <el-input prefix-icon="el-icon-edit" v-model="goods.old" size="mini" style="width: 150px"
                            placeholder="几成新"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="商品使用时间:" prop="usetime">
                  <el-input prefix-icon="el-icon-edit" v-model="goods.usetime" size="mini" style="width: 150px"
                            placeholder="商品使用时间"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="是否上架">
                  <el-radio-group v-model="goods.issale">
                    <el-radio label="1">是</el-radio>
                    <el-radio style="margin-left: 15px" label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="商品数量:" prop="price">
                  <el-input prefix-icon="el-icon-edit" v-model="goods.num" size="mini" style="width: 150px"
                            placeholder="商品数量"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="商品展示图片:" prop="picture">
                  <el-upload
                    class="upload-demo"
                    action="http://localhost:8080/goods/uploadImages"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadPictureSuccess"
                    limit='1'
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="广告图片:" prop="adv">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadAdvSuccess"
                    limit='1'
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="商品详细图片:" prop="imgs">
                  <el-upload
                    class="upload-demo"
                    action="http://localhost:8080/goods/uploadImages"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadImgsSuccess"
                    limit="3"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt">取 消</el-button>
    <el-button size="mini" type="primary" @click="addGoods('addForm')">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </el-form>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in images" :key="item">
        <!--<h3>{{ item.img }}</h3>-->
        <!--<img :src="item.img"/>-->
        <img :src="'static/'+item.img"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsList: [],
        keywords: '',
        // fileUploadBtnText: '导入数据',
        beginDateScope: '',
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        dialogTitle: '',
        multipleSelection: [],
        depTextColor: '#c0c4cc',
        categories: [{id: 1, name: '图书类'}, {id: 2, name: '信息技术类'}, {id: 3, name: '生活日用类'}, {id: 4, name: '其他类'}],
        positions: [],
        totalCount: -1,
        currentPage: 1,
        defaultProps: {
          label: 'name',
          isLeaf: 'leaf',
          children: 'children'
        },
        images: [{imgid: "", goodsid: "", img: "", imgname: ""}],
        dialogVisible: false,
        tableLoading: false,
        advanceSearchViewVisible: false,
        showOrHidePop: false,
        showOrHidePop2: false,
        goods: {
          name: '',
          id: '',
          categories: '',
          buyday: '',
          exhibitdate: '',
          summary: '',
          originalcost: '',
          price: '',
          usetime: '',
          isline: '',
          picture: '',
          adv: '',
          imgs: [{imgid: "", goodsid: "", img: "", imgname: ""}],
          num: '',
          old: '',
          issale: ''
        },
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
        }
      };
    },
    mounted: function () {
      this.initData();
      this.loadGoodsList();
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      /*显示商品图片*/
      showGoodsImgs(row, event, column) {
        this.images = row.imgs
      },
      /*格式化交易方式数据*/
      dealMethod(row, column, cellValue) {
        return cellValue == 1 ? "线上" : "线下"
      },
      /*上传成功钩子函数*/
      uploadPictureSuccess(response, file, fileList) {
        if (response.data && response.code == 200) {
          this.goods.picture = response.data
        }
      },
      uploadAdvSuccess(response, file, fileList) {
        if (response.data && response.code == 200) {
          this.goods.adv = response.data
        }
      },
      uploadImgsSuccess(response, file, fileList) {
        if (response.data && response.code == 200) {
          var obj = new Object();
          obj.goodsid = this.goods.id;
          obj.img = response.data;
          obj.imgid = "";
          obj.imgname = "";
          this.goods.imgs.push(obj);
        }
      },
      /*上传失败钩子函数*/
      uploadError(response, file, fileList) {
        console.log('上传失败，请重试！')
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false;
        this.emptyGoodsData();
        this.beginDateScope = '';
        this.loadGoodsList();
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
          this.emptyGoodsData();
          this.beginDateScope = '';
          this.loadGoodsList();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteManyGoodsList() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = '';
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].id + ",";
          }
          this.doDelete(ids);
        }).catch(() => {
        });
      },
      deleteGoods(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {
        });
      },
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.deleteRequest("http://localhost:8080/goods/deletePersonalGoods?ids=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.$message({type: data.status, message: data.msg});
            _this.loadGoodsList();
          }
        })
      },
      keywordsChange(val) {
        if (val == '') {
          this.loadGoodsList();
        }
      },
      searchGoods() {
        this.loadGoodsList();
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadGoodsList();
      },
      loadGoodsList() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("http://localhost:8080/goods/getMyGoodsList?page=" + this.currentPage + "&size=10&id=00000012&keywords="+this.keywords).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.goodsList = data.data;
            _this.totalCount = 10;
            _this.emptyGoodsData();
          }
        })
      },
      addGoods(formName) {
        var _this = this;
        //添加
        this.tableLoading = true;
        this.postRequest("http://localhost:8080/goods/addOrUpdateGoods", this.goods).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            //_this.addImgs();
            _this.$message({type: data.status, message: data.msg});
            _this.dialogVisible = false;
            _this.emptyGoodsData();
            _this.loadGoodsList();
          }
        })
      },
      // addImgs(){
      //   var _this = this;
      //   this.postRequest("http://localhost:8080/goods/addOrUpdateGoodsImgs",this.images).then(resp=>{
      //     _this.tableLoading = false;
      //     if (resp && resp.status == 200) {
      //       var data = resp.data;
      //       _this.$message({type: data.status, message: data.msg});
      //       _this.dialogVisible = false;
      //       _this.emptyGoodsData();
      //       _this.loadGoodsList();
      //     }
      //   })
      // },
      cancelEidt() {
        this.dialogVisible = false;
        this.emptyGoodsData();
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      showDepTree2() {
        this.showOrHidePop2 = !this.showOrHidePop2;
      },
      handleNodeClick(data) {
        this.Goods.departmentName = data.name;
        this.Goods.departmentId = data.id;
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      handleNodeClick2(data) {
        this.Goods.departmentName = data.name;
        this.Goods.departmentId = data.id;
        this.showOrHidePop2 = false;
        this.depTextColor = '#606266';
      },
      initData() {
        var _this = this;
        this.getRequest("/Goodsloyee/basic/basicdata").then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.nations = data.nations;
            _this.politics = data.politics;
            _this.deps = data.deps;
            _this.positions = data.positions;
            _this.joblevels = data.joblevels;
            _this.Goods.workID = data.workID;
          }
        })
      },
      showEditGoodsView(row) {
        this.dialogTitle = "编辑员工";
        this.goods = row;
        this.dialogVisible = true;
      },
      showAddGoodsView() {
        this.dialogTitle = "添加商品";
        this.dialogVisible = true;
        var _this = this;
        this.getRequest("http://localhost:8080/goods/getNewGoodsId").then(resp => {
          if (resp && resp.status == 200) {
            _this.goods.id = resp.data.data;
          }
        })
      },
      emptyGoodsData() {
        this.goods = {
          name: '',
          id: '',
          owner: 'lesliu',
          categories: '',
          buyday: '',
          exhibitdate: '',
          summary: '',
          originalcost: '',
          price: '',
          usetime: '',
          isline: '2',
          picture: '',
          adv: '',
          imgs: [],
          num: '',
          old: '',
          issale: '1'
        }
      }
    }
  };
</script>

<style scoped>

</style>
