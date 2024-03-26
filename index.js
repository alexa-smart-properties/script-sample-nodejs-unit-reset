// Copyright 2023-2024 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License http://aws.amazon.com/asl/

/**
 
 * 
 * This Lambda function serves as a sample script demonstrating the integration of
 * room reset function script and referesh token retireval in Alexa Smart Properties.
 * The function resets a unit's settings to a desired state, facilitating the configuration
 * for this type of calling.
 */

// Import necessary modules
const { getAspAccessToken } = require('./accessTokenHelper'); 
const { resetUnit } = require('./alexaResetApi'); 

exports.handler = async (event, context) => {
    try {
        // Log the received event
        console.log('Event:', JSON.stringify(event, null, 2));

        // Obtain access token
        let accessToken = await getAspAccessToken();
        accessToken = "Bearer " + accessToken;
        console.log('accessToken is ', accessToken);

        // Check if access token is valid
        if (accessToken) {
            // Extract unitId from the event
            const unitId = event.unitId;
            console.log('unitId is ', unitId);

            // Call resetUnit function with unitId and access token
            await resetUnit(unitId, accessToken);

            const response = {
                statusCode: 200,
                body: JSON.stringify('Reset was successful'),
            };
            return response;
        } else {
            console.log('Access token failed');

            const response = {
                statusCode: 500,
                body: JSON.stringify('Access token error'),
            };
            return response;
        }
    } catch (error) {
        const response = {
            statusCode: 500,
            body: JSON.stringify('Reset went wrong. Some internal issue'),
        };
        return response;
    }
};