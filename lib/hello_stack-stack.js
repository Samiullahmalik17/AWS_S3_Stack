"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloStackStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const aws_lambda_event_sources_1 = require("aws-cdk-lib/aws-lambda-event-sources");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class HelloStackStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // Create source bucket
        const sourceBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 'SourceBucket', {
            removalPolicy: cdk.RemovalPolicy.DESTROY // Change to RETAIN if you want to keep the bucket when stack is deleted
        });
        // Create destination bucket for thumbnails
        const thumbnailsBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 'ThumbnailsBucket', {
            removalPolicy: cdk.RemovalPolicy.DESTROY // Change to RETAIN if you want to keep the bucket when stack is deleted
        });
        // Create Lambda function to generate thumbnails
        const thumbnailFunction = new aws_cdk_lib_2.aws_lambda.Function(this, 'ThumbnailFunction', {
            runtime: aws_cdk_lib_2.aws_lambda.Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: aws_cdk_lib_2.aws_lambda.Code.fromAsset('lambda'), // Assuming your aws_lambda code is in a 'aws_lambda' directory
            environment: {
                THUMBNAILS_BUCKET_NAME: thumbnailsBucket.bucketName,
                DESTINATION_BUCKET_NAME: thumbnailsBucket.bucketName
            }
        });
        // Grant necessary permissions
        sourceBucket.grantRead(thumbnailFunction);
        thumbnailsBucket.grantReadWrite(thumbnailFunction);
        // Configure aws_lambda function to be triggered by S3 events
        thumbnailFunction.addEventSource(new aws_lambda_event_sources_1.S3EventSource(sourceBucket, {
            events: [aws_cdk_lib_1.aws_s3.EventType.OBJECT_CREATED]
        }));
    }
}
exports.HelloStackStack = HelloStackStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG9fc3RhY2stc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWxsb19zdGFjay1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFbkMsNkNBQTJDO0FBQzNDLDZDQUF5QztBQUN6QyxtRkFBcUU7QUFFckUsOENBQThDO0FBRTlDLE1BQWEsZUFBZ0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM1QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUU3Qyx1QkFBdUI7UUFDdkIsTUFBTSxZQUFZLEdBQUcsSUFBSSxvQkFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3ZELGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyx3RUFBd0U7U0FDbEgsQ0FBQyxDQUFDO1FBRUgsMkNBQTJDO1FBQzNDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxvQkFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDL0QsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHdFQUF3RTtTQUNsSCxDQUFDLENBQUM7UUFFSCxnREFBZ0Q7UUFDaEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHdCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUMzRSxPQUFPLEVBQUUsd0JBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUN2QyxPQUFPLEVBQUUsZUFBZTtZQUN4QixJQUFJLEVBQUUsd0JBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLCtEQUErRDtZQUMxRyxXQUFXLEVBQUU7Z0JBQ1gsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtnQkFDbkQsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTthQUVyRDtTQUNGLENBQUMsQ0FBQztRQUVILDhCQUE4QjtRQUM5QixZQUFZLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbkQsNkRBQTZEO1FBQzdELGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLHdDQUFhLENBQUMsWUFBWSxFQUFFO1lBQy9ELE1BQU0sRUFBRSxDQUFDLG9CQUFFLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztTQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDRjtBQXJDRCwwQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBhd3NfczMgYXMgczMgfSBmcm9tICdhd3MtY2RrLWxpYic7ICAgICBcbmltcG9ydCB7IGF3c19sYW1iZGEgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBTM0V2ZW50U291cmNlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYS1ldmVudC1zb3VyY2VzJztcblxuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9TdGFja1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG5cbiAgICAvLyBDcmVhdGUgc291cmNlIGJ1Y2tldFxuICAgIGNvbnN0IHNvdXJjZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1NvdXJjZUJ1Y2tldCcsIHtcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1kgLy8gQ2hhbmdlIHRvIFJFVEFJTiBpZiB5b3Ugd2FudCB0byBrZWVwIHRoZSBidWNrZXQgd2hlbiBzdGFjayBpcyBkZWxldGVkXG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgZGVzdGluYXRpb24gYnVja2V0IGZvciB0aHVtYm5haWxzXG4gICAgY29uc3QgdGh1bWJuYWlsc0J1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1RodW1ibmFpbHNCdWNrZXQnLCB7XG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZIC8vIENoYW5nZSB0byBSRVRBSU4gaWYgeW91IHdhbnQgdG8ga2VlcCB0aGUgYnVja2V0IHdoZW4gc3RhY2sgaXMgZGVsZXRlZFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIExhbWJkYSBmdW5jdGlvbiB0byBnZW5lcmF0ZSB0aHVtYm5haWxzXG4gICAgY29uc3QgdGh1bWJuYWlsRnVuY3Rpb24gPSBuZXcgYXdzX2xhbWJkYS5GdW5jdGlvbih0aGlzLCAnVGh1bWJuYWlsRnVuY3Rpb24nLCB7XG4gICAgICBydW50aW1lOiBhd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBjb2RlOiBhd3NfbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSwgLy8gQXNzdW1pbmcgeW91ciBhd3NfbGFtYmRhIGNvZGUgaXMgaW4gYSAnYXdzX2xhbWJkYScgZGlyZWN0b3J5XG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUSFVNQk5BSUxTX0JVQ0tFVF9OQU1FOiB0aHVtYm5haWxzQnVja2V0LmJ1Y2tldE5hbWUsXG4gICAgICAgIERFU1RJTkFUSU9OX0JVQ0tFVF9OQU1FOiB0aHVtYm5haWxzQnVja2V0LmJ1Y2tldE5hbWVcblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gR3JhbnQgbmVjZXNzYXJ5IHBlcm1pc3Npb25zXG4gICAgc291cmNlQnVja2V0LmdyYW50UmVhZCh0aHVtYm5haWxGdW5jdGlvbik7XG4gICAgdGh1bWJuYWlsc0J1Y2tldC5ncmFudFJlYWRXcml0ZSh0aHVtYm5haWxGdW5jdGlvbik7IFxuXG4gICAgLy8gQ29uZmlndXJlIGF3c19sYW1iZGEgZnVuY3Rpb24gdG8gYmUgdHJpZ2dlcmVkIGJ5IFMzIGV2ZW50c1xuICAgIHRodW1ibmFpbEZ1bmN0aW9uLmFkZEV2ZW50U291cmNlKG5ldyBTM0V2ZW50U291cmNlKHNvdXJjZUJ1Y2tldCwge1xuICAgICAgZXZlbnRzOiBbczMuRXZlbnRUeXBlLk9CSkVDVF9DUkVBVEVEXVxuICAgIH0pKTtcbiAgfVxufVxuIl19