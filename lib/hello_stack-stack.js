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
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            versioned: true,
        });
        // Create destination bucket for thumbnails
        const thumbnailsBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 'ThumbnailsBucket', {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            versioned: true,
        });
        // Create Lambda function to generate thumbnails
        const thumbnailFunction = new aws_cdk_lib_2.aws_lambda.Function(this, 'ThumbnailFunction', {
            runtime: aws_cdk_lib_2.aws_lambda.Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: aws_cdk_lib_2.aws_lambda.Code.fromAsset('lambda'), // Assuming your aws_lambda code is in a 'aws_lambda' directory
            environment: {
                THUMBNAILS_BUCKET_NAME: thumbnailsBucket.bucketName,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG9fc3RhY2stc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWxsb19zdGFjay1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFbkMsNkNBQTJDO0FBQzNDLDZDQUF5QztBQUN6QyxtRkFBcUU7QUFFckUsOENBQThDO0FBRTlDLE1BQWEsZUFBZ0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM1QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUU3Qyx1QkFBdUI7UUFDdkIsTUFBTSxZQUFZLEdBQUcsSUFBSSxvQkFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3ZELGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87WUFDeEMsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsMkNBQTJDO1FBQzNDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxvQkFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDL0QsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7UUFFSCxnREFBZ0Q7UUFDaEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHdCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUMzRSxPQUFPLEVBQUUsd0JBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUN2QyxPQUFPLEVBQUUsZUFBZTtZQUN4QixJQUFJLEVBQUUsd0JBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLCtEQUErRDtZQUMxRyxXQUFXLEVBQUU7Z0JBQ1gsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTthQUVwRDtTQUNGLENBQUMsQ0FBQztRQUVILDhCQUE4QjtRQUM5QixZQUFZLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbkQsNkRBQTZEO1FBQzdELGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLHdDQUFhLENBQUMsWUFBWSxFQUFFO1lBQy9ELE1BQU0sRUFBRSxDQUFDLG9CQUFFLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztTQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDRjtBQXRDRCwwQ0FzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBhd3NfczMgYXMgczMgfSBmcm9tICdhd3MtY2RrLWxpYic7ICAgICBcbmltcG9ydCB7IGF3c19sYW1iZGEgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBTM0V2ZW50U291cmNlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYS1ldmVudC1zb3VyY2VzJztcblxuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9TdGFja1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG5cbiAgICAvLyBDcmVhdGUgc291cmNlIGJ1Y2tldFxuICAgIGNvbnN0IHNvdXJjZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1NvdXJjZUJ1Y2tldCcsIHtcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICB2ZXJzaW9uZWQ6IHRydWUsIFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGRlc3RpbmF0aW9uIGJ1Y2tldCBmb3IgdGh1bWJuYWlsc1xuICAgIGNvbnN0IHRodW1ibmFpbHNCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdUaHVtYm5haWxzQnVja2V0Jywge1xuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgIHZlcnNpb25lZDogdHJ1ZSwgXG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgTGFtYmRhIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRodW1ibmFpbHNcbiAgICBjb25zdCB0aHVtYm5haWxGdW5jdGlvbiA9IG5ldyBhd3NfbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdUaHVtYm5haWxGdW5jdGlvbicsIHtcbiAgICAgIHJ1bnRpbWU6IGF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLCAvLyBBc3N1bWluZyB5b3VyIGF3c19sYW1iZGEgY29kZSBpcyBpbiBhICdhd3NfbGFtYmRhJyBkaXJlY3RvcnlcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRIVU1CTkFJTFNfQlVDS0VUX05BTUU6IHRodW1ibmFpbHNCdWNrZXQuYnVja2V0TmFtZSxcblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gR3JhbnQgbmVjZXNzYXJ5IHBlcm1pc3Npb25zXG4gICAgc291cmNlQnVja2V0LmdyYW50UmVhZCh0aHVtYm5haWxGdW5jdGlvbik7XG4gICAgdGh1bWJuYWlsc0J1Y2tldC5ncmFudFJlYWRXcml0ZSh0aHVtYm5haWxGdW5jdGlvbik7IFxuXG4gICAgLy8gQ29uZmlndXJlIGF3c19sYW1iZGEgZnVuY3Rpb24gdG8gYmUgdHJpZ2dlcmVkIGJ5IFMzIGV2ZW50c1xuICAgIHRodW1ibmFpbEZ1bmN0aW9uLmFkZEV2ZW50U291cmNlKG5ldyBTM0V2ZW50U291cmNlKHNvdXJjZUJ1Y2tldCwge1xuICAgICAgZXZlbnRzOiBbczMuRXZlbnRUeXBlLk9CSkVDVF9DUkVBVEVEXVxuICAgIH0pKTtcbiAgfVxufVxuIl19