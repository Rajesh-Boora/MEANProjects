var fs = require('fs');
var path = require('path');
//var jsonQuery = require('json-query');
//
// var mongoose = require('mongoose');
//
// mongoose.connect('mongodb://localhost:27017/kido');

var logDirPath = __dirname + "\\ReceiptFiles\\";
var mappingDirPath = __dirname + "\\Mappings\\";
//var logArchiveDirPath = __dirname + "/LogFilesArchive/"+ Date.now();
// var Receipt = require('./models/receipt');
//fs.mkdirSync(logArchiveDirPath);

//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID;
//var url = 'mongodb://localhost:27017/kido';

//var insertReceipt = function(db, transactionItem,  callback) {
  //console.log("inserting receipt into database");

  //// db.collection('receipts').insertOne({});
  //db.collection('receipts').insertOne(transactionItem, function(err, result) {
    //if(err){
      //console.log(err);
    //}
    //else{
    //  console.log("receipt has been inserted successfully");
    //}
    //// console.log(result);
    //callback();
  //});
//};
var getFileName = function(logFileName){
  var extension = path.extname(logFileName);
  var fileName = path.basename(logFileName, extension);
  var _Index = fileName.indexOf('_');
  if(_Index > -1 ){
    return fileName.substr(0, _Index);
  }
  return "";
};

var getObject = function(filePath){
  var fileContents =fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
};
var getMappingFile = function(dirPath, logFileCompany){
    //var filePath = "";
    var files = fs.readdirSync(dirPath);
    for (var j in files) {
      if(logFileCompany == getFileName(files[j])){
        return dirPath + files[j];
        //break;
      }
    }
    return "";
};
fs.readdir(logDirPath, function(err, items) {
  for (var i=0; i<items.length; i++) {
    // console.log(items);
    var logFilePath = logDirPath + items[i];
    var mappingFilePath = "";
    var companyName = getFileName(items[i]);
    if(companyName != ""){
      var mappingFilePath = getMappingFile(mappingDirPath, companyName);
      if(mappingFilePath != ""){
        var logFileObject = getObject(logFilePath);
        var mappingFileObject = getObject(mappingFilePath);
        for (var key in mappingFileObject[0]) {
            console.log(key, mappingFileObject[0][key]);
        }
      }

    }
    //schema.validateFile(filePath, function(err, validationErrors){
      //if(validationErrors){
      //  console.log("processing file" + filePath + "failed.");
      //  console.log("Validation errors : " + validationErrors.join("\n"));
      //}
      //else{
      //  console.log("parsing file '" + filePath + "' has been successfull");
      //  var parser = xml2js.Parser({explicitArray : false, charkey:'NodeValue', attrkey:'Attribute', mergeAttrs : true});
      //  fs.readFile(filePath, "utf-8",  function(err, data) {
      //    var doc = new dom().parseFromString(data.toString())
      //    var nodes = select('//plog:Transaction', doc);
      //    parser.parseString(nodes[0], function (err1, result) {
      //      var transaction = result.Transaction;
      //      transaction.BusinessUnit.UnitID = tempStoreId++;
      //      MongoClient.connect(url, function(err, db) {
      //        insertReceipt(db, transaction,  function() {
      //          db.close();
      //        });
      //      });
            // var newFileName = path.basename(filePath);
            // var newFilePath = logArchiveDirPath + "/" + newFileName;
            // fs.rename(filePath, newFilePath , function(error){
            //   console.log("File has been archived successfully.");
            //   console.log("Source : " + filePath);
            //   console.log("Target : " + newFilePath);
            //
            // });
          //});
        //});
      //}
    //});
  }
});
