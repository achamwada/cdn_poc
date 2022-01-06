import { App, Stack, StackProps } from '@aws-cdk/core';
import { OriginAccessIdentity, Distribution } from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
export class CdnPocStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const testBucket = Bucket.fromBucketName(this, 'GreatMercatoBucket', 'greatmercato.com');

    // Create Origin Access Identity to be use Canonical User Id in S3 bucket policy
    const originAccessIdentity = new OriginAccessIdentity(this, 'OAI', {
      comment: "Created_by_Alexander"
    });



    const distribution = new Distribution(this, 'GreatMercatoDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(testBucket, {
          originPath: "/assets",
          originAccessIdentity
        }),

      }
    })
    const dealexbucket = Bucket.fromBucketName(this, 'DeAlexBucket', 'dealexbucket');

    distribution.addBehavior("free/", new origins.S3Origin(dealexbucket, {
      originPath: "/free",
      originAccessIdentity
    }))
  }
}