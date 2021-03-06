var optimoveTenantConfiguration = {
    version: "1.0.0",
    realtimeMetaData:{
        realtimeToken: "38a442a1ab134189de79fcb3b63b5ae07fdace6a79e1c16206d75b5227f15f6a",
        realtimeGateway: "https://gateway-eu.optimove.events/",   
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
        heartBeatTimer: 30,
        eventCategoryName: "LogEvent",
        eventIdCustomDimensionId: 6,
        eventNameCustomDimensionId: 7,        
        visitCustomDimensionsStartId: 1,
        maxVisitCustomDimensions: 5,
        actionCustomDimensionsStartId: 8,
        maxActionCustomDimensions: 25,
        optitrackEndpoint: "http://rocketspeedtracksdk.optimove.net/",
        siteId: 400,
    },
    cookieMatcherMetaData:{  
        optimoveCookieMatcherId: 'optimove_dmp',
        tenantToken: '0b8b59f5-46c6-4311-8113-75d397659f9c'
    },

    isSPA: false,
    enableOptitrack: true,
    enableVisitors: true,
    enableRealtime: true,   
    supportCookieMatcher: false,       
    supportUserEmailStitch: false,     
 
    events: {
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
        user_agent_header_event: {
            id: 1005,
            supportedOnOptitrack: true,
            supportedOnRealTime: false,
            parameters: {
                user_agent_header: {
                    optional: false,
                    name: "user_agent_header",
                    id: 1,
                    type: "String",
                    optiTrackDimensionId: 8
                }
            }
        }
			
    }
}