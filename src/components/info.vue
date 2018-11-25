<template>
    <div>



        <van-tabs>
            <van-tab title="本科">
                <table style="width: 100%">
                    <!-- <thead>
                        <tr colspan="5">历年投档线</tr>
                        <tr>
                            <td>学校</td>
                            <td>2015</td>
                            <td>2016</td>
                            <td>2017</td>
                            <td>2018</td>
                        </tr>
                    </thead> -->
                    <tbody>
                        <template v-for="(school,key) in ben_data">
                            <tr>
                                <td colspan="4" style="text-align: center; font-weight: bold;"> ↓↓{{ school.school }}↓↓ 
                                    <br />
                                    <span :style="key <= 3 ? 'color: red': '' ">
                                    {{ school.xz }}
                                    </span></td>
                               
                            </tr>
                            <tr>
                                <td>2015</td>
                                <td>2016</td>
                                <td>2017</td>
                                <td>2018</td>
                            </tr>
                            <tr>
                                <td v-for="(l, key) in school.line" :key="key">
                                    <template v-if="l">
                                        {{l}}
                                    </template>
                                    <template v-else>
                                        <span style="color: blue">未招</span>
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                
            </van-tab>
            <van-tab title="专科">
                <p style="font-weight:bold">数据量比较大，排版太麻烦，请下载表格食用。</p>
                <a href="http://132.232.7.38/files/2018zk.xlsx" download="2018专科投档线">点我下载excel表格</a>
            </van-tab>
            <van-tab title="其他资料">
                <!-- <p style="font-weight:bold">数据量比较大，排版太麻烦，请下载表格食用。</p> -->
                <p style="font-weight: bold">都是excel表格，点击文字下载。</p>
                <p><a href="http://132.232.7.38/files/ttlx.xlsx" download="天天乐学2545题库.xlsx">天天乐学2545题库</a></p>
                <p><a href="http://132.232.7.38/files/2018mf.xlsx" download="2018技能申请满分情况.xlsx">2018技能申请满分情况</a></p>
                <p><a href="http://132.232.7.38/files/2018bktjt.xlsx" download="历年投档线走势图表.xlsx">历年投档线走势图表</a></p>
            </van-tab>
        </van-tabs>


    </div>
</template>
<script>
export default {
    data() {
        return {
            ben_data: [
                {'school':'湖北理工学院','line':[610,632,628,645,], 'xz': '公立二本'},
                {'school':'武汉商学院','line':[612,632,634,644,], 'xz': '公立二本'},
                {'school':'湖北文理学院','line':[598,622,621,639,], 'xz': '公立二本'},
                {'school':'荆楚理工学院','line':[599,621,622,638,], 'xz': '公立二本'},
                {'school':'武昌首义学院','line':[,598,615,635,], 'xz': '民办二本'},
                {'school':'武汉华夏理工学院','line':[,604,600,627,], 'xz': '民办二本'},
                {'school':'武昌理工学院','line':[,599,600,627,], 'xz': '民办二本'},
                {'school':'武汉生物工程学院','line':[572,596,593,623,], 'xz': '民办二本'},
                {'school':'武汉工商学院','line':[569,592,594,622,], 'xz': '民办二本'},
                {'school':'湖北工业大学工程技术学院','line':[,577,589,618,], 'xz': '民办二本'},
                {'school':'湖北商贸学院','line':[570,598,591,618,], 'xz': '民办二本'},
                {'school':'武汉工程科技学院','line':[567,587,585,618,], 'xz': '民办二本'},
                {'school':'湖北大学知行学院','line':[569,594,585,616,], 'xz': '民办二本'},
                {'school':'武昌工学院','line':[568,582,585,615,], 'xz': '民办二本'},
                {'school':'湖北民族学院科技学院','line':[,,584,614,], 'xz': '民办二本'},
                {'school':'武汉科技大学城市学院','line':[,580,589,,], 'xz': '民办二本（不招了）'},
                {'school':'汉口学院','line':[586,600,596,,], 'xz': '民办二本（不招了）'},
                {'school':'湖北汽车工业学院','line':[598,621,,,], 'xz': '公立一本（不招了）'},
                {'school':'武汉东湖学院','line':[591,,,,], 'xz': '民办二本（不招了）'},
                {'school':'湖北工业大学','line':[621,,,,], 'xz': '公立一本（不招了）'},

            ]
        }
    },
    activated: function() {
        this.$emit("updataTitle",2)
    }
}
</script>

