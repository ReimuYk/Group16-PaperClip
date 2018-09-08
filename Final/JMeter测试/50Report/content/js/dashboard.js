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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7106666666666667, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.68, 500, 1500, "front-end view note"], "isController": false}, {"data": [0.97, 500, 1500, "star note"], "isController": false}, {"data": [0.94, 500, 1500, "get paper keywords"], "isController": false}, {"data": [0.89, 500, 1500, "if star paper"], "isController": false}, {"data": [0.27, 500, 1500, "user page"], "isController": false}, {"data": [0.87, 500, 1500, "Navbar-recentMessage"], "isController": false}, {"data": [0.73, 500, 1500, "front-end view doc pdf"], "isController": false}, {"data": [0.97, 500, 1500, "user follow"], "isController": false}, {"data": [0.87, 500, 1500, "user fans"], "isController": false}, {"data": [0.23, 500, 1500, "check access to paper"], "isController": false}, {"data": [0.91, 500, 1500, "Navbar-unreadMessage"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost:8080/service/getKeywords"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.91, 500, 1500, "assist doc"], "isController": false}, {"data": [0.0, 500, 1500, "front-end view paper"], "isController": false}, {"data": [0.81, 500, 1500, "get note list for paper"], "isController": false}, {"data": [0.14, 500, 1500, "get paperdetail (page1)"], "isController": false}, {"data": [0.63, 500, 1500, "front-end get all versions of a doc"], "isController": false}, {"data": [0.51, 500, 1500, "user note"], "isController": false}, {"data": [0.64, 500, 1500, "user doc"], "isController": false}, {"data": [0.77, 500, 1500, "check access to doc"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost:8080/service/getNoteList"], "isController": false}, {"data": [0.85, 500, 1500, "star note news"], "isController": false}, {"data": [0.0, 500, 1500, "star paper"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "front-end sockjs"], "isController": false}, {"data": [0.92, 500, 1500, "get note detail"], "isController": false}, {"data": [0.91, 500, 1500, "star paper news"], "isController": false}, {"data": [0.95, 500, 1500, "back-end get all versions of a doc"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1450, 0, 0.0, 1933.0979310344858, 2, 25802, 6792.400000000011, 14961.700000000003, 22622.19, 14.688006482982171, 2113.7967646025377, 11.53782082531402], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["front-end view note", 50, 0, 0.0, 646.74, 222, 1376, 968.8, 1037.9499999999998, 1376.0, 1.9611688566385566, 5.521839453814473, 6.239734506766032], "isController": false}, {"data": ["star note", 50, 0, 0.0, 140.14000000000004, 9, 583, 334.3999999999999, 536.65, 583.0, 2.281646436068267, 0.9826231233458063, 1.0138175082139271], "isController": false}, {"data": ["get paper keywords", 50, 0, 0.0, 188.38, 7, 998, 663.5, 891.6499999999996, 998.0, 1.5959653994701395, 0.41145982955089533, 0.7075862220307063], "isController": false}, {"data": ["if star paper", 50, 0, 0.0, 255.5000000000001, 10, 3078, 584.9, 658.6999999999999, 3078.0, 1.8164644336263895, 0.49491560252125266, 0.8319549017292741], "isController": false}, {"data": ["user page", 50, 0, 0.0, 9233.92, 42, 17419, 17293.8, 17334.9, 17419.0, 2.7502750275027505, 21.81687895352035, 1.197873693619362], "isController": false}, {"data": ["Navbar-recentMessage", 50, 0, 0.0, 323.47999999999996, 10, 1034, 836.4, 915.6999999999999, 1034.0, 33.04692663582287, 7.93900776602776, 14.458030403172506], "isController": false}, {"data": ["front-end view doc pdf", 50, 0, 0.0, 624.1999999999998, 241, 1392, 1021.6, 1208.599999999999, 1392.0, 1.932890057213546, 5.44214256030617, 5.851522634142571], "isController": false}, {"data": ["user follow", 50, 0, 0.0, 135.83999999999992, 8, 1417, 455.9999999999999, 813.8999999999976, 1417.0, 2.289901534234028, 0.5501130638882528, 1.0174855449965652], "isController": false}, {"data": ["user fans", 50, 0, 0.0, 319.56000000000006, 7, 2721, 702.8, 1262.9999999999986, 2721.0, 1.2786742705163285, 0.30718151420607115, 0.5681609307470015], "isController": false}, {"data": ["check access to paper", 50, 0, 0.0, 4594.92, 30, 21782, 11256.2, 14636.5, 21782.0, 1.2749898000815993, 9.704365724449204, 0.5876906109751122], "isController": false}, {"data": ["Navbar-unreadMessage", 50, 0, 0.0, 197.83999999999997, 9, 921, 815.9999999999998, 897.7499999999999, 921.0, 39.494470774091624, 9.487929502369669, 17.587381516587676], "isController": false}, {"data": ["http://localhost:8080/service/getKeywords", 50, 0, 0.0, 26.320000000000004, 6, 164, 71.39999999999996, 96.84999999999994, 164.0, 2.0203652820429934, 0.48930721674478744, 0.9036399406012606], "isController": false}, {"data": ["Test", 50, 0, 0.0, 56059.840000000004, 43897, 68096, 67339.9, 67878.7, 68096.0, 0.7247532215280698, 3024.743315623686, 16.51007656111844], "isController": true}, {"data": ["assist doc", 50, 0, 0.0, 257.46, 7, 2057, 695.4999999999999, 1210.9499999999962, 2057.0, 2.2236057991639244, 0.5341865494085208, 1.001056907631415], "isController": false}, {"data": ["front-end view paper", 50, 0, 0.0, 15673.900000000001, 2791, 19925, 19113.5, 19579.199999999997, 19925.0, 0.958625714176157, 1798.9408009677327, 2.5491580270524175], "isController": false}, {"data": ["get note list for paper", 50, 0, 0.0, 478.6200000000002, 9, 3954, 1640.799999999999, 2167.2999999999975, 3954.0, 1.4236496682896274, 0.6506523874604937, 0.6311884271518464], "isController": false}, {"data": ["get paperdetail (page1)", 50, 0, 0.0, 4333.159999999999, 791, 11945, 10033.099999999999, 11332.999999999996, 11945.0, 1.565386180770796, 3523.8035313155506, 0.7475330492157416], "isController": false}, {"data": ["front-end get all versions of a doc", 50, 0, 0.0, 734.9, 233, 1386, 1231.0, 1335.8499999999997, 1386.0, 1.9707540104844115, 5.548750295613102, 5.860298790942415], "isController": false}, {"data": ["user note", 50, 0, 0.0, 1174.5400000000002, 30, 3742, 2646.7999999999997, 2696.45, 3742.0, 2.2558087074216107, 0.9076105346266637, 1.0023368768328447], "isController": false}, {"data": ["user doc", 50, 0, 0.0, 683.0000000000002, 13, 2076, 1540.8, 1687.7499999999995, 2076.0, 2.2331397945511386, 0.8614162293434569, 0.9879026630192049], "isController": false}, {"data": ["check access to doc", 50, 0, 0.0, 736.0799999999998, 14, 3577, 3265.4999999999995, 3443.5499999999997, 3577.0, 1.9846782836502201, 15.106037639423649, 0.922565295915532], "isController": false}, {"data": ["http://localhost:8080/service/getNoteList", 50, 0, 0.0, 42.519999999999996, 9, 139, 118.6, 131.89999999999998, 139.0, 2.012153406575717, 0.7427675660992394, 0.8999670509879674], "isController": false}, {"data": ["star note news", 50, 0, 0.0, 357.62, 9, 3090, 953.5, 1330.9499999999996, 3090.0, 1.27962327890669, 0.3648925756257358, 0.5623344487382915], "isController": false}, {"data": ["star paper", 50, 0, 0.0, 13698.919999999998, 3784, 25802, 24185.2, 24699.3, 25802.0, 1.07863229425089, 0.3929002399956855, 0.4813817953834538], "isController": false}, {"data": ["front-end sockjs", 150, 0, 0.0, 150.28666666666666, 2, 622, 356.80000000000007, 466.84999999999985, 617.9200000000001, 4.20792773585435, 1.5113747738238843, 1.4711309857772044], "isController": false}, {"data": ["get note detail", 50, 0, 0.0, 215.36, 13, 778, 654.9, 708.6499999999999, 778.0, 2.0771883178929, 16.388285566656972, 0.9615109987121432], "isController": false}, {"data": ["star paper news", 50, 0, 0.0, 312.09999999999997, 8, 5419, 791.0999999999997, 1214.9999999999977, 5419.0, 1.2716498385004706, 0.39739057453139703, 0.5600723409801877], "isController": false}, {"data": ["back-end get all versions of a doc", 50, 0, 0.0, 223.96, 11, 1476, 598.7999999999998, 1412.8999999999999, 1476.0, 1.9992003198720512, 0.5427516493402639, 0.9390774940023989], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1450, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
