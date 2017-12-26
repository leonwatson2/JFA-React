/**
 * 
 * @param {string} bucket the bucket name 
 * @param {AWS} s3 aws
 */
const uploadToAws = (bucket, s3) => (imageName, image, callback) => {

  const params = {
    Bucket: bucket,
    Key: imageName,
    ACL: 'public-read',
    Body: image
  }
  s3.upload(params, function(err, data){
    if(err){
      console.log("Error uploading image: ", err)
      callback(err, null)
    }else{
      console.log("Successfully uploaded image on S3", imageName)
      callback(null, data)
    }
  }).on('httpUploadProgress', ({ loaded, total })=>{
    console.log( loaded/total )
  })
}
//SDK AWS http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#uploadPart-property
module.exports = uploadToAws