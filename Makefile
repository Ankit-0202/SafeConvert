.DEFAULT_GOAL := deploy

.PHONY: deploy
deploy:
	vercel --prod
