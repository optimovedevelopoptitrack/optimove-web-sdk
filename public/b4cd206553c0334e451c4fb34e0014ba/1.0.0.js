var optimoveTenantConfiguration = {
    version: "1.0.0",
   realtimeMetaData:{
        realtimeToken: "dfasdf4fwf234rfwef2rf2w3efd234df2freff23dff3",
        realtimeGateway: "https://102.22.33.44/",   
        options: {
        showDimmer: true,
        showWatermark: true,
        popupCallback: null
        }
    },
    optitrackMetaData:{
        sendUserAgentHeader: true,
        useSessionStorage: true,
        enableHeartBeatTimer: false,
        heartBeatTimer: 0,
        eventCategoryName: "LogEvent",
        eventIdCustomDimensionId: 6,
        eventNameCustomDimensionId: 7,        
        visitCustomDimensionsStartId: 1,
        maxVisitCustomDimensions: 5,
        actionCustomDimensionsStartId: 8,
        maxActionCustomDimensions: 25,
        optitrackEndpoint: "http://104.154.167.173/",
        siteId: 202,
    },
    cookieMatcherMetaData:{  
        optimoveCookieMatcherId: undefined,
    },
    isSPA: false,
    enableOptitrack: true,
    enableVisitors: true,
    enableRealtime: true,   
    supportCookieMatcher: false,       
    supportUserEmailStitch: true,     
    
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
            id: 1101,
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
            id:1102,
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
            id: 1103,
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

            id: 1104,
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

        
        set_user_id_event: {
            id: 1001,
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
            id: 1002,
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
        },
         page_category_event: {
            id: 1003,
            supportedOnOptitrack: true,
            supportedOnRealTime: false,
            parameters: {
                category: {
                    optional: false,
                    name: "category",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                }
            }
        },
        stitch_event: {
            id: 1004,
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
    }
}