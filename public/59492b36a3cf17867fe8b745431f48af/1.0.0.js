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
        optitrackEndpoint: "http://104.155.164.245/",
        siteId: 94,
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
            supportedOnRealTime: true,
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
            supportedOnRealTime: true,
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
            supportedOnRealTime: true,
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
            supportedOnRealTime: true,
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
            supportedOnRealTime: true,
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
            supportedOnRealTime: true,
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
                    optiTrackDimensionId: 10
                }
            }
        },
		INCREASE_MEASUREMENT_CHANGED: {

            id: 1111,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
                measurement_type: {
                    optional: false,
                    name: "measurement_type",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 10
                }
            }
        },
		CLICKED_LINK: {

            id: 1112,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
                link_to: {
                    optional: false,
                    name: "link_to",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 10
                },
				measurement_type: {
                    optional: true,
                    name: "measurement_type",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 11
                },
				card_type: {
                    optional: true,
                    name: "card_type",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 12
                }
            }
        },
		SWITCH_TO_ACTIVITY_VIEW: {

            id: 1113,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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

            id: 1114,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
		ACTIVITY_MEASUREMENT_CHANGED: {

            id: 1115,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
		ADD_NEW_CAMPAIGN: {

            id: 1116,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
		ARCHIVED_CARD: {

            id: 1117,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
				card_type: {
                    optional: false,
                    name: "card_type",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 10
                }
            }
        },
		CHANGED_DOMAIN: {

            id: 1118,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
		CHANGED_SORT_BY: {

            id: 1119,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
		CLICKED_CAMPAIGN_JOURNEY: {

            id: 1120,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
		CLICKED_ON_ACTION: {

            id: 1121,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
				card_type: {
                    optional: false,
                    name: "card_type",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 10
                }
            }
        },
		COMPARE_GROUPS: {

            id: 1122,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
				card_type: {
                    optional: false,
                    name: "card_type",
                    id: 3,
                    type: "String",
                    optiTrackDimensionId: 10
                }
            }
        },
		COMPARE_MIGRATION: {

            id: 1123,
            supportedOnOptitrack: true,
            supportedOnRealTime: true,
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
        }
    }
}