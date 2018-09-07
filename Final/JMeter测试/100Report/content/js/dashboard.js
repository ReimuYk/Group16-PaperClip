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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5556666666666666, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.515, 500, 1500, "front-end view note"], "isController": false}, {"data": [0.64, 500, 1500, "star note"], "isController": false}, {"data": [0.56, 500, 1500, "get paper keywords"], "isController": false}, {"data": [0.71, 500, 1500, "if star paper"], "isController": false}, {"data": [0.225, 500, 1500, "user page"], "isController": false}, {"data": [0.75, 500, 1500, "Navbar-recentMessage"], "isController": false}, {"data": [0.425, 500, 1500, "front-end view doc pdf"], "isController": false}, {"data": [0.79, 500, 1500, "user follow"], "isController": false}, {"data": [0.35, 500, 1500, "user fans"], "isController": false}, {"data": [0.09, 500, 1500, "check access to paper"], "isController": false}, {"data": [0.98, 500, 1500, "Navbar-unreadMessage"], "isController": false}, {"data": [0.985, 500, 1500, "http://localhost:8080/service/getKeywords"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.805, 500, 1500, "assist doc"], "isController": false}, {"data": [0.005, 500, 1500, "front-end view paper"], "isController": false}, {"data": [0.405, 500, 1500, "get note list for paper"], "isController": false}, {"data": [0.035, 500, 1500, "get paperdetail (page1)"], "isController": false}, {"data": [0.34, 500, 1500, "front-end get all versions of a doc"], "isController": false}, {"data": [0.73, 500, 1500, "user note"], "isController": false}, {"data": [0.79, 500, 1500, "user doc"], "isController": false}, {"data": [0.925, 500, 1500, "check access to doc"], "isController": false}, {"data": [0.96, 500, 1500, "http://localhost:8080/service/getNoteList"], "isController": false}, {"data": [0.32, 500, 1500, "star note news"], "isController": false}, {"data": [0.0, 500, 1500, "star paper"], "isController": false}, {"data": [0.8833333333333333, 500, 1500, "front-end sockjs"], "isController": false}, {"data": [0.395, 500, 1500, "get note detail"], "isController": false}, {"data": [0.325, 500, 1500, "star paper news"], "isController": false}, {"data": [0.965, 500, 1500, "back-end get all versions of a doc"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2900, 0, 0.0, 3577.2210344827613, 1, 79204, 8398.300000000003, 16496.44999999996, 52810.35999999981, 19.87880781991171, 2860.821736201794, 15.615333715486278], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["front-end view note", 100, 0, 0.0, 1131.8600000000001, 238, 3602, 2408.1000000000013, 3194.149999999999, 3600.8099999999995, 2.0696220870069126, 5.827400955647999, 6.584793710418478], "isController": false}, {"data": ["star note", 100, 0, 0.0, 857.3599999999999, 40, 9397, 1605.9000000000008, 2288.2999999999943, 9338.25999999997, 4.615739672282483, 1.987833198707593, 2.05093901453958], "isController": false}, {"data": ["get paper keywords", 100, 0, 0.0, 1589.4800000000005, 6, 10356, 3679.6000000000004, 7403.9499999999925, 10347.379999999996, 1.2133860751814012, 0.312826097507705, 0.5379660919261291], "isController": false}, {"data": ["if star paper", 100, 0, 0.0, 803.2000000000002, 9, 7925, 1621.9, 2340.1499999999974, 7923.289999999999, 1.9877554265723147, 0.5415857070446052, 0.9104075147093902], "isController": false}, {"data": ["user page", 100, 0, 0.0, 4263.43, 46, 9515, 8133.3, 8347.65, 9508.059999999996, 9.279881217520416, 73.61374524406088, 4.041823264662212], "isController": false}, {"data": ["Navbar-recentMessage", 100, 0, 0.0, 516.1200000000002, 14, 1832, 788.3000000000001, 945.4499999999994, 1831.3599999999997, 49.333991119881595, 11.851720522940305, 21.583621114948198], "isController": false}, {"data": ["front-end view doc pdf", 100, 0, 0.0, 1356.2199999999998, 248, 3588, 3277.1000000000004, 3434.2, 3586.8999999999996, 2.6197212616577596, 7.376817840956723, 7.930796788221734], "isController": false}, {"data": ["user follow", 100, 0, 0.0, 463.44, 10, 3121, 941.7, 1441.2499999999982, 3105.579999999992, 6.272738677706687, 1.5069274557771923, 2.787203221051311], "isController": false}, {"data": ["user fans", 100, 0, 0.0, 2129.37, 10, 8622, 5685.000000000003, 6467.399999999997, 8613.569999999996, 1.2633759933293747, 0.3035063421474865, 0.5613633564110014], "isController": false}, {"data": ["check access to paper", 100, 0, 0.0, 6769.150000000001, 142, 22792, 15120.1, 17360.649999999998, 22783.389999999996, 1.1352412955373665, 8.640694001384993, 0.5232752846617549], "isController": false}, {"data": ["Navbar-unreadMessage", 100, 0, 0.0, 122.35999999999991, 9, 891, 242.70000000000002, 479.44999999999965, 890.89, 63.211125158027805, 15.185485145385588, 28.14870417193426], "isController": false}, {"data": ["http://localhost:8080/service/getKeywords", 100, 0, 0.0, 54.20999999999998, 6, 1079, 79.60000000000002, 193.5999999999999, 1076.5999999999988, 3.5819184755354967, 0.8674958807937532, 1.6020690056594313], "isController": false}, {"data": ["Test", 100, 0, 0.0, 103739.41000000003, 87629, 115271, 113782.2, 114860.65, 115270.62, 0.8549931600547196, 3568.297863919823, 19.476977973238714], "isController": true}, {"data": ["assist doc", 100, 0, 0.0, 437.83, 10, 1490, 878.2000000000003, 934.3499999999997, 1486.339999999998, 7.429972509101717, 1.7849348019912328, 3.3449387956014562], "isController": false}, {"data": ["front-end view paper", 100, 0, 0.0, 8074.57, 1402, 14249, 12496.6, 13861.5, 14248.4, 1.1306973010255426, 2121.8477175108264, 3.0067272955981954], "isController": false}, {"data": ["get note list for paper", 100, 0, 0.0, 2330.180000000001, 11, 9344, 6718.100000000002, 8451.699999999999, 9343.6, 1.177648236471766, 0.5382220455749868, 0.5221213860919743], "isController": false}, {"data": ["get paperdetail (page1)", 100, 0, 0.0, 16974.63, 893, 48948, 37578.6, 43197.149999999994, 48927.65999999999, 1.2381600941001671, 2787.192684795394, 0.5912698105615056], "isController": false}, {"data": ["front-end get all versions of a doc", 100, 0, 0.0, 1616.2399999999993, 245, 3545, 3382.7, 3458.0, 3544.5299999999997, 2.654350480437437, 7.474018470961406, 7.893063684503902], "isController": false}, {"data": ["user note", 100, 0, 0.0, 607.63, 16, 1882, 1371.7, 1474.95, 1881.87, 8.830801836806783, 3.553017926527729, 3.9238426130342634], "isController": false}, {"data": ["user doc", 100, 0, 0.0, 486.99999999999994, 8, 1468, 900.4000000000002, 1015.8, 1467.1599999999996, 8.299443937256203, 3.201445659390821, 3.671531351149473], "isController": false}, {"data": ["check access to doc", 100, 0, 0.0, 383.6399999999998, 10, 9432, 343.8, 2561.699999999989, 9419.449999999993, 2.6830511657857317, 20.421582798958976, 1.247199565345711], "isController": false}, {"data": ["http://localhost:8080/service/getNoteList", 100, 0, 0.0, 121.00999999999996, 8, 1185, 267.70000000000016, 1068.8, 1184.6499999999999, 3.580635920939559, 1.3217581817530792, 1.6014953630764823], "isController": false}, {"data": ["star note news", 100, 0, 0.0, 2624.6300000000006, 9, 10259, 6442.3, 8535.85, 10256.329999999998, 1.2541701156344847, 0.357634447036396, 0.5511489765971856], "isController": false}, {"data": ["star paper", 100, 0, 0.0, 42381.390000000014, 7829, 79204, 65637.70000000001, 73386.4, 79191.01999999999, 1.1427265455376527, 0.41624707176322706, 0.5099863587018626], "isController": false}, {"data": ["front-end sockjs", 300, 0, 0.0, 287.51666666666665, 1, 1572, 701.2000000000003, 1079.4499999999998, 1568.99, 4.950658437572198, 1.7780631425542097, 1.7307966021980923], "isController": false}, {"data": ["get note detail", 100, 0, 0.0, 4209.780000000001, 17, 23895, 10828.7, 12568.749999999996, 23797.44999999995, 2.0824656393169514, 16.429921777384422, 0.9639538213244481], "isController": false}, {"data": ["star paper news", 100, 0, 0.0, 2442.41, 12, 10053, 5748.400000000001, 6540.599999999995, 10039.829999999993, 1.2747622568390995, 0.39836320526221863, 0.5614431424164393], "isController": false}, {"data": ["back-end get all versions of a doc", 100, 0, 0.0, 129.72000000000006, 10, 2538, 277.0000000000002, 605.399999999999, 2526.769999999994, 2.68211565282695, 0.7281524916854415, 1.2598609658298465], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2900, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
