<template>
  <div>
    <h1>学员信息</h1>
    <template>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in imgs" :key="item">
          <h3 class="medium"><img :src="item" alt="" width="200px"></h3>
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
</template>
  </div>
</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<script>
import img1 from "./../../../assets/img/img1.jpg"
import img2 from "./../../../assets/img/img2.jpg"
import img3 from "./../../../assets/img/img3.jpg"
import img4 from "./../../../assets/img/img4.jpg"
import img5 from "./../../../assets/img/img5.jpg"
import img6 from "./../../../assets/img/img6.jpg"
  export default {
    data () {
      return {
        imgs:[
          img1,
          img2,
          img3,
          img4,
          img5,
          img6
        ]
      }
    }
  }
</script>