<template id="courseType">
    <el-row style="height: 100%;border: 1px solid #DCDFE6;margin-top: 10px">
        <el-col :span="3" style="border-right: 1px solid #DCDFE6; min-height:500px;">
            <div class="grid-content bg-purple">
                <el-tree :data="courseTypes" :props="defaultProps"  @node-click="handleNodeClick">
                </el-tree>
            </div>
        </el-col>
        <el-col :span="20" style="margin-left: 10px;padding-top: 10px">
           <section>
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
                               <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                               <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                           </template>
                       </el-table-column>
                   </el-table>
               </el-col>
           </section>
        </el-col>
    </el-row>
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
                //课程详情
                // courseDetail:{
                //     "id":"",
                //     "name":"",
                //     "logo":"",
                //     "createTime":"",
                //     "updateTime":"",
                //     "pid":"",
                //     "sortIndex":"",
                //     "totalCount":"",
                //     "path":"",
                //     "description":""
                // }
                courseDetail:[]
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
            /*详细课程*/
            handleNodeClick(data){
                if(data.children.length == 0){
                    this.courseDetail=[];
                    let id = data.id;
                    this.$http.get("/course/courseType/"+id).then(res => {
                    let course = res.data;
                    // this.courseDetail = res.data;
                    // let date = new Date(course.createTime);

                    this.courseDetail.push(course);
                    });
                }
            }
         },
        mounted(){
            //对courseTypes数据赋值
           this.getTreeData();
        }
    }
</script>