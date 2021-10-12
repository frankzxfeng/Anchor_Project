<template>
  <div class="external-link-btn">
    <el-card shadow="hover">
      <div class="patient-btn">
        <el-button type="primary" @click="btnPatient">
          <el-link target="_blank" :href="externalLink">查看患者信息</el-link>
        </el-button>
      </div>
    </el-card>
    <el-card shadow="hover">
      <div class="patient-btn">
        <el-button type="primary" @click="btnShoufei"
          ><el-link target="_blank" :href="shoufeiexteranLink"
            >查看收费清单</el-link
          ></el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ExternalLinkBtn",
  props:{
    acceptTimeData:{
      type:Array,
      default:null,
    }
  },
  data() {
    return {
      // externalLink: "http://172.16.100.139/Web/PR/Medical/AddPatientRecord/?taskCode=20210721190056260101&PatientOrder=1&state=look",
      externalLink: "",
      shoufeiexteranLink: "",
      exexternalBase: exteranBase,
      shoufeiexteranBase: shoufeiexteranBase,
      taskCode: "",
      alarmeventType:"",
    };
  },
  methods: {
    btnPatient() {
      // this.exexternalBase = localStorage.getItem("exteranLink");
      console.log(this.exexternalBase);
      this.taskCode = sessionStorage.getItem("getevtCode");
      // console.log(this.taskCode);
      this.externalLink =
        this.exexternalBase +
        "/?taskCode=" +
        this.taskCode +
        "&PatientOrder=1&state=look";
      console.log(this.externalLink);
    },
    btnShoufei() {
      // this.shoufeiexteranBase = localStorage.getItem("shoufeiexteranLink");
      console.log(this.shoufeiexteranBase);
      this.taskCode = sessionStorage.getItem("getevtCode");
      // console.log(this.taskCode);
      this.shoufeiexteranLink =
        this.shoufeiexteranBase +
        "/?taskCode=" +
        this.taskCode +
        "&PatientOrder=1&AlarmeventType="+
        this.alarmeventType +
        "&ChargeType=已收&SubmitLogo=true&MedicalStateCode=2&SubmitReturnTime=null&IsYB=0";
      console.log(this.shoufeiexteranLink);
    },
  },
  created(){
    setTimeout(()=>{
    // console.log(this.acceptTimeData)
    this.alarmeventType = this.acceptTimeData[0].eventType
    // console.log(this.alarmeventType)
    },500)
  }
};
</script>

<style lang="less" scoped>
.external-link-btn {
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  border: 1px solid rgb(0, 150, 255);
  color: #ffffff;
}
</style>