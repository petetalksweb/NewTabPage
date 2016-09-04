import urllib2
import json

baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial'

def getWeather(event, context):
    return {
        'weather' : getWeatherByCoordinates(event['lat'], event['lon'])
    }

def getWeatherByCoordinates(latitude, longitude):
    requestParameters = []
    requestParameters.append('lat=' + latitude)
    requestParameters.append('lon=' + longitude)

    weatherResponse = urllib2.urlopen(generateURL(requestParameters));
    return json.loads(weatherResponse.read())

def generateURL(requestParameters):
    requestURL = baseURL
    for parameter in requestParameters:
        requestURL += '&' + parameter
    requestURL += '&APPID=' + getWeatherTokens()[0]
    return requestURL

def getWeatherTokens():
    weatherTokens = []
    with open('weatherTokens.txt') as tokensFile:
        for token in tokensFile:
            weatherTokens.append(token.strip())

    return weatherTokens

print getWeatherByCoordinates('30.268328', '-97.7554749')