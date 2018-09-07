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

    var data = {"OkPercent": 98.70689655172414, "KoPercent": 1.293103448275862};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3085833333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.02, 500, 1500, "front-end view note"], "isController": false}, {"data": [0.3325, 500, 1500, "star note"], "isController": false}, {"data": [0.03, 500, 1500, "get paper keywords"], "isController": false}, {"data": [0.4575, 500, 1500, "if star paper"], "isController": false}, {"data": [0.2025, 500, 1500, "user page"], "isController": false}, {"data": [0.185, 500, 1500, "Navbar-recentMessage"], "isController": false}, {"data": [0.0225, 500, 1500, "front-end view doc pdf"], "isController": false}, {"data": [0.3475, 500, 1500, "user follow"], "isController": false}, {"data": [0.3925, 500, 1500, "user fans"], "isController": false}, {"data": [0.0875, 500, 1500, "check access to paper"], "isController": false}, {"data": [0.8425, 500, 1500, "Navbar-unreadMessage"], "isController": false}, {"data": [0.59, 500, 1500, "http://localhost:8080/service/getKeywords"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.4325, 500, 1500, "assist doc"], "isController": false}, {"data": [0.0375, 500, 1500, "front-end view paper"], "isController": false}, {"data": [0.1775, 500, 1500, "get note list for paper"], "isController": false}, {"data": [0.0, 500, 1500, "get paperdetail (page1)"], "isController": false}, {"data": [0.0, 500, 1500, "front-end get all versions of a doc"], "isController": false}, {"data": [0.5075, 500, 1500, "user note"], "isController": false}, {"data": [0.46, 500, 1500, "user doc"], "isController": false}, {"data": [0.3875, 500, 1500, "check access to doc"], "isController": false}, {"data": [0.5, 500, 1500, "http://localhost:8080/service/getNoteList"], "isController": false}, {"data": [0.3925, 500, 1500, "star note news"], "isController": false}, {"data": [0.0, 500, 1500, "star paper"], "isController": false}, {"data": [0.4533333333333333, 500, 1500, "front-end sockjs"], "isController": false}, {"data": [0.335, 500, 1500, "get note detail"], "isController": false}, {"data": [0.425, 500, 1500, "star paper news"], "isController": false}, {"data": [0.7325, 500, 1500, "back-end get all versions of a doc"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 5800, 75, 1.293103448275862, 6354.267068965528, 1, 123349, 15805.800000000007, 27619.649999999983, 93461.01999999996, 14.121611421948879, 1852.7263987813717, 10.34061844136366], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["front-end view note", 200, 0, 0.0, 22634.395, 318, 116080, 100986.4, 110917.5, 115861.52, 0.8751088416621817, 311.05334424211196, 2.5115068266693794], "isController": false}, {"data": ["star note", 200, 0, 0.0, 3354.589999999999, 63, 16472, 11039.800000000001, 12848.45, 16247.420000000002, 4.030470355890532, 1.7357787372536375, 1.7908828241505783], "isController": false}, {"data": ["get paper keywords", 200, 0, 0.0, 3869.0150000000003, 422, 11642, 5907.4, 5960.95, 11613.82, 1.4186610676843197, 0.3657485565123636, 0.6289766843053526], "isController": false}, {"data": ["if star paper", 200, 0, 0.0, 2069.7149999999997, 8, 6126, 4992.0, 5381.6, 6095.710000000001, 1.5187643333383958, 0.41380395410294185, 0.6956059300153394], "isController": false}, {"data": ["user page", 200, 0, 0.0, 3311.485, 44, 11525, 7308.5, 8725.05, 10091.750000000004, 14.949917775452235, 118.59197469726416, 6.511389968605172], "isController": false}, {"data": ["Navbar-recentMessage", 200, 0, 0.0, 2096.5649999999996, 22, 4328, 3509.8, 3912.0999999999995, 4263.700000000001, 45.03490204908804, 10.818931546948885, 19.70276964647602], "isController": false}, {"data": ["front-end view doc pdf", 200, 73, 36.5, 20726.055000000015, 920, 54531, 35164.8, 52502.39999999999, 53153.43, 0.790441975630674, 311.4955636135351, 1.867241626749347], "isController": false}, {"data": ["user follow", 200, 0, 0.0, 3496.7700000000004, 19, 15568, 12137.800000000001, 13793.349999999995, 15379.89, 4.609994468006639, 1.1074791397750323, 2.0483862138115434], "isController": false}, {"data": ["user fans", 200, 0, 0.0, 2378.9650000000006, 5, 15586, 5302.700000000001, 9164.75, 12972.780000000015, 3.1824836102094074, 0.7645419610464006, 1.4140918385207817], "isController": false}, {"data": ["check access to paper", 200, 0, 0.0, 3351.2999999999975, 1037, 11670, 5786.3, 6026.0, 8279.630000000001, 1.3308845058425829, 10.129798670446378, 0.6134545769118156], "isController": false}, {"data": ["Navbar-unreadMessage", 200, 0, 0.0, 372.14999999999975, 7, 1989, 975.5000000000002, 1884.1, 1981.6400000000003, 74.15647015202076, 17.81493325917686, 33.022803114571744], "isController": false}, {"data": ["http://localhost:8080/service/getKeywords", 200, 0, 0.0, 1495.295, 4, 20453, 4686.100000000001, 8145.849999999968, 14445.390000000016, 0.8712053561705297, 0.21099504719755016, 0.3896602081309596], "isController": false}, {"data": ["Test", 200, 75, 37.5, 184273.745, 99800, 273374, 260568.7, 268668.35, 272557.37, 0.7300815501091472, 2777.770772844936, 15.503566904673251], "isController": true}, {"data": ["assist doc", 200, 0, 0.0, 3372.7499999999986, 25, 18378, 12991.400000000001, 15153.0, 17998.84, 4.783430197794838, 1.1491443639233694, 2.153477852718184], "isController": false}, {"data": ["front-end view paper", 200, 1, 0.5, 22427.280000000002, 606, 123349, 94889.6, 112098.84999999999, 122771.54000000002, 1.331433821081923, 571.6950327948794, 3.0766783139387806], "isController": false}, {"data": ["get note list for paper", 200, 0, 0.0, 3672.6849999999995, 518, 13363, 11549.6, 11588.75, 12196.84, 1.4036860796451482, 0.6415284035878216, 0.6223373829676732], "isController": false}, {"data": ["get paperdetail (page1)", 200, 0, 0.0, 16866.350000000006, 4392, 31719, 22075.7, 23473.0, 28492.910000000018, 1.339961677096035, 3016.3558025365473, 0.6398840430663683], "isController": false}, {"data": ["front-end get all versions of a doc", 200, 1, 0.5, 19662.750000000004, 1859, 72821, 68967.7, 70280.09999999999, 71549.72, 0.7244644396629791, 244.4227805522502, 1.9951036108666045], "isController": false}, {"data": ["user note", 200, 0, 0.0, 1392.265, 24, 14744, 1637.1000000000001, 4421.499999999994, 13495.180000000002, 7.502719735904265, 3.0186723937427318, 3.333728007652774], "isController": false}, {"data": ["user doc", 200, 0, 0.0, 2070.6549999999997, 31, 17627, 5557.400000000002, 11669.149999999996, 16217.800000000007, 5.258729490954985, 2.0285138173117376, 2.3263715423853597], "isController": false}, {"data": ["check access to doc", 200, 0, 0.0, 2270.649999999999, 9, 25174, 3034.8, 4953.099999999996, 25142.97, 0.8499715259538805, 6.469412180941939, 0.3951039515176242], "isController": false}, {"data": ["http://localhost:8080/service/getNoteList", 200, 0, 0.0, 1771.8699999999997, 7, 27220, 3030.6000000000013, 9014.149999999992, 20670.560000000038, 0.8577395988351896, 0.3166265316012712, 0.3836374377602704], "isController": false}, {"data": ["star note news", 200, 0, 0.0, 3559.68, 8, 18272, 12530.400000000001, 14318.599999999993, 17951.18, 3.1287153494775044, 0.8921727363744446, 1.3749237375633565], "isController": false}, {"data": ["star paper", 200, 0, 0.0, 28068.055, 5923, 48518, 38411.1, 40293.549999999996, 43754.91000000001, 2.8637704401615163, 1.0431507560353963, 1.2780694249548958], "isController": false}, {"data": ["front-end sockjs", 600, 0, 0.0, 1760.6216666666674, 1, 8247, 4848.099999999999, 6327.249999999967, 7847.99, 1.9979487725934708, 0.7174242517265608, 0.6985016216684204], "isController": false}, {"data": ["get note detail", 200, 0, 0.0, 2241.8000000000006, 23, 15942, 4570.8, 5139.85, 15272.0, 0.8962982880702698, 7.071478388007529, 0.41488807475127726], "isController": false}, {"data": ["star paper news", 200, 0, 0.0, 1814.2199999999993, 5, 14122, 4324.4, 5087.4, 13507.970000000007, 3.231644260599793, 1.0098888314374355, 1.4233120718071355], "isController": false}, {"data": ["back-end get all versions of a doc", 200, 0, 0.0, 644.5700000000003, 10, 3956, 2944.2000000000103, 3671.0, 3953.510000000001, 0.8886440180927921, 0.24125296584941036, 0.41741969990491506], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Assertion failed", 75, 100.0, 1.293103448275862], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 5800, 75, "Assertion failed", 75, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["front-end view doc pdf", 200, 73, "Assertion failed", 73, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["front-end view paper", 200, 1, "Assertion failed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["front-end get all versions of a doc", 200, 1, "Assertion failed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
