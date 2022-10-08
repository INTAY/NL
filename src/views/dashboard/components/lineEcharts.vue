<template>
  <div>
    <div class="block">
      <p class="time_pick">{{ $t("home_date_picker.title") }}</p>
      <el-date-picker
        style="float: left"
        v-model="timePicker"
        type="datetimerange"
        size="small"
        align="right"
        :clearable="false"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :default-time="['00:00:00', '23:59:59']"
        @change="getData1()"
      >
      </el-date-picker>
    </div>
    <!-- 分割线 -->
    <el-divider content-position="right" style="margin: 20px 0">
      <svg-icon icon-class="groupManage" class="divider-icon" />
    </el-divider>

    <div class="block">
      <el-radio-group
        style="float: left"
        v-model="echartsType"
        size="small"
        @change="changeType()"
      >
        <el-radio-button label="line"
          ><i class="el-icon-data-line" style="font-size: 14px">&nbsp;</i
          >{{ $t("home_echarts.type1") }}</el-radio-button
        >
        <el-radio-button label="bar"
          ><i class="el-icon-data-analysis" style="font-size: 14px">&nbsp;</i
          >{{ $t("home_echarts.type2") }}</el-radio-button
        >
      </el-radio-group>
      <el-radio-group
        v-model="radio"
        size="small"
        style="float: right"
        @change="getData()"
      >
        <el-radio-button
          :key="radioName"
          :label="i + 1"
          v-for="(radioName, i) in radios"
          >{{ radioName }}</el-radio-button
        >
      </el-radio-group>
      <el-button
        style="float: right; margin-right: 20px"
        @click="saveAsImage()"
        size="small"
        type="primary"
        >{{ $t("home_buttons.button1")
        }}<i class="el-icon-download el-icon--right"></i
      ></el-button>
    </div>
    <div id="lineChart" class="lineChart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getEcharts } from "@/api/index";
import moment from "moment";

export default {
  name: "lineEcharts",
  data() {
    return {
      myChart: {},
      echartsType: "line",
      option: {},
      timePicker: [],
      timePicker1: [],
      timePicker2: [],
      timePicker3: [],
      timePicker4: [],
      startPlaceholder: this.$t("home_date_picker.start_date_placeholder"),
      endPlaceholder: this.$t("home_date_picker.end_date_placeholder"),
      heightData: [],
      serialNumber: [],
      radio: "1",
      radios: [
        this.$t("home_buttons.button2"),
        this.$t("home_buttons.button3"),
        this.$t("home_buttons.button4"),
        this.$t("home_buttons.button5"),
      ],
      nowDate: "",
      lastDate: "",
      nowDate2: "",
      lastDate2: "",
      nowDate3: "",
      lastDate3: "",
      nowDate4: "",
      lastDate4: "",
      x_name:"鉴权次数",
      y_name:"时间",
    };
  },
  mounted() {
    this.formatDate();
    this.getData();
  },
  methods: {
    changeType() {
      console.log(this.echartsType);
      this.drawMyCharts();
    },
    formatDate() {
      var date1 = new Date();
      var date = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(date);
      var newdate = moment().subtract(12, "days").format("YYYY-MM-DD 00:00:00"); //12天
      var newweek = moment()
        .subtract(12, "weeks")
        .format("YYYY-MM-DD 00:00:00"); //12星期
      var year = date1.getFullYear(); // 年
      var month = date1.getMonth() + 1; // 月
      var day = date1.getDate(); // 日
      var hour = date1.getHours();
      var minute = date1.getMinutes();
      var second = date1.getSeconds();
      var newMonth = month - 12 == 0 ? 12 : month;
      this.nowDate = `${year}-${month}-${day} 23:59:59`;
      this.lastDate = `${year - 1}-${newMonth}-${day} 00:00:00`;
      this.nowDate2 = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      this.lastDate2 = `${year}-${month}-${
        day - 1
      } ${hour}:${minute}:${second}`;
      this.timePicker1 = [this.lastDate, this.nowDate];
      this.timePicker2 = [newweek, date];
      this.timePicker3 = [newdate, date];
      this.timePicker4 = [this.lastDate2, this.nowDate2];
    },
    //调用图片下载
    //base64转blob
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    saveAsImage() {
      let myChart = this.$echarts.init(document.getElementById("lineChart"));
      let content = myChart.getDataURL();
      let aLink = document.createElement("a");
      let blob = this.base64ToBlob(content);
      let token = window.localStorage.getItem("token");
      let language = window.localStorage.getItem('language')
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true);
      aLink.download = "line.png";
      aLink.href = URL.createObjectURL(blob);
      aLink.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      if (language == 'en') {
        language = 'en_US'
      } else if (language == 'zh') {
        language = 'zh_CN'
      }
      window.location.href =
        "service/555/api/v1/statistics/gnssAuthCount/export?queryTimeStart=" +
        this.timePicker[0] + "&queryTimeEnd=" + this.timePicker[1] + "&timeDimension=" + this.radio + "&access-token=" + token + "&lang=" + language;
    },
    getData() {
      if (this.radio == 1) {
        this.timePicker = this.timePicker1;
      } else if (this.radio == 2) {
        this.timePicker = this.timePicker2;
      } else if (this.radio == 3) {
        this.timePicker = this.timePicker3;
      } else if (this.radio == 4) {
        this.timePicker = this.timePicker4;
      }
      console.log(this.timePicker);
      var param = {
        queryTimeStart: this.timePicker[0],
        queryTimeEnd: this.timePicker[1],
        timeDimension: this.radio,
      };
      (this.heightData = []),
        (this.serialNumber = []),
        getEcharts(param).then((res) => {
          if (res.code == 200) {
            res.data.forEach((item) => {
              this.heightData.push(item.authCount * 1);
              if (this.radio == 1) {
                this.serialNumber.push(item.authYear + "." + item.authMonth);
              } else if (this.radio == 2) {
                let language = window.localStorage.getItem("language");
                if (language == "en") {
                  var x, y;
                  switch (item.authWeekMonth) {
                    case 1:
                      x = "Jan";
                      break;
                    case 2:
                      x = "Feb";
                      break;
                    case 3:
                      x = "Mar";
                      break;
                    case 4:
                      x = "Apr";
                      break;
                    case 5:
                      x = "May";
                      break;
                    case 6:
                      x = "Jun";
                      break;
                    case 7:
                      x = "Jul";
                      break;
                    case 8:
                      x = "Aug";
                      break;
                    case 9:
                      x = "Sep";
                      break;
                    case 10:
                      x = "Oct";
                      break;
                    case 11:
                      x = "Nov";
                      break;
                    case 12:
                      x = "Dec";
                      break;
                  }
                  switch (item.authWeek) {
                    case 1:
                      y = "1st";
                      break;
                    case 2:
                      y = "2nd";
                      break;
                    case 3:
                      y = "3rd";
                      break;
                    case 4:
                      y = "4th";
                      break;
                    case 5:
                      y = "5th";
                      break;
                  }
                  this.serialNumber.push(y + " WK of " + x);
                } else {
                  this.serialNumber.push(
                    item.authWeekMonth + "月" + item.authWeek + "周"
                  );
                }
              } else if (this.radio == 3) {
                if (item.authDay < 10) {
                  this.serialNumber.push(
                    item.authYear + "-" + item.authMonth + "-0" + item.authDay
                  );
                } else {
                  this.serialNumber.push(
                    item.authYear + "-" + item.authMonth + "-" + item.authDay
                  );
                }
              } else if (this.radio == 4) {
                this.serialNumber.push(item.authHour + ":00");
              }
            });
            // console.log(this.heightData)
            // console.log(this.serialNumber)
            // this.myChart.setOption(this.option);
            this.drawMyCharts();
          } else {
            this.$message.error(res.message);
          }
        });
    },
    getData1() {
      if (this.timePicker == null) {
        this.timePicker = this.timePicker1;
        this.radio = 1;
      }
      var param = {
        queryTimeStart: this.timePicker[0],
        queryTimeEnd: this.timePicker[1],
        timeDimension: this.radio,
      };
      console.log(this.timePicker);
      (this.heightData = []),
        (this.serialNumber = []),
        getEcharts(param).then((res) => {
          if (res.code == 200) {
            res.data.forEach((item) => {
              this.heightData.push(item.authCount * 1);
              if (this.radio == 1) {
                this.serialNumber.push(item.authYear + "." + item.authMonth);
              } else if (this.radio == 2) {
                this.serialNumber.push(
                  item.authWeekMonth + "月" + item.authWeek + "周"
                );
              } else if (this.radio == 3) {
                if (item.authDay < 10) {
                  this.serialNumber.push(
                    item.authYear + "-" + item.authMonth + "-0" + item.authDay
                  );
                } else {
                  this.serialNumber.push(
                    item.authYear + "-" + item.authMonth + "-" + item.authDay
                  );
                }
              } else if (this.radio == 4) {
                this.serialNumber.push(item.authHour + ":00");
              }
            });
            // console.log(this.heightData)
            // console.log(this.serialNumber)
            // this.myChart.setOption(this.option);
            this.drawMyCharts();
          } else {
            this.$message.error(res.message);
          }
        });
    },
    drawMyCharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("lineChart"));
      // this.myChart.showLoading({
      //     text: 'loading',
      //     color: '#c23531',
      //     textColor: '#000',
      //     maskColor: 'rgba(255, 255, 255, 0.2)',
      //     zlevel: 0,
      // });
      // 指定图表的配置项和数据
      this.option = {
        color: "#1eb5e1",
        backgroundColor: "#ffffff",
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [this.$t("home_echarts.name")],
          right: 30,
          top: 0,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        //   right: 20,
        // },
        grid: {
          top: 30,
          left: 90,
          right: 50,
          bottom: 30,
          // containLabel: true,
        },
        xAxis: {
          name:this.$t("home_echarts.x_name"),
          type: "category",
          splitLine: {
            show: false, //轴线
          },
          boundaryGap: true,
          nameTextStyle: {
            padding: [26, 0, 0, -5], // 四个数字分别为上右下左与原位置距离
          },
          // boundaryGap: false,
          data: this.serialNumber,
          // axisLabel: {
          //   interval: 0,
          //   formatter: function (value, index) {
          //     if (index % 2 != 0) {
          //       return "\n\n" + value;
          //     } else {
          //       return value;
          //     }
          //   },
          // },
        },
        yAxis: {
          name:this.$t("home_echarts.y_name"),
          nameTextStyle: {
            padding: [0, 0, 0, -50]    // 四个数字分别为上右下左与原位置距离
          },
          type: "value",
          splitLine: {
            show: true,
          },
        },
        series: [
          {
            name: this.$t("home_echarts.name"),
            type: this.echartsType,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#1275f0",
                },
                {
                  offset: 1,
                  color: "#80b8fd",
                },
              ]),
            },
            symbol: "circle", //拐点设置为实心
            symbolSize: 6, //拐点大小
            lineStyle: {
              color: "#1275f0",
            },
            itemStyle: {
              normal: {
                color: "#1275f0",
                borderColor: "white", //拐点边框颜色
                borderWidth: 1, //拐点边框大小
              },
            },
            smooth: false,
            stack: "总量",
            data: this.heightData,
          },
        ],

        // 异步加载数据
        //  $.get('data.json').done(function (data) {
        //        // 填入数据
        //        myChart.setOption({ xAxis: { data: data.categories }, series: [{
        //             // 根据名字对应到相应的系列
        //             name: '销量',
        //             data: data.data
        //        }]
        //        });
      };
      // 使用刚指定的配置项和数据显示图表。
      // this.myChart.hideLoading();
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 0;
  margin: 0;
  position: relative;
  box-shadow: none;
  .el-divider--horizontal {
    margin: 20px 0;
  }
  .block {
    overflow: hidden;
    .time_pick {
      float: left;
      margin: 0 10px 0 0;
      font-size: 16px;
      line-height: 32px;
      font-weight: 600;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 400px;
    }
  }
  .lineChart {
    margin-top: 20px;
    width: 100%;
    height: calc(100vh - 320px);
  }
}
</style>
