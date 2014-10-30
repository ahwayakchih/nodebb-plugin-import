var exporter  = require('./exporter.js');
var async = require('async');

exporter.once('exporter.ready', function() {
    var batchsize = 25000;
    
    async.series([       
        function(nextExport){
            exporter.countAll(function(a) {
                console.log('countedAll', a);
                nextExport();
            }); 
        },
        function(nextExport){
            var c = 1;
            exporter.exportUsers(function(err, map, arr, nextBatch) {
                console.log('gotusers', err, Object.keys(map), arr.length, c++);
                nextBatch();
            },{batch: batchsize},function() {console.log('usersdone');nextExport();}); 
        },
        function(nextExport){
            var c = 1;
            exporter.exportCategories(function(err, map, arr, nextBatch) {
                console.log('gotcategories', err, Object.keys(map), arr.length, c++);
                nextBatch();
            },{batch: batchsize},function() {console.log('categoriesdone');nextExport();}); 
        },
        function(nextExport){
            var c = 1;
            exporter.exportTopics(function(err, map, arr, nextBatch) {
                console.log('gottopics', err, Object.keys(map), arr.length, c++);
                nextBatch();
            },{batch: batchsize},function() {console.log('topicsdone');nextExport();}); 
        },
        function(nextExport){
            var c = 1;
            exporter.exportPosts(function(err, map, arr, nextBatch) {
                console.log('gotposts', err, Object.keys(map), arr.length, c++);
                nextBatch();
            },{batch: batchsize},function() {console.log('postsdone');nextExport();}); 
        }
        ], function() {
        console.log('done');
    });
});

exporter.init({
    exporter: {
        module: 'nodebb-plugin-import-smf',
        host: 'localhost',
        user: 'user',
        password: 'password',
        port: 3306,
        database: 'smf_large',
        tablePrefix: 'yabbse_',
        skipInstall: true
    }
});


