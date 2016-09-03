from twitter import *

def getTrends(event, context):
    twitterTokens = getTwitterTokens()
    accessKey = twitterTokens[0]
    accessSecret = twitterTokens[1]
    consumerKey = twitterTokens[2]
    consumerSecret = twitterTokens[3]

    twitter = Twitter(auth = OAuth(accessKey, accessSecret, consumerKey, consumerSecret))

    trendsResponse = twitter.trends.place(_id = 23424977)

    trends = trendsResponse[0]["trends"][:10]

    return {
        'trends': trends
    }

def getTwitterTokens():
    twitterTokens = []
    with open('twitterTokens.txt') as tokensFile:
        for token in tokensFile:
            twitterTokens.append(token.strip())

    return twitterTokens