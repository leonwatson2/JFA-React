import awsUpload from './awsUpload'

describe('aws uploading function', () => {
  const buckeName = "unt-jfa"
  const s3 = {
    putObject:(params, callback) => {
      callback(null, {ok:1})
    }
  }
  it('should call the s3 putObject function', () => {
    awsUpload(buckeName, s3)("pic.jpg", {}, ()=>{  })
    
  });
  
});
