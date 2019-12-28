<template id="courseType">
    <div>
        <el-row style="height: 100%;border: 1px solid #DCDFE6;margin-top: 10px">
            <el-col :span="3" style="border-right: 1px solid #DCDFE6; min-height:500px;">
                <div class="grid-content bg-purple">
                    <el-tree :data="courseTypes" :props="defaultProps"  @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="20" style="margin-left: 10px;padding-top: 10px">
                   <!--工具条-->
                   <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                       <el-form :inline="true" :model="filters">
                           <el-form-item>
                               <el-input v-model="filters.name" placeholder="课程信息"></el-input>
                           </el-form-item>
                           <el-form-item>
                               <el-button type="primary" v-on:click="getCourseType">查询</el-button>
                           </el-form-item>
                           <el-form-item>
                               <el-button type="primary" @click="courseTypeAdd">新增</el-button>
                           </el-form-item>
                       </el-form>
                   </el-col>
                   <el-col :span="24" class="toolbar">
                       <el-table :data="courseDetail"  border="true" style="width: 100%;">
                           <el-table-column prop="id" label="#ID" width="60" >
                           </el-table-column>
                           <el-table-column prop="logo" label="LOGO" min-width="30">
                           </el-table-column>
                           <el-table-column prop="createTime" label="上传时间" width="120"  :formatter="dateFormat">
                           </el-table-column>
                           <el-table-column prop="updateTime" label="更新时间" width="120" :formatter="dateFormat">
                           </el-table-column>
                           <el-table-column prop="name" label="名称" width="60" >
                           </el-table-column>
                           <el-table-column prop="pid" label="父级ID" width="50" >
                           </el-table-column>
                           <el-table-column prop="sortIndex" label="热门排序" width="60" >
                           </el-table-column>
                           <el-table-column prop="totalCount" label="总数" width="60" >
                           </el-table-column>
                           <el-table-column prop="path" label="地址" width="100" >
                           </el-table-column>
                           <el-table-column prop="description" label="描述" min-width="50" >
                           </el-table-column>
                           <el-table-column label="操作" width="150">
                               <template scope="scope">
                                   <el-button size="small" @click="handleEdit">编辑</el-button>
                                   <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                               </template>
                           </el-table-column>
                       </el-table>
                   </el-col>
            </el-col>
        </el-row>
       <!--编辑界面-->
       <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
           <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
               <el-row>
                   <el-col :span="12">
                       <div class="grid-content bg-purple">
                           <el-form-item label="创建日期">
                               <el-date-picker type="date" placeholder="选择日期" v-model="editForm.createTime"></el-date-picker>
                           </el-form-item>
                           <el-form-item label="更新日期">
                               <el-date-picker type="date" placeholder="选择日期" v-model="editForm.updateTime"></el-date-picker>
                           </el-form-item>
                           <el-form-item label="课程名称">
                               <el-input type="text" v-model="editForm.name" style="width: 220px"></el-input>
                           </el-form-item>
                           <el-form-item label="归属分类">
                               <el-select v-model="editForm.pid" placeholder="请选择活动区域" style="width: 220px">
                                   <el-option label="区域一" value="shanghai"></el-option>
                                   <el-option label="区域二" value="beijing"></el-option>
                               </el-select>
                           </el-form-item>
                           <el-form-item label="热门排序">
                               <el-input type="text" v-model="editForm.sortIndex" style="width: 220px"></el-input>
                           </el-form-item>
                           <el-form-item label="课程总数">
                               <el-input type="text" v-model="editForm.totalCount" style="width: 220px"></el-input>
                           </el-form-item>
                           <el-form-item label="存储路径">
                               <el-input type="text" v-model="editForm.path" style="width: 220px"></el-input>
                           </el-form-item>
                       </div>
                   </el-col>
                   <el-col :span="12">
                       <div class="grid-content bg-purple-light">
                           <el-form-item label="课程描述" >
                               <el-input type="textarea" v-model="editForm.description" ></el-input>
                           </el-form-item>
                           <el-upload
                               class="avatar-uploader"
                               action="https://jsonplaceholder.typicode.com/posts/"
                               :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload" style="padding-left: 100px;padding-top: 10px">
                           <img v-if="imageUrl" :src="imageUrl" class="avatar">
                           <i v-else class="el-icon-plus avatar-uploader-icon" style="padding: 40px;"></i>
                       </el-upload>
                       </div>
                   </el-col>
               </el-row>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click.native="editFormVisible = false">取消</el-button>
               <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
           </div>
       </el-dialog>
   </div>
</template>
<style>
    .el-row {
        margin-bottom: 20px;
        height: 100%;
    }
    :last-child {
        margin-bottom: 0;
    }
    #courseType el-col {
        border: 1px solid red;
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin-right: 30px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<script>
    export default {
        data() {
            return {
                courseTypes:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                //查询课程
                filters: {},
                //编辑模态框
                editFormVisible: false,//编辑界面是否显示
                //课程详情
                editForm:{
                    "id":"",
                    "name":"",
                    "logo":"",
                    "createTime":"",
                    "updateTime":"",
                    "pid":"",
                    "sortIndex":"",
                    "totalCount":"",
                    "path":"",
                    "description":""
                },
                courseDetail:[],
                //编辑模态框
                //文件上传
                imageUrl: ''
            }
        },
        methods:{
            getTreeData(){
                // 发送一个异步请求: get请求 /product/courseType/treeData
                this.$http.get("/course/courseType/menu").then(res=> {
                        this.courseTypes = res.data;
                    });
            },
            /*处理时间*/
            dateFormat(row,column){
                var t=new Date(row.createTime);
                return t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日";
            },
            dateFormat(row,column){
                var t=new Date(row.updateTime);
                return t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日";
            },
            /*查询*/
            getCourseType(){

            },
            /*新增*/
            courseTypeAdd(){

            },
            //显示编辑界面
            handleEdit(){
                this.editFormVisible = true;
                this.editForm = this.courseDetail;
            },
            /*详细课程*/
            handleNodeClick(data){
                if(data.children.length == 0){
                    this.courseDetail=[];
                    let id = data.id;
                    this.$http.get("/course/courseType/"+id).then(res => {
                    let course = res.data;
                    this.courseDetail.push(course);
                    });
                }
            },
            //附件上传
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
         },
        mounted(){
            //对courseTypes数据赋值
           this.getTreeData();
        }
    }
</script>