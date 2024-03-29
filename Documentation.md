## How to Run the Project

- This is a Typescript Based Project for Generating Thumbnail and uploading it on the Second Bucket using Lambda Function
- Simply, All you need to do is Clone this project locally
- First of all run the command `npm run build` to convert the code from Typescript to Javascript
- Then run `cdk synth` to check any potiental error in the code
- Finally run the command `cdk deploy` to deploy the app on AWS CDK
- Now headover to test the app, find the bucket with the suffix SourceBucket in the S3 buckets. 
- open the ource bucket and add some image to test
- Now go to the S3 bucket open an bucket with the suffix thumbnailBucket and if you see the same uploaded image there with the suffix "_thumb", Congrats! The app is working perfect. 
