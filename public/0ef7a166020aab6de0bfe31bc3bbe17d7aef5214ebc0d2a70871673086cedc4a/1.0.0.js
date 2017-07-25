var optimoveTenantConfiguration = {
    "version": "1.0.0",
    "realtimeMetaData": {
        "realtimeToken": "1750baa89e0e77553ff33d7a822f53cf3d148a02604f168edc4b86af31661b37",
        "realtimeGateway": "http://104.197.122.147/",
        "showDimmer": true,
        "showWatermark": true,
        "popupCallback": null
},
    "optitrackMetaData": {
    "heartBeatTimer": 30,
        "optitrackEndpoint": "",
        "eventIdCustomDimensionId": 6,
        "eventNameCustomDimensionId": 7,
        "visitCustomDimensionsStartId": 1,
        "maxVisitCustomDimensions": 5,
        "actionCustomDimensionsStartId": 8,
        "maxActionCustomDimensions": 25,
        "siteId": 107,
        "enableHeartBeatTimer": true
},
    "cookieMatcherMetaData": {
    "optimoveCookieMatcherId": ""
},
    "version": "1.0.19",
    "isSPA": false,
    "enableOptitrack": false,
    "enableVisitors": false,
    "enableRealtime": true,
    "supportCookieMatcher": false,
    "supportUserEmailStitch": false,
    "events": {
    "Login": {
        "id": 1,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": null
    },
    "Logout": {
        "id": 2,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": null
    },
    "Page View": {
        "id": 3,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": null
    },
    "itemAddedToCart": {
        "id": 4,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": {
            "price": {
                "required": false,
                    "name": "price",
                    "id": 1,
                    "type": "1",
                    "optiTrackDimensionId": null
            },
            "price2": {
                "required": false,
                    "name": "price2",
                    "id": 9,
                    "type": "1",
                    "optiTrackDimensionId": null
            }
        }
    },
    "Deposit": {
        "id": 5,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": null
    },
    "Withdrawal": {
        "id": 6,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": null
    },
    "purchaseCompleted": {
        "id": 7,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": null
    },
    "shopingCartAbandoned": {
        "id": 8,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": {
            "time": {
                "required": false,
                    "name": "time",
                    "id": 8,
                    "type": "1",
                    "optiTrackDimensionId": null
            }
        }
    },
    "shopingCartVisit": {
        "id": 9,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": null
    },
    "lossInX": {
        "id": 10,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": {
            "value": {
                "required": false,
                    "name": "value",
                    "id": 2,
                    "type": "2",
                    "optiTrackDimensionId": null
            }
        }
    },
    "winInX": {
        "id": 11,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": {
            "value": {
                "required": false,
                    "name": "value",
                    "id": 3,
                    "type": "2",
                    "optiTrackDimensionId": null
            }
        }
    },
    "productXpageVisit": {
        "id": 14,
            "supportedOnOptitrack": false,
            "supportedOnRealTime": true,
            "parameters": {
            "productId": {
                "required": false,
                    "name": "productId",
                    "id": 4,
                    "type": "2",
                    "optiTrackDimensionId": null
            }
        }
    }
}
}
