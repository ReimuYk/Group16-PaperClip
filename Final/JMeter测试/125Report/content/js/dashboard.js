/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.558, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.216, 500, 1500, "front-end view note"], "isController": false}, {"data": [0.64, 500, 1500, "star note"], "isController": false}, {"data": [0.724, 500, 1500, "get paper keywords"], "isController": false}, {"data": [0.836, 500, 1500, "if star paper"], "isController": false}, {"data": [0.34, 500, 1500, "user page"], "isController": false}, {"data": [0.52, 500, 1500, "Navbar-recentMessage"], "isController": false}, {"data": [0.212, 500, 1500, "front-end view doc pdf"], "isController": false}, {"data": [0.764, 500, 1500, "user follow"], "isController": false}, {"data": [0.496, 500, 1500, "user fans"], "isController": false}, {"data": [0.276, 500, 1500, "check access to paper"], "isController": false}, {"data": [0.92, 500, 1500, "Navbar-unreadMessage"], "isController": false}, {"data": [0.936, 500, 1500, "http://localhost:8080/service/getKeywords"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.756, 500, 1500, "assist doc"], "isController": false}, {"data": [0.08, 500, 1500, "front-end view paper"], "isController": false}, {"data": [0.644, 500, 1500, "get note list for paper"], "isController": false}, {"data": [0.0, 500, 1500, "get paperdetail (page1)"], "isController": false}, {"data": [0.268, 500, 1500, "front-end get all versions of a doc"], "isController": false}, {"data": [0.74, 500, 1500, "user note"], "isController": false}, {"data": [0.716, 500, 1500, "user doc"], "isController": false}, {"data": [0.596, 500, 1500, "check access to doc"], "isController": false}, {"data": [0.9, 500, 1500, "http://localhost:8080/service/getNoteList"], "isController": false}, {"data": [0.472, 500, 1500, "star note news"], "isController": false}, {"data": [0.0, 500, 1500, "star paper"], "isController": false}, {"data": [0.8133333333333334, 500, 1500, "front-end sockjs"], "isController": false}, {"data": [0.812, 500, 1500, "get note detail"], "isController": false}, {"data": [0.484, 500, 1500, "star paper news"], "isController": false}, {"data": [0.952, 500, 1500, "back-end get all versions of a doc"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3625, 0, 0.0, 3213.2206896551734, 1, 56665, 6508.800000000002, 19357.79999999998, 44402.87999999999, 22.589329112504206, 3250.8470207303835, 17.59602241835126], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["front-end view note", 125, 0, 0.0, 8036.336, 473, 21608, 20228.2, 20751.1, 21592.14, 1.7844142125023197, 1270.2741100011062, 5.639794466709969], "isController": false}, {"data": ["star note", 125, 0, 0.0, 1001.2480000000002, 22, 5181, 2271.2000000000007, 4590.999999999998, 5181.0, 5.220732573194671, 2.2483818991980953, 2.3197591023472413], "isController": false}, {"data": ["get paper keywords", 125, 0, 0.0, 932.5759999999996, 6, 9142, 2273.2000000000007, 6257.199999999968, 9110.019999999999, 1.41327574705756, 0.36436015353827717, 0.6265890519180978], "isController": false}, {"data": ["if star paper", 125, 0, 0.0, 459.17599999999993, 9, 4118, 965.6000000000003, 1144.5, 3904.2799999999957, 1.8305898892859234, 0.49876423741286385, 0.838424470776463], "isController": false}, {"data": ["user page", 125, 0, 0.0, 3491.528, 33, 9173, 7810.000000000001, 8327.6, 9075.239999999998, 11.28158844765343, 89.49252242215704, 4.913660593411552], "isController": false}, {"data": ["Navbar-recentMessage", 125, 0, 0.0, 1090.2639999999997, 13, 2756, 2475.8, 2719.1, 2753.92, 44.99640028797696, 10.809682100431965, 19.68592512598992], "isController": false}, {"data": ["front-end view doc pdf", 125, 0, 0.0, 3728.4799999999987, 385, 20332, 10682.600000000002, 13927.7, 20226.96, 1.7225697985282364, 4.850150961710718, 5.214810913513215], "isController": false}, {"data": ["user follow", 125, 0, 0.0, 668.44, 6, 5224, 1875.8000000000002, 2217.8999999999996, 5189.94, 5.297957107739256, 1.2727514145545478, 2.3540727383021105], "isController": false}, {"data": ["user fans", 125, 0, 0.0, 1705.1999999999998, 5, 8253, 4349.000000000001, 6098.399999999991, 8249.36, 2.4365046878350194, 0.585332180866616, 1.0826265946923181], "isController": false}, {"data": ["check access to paper", 125, 0, 0.0, 3060.2960000000003, 16, 9469, 7518.8, 9031.099999999997, 9458.34, 1.3254161806807336, 10.08817745334535, 0.6109340207825257], "isController": false}, {"data": ["Navbar-unreadMessage", 125, 0, 0.0, 241.2320000000001, 11, 1253, 686.600000000001, 861.7, 1233.2399999999996, 54.72854640980736, 13.147678141418565, 24.37130582311734], "isController": false}, {"data": ["http://localhost:8080/service/getKeywords", 125, 0, 0.0, 194.03200000000007, 6, 1404, 953.8, 1045.5, 1362.3999999999992, 2.054535592774609, 0.4975828388751007, 0.918923145987081], "isController": false}, {"data": ["Test", 125, 0, 0.0, 93183.39999999997, 60396, 123972, 117345.8, 119902.19999999997, 123890.36, 1.0030251237733003, 4186.0364844746755, 22.65796924775122], "isController": true}, {"data": ["assist doc", 125, 0, 0.0, 597.7840000000002, 8, 5150, 986.8000000000001, 1973.4999999999989, 4893.899999999995, 6.354209028060187, 1.5264994344753964, 2.860635119077877], "isController": false}, {"data": ["front-end view paper", 125, 0, 0.0, 17057.88, 319, 56665, 46362.600000000006, 51441.899999999994, 56432.56, 1.348392177167945, 1574.1910447544847, 3.3569487368262085], "isController": false}, {"data": ["get note list for paper", 125, 0, 0.0, 987.2480000000002, 9, 5090, 3201.400000000001, 3395.3999999999996, 4954.279999999997, 1.3671810913386344, 0.6248444831508602, 0.6061525541677149], "isController": false}, {"data": ["get paperdetail (page1)", 125, 0, 0.0, 6972.600000000002, 2632, 31019, 14978.800000000001, 20708.5, 30633.679999999993, 1.3954319140860478, 3141.2235312730245, 0.6663732480352318], "isController": false}, {"data": ["front-end get all versions of a doc", 125, 0, 0.0, 3046.7039999999997, 346, 14431, 6341.6, 10942.299999999992, 14427.1, 1.7628227728497088, 4.963461641857874, 5.241987639968127], "isController": false}, {"data": ["user note", 125, 0, 0.0, 516.248, 13, 2441, 1060.4, 1403.2999999999972, 2219.9999999999955, 9.297828027372807, 3.740922995388277, 4.131359133256471], "isController": false}, {"data": ["user doc", 125, 0, 0.0, 549.8159999999999, 9, 2864, 1058.4, 1458.9999999999945, 2741.5399999999977, 8.018474565398678, 3.093063919269998, 3.5472353302007824], "isController": false}, {"data": ["check access to doc", 125, 0, 0.0, 1005.1120000000001, 7, 6554, 2508.2, 3197.6999999999957, 6553.22, 1.9310685761072748, 14.697996564629005, 0.897645158424866], "isController": false}, {"data": ["http://localhost:8080/service/getNoteList", 125, 0, 0.0, 237.89599999999996, 7, 1410, 810.8, 927.6999999999985, 1331.2199999999984, 2.008290222036567, 0.7413415077439671, 0.8982391813405739], "isController": false}, {"data": ["star note news", 125, 0, 0.0, 1835.7680000000014, 8, 9180, 4880.0, 6005.799999999997, 8842.259999999993, 2.420885463066971, 0.6903306203276911, 1.0638656820118526], "isController": false}, {"data": ["star paper", 125, 0, 0.0, 31657.944000000003, 6951, 50346, 45439.0, 46874.0, 50257.34, 2.097596992884951, 0.7640660921348503, 0.9361345954574439], "isController": false}, {"data": ["front-end sockjs", 375, 0, 0.0, 462.0213333333336, 1, 3077, 1281.8000000000002, 1714.4, 2574.88, 4.35246872025813, 1.563171005594373, 1.5216638689964948], "isController": false}, {"data": ["get note detail", 125, 0, 0.0, 494.3359999999999, 12, 3522, 1715.6, 2227.3999999999996, 3257.059999999995, 1.9156500950162447, 15.113805778941643, 0.8867364697633789], "isController": false}, {"data": ["star paper news", 125, 0, 0.0, 2035.8880000000004, 6, 9474, 6152.000000000003, 7793.699999999993, 9473.22, 2.4588390345614415, 0.7683871983004504, 1.0829457076046973], "isController": false}, {"data": ["back-end get all versions of a doc", 125, 0, 0.0, 193.30400000000003, 7, 8654, 371.60000000000014, 601.1999999999998, 6863.639999999965, 1.7885504156591165, 0.4855634917512055, 0.840129638605503], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3625, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
