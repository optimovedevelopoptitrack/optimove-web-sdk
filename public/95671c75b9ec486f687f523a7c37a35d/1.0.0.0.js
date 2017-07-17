var optimoveTenantConfiguration = {
    version: "1.0.0.0",
    realtimeToken: "dfasdf4fwf234rfwef2rf2w3efd234df2freff23dff3",
    realtimeGateway: "https://102.22.33.44/",
    optitrackEndpoint: "http://35.184.87.239/",
    eventIdCustomDimensionId: 6,
    eventNameCustomDimensionId: 7,
    isSPA: false,
    visitCustomDimensionsStartId: 1,
    maxVisitCustomDimensions: 5,
    actionCustomDimensionsStartId: 8,
    maxActionCustomDimensions: 25,
    siteId: 801,
    enableOptitrack: true,
    enableVisitors: true,
    enableRealtime: true,
    enableHeartBeatTimer: true,
    supportCookieMatcher: false,
    optimoveCookieMatcherId: undefined,
    supportUserEmailStitch: true,
    MinimumEmailAddressLength: 3,
    heartBeatTimer: 30,
    cookieMatcherId: null,
    optitTrackerName: "optitTrackerv3.03.js",
    options: {
        showDimmer: true,
        showWatermark: true,
        popupCallback: null
    },
    events: {
        addToCart: {
            id: 9,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
            parameters: {
                productName: {
                    required: true,
                    name: "action_name",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 8
                },
                productId: {
                    required: false,
                    name: "action_value",
                    id: 4,
                    type: "Number",
                    optiTrackDimensionId: 9
                },
                price: {
                    required: true,
                    name: "action_price",
                    id: 5,
                    type: "Number",
                    optiTrackDimensionId: 10
                }
            }
        },
        Event1: {
            id: 10,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
            parameters: {
                action_name: {
                    optional: false,
                    name: "action_name",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                },
                action_value: {
                    optional: false,
                    name: "action_value",
                    id: 2,
                    type: "Number",
                    optiTrackDimensionId: 9
                },
                action_price: {
                    optional: false,
                    name: "action_price",
                    id: 3,
                    type: "Number",
                    optiTrackDimensionId: 10
                }
            }
        },

        Event2: {
            id: 9,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,

            parameters: {
                action_name: {
                    optional: false,
                    name: "action_name",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                },
                action_value: {
                    optional: false,
                    name: "action_value",
                    id: 2,
                    type: "Number",
                    optiTrackDimensionId: 9
                },
                action_price: {
                    optional: false,
                    name: "action_price",
                    id: 3,
                    type: "Number",
                    optiTrackDimensionId: 10
                }
            }
        },

        Event3: {
            id: 10,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,

            parameters: {
                action_name: {
                    optional: false,
                    name: "action_name",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                },
                action_value: {
                    optional: false,
                    name: "action_value",
                    id: 2,
                    type: "Number",
                    optiTrackDimensionId: 9
                },
                action_price: {
                    optional: false,
                    name: "action_price",
                    id: 3,
                    type: "Number",
                    optiTrackDimensionId: 10
                }
            }
        },

        Event4: {

            id: 11,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
            parameters: {
                action_name: {
                    optional: false,
                    name: "action_name",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                },
                action_value: {
                    optional: false,
                    name: "action_value",
                    id: 2,
                    type: "Number",
                    optiTrackDimensionId: 9
                },
                action_price: {
                    optional: false,
                    name: "action_price",
                    id: 3,
                    type: "Number",
                    optiTrackDimensionId: 10
                }
            }
        },

        stitch_event: {
            id: 12,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
            parameters: {
                sourcePublicCustomerId: {
                    optional: false,
                    name: "sourcePublicCustomerId",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                },
                sourceVisitorId: {
                    optional: false,
                    name: "sourceVisitorId",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 9
                },
                targetVsitorId: {
                    optional: false,
                    name: "targetVsitorId",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 10
                }
            }
        },
        set_user_id_event: {
            id: 13,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
            parameters: {
                originalVisitorId: {
                    optional: false,
                    name: "originalVisitorId",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                },
                userId: {
                    optional: false,
                    name: "userId",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 9
                },
                updatedVisitorId: {
                    optional: false,
                    name: "updatedVisitorId",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 10
                }
            }
        },
        Set_email_event: {
            id: 14,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
            parameters: {
                email: {
                    optional: false,
                    name: "email",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                }
            }
        }
    }
}