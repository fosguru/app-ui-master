sync-dev02:
	@yarn build
	@aws s3 sync .nuxt/ s3://dev02-datachef-app-ui-s3-cloudfront