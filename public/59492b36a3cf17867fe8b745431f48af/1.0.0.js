var optimoveTenantConfiguration = {
    version: "1.0.0",
    realtimeToken: "dfasdf4fwf234rfwef2rf2w3efd234df2freff23dff3",
    realtimeGateway: "https://102.22.33.44/",   
    optitrackMetaData:{
        enableHeartBeatTimer: true,
        heartBeatTimer: 30,
        eventIdCustomDimensionId: 6,
        eventNameCustomDimensionId: 7,        
        visitCustomDimensionsStartId: 1,
        maxVisitCustomDimensions: 5,
        actionCustomDimensionsStartId: 8,
        maxActionCustomDimensions: 25,
        optitrackEndpoint: "http://104.155.164.245/",
        siteId: 94,
    },
    isSPA: false,
    enableOptitrack: true,
    enableVisitors: true,
    enableRealtime: true,   
    supportCookieMatcher: false,
    optimoveCookieMatcherId: undefined,
    cookieMatcherId: null,
    supportUserEmailStitch: true,     
 
    options: {
        showDimmer: true,
        showWatermark: true,
        popupCallback: null
    },
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
       ACADEMY_ARTICLE_CLICKED: {

            id: 1105,
            supportedOnOptitrack: true,
            supportedOnRealTime: false,
            parameters: {
                tenant_id: {
                    optional: false,
                    name: "tenant_id",
                    id: 1,
                    type: "Number",
                    optiTrackDimensionId: 8
                },
                page_name: {
                    optional: false,
                    name: "page_name",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 9
                },
                article_name: {
                    optional: false,
                    name: "action_price",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 10
                }
            }
        }, 
          TOP_FILTER_CHANGED: {

            id: 1106,
            supportedOnOptitrack: true,
            supportedOnRealTime: false,
            parameters: {
                tenant_id: {
                    optional: false,
                    name: "tenant_id",
                    id: 1,
                    type: "Number",
                    optiTrackDimensionId: 8
                },
                page_name: {
                    optional: false,
                    name: "page_name",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 9
                }
            }
        },
        SWITCH_TO_SERIES_ANALYSIS: {

            id: 1107,
            supportedOnOptitrack: true,
            supportedOnRealTime: false,
            parameters: {
                tenant_id: {
                    optional: false,
                    name: "tenant_id",
                    id: 1,
                    type: "Number",
                    optiTrackDimensionId: 8
                },
                page_name: {
                    optional: false,
                    name: "page_name",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 9
                }
            }
        },
         DATE_RANGE_CHANGED: {

            id: 1108,
            supportedOnOptitrack: true,
            supportedOnRealTime: false,
            parameters: {
                tenant_id: {
                    optional: false,
                    name: "tenant_id",
                    id: 1,
                    type: "Number",
                    optiTrackDimensionId: 8
                },
                page_name: {
                    optional: false,
                    name: "page_name",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 9
                }
            }
        },
        EXPORT_TO_CSV: {

            id: 1109,
            supportedOnOptitrack: true,
            supportedOnRealTime: false,
            parameters: {
                tenant_id: {
                    optional: false,
                    name: "tenant_id",
                    id: 1,
                    type: "Number",
                    optiTrackDimensionId: 8
                },
                page_name: {
                    optional: false,
                    name: "page_name",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 9
                }
            }
        },
         SECTION_EXPANDED: {

            id: 1110,
            supportedOnOptitrack: true,
            supportedOnRealTime: false,
            parameters: {
                tenant_id: {
                    optional: false,
                    name: "tenant_id",
                    id: 1,
                    type: "Number",
                    optiTrackDimensionId: 8
                },
                page_name: {
                    optional: false,
                    name: "page_name",
                    id: 2,
                    type: "String",
                    optiTrackDimensionId: 9
                },
                section: {
                    optional: false,
                    name: "section",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 9
                }
            }
        },
    }
}