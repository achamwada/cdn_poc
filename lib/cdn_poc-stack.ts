import { App, Stack, StackProps } from '@aws-cdk/core';
import { Distribution } from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
export class CdnPocStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const testBucket = Bucket.fromBucketName(this, 'GreatMercatoBucket', 'greatmercato.com');

    const dealexbucket = Bucket.fromBucketName(this, 'DeAlexBucket', 'dealexbucket');


    const distribution = new Distribution(this, 'AppDistribution', {
      defaultBehavior: {
        origin: new origins.OriginGroup({
          primaryOrigin: new origins.S3Origin(dealexbucket),
          fallbackOrigin: new origins.S3Origin(testBucket, { originPath: "/free" }),
          // optional, defaults to: 500, 502, 503 and 504
          fallbackStatusCodes: [404],

        }),
      },
    })

  }
}