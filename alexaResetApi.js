/// Copyright 2023-2024 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License http://aws.amazon.com/asl/

/**
 * Alexa Smart Properties Unit/Room Reset Sample code
 * 
 * This sample code demonstrates how to reset unit and Alexa endpoint settings to desired values. 
 * It interacts with the Alexa Smart Properties API to perform various tasks such as deleting alarms, reminders, timers, 
 * notifications, and unpairing Bluetooth devices. It also sets volume, Do Not Disturb mode, locales, 
 * wake words, time zone, temperature unit, and distance units for the Alexa endpoint.
 */
// Importing necessary module
const axios = require('axios');
const configurations = require('./configurations');
/**
 * Delete alarms for a specific unit using the Alexa API-https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/unit-api.html#delete-all-alarms-for-unit
 *
 * @param {string} unitId - The ID of the unit for which alarms should be deleted.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function deleteAlarms(unitId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v1/alerts/alarms?unitId=${unitId}`;

    try {
        const response = await axios.delete(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt,
            },
        });
        console.log('alarms deleted successfully:', response);
        return response.data;
    } catch (error) {
        console.error('error deleting alarms:', error);
        throw error.response.data;
    }
}
/**
 * Unpairs Bluetooth devices associated with a specific endpoint using the Alexa API-https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/bluetooth-api.html#unpair-bluetooth-devices
 *
 * @param {string} endpointId - The ID of the endpoint for which Bluetooth devices should be unpaired.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function unpairBluetooth(endpointId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints/${endpointId}/features/bluetooth/unpair`;

    try {
        const response = await axios.post(apiEndpoint, {},  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt
            }
        });
        console.log('Unpair Bluetooth successful', response);
        return response.data;
    } catch (error) {
        console.error('Error unpairing Bluetooth:', error);
        throw error.response.data;
    }
}
/**
 * Deletes reminders for a specific unit using the Alexa API- https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/unit-api.html#delete-all-reminders-for-unit
 *
 * @param {string} unitId - The ID of the unit for which reminders should be deleted.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function deleteReminders (unitId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v1/alerts/reminders?unitId=${unitId}`;

    try {
        const response = await axios.delete(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt,
            },
        });
        console.log('reminders deleted successfully:', response);
        return response.data;
    } catch (error) {
        console.error('error deleting reminders:', error);
        throw error.response.data;
    }
}
/**
 * Deletes timers for a specific unit using the Alexa API- https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#delete-all-timers
 *
 * @param {string} unitId - The ID of the unit for which timers should be deleted.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function deleteTimers (unitId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v1/alerts/timers?unitId=${unitId}`;

    try {
        const response = await axios.delete(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt,
            },
        });
        console.log('timers deleted successfully:', response);
        return response.data;
    } catch (error) {
        console.error('error deleting timers:', error);
        throw error.response.data;
    }
}
/**
 * Retrieves the endpoint ID associated with a specific unit using the Alexa API-https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#get-an-endpoint
 *
 * @param {string} unitId - The ID of the unit for which the endpoint ID should be retrieved.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<string>} - A Promise that resolves with the endpoint ID or rejects with an error.
 */
async function getEndPointId (unitId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints?associatedUnits.id=${unitId}`;

    try {
        const response = await axios.get(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt,
            },
        });
        return response.data.results[0].id;
    } catch (error) {
        console.error('error deleting reminders:', error);
        throw error.response.data;
    }
}
/**
 * Sets the volume for a specific endpoint using the Alexa API-https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#put-maximumvolumelimit-setting
 *
 * @param {string} endPointId - The ID of the endpoint for which the volume should be set.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function setVolume (endPointId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints/${endPointId}/features/speaker/setVolume`;

    try {
		const volume = configurations.volume;
        const response = await axios.post(apiEndpoint, {
            payload: {
                volume: volume
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt
            }
        });
        console.log('setVolume successfull', response);
        return response.data;
    } catch (error) {
        console.error('error setting volume:', error);
        throw error.response.data;
    }
}
/**
 * Sets the Do Not Disturb mode for a specific endpoint using the Alexa API- https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#put-donotdisturb-setting
 *
 * @param {string} endPointId - The ID of the endpoint for which the Do Not Disturb mode should be set.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function setDoNotDisturb(endPointId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints/${endPointId}/settings/Alexa.DoNotDisturb.doNotDisturb`;

    try {
        const response = await axios.put(apiEndpoint, true, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt
            }
        });
        console.log('setDoNotDisturb successful', response);
        return response.data;
    } catch (error) {
        console.error('Error setting Do Not Disturb:', error);
        throw error.response.data;
    }
}
/**
 * Sets the locales for a specific endpoint using the Alexa API- https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#put-locales-setting
 *
 * @param {string} endPointId - The ID of the endpoint for which the locales should be set.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function setLocales(endPointId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints/${endPointId}/settings/System.locales`;

    try {
		const locales = configurations.locales;
        const response = await axios.put(apiEndpoint, locales, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt
            }
        });
        console.log('setLocales successful', response);
        return response.data;
    } catch (error) {
        console.error('Error setting locales:', error);
        throw error.response.data;
    }
}
/**
 * Sets the wake words for a specific endpoint using the Alexa API -https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#put-wakewords-setting
 *
 * @param {string} endPointId - The ID of the endpoint for which the wake words should be set.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function setWakeWords(endPointId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints/${endPointId}/settings/SpeechRecognizer.wakeWords`;

    try {
		const wakeWords = configurations.wakeWords;
        const response = await axios.put(apiEndpoint, wakeWords, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt
            }
        });
        console.log('setWakeWords successful', response);
        return response.data;
    } catch (error) {
        console.error('Error setting WakeWords:', error);
        throw error.response.data;
    }
}
/**
 * Sets the time zone for a specific endpoint using the Alexa API - https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#put-timezone-setting
 *
 * @param {string} endPointId - The ID of the endpoint for which the time zone should be set.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function setTimeZone(endPointId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints/${endPointId}/settings/System.timeZone`;

    try {
		const timeZone = configurations.timeZone;
        const response = await axios.put(apiEndpoint, timeZone, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt
            }
        });
        console.log('setTimeZone successful', response);
        return response.data;
    } catch (error) {
        console.error('Error setting timeZone:', error);
        throw error.response.data;
    }
}
/**
 * Sets the temperature unit for a specific endpoint using the Alexa API- https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#put-temperatureunit-setting
 *
 * @param {string} endPointId - The ID of the endpoint for which the temperature unit should be set.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function setTemperatureUnit(endPointId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints/${endPointId}/settings/System.temperatureUnit`;

    try {
		const temperatureUnit = configurations.temperatureUnit;
        const response = await axios.put(apiEndpoint, temperatureUnit, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt
            }
        });
        console.log('setTemperatureUnit successful', response);
        return response.data;
    } catch (error) {
        console.error('Error setting temperature unit:', error);
        throw error.response.data;
    }
}
/**
 * Sets the distance units for a specific endpoint using the Alexa API-https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#put-distanceunits-setting
 *
 * @param {string} endPointId - The ID of the endpoint for which the distance units should be set.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function setDistanceUnits(endPointId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v2/endpoints/${endPointId}/settings/System.distanceUnits`;

    try {
		const distanceUnits = configurations.distanceUnits;
        const response = await axios.put(apiEndpoint, distanceUnits, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt
            }
        });
        console.log('setDistanceUnits successful', response);
        return response.data;
    } catch (error) {
        console.error('Error setting distance unit:', error);
        throw error.response.data;
    }
}
/**
 * Deletes notifications for a specific unit using the Alexa API- https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/notifications-api.html#delete-all-notifications
 *
 * @param {string} unitId - The ID of the unit for which notifications should be deleted.
 * @param {string} lt - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with the API response or rejects with an error.
 */
async function deleteNotifications (unitId, lt) {
    const apiEndpoint = `https://api.amazonalexa.com/v3/notifications?recipients.id=${unitId}&recipients.type=Unit&notification.variants.type=DeviceNotification`;

    try {
        const response = await axios.delete(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': lt,
            },
        });
        console.log('delete notifications successfull:', response);
        return response.data;
    } catch (error) {
        console.error('error deleting notifications:', error);
        throw error.response.data;
    }
}
/**
 * Resets unit settings and Alexa endpoint configurations to desired values.
 *
 * This function interacts with the Alexa API to perform various tasks such as deleting alarms, reminders, timers,
 * notifications, unpairing Bluetooth devices, and setting volume, Do Not Disturb mode, locales,
 * wake words, time zone, temperature unit, and distance units for the Alexa endpoint.
 *
 * @param {string} unitId - The ID of the unit to be reset.
 * @param {string} lwaToken - The Login with Amazon (LWA) token for authorization.
 * @returns {Promise<Object>} - A Promise that resolves with a success message if reset is successful, otherwise rejects with an error message.
 */
async function resetUnit(unitId, lwaToken)
{       
    try {
        console.log('reset start ');
        await deleteAlarms(unitId, lwaToken);
        await deleteReminders(unitId, lwaToken);
        await deleteTimers(unitId, lwaToken);
        const endPointId = await getEndPointId(unitId, lwaToken);
        await setVolume(endPointId, lwaToken);
        await setDoNotDisturb(endPointId, lwaToken);
        await setLocales(endPointId, lwaToken);
        await setWakeWords(endPointId, lwaToken);
        await setTimeZone(endPointId, lwaToken);
        await setTemperatureUnit(endPointId, lwaToken);
        await setDistanceUnits(endPointId, lwaToken);
        await deleteNotifications(unitId, lwaToken);
        await unpairBluetooth(endPointId, lwaToken);

        // If all operations succeed, return a success message
        return { message: 'Reset successful' };
    } catch (error) {
        // If any operation fails, throw an error with the error message
        console.log('Error :', error);
        throw new Error('Reset failed. ', error);
  }
}

module.exports = {
    resetUnit,
};
