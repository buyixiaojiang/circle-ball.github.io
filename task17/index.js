/*参考以下示例代码，原始数据包含几个城市的空气质量指数数据
用户可以选择查看不同的时间粒度，以选择要查看的空气质量指数是以天为粒度还是以周或月为粒度
天：显示每天的空气质量指数
周：以自然周（周一到周日）为粒度，统计一周7天的平均数为这一周的空气质量数值，如果数据中缺少一个自然周的几天，则按剩余天进行计算
月：以自然月为粒度，统一一个月所有天的平均数为这一个月的空气质量数值
用户可以通过select切换城市
通过在"aqi-chart-wrap"里添加DOM，来模拟一个柱状图图表，横轴是时间，纵轴是空气质量指数，参考图（点击打开）。天、周、月的数据只根据用户的选择显示一种。
天：每天的数据是一个很细的矩形
周：每周的数据是一个矩形
月：每周的数据是一个很粗的矩形*/

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
// <li class="chart-wrap-item" style="height: 80%" title="日期：2016-12-20，空气质量：80"></li>

    var doc = document,
        chartList = doc.getElementById('chart-wrap-list'),
        li, key, height, value,
        sourceData = chartData.data,
        fragment = doc.createDocumentFragment();
    for (key in sourceData) {
        height = sourceData[key] / chartData.max * 100;
        value = sourceData[key];
        li = doc.createElement('li');
        li.classList.add('chart-wrap-item');
        li.style.height = height + '%';
        li.title = `日期：${key},空气质量: ${value}`;
        fragment.appendChild(li);
    }
    chartList.innerHTML = null;
    chartList.appendChild(fragment);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
    // 确定是否选项发生了变化

    // 设置对应数据
    pageState.nowGraTime = value;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value) {
    // 确定是否选项发生了变化

    // 设置对应数据
    pageState.nowSelectCity = value;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var form = document.getElementById('form-gra-time');
    form.addEventListener('change', function (event) {
        var target = event.target;
        if (target.name = 'gra-time') {
            console.log(target.value);
            graTimeChange(target.value);
        }
    }, false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var doc = document,
        citySelect = doc.getElementById('city-select'),
        fragment = doc.createDocumentFragment(),
        key,option;
    for (key in aqiSourceData) {
        option = doc.createElement('option');
        option.innerText = key;
        option.value = key;  // this can be omitted
        fragment.appendChild(option);
    }
    citySelect.appendChild(fragment);

    // init the default data
    pageState.nowSelectCity = citySelect.options[citySelect.selectedIndex].value;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener('change', function () {
        console.log('选中了' + citySelect.value + '城市');
        citySelectChange(citySelect.value);
    }, false);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var nowGraTime = pageState.nowGraTime,
        sourceData = aqiSourceData[pageState.nowSelectCity],
        maxValue;
    console.log(sourceData);
    if (nowGraTime === "week") {
        console.log( sourceData = handleDataInWeek(sourceData) );

    } else if (nowGraTime === "month") {
        console.log( sourceData = handleDataInMonth(sourceData) )
    }

    maxValue = getMaxValue(sourceData);
    // console.log(maxValue);
    // 处理好的数据存到 chartData 中
    chartData = {
        data: sourceData,
        max: maxValue
    }
}

function handleDataInWeek(data) {
    var start, end, date, day,
        days = 0,
        sumValue = 0,
        propertyLength = Object.keys(data).length,
        propertyCount = 0,
        returnData = {};

    for (var key in data) {
        date = new Date(Date.parse(key.replace(/-/g, '/')));
        day = date.getDay();
        days++;
        propertyCount++;
        sumValue += data[key];
        if ( day === 1 || propertyCount === 1) {
            start = key;
        } else if (day === 0 || propertyCount === propertyLength) {
            end = key;
            returnData[`${start} - ${end}`] = parseInt(sumValue / days);
            sumValue = 0;
            days = 0;
        }
    }

    return returnData;
}

function handleDataInMonth(data) {
    var countProperty = 0,
        sumProperty = Object.keys(data).length,
        date, month,
        returnData = {},
        days = 0,
        sumValue = 0,
        monthStart = 0;

    for (var key in data) {
        date = new Date(Date.parse(key.replace(/-/g, '/')));
        month = date.getMonth();
        countProperty++;

        if ( monthStart != month && countProperty != 1){
            console.log('days' + days);
            returnData[`2016-${ month < 10 ? '0' + month : month}`] = parseInt(sumValue / days);
            sumValue = 0;
            days = 0;
        }

        // don't use the else if. because if the last day is the 04-01
        if ( countProperty === sumProperty ) {
            month++;
            days++;
            sumValue += data[key];
            console.log('days' + days);
            returnData[`2016-${ month < 10 ? '0' + month : month}`] = parseInt(sumValue / days);
        }
        monthStart = month;
        days++;
        sumValue += data[key];
    }

    return returnData;
}

function getMaxValue (data) {
    var max = 0;
    for (var key in data) {
        if (max < data[key]) {
            max = data[key];
        }
    }
    return max;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

window.onload = init;

// init();