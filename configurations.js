// This configuration object sets default values for various parameters used in the application. 
// Customers can adjust these values as needed for their specific requirements. 
// For additional options and values, please refer to the documentation at https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#api-endpoint.
const configurations = {
    locales : ['en-US', 'fr-FR'],
    wakeWords : ['ALEXA'],
    timeZone : 'America/Los_Angeles',
    temperatureUnit : 'FAHRENHEIT',
    distanceUnits : 'IMPERIAL',
    volume : 40,
};

module.exports = configurations;
