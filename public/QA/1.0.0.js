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
        enableHeartBeatTimer: true,
        heartBeatTimer: 30,
        eventCategoryName: "LogEvent",
        eventIdCustomDimensionId: 6,
        eventNameCustomDimensionId: 7,        
        visitCustomDimensionsStartId: 1,
        maxVisitCustomDimensions: 5,
        actionCustomDimensionsStartId: 8,
        maxActionCustomDimensions: 25,
        optitrackEndpoint: "http://104.154.167.173/",
        siteId: 259,
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
        },
        deposit_event: {
            id: 1101,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
            parameters: {
                deposit: {
                    optional: false,
                    name: "deposit",
                    id: 1,
                    type: "Number",
                    optiTrackDimensionId: 8
                }
            }
        }
                    
    }
}
