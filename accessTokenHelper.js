// Copyright 2023-2024 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License http://aws.amazon.com/asl/

/**
 * Alexa Smart Properties Access token retrieve sample code
 * 
 * This sample code demonstrates how to retrieve an access token for Alexa using OAuth2 authentication.
 * It interacts with AWS Secrets Manager to retrieve OAuth2 credentials and then uses these credentials
 * to obtain an access token from the Login with Amazon (LWA) service.
 */

// Importing necessary modules
const sm = require('@aws-sdk/client-secrets-manager');
const axios = require('axios');

// Function to retrieve OAuth2 required information from AWS Secrets Manager
async function getOAuthRequiredInfo(client) {
    const secretNameForOAuth = 'secret name';
   
    try {
        // Retrieve secret string from Secrets Manager
        const getSecretValueResponse = await client.send(
            new sm.GetSecretValueCommand({
                SecretId: secretNameForOAuth,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
        
        // Parse and return the OAuth2 required information
        return JSON.parse(getSecretValueResponse.SecretString);
    } catch (error) {
        console.log('Error in getOAuthRequiredInfo:', error);
        throw error;
    }
}

// Function to perform Login with Amazon (LWA) OAuth2 authentication and retrieve access token
async function lwaOAuth(oauthInfo) {
    const requestBody = {
        grant_type: 'refresh_token',
        refresh_token: oauthInfo['lwa-refresh-token'],
        client_id: oauthInfo['lwa-client-id'],
        client_secret: oauthInfo['lwa-client-secret'],
        scope: oauthInfo['lwa-auth-scope'],
    };

    try {
        // Send a POST request to LWA service to obtain access token
        const response = await axios.post(oauthInfo['lwa-auth-url'], new URLSearchParams(requestBody), {
            headers: { 'Accept': 'application/x-www-form-urlencoded' },
        });

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        if (response.status === 200) {
            // Return the access token if request is successful
            return response.data.access_token;
        } else {
            return null;
        }
    } catch (error) {
        console.log('Error in lwaOAuth:', error);
        throw error;
    }
}

// Exporting a function to retrieve the access token
module.exports = {
    async getAspAccessToken() {
        let accessToken = '';
        try {
            const regionName = 'us-east-1';

            // Create a Secrets Manager client
            const client = new sm.SecretsManager({ region: regionName });

            // Retrieve OAuth2 required information and perform OAuth2 authentication to get access token
            accessToken = await lwaOAuth(await getOAuthRequiredInfo(client));
        } catch (error) {
            console.error('Error in getAspAccessToken:', error);
        }

        return accessToken;
    }
};
